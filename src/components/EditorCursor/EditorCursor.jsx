import { motion } from "motion/react";

export default function EditorCursor() {
  return (
    <motion.span
      animate={{
        opacity: [1, 0, 1],
        transition: { repeat: Infinity, duration: 0.5 },
      }}
    >
      |
    </motion.span>
  );
}
