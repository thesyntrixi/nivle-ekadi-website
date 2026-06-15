"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { MOCKUP_IMAGE } from "@/lib/constants";
import { Reveal, StaggerReveal, StaggerItem, useMotionSettings } from "@/components/motion";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";

const packages = [
  {
    name: "Basic",
    price: "1,800",
    unit: "/kadi",
    bg: "#FFE5E5",
    text: "#3D2020",
    muted: "#6B4040",
    accent: "#E85D75",
    features: [
      "Design ya kipekee ya mwaliko",
      "SMS na WhatsApp mwaliko kwa wageni wote, ikiwa na vitufe vya RSVP (Nitakuwepo/Sitakuwepo)",
      "Faili ya picha ya ubora wa juu",
      "Marekebisho moja ya bure, uwasilishaji ndani ya masaa 48",
    ],
    popular: true,
  },
  {
    name: "Standard",
    price: "2,200",
    unit: "/kadi",
    bg: "#0F1117",
    text: "#F0F2F5",
    muted: "#8B949E",
    accent: "#0066FF",
    features: [
      "Kila kitu katika Basic",
      "Kadi ya \"Save the Date\" — inatumwa wiki 1-2 kabla ya tukio",
      "Ukumbusho 1 (SMS na WhatsApp) siku 1-2 kabla ya tukio",
      "Ujumbe wa kibinafsi kwa kila mgeni kwa jina lake",
    ],
  },
  {
    name: "Premium",
    price: "2,500",
    unit: "/kadi",
    bg: "#E8F0FF",
    text: "#14213D",
    muted: "#4A5F8C",
    accent: "#0066FF",
    features: [
      "Kila kitu katika Standard",
      "Ukumbusho wa SIKU YA TUKIO asubuhi (SMS na WhatsApp)",
      "Ufuatiliaji wa RSVP za mwisho kabla ya tukio",
      "Msaada wa kipekee hadi siku ya tukio",
    ],
  },
];

const mockupViewport = { once: true, amount: 0.3 };

export function PackageSection() {
  const reduced = usePrefersReducedMotion();
  const { hoverScale, cardTransition } = useMotionSettings();

  return (
    <section
      id="kifurushi"
      className="relative w-full overflow-hidden bg-background py-20 sm:py-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_#0066FF0A,_transparent_50%)]" />

      <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6">
        <Reveal variant="slideLeft">
          <div className="mx-auto max-w-3xl text-center">
            <motion.p
              initial={reduced ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={mockupViewport}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-brand"
            >
              Vifurushi
            </motion.p>
            <motion.h2
              initial={reduced ? false : { opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={mockupViewport}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
              className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl"
            >
              Pakeji Zetu
            </motion.h2>
            <motion.p
              initial={reduced ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={mockupViewport}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.25 }}
              className="mt-4 text-base leading-relaxed text-muted sm:text-lg"
            >
              Vifurushi vya Bei za EKADI: Vimepangiliwa Kukidhi Bajeti na Mahitaji
              Yako
            </motion.p>
          </div>
        </Reveal>

        <StaggerReveal className="mt-14 grid gap-6 md:grid-cols-3" stagger={0.1}>
          {packages.map((pkg) => (
            <StaggerItem key={pkg.name}>
              <motion.div
                whileHover={
                  reduced
                    ? undefined
                    : {
                        scale: hoverScale,
                        y: -8,
                        boxShadow: "0 24px 48px rgba(0,0,0,0.12)",
                      }
                }
                transition={cardTransition}
                className="relative flex h-full flex-col rounded-3xl p-6 shadow-lg sm:p-7"
                style={{ backgroundColor: pkg.bg, color: pkg.text }}
              >
                {pkg.popular && (
                  <span
                    className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white"
                    style={{ backgroundColor: pkg.accent }}
                  >
                    Maarufu
                  </span>
                )}
                <p className="text-sm font-semibold uppercase tracking-widest opacity-80">
                  {pkg.name}
                </p>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="font-display text-4xl font-bold">TZS {pkg.price}</span>
                  <span className="text-sm font-medium" style={{ color: pkg.muted }}>
                    {pkg.unit}
                  </span>
                </div>
                <ul className="mt-6 flex flex-1 flex-col gap-3">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-sm leading-snug">
                      <Check
                        className="mt-0.5 size-4 shrink-0"
                        style={{ color: pkg.accent }}
                        strokeWidth={2.5}
                      />
                      <span style={{ color: pkg.muted }}>{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerReveal>

        <div className="mt-20">
          <Reveal>
            <p className="mb-10 text-center font-display text-2xl font-bold text-foreground sm:text-3xl">
              Jinsi Wageni Wanapokea Mialiko
            </p>
          </Reveal>

          <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-10">
            <Reveal delay={0.1}>
              <WhatsAppMockup reduced={reduced} />
            </Reveal>
            <Reveal delay={0.2}>
              <SmsMockup reduced={reduced} />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function WhatsAppMockup({ reduced }: { reduced: boolean }) {
  const bubbleTransition = (delay: number) => ({
    duration: reduced ? 0 : 0.6,
    ease: "easeOut" as const,
    delay,
  });

  return (
    <div className="mx-auto w-full max-w-sm">
      <p className="mb-4 text-center text-xs font-semibold uppercase tracking-[0.18em] text-brand">
        WhatsApp
      </p>
      <motion.div
        initial={reduced ? false : { opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={mockupViewport}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="overflow-hidden rounded-[2rem] border border-foreground/10 bg-dark-surface shadow-2xl shadow-foreground/10"
      >
        <div className="flex items-center justify-between bg-[#1f2c34] px-5 py-2.5">
          <span className="text-[11px] font-medium text-white/80">9:41</span>
          <div className="flex items-center gap-1.5">
            <div className="h-2.5 w-4 rounded-sm border border-white/40" />
            <div className="size-2.5 rounded-full bg-white/40" />
          </div>
        </div>

        <div className="flex items-center gap-3 border-b border-white/5 bg-[#1f2c34] px-4 py-3">
          <div className="flex size-9 items-center justify-center rounded-full bg-brand text-xs font-bold text-white">
            N
          </div>
          <div>
            <p className="text-sm font-medium text-white">NIVLE Designs</p>
            <p className="text-[11px] text-[#8696a0]">online</p>
          </div>
        </div>

        <div className="wa-chat-bg space-y-3 px-3 py-5">
          <motion.div
            initial={reduced ? false : { opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={mockupViewport}
            transition={bubbleTransition(0.2)}
            className="max-w-[90%] rounded-lg rounded-tl-none bg-[#1f2c34] p-1.5 shadow-md"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-md">
              <Image
                src={MOCKUP_IMAGE}
                alt="Mwaliko wa harusi"
                fill
                className="object-cover"
                sizes="280px"
              />
            </div>
            <p className="px-2 py-2.5 text-[13px] leading-relaxed text-[#e9edef]">
              Habari Asha, umekaribishwa kwenye Harusi ya Kelvin &amp; Maria.
              Tarehe: 15 Julai 2026. Mahali: Mlimani City Mall. Tafadhali
              thibitisha kuhudhuria:
            </p>
            <span className="block px-2 pb-1 text-right text-[10px] text-[#8696a0]">
              10:24
            </span>
          </motion.div>

          <motion.div
            initial={reduced ? false : { opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={mockupViewport}
            transition={bubbleTransition(0.4)}
            className="space-y-2"
          >
            <motion.button
              type="button"
              animate={
                reduced
                  ? undefined
                  : {
                      boxShadow: [
                        "0 0 0 0 rgba(0, 168, 132, 0)",
                        "0 0 0 6px rgba(0, 168, 132, 0.12)",
                        "0 0 0 0 rgba(0, 168, 132, 0)",
                      ],
                    }
              }
              transition={{ duration: 2.5, repeat: Infinity, delay: 0.8 }}
              className="w-full rounded-lg border border-[#005c4b] bg-[#005c4b]/30 py-3 text-center text-sm font-medium text-[#00a884]"
            >
              👍 Nitakuwepo
            </motion.button>
            <button
              type="button"
              className="w-full rounded-lg border border-[#005c4b] bg-[#005c4b]/20 py-3 text-center text-sm font-medium text-[#00a884]"
            >
              🙏 Sitakuwepo
            </button>
          </motion.div>

          <motion.div
            initial={reduced ? false : { opacity: 0, x: 30, scale: 0.9 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={mockupViewport}
            transition={bubbleTransition(0.6)}
            className="flex justify-end"
          >
            <motion.div
              animate={reduced ? undefined : { y: [0, -3, 0] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
              className="max-w-[75%] rounded-lg rounded-tr-none bg-[#005c4b] px-3 py-2 shadow-sm"
            >
              <p className="text-[13px] font-medium text-[#e9edef]">👍 Nitakuwepo</p>
              <span className="mt-0.5 block text-right text-[10px] text-[#8696a0]">
                10:25 ✓✓
              </span>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

function SmsMockup({ reduced }: { reduced: boolean }) {
  const bubbleTransition = (delay: number) => ({
    duration: reduced ? 0 : 0.6,
    ease: "easeOut" as const,
    delay,
  });

  return (
    <div className="mx-auto w-full max-w-sm">
      <p className="mb-4 text-center text-xs font-semibold uppercase tracking-[0.18em] text-brand">
        SMS
      </p>
      <motion.div
        initial={reduced ? false : { opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={mockupViewport}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="overflow-hidden rounded-[2rem] border border-foreground/10 bg-[#F2F2F7] shadow-2xl shadow-foreground/10"
      >
        <div className="flex items-center justify-between bg-[#F2F2F7] px-5 py-2.5">
          <span className="text-[11px] font-semibold text-foreground/70">9:41</span>
          <div className="flex items-center gap-1.5">
            <div className="h-2.5 w-4 rounded-sm border border-foreground/30" />
            <div className="size-2.5 rounded-full bg-foreground/30" />
          </div>
        </div>

        <div className="border-b border-foreground/8 bg-[#F2F2F7] px-4 py-3 text-center">
          <p className="text-sm font-semibold text-foreground">NIVLE Designs</p>
          <p className="text-[11px] text-muted">Ujumbe</p>
        </div>

        <div className="space-y-4 bg-white px-4 py-6">
          <motion.div
            initial={reduced ? false : { opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={mockupViewport}
            transition={bubbleTransition(0.2)}
            className="flex justify-start"
          >
            <div className="max-w-[92%] rounded-2xl rounded-tl-sm bg-[#E5E5EA] px-4 py-3">
              <p className="text-[13px] leading-relaxed text-foreground">
                Habari Asha, Umealikwa kwenye karamu ya Harusi ya Kelvin &amp;
                Maria. Tarehe: 15 Julai 2026. Mahali: Mlimani City Mall.
                Karibu!
              </p>
              <p className="mt-2 text-[13px] font-medium text-foreground">
                Jibu: <span className="text-brand">NIVLE-4821</span>
              </p>
              <span className="mt-1 block text-right text-[10px] text-muted">
                10:24
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={reduced ? false : { opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={mockupViewport}
            transition={bubbleTransition(0.4)}
            className="flex justify-end"
          >
            <div className="max-w-[75%] rounded-2xl rounded-tr-sm bg-brand px-4 py-3">
              <p className="text-[13px] font-medium text-white">NIVLE-4821</p>
              <span className="mt-1 block text-right text-[10px] text-white/70">
                10:25
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={reduced ? false : { opacity: 0, x: 30, scale: 0.96 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={mockupViewport}
            transition={bubbleTransition(0.6)}
            className="flex justify-start"
          >
            <motion.div
              animate={reduced ? undefined : { y: [0, -3, 0] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
              className="max-w-[92%] rounded-2xl rounded-tl-sm bg-[#E5E5EA] px-4 py-3"
            >
              <p className="text-[13px] leading-relaxed text-foreground">
                Asante Asha! Uthibitisho wako umepokelewa:{" "}
                <span className="font-semibold text-brand">Nitakuwepo ✅</span>
              </p>
              <span className="mt-1 block text-right text-[10px] text-muted">
                10:25
              </span>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
