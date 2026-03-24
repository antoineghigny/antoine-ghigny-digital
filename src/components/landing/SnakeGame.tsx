"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { m, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";

type Point = { x: number; y: number };
type GameStatus = "IDLE" | "PLAYING" | "GAME_OVER";

const GRID_SIZE = 20;
const INITIAL_SPEED = 120;

interface SnakeGameContentProps {
  active: boolean;
  onRequestClose: () => void;
}

export default function SnakeGameContent({ active, onRequestClose }: SnakeGameContentProps) {
  const t = useTranslations("games.snake");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [status, setStatus] = useState<GameStatus>("IDLE");
  const [score, setScore] = useState(0);
  const highScoreRef = useRef(0);

  // Load persisted high score
  useEffect(() => {
    const saved = localStorage.getItem("snake-high-score");
    if (saved) highScoreRef.current = parseInt(saved, 10);
  }, []);

  const snakeRef = useRef<Point[]>([{ x: 10, y: 10 }, { x: 10, y: 11 }, { x: 10, y: 12 }]);
  const foodRef = useRef<Point>({ x: 5, y: 5 });
  const directionRef = useRef<Point>({ x: 0, y: -1 });
  const nextDirectionRef = useRef<Point>({ x: 0, y: -1 });
  const lastRenderTimeRef = useRef<number>(0);
  const requestRef = useRef<number>(undefined);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  const generateFood = useCallback((snake: Point[]): Point => {
    let p: Point;
    do {
      p = { x: Math.floor(Math.random() * GRID_SIZE), y: Math.floor(Math.random() * GRID_SIZE) };
    } while (snake.some((s) => s.x === p.x && s.y === p.y));
    return p;
  }, []);

  const resetGame = useCallback(() => {
    snakeRef.current = [{ x: 10, y: 10 }, { x: 10, y: 11 }, { x: 10, y: 12 }];
    directionRef.current = { x: 0, y: -1 };
    nextDirectionRef.current = { x: 0, y: -1 };
    foodRef.current = generateFood(snakeRef.current);
    setScore(0);
    setStatus("PLAYING");
  }, [generateFood]);

  const draw = useCallback((time: number, progress: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const tile = canvas.width / GRID_SIZE;
    const dark = document.documentElement.classList.contains("dark");

    ctx.fillStyle = dark ? "#1A1816" : "#FAF8F5";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = dark ? "rgba(255,255,255,0.08)" : "rgba(180,175,170,0.4)";
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= GRID_SIZE; i++) {
      ctx.beginPath(); ctx.moveTo(i * tile, 0); ctx.lineTo(i * tile, canvas.height); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, i * tile); ctx.lineTo(canvas.width, i * tile); ctx.stroke();
    }

    // Food with pulsing glow
    const pulse = Math.sin(time / 150) * 0.15;
    const foodX = foodRef.current.x * tile + tile / 2;
    const foodY = foodRef.current.y * tile + tile / 2;

    ctx.shadowColor = "#10b981";
    ctx.shadowBlur = 15 + pulse * 10;
    ctx.fillStyle = "#10b981";
    ctx.beginPath();
    ctx.arc(foodX, foodY, (tile / 3) * (1 + pulse), 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0; // reset

    // Snake
    snakeRef.current.forEach((seg, i) => {
      let vx = seg.x;
      let vy = seg.y;

      // Interpolation for smooth motion
      if (status === "PLAYING") {
        if (i === 0) {
          vx += directionRef.current.x * progress;
          vy += directionRef.current.y * progress;
        } else {
          const prev = snakeRef.current[i - 1];
          // Determine if wrapping occurred logically to prevent visual wrapping glitch
          if (Math.abs(prev.x - seg.x) <= 1 && Math.abs(prev.y - seg.y) <= 1) {
            vx += (prev.x - seg.x) * progress;
            vy += (prev.y - seg.y) * progress;
          }
        }
      }

      ctx.fillStyle = i === 0 ? "#B34B44" : "#B34B44EE";
      const p = 1.5;
      const xPx = vx * tile + p;
      const yPx = vy * tile + p;
      const sSize = tile - p * 2;

      ctx.save();
      // Squash & Stretch on head
      if (i === 0 && status === "PLAYING") {
        ctx.translate(xPx + sSize / 2, yPx + sSize / 2);
        const stretch = 1 + Math.sin(progress * Math.PI) * 0.15;
        const squash = 1 - Math.sin(progress * Math.PI) * 0.05;
        if (directionRef.current.x !== 0) ctx.scale(stretch, squash);
        else ctx.scale(squash, stretch);
        ctx.translate(-(xPx + sSize / 2), -(yPx + sSize / 2));
      }

      ctx.beginPath();
      ctx.roundRect(xPx, yPx, sSize, sSize, 6);
      ctx.fill();

      // Eyes for head
      if (i === 0) {
        ctx.fillStyle = "#FAF8F5";
        const dir = status === "PLAYING" ? directionRef.current : { x: 0, y: -1 };
        let ey1 = { x: 0, y: 0 }, ey2 = { x: 0, y: 0 };
        const eOffset = sSize * 0.25;
        const eSize = sSize * 0.15;
        const cX = xPx + sSize / 2;
        const cY = yPx + sSize / 2;

        if (dir.x === 1) { ey1 = { x: cX + eOffset, y: cY - eOffset }; ey2 = { x: cX + eOffset, y: cY + eOffset }; }
        else if (dir.x === -1) { ey1 = { x: cX - eOffset, y: cY - eOffset }; ey2 = { x: cX - eOffset, y: cY + eOffset }; }
        else if (dir.y === 1) { ey1 = { x: cX - eOffset, y: cY + eOffset }; ey2 = { x: cX + eOffset, y: cY + eOffset }; }
        else { ey1 = { x: cX - eOffset, y: cY - eOffset }; ey2 = { x: cX + eOffset, y: cY - eOffset }; } // UP or IDLE

        if (status === "GAME_OVER") {
          // Dead eyes!
          ctx.beginPath(); ctx.moveTo(ey1.x - eSize, ey1.y - eSize); ctx.lineTo(ey1.x + eSize, ey1.y + eSize); ctx.stroke();
          ctx.beginPath(); ctx.moveTo(ey2.x - eSize, ey2.y - eSize); ctx.lineTo(ey2.x + eSize, ey2.y + eSize); ctx.stroke();
        } else {
          ctx.beginPath(); ctx.arc(ey1.x, ey1.y, eSize, 0, Math.PI * 2); ctx.fill();
          ctx.beginPath(); ctx.arc(ey2.x, ey2.y, eSize, 0, Math.PI * 2); ctx.fill();
        }
      }
      ctx.restore();
    });
  }, [status]);

  const update = useCallback((time: number) => {
    if (status !== "PLAYING") {
      draw(time, 0);
      requestRef.current = requestAnimationFrame(update);
      return;
    }

    const currentSpeed = Math.max(50, INITIAL_SPEED - Math.floor(score / 50) * 4);
    const elapsed = time - lastRenderTimeRef.current;

    if (elapsed >= currentSpeed) {
      lastRenderTimeRef.current = time;
      directionRef.current = nextDirectionRef.current;

      const head = { ...snakeRef.current[0] };
      head.x += directionRef.current.x;
      head.y += directionRef.current.y;

      if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) { setStatus("GAME_OVER"); return; }
      if (snakeRef.current.some((s) => s.x === head.x && s.y === head.y)) { setStatus("GAME_OVER"); return; }

      const ns = [head, ...snakeRef.current];
      if (head.x === foodRef.current.x && head.y === foodRef.current.y) {
        setScore((s) => s + 10);
        foodRef.current = generateFood(ns);
      } else { ns.pop(); }

      snakeRef.current = ns;
    }

    const progress = Math.min(1, Math.max(0, (time - lastRenderTimeRef.current) / currentSpeed));
    draw(time, progress);
    requestRef.current = requestAnimationFrame(update);
  }, [status, draw, generateFood, score]);

  useEffect(() => {
    requestRef.current = requestAnimationFrame(update);
    return () => { if (requestRef.current) cancelAnimationFrame(requestRef.current); };
  }, [update]);

  useEffect(() => {
    if (!active) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { onRequestClose(); return; }
      const key = e.key.toLowerCase();
      const isArrow = key === "arrowup" || key === "arrowdown" || key === "arrowleft" || key === "arrowright";
      if (isArrow || key === " ") e.preventDefault();
      if (status === "IDLE" || status === "GAME_OVER") {
        if (isArrow || ["z", "q", "s", "d", " "].includes(key)) resetGame();
        return;
      }
      const dir = directionRef.current;
      if ((key === "arrowup" || key === "z") && dir.y === 0) nextDirectionRef.current = { x: 0, y: -1 };
      if ((key === "arrowdown" || key === "s") && dir.y === 0) nextDirectionRef.current = { x: 0, y: 1 };
      if ((key === "arrowleft" || key === "q") && dir.x === 0) nextDirectionRef.current = { x: -1, y: 0 };
      if ((key === "arrowright" || key === "d") && dir.x === 0) nextDirectionRef.current = { x: 1, y: 0 };
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [active, status, resetGame, onRequestClose]);

  // Touch / swipe controls
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (!touchStartRef.current) return;
    const dx = e.changedTouches[0].clientX - touchStartRef.current.x;
    const dy = e.changedTouches[0].clientY - touchStartRef.current.y;
    touchStartRef.current = null;

    if (Math.max(Math.abs(dx), Math.abs(dy)) < 20) return;

    if (status === "IDLE" || status === "GAME_OVER") {
      resetGame();
      return;
    }

    const dir = directionRef.current;
    if (Math.abs(dx) > Math.abs(dy)) {
      if (dx > 0 && dir.x === 0) nextDirectionRef.current = { x: 1, y: 0 };
      else if (dx < 0 && dir.x === 0) nextDirectionRef.current = { x: -1, y: 0 };
    } else {
      if (dy > 0 && dir.y === 0) nextDirectionRef.current = { x: 0, y: 1 };
      else if (dy < 0 && dir.y === 0) nextDirectionRef.current = { x: 0, y: -1 };
    }
  }, [status, resetGame]);

  if (score > highScoreRef.current) {
    highScoreRef.current = score;
    localStorage.setItem("snake-high-score", String(score));
  }
  const highScore = highScoreRef.current;

  useEffect(() => {
    if (!active) return;
    const container = containerRef.current;
    if (!container) return;
    const resize = () => {
      const canvas = canvasRef.current;
      if (!canvas || !container) return;
      const size = Math.min(container.clientWidth, container.clientHeight);
      if (size > 0) {
        canvas.width = size;
        canvas.height = size;
        draw(performance.now(), 0);
      }
    };
    const ro = new ResizeObserver(resize);
    ro.observe(container);
    return () => ro.disconnect();
  }, [active, draw]);

  return (
    <div
      ref={containerRef}
      className="flex-1 relative flex items-center justify-center select-none touch-none"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <canvas ref={canvasRef} className="rounded-lg" />

      <AnimatePresence mode="wait">
        {status === "IDLE" && (
          <m.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 flex flex-col items-center justify-center gap-6 bg-[#FAF8F5]/50 dark:bg-[#1A1816]/50 backdrop-blur-[2px]">
            <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#B34B44] animate-pulse">
              <span className="hidden sm:inline">{t("start")}</span>
              <span className="sm:hidden">{t("start_mobile")}</span>
            </span>
            <div className="flex gap-4">
              <kbd className="hidden sm:inline-flex items-center px-2 py-1 rounded-md bg-white dark:bg-[#242220] border border-stone-200 dark:border-white/10 text-[10px] font-mono text-stone-500">ZQSD</kbd>
              <kbd className="hidden sm:inline-flex items-center px-2 py-1 rounded-md bg-white dark:bg-[#242220] border border-stone-200 dark:border-white/10 text-[10px] font-mono text-stone-500">↑↓←→</kbd>
              <kbd className="px-2 py-1 rounded-md bg-white dark:bg-[#242220] border border-stone-200 dark:border-white/10 text-[10px] font-mono text-stone-500">ESC</kbd>
            </div>
          </m.div>
        )}
        {status === "GAME_OVER" && (
          <m.div key="gameover" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 flex flex-col items-center justify-center bg-[#FAF8F5]/80 dark:bg-[#1A1816]/90 backdrop-blur-md">
            <span className="text-xs uppercase tracking-widest font-bold text-[#B34B44] mb-2">{t("game_over")}</span>
            <div className="text-5xl font-mono font-bold text-[#2D2926] dark:text-[#FAF8F5] mb-8 tabular-nums">{score}</div>
            {score === highScore && score > 0 && (
              <m.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="mb-6 px-3 py-1 bg-[#B34B44]/10 border border-[#B34B44]/20 rounded-full">
                <span className="text-[10px] uppercase tracking-widest text-[#B34B44] font-bold">{t("new_record")}</span>
              </m.div>
            )}
            <button onClick={resetGame} className="bg-[#B34B44] text-white px-8 py-4 rounded-full font-medium text-base shadow-lg shadow-[#B34B44]/20 hover:bg-[#963f39] active:scale-[0.98] transition-all duration-300">{t("replay")}</button>
            <div className="mt-3 text-[10px] uppercase tracking-widest text-stone-400 font-mono sm:hidden">{t("or_swipe")}</div>
            <div className="mt-6 text-[10px] uppercase tracking-widest text-stone-400 font-mono">{t("record")} : {highScore}</div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
