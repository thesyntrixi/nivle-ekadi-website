"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { SectionHeader } from "@/components/section-header";
import { Reveal, StaggerReveal, StaggerItem, useMotionSettings } from "@/components/motion";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";
import { fetchPublicCards, type PublicCard } from "@/lib/public-cards";

const GALLERY_PRICE = "TZS 1,800";
const FALLBACK_MESSAGE = "Designs zinaongezwa hivi karibuni";

function DesignCard({
  design,
  index,
  isNewlyRevealed,
}: {
  design: PublicCard;
  index: number;
  isNewlyRevealed: boolean;
}) {
  const reduced = usePrefersReducedMotion();
  const { hoverScale, cardTransition } = useMotionSettings();

  return (
    <motion.article
      initial={
        reduced || !isNewlyRevealed
          ? false
          : { opacity: 0, y: 40, scale: 0.95 }
      }
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        ...cardTransition,
        delay: isNewlyRevealed && !reduced ? (index - 6) * 0.1 : 0,
      }}
      whileHover={
        reduced
          ? undefined
          : {
              scale: hoverScale,
              y: -8,
              boxShadow: "0 20px 40px rgba(0, 102, 255, 0.12)",
            }
      }
      className="group"
    >
      <div className="overflow-hidden rounded-2xl border border-foreground/6 bg-card shadow-md shadow-foreground/5 transition-shadow duration-300 group-hover:border-brand/20 group-hover:shadow-xl group-hover:shadow-brand/15">
        <div className="relative aspect-[3/4] w-full overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={design.image_url}
            alt={design.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
            loading="lazy"
          />
        </div>

        <div className="px-3 py-4 text-center sm:px-4 sm:py-5">
          <p className="mt-1 font-display text-xl font-bold text-foreground sm:text-2xl">
            {GALLERY_PRICE}
          </p>
        </div>
      </div>
    </motion.article>
  );
}

export function Gallery() {
  const [expanded, setExpanded] = useState(false);
  const [designs, setDesigns] = useState<PublicCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const reduced = usePrefersReducedMotion();
  const { buttonHoverScale, buttonTapScale, buttonTransition } = useMotionSettings();

  useEffect(() => {
    let mounted = true;

    fetchPublicCards()
      .then((cards) => {
        if (!mounted) return;
        console.log('Designs Zetu gallery cards loaded:', cards.length);
        setDesigns(cards);
        setLoadError(cards.length === 0);
      })
      .catch((error) => {
        if (!mounted) return;
        console.error('Designs Zetu gallery fetch error:', error);
        setDesigns([]);
        setLoadError(true);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  const initialDesigns = designs.slice(0, 6);
  const extraDesigns = designs.slice(6);
  const showExpand = designs.length > 6;

  return (
    <section id="designs" className="w-full bg-paper py-20 sm:py-28">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <Reveal>
          <SectionHeader
            eyebrow="Portfolio"
            title="Designs Zetu"
            description="Vinjari mifano ya mialiko yetu — kila design ina mtindo wake na inaweza kubadilishwa kulingana na tukio lako."
          />
        </Reveal>

        {loading ? (
          <div className="mt-12 flex justify-center py-16">
            <p className="text-sm text-foreground/60">Inapakia designs...</p>
          </div>
        ) : loadError || designs.length === 0 ? (
          <div className="mt-12 flex justify-center py-16">
            <p className="text-center text-sm text-foreground/70">{FALLBACK_MESSAGE}</p>
          </div>
        ) : (
          <>
            <StaggerReveal className="mt-12 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3" stagger={0.1}>
              {initialDesigns.map((design, i) => (
                <StaggerItem key={design.id}>
                  <DesignCard design={design} index={i} isNewlyRevealed={false} />
                </StaggerItem>
              ))}
            </StaggerReveal>

            <AnimatePresence initial={false}>
              {expanded && extraDesigns.length > 0 && (
                <motion.div
                  key="extra-designs"
                  initial={reduced ? false : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="overflow-hidden"
                >
                  <div className="mt-4 grid grid-cols-2 gap-4 sm:mt-6 sm:gap-6 lg:grid-cols-3">
                    {extraDesigns.map((design, i) => (
                      <DesignCard
                        key={design.id}
                        design={design}
                        index={i + 6}
                        isNewlyRevealed
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {showExpand && (
              <Reveal className="mt-10 flex justify-center">
                <motion.button
                  type="button"
                  onClick={() => setExpanded((v) => !v)}
                  whileHover={reduced ? undefined : { scale: buttonHoverScale }}
                  whileTap={reduced ? undefined : { scale: buttonTapScale }}
                  transition={buttonTransition}
                  className="inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-card px-6 py-3 text-sm font-medium text-foreground shadow-sm transition-colors duration-200 hover:border-brand/30 hover:text-brand"
                  aria-expanded={expanded}
                >
                  {expanded ? "Ficha Designs" : "Onyesha Designs Zaidi"}
                  <motion.span
                    animate={{ rotate: expanded ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="size-4" />
                  </motion.span>
                </motion.button>
              </Reveal>
            )}
          </>
        )}
      </div>
    </section>
  );
}
