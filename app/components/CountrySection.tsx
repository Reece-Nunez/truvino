"use client";

import { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import ProductCard from "./ProductCard";
import type { CountryData, Product } from "../data/portfolio-data";

interface CountrySectionProps {
  country: CountryData;
  index: number;
  filteredProducts: Product[];
}

function sortByBrand(products: Product[]): Product[] {
  const brandOrder: Map<string, number> = new Map();
  let idx = 0;
  for (const p of products) {
    if (!brandOrder.has(p.brand)) {
      brandOrder.set(p.brand, idx++);
    }
  }
  return [...products].sort(
    (a, b) => (brandOrder.get(a.brand) ?? 0) - (brandOrder.get(b.brand) ?? 0)
  );
}

export default function CountrySection({ country, index, filteredProducts }: CountrySectionProps) {
  const sortedProducts = useMemo(() => sortByBrand(filteredProducts), [filteredProducts]);

  const wines = country.products.filter((p) => p.category === "wine");
  const spirits = country.products.filter((p) => p.category === "spirit");
  const hasBoth = wines.length > 0 && spirits.length > 0;

  // Hide section entirely if no products match the filter
  if (sortedProducts.length === 0) return null;

  const bgColor = index % 2 === 0 ? "bg-[#0a0a0a]" : "bg-[#111111]";

  return (
    <section
      id={country.id}
      className={`${bgColor} py-20`}
      style={{ scrollMarginTop: "195px" }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          {/* Country Header */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
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
                  {sortedProducts.length} product{sortedProducts.length !== 1 ? "s" : ""}
                  {hasBoth && sortedProducts.length === country.products.length && (
                    <span>
                      {" "}&middot; {wines.length} wine{wines.length !== 1 ? "s" : ""}, {spirits.length} spirit{spirits.length !== 1 ? "s" : ""}
                    </span>
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="font-[family-name:var(--font-montserrat)] text-gray-400 mb-6 max-w-3xl">
            {country.description}
          </p>

          {/* Decorative line */}
          <div className="decorative-line mb-10" />
        </AnimatedSection>

        {/* Product grid sorted by brand */}
        <AnimatePresence mode="wait">
          <motion.div
            key={sortedProducts.map((p) => `${p.brand}-${p.name}`).join(",")}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {sortedProducts.map((product, i) => (
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
