"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "#services", label: "Services" },
    { href: "#portfolio", label: "Portfolio" },
    { href: "#global", label: "Global Presence" },
    { href: "/careers", label: "Careers" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm border-b border-[#C9A962]/20">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-32 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.PNG"
              alt="Truvino Logo"
              width={300}
              height={100}
              className="h-24 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-[family-name:var(--font-montserrat)] text-lg font-medium text-gray-300 transition-colors hover:text-[#C9A962]"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="#contact"
              className="rounded-full bg-[#C9A962] px-8 py-3 font-[family-name:var(--font-montserrat)] text-lg font-medium text-black transition-colors hover:bg-[#D4BA7A]"
            >
              Get In Touch
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="h-6 w-6 text-[#C9A962]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="border-t border-[#C9A962]/20 py-4 md:hidden">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-[family-name:var(--font-montserrat)] text-sm font-medium text-gray-300 transition-colors hover:text-[#C9A962]"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="#contact"
                className="mt-2 rounded-full bg-[#C9A962] px-6 py-2.5 text-center font-[family-name:var(--font-montserrat)] text-sm font-medium text-black transition-colors hover:bg-[#D4BA7A]"
                onClick={() => setMobileMenuOpen(false)}
              >
                Get In Touch
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
