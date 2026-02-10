"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AnimatedSection from "../components/AnimatedSection";
import WorldMap from "../components/WorldMap";
import CountryNav from "../components/CountryNav";
import CountrySection from "../components/CountrySection";
import ProductFilter from "../components/ProductFilter";
import { countries, valuedWines } from "../data/portfolio-data";
import type { Product } from "../data/portfolio-data";

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

// All products flat
const allProducts: Product[] = allCountries.flatMap((c) => c.products);

// Size sort order (smallest to largest)
const sizeOrder: Record<string, number> = {
  "50ml": 1, "100ml": 2, "187ml": 3, "200ml": 4, "300ml": 5,
  "330ml": 6, "375ml": 7, "700ml": 8, "720ml": 9, "750ml": 10,
  "1L": 11, "1.5L": 12, "1.75L": 13,
};

// Type display labels
const typeLabels: Record<string, string> = {
  red: "Red Wine",
  white: "White Wine",
  rosé: "Rosé",
  sparkling: "Sparkling",
  dessert: "Dessert Wine",
  fortified: "Fortified",
  bourbon: "Bourbon",
  whisky: "Whisky",
  cognac: "Cognac",
  tequila: "Tequila",
  vodka: "Vodka",
  gin: "Gin",
  rum: "Rum",
  cachaça: "Cachaça",
  soju: "Soju",
  sake: "Sake",
  rtd: "RTD",
  sangria: "Sangria",
  liqueur: "Liqueur",
};

// Wine type sort order
const wineOrder = ["red", "white", "rosé", "sparkling", "dessert", "fortified"];
const spiritOrder = ["bourbon", "whisky", "cognac", "tequila", "vodka", "gin", "rum", "cachaça", "soju", "sake", "rtd", "sangria", "liqueur"];
const typeOrder = [...wineOrder, ...spiritOrder];

function filterProducts(
  products: Product[],
  category: string,
  types: string[],
  sizes: string[]
): Product[] {
  return products.filter((p) => {
    if (category === "wine" && p.category !== "wine") return false;
    if (category === "spirit" && p.category !== "spirit") return false;
    if (types.length > 0 && !types.includes(p.type)) return false;
    if (sizes.length > 0) {
      const productSizes = p.bottleSizes || ["750ml"];
      if (!sizes.some((s) => productSizes.includes(s))) return false;
    }
    return true;
  });
}

export default function PortfolioPage() {
  const [activeCountry, setActiveCountry] = useState<string | null>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map());

  // Filter state
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeTypes, setActiveTypes] = useState<string[]>([]);
  const [activeSizes, setActiveSizes] = useState<string[]>([]);

  // Compute filtered products for each country
  const filteredCountries = useMemo(() => {
    return allCountries.map((country) => ({
      ...country,
      filteredProducts: filterProducts(country.products, activeCategory, activeTypes, activeSizes),
    }));
  }, [activeCategory, activeTypes, activeSizes]);

  const totalFilteredProducts = useMemo(
    () => filteredCountries.reduce((sum, c) => sum + c.filteredProducts.length, 0),
    [filteredCountries]
  );

  // Build filter options with counts (based on current other filters)
  const categoryOptions = useMemo(() => {
    const filtered = filterProducts(allProducts, "all", activeTypes, activeSizes);
    return [
      { value: "all", label: "All", count: filtered.length },
      { value: "wine", label: "Wines", count: filtered.filter((p) => p.category === "wine").length },
      { value: "spirit", label: "Spirits", count: filtered.filter((p) => p.category === "spirit").length },
    ];
  }, [activeTypes, activeSizes]);

  const typeOptions = useMemo(() => {
    const filtered = filterProducts(allProducts, activeCategory, [], activeSizes);
    const typeCounts = new Map<string, number>();
    for (const p of filtered) {
      typeCounts.set(p.type, (typeCounts.get(p.type) || 0) + 1);
    }
    return Array.from(typeCounts.entries())
      .sort(([a], [b]) => {
        const ai = typeOrder.indexOf(a);
        const bi = typeOrder.indexOf(b);
        return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
      })
      .map(([type, count]) => ({
        value: type,
        label: typeLabels[type] || type,
        count,
      }));
  }, [activeCategory, activeSizes]);

  const sizeOptions = useMemo(() => {
    const filtered = filterProducts(allProducts, activeCategory, activeTypes, []);
    const sizeCounts = new Map<string, number>();
    for (const p of filtered) {
      const sizes = p.bottleSizes || ["750ml"];
      for (const size of sizes) {
        sizeCounts.set(size, (sizeCounts.get(size) || 0) + 1);
      }
    }
    return Array.from(sizeCounts.entries())
      .sort(([a], [b]) => (sizeOrder[a] || 99) - (sizeOrder[b] || 99))
      .map(([size, count]) => ({
        value: size,
        label: size,
        count,
      }));
  }, [activeCategory, activeTypes]);

  const clearAllFilters = useCallback(() => {
    setActiveCategory("all");
    setActiveTypes([]);
    setActiveSizes([]);
  }, []);

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

        {/* Global Filter Bar */}
        <section className="sticky top-[88px] z-30 bg-[#0a0a0a]/95 backdrop-blur-md border-b border-[#C9A962]/10 py-4">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <ProductFilter
              categories={categoryOptions}
              types={typeOptions}
              sizes={sizeOptions}
              activeCategory={activeCategory}
              activeTypes={activeTypes}
              activeSizes={activeSizes}
              onCategoryChange={setActiveCategory}
              onTypesChange={setActiveTypes}
              onSizesChange={setActiveSizes}
              onClearAll={clearAllFilters}
              totalResults={totalFilteredProducts}
            />
          </div>
        </section>

        {/* Country Sections */}
        {filteredCountries.map((country, index) => (
          <CountrySection
            key={country.id}
            country={country}
            index={index}
            filteredProducts={country.filteredProducts}
          />
        ))}

        {/* No results message */}
        {totalFilteredProducts === 0 && (
          <section className="bg-[#0a0a0a] py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
              <p className="font-[family-name:var(--font-montserrat)] text-gray-500 text-lg">
                No products match your filters.
              </p>
              <button
                onClick={clearAllFilters}
                className="mt-4 font-[family-name:var(--font-montserrat)] text-sm text-[#C9A962] hover:text-[#d4b96f] transition-colors"
              >
                Clear all filters
              </button>
            </div>
          </section>
        )}

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
