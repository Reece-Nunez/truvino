"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";

export default function FeaturedProduct() {
  return (
    <section className="relative bg-[#0a0a0a] py-20 sm:py-28 overflow-hidden">
      {/* Subtle gold radial glow behind the section */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 30% 50%, rgba(201,169,98,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Product bottle + badge */}
          <AnimatedSection>
            <motion.div
              className="relative flex items-center justify-center"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {/* Gold glow behind bottle */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle at 50% 50%, rgba(201,169,98,0.15) 0%, transparent 60%)",
                }}
              />

              {/* Bottle image */}
              <div className="relative h-[450px] sm:h-[550px] w-full max-w-[350px] mx-auto">
                <Image
                  src="/golden-archer.png"
                  alt="Golden Archer 2023 Cabernet Sauvignon, Napa Valley"
                  fill
                  className="object-contain drop-shadow-[0_0_40px_rgba(201,169,98,0.2)]"
                  sizes="(max-width: 1024px) 50vw, 350px"
                />
              </div>
            </motion.div>
          </AnimatedSection>

          {/* Right: Content */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <AnimatedSection>
              {/* Eyebrow */}
              <motion.p
                className="font-[family-name:var(--font-montserrat)] text-[11px] font-semibold uppercase tracking-[0.3em] text-[#C9A962] mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                In the Spotlight
              </motion.p>

              {/* Decorative line */}
              <motion.div
                className="decorative-line mb-8"
                initial={{ opacity: 0, scaleX: 0 }}
                whileInView={{ opacity: 1, scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              />

              {/* Brand */}
              <motion.p
                className="font-[family-name:var(--font-montserrat)] text-xs font-semibold uppercase tracking-[0.25em] text-[#C9A962]/80 mb-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.25 }}
              >
                Golden Archer
              </motion.p>

              {/* Product name */}
              <motion.h2
                className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                2023 Cabernet Sauvignon
              </motion.h2>

              {/* Subtitle */}
              <motion.p
                className="font-[family-name:var(--font-montserrat)] text-sm text-gray-400 mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.35 }}
              >
                Napa Valley
              </motion.p>

              {/* 95pt Badge Image */}
              <motion.div
                className="mb-8 flex justify-center lg:justify-start"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: 0.4,
                  type: "spring",
                  bounce: 0.3,
                }}
              >
                <Image
                  src="/95-napa-cabernet.png"
                  alt="95 Points - The Tasting Panel, Publisher's Pick"
                  width={180}
                  height={180}
                  className="drop-shadow-[0_0_20px_rgba(201,169,98,0.3)]"
                />
              </motion.div>

              {/* Tasting notes quote */}
              <motion.blockquote
                className="relative mb-8 max-w-xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                {/* Decorative quote mark */}
                <span className="absolute -top-4 -left-2 text-5xl text-[#C9A962]/20 font-[family-name:var(--font-playfair)] leading-none select-none">
                  &ldquo;
                </span>
                <p className="font-[family-name:var(--font-playfair)] text-base sm:text-lg italic text-gray-300 leading-relaxed pl-4 border-l-2 border-[#C9A962]/30">
                  Sumptuous and elegant, with a tempered sheen. Plum and cassis
                  gather around gentle, round tannins, exposing its
                  behind-the-scenes prowess. It shows a capacity to evolve with
                  ever-ripening notes of black cherry, sweet tobacco, and
                  mocha-cedar. Power in check with finesse.
                </p>
                <footer className="mt-3 pl-4 font-[family-name:var(--font-montserrat)] text-xs text-gray-500 tracking-wide">
                  &mdash; The Tasting Panel
                </footer>
              </motion.blockquote>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <Link href="/portfolio/golden-archer-napa-cabernet">
                  <motion.span
                    className="inline-flex items-center gap-2 rounded-full bg-[#C9A962] px-8 py-4 font-[family-name:var(--font-montserrat)] text-sm font-medium text-black"
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 0 30px rgba(201, 169, 98, 0.4)",
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Discover This Wine
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
                  </motion.span>
                </Link>
              </motion.div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
}
