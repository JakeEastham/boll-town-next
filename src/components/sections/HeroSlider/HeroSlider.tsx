"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { urlFor } from "@/lib/sanity";
import type { HeroSlide } from "@/types";

interface HeroSliderProps {
  slides: HeroSlide[];
}

export function HeroSlider({ slides }: HeroSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Background Images */}
      {slides.length > 0 ? (
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <Image
              src={urlFor(slides[currentIndex].image).width(1920).height(1080).url()}
              alt={slides[currentIndex].alt || "Bollington Town FC"}
              fill
              sizes="100vw"
              className="object-cover"
              priority={currentIndex === 0}
              fetchPriority={currentIndex === 0 ? "high" : "auto"}
            />
          </motion.div>
        </AnimatePresence>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-btfc-navy via-btfc-navy-dark to-btfc-blue" />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Club Name */}
      <div className="relative h-full flex items-center justify-center">
        <h1 className="font-display text-4xl md:text-6xl lg:text-7xl text-white uppercase tracking-wider drop-shadow-lg text-center">
          Bollington Town FC
        </h1>
      </div>

      {/* Pagination Dots */}
      {slides.length > 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2.5">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className="flex items-center justify-center min-w-[44px] min-h-[44px]"
              aria-label={`Go to slide ${index + 1}`}
            >
              <span className={cn(
                "h-2 rounded-full transition-all duration-500 block",
                index === currentIndex
                  ? "bg-btfc-gold w-8"
                  : "bg-white/50 w-2 hover:bg-white/80"
              )} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
