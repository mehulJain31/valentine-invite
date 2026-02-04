"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  color: string;
  size: number;
}

const COLORS = [
  "#e63946", // red
  "#ff6b9d", // rose
  "#ffd700", // gold
  "#fff0f3", // cream
  "#c9184a", // deep rose
  "#ffb347", // amber
  "#ff69b4", // hot pink
];

function createBurst(x: number, y: number): Particle[] {
  const count = 30 + Math.floor(Math.random() * 25);
  const color = COLORS[Math.floor(Math.random() * COLORS.length)];
  const particles: Particle[] = [];

  for (let i = 0; i < count; i++) {
    const angle = (Math.PI * 2 / count) * i + (Math.random() - 0.5) * 0.4;
    const speed = 1.5 + Math.random() * 2.5;
    particles.push({
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: 0.8 + Math.random() * 0.2,
      color,
      size: 2 + Math.random() * 3,
    });
  }
  return particles;
}

export default function Celebration() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);
  const lastBurstRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Paint initial background so canvas isn't transparent
    ctx.fillStyle = "#0f0505";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    let nextDelay = 200; // first burst fires quickly

    const animate = (time: number) => {
      // Semi-transparent fill creates trailing fade on particles
      ctx.fillStyle = "rgba(15, 5, 5, 0.25)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Spawn a new burst on interval
      if (time - lastBurstRef.current > nextDelay) {
        const x = canvas.width * 0.15 + Math.random() * canvas.width * 0.7;
        const y = canvas.height * 0.1 + Math.random() * canvas.height * 0.35;
        particlesRef.current.push(...createBurst(x, y));
        lastBurstRef.current = time;
        nextDelay = 500 + Math.random() * 400;
      }

      // Update positions and draw
      ctx.shadowBlur = 8;
      for (const p of particlesRef.current) {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.045; // gravity
        p.vx *= 0.985; // air drag
        p.life -= 0.014;
        if (p.life <= 0) continue;

        ctx.globalAlpha = p.life;
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1;

      // Cull dead particles
      particlesRef.current = particlesRef.current.filter((p) => p.life > 0);

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-0 flex flex-col items-center justify-center overflow-y-auto py-6"
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.8, type: "spring", stiffness: 80 }}
        className="relative z-10 text-center px-6"
      >
        <div className="text-6xl mb-6 flex justify-center gap-3">
          {["🎉", "💕", "🥂"].map((emoji, i) => (
            <motion.span
              key={i}
              animate={{
                y: [0, -15, 0],
                rotate: [0, i === 1 ? 0 : (i === 0 ? -15 : 15), 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 1.5,
                delay: i * 0.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="inline-block"
            >
              {emoji}
            </motion.span>
          ))}
        </div>
        <motion.h2
          className="text-5xl font-bold text-valentine-cream drop-shadow-lg mb-4"
          animate={{
            textShadow: [
              "0 0 20px rgba(255,107,157,0.5)",
              "0 0 40px rgba(255,107,157,0.8)",
              "0 0 20px rgba(255,107,157,0.5)",
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Be ready
        </motion.h2>
        <motion.p
          className="text-3xl text-valentine-rose font-semibold drop-shadow-lg"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          6:30PM Feb 14 2026
        </motion.p>
      </motion.div>

      {/* Together photo — slides in after the text */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8, type: "spring", stiffness: 80 }}
        className="relative z-10 mt-4"
      >
        <motion.div
          className="absolute -top-4 -left-4 text-3xl z-20"
          animate={{ scale: [1, 1.3, 1], rotate: [-15, 0, -15] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          🌸
        </motion.div>
        <motion.div
          className="absolute -top-4 -right-4 text-3xl z-20"
          animate={{ scale: [1, 1.3, 1], rotate: [15, 0, 15] }}
          transition={{ duration: 2, delay: 0.5, repeat: Infinity }}
        >
          🌺
        </motion.div>
        <motion.div
          className="absolute -bottom-4 -left-4 text-3xl z-20"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5, delay: 0.3, repeat: Infinity }}
        >
          💗
        </motion.div>
        <motion.div
          className="absolute -bottom-4 -right-4 text-3xl z-20"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5, delay: 0.7, repeat: Infinity }}
        >
          💕
        </motion.div>
        <motion.div
          animate={{
            boxShadow: [
              "0 0 20px rgba(255, 107, 157, 0.3)",
              "0 0 40px rgba(255, 107, 157, 0.6)",
              "0 0 20px rgba(255, 107, 157, 0.3)",
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="rounded-2xl overflow-hidden"
          style={{ border: "2px solid rgba(255, 107, 157, 0.6)" }}
        >
          <Image
            src="/together.jpeg"
            alt="Us together"
            width={2048}
            height={1536}
            className="rounded-2xl max-w-[280px] h-auto"
            priority
          />
        </motion.div>
      </motion.div>

      {/* Bottom decorative row */}
      <motion.div
        className="relative z-10 flex justify-center gap-3 mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        {["🌹", "💖", "✨", "💝", "✨", "💖", "🌹"].map((emoji, i) => (
          <motion.span
            key={i}
            animate={{
              y: [0, -8, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 1.2,
              delay: i * 0.15,
              repeat: Infinity,
            }}
            className="text-2xl"
          >
            {emoji}
          </motion.span>
        ))}
      </motion.div>
    </motion.div>
  );
}
