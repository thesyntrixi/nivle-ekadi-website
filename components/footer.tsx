"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/motion";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";

export function Footer() {
  const reduced = usePrefersReducedMotion();

  return (
    <footer className="w-full bg-dark-sidebar py-10">
      <Reveal>
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-4 px-4 text-center sm:px-6">
          <motion.p
            initial={reduced ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: reduced ? 0 : 0.6, ease: "easeOut" }}
            className="font-display text-xl font-bold text-text-on-dark"
          >
            NIVLE Designs
          </motion.p>
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: reduced ? 0 : 0.6, ease: "easeOut", delay: reduced ? 0 : 0.1 }}
            className="flex flex-col gap-2 text-sm text-text-muted-on-dark"
          >
            <a
              href="mailto:kelvin@nivle-ekadi.com"
              className="transition-colors hover:text-brand"
            >
              kelvin@nivle-ekadi.com
            </a>
            <a href="tel:+255767987878" className="transition-colors hover:text-brand">
              0767987878
            </a>
            <p>Makumbusho Millenium Tower Wings B, Dar es Salaam</p>
          </motion.div>
          <motion.p
            initial={reduced ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: reduced ? 0 : 0.6, ease: "easeOut", delay: reduced ? 0 : 0.15 }}
            className="text-sm text-text-muted-on-dark"
          >
            © 2026 NIVLE Designs · Mialiko ya Kidigitali yenye Mtindo
          </motion.p>
        </div>
      </Reveal>
    </footer>
  );
}
