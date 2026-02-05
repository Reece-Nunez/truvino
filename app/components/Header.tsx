"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const leftLinks = [
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/portfolio", label: "Portfolio" },
  ];

  const rightLinks = [
    { href: "/careers", label: "Careers" },
    { href: "/contact", label: "Contact" },
  ];

  const allLinks = [...leftLinks, ...rightLinks];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-out ${
        scrolled
          ? "bg-black/95 backdrop-blur-xl shadow-2xl shadow-black/50"
          : "bg-transparent"
      }`}
    >
      {/* Gold accent line that reveals on scroll */}
      <div
        className={`absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A962] to-transparent transition-opacity duration-500 ${
          scrolled ? "opacity-100" : "opacity-0"
        }`}
      />

      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className={`flex items-center justify-center transition-all duration-700 ease-out ${
            scrolled ? "h-20" : "h-32"
          }`}
        >
          {/* Left Navigation */}
          <div className="hidden md:flex md:items-center md:gap-2 flex-1 justify-end">
            {leftLinks.map((link, index) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
              >
                <Link href={link.href} className="group relative px-4 py-2">
                  <span
                    className={`font-[family-name:var(--font-montserrat)] font-medium transition-all duration-500 ${
                      scrolled ? "text-sm text-gray-400" : "text-base text-gray-300"
                    } group-hover:text-white`}
                  >
                    {link.label}
                  </span>
                  {/* Animated underline */}
                  <span className="absolute bottom-0 left-4 right-4 h-px bg-[#C9A962] origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Center Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`relative transition-all duration-700 ${
              scrolled ? "mx-8" : "mx-12"
            }`}
          >
            <Link href="/" className="flex items-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative"
              >
                {/* Glow behind logo */}
                <div
                  className={`absolute inset-0 bg-[#C9A962]/20 blur-2xl -z-10 transition-all duration-700 ${
                    scrolled ? "scale-100 opacity-50" : "scale-150 opacity-30"
                  }`}
                />
                <Image
                  src="/transparent.png"
                  alt="Truvino Logo"
                  width={300}
                  height={100}
                  className={`w-auto transition-all duration-700 ${
                    scrolled ? "h-14" : "h-24"
                  }`}
                  priority
                />
              </motion.div>
            </Link>
          </motion.div>

          {/* Right Navigation */}
          <div className="hidden md:flex md:items-center md:gap-2 flex-1">
            {rightLinks.map((link, index) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * (index + leftLinks.length), duration: 0.5 }}
              >
                <Link href={link.href} className="group relative px-4 py-2">
                  <span
                    className={`font-[family-name:var(--font-montserrat)] font-medium transition-all duration-500 ${
                      scrolled ? "text-sm text-gray-400" : "text-base text-gray-300"
                    } group-hover:text-white`}
                  >
                    {link.label}
                  </span>
                  {/* Animated underline */}
                  <span className="absolute bottom-0 left-4 right-4 h-px bg-[#C9A962] origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="ml-4"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/contact"
                  className={`rounded-full border border-[#C9A962] font-[family-name:var(--font-montserrat)] font-medium text-[#C9A962] transition-all duration-500 hover:bg-[#C9A962] hover:text-black ${
                    scrolled ? "px-5 py-2 text-sm" : "px-6 py-2.5 text-base"
                  }`}
                >
                  Get In Touch
                </Link>
              </motion.div>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className={`md:hidden absolute right-4 flex items-center justify-center rounded-xl border transition-all duration-500 ${
              scrolled
                ? "w-10 h-10 bg-[#C9A962]/10 border-[#C9A962]/30"
                : "w-12 h-12 bg-white/10 border-white/20"
            }`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle menu"
          >
            <div className="flex flex-col gap-1.5">
              <motion.span
                animate={mobileMenuOpen ? { rotate: 45, y: 10 } : { rotate: 0, y: 0 }}
                className={`h-0.5 bg-[#C9A962] rounded-full origin-center transition-all duration-500 ${
                  scrolled ? "w-5" : "w-6"
                }`}
              />
              <motion.span
                animate={mobileMenuOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
                className={`h-0.5 bg-[#C9A962] rounded-full transition-all duration-500 ${
                  scrolled ? "w-5" : "w-6"
                }`}
              />
              <motion.span
                animate={mobileMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                className={`h-0.5 bg-[#C9A962] rounded-full origin-center transition-all duration-500 ${
                  scrolled ? "w-5" : "w-6"
                }`}
              />
            </div>
          </motion.button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="overflow-hidden md:hidden bg-black/95 backdrop-blur-xl border-t border-[#C9A962]/20"
          >
            <div className="flex flex-col gap-2 p-6 max-w-7xl mx-auto">
              {allLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.08, duration: 0.4 }}
                >
                  <Link
                    href={link.href}
                    className="block py-4 px-4 rounded-xl font-[family-name:var(--font-montserrat)] text-base font-medium text-gray-300 transition-all hover:text-[#C9A962] hover:bg-[#C9A962]/10 hover:pl-6"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ x: -30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: allLinks.length * 0.08, duration: 0.4 }}
                className="mt-4"
              >
                <Link
                  href="/contact"
                  className="block rounded-xl bg-[#C9A962] px-6 py-4 text-center font-[family-name:var(--font-montserrat)] text-base font-medium text-black transition-colors hover:bg-[#D4BA7A]"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Get In Touch
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
