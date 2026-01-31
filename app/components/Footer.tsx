import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer id="contact" className="bg-black py-16 border-t border-[#C9A962]/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-4">
          {/* Brand Column */}
          <div className="lg:col-span-1">
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
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-[family-name:var(--font-cormorant)] text-lg font-semibold text-[#C9A962]">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link href="#services" className="font-[family-name:var(--font-montserrat)] text-gray-400 transition-colors hover:text-[#C9A962]">
                  Services
                </Link>
              </li>
              <li>
                <Link href="#portfolio" className="font-[family-name:var(--font-montserrat)] text-gray-400 transition-colors hover:text-[#C9A962]">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="#global" className="font-[family-name:var(--font-montserrat)] text-gray-400 transition-colors hover:text-[#C9A962]">
                  Global Presence
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-[family-name:var(--font-cormorant)] text-lg font-semibold text-[#C9A962]">
              Services
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <span className="font-[family-name:var(--font-montserrat)] text-gray-400">
                  Distribution
                </span>
              </li>
              <li>
                <span className="font-[family-name:var(--font-montserrat)] text-gray-400">
                  Warehousing
                </span>
              </li>
              <li>
                <span className="font-[family-name:var(--font-montserrat)] text-gray-400">
                  Clearing
                </span>
              </li>
              <li>
                <span className="font-[family-name:var(--font-montserrat)] text-gray-400">
                  Delivery
                </span>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-[family-name:var(--font-cormorant)] text-lg font-semibold text-[#C9A962]">
              Contact Us
            </h3>
            <ul className="mt-4 space-y-3">
              <li className="flex items-center gap-3">
                <svg className="h-5 w-5 text-[#C9A962]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="font-[family-name:var(--font-montserrat)] text-gray-400">
                  California, USA
                </span>
              </li>
              <li className="flex items-center gap-3">
                <svg className="h-5 w-5 text-[#C9A962]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:info@truvino.com" className="font-[family-name:var(--font-montserrat)] text-gray-400 transition-colors hover:text-[#C9A962]">
                  info@truvino.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-[#C9A962]/10 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="font-[family-name:var(--font-montserrat)] text-sm text-gray-500">
              &copy; {new Date().getFullYear()} Truvino. All rights reserved.
            </p>
            <p className="font-[family-name:var(--font-montserrat)] text-sm text-[#C9A962]">
              Premium Wine & Spirits Distribution
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
