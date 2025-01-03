// src/app/art/page.tsx
import React from 'react';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { getAllArt } from '@/lib/art';
import { ArtGallery } from './art-gallery';

export default async function ArtPage() {
  const artworks = await getAllArt();

  return (
    <ArtGallery initialArtworks={artworks} />
  );
}