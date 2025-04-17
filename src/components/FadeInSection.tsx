'use client';
import { motion } from "framer-motion";

export function FadeInSection({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0, ease: "easeOut" }} // texto aparece logo no carregamento
    >
      {children}
    </motion.div>
  );
}
