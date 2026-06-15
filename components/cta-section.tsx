"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal, useMotionSettings } from "@/components/motion";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";

const WHATSAPP_NUMBER = "255798987859";

const EVENT_TYPES = [
  "Harusi",
  "Kitchen Party",
  "Birthday",
  "Conference",
  "Corporate",
  "Other",
] as const;

type FormData = {
  jina: string;
  tukio: string;
  tarehe: string;
  mahali: string;
  simu: string;
  waalikwa: string;
};

const initialForm: FormData = {
  jina: "",
  tukio: "",
  tarehe: "",
  mahali: "",
  simu: "",
  waalikwa: "",
};

function formatWhatsAppMessage(data: FormData): string {
  return `🎉 MUOMBI MPYA MIALIKO 🎉
Jina: ${data.jina}
Tukio: ${data.tukio}
Tarehe: ${data.tarehe}
Mahali: ${data.mahali}
Simu: ${data.simu}
Waalikwa: ${data.waalikwa}`;
}

function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

const labelClass = "mb-1.5 block text-left text-sm font-medium text-text-on-dark";

function AnimatedField({
  children,
  index,
  reduced,
}: {
  children: React.ReactNode;
  index: number;
  reduced: boolean;
}) {
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.08 }}
    >
      {children}
    </motion.div>
  );
}

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
  "w-full rounded-xl border bg-dark-surface px-4 py-3 text-sm text-text-on-dark placeholder:text-text-muted-on-dark/60 outline-none transition-colors";

export function CtaSection() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const reduced = usePrefersReducedMotion();
  const { textDuration, buttonHoverScale, buttonTapScale, buttonTransition } =
    useMotionSettings();

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    const message = formatWhatsAppMessage(form);
    window.open(buildWhatsAppUrl(message), "_blank", "noopener,noreferrer");
    setLoading(false);
    setSubmitted(true);
  }

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
              className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-text-muted-on-dark sm:text-lg"
            >
              Jaza maelezo yako, tutakupigia simu au kukuandikia WhatsApp
            </motion.p>
          </div>

          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={reduced ? false : { opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="mt-10 rounded-2xl border border-brand/30 bg-brand/10 px-6 py-8 text-center"
              >
                <motion.p
                  animate={reduced ? undefined : { scale: [1, 1.02, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="text-lg font-semibold text-text-on-dark"
                >
                  Asante! Tutakupigia simu karibuni. 🎊
                </motion.p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={reduced ? false : { opacity: 0, scale: 0.9, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
                onSubmit={handleSubmit}
                className="mt-10 space-y-5"
              >
                <AnimatedField index={0} reduced={reduced}>
                  <label htmlFor="jina" className={labelClass}>Jina</label>
                  <MotionInput
                    id="jina"
                    name="jina"
                    type="text"
                    required
                    value={form.jina}
                    onChange={handleChange}
                    focused={focusedField === "jina"}
                    onFocus={() => setFocusedField("jina")}
                    onBlur={() => setFocusedField(null)}
                    className={inputBaseClass}
                    placeholder="Jina lako kamili"
                  />
                </AnimatedField>

                <AnimatedField index={1} reduced={reduced}>
                  <label htmlFor="tukio" className={labelClass}>Tukio</label>
                  <MotionSelect
                    id="tukio"
                    name="tukio"
                    required
                    value={form.tukio}
                    onChange={handleChange}
                    focused={focusedField === "tukio"}
                    onFocus={() => setFocusedField("tukio")}
                    onBlur={() => setFocusedField(null)}
                    className={inputBaseClass}
                  >
                    <option value="" disabled>Chagua aina ya tukio</option>
                    {EVENT_TYPES.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </MotionSelect>
                </AnimatedField>

                <AnimatedField index={2} reduced={reduced}>
                  <label htmlFor="tarehe" className={labelClass}>Tarehe</label>
                  <MotionInput
                    id="tarehe"
                    name="tarehe"
                    type="date"
                    required
                    value={form.tarehe}
                    onChange={handleChange}
                    focused={focusedField === "tarehe"}
                    onFocus={() => setFocusedField("tarehe")}
                    onBlur={() => setFocusedField(null)}
                    className={inputBaseClass}
                  />
                </AnimatedField>

                <AnimatedField index={3} reduced={reduced}>
                  <label htmlFor="mahali" className={labelClass}>Mahali</label>
                  <MotionInput
                    id="mahali"
                    name="mahali"
                    type="text"
                    required
                    value={form.mahali}
                    onChange={handleChange}
                    focused={focusedField === "mahali"}
                    onFocus={() => setFocusedField("mahali")}
                    onBlur={() => setFocusedField(null)}
                    className={inputBaseClass}
                    placeholder="Ukumbi, jiji, au eneo"
                  />
                </AnimatedField>

                <AnimatedField index={4} reduced={reduced}>
                  <label htmlFor="simu" className={labelClass}>Namba ya simu</label>
                  <MotionInput
                    id="simu"
                    name="simu"
                    type="tel"
                    required
                    value={form.simu}
                    onChange={handleChange}
                    focused={focusedField === "simu"}
                    onFocus={() => setFocusedField("simu")}
                    onBlur={() => setFocusedField(null)}
                    className={inputBaseClass}
                    placeholder="+255..."
                    pattern="\+?[0-9\s\-]{9,15}"
                  />
                </AnimatedField>

                <AnimatedField index={5} reduced={reduced}>
                  <label htmlFor="waalikwa" className={labelClass}>Idadi ya waalikwa</label>
                  <MotionInput
                    id="waalikwa"
                    name="waalikwa"
                    type="number"
                    required
                    min={1}
                    value={form.waalikwa}
                    onChange={handleChange}
                    focused={focusedField === "waalikwa"}
                    onFocus={() => setFocusedField("waalikwa")}
                    onBlur={() => setFocusedField(null)}
                    className={inputBaseClass}
                    placeholder="Mfano: 50"
                  />
                </AnimatedField>

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={reduced || loading ? undefined : { scale: buttonHoverScale }}
                  whileTap={reduced || loading ? undefined : { scale: buttonTapScale }}
                  transition={buttonTransition}
                  className="w-full rounded-full bg-brand px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-brand/25 transition-colors duration-200 hover:bg-brand-hover disabled:opacity-70"
                >
                  {loading ? "Inatuma..." : "Tuma Ombi"}
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </Reveal>
      </div>
    </section>
  );
}
