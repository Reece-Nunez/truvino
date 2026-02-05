"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import ProductCard from "./ProductCard";
import type { CountryData } from "../data/portfolio-data";

interface CountrySectionProps {
  country: CountryData;
  index: number;
}

export default function CountrySection({ country, index }: CountrySectionProps) {
  const wines = country.products.filter((p) => p.category === "wine");
  const spirits = country.products.filter((p) => p.category === "spirit");
  const hasBoth = wines.length > 0 && spirits.length > 0;

  const [activeTab, setActiveTab] = useState<"all" | "wine" | "spirit">("all");

  const filteredProducts =
    activeTab === "all"
      ? country.products
      : country.products.filter((p) => p.category === activeTab);

  const bgColor = index % 2 === 0 ? "bg-[#0a0a0a]" : "bg-[#111111]";

  return (
    <section
      id={country.id}
      className={`${bgColor} py-20`}
      style={{ scrollMarginTop: "140px" }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          {/* Country Header */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8">
            <div className="flex items-center gap-4">
              {country.icon ? (
                <div
                  className="h-10 w-10 bg-[#C9A962]"
                  style={{
                    mask: `url(${country.icon}) center/contain no-repeat`,
                    WebkitMask: `url(${country.icon}) center/contain no-repeat`,
                  }}
                />
              ) : (
                <span className="text-4xl">{country.flag}</span>
              )}
              <div>
                <h3 className="font-[family-name:var(--font-playfair)] text-2xl sm:text-3xl font-bold text-white">
                  {country.name}
                </h3>
                <p className="font-[family-name:var(--font-montserrat)] text-sm text-gray-400 mt-1">
                  {country.products.length} product{country.products.length !== 1 ? "s" : ""}
                  {hasBoth && (
                    <span>
                      {" "}&middot; {wines.length} wine{wines.length !== 1 ? "s" : ""}, {spirits.length} spirit{spirits.length !== 1 ? "s" : ""}
                    </span>
                  )}
                </p>
              </div>
            </div>

            {/* Filter tabs - only show if country has both wines and spirits */}
            {hasBoth && (
              <div className="sm:ml-auto flex gap-2">
                {(["all", "wine", "spirit"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`relative px-4 py-2 rounded-full text-sm font-[family-name:var(--font-montserrat)] font-medium transition-all duration-300 ${
                      activeTab === tab
                        ? "text-black"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    {activeTab === tab && (
                      <motion.div
                        layoutId={`tab-bg-${country.id}`}
                        className="absolute inset-0 bg-[#C9A962] rounded-full"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <span className="relative z-10">
                      {tab === "all" ? "All" : tab === "wine" ? "Wines" : "Spirits"}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Description */}
          <p className="font-[family-name:var(--font-montserrat)] text-gray-400 mb-10 max-w-3xl">
            {country.description}
          </p>

          {/* Decorative line */}
          <div className="decorative-line mb-10" />
        </AnimatedSection>

        {/* Product Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {filteredProducts.map((product, i) => (
              <ProductCard
                key={`${product.brand}-${product.name}-${i}`}
                product={product}
                index={i}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
