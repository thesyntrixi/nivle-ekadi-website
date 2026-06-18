export const PUBLIC_CARDS_API_URL =
  process.env.NEXT_PUBLIC_ADMIN_CARDS_API_URL ??
  'https://admin.nivle-ekadi.com/api/public/cards';

export type PublicCard = {
  id: string;
  name: string;
  image_url: string;
  created_at: string;
};

export async function fetchPublicCards(): Promise<PublicCard[]> {
  const response = await fetch(PUBLIC_CARDS_API_URL);

  if (!response.ok) {
    throw new Error('Failed to fetch public cards');
  }

  const data = await response.json();
  return Array.isArray(data) ? data : [];
}
