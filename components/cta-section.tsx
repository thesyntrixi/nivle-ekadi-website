"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ImageOff } from "lucide-react";
import { Reveal, useMotionSettings } from "@/components/motion";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";
import { DESIGNS } from "@/lib/designs-data";

const WHATSAPP_NUMBER = "255798987859";
const TOTAL_STEPS = 4;
const NO_DESIGN_ID = "none";

const EVENT_TYPES = [
  "Harusi",
  "Kitchen Party",
  "Birthday",
  "Send-off",
  "Mahafali",
  "Uchumba",
  "Conference",
  "Corporate",
  "Other",
] as const;

type FormData = {
  jina: string;
  simu: string;
  tukio: string;
  tarehe: string;
  mahali: string;
  waalikwa: string;
};

const initialForm: FormData = {
  jina: "",
  simu: "",
  tukio: "",
  tarehe: "",
  mahali: "",
  waalikwa: "",
};

type ValidationErrors = Partial<Record<keyof FormData, string>>;

function formatWhatsAppMessage(data: FormData, designLabel: string): string {
  return `Habari NIVLE Designs, ningependa kuagiza mwaliko:

Jina: ${data.jina}
Namba ya simu: ${data.simu}
Aina ya tukio: ${data.tukio}
Tarehe: ${data.tarehe || "—"}
Mahali: ${data.mahali || "—"}
Idadi ya waalikwa: ${data.waalikwa || "—"}
Design niliyochagua: ${designLabel}`;
}

function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function getDesignLabel(selectedDesign: string | null): string {
  if (!selectedDesign) return "Bado sijachagua";
  if (selectedDesign === NO_DESIGN_ID) return "Sina design maalum bado";
  return DESIGNS.find((d) => d.id === selectedDesign)?.name ?? "Bado sijachagua";
}

function getSelectedDesign(selectedDesign: string | null) {
  if (!selectedDesign || selectedDesign === NO_DESIGN_ID) return null;
  return DESIGNS.find((d) => d.id === selectedDesign) ?? null;
}

const labelClass = "mb-1.5 block text-left text-sm font-medium text-white";

function MotionInput({
  focused,
  onFocus,
  onBlur,
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  focused: boolean;
  onFocus: () => void;
  onBlur: () => void;
}) {
  return (
    <motion.div
      className="w-full rounded-xl border"
      animate={
        focused
          ? {
              borderColor: "rgba(0, 102, 255, 0.6)",
              boxShadow: "0 0 0 3px rgba(0, 102, 255, 0.15)",
            }
          : { borderColor: "rgba(255,255,255,0.12)", boxShadow: "0 0 0 0px transparent" }
      }
      transition={{ duration: 0.2 }}
    >
      <input
        onFocus={onFocus}
        onBlur={onBlur}
        className={`${className} border-0 shadow-none`}
        {...props}
      />
    </motion.div>
  );
}

function MotionSelect({
  focused,
  onFocus,
  onBlur,
  className,
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & {
  focused: boolean;
  onFocus: () => void;
  onBlur: () => void;
}) {
  return (
    <motion.div
      className="w-full rounded-xl border"
      animate={
        focused
          ? {
              borderColor: "rgba(0, 102, 255, 0.6)",
              boxShadow: "0 0 0 3px rgba(0, 102, 255, 0.15)",
            }
          : { borderColor: "rgba(255,255,255,0.12)", boxShadow: "0 0 0 0px transparent" }
      }
      transition={{ duration: 0.2 }}
    >
      <select
        onFocus={onFocus}
        onBlur={onBlur}
        className={`${className} border-0 shadow-none`}
        {...props}
      >
        {children}
      </select>
    </motion.div>
  );
}

const inputBaseClass =
  "w-full rounded-xl border bg-dark-surface px-4 py-3 text-sm text-white placeholder:text-white/50 outline-none transition-colors [color-scheme:dark]";

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 48 : -48,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -48 : 48,
    opacity: 0,
  }),
};

function StepIndicator({ step, reduced }: { step: number; reduced: boolean }) {
  return (
    <div className="mb-6 flex flex-col items-center gap-3">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/80">
        Hatua {step} / {TOTAL_STEPS}
      </p>
      <div className="flex items-center gap-2">
        {Array.from({ length: TOTAL_STEPS }, (_, i) => {
          const stepNumber = i + 1;
          const isActive = stepNumber === step;
          const isComplete = stepNumber < step;
          return (
            <motion.span
              key={stepNumber}
              animate={
                reduced
                  ? undefined
                  : {
                      scale: isActive ? 1.15 : 1,
                      backgroundColor: isActive || isComplete ? "#0066FF" : "rgba(255,255,255,0.2)",
                    }
              }
              className="size-2.5 rounded-full"
              style={{
                backgroundColor:
                  isActive || isComplete ? "#0066FF" : "rgba(255,255,255,0.2)",
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5 border-b border-white/8 py-3 last:border-0">
      <span className="text-xs font-medium uppercase tracking-wide text-white/75">
        {label}
      </span>
      <span className="text-sm text-white">{value || "—"}</span>
    </div>
  );
}

export function CtaSection() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [selectedDesign, setSelectedDesign] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [validation, setValidation] = useState<ValidationErrors>({});
  const reduced = usePrefersReducedMotion();
  const { textDuration, buttonHoverScale, buttonTapScale, buttonTransition } =
    useMotionSettings();

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (validation[name as keyof FormData]) {
      setValidation((prev) => {
        const next = { ...prev };
        delete next[name as keyof FormData];
        return next;
      });
    }
  }

  function validateStep(currentStep: number): boolean {
    const errors: ValidationErrors = {};

    if (currentStep === 1) {
      if (!form.jina.trim()) errors.jina = "Tafadhali andika jina lako";
      if (!form.simu.trim()) errors.simu = "Tafadhali andika namba ya simu";
    }

    if (currentStep === 2) {
      if (!form.tukio) errors.tukio = "Tafadhali chagua aina ya tukio";
    }

    setValidation(errors);
    return Object.keys(errors).length === 0;
  }

  function goNext() {
    if (!validateStep(step)) return;
    setDirection(1);
    setStep((s) => Math.min(s + 1, TOTAL_STEPS));
  }

  function goBack() {
    setDirection(-1);
    setStep((s) => Math.max(s - 1, 1));
    setValidation({});
  }

  function resetWizard() {
    setForm(initialForm);
    setStep(1);
    setDirection(0);
    setSelectedDesign(null);
    setSubmitted(false);
    setLoading(false);
    setValidation({});
    setFocusedField(null);
  }

  async function handleSubmit() {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    const message = formatWhatsAppMessage(form, getDesignLabel(selectedDesign));
    window.open(buildWhatsAppUrl(message), "_blank", "noopener,noreferrer");
    setLoading(false);
    setSubmitted(true);
  }

  const selectedDesignData = getSelectedDesign(selectedDesign);
  const slideTransition = reduced
    ? { duration: 0 }
    : { duration: 0.35, ease: "easeInOut" as const };

  return (
    <section className="w-full border-t border-white/8 bg-dark py-20 sm:py-24">
      <div className="mx-auto w-full max-w-xl px-4 sm:px-6">
        <Reveal>
          <div className="text-center">
            <motion.h2
              initial={reduced ? false : { opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: textDuration, ease: "easeOut" }}
              className="font-display text-3xl font-bold tracking-tight text-text-on-dark sm:text-4xl"
            >
              Tayari kuandaa tukio lako?
            </motion.h2>
            <motion.p
              initial={reduced ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: textDuration, ease: "easeOut", delay: 0.2 }}
              className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-white/85 sm:text-lg"
            >
              Jaza maelezo yako, tutakupigia simu au kukuandikia WhatsApp
            </motion.p>
          </div>

          <motion.div
            initial={reduced ? false : { opacity: 0, scale: 0.96, y: 24 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
            className="mt-10 overflow-hidden rounded-2xl border border-white/10 bg-dark-surface p-5 shadow-xl shadow-black/20 sm:p-7"
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={reduced ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: reduced ? 0 : 0.4, ease: "easeOut" }}
                  className="py-4 text-center"
                >
                  <motion.p
                    animate={reduced ? undefined : { scale: [1, 1.02, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="text-lg font-semibold leading-relaxed text-text-on-dark"
                  >
                    Asante! Tumefungua WhatsApp — tuma ujumbe ili tukuwasiliane.
                  </motion.p>
                  <motion.button
                    type="button"
                    onClick={resetWizard}
                    whileHover={reduced ? undefined : { scale: buttonHoverScale }}
                    whileTap={reduced ? undefined : { scale: buttonTapScale }}
                    transition={buttonTransition}
                    className="mt-6 rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-text-on-dark transition-colors hover:border-brand/40 hover:text-brand"
                  >
                    Anza ombi jipya
                  </motion.button>
                </motion.div>
              ) : (
                <motion.div key="wizard">
                  <StepIndicator step={step} reduced={reduced} />

                  <div className="relative min-h-[280px] overflow-hidden">
                    <AnimatePresence mode="wait" custom={direction}>
                      {step === 1 && (
                        <motion.div
                          key="step-1"
                          custom={direction}
                          variants={reduced ? undefined : slideVariants}
                          initial={reduced ? false : "enter"}
                          animate="center"
                          exit={reduced ? undefined : "exit"}
                          transition={slideTransition}
                          className="space-y-5"
                        >
                          <h3 className="font-display text-lg font-semibold text-white">
                            Taarifa Zako
                          </h3>
                          <div>
                            <label htmlFor="jina" className={labelClass}>
                              Jina
                            </label>
                            <MotionInput
                              id="jina"
                              name="jina"
                              type="text"
                              value={form.jina}
                              onChange={handleChange}
                              focused={focusedField === "jina"}
                              onFocus={() => setFocusedField("jina")}
                              onBlur={() => setFocusedField(null)}
                              className={inputBaseClass}
                              placeholder="Jina lako kamili"
                            />
                            {validation.jina && (
                              <p className="mt-1.5 text-xs text-red-400">{validation.jina}</p>
                            )}
                          </div>
                          <div>
                            <label htmlFor="simu" className={labelClass}>
                              Namba ya simu
                            </label>
                            <MotionInput
                              id="simu"
                              name="simu"
                              type="tel"
                              value={form.simu}
                              onChange={handleChange}
                              focused={focusedField === "simu"}
                              onFocus={() => setFocusedField("simu")}
                              onBlur={() => setFocusedField(null)}
                              className={inputBaseClass}
                              placeholder="+255..."
                              pattern="\+?[0-9\s\-]{9,15}"
                            />
                            {validation.simu && (
                              <p className="mt-1.5 text-xs text-red-400">{validation.simu}</p>
                            )}
                          </div>
                        </motion.div>
                      )}

                      {step === 2 && (
                        <motion.div
                          key="step-2"
                          custom={direction}
                          variants={reduced ? undefined : slideVariants}
                          initial={reduced ? false : "enter"}
                          animate="center"
                          exit={reduced ? undefined : "exit"}
                          transition={slideTransition}
                          className="space-y-5"
                        >
                          <h3 className="font-display text-lg font-semibold text-white">
                            Taarifa za Tukio
                          </h3>
                          <div>
                            <label htmlFor="tukio" className={labelClass}>
                              Chagua aina ya tukio
                            </label>
                            <MotionSelect
                              id="tukio"
                              name="tukio"
                              value={form.tukio}
                              onChange={handleChange}
                              focused={focusedField === "tukio"}
                              onFocus={() => setFocusedField("tukio")}
                              onBlur={() => setFocusedField(null)}
                              className={inputBaseClass}
                            >
                              <option value="" disabled>
                                Chagua aina ya tukio
                              </option>
                              {EVENT_TYPES.map((type) => (
                                <option key={type} value={type}>
                                  {type}
                                </option>
                              ))}
                            </MotionSelect>
                            {validation.tukio && (
                              <p className="mt-1.5 text-xs text-red-400">{validation.tukio}</p>
                            )}
                          </div>
                          <div>
                            <label htmlFor="tarehe" className={labelClass}>
                              Tarehe
                            </label>
                            <MotionInput
                              id="tarehe"
                              name="tarehe"
                              type="date"
                              value={form.tarehe}
                              onChange={handleChange}
                              focused={focusedField === "tarehe"}
                              onFocus={() => setFocusedField("tarehe")}
                              onBlur={() => setFocusedField(null)}
                              className={inputBaseClass}
                            />
                          </div>
                          <div>
                            <label htmlFor="mahali" className={labelClass}>
                              Mahali
                            </label>
                            <MotionInput
                              id="mahali"
                              name="mahali"
                              type="text"
                              value={form.mahali}
                              onChange={handleChange}
                              focused={focusedField === "mahali"}
                              onFocus={() => setFocusedField("mahali")}
                              onBlur={() => setFocusedField(null)}
                              className={inputBaseClass}
                              placeholder="Ukumbi, jiji, au eneo"
                            />
                          </div>
                          <div>
                            <label htmlFor="waalikwa" className={labelClass}>
                              Idadi ya waalikwa
                            </label>
                            <MotionInput
                              id="waalikwa"
                              name="waalikwa"
                              type="number"
                              min={1}
                              value={form.waalikwa}
                              onChange={handleChange}
                              focused={focusedField === "waalikwa"}
                              onFocus={() => setFocusedField("waalikwa")}
                              onBlur={() => setFocusedField(null)}
                              className={inputBaseClass}
                              placeholder="Mfano: 50"
                            />
                          </div>
                        </motion.div>
                      )}

                      {step === 3 && (
                        <motion.div
                          key="step-3"
                          custom={direction}
                          variants={reduced ? undefined : slideVariants}
                          initial={reduced ? false : "enter"}
                          animate="center"
                          exit={reduced ? undefined : "exit"}
                          transition={slideTransition}
                          className="space-y-4"
                        >
                          <h3 className="font-display text-lg font-semibold text-white">
                            Chagua Design
                          </h3>
                          <p className="text-sm text-white/85">
                            Chagua design unayopenda, au ruka hatua hii
                          </p>
                          <div className="grid max-h-[340px] grid-cols-2 gap-3 overflow-y-auto pr-1 sm:grid-cols-3">
                            {DESIGNS.map((design) => {
                              const isSelected = selectedDesign === design.id;
                              return (
                                <button
                                  key={design.id}
                                  type="button"
                                  onClick={() =>
                                    setSelectedDesign(isSelected ? null : design.id)
                                  }
                                  className={`relative block w-full overflow-hidden rounded-xl border-2 text-left transition-colors ${
                                    isSelected
                                      ? "border-brand"
                                      : "border-white/10 hover:border-white/25"
                                  }`}
                                >
                                  <div className="relative aspect-[4/5] w-full min-h-[100px] overflow-hidden bg-white/5">
                                    <Image
                                      src={design.image}
                                      alt={design.name}
                                      width={200}
                                      height={250}
                                      className="size-full object-cover"
                                    />
                                  </div>
                                  <div className="px-2 py-2">
                                    <p className="truncate text-xs font-medium text-text-on-dark">
                                      {design.name}
                                    </p>
                                    <p className="truncate text-[10px] text-white/70">
                                      {design.eventType}
                                    </p>
                                  </div>
                                  {isSelected && (
                                    <span className="absolute right-1.5 top-1.5 flex size-5 items-center justify-center rounded-full bg-brand text-white">
                                      <Check className="size-3" strokeWidth={3} />
                                    </span>
                                  )}
                                </button>
                              );
                            })}
                            <button
                              type="button"
                              onClick={() =>
                                setSelectedDesign(
                                  selectedDesign === NO_DESIGN_ID ? null : NO_DESIGN_ID,
                                )
                              }
                              className={`relative flex min-h-[140px] flex-col items-center justify-center gap-2 rounded-xl border-2 p-3 text-center transition-colors ${
                                selectedDesign === NO_DESIGN_ID
                                  ? "border-brand bg-brand/10"
                                  : "border-white/10 hover:border-white/25"
                              }`}
                            >
                              <ImageOff className="size-6 text-white/70" />
                              <span className="text-xs font-medium leading-snug text-text-on-dark">
                                Sina design maalum bado
                              </span>
                              {selectedDesign === NO_DESIGN_ID && (
                                <span className="absolute right-1.5 top-1.5 flex size-5 items-center justify-center rounded-full bg-brand text-white">
                                  <Check className="size-3" strokeWidth={3} />
                                </span>
                              )}
                            </button>
                          </div>
                        </motion.div>
                      )}

                      {step === 4 && (
                        <motion.div
                          key="step-4"
                          custom={direction}
                          variants={reduced ? undefined : slideVariants}
                          initial={reduced ? false : "enter"}
                          animate="center"
                          exit={reduced ? undefined : "exit"}
                          transition={slideTransition}
                          className="space-y-4"
                        >
                          <h3 className="font-display text-lg font-semibold text-white">
                            Muhtasari
                          </h3>
                          <div className="rounded-xl border border-white/8 bg-dark px-4">
                            <SummaryRow label="Jina" value={form.jina} />
                            <SummaryRow label="Namba ya simu" value={form.simu} />
                            <SummaryRow label="Aina ya tukio" value={form.tukio} />
                            <SummaryRow label="Tarehe" value={form.tarehe} />
                            <SummaryRow label="Mahali" value={form.mahali} />
                            <SummaryRow label="Idadi ya waalikwa" value={form.waalikwa} />
                            <div className="flex flex-col gap-2 border-b border-white/8 py-3 last:border-0">
                              <span className="text-xs font-medium uppercase tracking-wide text-white/75">
                                Design uliyochagua
                              </span>
                              {selectedDesignData ? (
                                <div className="flex items-center gap-3">
                                  <div className="relative size-14 shrink-0 overflow-hidden rounded-lg border border-white/10">
                                    <Image
                                      src={selectedDesignData.image}
                                      alt={selectedDesignData.name}
                                      fill
                                      className="object-cover"
                                      sizes="56px"
                                    />
                                  </div>
                                  <span className="text-sm text-text-on-dark">
                                    {selectedDesignData.name}
                                  </span>
                                </div>
                              ) : selectedDesign === NO_DESIGN_ID ? (
                                <span className="text-sm text-text-on-dark">
                                  Sina design maalum bado
                                </span>
                              ) : (
                                <span className="text-sm text-white/75">
                                  Hakuna - bado
                                </span>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="mt-6 flex gap-3">
                    {step > 1 && (
                      <motion.button
                        type="button"
                        onClick={goBack}
                        whileHover={reduced ? undefined : { scale: buttonHoverScale }}
                        whileTap={reduced ? undefined : { scale: buttonTapScale }}
                        transition={buttonTransition}
                        className="flex-1 rounded-full border border-white/15 px-6 py-3.5 text-sm font-semibold text-text-on-dark transition-colors hover:border-brand/40 hover:text-brand"
                      >
                        Nyuma
                      </motion.button>
                    )}
                    {step < TOTAL_STEPS ? (
                      <motion.button
                        type="button"
                        onClick={goNext}
                        whileHover={reduced ? undefined : { scale: buttonHoverScale }}
                        whileTap={reduced ? undefined : { scale: buttonTapScale }}
                        transition={buttonTransition}
                        className="flex-1 rounded-full bg-brand px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand/25 transition-colors duration-200 hover:bg-brand-hover"
                      >
                        Mbele
                      </motion.button>
                    ) : (
                      <motion.button
                        type="button"
                        onClick={handleSubmit}
                        disabled={loading}
                        whileHover={reduced || loading ? undefined : { scale: buttonHoverScale }}
                        whileTap={reduced || loading ? undefined : { scale: buttonTapScale }}
                        transition={buttonTransition}
                        className="flex-1 rounded-full bg-brand px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand/25 transition-colors duration-200 hover:bg-brand-hover disabled:opacity-70"
                      >
                        {loading ? "Inatuma..." : "Tuma Ombi"}
                      </motion.button>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}
