"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

interface Heart {
  id: number;
  position: "top" | "bottom" | "left" | "right";
  offset: number;
  size: number;
  delay: number;
}

function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export default function HeartBorder() {
  const hearts = useMemo(() => {
    const items: Heart[] = [];
    const positions: ("top" | "bottom" | "left" | "right")[] = ["top", "bottom", "left", "right"];
    let id = 0;

    positions.forEach((position) => {
      const count = position === "top" || position === "bottom" ? 8 : 5;
      for (let i = 0; i < count; i++) {
        const seed = id * 73.421;
        items.push({
          id: id++,
          position,
          offset: (i / (count - 1)) * 80 + 10,
          size: 0.9 + seededRandom(seed) * 0.6,
          delay: seededRandom(seed + 1) * 1.5,
        });
      }
    });
    return items;
  }, []);

  const getStyle = (heart: Heart) => {
    const base: React.CSSProperties = {
      fontSize: `${heart.size}rem`,
    };

    switch (heart.position) {
      case "top":
        return { ...base, top: "2%", left: `${heart.offset}%` };
      case "bottom":
        return { ...base, bottom: "2%", left: `${heart.offset}%` };
      case "left":
        return { ...base, left: "2%", top: `${heart.offset}%` };
      case "right":
        return { ...base, right: "2%", top: `${heart.offset}%` };
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute select-none"
          style={getStyle(heart)}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 2,
            delay: heart.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          💗
        </motion.div>
      ))}
    </div>
  );
}
