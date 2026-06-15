"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { HERO_CARD_IMAGES } from "@/lib/constants";
import { INQUIRY_MESSAGE, whatsappUrl } from "@/lib/whatsapp";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { useMotionSettings } from "@/components/motion";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";

const heroCards = [
  {
    image: HERO_CARD_IMAGES[0],
    left: "4%",
    top: "14%",
    rotate: -14,
    z: 1,
    scale: 0.9,
    opacity: 0.72,
    price: "TZS 2,100",
    floatY: 10,
    floatRotate: 2,
  },
  {
    image: HERO_CARD_IMAGES[1],
    left: "36%",
    top: "2%",
    rotate: 11,
    z: 2,
    scale: 0.95,
    opacity: 0.86,
    price: "TZS 3,000",
    floatY: 14,
    floatRotate: -2.5,
  },
  {
    image: HERO_CARD_IMAGES[2],
    left: "18%",
    top: "20%",
    rotate: -3,
    z: 3,
    scale: 1,
    opacity: 1,
    price: "TZS 3,000",
    floatY: 8,
    floatRotate: 1.5,
  },
];

export function Hero() {
  const reduced = usePrefersReducedMotion();
  const { textDuration, buttonHoverScale, buttonTapScale, buttonTransition } =
    useMotionSettings();
  const { scrollY } = useScroll();
  const blobY = useTransform(scrollY, [0, 600], [0, reduced ? 0 : 80]);
  const warmBlobY = useTransform(scrollY, [0, 600], [0, reduced ? 0 : -50]);
  const visualY = useTransform(scrollY, [0, 600], [0, reduced ? 0 : 60]);

  return (
    <section className="relative w-full overflow-hidden bg-background pt-24 sm:pt-28">
      <motion.div
        style={{ y: blobY }}
        className="pointer-events-none absolute -right-32 -top-20 size-[28rem] rounded-full bg-brand/8 blur-3xl"
      />
      <motion.div
        style={{ y: warmBlobY }}
        className="pointer-events-none absolute -left-20 bottom-0 size-80 rounded-full bg-accent-warm/15 blur-3xl"
      />

      <div className="mx-auto grid w-full max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-16 lg:py-24">
        <motion.div
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: textDuration }}
          className="relative z-10"
        >
          <motion.p
            initial={reduced ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: textDuration * 0.6, ease: "easeOut" }}
            className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-brand"
          >
            MIALIKO YA KIDIGITALI
          </motion.p>

          <motion.h1
            initial={reduced ? false : { opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: textDuration, ease: "easeOut", delay: 0.1 }}
            className="font-display text-4xl font-bold leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-[3.15rem]"
          >
            Jukwaa la kidijitali kwa mialiko yoyote — tuma kadi na sms 1,000+ kwa
            dakika chache bila wewe kupiga simu.
          </motion.h1>

          <motion.p
            initial={reduced ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: textDuration, ease: "easeOut", delay: 0.35 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
          >
            Tunatengeneza kadi yako, tunatuma kwa kila mgeni kupitia SMS na
            WhatsApp, na majibu ya &ldquo;Nitakuwepo&rdquo; / &ldquo;Sitakuwepo&rdquo;
            yanakuja moja kwa moja kwako — design, ujumbe, na RSVP katika kifurushi
            kimoja.
          </motion.p>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: textDuration, ease: "easeOut", delay: 0.55 }}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <motion.a
              href="#designs"
              whileHover={
                reduced ? undefined : { scale: buttonHoverScale, y: -2 }
              }
              whileTap={reduced ? undefined : { scale: buttonTapScale }}
              transition={buttonTransition}
              className="inline-flex items-center justify-center rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background shadow-lg transition-colors duration-200 hover:bg-brand"
            >
              Tazama Designs Zetu
            </motion.a>
            <WhatsAppButton
              href={whatsappUrl(INQUIRY_MESSAGE)}
              variant="outline"
              size="lg"
            >
              Ongea Nasi WhatsApp
            </WhatsAppButton>
          </motion.div>
        </motion.div>

        <motion.div
          style={{ y: visualY }}
          initial={reduced ? false : { opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: textDuration, ease: "easeOut", delay: 0.4 }}
          className="relative z-10 flex items-center justify-center lg:justify-end"
        >
          <HeroVisual reduced={reduced} />
        </motion.div>
      </div>
    </section>
  );
}

function HeroVisual({ reduced }: { reduced: boolean }) {
  return (
    <div className="relative mx-auto h-[30rem] w-full max-w-[24rem] sm:h-[32rem] sm:max-w-[28rem]">
      {heroCards.map((card, i) => (
        <motion.div
          key={card.image}
          className="absolute w-[15.5rem] overflow-hidden rounded-2xl border border-white/70 bg-card shadow-2xl shadow-foreground/20 sm:w-[17.5rem]"
          style={{
            left: card.left,
            top: card.top,
            zIndex: card.z,
          }}
          initial={{
            rotate: card.rotate,
            scale: card.scale,
            opacity: card.opacity,
            y: 0,
          }}
          animate={
            reduced
              ? {
                  rotate: card.rotate,
                  scale: card.scale,
                  opacity: card.opacity,
                  y: 0,
                }
              : {
                  rotate: [
                    card.rotate,
                    card.rotate + card.floatRotate,
                    card.rotate,
                  ],
                  y: [0, -card.floatY, 0],
                  scale: card.scale,
                  opacity: card.opacity,
                }
          }
          transition={
            reduced
              ? undefined
              : {
                  duration: 4.5 + i * 0.6,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.2,
                }
          }
        >
          <div className="relative aspect-[3/4] w-full">
            <Image
              src={card.image}
              alt="Mfano wa mwaliko wa kidigitali"
              fill
              className="object-cover"
              sizes="(max-width: 640px) 248px, 280px"
              priority={i === 2}
            />
            <div className="absolute right-2 top-2 rounded-full bg-brand px-2.5 py-1 text-[10px] font-bold text-white shadow-md">
              {card.price}
            </div>
          </div>
          <div className="ticket-tear bg-background" />
          <div className="bg-card px-3 py-2">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-brand">
              NIVLE Designs
            </p>
          </div>
        </motion.div>
      ))}

      <motion.div
        className="absolute bottom-2 right-0 rounded-2xl border border-brand/25 bg-card px-4 py-3 shadow-lg shadow-brand/15"
        animate={reduced ? undefined : { y: [0, -6, 0] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <p className="text-xs font-medium text-muted">RSVP papo hapo</p>
        <p className="text-sm font-semibold text-brand">👍 Nitakuwepo</p>
      </motion.div>
    </div>
  );
}
