export type PublicCard = {
  id: string;
  name: string;
  image_url: string;
  created_at: string;
};

export const ADMIN_CARDS_API_URL =
  process.env.ADMIN_CARDS_API_URL ??
  'https://admin.nivle-ekadi.com/api/public/cards';

export const GALLERY_REVALIDATE_SECONDS = 10;

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

/** Server-side fetch with ISR — used by Gallery and /api/gallery-cards proxy. */
export async function getPublicCards(): Promise<PublicCard[]> {
  try {
    const response = await fetch(ADMIN_CARDS_API_URL, {
      next: { revalidate: GALLERY_REVALIDATE_SECONDS },
    });

    if (!response.ok) {
      console.error('getPublicCards: admin API error', response.status);
      return [];
    }

    const data = await response.json();
    return normalizePublicCards(data);
  } catch (error) {
    console.error('getPublicCards: fetch failed', error);
    return [];
  }
}
