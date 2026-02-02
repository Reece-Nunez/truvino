"use client";

import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import AnimatedSection, { AnimatedCard } from "../components/AnimatedSection";

const stats = [
  { value: "X+", label: "Years of Experience" },
  { value: "X+", label: "Partner Brands" },
  { value: "X+", label: "Markets Served" },
  { value: "X%", label: "Client Retention" },
];

const values = [
  {
    title: "Quality First",
    description:
      "We are committed to handling only the finest wines and spirits, maintaining the highest standards from storage to delivery.",
    icon: (
      <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
  },
  {
    title: "Trusted Partnership",
    description:
      "We build lasting relationships with our partners, treating their brands with the same care and dedication as our own.",
    icon: (
      <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    title: "Reliability",
    description:
      "Our partners count on us for consistent, on-time service. We deliver on our promises, every time.",
    icon: (
      <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Industry Expertise",
    description:
      "Deep knowledge of the wine and spirits industry enables us to navigate complexities and deliver exceptional results.",
    icon: (
      <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
];

const milestones = [
  {
    year: "XXXX",
    title: "Company Founded",
    description: "Truvino was established with a vision to transform wine and spirits distribution.",
  },
  {
    year: "XXXX",
    title: "Expanded Operations",
    description: "Opened state-of-the-art warehousing facilities to serve growing demand.",
  },
  {
    year: "XXXX",
    title: "Strategic Partnerships",
    description: "Formed key partnerships with renowned vineyards and distilleries worldwide.",
  },
  {
    year: "XXXX",
    title: "Market Leadership",
    description: "Became a leading distributor in the Northeast region for premium brands.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative h-[60vh] min-h-[500px] w-full overflow-hidden pt-32">
          <Image
            src="/hero-slideshow/product3.jpeg"
            alt="About Truvino"
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
                About <span className="text-[#C9A962]">Truvino</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mx-auto mt-6 max-w-2xl font-[family-name:var(--font-montserrat)] text-lg text-gray-300 sm:text-xl"
              >
                Your trusted partner in premium wine and spirits distribution
              </motion.p>
            </div>
          </div>
          {/* Bottom gradient */}
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
        </section>

        {/* Company Overview Section */}
        <section className="bg-[#0a0a0a] py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
              <AnimatedSection>
                <div className="flex mb-6">
                  <div className="decorative-line" />
                </div>
                <h2 className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-white sm:text-4xl">
                  Our <span className="text-[#C9A962]">Story</span>
                </h2>
                <div className="mt-6 space-y-4 font-[family-name:var(--font-montserrat)] text-gray-400">
                  <p>
                    Truvino was founded with a singular vision: to bridge the gap between exceptional wine and spirits producers and the markets that appreciate them most.
                  </p>
                  <p>
                    Based in New Jersey, we have built our reputation on reliability, expertise, and an unwavering commitment to quality. Our team understands that every bottle tells a story, and we take pride in ensuring that story reaches its audience in perfect condition.
                  </p>
                  <p>
                    Today, Truvino stands as a trusted partner to vineyards, distilleries, and brands seeking a distributor who treats their products with the care and respect they deserve.
                  </p>
                </div>
              </AnimatedSection>
              <AnimatedSection className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden border border-[#C9A962]/10">
                <Image
                  src="/hero-slideshow/product6.jpeg"
                  alt="Truvino Warehouse"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Mission & Vision Section */}
        <section className="bg-[#111111] py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 md:grid-cols-2">
              <AnimatedSection>
                <div className="h-full rounded-2xl bg-[#1a1a1a] p-10 border border-[#C9A962]/10">
                  <div className="mb-6 text-[#C9A962]">
                    <svg className="h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-white">
                    Our Mission
                  </h3>
                  <p className="mt-4 font-[family-name:var(--font-montserrat)] text-gray-400 leading-relaxed">
                    To provide exceptional distribution, warehousing, and logistics services that empower wine and spirits brands to thrive in the U.S. market. We are committed to treating every product with care and every partner with respect.
                  </p>
                </div>
              </AnimatedSection>
              <AnimatedSection>
                <div className="h-full rounded-2xl bg-[#1a1a1a] p-10 border border-[#C9A962]/10">
                  <div className="mb-6 text-[#C9A962]">
                    <svg className="h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  <h3 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-white">
                    Our Vision
                  </h3>
                  <p className="mt-4 font-[family-name:var(--font-montserrat)] text-gray-400 leading-relaxed">
                    To be the most trusted name in wine and spirits distribution, known for our integrity, reliability, and dedication to helping brands succeed. We envision a future where every quality producer has access to the markets they deserve.
                  </p>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-[#0a0a0a] py-20 border-y border-[#C9A962]/10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat, index) => (
                <AnimatedCard key={index} index={index}>
                  <div className="text-center">
                    <p className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl font-bold text-[#C9A962]">
                      {stat.value}
                    </p>
                    <p className="mt-2 font-[family-name:var(--font-montserrat)] text-gray-400">
                      {stat.label}
                    </p>
                  </div>
                </AnimatedCard>
              ))}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="bg-[#0a0a0a] py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <AnimatedSection className="text-center">
              <div className="flex justify-center mb-6">
                <div className="decorative-line" />
              </div>
              <h2 className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
                Our <span className="text-[#C9A962]">Values</span>
              </h2>
              <p className="mx-auto mt-4 max-w-2xl font-[family-name:var(--font-montserrat)] text-lg text-gray-400">
                The principles that guide everything we do
              </p>
            </AnimatedSection>

            <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {values.map((value, index) => (
                <AnimatedCard key={index} index={index}>
                  <div className="group h-full rounded-2xl bg-[#1a1a1a] p-8 border border-[#C9A962]/10 transition-all duration-500 hover:border-[#C9A962]/40 hover:shadow-xl hover:shadow-[#C9A962]/10">
                    <motion.div
                      className="mb-6 text-[#C9A962]"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {value.icon}
                    </motion.div>
                    <h3 className="font-[family-name:var(--font-playfair)] text-xl font-semibold text-white">
                      {value.title}
                    </h3>
                    <p className="mt-3 font-[family-name:var(--font-montserrat)] text-gray-400 text-sm">
                      {value.description}
                    </p>
                  </div>
                </AnimatedCard>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="bg-[#111111] py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <AnimatedSection className="text-center">
              <div className="flex justify-center mb-6">
                <div className="decorative-line" />
              </div>
              <h2 className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
                Our <span className="text-[#C9A962]">Journey</span>
              </h2>
              <p className="mx-auto mt-4 max-w-2xl font-[family-name:var(--font-montserrat)] text-lg text-gray-400">
                Key milestones in our growth
              </p>
            </AnimatedSection>

            <div className="mt-16 relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-[#C9A962]/20 hidden md:block" />

              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                  <AnimatedSection key={index}>
                    <div className={`flex flex-col md:flex-row items-center gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                      <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                        <div className={`inline-block rounded-2xl bg-[#1a1a1a] p-8 border border-[#C9A962]/10 ${index % 2 === 0 ? 'md:ml-auto' : 'md:mr-auto'}`}>
                          <p className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-[#C9A962]">
                            {milestone.year}
                          </p>
                          <h3 className="mt-2 font-[family-name:var(--font-playfair)] text-xl font-semibold text-white">
                            {milestone.title}
                          </h3>
                          <p className="mt-2 font-[family-name:var(--font-montserrat)] text-gray-400 text-sm max-w-sm">
                            {milestone.description}
                          </p>
                        </div>
                      </div>
                      {/* Timeline dot */}
                      <div className="hidden md:flex items-center justify-center w-4 h-4 rounded-full bg-[#C9A962] border-4 border-[#111111] z-10" />
                      <div className="flex-1 hidden md:block" />
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-[#0a0a0a] py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <AnimatedSection className="text-center">
              <h2 className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-white sm:text-4xl">
                Ready to <span className="text-[#C9A962]">Partner</span> with Us?
              </h2>
              <p className="mx-auto mt-4 max-w-2xl font-[family-name:var(--font-montserrat)] text-lg text-gray-400">
                Let&apos;s discuss how Truvino can help your brand reach new markets
              </p>
              <div className="mt-10">
                <motion.a
                  href="/contact"
                  className="inline-block rounded-full bg-[#C9A962] px-10 py-4 font-[family-name:var(--font-montserrat)] text-lg font-medium text-black transition-all hover:bg-[#D4BA7A] hover:shadow-lg hover:shadow-[#C9A962]/20"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get In Touch
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
