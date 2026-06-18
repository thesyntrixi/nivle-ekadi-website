export type PublicCard = {
  id: string;
  name: string;
  image_url: string;
  created_at: string;
};

/** Same-origin proxy avoids browser CORS when calling the admin API. */
export const PUBLIC_CARDS_API_URL = '/api/gallery-cards';

export function normalizePublicCards(data: unknown): PublicCard[] {
  if (!Array.isArray(data)) return [];

  return data
    .filter(
      (item): item is PublicCard =>
        !!item &&
        typeof item === 'object' &&
        typeof (item as PublicCard).id === 'string' &&
        typeof (item as PublicCard).image_url === 'string' &&
        (item as PublicCard).image_url.length > 0
    )
    .map((item) => ({
      id: item.id,
      name: typeof item.name === 'string' ? item.name : 'Design',
      image_url: item.image_url,
      created_at: typeof item.created_at === 'string' ? item.created_at : '',
    }));
}

export async function fetchPublicCards(): Promise<PublicCard[]> {
  const response = await fetch(PUBLIC_CARDS_API_URL, { cache: 'no-store' });

  console.log('Designs Zetu fetch status:', response.status, response.ok);

  if (!response.ok) {
    throw new Error(`Failed to fetch public cards: ${response.status}`);
  }

  const data = await response.json();
  console.log('Designs Zetu fetch raw response:', data);

  const cards = normalizePublicCards(data);
  console.log('Designs Zetu normalized cards:', cards.length, cards);

  return cards;
}
