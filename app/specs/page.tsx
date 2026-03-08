import Image from "next/image";
import type { Metadata } from "next";
import { specProducts, pricingPdf } from "../data/specs-data";
import SpecCard from "../components/SpecCard";

export const metadata: Metadata = {
  title: "Product Specifications & Pricing | Truvino",
  description:
    "Technical sheets and pricing for Truvino spirits products.",
};

export default function SpecsPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <header className="border-b border-[#C9A962]/10 py-6">
        <div className="mx-auto max-w-4xl px-4 flex justify-center">
          <a href="/">
            <Image
              src="/transparent.png"
              alt="Truvino Logo"
              width={400}
              height={134}
              className="h-24 w-auto"
              priority
            />
          </a>
        </div>
      </header>

      {/* Main */}
      <main className="mx-auto max-w-4xl px-4 py-10">
        <h1 className="font-[family-name:var(--font-playfair)] text-2xl sm:text-3xl font-semibold text-white">
          Product Specifications &amp; Pricing
        </h1>
        <p className="mt-2 font-[family-name:var(--font-montserrat)] text-sm text-gray-400">
          Technical sheets and pricing for our spirits products.
        </p>

        {/* Pricing button */}
        <div className="mt-8">
          <a
            href={pricingPdf}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-[#C9A962] px-5 py-3 font-[family-name:var(--font-montserrat)] text-sm font-medium text-black transition-colors hover:bg-[#D4BA7A]"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
            </svg>
            View Pricing
          </a>
        </div>

        {/* Tech sheets */}
        {specProducts.length > 0 && (
          <div className="mt-10">
            <h2 className="font-[family-name:var(--font-playfair)] text-xl font-semibold text-white mb-4">
              Technical Sheets
            </h2>
            <div className="grid gap-4">
              {specProducts.map((product) => (
                <SpecCard key={product.name} product={product} />
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Footer CTA */}
      <footer className="border-t border-[#C9A962]/10 py-10">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <p className="font-[family-name:var(--font-montserrat)] text-sm text-gray-300">
            Need additional specifications or bulk pricing?
          </p>
          <p className="mt-1 font-[family-name:var(--font-montserrat)] text-sm text-gray-300">
            Contact our sales team.
          </p>
          <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-4 font-[family-name:var(--font-montserrat)] text-sm">
            <a
              href="mailto:info@truvino.com"
              className="text-[#C9A962] hover:underline"
            >
              info@truvino.com
            </a>
            <span className="hidden sm:inline text-gray-600">|</span>
            <a
              href="tel:+12012905627"
              className="text-[#C9A962] hover:underline"
            >
              +1 (201) 290-5627
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
