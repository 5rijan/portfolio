'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { format, parseISO } from 'date-fns';
import { X } from 'lucide-react';
import { Card } from '@/components/ui/card';
import type { Art } from '@/lib/art';

interface ArtModalProps {
  art: Art;
  onClose: () => void;
}

function ArtModal({ art, onClose }: ArtModalProps) {
  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center">
      <div className="relative w-full max-w-3xl mx-4 flex gap-6">
        <button
          onClick={onClose}
          className="absolute -top-8 right-0 z-50"
        >
          <X className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
        </button>
        
        <div className="relative w-full h-[60vh] rounded-lg overflow-hidden">
          <Image
            src={art.content}
            alt={art.title}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
          />
        </div>
        
        <div className="space-y-2 pt-1">
          <h2 className="text-sm font-semibold">{art.title}</h2>
          <p className="text-xs text-muted-foreground italic">
            {format(parseISO(art.date), 'MMMM d, yyyy')}
          </p>
        </div>
      </div>
    </div>
  );
}

interface ArtGalleryProps {
  initialArtworks: Art[];
}

export function ArtGallery({ initialArtworks }: ArtGalleryProps) {
  const [selectedArt, setSelectedArt] = useState<Art | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 mx-[-1rem]">
        {initialArtworks.map((art, index) => (
          <Card
            key={index}
            className="group cursor-pointer overflow-hidden rounded-none border-0 transition-opacity hover:opacity-80"
            onClick={() => setSelectedArt(art)}
          >
            <div className="relative aspect-square w-full">
              <Image
                src={art.content}
                alt={art.title}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              />
            </div>
          </Card>
        ))}
      </div>

      {selectedArt && (
        <ArtModal 
          art={selectedArt} 
          onClose={() => setSelectedArt(null)} 
        />
      )}
    </>
  );
}

export default ArtGallery;