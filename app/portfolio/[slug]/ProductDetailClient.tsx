"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import type { Product, CountryData } from "../../data/portfolio-data";

function typeLabel(type: string): string {
  const labels: Record<string, string> = {
    red: "Red Wine",
    white: "White Wine",
    rosé: "Rosé",
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
    cachaça: "Cachaça",
    soju: "Soju",
    sake: "Sake",
    rtd: "Ready to Drink",
    sangria: "Sangria",
    liqueur: "Liqueur",
  };
  return labels[type] || type;
}

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

function extractPointsNumber(points: string): string {
  const match = points.match(/(\d+)/);
  return match ? match[1] : points;
}

interface AccordionItemProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}

function AccordionItem({ title, icon, children, isOpen, onToggle }: AccordionItemProps) {
  return (
    <div className="border border-[#C9A962]/10 rounded-xl overflow-hidden transition-colors duration-300 hover:border-[#C9A962]/30">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-6 py-4 text-left group"
      >
        <div className="flex items-center gap-3">
          <span className="text-[#C9A962]">{icon}</span>
          <span className="font-[family-name:var(--font-montserrat)] text-sm font-medium text-white group-hover:text-[#C9A962] transition-colors">
            {title}
          </span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-[#C9A962]"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-5 pt-0 border-t border-[#C9A962]/10">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Accordion icons
function SpecsIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15a2.25 2.25 0 012.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
    </svg>
  );
}

function VinificationIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
    </svg>
  );
}

function TastingIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 3h10l-1 8a5 5 0 01-4 4.9V20h3v1H9v-1h3v-4.1A5 5 0 018 12L7 3z" />
    </svg>
  );
}

function PairingsIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.87c1.355 0 2.697.055 4.024.165C17.155 8.51 18 9.473 18 10.608v2.513M15 8.25v-1.5m-6 1.5v-1.5m12 9.75l-1.5.75a3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0L3 16.5m15-3.38a48.474 48.474 0 00-6-.37c-2.032 0-4.034.126-6 .37m12 0c.39.049.777.102 1.163.16 1.07.16 1.837 1.094 1.837 2.175v5.17c0 .62-.504 1.124-1.125 1.124H4.125A1.125 1.125 0 013 20.625v-5.17c0-1.08.768-2.014 1.837-2.174A47.78 47.78 0 016 13.12M12.265 3.11a.375.375 0 11-.53 0L12 2.845l.265.265zm-3 0a.375.375 0 11-.53 0L9 2.845l.265.265zm6 0a.375.375 0 11-.53 0L15 2.845l.265.265z" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
    </svg>
  );
}

function LargeWineIcon() {
  return (
    <svg className="h-48 w-48 text-[#C9A962]/10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={0.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 3h10l-1 8a5 5 0 01-4 4.9V20h3v1H9v-1h3v-4.1A5 5 0 018 12L7 3z" />
    </svg>
  );
}

function LargeSpiritIcon() {
  return (
    <svg className="h-48 w-48 text-[#C9A962]/10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={0.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 2h8l-1.5 6H9.5L8 2zM9.5 8h5a2 2 0 012 2v1a4 4 0 01-3 3.87V19h2v2H8.5v-2h2v-4.13A4 4 0 017.5 11v-1a2 2 0 012-2z" />
    </svg>
  );
}

interface ProductDetailClientProps {
  product: Product;
  country: CountryData;
}

export default function ProductDetailClient({ product, country }: ProductDetailClientProps) {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  const hasSpecs = product.specifications && Object.keys(product.specifications).length > 0;
  const hasVinification = !!product.vinification;
  const hasTasting = !!product.tastingNotes;
  const hasPairings = !!product.foodPairings;
  const hasDownloads = product.downloadables && product.downloadables.length > 0;
  const hasAnyDetail = hasSpecs || hasVinification || hasTasting || hasPairings || hasDownloads;

  return (
    <div className="bg-[#0a0a0a] min-h-screen pt-32 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 font-[family-name:var(--font-montserrat)] text-sm text-gray-400 hover:text-[#C9A962] transition-colors mb-10 group"
          >
            <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Back to Portfolio
          </Link>
        </motion.div>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-16">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative flex items-center justify-center bg-gradient-to-br from-[#1a1a1a] via-[#222222] to-[#1a1a1a] rounded-2xl border border-[#C9A962]/10 min-h-[400px] lg:min-h-[500px] overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-[#C9A962]/5 to-transparent" />
            {product.image ? (
              <Image
                src={product.image}
                alt={`${product.brand} ${product.name}`}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain p-8"
                priority
              />
            ) : product.category === "wine" ? (
              <LargeWineIcon />
            ) : (
              <LargeSpiritIcon />
            )}

            {/* Points badge */}
            {product.points && (
              <div className="absolute top-5 right-5 w-14 h-14 rounded-full bg-[#C9A962] flex items-center justify-center shadow-lg shadow-[#C9A962]/30">
                <span className="text-base font-[family-name:var(--font-montserrat)] font-bold text-black leading-none">
                  {extractPointsNumber(product.points)}
                </span>
              </div>
            )}
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            {/* Type badge */}
            <span className="self-start text-xs font-[family-name:var(--font-montserrat)] font-medium px-3 py-1 rounded-full bg-[#C9A962]/10 text-[#C9A962] border border-[#C9A962]/20 mb-4">
              {typeLabel(product.type)}
            </span>

            {/* Brand */}
            <p className="font-[family-name:var(--font-montserrat)] text-xs uppercase tracking-[0.2em] text-[#C9A962]/70 mb-2">
              {product.brand}
            </p>

            {/* Name */}
            <h1 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              {product.name}
            </h1>

            {/* Origin */}
            {(product.origin || country) && (
              <div className="flex items-center gap-2 mb-6">
                <svg className="w-4 h-4 text-[#C9A962]/60" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                <span className="font-[family-name:var(--font-montserrat)] text-sm text-gray-400">
                  {product.origin || country.name}
                </span>
              </div>
            )}

            {/* Points text */}
            {product.points && (
              <p className="font-[family-name:var(--font-montserrat)] text-sm font-semibold text-amber-400 mb-4">
                {product.points}
              </p>
            )}

            {/* Tags */}
            {product.tags && product.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`text-xs font-[family-name:var(--font-montserrat)] font-medium px-3 py-1 rounded-full border ${
                      tagStyles[tag] || "bg-gray-800 text-gray-400 border-gray-600"
                    }`}
                  >
                    {tagLabels[tag] || tag}
                  </span>
                ))}
              </div>
            )}

            {/* Decorative line */}
            <div className="decorative-line mb-6" />

            {/* Description */}
            <p className="font-[family-name:var(--font-montserrat)] text-base text-gray-300 leading-relaxed">
              {product.description}
            </p>

            {/* Bottle sizes */}
            {product.bottleSizes && product.bottleSizes.length > 0 && (
              <div className="mt-4 flex items-center gap-2">
                <svg className="w-4 h-4 text-[#C9A962]/60" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375" />
                </svg>
                <span className="font-[family-name:var(--font-montserrat)] text-sm text-gray-400">
                  {product.bottleSizes.join(", ")}
                </span>
              </div>
            )}
          </motion.div>
        </div>

        {/* Accordion Sections */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="max-w-3xl mx-auto"
        >
          {hasAnyDetail ? (
            <div className="space-y-3">
              {hasSpecs && (
                <AccordionItem
                  title="Specifications"
                  icon={<SpecsIcon />}
                  isOpen={openSection === "specs"}
                  onToggle={() => toggleSection("specs")}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 pt-4">
                    {Object.entries(product.specifications!).map(([key, value]) => (
                      <div key={key} className="flex justify-between border-b border-white/5 pb-2">
                        <span className="font-[family-name:var(--font-montserrat)] text-xs text-gray-500 uppercase tracking-wide">
                          {key}
                        </span>
                        <span className="font-[family-name:var(--font-montserrat)] text-sm text-gray-300">
                          {value}
                        </span>
                      </div>
                    ))}
                  </div>
                </AccordionItem>
              )}

              {hasVinification && (
                <AccordionItem
                  title="Vinification & Refining"
                  icon={<VinificationIcon />}
                  isOpen={openSection === "vinification"}
                  onToggle={() => toggleSection("vinification")}
                >
                  <p className="font-[family-name:var(--font-montserrat)] text-sm text-gray-300 leading-relaxed pt-4">
                    {product.vinification}
                  </p>
                </AccordionItem>
              )}

              {hasTasting && (
                <AccordionItem
                  title="Tasting Notes"
                  icon={<TastingIcon />}
                  isOpen={openSection === "tasting"}
                  onToggle={() => toggleSection("tasting")}
                >
                  <p className="font-[family-name:var(--font-montserrat)] text-sm text-gray-300 leading-relaxed pt-4">
                    {product.tastingNotes}
                  </p>
                </AccordionItem>
              )}

              {hasPairings && (
                <AccordionItem
                  title="Food Pairings"
                  icon={<PairingsIcon />}
                  isOpen={openSection === "pairings"}
                  onToggle={() => toggleSection("pairings")}
                >
                  <p className="font-[family-name:var(--font-montserrat)] text-sm text-gray-300 leading-relaxed pt-4">
                    {product.foodPairings}
                  </p>
                </AccordionItem>
              )}

              {hasDownloads && (
                <AccordionItem
                  title="Downloadables"
                  icon={<DownloadIcon />}
                  isOpen={openSection === "downloads"}
                  onToggle={() => toggleSection("downloads")}
                >
                  <div className="space-y-2 pt-4">
                    {product.downloadables!.map((dl) => (
                      <a
                        key={dl.url}
                        href={dl.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 px-4 py-3 rounded-lg bg-white/5 hover:bg-[#C9A962]/10 transition-colors group"
                      >
                        <svg className="w-5 h-5 text-[#C9A962]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12l3 3m0 0l3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                        </svg>
                        <span className="font-[family-name:var(--font-montserrat)] text-sm text-gray-300 group-hover:text-[#C9A962] transition-colors">
                          {dl.label}
                        </span>
                      </a>
                    ))}
                  </div>
                </AccordionItem>
              )}
            </div>
          ) : (
            <div className="text-center py-16 border border-[#C9A962]/10 rounded-2xl">
              <div className="flex justify-center mb-4">
                <svg className="w-10 h-10 text-[#C9A962]/30" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="font-[family-name:var(--font-montserrat)] text-sm text-gray-500">
                Detailed specifications coming soon
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
