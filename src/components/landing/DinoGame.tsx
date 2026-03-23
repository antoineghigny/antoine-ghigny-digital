"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { m, AnimatePresence } from "framer-motion";
import { WarningCircle, ArrowClockwise } from "@phosphor-icons/react";
import { useTranslations } from "next-intl";

/* ── Chromium-faithful constants ─────────────────────────────── */
const SPEED_START = 6;
const SPEED_MAX = 13;
const ACCELERATION = 0.001;
const GRAVITY = 0.6;
const INITIAL_JUMP_VELOCITY = -10;
const SPEED_DROP_COEFFICIENT = 3;
const GAP_COEFFICIENT = 0.6;
const MAX_GAP_COEFFICIENT = 1.5;
const CLEAR_FRAMES = 180; // ~3s at 60fps before first obstacle
const MAX_OBSTACLE_DUPLICATION = 2;

// Fixed logical game dimensions — canvas scales uniformly to fill the container
const CANVAS_W = 600;
const CANVAS_H = 180;
const GROUND_Y = 160;

const DINO_X = 50;
const DINO_W = 44;
const DINO_H = 47;
const DINO_DUCK_W = 59;
const DINO_DUCK_H = 25;

const PTERO_MIN_SPEED = 8.5;

// Fixed timestep: 60 updates/sec regardless of display refresh rate
const FIXED_DT = 1000 / 60;

// Obstacle configs matching Chromium source
const OBS_CFG = {
  cactus_s: { w: 17, h: 35, minGap: 120, minSpeed: 0, multipleSpeed: 4, maxGroup: 3 },
  cactus_l: { w: 25, h: 50, minGap: 120, minSpeed: 0, multipleSpeed: 7, maxGroup: 2 },
  ptero:    { w: 46, h: 30, minGap: 150, minSpeed: 8.5, multipleSpeed: 999, maxGroup: 1 },
} as const;

type ObsKind = keyof typeof OBS_CFG;

interface Obs {
  x: number; y: number; w: number; h: number;
  kind: ObsKind; count: number; gap: number;
}
interface Cloud { x: number; y: number; w: number }
interface Bump  { x: number; w: number }

interface GameState {
  active: boolean; over: boolean;
  speed: number; dist: number; hiScore: number;
  dY: number; dVel: number; jumping: boolean; ducking: boolean;
  frame: number; lastScore: number; lastKind: string; lastKindCount: number;
  obstacles: Obs[]; clouds: Cloud[]; bumps: Bump[];
  scale: number;
}

/* ── Pure helpers ─────────────────────────────────────────────── */

function calcGap(obsWidth: number, speed: number, minGapBase: number): number {
  const min = Math.round(obsWidth * speed + minGapBase * GAP_COEFFICIENT);
  const max = Math.round(min * MAX_GAP_COEFFICIENT);
  return min + Math.random() * (max - min);
}

function drawScenery(ctx: CanvasRenderingContext2D, r: GameState) {
  // Clouds
  ctx.fillStyle = "rgba(45,41,38,0.05)";
  for (const c of r.clouds) {
    ctx.beginPath(); ctx.roundRect(c.x, c.y, c.w, 8, 4); ctx.fill();
    ctx.beginPath(); ctx.roundRect(c.x + 8, c.y - 4, c.w * 0.6, 7, 3); ctx.fill();
  }
  // Ground line + bumps
  ctx.strokeStyle = "rgba(45,41,38,0.15)";
  ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.moveTo(0, GROUND_Y); ctx.lineTo(CANVAS_W, GROUND_Y); ctx.stroke();
  ctx.lineWidth = 1;
  for (const b of r.bumps) {
    ctx.beginPath(); ctx.moveTo(b.x, GROUND_Y + 5); ctx.lineTo(b.x + b.w, GROUND_Y + 5); ctx.stroke();
  }
}

function drawCactus(ctx: CanvasRenderingContext2D, o: Obs & { kind: "cactus_s" | "cactus_l" }) {
  const unitW = OBS_CFG[o.kind].w;
  const n = Math.max(1, Math.round(o.w / unitW));
  for (let j = 0; j < n; j++) {
    const cx = o.x + j * unitW;
    const tw = unitW * 0.35;
    ctx.fillStyle = "#5C5652";
    ctx.beginPath(); ctx.roundRect(cx + (unitW - tw) / 2, o.y, tw, o.h, 3); ctx.fill();
    if (o.kind === "cactus_l") {
      ctx.beginPath(); ctx.roundRect(cx + 2, o.y + o.h * 0.25, unitW * 0.3, 5, 2); ctx.fill();
      ctx.beginPath(); ctx.roundRect(cx + 2, o.y + o.h * 0.25 - 9, 5, 11, 2); ctx.fill();
      ctx.beginPath(); ctx.roundRect(cx + unitW * 0.6, o.y + o.h * 0.45, unitW * 0.3, 5, 2); ctx.fill();
      ctx.beginPath(); ctx.roundRect(cx + unitW - 7, o.y + o.h * 0.45 - 7, 5, 9, 2); ctx.fill();
    } else {
      ctx.beginPath(); ctx.roundRect(cx + 1, o.y + o.h * 0.35, unitW * 0.35, 4, 2); ctx.fill();
      ctx.beginPath(); ctx.roundRect(cx + unitW * 0.55, o.y + o.h * 0.5, unitW * 0.35, 4, 2); ctx.fill();
    }
  }
}

function drawPtero(ctx: CanvasRenderingContext2D, o: Obs) {
  ctx.fillStyle = "#5C5652";
  ctx.beginPath(); ctx.roundRect(o.x + 8, o.y + 10, 30, 12, 4); ctx.fill();
  ctx.beginPath(); ctx.roundRect(o.x + 34, o.y + 8, 14, 8, 2); ctx.fill();
  ctx.fillStyle = "#FAF8F5";
  ctx.beginPath(); ctx.arc(o.x + 36, o.y + 12, 1.5, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "#5C5652";
  ctx.beginPath();
  if (o.count === 0) {
    ctx.moveTo(o.x + 10, o.y + 10); ctx.lineTo(o.x + 22, o.y - 6); ctx.lineTo(o.x + 34, o.y + 10);
  } else {
    ctx.moveTo(o.x + 10, o.y + 22); ctx.lineTo(o.x + 22, o.y + 36); ctx.lineTo(o.x + 34, o.y + 22);
  }
  ctx.closePath(); ctx.fill();
}

function drawObstacles(ctx: CanvasRenderingContext2D, obstacles: Obs[]) {
  for (const o of obstacles) {
    if (o.kind === "cactus_s" || o.kind === "cactus_l") {
      drawCactus(ctx, o as Obs & { kind: "cactus_s" | "cactus_l" });
    } else {
      drawPtero(ctx, o);
    }
  }
}

function drawDino(ctx: CanvasRenderingContext2D, r: GameState) {
  const duck = r.ducking && !r.jumping;
  const dY   = duck ? GROUND_Y - DINO_DUCK_H : r.dY;
  ctx.fillStyle = "#B34B44";
  if (duck) {
    ctx.beginPath(); ctx.roundRect(DINO_X, dY + 4, DINO_DUCK_W - 10, 18, 6); ctx.fill();
    ctx.beginPath(); ctx.roundRect(DINO_X + DINO_DUCK_W - 18, dY, 22, 14, 4); ctx.fill();
    ctx.fillStyle = "#FAF8F5";
    ctx.beginPath(); ctx.arc(DINO_X + DINO_DUCK_W - 1, dY + 5, 2, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "#B34B44";
    const lf = Math.floor(r.frame / 4) % 2;
    ctx.fillRect(DINO_X + 6,  dY + 20, 6, lf === 0 ? 5 : 3);
    ctx.fillRect(DINO_X + 18, dY + 20, 6, lf === 1 ? 5 : 3);
  } else {
    ctx.beginPath(); ctx.roundRect(DINO_X, dY + 12, 28, 28, 6); ctx.fill();
    ctx.beginPath(); ctx.roundRect(DINO_X + 12, dY, 30, 20, 5); ctx.fill();
    ctx.fillStyle = "#FAF8F5";
    ctx.beginPath(); ctx.arc(DINO_X + 34, dY + 7, 2.5, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "#B34B44";
    ctx.beginPath(); ctx.roundRect(DINO_X - 6, dY + 16, 10, 8, 3); ctx.fill();
    if (r.jumping) {
      ctx.fillRect(DINO_X + 5,  dY + 38, 7, 6);
      ctx.fillRect(DINO_X + 17, dY + 38, 7, 6);
    } else {
      const lf = Math.floor(r.frame / 4) % 2;
      ctx.fillRect(DINO_X + 5,  dY + 38, 7, lf === 0 ? 12 : 6);
      ctx.fillRect(DINO_X + 17, dY + 38, 7, lf === 1 ? 12 : 6);
    }
  }
}

/* ── Component ────────────────────────────────────────────────── */

export default function DinoGame({ className = "" }: { className?: string }) {
  const t = useTranslations("games.dino");
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const rafRef       = useRef(0);
  const lastTimeRef  = useRef(0);
  const accRef       = useRef(0);

  const g = useRef<GameState>({
    active: false, over: false,
    speed: SPEED_START, dist: 0, hiScore: 0,
    dY: GROUND_Y - DINO_H, dVel: 0, jumping: false, ducking: false,
    frame: 0, lastScore: 0, lastKind: "", lastKindCount: 0,
    obstacles: [], clouds: [], bumps: [],
    scale: 1,
  });

  const [score,     setScore]     = useState(0);
  const [hiScore,   setHiScore]   = useState(0);
  const [state,     setState]     = useState<"idle" | "playing" | "over">("idle");
  const [milestone, setMilestone] = useState(false);

  // Load persisted high score
  useEffect(() => {
    const saved = localStorage.getItem("dino-high-score");
    if (saved) {
      const val = parseInt(saved, 10);
      g.current.hiScore = val;
      setHiScore(val);
    }
  }, []);

  /* ── world seeding ─────────────────────────────────────────── */
  const seedWorld = useCallback(() => {
    const r = g.current;
    r.clouds = Array.from({ length: 4 }, (_, i) => ({
      x: 80 + i * 160,
      y: GROUND_Y * 0.1 + Math.random() * (GROUND_Y * 0.25),
      w: 35 + Math.random() * 30,
    }));
    r.bumps = Array.from({ length: 12 }, (_, i) => ({
      x: i * 55,
      w: 10 + Math.random() * 18,
    }));
  }, []);

  /* ── game reset ────────────────────────────────────────────── */
  const reset = useCallback(() => {
    const r = g.current;
    r.active = true; r.over = false;
    r.speed = SPEED_START; r.dist = 0; r.lastScore = 0;
    r.dY = GROUND_Y - DINO_H; r.dVel = 0;
    r.jumping = false; r.ducking = false;
    r.frame = 0; r.lastKind = ""; r.lastKindCount = 0;
    r.obstacles = [];
    seedWorld();
    setScore(0);
    setState("playing");
  }, [seedWorld]);

  /* ── input ─────────────────────────────────────────────────── */
  const actionJump = useCallback(() => {
    const r = g.current;
    if (!r.active && !r.over) { reset(); return; }
    if (r.over) { reset(); return; }
    if (!r.jumping && !r.ducking) { r.jumping = true; r.dVel = INITIAL_JUMP_VELOCITY; }
  }, [reset]);

  const actionDuckStart = useCallback(() => {
    const r = g.current;
    if (!r.active) return;
    if (r.jumping) { r.dVel += SPEED_DROP_COEFFICIENT; }
    else { r.ducking = true; }
  }, []);

  const actionDuckEnd = useCallback(() => { g.current.ducking = false; }, []);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "ArrowUp") { e.preventDefault(); actionJump(); }
      if (e.code === "ArrowDown") { e.preventDefault(); actionDuckStart(); }
    };
    const up = (e: KeyboardEvent) => { if (e.code === "ArrowDown") actionDuckEnd(); };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => { window.removeEventListener("keydown", down); window.removeEventListener("keyup", up); };
  }, [actionJump, actionDuckStart, actionDuckEnd]);

  /* ── canvas sizing ─────────────────────────────────────────── */
  useEffect(() => {
    const resize = () => {
      const canvas    = canvasRef.current;
      const container = containerRef.current;
      if (!canvas || !container) return;
      const dpr  = window.devicePixelRatio || 1;
      const rect = container.getBoundingClientRect();
      canvas.width  = rect.width  * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width  = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      g.current.scale = (rect.width * dpr) / CANVAS_W;
      if (!g.current.jumping) g.current.dY = GROUND_Y - DINO_H;
    };
    resize();
    seedWorld();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [seedWorld]);

  /* ── game loop ─────────────────────────────────────────────── */
  const loopRef = useRef<(now: number) => void>(undefined);
  loopRef.current = (now: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const r = g.current;

    // Fixed timestep accumulator — game runs at 60 ups regardless of refresh rate
    if (lastTimeRef.current === 0) lastTimeRef.current = now;
    const delta = Math.min(now - lastTimeRef.current, 50); // cap to avoid spiral
    lastTimeRef.current = now;
    accRef.current += delta;

    while (accRef.current >= FIXED_DT) {
      accRef.current -= FIXED_DT;

      /* ── one fixed update step ──────────────────────────────── */
      if (r.active && !r.over) {
        if (r.speed < SPEED_MAX) r.speed += ACCELERATION;

        r.dist += r.speed * 0.025;
        const s = Math.floor(r.dist);
        if (s !== r.lastScore) {
          r.lastScore = s;
          setScore(s);
          if (s > 0 && s % 100 === 0) { setMilestone(true); setTimeout(() => setMilestone(false), 600); }
        }

        // Dino physics
        if (r.jumping) {
          r.dVel += GRAVITY;
          r.dY   += r.dVel;
          if (r.dY >= GROUND_Y - DINO_H) { r.dY = GROUND_Y - DINO_H; r.dVel = 0; r.jumping = false; }
        }
        r.frame++;

        // Scenery scroll
        for (const c of r.clouds) {
          c.x -= r.speed * 0.15;
          if (c.x < -80) {
            c.x = CANVAS_W + 40 + Math.random() * 80;
            c.y = GROUND_Y * 0.1 + Math.random() * (GROUND_Y * 0.25);
          }
        }
        for (const b of r.bumps) {
          b.x -= r.speed;
          if (b.x < -30) { b.x = CANVAS_W + 20 + Math.random() * 40; b.w = 10 + Math.random() * 18; }
        }

        // Obstacle spawning (Chromium logic)
        if (r.frame > CLEAR_FRAMES) {
          const last      = r.obstacles[r.obstacles.length - 1];
          const canSpawn  = !last || (CANVAS_W - (last.x + last.w)) >= last.gap;
          if (canSpawn) {
            let kind: ObsKind;
            const rand = Math.random();
            if (rand > 0.8 && r.speed >= PTERO_MIN_SPEED) kind = "ptero";
            else if (rand > 0.45) kind = "cactus_l";
            else kind = "cactus_s";

            // Prevent too many consecutive duplicates
            if (kind === r.lastKind && r.lastKindCount >= MAX_OBSTACLE_DUPLICATION) {
              kind = kind === "cactus_s" ? "cactus_l" : "cactus_s";
            }
            if (kind === r.lastKind) { r.lastKindCount++; } else { r.lastKind = kind; r.lastKindCount = 1; }

            const cfg   = OBS_CFG[kind];
            const count = kind === "ptero" ? 0 : (r.speed > cfg.multipleSpeed ? Math.floor(Math.random() * cfg.maxGroup) + 1 : 1);
            const w     = kind === "ptero" ? cfg.w : cfg.w * count;
            const h     = cfg.h;
            const pteroY = [GROUND_Y - 50, GROUND_Y - 70, GROUND_Y - 90];
            const y     = kind === "ptero" ? pteroY[Math.floor(Math.random() * 3)] : GROUND_Y - h;
            const gap   = calcGap(w, r.speed, cfg.minGap);
            r.obstacles.push({ x: CANVAS_W + 20, y, w, h, kind, count, gap });
          }
        }

        // Move obstacles + collision detection
        const duck = r.ducking && !r.jumping;
        const dW   = duck ? DINO_DUCK_W : DINO_W;
        const dH   = duck ? DINO_DUCK_H : DINO_H;
        const dY   = duck ? GROUND_Y - DINO_DUCK_H : r.dY;
        const pad  = 6;
        for (let i = r.obstacles.length - 1; i >= 0; i--) {
          const o = r.obstacles[i];
          o.x -= r.speed;
          if (o.kind === "ptero") o.count = Math.floor(r.dist / 3) % 2;
          // AABB collision with hitbox padding
          if (
            DINO_X + pad < o.x + o.w - pad &&
            DINO_X + dW - pad > o.x + pad &&
            dY + pad < o.y + o.h &&
            dY + dH  > o.y + pad
          ) {
            r.over = true; r.active = false;
            const finalScore = Math.floor(r.dist);
            if (finalScore > r.hiScore) { r.hiScore = finalScore; setHiScore(finalScore); localStorage.setItem("dino-high-score", String(finalScore)); }
            setState("over");
          }
          if (o.x < -100) r.obstacles.splice(i, 1);
        }
      }
    }

    /* ── draw ──────────────────────────────────────────────────── */
    ctx.save();
    ctx.scale(r.scale, r.scale);
    // Center game world vertically (slight downward bias)
    const totalLogicalH = canvas.height / r.scale;
    const yOffset = (totalLogicalH - CANVAS_H) * 0.55;
    ctx.translate(0, yOffset);
    ctx.clearRect(0, -yOffset, CANVAS_W, totalLogicalH);
    drawScenery(ctx, r);
    drawObstacles(ctx, r.obstacles);
    drawDino(ctx, r);
    ctx.restore();

    rafRef.current = requestAnimationFrame((t) => loopRef.current?.(t));
  };

  useEffect(() => {
    rafRef.current = requestAnimationFrame((t) => loopRef.current?.(t));
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const fmt = (n: number) => n.toString().padStart(5, "0");

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full bg-[#FAF8F5] dark:bg-[#1A1816] overflow-hidden select-none ${className}`}
    >
      {/* 404 header */}
      <div className="absolute top-3 left-4 md:left-5 z-10">
        <div className="flex items-center gap-2 mb-1">
          <WarningCircle size={16} weight="fill" className="text-[#B34B44]" />
          <span className="text-[11px] uppercase tracking-[0.15em] font-bold text-[#B34B44]">
            {t("title")}
          </span>
        </div>
        <p className="text-[12px] text-[#5C5652] dark:text-[#A8A29E] font-light max-w-[220px] leading-tight">
          {t("subtitle")}
        </p>
      </div>

      {/* Score */}
      <div className="absolute top-3 right-4 md:right-5 z-10 flex gap-3 font-mono text-[10px] tracking-wider">
        {hiScore > 0 && (
          <span className="text-[#2D2926]/30 dark:text-white/20">HI {fmt(hiScore)}</span>
        )}
        <span className={`text-[#2D2926]/60 dark:text-white/40 transition-all duration-100 ${milestone ? "text-[#B34B44] font-bold scale-110" : ""}`}>
          {fmt(score)}
        </span>
      </div>

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full block cursor-pointer"
        onClick={actionJump}
        onTouchStart={(e) => { e.preventDefault(); actionJump(); }}
      />

      {/* Overlays */}
      <AnimatePresence>
        {state === "idle" && (
          <m.div
            key="idle"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 bg-[#FAF8F5]/30 dark:bg-[#1A1816]/30 backdrop-blur-[1px] flex items-center justify-center z-20"
          >
            <div className="flex flex-col items-center gap-3">
              <div className="flex gap-2 items-center">
                <div className="w-8 h-0.5 rounded-full bg-[#B34B44]/20" />
                <span className="text-[10px] uppercase tracking-[0.15em] font-bold text-[#2D2926] dark:text-[#FAF8F5]">
                  <span className="hidden sm:inline">{t("start")}</span>
                  <span className="sm:hidden">{t("start_mobile")}</span>
                </span>
                <div className="w-8 h-0.5 rounded-full bg-[#B34B44]/20" />
              </div>
              <div className="flex gap-3 text-[9px] text-[#5C5652] dark:text-[#A8A29E] uppercase font-medium tracking-wide">
                <span>{t("jump")}</span>
                <span className="hidden sm:inline">{t("duck")}</span>
              </div>
            </div>
          </m.div>
        )}
        {state === "over" && (
          <m.div
            key="over"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 bg-[#FAF8F5]/50 dark:bg-[#1A1816]/50 backdrop-blur-[2px] flex items-center justify-center z-20"
          >
            <m.div
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              className="flex flex-col items-center gap-3"
            >
              <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#2D2926] dark:text-[#FAF8F5]">
                {t("game_over")}
              </span>
              <div className="flex gap-4 font-mono text-[11px] tracking-wider">
                <span className="text-[#2D2926]/50 dark:text-white/30">
                  {t("score")} <span className="text-[#2D2926]/80 dark:text-white/60 font-bold">{fmt(score)}</span>
                </span>
                {hiScore > 0 && (
                  <span className="text-[#2D2926]/50 dark:text-white/30">
                    {t("best")} <span className="text-[#B34B44] font-bold">{fmt(hiScore)}</span>
                  </span>
                )}
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); reset(); }}
                className="p-2.5 bg-[#B34B44] text-white rounded-full hover:bg-[#963f39] transition-colors shadow-lg shadow-[#B34B44]/20"
              >
                <ArrowClockwise size={18} weight="bold" />
              </button>
              <span className="text-[9px] uppercase tracking-wide font-medium text-[#5C5652] dark:text-[#A8A29E]">
                <span className="hidden sm:inline">{t("restart")}</span>
                <span className="sm:hidden">{t("restart_mobile")}</span>
              </span>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
