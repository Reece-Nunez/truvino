"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AnimatedSection from "../components/AnimatedSection";
import WorldMap from "../components/WorldMap";
import CountryNav from "../components/CountryNav";
import CountrySection from "../components/CountrySection";
import { countries, valuedWines } from "../data/portfolio-data";

// Merge valued wines into Italy's products
const allCountries = countries.map((c) => {
  if (c.id === "italy") {
    return { ...c, products: [...c.products, ...valuedWines] };
  }
  return c;
});

// Total counts
const totalProducts = allCountries.reduce(
  (sum, c) => sum + c.products.length,
  0
);
const totalWines = allCountries.reduce(
  (sum, c) => sum + c.products.filter((p) => p.category === "wine").length,
  0
);
const totalSpirits = allCountries.reduce(
  (sum, c) => sum + c.products.filter((p) => p.category === "spirit").length,
  0
);

export default function PortfolioPage() {
  const [activeCountry, setActiveCountry] = useState<string | null>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map());

  // Show back-to-top button after scrolling past hero
  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll spy: track which country section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveCountry(entry.target.id);
          }
        }
      },
      {
        rootMargin: "-40% 0px -55% 0px",
        threshold: 0,
      }
    );

    // Observe all country sections
    const timer = setTimeout(() => {
      allCountries.forEach((country) => {
        const el = document.getElementById(country.id);
        if (el) {
          sectionRefs.current.set(country.id, el);
          observer.observe(el);
        }
      });
    }, 100);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  const scrollToCountry = useCallback((countryId: string) => {
    const el = document.getElementById(countryId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setActiveCountry(countryId);
    }
  }, []);

  const handleCountryHover = useCallback((_countryId: string | null) => {
    // Hover state is handled internally by WorldMap
  }, []);

  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative h-[60vh] min-h-[500px] w-full overflow-hidden pt-32">
          <Image
            src="/hero-slideshow/product3.jpeg"
            alt="Wine portfolio"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/70" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center px-4">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="flex justify-center mb-6">
                  <div className="decorative-line" />
                </div>
                <h1 className="font-[family-name:var(--font-playfair)] text-4xl sm:text-5xl lg:text-6xl font-bold text-white">
                  Our <span className="text-[#C9A962]">Portfolio</span>
                </h1>
                <p className="mx-auto mt-4 max-w-2xl font-[family-name:var(--font-montserrat)] text-lg text-gray-300">
                  Discover our curated collection of premium wines and spirits
                  from {allCountries.length} countries around the world
                </p>
              </motion.div>

              {/* Stats */}
              <motion.div
                className="flex justify-center gap-8 sm:gap-12 mt-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                {[
                  { value: totalProducts + "+", label: "Products" },
                  { value: totalWines + "+", label: "Wines" },
                  { value: totalSpirits + "+", label: "Spirits" },
                  {
                    value: allCountries.length.toString(),
                    label: "Countries",
                  },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <p className="font-[family-name:var(--font-playfair)] text-2xl sm:text-3xl font-bold text-[#C9A962]">
                      {stat.value}
                    </p>
                    <p className="font-[family-name:var(--font-montserrat)] text-xs sm:text-sm text-gray-400 mt-1">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
        </section>

        {/* World Map Section */}
        <section className="bg-[#0a0a0a] py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <AnimatedSection className="text-center mb-12">
              <h2 className="font-[family-name:var(--font-playfair)] text-2xl sm:text-3xl font-bold text-white">
                Explore by <span className="text-[#C9A962]">Region</span>
              </h2>
              <p className="mx-auto mt-3 max-w-xl font-[family-name:var(--font-montserrat)] text-gray-400">
                Select a country on the map to explore its offerings
              </p>
            </AnimatedSection>

            <WorldMap
              countries={allCountries}
              activeCountry={activeCountry}
              onCountrySelect={scrollToCountry}
              onCountryHover={handleCountryHover}
            />
          </div>
        </section>

        {/* Sticky Country Navigation */}
        <CountryNav
          countries={allCountries}
          activeCountry={activeCountry}
          onCountryClick={scrollToCountry}
        />

        {/* Country Sections */}
        {allCountries.map((country, index) => (
          <CountrySection key={country.id} country={country} index={index} />
        ))}

        {/* CTA Section */}
        <section className="bg-[#0a0a0a] py-24 border-t border-[#C9A962]/10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <AnimatedSection>
              <div className="flex justify-center mb-6">
                <div className="decorative-line" />
              </div>
              <h2 className="font-[family-name:var(--font-playfair)] text-2xl sm:text-3xl font-bold text-white">
                Looking for{" "}
                <span className="text-[#C9A962]">Distribution?</span>
              </h2>
              <p className="mx-auto mt-4 max-w-xl font-[family-name:var(--font-montserrat)] text-gray-400">
                Whether you&apos;re a brand seeking distribution or a retailer
                looking to expand your selection, we&apos;d love to connect.
              </p>
              <motion.a
                href="/contact"
                className="inline-flex items-center gap-2 mt-8 rounded-full bg-[#C9A962] px-8 py-4 font-[family-name:var(--font-montserrat)] text-sm font-medium text-black"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 30px rgba(201, 169, 98, 0.4)",
                }}
                whileTap={{ scale: 0.98 }}
              >
                Get In Touch
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </motion.a>
            </AnimatedSection>
          </div>
        </section>
      </main>
      <Footer />

      {/* Back to top button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-[#C9A962] text-black flex items-center justify-center shadow-lg shadow-[#C9A962]/20 hover:bg-[#d4b96f] transition-colors"
            aria-label="Back to top"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 15l7-7 7 7"
              />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
