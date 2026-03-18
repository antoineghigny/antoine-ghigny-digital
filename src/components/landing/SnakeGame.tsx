"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { m, AnimatePresence } from "framer-motion";

type Point = { x: number; y: number };
type GameStatus = "IDLE" | "PLAYING" | "GAME_OVER";

const GRID_SIZE = 20;
const INITIAL_SPEED = 120;

interface SnakeGameContentProps {
  active: boolean;
  onRequestClose: () => void;
}

export default function SnakeGameContent({ active, onRequestClose }: SnakeGameContentProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [status, setStatus] = useState<GameStatus>("IDLE");
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  const snakeRef = useRef<Point[]>([{ x: 10, y: 10 }, { x: 10, y: 11 }, { x: 10, y: 12 }]);
  const foodRef = useRef<Point>({ x: 5, y: 5 });
  const directionRef = useRef<Point>({ x: 0, y: -1 });
  const nextDirectionRef = useRef<Point>({ x: 0, y: -1 });
  const lastRenderTimeRef = useRef<number>(0);
  const requestRef = useRef<number>();
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

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const tile = canvas.width / GRID_SIZE;
    const dark = document.documentElement.classList.contains("dark");

    ctx.fillStyle = dark ? "#1A1816" : "#FAF8F5";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = dark ? "rgba(255,255,255,0.04)" : "rgba(231,229,228,0.5)";
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= GRID_SIZE; i++) {
      ctx.beginPath(); ctx.moveTo(i * tile, 0); ctx.lineTo(i * tile, canvas.height); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, i * tile); ctx.lineTo(canvas.width, i * tile); ctx.stroke();
    }

    ctx.fillStyle = "#10b981";
    ctx.beginPath();
    ctx.arc(foodRef.current.x * tile + tile / 2, foodRef.current.y * tile + tile / 2, tile / 3, 0, Math.PI * 2);
    ctx.fill();

    snakeRef.current.forEach((seg, i) => {
      ctx.fillStyle = i === 0 ? "#B34B44" : "#B34B44DD";
      const p = 1.5;
      ctx.beginPath();
      ctx.roundRect(seg.x * tile + p, seg.y * tile + p, tile - p * 2, tile - p * 2, 4);
      ctx.fill();
    });
  }, []);

  const update = useCallback((time: number) => {
    if (status !== "PLAYING") return;
    if (time - lastRenderTimeRef.current < INITIAL_SPEED) { requestRef.current = requestAnimationFrame(update); return; }
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
    draw();
    requestRef.current = requestAnimationFrame(update);
  }, [status, draw, generateFood]);

  useEffect(() => {
    if (status === "PLAYING") requestRef.current = requestAnimationFrame(update);
    else draw();
    return () => { if (requestRef.current) cancelAnimationFrame(requestRef.current); };
  }, [status, update, draw]);

  useEffect(() => {
    if (!active) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { onRequestClose(); return; }
      if (status === "IDLE" || status === "GAME_OVER") {
        if (["ArrowUp","ArrowDown","ArrowLeft","ArrowRight","z","q","s","d"," "].includes(e.key.toLowerCase())) resetGame();
        return;
      }
      const dir = directionRef.current;
      const key = e.key.toLowerCase();
      if ((key === "arrowup"    || key === "z") && dir.y === 0) { nextDirectionRef.current = { x: 0, y: -1 }; e.preventDefault(); }
      if ((key === "arrowdown"  || key === "s") && dir.y === 0) { nextDirectionRef.current = { x: 0, y:  1 }; e.preventDefault(); }
      if ((key === "arrowleft"  || key === "q") && dir.x === 0) { nextDirectionRef.current = { x: -1, y: 0 }; e.preventDefault(); }
      if ((key === "arrowright" || key === "d") && dir.x === 0) { nextDirectionRef.current = { x:  1, y: 0 }; e.preventDefault(); }
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

  useEffect(() => { if (score > highScore) setHighScore(score); }, [score, highScore]);

  useEffect(() => {
    if (!active) return;
    const resize = () => {
      const canvas = canvasRef.current;
      if (!canvas || !containerRef.current) return;
      const size = Math.min(containerRef.current.clientWidth - 32, containerRef.current.clientHeight - 32, 500);
      canvas.width = size;
      canvas.height = size;
      draw();
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [active, draw]);

  useEffect(() => { if (!active) { setStatus("IDLE"); setScore(0); } }, [active]);

  return (
    <div
      ref={containerRef}
      className="flex-1 relative flex items-center justify-center p-4 select-none touch-none min-h-[350px]"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <canvas ref={canvasRef} className="rounded-lg" />

      <AnimatePresence mode="wait">
        {status === "IDLE" && (
          <m.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 flex flex-col items-center justify-center gap-6 bg-[#FAF8F5]/50 dark:bg-[#1A1816]/50 backdrop-blur-[2px]">
            <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#B34B44] animate-pulse">
              <span className="hidden sm:inline">Appuyez sur une touche</span>
              <span className="sm:hidden">Swipez pour jouer</span>
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
            <span className="text-xs uppercase tracking-widest font-bold text-[#B34B44] mb-2">Game Over</span>
            <div className="text-5xl font-mono font-bold text-[#2D2926] dark:text-[#FAF8F5] mb-8 tabular-nums">{score}</div>
            {score === highScore && score > 0 && (
              <m.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="mb-6 px-3 py-1 bg-[#B34B44]/10 border border-[#B34B44]/20 rounded-full">
                <span className="text-[10px] uppercase tracking-widest text-[#B34B44] font-bold">Nouveau Record</span>
              </m.div>
            )}
            <button onClick={resetGame} className="bg-[#B34B44] text-white px-8 py-4 rounded-full font-medium text-base shadow-lg shadow-[#B34B44]/20 hover:bg-[#963f39] active:scale-[0.98] transition-all duration-300">Rejouer</button>
            <div className="mt-3 text-[10px] uppercase tracking-widest text-stone-400 font-mono sm:hidden">ou swipez</div>
            <div className="mt-6 text-[10px] uppercase tracking-widest text-stone-400 font-mono">Record : {highScore}</div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
