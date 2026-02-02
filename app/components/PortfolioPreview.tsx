"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import AnimatedSection, { AnimatedCard } from "./AnimatedSection";

const regions = [
  {
    name: "California",
    country: "USA",
    description: "Premium wines from Napa Valley and beyond",
    image: "/hero-slideshow/product1.jpeg",
    icon: "/icons/california.svg"
  },
  {
    name: "France",
    country: "France",
    description: "Exquisite wines from Bordeaux, Burgundy, and Champagne",
    image: "/hero-slideshow/product2.jpeg",
    icon: "/icons/france.svg"
  },
  {
    name: "Italy",
    country: "Italy",
    description: "Fine wines from Tuscany, Piedmont, and Veneto",
    image: "/hero-slideshow/product3.jpeg",
    icon: "/icons/italy.svg"
  },
  {
    name: "Spain",
    country: "Spain",
    description: "Bold wines from Rioja, Ribera del Duero, and Priorat",
    image: "/hero-slideshow/product4.jpeg",
    icon: "/icons/spain.svg"
  },
  {
    name: "Scotland",
    country: "Scotland",
    description: "World-renowned single malt and blended whiskies",
    image: "/hero-slideshow/product5.jpeg",
    icon: "/icons/scotland.svg"
  },
  {
    name: "Sri Lanka",
    country: "Sri Lanka",
    description: "Unique spirits and specialty selections",
    image: "/hero-slideshow/product6.jpeg",
    icon: "/icons/sri-lanka.svg"
  },
];

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

        {/* Regions Grid */}
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {regions.map((region, index) => (
            <AnimatedCard key={index} index={index}>
              <div className="group relative overflow-hidden rounded-2xl bg-[#1a1a1a] border border-[#C9A962]/10 cursor-pointer transition-all duration-500 hover:border-[#C9A962]/40 glow-hover">
                <div className="aspect-[4/3] overflow-hidden">
                  <motion.div
                    className="h-full w-full"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Image
                      src={region.image}
                      alt={region.name}
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20 transition-opacity duration-500 group-hover:from-black/95" />
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center gap-4">
                    <motion.div
                      className="relative h-10 w-10"
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div
                        className="absolute inset-0 bg-[#C9A962] rounded transition-opacity duration-300 opacity-100"
                        style={{
                          mask: `url(${region.icon}) center/contain no-repeat`,
                          WebkitMask: `url(${region.icon}) center/contain no-repeat`
                        }}
                      />
                    </motion.div>
                    <p className="font-[family-name:var(--font-montserrat)] text-xl uppercase tracking-wider text-[#C9A962]">
                      {region.country}
                    </p>
                  </div>
                </div>

                {/* Hover Shine Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </div>
              </div>
            </AnimatedCard>
          ))}
        </div>

        {/* CTA */}
        <AnimatedSection delay={0.4} className="mt-12 text-center">
          <motion.a
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-[#C9A962] px-8 py-4 font-[family-name:var(--font-montserrat)] text-sm font-medium text-black"
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(201, 169, 98, 0.4)" }}
            whileTap={{ scale: 0.98 }}
          >
            Is your product looking for distribution?
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.a>
        </AnimatedSection>
      </div>
    </section>
  );
}
