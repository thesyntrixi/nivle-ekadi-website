import { NextResponse } from 'next/server';
import { normalizePublicCards } from '@/lib/public-cards';

const ADMIN_CARDS_API_URL =
  process.env.ADMIN_CARDS_API_URL ??
  'https://admin.nivle-ekadi.com/api/public/cards';

export async function GET() {
  try {
    const response = await fetch(ADMIN_CARDS_API_URL, { cache: 'no-store' });

    if (!response.ok) {
      console.error('Gallery proxy: admin API error', response.status);
      return NextResponse.json([]);
    }

    const data = await response.json();
    const cards = normalizePublicCards(data);
    console.log('Gallery proxy: fetched cards', cards.length);

    return NextResponse.json(cards);
  } catch (error) {
    console.error('Gallery proxy: fetch failed', error);
    return NextResponse.json([]);
  }
}
