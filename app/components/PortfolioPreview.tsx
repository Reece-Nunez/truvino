"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import AnimatedSection, { AnimatedCard } from "./AnimatedSection";
import { countries, valuedWines } from "../data/portfolio-data";

// Merge valued wines into Italy (same as portfolio page)
const allCountries = countries.map((c) => {
  if (c.id === "italy") {
    return { ...c, products: [...c.products, ...valuedWines] };
  }
  return c;
});

// Override face products for specific countries
const faceProducts: Record<string, string> = {
  greece: "/portfolio/thema-assyrtiko.webp",
  spain: "/portfolio/tio-tio-sangria.webp",
  italy: "/portfolio/vita-bella-prosecco.webp",
  usa: "/golden-archer.png",
  argentina: "/portfolio/tierra-alta-malbec.webp",
};

// Pick a representative product image for each country
const countryCards = allCountries.map((country) => {
  const image =
    faceProducts[country.id] ||
    country.products.find((p) => p.image)?.image ||
    null;
  return {
    id: country.id,
    name: country.name,
    icon: country.icon,
    flag: country.flag,
    productCount: country.products.length,
    image,
  };
});

export default function PortfolioPreview() {
  return (
    <section id="portfolio" className="bg-[#111111] py-24 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <AnimatedSection className="text-center">
          <div className="flex justify-center mb-6">
            <div className="decorative-line" />
          </div>
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Our <span className="text-[#C9A962]">Portfolio</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl font-[family-name:var(--font-montserrat)] text-lg text-gray-400">
            Discover our curated selection of premium wines and spirits from the world&apos;s finest regions
          </p>
        </AnimatedSection>

        {/* Country Cards Grid */}
        <div className="mt-16 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {countryCards.map((card, index) => (
            <AnimatedCard key={card.id} index={index}>
              <Link href={`/portfolio#${card.id}`}>
                <div className="group relative overflow-hidden rounded-2xl bg-[#1a1a1a] border border-[#C9A962]/10 transition-all duration-500 hover:border-[#C9A962]/40 aspect-[3/4]">
                  {/* Product bottle image */}
                  {card.image && (
                    <div className="absolute inset-0 flex items-center justify-center p-4 pb-14">
                      <motion.div
                        className="relative w-full h-full"
                        whileHover={{ scale: 1.08 }}
                        transition={{ duration: 0.4 }}
                      >
                        <Image
                          src={card.image}
                          alt={card.name}
                          fill
                          className="object-contain drop-shadow-[0_0_15px_rgba(201,169,98,0.1)]"
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 16vw"
                        />
                      </motion.div>
                    </div>
                  )}

                  {/* Bottom gradient */}
                  <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#1a1a1a] via-[#1a1a1a]/95 to-transparent" />

                  {/* Country info bar */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 flex items-center gap-2">
                    {card.icon ? (
                      <span
                        className="inline-block h-5 w-5 flex-shrink-0 bg-[#C9A962]"
                        style={{
                          mask: `url(${card.icon}) center/contain no-repeat`,
                          WebkitMask: `url(${card.icon}) center/contain no-repeat`,
                        }}
                      />
                    ) : (
                      <span className="text-lg flex-shrink-0">{card.flag}</span>
                    )}
                    <span className="font-[family-name:var(--font-montserrat)] text-xs font-medium text-white truncate">
                      {card.name}
                    </span>
                    <span className="font-[family-name:var(--font-montserrat)] text-[10px] text-gray-500 ml-auto flex-shrink-0">
                      {card.productCount}
                    </span>
                  </div>

                  {/* Hover glow */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl ring-1 ring-[#C9A962]/30 ring-inset" />
                </div>
              </Link>
            </AnimatedCard>
          ))}
        </div>

        {/* CTA */}
        <AnimatedSection delay={0.4} className="mt-12 text-center flex flex-col sm:flex-row items-center justify-center gap-4">
          <motion.a
            href="/portfolio"
            className="inline-flex items-center gap-2 rounded-full bg-[#C9A962] px-8 py-4 font-[family-name:var(--font-montserrat)] text-sm font-medium text-black"
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(201, 169, 98, 0.4)" }}
            whileTap={{ scale: 0.98 }}
          >
            View Full Portfolio
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.a>
          <motion.a
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full border border-[#C9A962] px-8 py-4 font-[family-name:var(--font-montserrat)] text-sm font-medium text-[#C9A962] transition-colors hover:bg-[#C9A962] hover:text-black"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Is your product looking for distribution?
          </motion.a>
        </AnimatedSection>
      </div>
    </section>
  );
}
