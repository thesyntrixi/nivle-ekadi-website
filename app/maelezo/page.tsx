import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Maelezo Muhimu — NIVLE Designs",
  description:
    "Soma maelezo muhimu kabla ya kuagiza mwaliko kidigitali kutoka NIVLE Designs — vifurushi, orodha ya wageni, marekebisho, na zaidi.",
  openGraph: {
    title: "Maelezo Muhimu — NIVLE Designs",
    description:
      "Soma maelezo muhimu kabla ya kuagiza mwaliko kidigitali kutoka NIVLE Designs.",
    locale: "sw_TZ",
    type: "website",
    siteName: "NIVLE Designs",
  },
};

const WHATSAPP_URL = "https://wa.me/255798987859";

const MAELEZO_POINTS = [
  {
    emoji: "📖",
    content: (
      <>
        <strong className="font-semibold text-text-on-dark">Soma vizuri</strong> maelezo ya
        kila kifurushi (Basic/Standard/Premium) kabla ya kuagiza, ili uchague kinachofaa
        tukio lako.
      </>
    ),
  },
  {
    emoji: "⚠️",
    content: (
      <>
        <strong className="font-semibold text-text-on-dark">
          Hakiki MAJINA na NAMBA ZA SIMU
        </strong>{" "}
        za wageni wote kabla ya kutuma orodha. Ujumbe ukiwa umetumwa (hata kama jina/namba si
        sahihi), inahesabika kama kadi limetumika — halirejeshwi bure.
      </>
    ),
  },
  {
    emoji: "👥",
    content: (
      <>
        Wakati wa kuorodhesha wageni,{" "}
        <strong className="font-semibold text-text-on-dark">tofautisha wazi</strong> kati ya
        &ldquo;<strong className="font-semibold text-text-on-dark">Single</strong>&rdquo; (mgeni
        mmoja) na &ldquo;<strong className="font-semibold text-text-on-dark">Double</strong>
        &rdquo; (wanandoa/familia — watu wawili) — hii inaathiri jinsi mwaliko unavyowekwa kwa
        jina.
      </>
    ),
  },
  {
    emoji: "✏️",
    content: (
      <>
        <strong className="font-semibold text-text-on-dark">
          Marekebisho ya bure ni MARA MOJA tu
        </strong>{" "}
        kwa kila design — mabadiliko ya ziada yanaweza kuwa na gharama ndogo ya ziada.
      </>
    ),
  },
  {
    emoji: "📅",
    content: (
      <>
        Taarifa za tukio (tarehe, mahali) zikibadilika BAADA ya kuthibitishwa, tuarifu HARAKA
        ili kurekebisha ratiba ya &ldquo;Save the Date&rdquo;/ukumbusho (Standard &amp; Premium).
      </>
    ),
  },
];

export default function MaelezoPage() {
  return (
    <div className="relative min-h-screen bg-dark">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#0066FF18,_transparent_55%)]" />

      <main className="relative mx-auto w-full max-w-4xl px-4 py-6 sm:px-6 sm:py-8">
        <div className="mb-3 flex justify-center">
          <a
            href="#mwisho"
            className="inline-flex items-center gap-1.5 rounded-full border border-brand/50 bg-brand/10 px-3 py-1 text-xs font-semibold text-brand transition-colors hover:bg-brand/20"
          >
            ⚠️ Disclaimer
          </a>
        </div>

        <header className="text-center">
          <p className="text-3xl sm:text-4xl" aria-hidden="true">
            ⚠️
          </p>
          <h1 className="mt-2 font-display text-xl font-bold leading-tight tracking-tight text-text-on-dark sm:text-2xl">
            Soma Kabla ya Kuagiza
          </h1>
          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-text-muted-on-dark sm:text-base">
            Maelezo haya ni muhimu — soma kwa makini kabla ya kuchagua kifurushi na kutuma
            orodha ya wageni.
          </p>
        </header>

        <ul className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          {MAELEZO_POINTS.map((point, index) => (
            <li
              key={index}
              className={`flex gap-4 rounded-2xl border border-white/10 bg-dark-surface p-5 shadow-lg shadow-black/20 ${
                index === MAELEZO_POINTS.length - 1 ? "md:col-span-2" : ""
              }`}
            >
              <span
                className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand/15 text-2xl"
                aria-hidden="true"
              >
                {point.emoji}
              </span>
              <p className="pt-1 text-sm leading-relaxed text-text-muted-on-dark sm:text-base">
                {point.content}
              </p>
            </li>
          ))}
        </ul>

        <div id="mwisho" className="mt-12 flex scroll-mt-6 flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-3.5 text-sm font-semibold text-text-on-dark transition-colors hover:border-brand/40 hover:text-brand"
          >
            Rudi kwenye ukurasa mkuu
          </Link>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-brand px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand/25 transition-colors hover:bg-brand-hover"
          >
            Uliza kwa WhatsApp
          </a>
        </div>

        <p className="mt-8 text-center text-xs text-text-muted-on-dark">
          NIVLE Designs · Mialiko ya Kidigitali yenye Mtindo
        </p>
      </main>
    </div>
  );
}
