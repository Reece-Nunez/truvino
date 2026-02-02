"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import AnimatedSection from "./AnimatedSection";

// Placeholder testimonials - replace with real content when available
const testimonials = [
  {
    id: 1,
    quote:
      "Truvino has transformed how we approach the U.S. market. Their attention to detail and understanding of premium wines is unmatched.",
    name: "Client Name",
    title: "Winery Director",
    company: "Partner Winery",
  },
  {
    id: 2,
    quote:
      "The level of service and reliability we've experienced with Truvino has exceeded our expectations. They truly understand the spirits industry.",
    name: "Client Name",
    title: "Brand Manager",
    company: "Spirits Brand",
  },
  {
    id: 3,
    quote:
      "Working with Truvino has been a game-changer for our distribution. Their team treats our products with the care they deserve.",
    name: "Client Name",
    title: "Import Director",
    company: "Import Company",
  },
];

export default function TestimonialSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextTestimonial = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prevTestimonial = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    // Resume auto-play after 10 seconds of inactivity
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(nextTestimonial, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextTestimonial]);

  return (
    <section className="bg-[#0a0a0a] py-24 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <AnimatedSection className="text-center">
          <div className="flex justify-center mb-6">
            <div className="decorative-line" />
          </div>
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            What Our <span className="text-[#C9A962]">Partners Say</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl font-[family-name:var(--font-montserrat)] text-lg text-gray-400">
            Trusted by wineries and spirits brands worldwide
          </p>
        </AnimatedSection>

        {/* Testimonial Carousel */}
        <div className="mt-16 relative">
          {/* Quote Icon */}
          <div className="flex justify-center mb-8">
            <svg
              className="h-12 w-12 text-[#C9A962] opacity-30"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
          </div>

          {/* Testimonial Content */}
          <div className="relative min-h-[280px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="text-center max-w-4xl mx-auto px-4"
              >
                <p className="font-[family-name:var(--font-playfair)] text-xl md:text-2xl lg:text-3xl text-white italic leading-relaxed">
                  &ldquo;{testimonials[currentIndex].quote}&rdquo;
                </p>
                <div className="mt-8">
                  <div className="decorative-line mx-auto" />
                </div>
                <div className="mt-6">
                  <p className="font-[family-name:var(--font-montserrat)] text-[#C9A962] font-medium text-lg">
                    {testimonials[currentIndex].name}
                  </p>
                  <p className="font-[family-name:var(--font-montserrat)] text-gray-400 text-sm mt-1">
                    {testimonials[currentIndex].title}, {testimonials[currentIndex].company}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Arrows */}
          {testimonials.length > 1 && (
            <>
              <motion.button
                onClick={() => {
                  prevTestimonial();
                  setIsAutoPlaying(false);
                  setTimeout(() => setIsAutoPlaying(true), 10000);
                }}
                className="absolute left-0 top-1/2 -translate-y-1/2 rounded-full bg-[#1a1a1a] p-3 text-[#C9A962] border border-[#C9A962]/20 hidden md:block"
                whileHover={{ scale: 1.1, borderColor: "rgba(201, 169, 98, 0.5)" }}
                whileTap={{ scale: 0.95 }}
                aria-label="Previous testimonial"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </motion.button>
              <motion.button
                onClick={() => {
                  nextTestimonial();
                  setIsAutoPlaying(false);
                  setTimeout(() => setIsAutoPlaying(true), 10000);
                }}
                className="absolute right-0 top-1/2 -translate-y-1/2 rounded-full bg-[#1a1a1a] p-3 text-[#C9A962] border border-[#C9A962]/20 hidden md:block"
                whileHover={{ scale: 1.1, borderColor: "rgba(201, 169, 98, 0.5)" }}
                whileTap={{ scale: 0.95 }}
                aria-label="Next testimonial"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.button>
            </>
          )}

          {/* Dot Indicators */}
          {testimonials.length > 1 && (
            <div className="flex justify-center gap-3 mt-10">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => goToTestimonial(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "w-8 bg-[#C9A962]"
                      : "w-2 bg-[#C9A962]/30 hover:bg-[#C9A962]/50"
                  }`}
                  whileHover={{ scale: 1.2 }}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
