"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

interface ParallaxSectionProps {
  imageSrc: string;
  imageAlt: string;
  children: React.ReactNode;
  overlay?: boolean;
  height?: string;
}

export default function ParallaxSection({
  imageSrc,
  imageAlt,
  children,
  overlay = true,
  height = "h-[70vh]",
}: ParallaxSectionProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.6, 1, 1, 0.6]);

  return (
    <section ref={ref} className={`relative ${height} overflow-hidden`}>
      <motion.div
        style={{ y }}
        className="absolute inset-0 -top-[20%] -bottom-[20%]"
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover"
        />
      </motion.div>

      {overlay && (
        <motion.div
          style={{ opacity }}
          className="absolute inset-0 bg-black/60"
        />
      )}

      <div className="relative z-10 h-full flex items-center justify-center">
        {children}
      </div>
    </section>
  );
}
