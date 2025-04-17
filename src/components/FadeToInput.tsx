'use client';
import { motion } from "framer-motion";

export function FadeToInput({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 2.0, delay: 0.5 }} // texto aparece logo no carregamento
    >
      {children}
    </motion.div>
  );
}
