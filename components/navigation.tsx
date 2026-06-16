"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";
import { INQUIRY_MESSAGE, whatsappUrl } from "@/lib/whatsapp";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { useMotionSettings } from "@/components/motion";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";

const HOMEPAGE_NAV_LINKS = [
  ...NAV_LINKS,
  { label: "Maelezo", href: "#maelezo" },
] as const;

function NavLink({ href, label, onClick }: { href: string; label: string; onClick?: () => void }) {
  const reduced = usePrefersReducedMotion();

  return (
    <a
      href={href}
      onClick={onClick}
      className="group relative text-sm font-medium text-text-muted-on-dark transition-colors duration-200 hover:text-text-on-dark"
    >
      {label}
      <motion.span
        className="absolute -bottom-1 left-0 h-px bg-brand"
        initial={{ width: 0 }}
        whileHover={reduced ? undefined : { width: "100%" }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      />
    </a>
  );
}

export function Navigation() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduced = usePrefersReducedMotion();
  const { buttonHoverScale, buttonTapScale, buttonTransition } = useMotionSettings();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 w-full">
      <motion.nav
        animate={{
          backgroundColor: scrolled
            ? "rgba(15, 17, 23, 0.98)"
            : "rgba(15, 17, 23, 0.88)",
          borderBottomColor: scrolled
            ? "rgba(255, 255, 255, 0.12)"
            : "rgba(255, 255, 255, 0.08)",
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="w-full border-b backdrop-blur-md"
      >
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:h-[4.5rem] sm:px-6">
          <motion.a
            href="#"
            initial={reduced ? false : { opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="inline-flex shrink-0 items-center"
          >
            <Image
              src="/logo-03.png"
              alt="NIVLE Designs"
              width={160}
              height={40}
              className="h-8 w-auto sm:h-9"
              priority
            />
          </motion.a>

          <div className="hidden items-center gap-8 sm:flex">
            {HOMEPAGE_NAV_LINKS.map((link) => (
              <NavLink key={link.href} href={link.href} label={link.label} />
            ))}
            <WhatsAppButton href={whatsappUrl(INQUIRY_MESSAGE)} size="sm">
              WhatsApp
            </WhatsAppButton>
          </div>

          <motion.button
            type="button"
            onClick={() => setOpen((v) => !v)}
            whileHover={reduced ? undefined : { scale: buttonHoverScale }}
            whileTap={reduced ? undefined : { scale: buttonTapScale }}
            transition={buttonTransition}
            className="flex size-10 items-center justify-center rounded-lg text-text-on-dark transition-colors hover:bg-white/8 sm:hidden"
            aria-label={open ? "Funga menyu" : "Fungua menyu"}
            aria-expanded={open}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </motion.button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={reduced ? false : { height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="overflow-hidden border-t border-white/8 bg-dark sm:hidden"
            >
              <div className="flex flex-col gap-1 px-4 py-4">
                {HOMEPAGE_NAV_LINKS.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    initial={reduced ? false : { opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.3 }}
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-3 py-3 text-base font-medium text-text-on-dark transition-colors hover:bg-white/8"
                  >
                    {link.label}
                  </motion.a>
                ))}
                <div className="mt-2 px-1">
                  <WhatsAppButton
                    href={whatsappUrl(INQUIRY_MESSAGE)}
                    className="w-full"
                    size="lg"
                  >
                    Ongea Nasi WhatsApp
                  </WhatsAppButton>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </header>
  );
}
