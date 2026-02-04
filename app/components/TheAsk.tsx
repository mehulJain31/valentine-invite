"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface Props {
  onYes: () => void;
}

export default function TheAsk({ onYes }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
      className="text-center px-6 max-w-lg"
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6, type: "spring" }}
        className="text-7xl mb-8"
      >
        💝
      </motion.div>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6, type: "spring" }}
        className="mb-6"
      >
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

      <h2 className="text-4xl font-bold text-valentine-cream mb-12 leading-tight">
        Will you be my<br />valentine cutie?
      </h2>

      <div className="flex gap-6 justify-center flex-wrap">
        <motion.button
          onClick={onYes}
          whileHover={{ scale: 1.12, y: -4 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="bg-valentine-red text-white font-bold py-4 px-10 rounded-full text-xl shadow-lg hover:shadow-xl transition-shadow"
        >
          Yes
        </motion.button>

        <motion.button
          onClick={onYes}
          whileHover={{ scale: 1.12, y: -4 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="bg-valentine-rose text-white font-bold py-4 px-10 rounded-full text-xl shadow-lg hover:shadow-xl transition-shadow"
        >
          Hell Yes
        </motion.button>
      </div>
    </motion.div>
  );
}
