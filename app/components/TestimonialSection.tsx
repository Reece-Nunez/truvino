"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

export default function TestimonialSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);

  return (
    <section ref={ref} className="relative h-[60vh] min-h-[500px] overflow-hidden">
      {/* Parallax Background */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 -top-[30%] -bottom-[30%]"
      >
        <Image
          src="/hero-slideshow/product8.jpeg"
          alt="Premium Wine"
          fill
          className="object-cover"
        />
      </motion.div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Content */}
      <motion.div
        style={{ y: textY }}
        className="relative z-10 h-full flex items-center justify-center"
      >
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex justify-center mb-8">
              <svg className="h-16 w-16 text-[#C9A962] opacity-50" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
            </div>
            <p className="font-[family-name:var(--font-playfair)] text-2xl md:text-3xl lg:text-4xl text-white italic leading-relaxed">
              Excellence in every bottle, reliability in every delivery. Our commitment to quality defines everything we do.
            </p>
            <div className="mt-8">
              <div className="decorative-line mx-auto" />
            </div>
            <p className="mt-6 font-[family-name:var(--font-montserrat)] text-[#C9A962] uppercase tracking-widest text-sm">
              The Truvino Promise
            </p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
