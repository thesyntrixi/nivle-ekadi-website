import { NextResponse } from 'next/server';
import { getPublicCards } from '@/lib/public-cards';

export const revalidate = 10;

export async function GET() {
  const cards = await getPublicCards();
  return NextResponse.json(cards);
}
