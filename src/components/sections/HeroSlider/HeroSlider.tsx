"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui";
import { urlFor } from "@/lib/sanity";
import type { HeroSlide, NewsArticle } from "@/types";

interface HeroSliderProps {
  slides: HeroSlide[];
}

export function HeroSlider({ slides }: HeroSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused || slides.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isPaused, slides.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  if (!slides || slides.length === 0) {
    return (
      <div className="relative h-screen bg-gradient-to-b from-btfc-navy to-btfc-navy-dark flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="font-display text-5xl md:text-7xl uppercase tracking-wider mb-4">
            Bollington Town FC
          </h1>
          <p className="text-xl text-white/70">Community Football at its Best</p>
        </div>
      </div>
    );
  }

  const currentSlide = slides[currentIndex];

  return (
    <div
      className="relative h-screen overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Images */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0"
        >
          {currentSlide.image && (
            <Image
              src={urlFor(currentSlide.image).width(1920).height(1080).url()}
              alt={currentSlide.heading || "Hero image"}
              fill
              className="object-cover"
              priority
            />
          )}
          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative h-full container flex items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-2xl"
          >
            {currentSlide.heading && (
              <h1 className="font-display text-4xl md:text-6xl lg:text-7xl text-white uppercase tracking-wider mb-6 leading-tight">
                {currentSlide.heading}
              </h1>
            )}
            {currentSlide.subheading && (
              <p className="text-lg md:text-xl text-white/80 mb-8 leading-relaxed">
                {currentSlide.subheading}
              </p>
            )}
            {(currentSlide.ctaText && currentSlide.ctaLink) || currentSlide.linkedArticle ? (
              <Button
                href={
                  currentSlide.linkedArticle
                    ? `/news/${(currentSlide.linkedArticle as NewsArticle).slug?.current}`
                    : currentSlide.ctaLink
                }
                size="lg"
              >
                {currentSlide.ctaText || "Read More"}
              </Button>
            ) : null}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      {slides.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-btfc-gold hover:text-btfc-navy transition-colors backdrop-blur-sm"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-btfc-gold hover:text-btfc-navy transition-colors backdrop-blur-sm"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      {/* Pagination Dots */}
      {slides.length > 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                "w-3 h-3 rounded-full transition-all duration-300",
                index === currentIndex
                  ? "bg-btfc-gold w-8"
                  : "bg-white/50 hover:bg-white/80"
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 right-8 hidden md:block"
      >
        <div className="flex flex-col items-center text-white/50">
          <span className="text-xs uppercase tracking-widest mb-2 rotate-90 origin-center translate-y-6">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2"
          >
            <div className="w-1 h-2 bg-white/50 rounded-full" />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
