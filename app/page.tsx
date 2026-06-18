import { Navigation as Nav } from '@/components/navigation';
import { Hero } from '@/components/hero';
import { Gallery } from '@/components/gallery';
import { PackageSection as Package } from '@/components/package-section';
import { MaelezoSection } from '@/components/maelezo-section';
import { HowItWorks } from '@/components/how-it-works';
import { CtaSection as CTA } from '@/components/cta-section';
import { Footer } from '@/components/footer';

export const revalidate = 60;

export default async function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Gallery />
      <Package />
      <MaelezoSection />
      <HowItWorks />
      <CTA />
      <Footer />
    </main>
  );
}
