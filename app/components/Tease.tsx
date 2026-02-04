"use client";

import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";

interface Props {
  name: string;
  onYes: () => void;
}

const MESSAGES = [
  "Nice try... 😏",
  "Nope! 😄",
  "Almost! 😘",
  "Just click Yes already! 😜",
];

export default function Tease({ name, onYes }: Props) {
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [attempts, setAttempts] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const dodge = useCallback(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setNoPos({
      x: (Math.random() * 2 - 1) * rect.width * 0.3,
      y: (Math.random() * 2 - 1) * 70,
    });
    setAttempts((n) => n + 1);
  }, []);

  const noPadding =
    attempts >= 10
      ? "py-1 px-3 text-xs"
      : attempts >= 5
        ? "py-2 px-5 text-sm"
        : "py-3 px-6 text-base";

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.5 }}
      className="text-center px-6 max-w-lg w-full"
    >
      <div className="text-5xl mb-6">🤔</div>

      <h2 className="text-3xl font-bold text-valentine-cream mb-3">
        Hi {name}!
      </h2>

      <p className="text-valentine-cream text-lg mb-10 opacity-80 leading-relaxed">
        I have a question....
        <br />
        Do you wanna know what it is?
      </p>

      <div
        ref={containerRef}
        className="flex gap-6 justify-center items-center"
        style={{ height: "180px" }}
      >
        {/* Yes — stays put */}
        <motion.button
          onClick={onYes}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="relative z-10 bg-valentine-red text-white font-semibold py-3 px-8 rounded-full text-lg shadow-lg hover:shadow-xl transition-shadow"
        >
          Yes
        </motion.button>

        {/* No — elusive: dodges on hover/touch, shrinks with attempts, redirects click to Yes */}
        <motion.button
          animate={{ x: noPos.x, y: noPos.y }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          onMouseEnter={dodge}
          onTouchStart={(e) => {
            e.preventDefault();
            dodge();
          }}
          onClick={onYes}
          className={`border text-valentine-cream rounded-full transition-colors cursor-pointer ${noPadding}`}
          style={{
            backgroundColor: "rgba(122, 24, 40, 0.5)",
            borderColor: "rgba(122, 24, 40, 0.6)",
            opacity: Math.max(0.4, 1 - attempts * 0.05),
          }}
        >
          No
        </motion.button>
      </div>

      <div className="h-6 mt-1">
        {attempts > 0 && (
          <p className="text-valentine-rose text-sm">
            {MESSAGES[Math.min(attempts - 1, MESSAGES.length - 1)]}
          </p>
        )}
      </div>
    </motion.div>
  );
}
