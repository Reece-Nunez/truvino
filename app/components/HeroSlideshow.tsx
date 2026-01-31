"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  { src: "/hero-slideshow/product1.jpeg", alt: "Premium Wine Selection 1" },
  { src: "/hero-slideshow/product2.jpeg", alt: "Premium Wine Selection 2" },
  { src: "/hero-slideshow/product3.jpeg", alt: "Premium Wine Selection 3" },
  { src: "/hero-slideshow/product4.jpeg", alt: "Premium Wine Selection 4" },
  { src: "/hero-slideshow/product5.jpeg", alt: "Premium Wine Selection 5" },
  { src: "/hero-slideshow/product6.jpeg", alt: "Premium Wine Selection 6" },
  { src: "/hero-slideshow/product7.png", alt: "Premium Wine Selection 7" },
  { src: "/hero-slideshow/product8.jpeg", alt: "Premium Wine Selection 8" },
  { src: "/hero-slideshow/product9.png", alt: "Premium Wine Selection 9" },
  { src: "/hero-slideshow/product10.png", alt: "Premium Wine Selection 10" },
];

// Preload all images
const preloadImages = () => {
  slides.forEach((slide) => {
    const img = new window.Image();
    img.src = slide.src;
  });
};

export default function HeroSlideshow() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const nextSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setTimeout(() => setIsTransitioning(false), 1000);
  }, [isTransitioning]);

  const prevSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setTimeout(() => setIsTransitioning(false), 1000);
  }, [isTransitioning]);

  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentSlide) return;
    setIsTransitioning(true);
    setCurrentSlide(index);
    setTimeout(() => setIsTransitioning(false), 1000);
  };

  // Preload images on mount
  useEffect(() => {
    preloadImages();
  }, []);

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Preload all images (hidden) */}
      <div className="hidden">
        {slides.map((slide, index) => (
          <Image
            key={`preload-${index}`}
            src={slide.src}
            alt={slide.alt}
            width={1920}
            height={1080}
            priority={index < 3}
          />
        ))}
      </div>

      {/* Slides */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={slides[currentSlide].src}
            alt={slides[currentSlide].alt}
            fill
            className="object-cover"
            priority
            loading="eager"
          />
          {/* Dark Overlay with gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/70" />
        </motion.div>
      </AnimatePresence>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/60 to-transparent z-10" />
      <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-[#0a0a0a] to-transparent z-10" />

      {/* Content Overlay */}
      <div className="absolute inset-0 flex items-center justify-center z-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-[family-name:var(--font-playfair)] text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Your Trusted Partner in <span className="text-shimmer">Fine Wines & Spirits</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mx-auto mt-6 max-w-2xl font-[family-name:var(--font-montserrat)] text-lg text-gray-300 sm:text-xl"
          >
            Seamless distribution, warehousing, and logistics solutions for premium brands
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-12"
          >
            <div className="flex justify-center mb-8">
              <div className="decorative-line" />
            </div>
            <p className="font-[family-name:var(--font-montserrat)] text-sm uppercase tracking-[0.3em] text-[#C9A962]">
              New Jersey Wine & Spirits Distributor
            </p>
          </motion.div>

        </div>
      </div>

      {/* Navigation Arrows */}
      <motion.button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-30 rounded-full bg-black/30 p-4 text-[#C9A962] backdrop-blur-sm border border-[#C9A962]/30"
        whileHover={{ scale: 1.1, backgroundColor: "rgba(201, 169, 98, 0.2)" }}
        whileTap={{ scale: 0.95 }}
        aria-label="Previous slide"
      >
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </motion.button>
      <motion.button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-30 rounded-full bg-black/30 p-4 text-[#C9A962] backdrop-blur-sm border border-[#C9A962]/30"
        whileHover={{ scale: 1.1, backgroundColor: "rgba(201, 169, 98, 0.2)" }}
        whileTap={{ scale: 0.95 }}
        aria-label="Next slide"
      >
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </motion.button>

      {/* Slide Indicators */}
      <div className="absolute bottom-12 left-1/2 flex -translate-x-1/2 gap-3 z-30">
        {slides.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentSlide ? "w-10 bg-[#C9A962]" : "w-2 bg-[#C9A962]/40"
            }`}
            whileHover={{ scale: 1.2, backgroundColor: "#C9A962" }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

    </section>
  );
}
