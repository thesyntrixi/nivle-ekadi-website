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
