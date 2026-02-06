"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import type { CountryData } from "../data/portfolio-data";

interface CountryNavProps {
  countries: CountryData[];
  activeCountry: string | null;
  onCountryClick: (countryId: string) => void;
}

export default function CountryNav({
  countries,
  activeCountry,
  onCountryClick,
}: CountryNavProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const pillRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [needsScroll, setNeedsScroll] = useState(false);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const overflows = el.scrollWidth > el.clientWidth + 10;
    setNeedsScroll(overflows);
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [checkScroll]);

  // Auto-scroll the nav to keep the active pill visible
  useEffect(() => {
    if (!activeCountry || !scrollRef.current) return;
    const pill = pillRefs.current.get(activeCountry);
    if (pill) {
      const container = scrollRef.current;
      const pillLeft = pill.offsetLeft;
      const pillWidth = pill.offsetWidth;
      const containerWidth = container.offsetWidth;
      const scrollLeft = container.scrollLeft;

      if (
        pillLeft < scrollLeft + 80 ||
        pillLeft + pillWidth > scrollLeft + containerWidth - 80
      ) {
        container.scrollTo({
          left: pillLeft - containerWidth / 2 + pillWidth / 2,
          behavior: "smooth",
        });
      }
    }
  }, [activeCountry]);

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const scrollAmount = el.clientWidth * 0.6;
    el.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="sticky top-20 z-30 bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-[#C9A962]/20">
      <div className="relative mx-auto px-2 sm:px-4">
        {/* Left scroll arrow */}
        {canScrollLeft && (
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-0 bottom-0 z-20 flex items-center px-3 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/90 to-transparent"
            aria-label="Scroll left"
          >
            <svg
              className="h-5 w-5 text-[#C9A962]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        )}

        {/* Right scroll arrow */}
        {canScrollRight && (
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-0 bottom-0 z-20 flex items-center px-3 bg-gradient-to-l from-[#0a0a0a] via-[#0a0a0a]/90 to-transparent"
            aria-label="Scroll right"
          >
            <svg
              className="h-5 w-5 text-[#C9A962]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        )}

        {/* Scrollable pills */}
        <div
          ref={scrollRef}
          className={`flex gap-1.5 py-2.5 overflow-x-auto scrollbar-hide ${
            needsScroll ? "px-10" : "justify-center px-6"
          }`}
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {countries.map((country) => {
            const isActive = activeCountry === country.id;
            return (
              <button
                key={country.id}
                ref={(el) => {
                  if (el) pillRefs.current.set(country.id, el);
                }}
                onClick={() => onCountryClick(country.id)}
                className={`relative flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-[family-name:var(--font-montserrat)] font-medium transition-all duration-300 whitespace-nowrap ${
                  isActive
                    ? "text-black"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="country-nav-active"
                    className="absolute inset-0 bg-[#C9A962] rounded-full"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                {country.icon ? (
                  <span
                    className={`relative z-10 inline-block h-4 w-4 ${isActive ? "bg-black" : "bg-[#C9A962]"}`}
                    style={{
                      mask: `url(${country.icon}) center/contain no-repeat`,
                      WebkitMask: `url(${country.icon}) center/contain no-repeat`,
                    }}
                  />
                ) : (
                  <span className="relative z-10">{country.flag}</span>
                )}
                <span className="relative z-10">{country.name}</span>
              </button>
            );
          })}
          {/* End spacer */}
          {needsScroll && (
            <div className="flex-shrink-0 w-10" aria-hidden="true" />
          )}
        </div>
      </div>
    </div>
  );
}
