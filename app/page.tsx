'use client';

import { Navigation as Nav } from '@/components/navigation';
import { Hero } from '@/components/hero';
import { Gallery } from '@/components/gallery';
import { PackageSection as Package } from '@/components/package-section';
import { HowItWorks } from '@/components/how-it-works';
import { CtaSection as CTA } from '@/components/cta-section';
import { Footer } from '@/components/footer';

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Gallery />
      <Package />
      <HowItWorks />
      <CTA />
      <Footer />
    </main>
  );
}
