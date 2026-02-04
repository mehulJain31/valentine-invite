"use client";

import { motion } from "framer-motion";

interface Props {
  name: string;
  onNext: () => void;
}

export default function Landing({ name, onNext }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="text-center px-6"
    >
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
        className="bg-valentine-red text-white font-semibold py-4 px-10 rounded-full text-xl shadow-lg hover:shadow-xl transition-shadow"
      >
        Click Here
      </motion.button>
    </motion.div>
  );
}
