"use client";

import { motion } from "framer-motion";
import AnimatedSection, { AnimatedCard } from "./AnimatedSection";

const services = [
  {
    title: "Distribution",
    description:
      "Comprehensive distribution network connecting premium wines and spirits from renowned vineyards to markets worldwide.",
    icon: (
      <svg className="h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
        />
      </svg>
    ),
  },
  {
    title: "Warehousing",
    description:
      "State-of-the-art climate-controlled facilities ensuring optimal storage conditions for your valuable inventory.",
    icon: (
      <svg className="h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
        />
      </svg>
    ),
  },
  {
    title: "Clearing",
    description:
      "Expert customs clearance and documentation services, navigating complex international regulations with ease.",
    icon: (
      <svg className="h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
    ),
  },
  {
    title: "Delivery",
    description:
      "Reliable and timely delivery services ensuring your products reach their destination in perfect condition.",
    icon: (
      <svg className="h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
        />
      </svg>
    ),
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="bg-[#0a0a0a] py-24 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <AnimatedSection className="text-center">
          <div className="flex justify-center mb-6">
            <div className="decorative-line" />
          </div>
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Our <span className="text-[#C9A962]">Services</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl font-[family-name:var(--font-montserrat)] text-lg text-gray-400">
            End-to-end solutions for the wine and spirits industry, from vineyard to glass
          </p>
        </AnimatedSection>

        {/* Services Grid */}
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <AnimatedCard key={index} index={index}>
              <div className="group h-full rounded-2xl bg-[#1a1a1a] p-8 border border-[#C9A962]/10 transition-all duration-500 hover:border-[#C9A962]/40 hover:shadow-xl hover:shadow-[#C9A962]/10 glow-hover">
                <motion.div
                  className="mb-6 text-[#C9A962]"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {service.icon}
                </motion.div>
                <h3 className="font-[family-name:var(--font-playfair)] text-xl font-semibold text-white">
                  {service.title}
                </h3>
                <p className="mt-3 font-[family-name:var(--font-montserrat)] text-gray-400">
                  {service.description}
                </p>
              </div>
            </AnimatedCard>
          ))}
        </div>

        {/* CTA */}
        <AnimatedSection delay={0.4} className="mt-16 text-center">
          <motion.a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full bg-[#C9A962] px-8 py-4 font-[family-name:var(--font-montserrat)] text-sm font-medium text-black transition-all"
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(201, 169, 98, 0.4)" }}
            whileTap={{ scale: 0.98 }}
          >
            Need help with distribution?
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.a>
        </AnimatedSection>
      </div>
    </section>
  );
}
