"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { usePrefersReducedMotion, useIsMobile } from "@/hooks/use-reduced-motion";

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
  const isMobile = useIsMobile();
  const liteMotion = reduced;

  return {
    reduced: liteMotion,
    isMobile,
    scrollDuration: liteMotion ? 0 : 0.8,
    textDuration: liteMotion ? 0 : 0.7,
    cardTransition: { duration: liteMotion ? 0 : 0.3, ease: "easeOut" as const },
    buttonTransition: { duration: liteMotion ? 0 : 0.2, ease: "easeOut" as const },
    hoverScale: liteMotion ? 1 : 1.05,
    buttonHoverScale: liteMotion ? 1 : 1.02,
    buttonTapScale: liteMotion ? 1 : 0.98,
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

  if (reduced) {
    return <div className={className}>{children as React.ReactNode}</div>;
  }

  return (
    <motion.div
      initial="hidden"
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
  const { reduced } = useMotionSettings();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial="hidden"
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

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  const hidden =
    from === "left"
      ? { opacity: 0, x: -30 }
      : from === "right"
        ? { opacity: 0, x: 30 }
        : { opacity: 0, y: 40 };

  return (
    <motion.div
      variants={{
        hidden,
        visible: {
          opacity: 1,
          x: 0,
          y: 0,
          transition: { duration: scrollDuration, ease: "easeOut" },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
