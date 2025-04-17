"use client";

import { motion } from "framer-motion";
import "./globals.css";
import Footer from "@/components/Footer";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen flex flex-col">
        {/* Camada preta (fundo inicial) */}
        <motion.div
          className="fixed inset-0 -z-20 bg-black"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 2.0, delay: 0.5 }}
        />

        {/* Camada com o gradiente (fundo final) */}
        <div className="fixed inset-0 -z-30 bg-gradient-to-b from-blue-500 to-white" />
        
        <main className="flex-grow">{children}</main>

        <Footer />
      </body>
    </html>
  );
}
