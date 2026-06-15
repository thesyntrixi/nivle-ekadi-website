"use client";

import { motion } from "framer-motion";
import type { Design, PricingTier } from "@/lib/constants";
import { formatPrice } from "@/lib/constants";
import { tierOrderMessage, whatsappUrl } from "@/lib/whatsapp";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";

type PricingTiersProps = {
  design: Design;
  tiers: PricingTier[];
};

export function PricingTiers({ design, tiers }: PricingTiersProps) {
  const reduced = usePrefersReducedMotion();

  return (
    <div className="mt-3 space-y-1.5">
      {tiers.map((tier) => (
        <motion.a
          key={tier.id}
          href={whatsappUrl(
            tierOrderMessage(design.name, design.eventType, tier.label),
          )}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={reduced ? undefined : { scale: 1.02 }}
          whileTap={reduced ? undefined : { scale: 0.98 }}
          className={`relative flex items-center justify-between gap-2 rounded-lg px-2.5 py-1.5 text-[11px] transition-colors sm:text-xs ${
            tier.recommended
              ? "border border-brand/40 bg-brand/8 font-medium text-foreground"
              : "border border-foreground/8 bg-foreground/[0.03] text-muted hover:border-brand/25 hover:text-foreground"
          }`}
        >
          <span className="truncate">{tier.shortLabel}</span>
          <span
            className={`shrink-0 font-bold ${tier.recommended ? "text-brand" : "text-foreground"}`}
          >
            {formatPrice(tier.price)}
          </span>
          {tier.recommended && (
            <span className="absolute -right-1 -top-2 rounded-full bg-brand px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wide text-white">
              Maarufu
            </span>
          )}
        </motion.a>
      ))}
    </div>
  );
}
