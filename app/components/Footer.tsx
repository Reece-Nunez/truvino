"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer id="contact" className="bg-black py-20 border-t border-[#C9A962]/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-4">
          {/* Brand Column */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Image
              src="/logo.PNG"
              alt="Truvino Logo"
              width={300}
              height={100}
              className="h-24 w-auto"
            />
            <p className="mt-4 font-[family-name:var(--font-montserrat)] text-gray-400">
              Your trusted partner in premium wine and spirits distribution worldwide.
            </p>
            {/* Social Links */}
            <div className="mt-6 flex gap-4">
              <motion.a
                href="https://www.instagram.com/truvinowines/"
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-full bg-[#1a1a1a] border border-[#C9A962]/20 flex items-center justify-center text-[#C9A962] transition-colors hover:bg-[#C9A962] hover:text-black"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12,2.16c3.2,0,3.58,0,4.85.07,3.25.15,4.77,1.69,4.92,4.92.06,1.27.07,1.65.07,4.85s0,3.58-.07,4.85c-.15,3.23-1.66,4.77-4.92,4.92-1.27.06-1.65.07-4.85.07s-3.58,0-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.65-.07-4.85s0-3.58.07-4.85C2.38,3.92,3.9,2.38,7.15,2.23,8.42,2.18,8.8,2.16,12,2.16ZM12,0C8.74,0,8.33,0,7.05.07c-4.27.2-6.78,2.71-7,7C0,8.33,0,8.74,0,12s0,3.67.07,4.95c.2,4.27,2.71,6.78,7,7C8.33,24,8.74,24,12,24s3.67,0,4.95-.07c4.27-.2,6.78-2.71,7-7C24,15.67,24,15.26,24,12s0-3.67-.07-4.95c-.2-4.27-2.71-6.78-7-7C15.67,0,15.26,0,12,0Zm0,5.84A6.16,6.16,0,1,0,18.16,12,6.16,6.16,0,0,0,12,5.84ZM12,16a4,4,0,1,1,4-4A4,4,0,0,1,12,16ZM18.41,4.15a1.44,1.44,0,1,0,1.44,1.44A1.44,1.44,0,0,0,18.41,4.15Z" />
                </svg>
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/company/bevcon-group/"
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-full bg-[#1a1a1a] border border-[#C9A962]/20 flex items-center justify-center text-[#C9A962] transition-colors hover:bg-[#C9A962] hover:text-black"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.45,20.45H16.9V14.88c0-1.33,0-3-1.85-3s-2.13,1.45-2.13,2.94v5.66H9.37V9h3.41v1.56h.05a3.74,3.74,0,0,1,3.37-1.85c3.6,0,4.27,2.37,4.27,5.46v6.32ZM5.34,7.43A2.06,2.06,0,1,1,7.4,5.37,2.06,2.06,0,0,1,5.34,7.43Zm1.78,13H3.56V9H7.12ZM22.22,0H1.78A1.75,1.75,0,0,0,0,1.73V22.27A1.75,1.75,0,0,0,1.78,24H22.22A1.76,1.76,0,0,0,24,22.27V1.73A1.76,1.76,0,0,0,22.22,0Z" />
                </svg>
              </motion.a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="font-[family-name:var(--font-playfair)] text-lg font-semibold text-[#C9A962]">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-3">
              {[
                { href: "/about", label: "About" },
                { href: "/services", label: "Services" },
                { href: "/portfolio", label: "Portfolio" },
                { href: "/careers", label: "Careers" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-[family-name:var(--font-montserrat)] text-gray-400 transition-colors hover:text-[#C9A962] inline-flex items-center gap-2 group"
                  >
                    <span className="h-px w-0 bg-[#C9A962] transition-all group-hover:w-4" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="font-[family-name:var(--font-playfair)] text-lg font-semibold text-[#C9A962]">
              Services
            </h3>
            <ul className="mt-4 space-y-3">
              {["Distribution", "Warehousing", "Clearing", "Logistics"].map((service) => (
                <li key={service}>
                  <span className="font-[family-name:var(--font-montserrat)] text-gray-400">
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="font-[family-name:var(--font-playfair)] text-lg font-semibold text-[#C9A962]">
              Contact Us
            </h3>
            <ul className="mt-4 space-y-4">
              <li className="flex items-start gap-3">
                <svg className="h-5 w-5 text-[#C9A962] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="font-[family-name:var(--font-montserrat)] text-gray-400">
                  354 State Street Unit 102,<br />
                  Hackensack, NJ 07601, USA
                </span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="h-5 w-5 text-[#C9A962] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:+12012905627" className="font-[family-name:var(--font-montserrat)] text-gray-400 transition-colors hover:text-[#C9A962]">
                  +1 (201) 290-5627
                </a>
              </li>
              <li className="flex items-start gap-3">
                <svg className="h-5 w-5 text-[#C9A962] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:info@truvino.com" className="font-[family-name:var(--font-montserrat)] text-gray-400 transition-colors hover:text-[#C9A962]">
                  info@truvino.com
                </a>
              </li>
            </ul>

            {/* CTA in Footer */}
            <motion.div
              className="mt-6"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                href="/contact"
                className="inline-block w-full text-center rounded-full bg-[#C9A962] px-6 py-3 font-[family-name:var(--font-montserrat)] text-sm font-medium text-black transition-all hover:bg-[#D4BA7A]"
              >
                Get In Touch
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          className="mt-16 border-t border-[#C9A962]/10 pt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="font-[family-name:var(--font-montserrat)] text-sm text-gray-500">
              &copy; {new Date().getFullYear()} Truvino. All rights reserved.
            </p>
            <p className="font-[family-name:var(--font-playfair)] text-sm text-[#C9A962] italic">
              Premium Wine & Spirits Distribution
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
