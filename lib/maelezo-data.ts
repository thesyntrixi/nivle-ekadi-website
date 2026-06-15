import { createElement, Fragment, type ReactNode } from "react";

export type MaelezoPointPart = {
  bold?: boolean;
  text: string;
};

export type MaelezoPoint = {
  emoji: string;
  parts: MaelezoPointPart[];
};

export const MAELEZO_POINTS: MaelezoPoint[] = [
  {
    emoji: "📖",
    parts: [
      { bold: true, text: "Soma vizuri" },
      {
        text: " maelezo ya kila kifurushi (Basic/Standard/Premium) kabla ya kuagiza, ili uchague kinachofaa tukio lako.",
      },
    ],
  },
  {
    emoji: "⚠️",
    parts: [
      { bold: true, text: "Hakiki MAJINA na NAMBA ZA SIMU" },
      {
        text: " za wageni wote kabla ya kutuma orodha. Ujumbe ukiwa umetumwa (hata kama jina/namba si sahihi), inahesabika kama kadi limetumika — halirejeshwi bure.",
      },
    ],
  },
  {
    emoji: "👥",
    parts: [
      { text: "Wakati wa kuorodhesha wageni, " },
      { bold: true, text: "tofautisha wazi" },
      { text: " kati ya " },
      { bold: true, text: "\u201cSingle\u201d" },
      { text: " (mgeni mmoja) na " },
      { bold: true, text: "\u201cDouble\u201d" },
      {
        text: " (wanandoa/familia — watu wawili) — hii inaathiri jinsi mwaliko unavyowekwa kwa jina.",
      },
    ],
  },
  {
    emoji: "✏️",
    parts: [
      { bold: true, text: "Marekebisho ya bure ni MARA MOJA tu" },
      {
        text: " kwa kila design — mabadiliko ya ziada yanaweza kuwa na gharama ndogo ya ziada.",
      },
    ],
  },
  {
    emoji: "📅",
    parts: [
      {
        text: "Taarifa za tukio (tarehe, mahali) zikibadilika BAADA ya kuthibitishwa, tuarifu HARAKA ili kurekebisha ratiba ya \u201cSave the Date\u201d/ukumbusho (Standard & Premium).",
      },
    ],
  },
];

export type MaelezoTheme = "dark" | "light";

const boldClass: Record<MaelezoTheme, string> = {
  dark: "font-semibold text-text-on-dark",
  light: "font-semibold text-foreground",
};

export function renderMaelezoPointContent(
  parts: MaelezoPointPart[],
  theme: MaelezoTheme = "dark",
): ReactNode {
  return createElement(
    Fragment,
    null,
    ...parts.map((part, index) =>
      part.bold
        ? createElement("strong", { key: index, className: boldClass[theme] }, part.text)
        : part.text,
    ),
  );
}
