"use client";

import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import AnimatedSection from "../components/AnimatedSection";

const services = [
  {
    id: "distribution",
    title: "Distribution",
    tagline: "Connecting Premium Brands to Markets",
    description:
      "Our comprehensive distribution network connects premium wines and spirits from renowned vineyards and distilleries to markets throughout the United States. We understand that distribution is more than moving products—it's about building relationships and ensuring your brand reaches the right customers.",
    features: [
      "Nationwide distribution network",
      "Strategic retail and restaurant partnerships",
      "Brand positioning and market access",
      "Inventory management and forecasting",
      "Regulatory compliance across all states",
    ],
    image: "/hero-slideshow/product1.jpeg",
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
    id: "warehousing",
    title: "Warehousing",
    tagline: "State-of-the-Art Storage Solutions",
    description:
      "Our climate-controlled warehousing facilities are designed specifically for wine and spirits storage. We maintain optimal conditions to preserve the quality and integrity of your products, from temperature and humidity control to security and inventory tracking.",
    features: [
      "Climate-controlled storage environments",
      "Real-time inventory tracking systems",
      "Secure facilities with 24/7 monitoring",
      "Flexible storage solutions for all volumes",
      "Quality inspection and handling protocols",
    ],
    image: "/hero-slideshow/product5.jpeg",
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
    id: "clearing",
    title: "Clearing",
    tagline: "Expert Customs & Compliance",
    description:
      "Navigating international regulations and customs requirements can be complex. Our clearing services handle all documentation, permits, and compliance matters, ensuring your products move smoothly across borders and meet all regulatory requirements.",
    features: [
      "Customs brokerage and documentation",
      "Import/export permit management",
      "TTB and state regulatory compliance",
      "Label approval assistance",
      "Duty and tax optimization",
    ],
    image: "/hero-slideshow/product3.jpeg",
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
    id: "logistics",
    title: "Logistics",
    tagline: "Seamless End-to-End Solutions",
    description:
      "From origin to destination, our logistics services ensure your products are handled with care at every step. We coordinate transportation, manage timelines, and optimize routes to deliver efficient, reliable service that protects your products and your reputation.",
    features: [
      "Full supply chain management",
      "Temperature-controlled transportation",
      "Route optimization and scheduling",
    ],
    image: "/hero-slideshow/product8.jpeg",
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative h-[60vh] min-h-[500px] w-full overflow-hidden pt-32">
          <Image
            src="/hero-slideshow/product4.jpeg"
            alt="Truvino Services"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="font-[family-name:var(--font-playfair)] text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl"
              >
                Our <span className="text-[#C9A962]">Services</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mx-auto mt-6 max-w-2xl font-[family-name:var(--font-montserrat)] text-lg text-gray-300 sm:text-xl"
              >
                End-to-end solutions for premium wine and spirits brands
              </motion.p>
            </div>
          </div>
          {/* Bottom gradient */}
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
        </section>

        {/* Services Overview */}
        <section className="bg-[#0a0a0a] py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <AnimatedSection className="text-center max-w-3xl mx-auto">
              <p className="font-[family-name:var(--font-montserrat)] text-lg text-gray-400 leading-relaxed">
                At Truvino, we provide comprehensive services designed to support every aspect of your wine and spirits business. From storage to delivery, compliance to distribution, we handle the complexities so you can focus on what matters most—your brand.
              </p>
            </AnimatedSection>

            {/* Quick Nav */}
            <div className="mt-12 flex flex-wrap justify-center gap-4">
              {services.map((service) => (
                <motion.a
                  key={service.id}
                  href={`#${service.id}`}
                  className="flex items-center gap-2 rounded-full bg-[#1a1a1a] px-6 py-3 border border-[#C9A962]/20 text-gray-300 font-[family-name:var(--font-montserrat)] text-sm transition-all hover:border-[#C9A962]/50 hover:text-[#C9A962]"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-[#C9A962]">{service.icon}</span>
                  {service.title}
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        {/* Individual Service Sections */}
        {services.map((service, index) => (
          <section
            key={service.id}
            id={service.id}
            className={`py-24 ${index % 2 === 0 ? "bg-[#0a0a0a]" : "bg-[#111111]"}`}
          >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className={`grid gap-12 lg:grid-cols-2 lg:items-center ${index % 2 === 1 ? "lg:grid-flow-dense" : ""}`}>
                {/* Content */}
                <AnimatedSection className={index % 2 === 1 ? "lg:col-start-2" : ""}>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-[#C9A962]/10 text-[#C9A962]">
                      {service.icon}
                    </div>
                    <div className="decorative-line" />
                  </div>
                  <h2 className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-white sm:text-4xl">
                    {service.title}
                  </h2>
                  <p className="mt-2 font-[family-name:var(--font-montserrat)] text-[#C9A962] text-lg">
                    {service.tagline}
                  </p>
                  <p className="mt-6 font-[family-name:var(--font-montserrat)] text-gray-400 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features List */}
                  <ul className="mt-8 space-y-4">
                    {service.features.map((feature, featureIndex) => (
                      <motion.li
                        key={featureIndex}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: featureIndex * 0.1 }}
                        className="flex items-start gap-3"
                      >
                        <svg
                          className="h-6 w-6 text-[#C9A962] flex-shrink-0 mt-0.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="font-[family-name:var(--font-montserrat)] text-gray-300">
                          {feature}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </AnimatedSection>

                {/* Image */}
                <AnimatedSection className={index % 2 === 1 ? "lg:col-start-1" : ""}>
                  <div className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden border border-[#C9A962]/10">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  </div>
                </AnimatedSection>
              </div>
            </div>
          </section>
        ))}

        {/* CTA Section */}
        <section className="bg-[#0a0a0a] py-24 border-t border-[#C9A962]/10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <AnimatedSection className="text-center">
              <h2 className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-white sm:text-4xl">
                Ready to Get <span className="text-[#C9A962]">Started</span>?
              </h2>
              <p className="mx-auto mt-4 max-w-2xl font-[family-name:var(--font-montserrat)] text-lg text-gray-400">
                Contact us today to discuss how our services can support your brand&apos;s success
              </p>
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <motion.a
                  href="/contact"
                  className="inline-block rounded-full bg-[#C9A962] px-10 py-4 font-[family-name:var(--font-montserrat)] text-lg font-medium text-black transition-all hover:bg-[#D4BA7A] hover:shadow-lg hover:shadow-[#C9A962]/20"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Contact Us
                </motion.a>
                <motion.a
                  href="/about"
                  className="inline-block rounded-full border border-[#C9A962]/50 px-10 py-4 font-[family-name:var(--font-montserrat)] text-lg font-medium text-[#C9A962] transition-all hover:bg-[#C9A962]/10"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Learn About Us
                </motion.a>
              </div>
            </AnimatedSection>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
