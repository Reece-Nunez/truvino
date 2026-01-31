"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";

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

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            className="object-cover"
            priority={index === 0}
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/60" />
        </div>
      ))}

      {/* Content Overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="font-[family-name:var(--font-cormorant)] text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            <span className="text-[#C9A962]">Premium</span> Wine & Spirits
          </h1>
          <p className="mx-auto mt-6 max-w-2xl font-[family-name:var(--font-montserrat)] text-lg text-gray-300 sm:text-xl">
            Global distribution, warehousing, and delivery of the world&apos;s finest wines and spirits
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="#portfolio"
              className="rounded-full bg-[#C9A962] px-8 py-3 font-[family-name:var(--font-montserrat)] text-sm font-medium text-black transition-all hover:bg-[#D4BA7A] hover:shadow-lg hover:shadow-[#C9A962]/20"
            >
              Explore Our Portfolio
            </a>
            <a
              href="#services"
              className="rounded-full border-2 border-[#C9A962] px-8 py-3 font-[family-name:var(--font-montserrat)] text-sm font-medium text-[#C9A962] transition-all hover:bg-[#C9A962] hover:text-black"
            >
              Our Services
            </a>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-3 text-[#C9A962] backdrop-blur-sm transition-all hover:bg-black/60 border border-[#C9A962]/30"
        aria-label="Previous slide"
      >
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-3 text-[#C9A962] backdrop-blur-sm transition-all hover:bg-black/60 border border-[#C9A962]/30"
        aria-label="Next slide"
      >
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentSlide ? "w-8 bg-[#C9A962]" : "w-2 bg-[#C9A962]/40 hover:bg-[#C9A962]/60"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
