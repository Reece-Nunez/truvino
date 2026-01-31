"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";

interface CTABannerProps {
  variant?: "default" | "minimal" | "large";
}

export default function CTABanner({ variant = "default" }: CTABannerProps) {
  if (variant === "minimal") {
    return (
      <AnimatedSection className="text-center py-8">
        <motion.div
          whileHover={{ scale: 1.02 }}
        >
          <Link
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full bg-[#C9A962] px-8 py-3 font-[family-name:var(--font-montserrat)] text-sm font-medium text-black transition-all hover:bg-[#D4BA7A] hover:shadow-lg hover:shadow-[#C9A962]/20"
          >
            Is your product looking for distribution?
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </AnimatedSection>
    );
  }

  if (variant === "large") {
    return (
      <section className="relative bg-[#C9A962] py-24 overflow-hidden">
        {/* Decorative background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-black/20 -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-black/20 translate-x-1/2 translate-y-1/2" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <motion.h2
              className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-black sm:text-4xl md:text-5xl lg:text-6xl"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              Ready to Expand Your Reach?
            </motion.h2>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <p className="mx-auto mt-6 max-w-2xl font-[family-name:var(--font-montserrat)] text-lg text-black/80">
              Partner with Truvino for seamless global distribution of your premium wines and spirits
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.4}>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="#contact"
                  className="inline-block rounded-full bg-black px-10 py-4 font-[family-name:var(--font-montserrat)] text-base font-medium text-white transition-all hover:bg-black/80 hover:shadow-xl"
                >
                  Get In Touch Today
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/careers"
                  className="inline-block rounded-full border-2 border-black px-10 py-4 font-[family-name:var(--font-montserrat)] text-base font-medium text-black transition-all hover:bg-black hover:text-white"
                >
                  Join Our Team
                </Link>
              </motion.div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    );
  }

  // Default variant
  return (
    <AnimatedSection>
      <div className="bg-[#1a1a1a] border-y border-[#C9A962]/10 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="font-[family-name:var(--font-playfair)] text-2xl md:text-3xl font-semibold text-white">
                Is your product looking for <span className="text-[#C9A962]">distribution</span>?
              </h3>
              <p className="mt-2 font-[family-name:var(--font-montserrat)] text-gray-400">
                Let us handle your global wine and spirits logistics
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                href="#contact"
                className="inline-block rounded-full bg-[#C9A962] px-10 py-4 font-[family-name:var(--font-montserrat)] text-sm font-medium text-black transition-all hover:bg-[#D4BA7A] hover:shadow-lg hover:shadow-[#C9A962]/20 whitespace-nowrap"
              >
                Contact Us
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
