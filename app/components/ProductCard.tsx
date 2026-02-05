"use client";

import { motion } from "framer-motion";
import type { Product } from "../data/portfolio-data";

const tagStyles: Record<string, string> = {
  organic: "bg-green-900/30 text-green-400 border-green-400/20",
  biodynamic: "bg-green-900/30 text-green-400 border-green-400/20",
  limited: "bg-amber-900/30 text-amber-400 border-amber-400/20",
  reserve: "bg-purple-900/30 text-purple-400 border-purple-400/20",
  "coming-soon": "bg-blue-900/30 text-blue-400 border-blue-400/20",
};

const tagLabels: Record<string, string> = {
  organic: "Organic",
  biodynamic: "Biodynamic",
  limited: "Limited",
  reserve: "Reserve",
  "coming-soon": "Coming Soon",
};

function typeLabel(type: string): string {
  const labels: Record<string, string> = {
    red: "Red Wine",
    white: "White Wine",
    "ros\u00e9": "Ros\u00e9",
    sparkling: "Sparkling",
    dessert: "Dessert Wine",
    fortified: "Fortified Wine",
    bourbon: "Bourbon",
    whisky: "Scotch Whisky",
    cognac: "Cognac",
    tequila: "Tequila",
    vodka: "Vodka",
    gin: "Gin",
    rum: "Rum",
    "cacha\u00e7a": "Cacha\u00e7a",
    soju: "Soju",
    sake: "Sake",
    rtd: "Ready to Drink",
    sangria: "Sangria",
    liqueur: "Liqueur",
  };
  return labels[type] || type;
}

function WineIcon() {
  return (
    <svg
      className="h-5 w-5 text-[#C9A962]"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7 3h10l-1 8a5 5 0 01-4 4.9V20h3v1H9v-1h3v-4.1A5 5 0 018 12L7 3z"
      />
    </svg>
  );
}

function SpiritIcon() {
  return (
    <svg
      className="h-5 w-5 text-[#C9A962]"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8 2h8l-1.5 6H9.5L8 2zM9.5 8h5a2 2 0 012 2v1a4 4 0 01-3 3.87V19h2v2H8.5v-2h2v-4.13A4 4 0 017.5 11v-1a2 2 0 012-2z"
      />
    </svg>
  );
}

interface ProductCardProps {
  product: Product;
  index: number;
}

export default function ProductCard({ product, index }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      whileHover={{ y: -6 }}
      className="group rounded-2xl bg-[#1a1a1a] border border-[#C9A962]/10 p-5 transition-all duration-300 hover:border-[#C9A962]/40 hover:shadow-lg hover:shadow-[#C9A962]/5"
    >
      {/* Top row: icon + type badge */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          {product.category === "wine" ? <WineIcon /> : <SpiritIcon />}
          <span className="text-xs font-[family-name:var(--font-montserrat)] font-medium px-2.5 py-1 rounded-full bg-[#C9A962]/10 text-[#C9A962] border border-[#C9A962]/20">
            {typeLabel(product.type)}
          </span>
        </div>
        {product.points && (
          <span className="text-xs font-[family-name:var(--font-montserrat)] font-semibold text-amber-400">
            {product.points}
          </span>
        )}
      </div>

      {/* Brand */}
      <p className="font-[family-name:var(--font-montserrat)] text-xs uppercase tracking-widest text-[#C9A962]/70 mb-1">
        {product.brand}
      </p>

      {/* Product name */}
      <h4 className="font-[family-name:var(--font-playfair)] text-lg font-semibold text-white mb-2 leading-tight">
        {product.name}
      </h4>

      {/* Description */}
      <p className="font-[family-name:var(--font-montserrat)] text-sm text-gray-400 leading-relaxed line-clamp-3">
        {product.description}
      </p>

      {/* Tags */}
      {product.tags && product.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-3">
          {product.tags.map((tag) => (
            <span
              key={tag}
              className={`text-[10px] font-[family-name:var(--font-montserrat)] font-medium px-2 py-0.5 rounded-full border ${
                tagStyles[tag] || "bg-gray-800 text-gray-400 border-gray-600"
              }`}
            >
              {tagLabels[tag] || tag}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  );
}
