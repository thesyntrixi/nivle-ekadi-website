"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { useMotionSettings } from "@/components/motion";

type WhatsAppButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  showIcon?: boolean;
};

const sizeClasses = {
  sm: "px-4 py-2 text-sm gap-1.5",
  md: "px-5 py-2.5 text-sm gap-2",
  lg: "px-6 py-3 text-base gap-2",
};

const variantClasses = {
  primary:
    "bg-brand text-white shadow-lg shadow-brand/25 hover:bg-brand-hover hover:shadow-brand/35",
  outline:
    "border border-brand/30 text-brand bg-brand/5 hover:bg-brand/10 hover:border-brand/50",
  ghost: "text-brand hover:bg-brand/8",
};

export function WhatsAppButton({
  href,
  children,
  variant = "primary",
  size = "md",
  className = "",
  showIcon = true,
}: WhatsAppButtonProps) {
  const { reduced, buttonHoverScale, buttonTapScale, buttonTransition } =
    useMotionSettings();

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={reduced ? undefined : { scale: buttonHoverScale }}
      whileTap={reduced ? undefined : { scale: buttonTapScale }}
      transition={buttonTransition}
      className={`inline-flex items-center justify-center rounded-full font-medium transition-colors duration-200 ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
    >
      {showIcon && <MessageCircle className="size-4 shrink-0" aria-hidden />}
      {children}
    </motion.a>
  );
}
