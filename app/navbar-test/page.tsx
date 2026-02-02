"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/#portfolio", label: "Portfolio" },
  { href: "/careers", label: "Careers" },
  { href: "/#contact", label: "Contact" },
];

// Option C: Animated Underlines + Glassmorphism
function OptionC() {
  return (
    <header className="relative w-full z-10">
      <div className="bg-black/60 backdrop-blur-2xl border-b border-[#C9A962]/20">
        {/* Gradient overlay at top */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#C9A962]/10 to-transparent pointer-events-none" />

        <nav className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-24 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Image
                src="/transparent.png"
                alt="Truvino Logo"
                width={200}
                height={67}
                className="h-14 w-auto"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center md:gap-1">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} className="group relative px-5 py-3 overflow-hidden">
                  <span className="relative z-10 font-[family-name:var(--font-montserrat)] text-sm font-medium text-gray-300 transition-colors duration-300 group-hover:text-[#C9A962]">
                    {link.label}
                  </span>
                  {/* Background hover effect */}
                  <span className="absolute inset-0 bg-[#C9A962]/0 group-hover:bg-[#C9A962]/10 transition-colors duration-300 rounded-lg" />
                  {/* Animated underline */}
                  <span className="absolute bottom-2 left-5 right-5 h-0.5 bg-gradient-to-r from-[#C9A962] via-[#D4BA7A] to-[#C9A962] rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
                </Link>
              ))}
              <div className="ml-6">
                <Link
                  href="/#contact"
                  className="relative overflow-hidden rounded-full bg-gradient-to-r from-[#C9A962] to-[#D4BA7A] px-6 py-2.5 font-[family-name:var(--font-montserrat)] text-sm font-medium text-black transition-all hover:shadow-lg hover:shadow-[#C9A962]/40 group"
                >
                  <span className="relative z-10">Get In Touch</span>
                  <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}

// Option D: Centered Logo Split Nav
function OptionD() {
  return (
    <header className="relative w-full z-10">
      <div className="bg-black/90 backdrop-blur-xl border-b border-[#C9A962]/10">
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-24 items-center justify-center">
            {/* Left Navigation */}
            <div className="hidden md:flex md:items-center md:gap-8 flex-1 justify-end pr-12">
              {navLinks.slice(0, 3).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group font-[family-name:var(--font-montserrat)] text-sm font-medium text-gray-400 transition-all hover:text-white"
                >
                  <span className="relative">
                    {link.label}
                    <span className="absolute -bottom-1 left-0 w-full h-px bg-[#C9A962] scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                  </span>
                </Link>
              ))}
            </div>

            {/* Center Logo */}
            <Link href="/" className="flex items-center px-8">
              <div className="relative">
                <Image
                  src="/transparent.png"
                  alt="Truvino Logo"
                  width={180}
                  height={60}
                  className="h-16 w-auto"
                />
                {/* Glow behind logo */}
                <div className="absolute inset-0 bg-[#C9A962]/20 blur-2xl -z-10 scale-150" />
              </div>
            </Link>

            {/* Right Navigation */}
            <div className="hidden md:flex md:items-center md:gap-8 flex-1 pl-12">
              {navLinks.slice(3).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group font-[family-name:var(--font-montserrat)] text-sm font-medium text-gray-400 transition-all hover:text-white"
                >
                  <span className="relative">
                    {link.label}
                    <span className="absolute -bottom-1 left-0 w-full h-px bg-[#C9A962] scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                  </span>
                </Link>
              ))}
              <Link
                href="/#contact"
                className="rounded-full border border-[#C9A962] px-5 py-2 font-[family-name:var(--font-montserrat)] text-sm font-medium text-[#C9A962] transition-all hover:bg-[#C9A962] hover:text-black"
              >
                Get In Touch
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}

// Option E: Minimal Floating with Expand
function OptionE() {
  const [expanded, setExpanded] = useState(false);

  return (
    <header className="relative w-full z-10 px-6 pt-6">
      <nav className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/transparent.png"
              alt="Truvino Logo"
              width={160}
              height={53}
              className="h-12 w-auto"
            />
          </Link>

          {/* Expandable Nav Pill */}
          <motion.div
            className="relative"
            onHoverStart={() => setExpanded(true)}
            onHoverEnd={() => setExpanded(false)}
          >
            <motion.div
              className="flex items-center gap-2 rounded-full bg-black/80 backdrop-blur-xl border border-[#C9A962]/30 overflow-hidden"
              animate={{ width: expanded ? "auto" : "48px" }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <AnimatePresence>
                {expanded && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="hidden md:flex items-center gap-1 pl-2"
                  >
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="px-3 py-2 font-[family-name:var(--font-montserrat)] text-xs font-medium text-gray-300 hover:text-[#C9A962] transition-colors whitespace-nowrap"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Menu dots / trigger */}
              <div className="w-12 h-12 flex items-center justify-center cursor-pointer">
                <div className="flex gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C9A962]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C9A962]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C9A962]" />
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* CTA always visible */}
          <Link
            href="/#contact"
            className="hidden md:block rounded-full bg-[#C9A962] px-5 py-2.5 font-[family-name:var(--font-montserrat)] text-sm font-medium text-black hover:bg-[#D4BA7A] transition-colors"
          >
            Get In Touch
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default function NavbarTestPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <div className="text-center py-12 border-b border-[#C9A962]/20">
        <h1 className="font-[family-name:var(--font-playfair)] text-4xl font-bold text-white">
          Navbar <span className="text-[#C9A962]">Options</span>
        </h1>
        <p className="mt-4 font-[family-name:var(--font-montserrat)] text-gray-400">
          Hover over each option to see interactions
        </p>
        <Link
          href="/"
          className="inline-block mt-6 text-[#C9A962] font-[family-name:var(--font-montserrat)] text-sm hover:underline"
        >
          &larr; Back to Home
        </Link>
      </div>

      {/* Option C */}
      <section className="py-16 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 mb-8">
          <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-white mb-2">
            Option C: <span className="text-[#C9A962]">Glassmorphism + Animated Underlines</span>
          </h2>
          <p className="font-[family-name:var(--font-montserrat)] text-gray-400 text-sm">
            Enhanced glass blur effect, gradient underlines that expand from center, subtle background hover states
          </p>
        </div>
        <div className="relative">
          <div className="absolute inset-0 bg-[url('/hero-slideshow/product1.jpeg')] bg-cover bg-center opacity-30" />
          <OptionC />
        </div>
      </section>

      {/* Option D */}
      <section className="py-16 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 mb-8">
          <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-white mb-2">
            Option D: <span className="text-[#C9A962]">Centered Logo Split Nav</span>
          </h2>
          <p className="font-[family-name:var(--font-montserrat)] text-gray-400 text-sm">
            Symmetrical layout with logo as focal point, navigation split on both sides, elegant glow behind logo
          </p>
        </div>
        <div className="relative">
          <div className="absolute inset-0 bg-[url('/hero-slideshow/product3.jpeg')] bg-cover bg-center opacity-30" />
          <OptionD />
        </div>
      </section>

      {/* Option E */}
      <section className="py-16 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 mb-8">
          <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-white mb-2">
            Option E: <span className="text-[#C9A962]">Minimal Expanding Pill</span>
          </h2>
          <p className="font-[family-name:var(--font-montserrat)] text-gray-400 text-sm">
            Ultra-minimal by default, nav expands on hover from a compact pill with dots, clean and sophisticated
          </p>
        </div>
        <div className="relative h-32">
          <div className="absolute inset-0 bg-[url('/hero-slideshow/product5.jpeg')] bg-cover bg-center opacity-30" />
          <OptionE />
        </div>
      </section>

      {/* Summary */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-white mb-6">
            Quick <span className="text-[#C9A962]">Comparison</span>
          </h2>
          <div className="grid gap-6 md:grid-cols-3 text-left">
            <div className="bg-[#1a1a1a] rounded-xl p-6 border border-[#C9A962]/10">
              <h3 className="font-[family-name:var(--font-montserrat)] text-[#C9A962] font-semibold mb-2">Option C</h3>
              <ul className="font-[family-name:var(--font-montserrat)] text-sm text-gray-400 space-y-1">
                <li>+ Strong glass effect</li>
                <li>+ Gradient accents</li>
                <li>+ Subtle but polished</li>
                <li>- More traditional layout</li>
              </ul>
            </div>
            <div className="bg-[#1a1a1a] rounded-xl p-6 border border-[#C9A962]/10">
              <h3 className="font-[family-name:var(--font-montserrat)] text-[#C9A962] font-semibold mb-2">Option D</h3>
              <ul className="font-[family-name:var(--font-montserrat)] text-sm text-gray-400 space-y-1">
                <li>+ Logo-focused</li>
                <li>+ Elegant symmetry</li>
                <li>+ Premium feel</li>
                <li>- Less space for links</li>
              </ul>
            </div>
            <div className="bg-[#1a1a1a] rounded-xl p-6 border border-[#C9A962]/10">
              <h3 className="font-[family-name:var(--font-montserrat)] text-[#C9A962] font-semibold mb-2">Option E</h3>
              <ul className="font-[family-name:var(--font-montserrat)] text-sm text-gray-400 space-y-1">
                <li>+ Ultra modern</li>
                <li>+ Maximum content space</li>
                <li>+ Unique interaction</li>
                <li>- Less discoverable</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
