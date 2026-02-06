"use client";

import { useState } from "react";
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
    "rosé": "Rosé",
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
    "cachaça": "Cachaça",
    soju: "Soju",
    sake: "Sake",
    rtd: "Ready to Drink",
    sangria: "Sangria",
    liqueur: "Liqueur",
  };
  return labels[type] || type;
}

function extractPointsNumber(points: string): string {
  const match = points.match(/(\d+)/);
  return match ? match[1] : points;
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

function LargeWineIcon() {
  return (
    <svg
      className="h-20 w-20 text-[#C9A962]/20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={0.75}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7 3h10l-1 8a5 5 0 01-4 4.9V20h3v1H9v-1h3v-4.1A5 5 0 018 12L7 3z"
      />
    </svg>
  );
}

function LargeSpiritIcon() {
  return (
    <svg
      className="h-20 w-20 text-[#C9A962]/20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={0.75}
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
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="group cursor-pointer [perspective:1000px] h-[400px]"
      onClick={() => setIsFlipped(!isFlipped)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setIsFlipped(!isFlipped);
        }
      }}
      role="button"
      tabIndex={0}
    >
      {/* Inner flipper */}
      <div
        className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d]"
        style={{ transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
      >
        {/* ── FRONT FACE ── */}
        <div className="absolute inset-0 [backface-visibility:hidden] rounded-2xl bg-[#1a1a1a] border border-[#C9A962]/10 overflow-hidden flex flex-col transition-colors duration-300 group-hover:border-[#C9A962]/40 group-hover:shadow-lg group-hover:shadow-[#C9A962]/5">
          {/* Image placeholder area */}
          <div className="relative flex-[3] flex items-center justify-center bg-gradient-to-br from-[#1a1a1a] via-[#222222] to-[#1a1a1a] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-[#C9A962]/5 to-transparent" />
            {product.category === "wine" ? (
              <LargeWineIcon />
            ) : (
              <LargeSpiritIcon />
            )}

            {/* Points badge */}
            {product.points && (
              <div className="absolute top-3 right-3 w-10 h-10 rounded-full bg-[#C9A962] flex items-center justify-center shadow-lg">
                <span className="text-xs font-[family-name:var(--font-montserrat)] font-bold text-black leading-none">
                  {extractPointsNumber(product.points)}
                </span>
              </div>
            )}
          </div>

          {/* Text info area */}
          <div className="flex-[2] p-4 flex flex-col justify-center">
            <span className="self-start text-[10px] font-[family-name:var(--font-montserrat)] font-medium px-2.5 py-0.5 rounded-full bg-[#C9A962]/10 text-[#C9A962] border border-[#C9A962]/20 mb-2">
              {typeLabel(product.type)}
            </span>

            <p className="font-[family-name:var(--font-montserrat)] text-[10px] uppercase tracking-widest text-[#C9A962]/70 mb-0.5">
              {product.brand}
            </p>

            <h4 className="font-[family-name:var(--font-playfair)] text-base font-semibold text-white leading-tight line-clamp-2">
              {product.name}
            </h4>
          </div>
        </div>

        {/* ── BACK FACE ── */}
        <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-2xl bg-[#1a1a1a] border border-[#C9A962]/10 p-5 flex flex-col overflow-hidden transition-colors duration-300 group-hover:border-[#C9A962]/40 group-hover:shadow-lg group-hover:shadow-[#C9A962]/5">
          {/* Close indicator */}
          <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-[#C9A962]/10 flex items-center justify-center text-[#C9A962]">
            <svg
              className="w-3.5 h-3.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>

          {/* Type + icon */}
          <div className="flex items-center gap-2 mb-1">
            {product.category === "wine" ? <WineIcon /> : <SpiritIcon />}
            <span className="text-[10px] font-[family-name:var(--font-montserrat)] font-medium px-2.5 py-0.5 rounded-full bg-[#C9A962]/10 text-[#C9A962] border border-[#C9A962]/20">
              {typeLabel(product.type)}
            </span>
          </div>

          {/* Brand */}
          <p className="font-[family-name:var(--font-montserrat)] text-[10px] uppercase tracking-widest text-[#C9A962]/70 mb-0.5">
            {product.brand}
          </p>

          {/* Product name */}
          <h4 className="font-[family-name:var(--font-playfair)] text-base font-semibold text-white mb-3 leading-tight">
            {product.name}
          </h4>

          {/* Description */}
          <p className="font-[family-name:var(--font-montserrat)] text-sm text-gray-400 leading-relaxed flex-1 overflow-y-auto scrollbar-hide">
            {product.description}
          </p>

          {/* Points */}
          {product.points && (
            <div className="mt-3 pt-3 border-t border-[#C9A962]/10">
              <span className="text-xs font-[family-name:var(--font-montserrat)] font-semibold text-amber-400">
                {product.points}
              </span>
            </div>
          )}

          {/* Tags */}
          {product.tags && product.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-2">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className={`text-[10px] font-[family-name:var(--font-montserrat)] font-medium px-2 py-0.5 rounded-full border ${
                    tagStyles[tag] ||
                    "bg-gray-800 text-gray-400 border-gray-600"
                  }`}
                >
                  {tagLabels[tag] || tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
