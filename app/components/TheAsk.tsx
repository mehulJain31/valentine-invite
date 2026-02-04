"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import FloatingDecorations from "./FloatingDecorations";
import FallingPetals from "./FallingPetals";
import HeartBorder from "./HeartBorder";

interface Props {
  onYes: () => void;
}

export default function TheAsk({ onYes }: Props) {
  return (
    <>
      <FloatingDecorations density="heavy" types={["hearts", "flowers", "sparkles"]} />
      <FallingPetals count={18} />
      <HeartBorder />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.5 }}
        className="text-center px-6 max-w-lg relative z-10"
      >
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6, type: "spring" }}
          className="text-7xl mb-8"
        >
          <motion.span
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="inline-block"
          >
            💝
          </motion.span>
        </motion.div>

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6, type: "spring" }}
          className="mb-6 relative"
        >
          <motion.div
            className="absolute -top-3 -left-3 text-2xl"
            animate={{ scale: [1, 1.3, 1], rotate: [-10, 10, -10] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🌸
          </motion.div>
          <motion.div
            className="absolute -top-3 -right-3 text-2xl"
            animate={{ scale: [1, 1.3, 1], rotate: [10, -10, 10] }}
            transition={{ duration: 2, delay: 0.3, repeat: Infinity }}
          >
            🌺
          </motion.div>
          <motion.div
            className="absolute -bottom-3 left-1/2 -translate-x-1/2 text-2xl"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, delay: 0.5, repeat: Infinity }}
          >
            💕
          </motion.div>
          <Image
            src="/ghibli-dinner.png"
            alt="You"
            width={1024}
            height={1536}
            className="rounded-2xl max-w-[160px] h-auto mx-auto"
            style={{
              border: "2px solid rgba(255, 107, 157, 0.6)",
              boxShadow: "0 0 20px rgba(255, 107, 157, 0.3)",
            }}
          />
        </motion.div>

        <motion.h2
          className="text-4xl font-bold text-valentine-cream mb-12 leading-tight"
          animate={{ textShadow: ["0 0 10px rgba(255,107,157,0.3)", "0 0 20px rgba(255,107,157,0.6)", "0 0 10px rgba(255,107,157,0.3)"] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Will you be my<br />valentine cutie?
        </motion.h2>

        <div className="flex gap-6 justify-center flex-wrap">
          <motion.button
            onClick={onYes}
            whileHover={{ scale: 1.12, y: -4 }}
            whileTap={{ scale: 0.95 }}
            animate={{
              boxShadow: [
                "0 0 20px rgba(230, 57, 70, 0.5)",
                "0 0 40px rgba(230, 57, 70, 0.8)",
                "0 0 20px rgba(230, 57, 70, 0.5)",
              ],
            }}
            transition={{ duration: 1.2, repeat: Infinity }}
            className="bg-valentine-red text-white font-bold py-4 px-10 rounded-full text-xl shadow-lg hover:shadow-xl transition-shadow"
          >
            Yes
          </motion.button>

          <motion.button
            onClick={onYes}
            whileHover={{ scale: 1.12, y: -4 }}
            whileTap={{ scale: 0.95 }}
            animate={{
              boxShadow: [
                "0 0 20px rgba(255, 107, 157, 0.5)",
                "0 0 40px rgba(255, 107, 157, 0.8)",
                "0 0 20px rgba(255, 107, 157, 0.5)",
              ],
            }}
            transition={{ duration: 1.2, delay: 0.6, repeat: Infinity }}
            className="bg-valentine-rose text-white font-bold py-4 px-10 rounded-full text-xl shadow-lg hover:shadow-xl transition-shadow"
          >
            Hell Yes
          </motion.button>
        </div>

        <motion.div
          className="flex justify-center gap-2 mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          {["🌹", "💗", "✨", "💖", "🌷", "💕", "🌸"].map((emoji, i) => (
            <motion.span
              key={i}
              animate={{ y: [0, -10, 0], rotate: [0, 10, -10, 0] }}
              transition={{ duration: 1.5, delay: i * 0.1, repeat: Infinity }}
              className="text-xl"
            >
              {emoji}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>
    </>
  );
}
