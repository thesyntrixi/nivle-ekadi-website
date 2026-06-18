export const WHATSAPP_NUMBER = "255767987878";

/** Client-uploaded card images in public/ */
export const CARD_IMAGES = [
  "/card1.jpg",
  "/card2.jpg",
  "/card3_CARD.jpg",
  "/card3_CARD2.jpg",
  "/card3_CARD 1.jpg",
  "/card4-01.jpg",
  "/card5-01.jpg",
  "/card6-01.jpg",
] as const;

export type PricingTierId = "design" | "sms" | "full";

export type PricingTier = {
  id: PricingTierId;
  label: string;
  shortLabel: string;
  price: number;
  recommended?: boolean;
};

export type Design = {
  id: string;
  name: string;
  eventType: string;
  premium: boolean;
  image: string;
};

export const DESIGNS: Design[] = [
  { id: "1", name: "Maua ya Upendo", eventType: "Harusi", premium: false, image: CARD_IMAGES[0] },
  { id: "2", name: "Jikoni ya Furaha", eventType: "Kitchen Party", premium: false, image: CARD_IMAGES[1] },
  { id: "3", name: "Safari Mpya", eventType: "Send-off", premium: false, image: CARD_IMAGES[2] },
  { id: "4", name: "Siku ya Kuzaliwa", eventType: "Birthday", premium: false, image: CARD_IMAGES[3] },
  { id: "5", name: "Kofia na Gown", eventType: "Mahafali", premium: false, image: CARD_IMAGES[4] },
  { id: "6", name: "Mapenzi ya Dhahabu", eventType: "Uchumba", premium: false, image: CARD_IMAGES[5] },
  { id: "7", name: "Miaka ya Upendo", eventType: "Anniversary", premium: false, image: CARD_IMAGES[6] },
  { id: "8", name: "Karamu ya Jioni", eventType: "Karamu", premium: false, image: CARD_IMAGES[7] },
  { id: "9", name: "Mtoto Mpya", eventType: "Sherehe ya Mtoto", premium: false, image: CARD_IMAGES[0] },
  { id: "10", name: "Harusi ya Ndoto", eventType: "Harusi", premium: true, image: CARD_IMAGES[1] },
  { id: "11", name: "Safari ya Kifahari", eventType: "Send-off", premium: true, image: CARD_IMAGES[2] },
  { id: "12", name: "Mahafali ya Dhahabu", eventType: "Mahafali", premium: false, image: CARD_IMAGES[3] },
];

export function getPricingTiers(design: Design): PricingTier[] {
  if (design.premium) {
    return [
      { id: "design", label: "Design Tu", shortLabel: "Design", price: 2100 },
      { id: "sms", label: "+ SMS", shortLabel: "+ SMS", price: 2400 },
      { id: "full", label: "+ WhatsApp & RSVP", shortLabel: "+ WhatsApp", price: 3300, recommended: true },
    ];
  }
  return [
    { id: "design", label: "Design Tu", shortLabel: "Design", price: 1800 },
    { id: "sms", label: "+ SMS", shortLabel: "+ SMS", price: 2100 },
    { id: "full", label: "+ WhatsApp & RSVP", shortLabel: "+ WhatsApp", price: 3000, recommended: true },
  ];
}

export function formatPrice(price: number): string {
  return `TZS ${price.toLocaleString("en-US")}`;
}

export const NAV_LINKS = [
  { label: "Designs", href: "#designs" },
  { label: "Kifurushi", href: "#kifurushi" },
  { label: "Jinsi Inavyofanya Kazi", href: "#jinsi-inavyofanya-kazi" },
] as const;

/** Hero stack & mockup images */
export const HERO_CARD_IMAGES = [CARD_IMAGES[4], CARD_IMAGES[5], CARD_IMAGES[6]] as const;
export const MOCKUP_IMAGE = CARD_IMAGES[0];
