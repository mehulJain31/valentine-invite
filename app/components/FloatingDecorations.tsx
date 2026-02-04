"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

const HEARTS = ["❤️", "💕", "💗", "💖", "💝", "💘", "💓", "💞"];
const FLOWERS = ["🌸", "🌺", "🌷", "💐", "🌹", "🪻", "🪷", "✿"];
const SPARKLES = ["✨", "💫", "⭐", "🌟"];

interface DecorationItem {
  id: number;
  emoji: string;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  floatRange: number;
  rotateRange: number;
}

interface Props {
  density?: "light" | "medium" | "heavy";
  types?: ("hearts" | "flowers" | "sparkles")[];
}

function getEmojis(types: ("hearts" | "flowers" | "sparkles")[]) {
  const result: string[] = [];
  if (types.includes("hearts")) result.push(...HEARTS);
  if (types.includes("flowers")) result.push(...FLOWERS);
  if (types.includes("sparkles")) result.push(...SPARKLES);
  return result;
}

function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export default function FloatingDecorations({
  density = "medium",
  types = ["hearts", "flowers", "sparkles"],
}: Props) {
  const decorations = useMemo(() => {
    const count = density === "light" ? 12 : density === "medium" ? 20 : 30;
    const emojis = getEmojis(types);
    const items: DecorationItem[] = [];

    for (let i = 0; i < count; i++) {
      const seed = i * 137.508;
      items.push({
        id: i,
        emoji: emojis[Math.floor(seededRandom(seed) * emojis.length)],
        x: seededRandom(seed + 1) * 100,
        y: seededRandom(seed + 2) * 100,
        size: 0.8 + seededRandom(seed + 3) * 1.2,
        delay: seededRandom(seed + 4) * 2,
        duration: 3 + seededRandom(seed + 5) * 4,
        floatRange: 10 + seededRandom(seed + 6) * 20,
        rotateRange: 10 + seededRandom(seed + 7) * 20,
      });
    }
    return items;
  }, [density, types]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {decorations.map((item) => (
        <motion.div
          key={item.id}
          className="absolute select-none"
          style={{
            left: `${item.x}%`,
            top: `${item.y}%`,
            fontSize: `${item.size}rem`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 0.7, 0.5, 0.7, 0],
            scale: [0.5, 1, 1.1, 1, 0.5],
            y: [0, -item.floatRange, 0, item.floatRange, 0],
            x: [0, item.floatRange * 0.5, 0, -item.floatRange * 0.5, 0],
            rotate: [-item.rotateRange, item.rotateRange, -item.rotateRange],
          }}
          transition={{
            duration: item.duration,
            delay: item.delay,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
          }}
        >
          {item.emoji}
        </motion.div>
      ))}
    </div>
  );
}
