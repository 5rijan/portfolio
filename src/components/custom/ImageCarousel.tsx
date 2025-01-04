'use client';

import * as React from 'react';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageCarouselProps {
  images: string[];
  title: string;
}

const ImageCarousel = ({ images, title }: ImageCarouselProps) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [loadedImages, setLoadedImages] = React.useState<Set<number>>(new Set());
  const [imageAspectRatio, setImageAspectRatio] = React.useState(16/10);

  const next = () => {
    setCurrentIndex((current) => 
      current + 1 === images.length ? 0 : current + 1
    );
  };

  const previous = () => {
    setCurrentIndex((current) => 
      current - 1 < 0 ? images.length - 1 : current - 1
    );
  };

  // Keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') previous();
      if (e.key === 'ArrowRight') next();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Preload all images when component mounts
  React.useEffect(() => {
    images.forEach((src, index) => {
      const img = new window.Image();
      img.src = src;
      img.onload = () => {
        if (index === currentIndex) {
          setImageAspectRatio(img.naturalWidth / img.naturalHeight);
        }
        setLoadedImages(prev => new Set([...prev, index]));
      };
    });
  }, [images]);

  return (
    <Card className="relative group overflow-hidden rounded-xl w-full">
      <div 
        className="relative w-full overflow-hidden"
        style={{ paddingBottom: `${(1 / imageAspectRatio) * 100}%` }}
      >
        {/* Preload all images but only show current one */}
        {images.map((src, index) => (
          <div key={src} className={index === currentIndex ? 'block' : 'hidden'}>
            <Image
              src={src}
              alt={`${title} - Image ${index + 1}`}
              fill
              className="object-contain"
              priority={index === 0} // Only first image needs priority
              quality={100}
            />
          </div>
        ))}
        
        {/* Loading indicator */}
        {!loadedImages.has(currentIndex) && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="w-6 h-6 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
          </div>
        )}
        
        {/* Navigation arrows */}
        {images.length > 1 && (
          <div className="absolute inset-0 z-20 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-sm transition-all duration-300"
              onClick={previous}
            >
              <ChevronLeft className="h-5 w-5 text-white" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-sm transition-all duration-300"
              onClick={next}
            >
              <ChevronRight className="h-5 w-5 text-white" />
            </Button>
          </div>
        )}

        {/* Indicators */}
        {images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`
                  h-1 rounded-full transition-all duration-300 
                  ${index === currentIndex 
                    ? 'w-6 bg-black/50' 
                    : 'w-1.5 bg-black/30 hover:bg-black/40'
                  }
                `}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </Card>
  );
};

export default ImageCarousel;