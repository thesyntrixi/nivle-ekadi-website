"use client";

import { useEffect, useState } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";

export const scrollViewport = { once: true, amount: 0.3 } as const;

export const fadeUpVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

export const slideLeftVariants = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0 },
};

export const scaleInVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
};

export function useMotionSettings() {
  const reduced = usePrefersReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return {
    reduced,
    scrollDuration: reduced ? 0 : isMobile ? 0.5 : 0.8,
    textDuration: reduced ? 0 : isMobile ? 0.5 : 0.7,
    cardTransition: { duration: reduced ? 0 : 0.3, ease: "easeOut" as const },
    buttonTransition: { duration: reduced ? 0 : 0.2, ease: "easeOut" as const },
    hoverScale: reduced ? 1 : 1.05,
    buttonHoverScale: reduced ? 1 : 1.02,
    buttonTapScale: reduced ? 1 : 0.98,
  };
}

type RevealProps = HTMLMotionProps<"div"> & {
  delay?: number;
  variant?: "fadeUp" | "slideLeft" | "scaleIn";
};

export function Reveal({
  children,
  delay = 0,
  className,
  variant = "fadeUp",
  ...props
}: RevealProps) {
  const { reduced, scrollDuration } = useMotionSettings();
  const variants =
    variant === "slideLeft"
      ? slideLeftVariants
      : variant === "scaleIn"
        ? scaleInVariants
        : fadeUpVariants;

  return (
    <motion.div
      initial={reduced ? false : "hidden"}
      whileInView="visible"
      viewport={scrollViewport}
      variants={variants}
      transition={{ duration: scrollDuration, ease: "easeOut", delay }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function StaggerReveal({
  children,
  className,
  stagger = 0.1,
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
}) {
  const { reduced, scrollDuration } = useMotionSettings();

  return (
    <motion.div
      initial={reduced ? false : "hidden"}
      whileInView="visible"
      viewport={scrollViewport}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger, delayChildren: 0.05 } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  from = "bottom",
}: {
  children: React.ReactNode;
  className?: string;
  from?: "bottom" | "left" | "right";
}) {
  const { reduced, scrollDuration } = useMotionSettings();

  const hidden =
    from === "left"
      ? { opacity: 0, x: -30 }
      : from === "right"
        ? { opacity: 0, x: 30 }
        : { opacity: 0, y: 40 };

  return (
    <motion.div
      variants={
        reduced
          ? undefined
          : {
              hidden,
              visible: {
                opacity: 1,
                x: 0,
                y: 0,
                transition: { duration: scrollDuration, ease: "easeOut" },
              },
            }
      }
      className={className}
    >
      {children}
    </motion.div>
  );
}
