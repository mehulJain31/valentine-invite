"use client";

import { motion } from "framer-motion";
import FloatingDecorations from "./FloatingDecorations";
import FallingPetals from "./FallingPetals";
import HeartBorder from "./HeartBorder";

interface Props {
  name: string;
  onNext: () => void;
}

export default function Landing({ name, onNext }: Props) {
  return (
    <>
      <FloatingDecorations density="medium" types={["hearts", "flowers"]} />
      <FallingPetals count={12} />
      <HeartBorder />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="text-center px-6 relative z-10"
      >
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="text-6xl mb-6"
        >
          💌
        </motion.div>

        <h1 className="text-5xl font-bold text-valentine-cream mb-4">
          Hi {name}
        </h1>

        <p className="text-valentine-rose text-lg mb-12 opacity-75">
          Something special is waiting for you...
        </p>

        <motion.button
          onClick={onNext}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          animate={{
            boxShadow: [
              "0 0 20px rgba(230, 57, 70, 0.4)",
              "0 0 40px rgba(230, 57, 70, 0.8)",
              "0 0 20px rgba(230, 57, 70, 0.4)",
            ],
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="bg-valentine-red text-white font-semibold py-4 px-10 rounded-full text-xl shadow-lg hover:shadow-xl transition-shadow"
        >
          Click Here
        </motion.button>

        <motion.div
          className="flex justify-center gap-2 mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {["🌸", "💕", "🌺", "💗", "🌷"].map((emoji, i) => (
            <motion.span
              key={i}
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 1.2, delay: i * 0.15, repeat: Infinity }}
              className="text-2xl"
            >
              {emoji}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>
    </>
  );
}
