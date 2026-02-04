"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

const PETALS = ["🌸", "💗", "🩷", "🪷", "💕", "🌺"];

interface Petal {
  id: number;
  emoji: string;
  startX: number;
  size: number;
  delay: number;
  duration: number;
  swayAmount: number;
}

interface Props {
  count?: number;
}

function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export default function FallingPetals({ count = 15 }: Props) {
  const petals = useMemo(() => {
    const items: Petal[] = [];
    for (let i = 0; i < count; i++) {
      const seed = i * 97.531;
      items.push({
        id: i,
        emoji: PETALS[Math.floor(seededRandom(seed) * PETALS.length)],
        startX: seededRandom(seed + 1) * 100,
        size: 0.8 + seededRandom(seed + 2) * 0.8,
        delay: seededRandom(seed + 3) * 8,
        duration: 8 + seededRandom(seed + 4) * 6,
        swayAmount: 30 + seededRandom(seed + 5) * 50,
      });
    }
    return items;
  }, [count]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute select-none"
          style={{
            left: `${petal.startX}%`,
            top: "-5%",
            fontSize: `${petal.size}rem`,
          }}
          animate={{
            y: ["0vh", "110vh"],
            x: [0, petal.swayAmount, -petal.swayAmount, petal.swayAmount * 0.5, 0],
            rotate: [0, 180, 360, 540, 720],
            opacity: [0, 0.8, 0.8, 0.6, 0],
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {petal.emoji}
        </motion.div>
      ))}
    </div>
  );
}
