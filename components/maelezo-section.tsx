import { MAELEZO_POINTS, renderMaelezoPointContent } from "@/lib/maelezo-data";

export function MaelezoSection() {
  return (
    <section
      id="maelezo"
      className="relative w-full overflow-hidden bg-dark py-20 sm:py-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#0066FF18,_transparent_55%)]" />

      <div className="relative mx-auto w-full max-w-4xl px-4 sm:px-6">
        <header className="text-center">
          <p className="text-3xl sm:text-4xl" aria-hidden="true">
            ⚠️
          </p>
          <h2 className="mt-2 font-display text-xl font-bold leading-tight tracking-tight text-text-on-dark sm:text-2xl">
            Soma Kabla ya Kuagiza
          </h2>
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
                {renderMaelezoPointContent(point.parts)}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
