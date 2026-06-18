import { getPublicCards } from '@/lib/public-cards';
import { GalleryClient } from '@/components/gallery-client';

export async function Gallery() {
  const designs = await getPublicCards();
  return <GalleryClient designs={designs} />;
}
