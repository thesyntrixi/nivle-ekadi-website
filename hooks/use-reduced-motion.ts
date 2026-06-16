"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

function getInitialIsMobile(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(max-width: 639px)").matches;
}

export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(getInitialIsMobile);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return isMobile;
}

export function usePrefersReducedMotion(): boolean {
  const prefersReduced = useReducedMotion() ?? false;
  const isMobile = useIsMobile();
  return prefersReduced || isMobile;
}
