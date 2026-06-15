"use client";

import { motion } from "framer-motion";
import { Reveal, StaggerReveal, StaggerItem, useMotionSettings } from "@/components/motion";
import { SectionHeader } from "@/components/section-header";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";

const steps = [
  {
    number: "01",
    title: "Chagua Design",
    description:
      "Chagua mtindo unaopenda na kifurushi kinachokufaa — Design, SMS, au WhatsApp & RSVP.",
  },
  {
    number: "02",
    title: "Tupatie Taarifa za Wageni",
    description:
      "Tutumie orodha ya wageni (majina na nambari) kupitia WhatsApp. Sisi tunashughulikia mengine.",
  },
  {
    number: "03",
    title: "Tunatuma Mialiko",
    description:
      "Wageni wanapokea mialiko, wanajibu, na wewe unaona nani anakuja — bila kupiga simu.",
  },
];

export function HowItWorks() {
  const reduced = usePrefersReducedMotion();
  const { hoverScale, cardTransition } = useMotionSettings();

  return (
    <section
      id="jinsi-inavyofanya-kazi"
      className="w-full bg-background py-20 sm:py-28"
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <Reveal>
          <SectionHeader
            eyebrow="Mchakato"
            title="Jinsi Inavyofanya Kazi"
            description="Hatua tatu tu kutoka design hadi kila mgeni kujua mahali na tarehe — na wewe kujua nani anakuja."
          />
        </Reveal>

        <StaggerReveal className="mt-14 grid gap-6 sm:grid-cols-3 sm:gap-8" stagger={0.1}>
          {steps.map((step, i) => (
            <StaggerItem key={step.number}>
              <motion.div
                whileHover={
                  reduced
                    ? undefined
                    : {
                        scale: hoverScale,
                        y: -6,
                        boxShadow: "0 16px 32px rgba(0, 102, 255, 0.08)",
                      }
                }
                transition={cardTransition}
                className="relative h-full rounded-2xl border border-foreground/6 bg-card p-6 shadow-sm transition-shadow duration-300 hover:border-brand/15 sm:p-8"
              >
                {i < steps.length - 1 && (
                  <div className="absolute -right-4 top-1/2 hidden h-px w-8 bg-gradient-to-r from-brand/30 to-transparent sm:block" />
                )}
                <motion.span
                  initial={reduced ? false : { opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.1 }}
                  className="font-display text-4xl font-bold text-brand/20"
                >
                  {step.number}
                </motion.span>
                <h3 className="mt-4 font-display text-xl font-bold text-foreground">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {step.description}
                </p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerReveal>
      </div>
    </section>
  );
}
