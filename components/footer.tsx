"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/motion";

export function Footer() {
  return (
    <footer className="w-full bg-dark-sidebar py-10">
      <Reveal>
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-3 px-4 text-center sm:px-6">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="font-display text-xl font-bold text-text-on-dark"
          >
            NIVLE Designs
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
            className="text-sm text-text-muted-on-dark"
          >
            © 2026 NIVLE Designs · Mialiko ya Kidigitali yenye Mtindo
          </motion.p>
        </div>
      </Reveal>
    </footer>
  );
}
