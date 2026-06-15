import { WHATSAPP_NUMBER } from "./constants";

export function whatsappUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function tierOrderMessage(
  designName: string,
  eventType: string,
  tierLabel: string,
): string {
  return `Habari NIVLE Designs! Ningependa design ya "${designName}" (${eventType}) — kifurushi cha ${tierLabel}. Naomba maelezo zaidi.`;
}

export const INQUIRY_MESSAGE =
  "Habari NIVLE Designs! Ningependa kujua zaidi kuhusu mialiko ya kidigitali na vifurushi vyenu (Design, SMS, WhatsApp & RSVP).";

export const CTA_MESSAGE =
  "Habari NIVLE Designs! Niko tayari kuandaa tukio langu. Naomba msaada wa kuchagua design na kifurushi.";
