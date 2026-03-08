import Image from "next/image";
import type { Metadata } from "next";
import { specProducts, pricingPdf } from "../data/specs-data";
import SpecCard from "../components/SpecCard";

export const metadata: Metadata = {
  title: "By the Glass Product Tech Sheets & Pricing",
  description:
    "Technical sheets and pricing for By the Glass spirits products.",
};

export default function SpecsPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <header className="border-b border-[#C9A962]/10">
        <div className="mx-auto max-w-4xl px-4 flex justify-center">
          <a href="https://bytheglassimports.com" target="_blank" rel="noopener noreferrer">
            <Image
              src="/docs/by-the-glass-transparent.png"
              alt="By the Glass"
              width={400}
              height={134}
              className="h-36 w-auto"
              priority
            />
          </a>
        </div>
      </header>

      {/* Main */}
      <main className="mx-auto max-w-4xl px-4 py-10">
        <h1 className="font-[family-name:var(--font-playfair)] text-2xl sm:text-3xl font-semibold text-white">
          By the Glass Product Tech Sheets &amp; Pricing
        </h1>

        {/* Contact info */}
        <div className="mt-6 flex flex-col sm:flex-row gap-6 font-[family-name:var(--font-montserrat)] text-sm">
          <p className="text-gray-400 self-center">For any inquiries please contact:</p>
          <div className="flex flex-col sm:flex-row gap-6">
            <div>
              <p className="font-semibold text-white">Kyle Flandrau</p>
              <a href="tel:+12012905627" className="text-[#C9A962] hover:underline block">
                201-290-5627
              </a>
              <a href="mailto:Kyle@bytheglassimports.com" className="text-[#C9A962] hover:underline block">
                Kyle@bytheglassimports.com
              </a>
            </div>
            <div>
              <p className="font-semibold text-white">Jim Treanor</p>
              <a href="mailto:Jimt@threesixtyfivewines.com" className="text-[#C9A962] hover:underline block">
                Jimt@threesixtyfivewines.com
              </a>
            </div>
          </div>
        </div>

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
            For any inquiries please contact
          </p>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-8 font-[family-name:var(--font-montserrat)] text-sm">
            <div>
              <p className="font-semibold text-white">Kyle Flandrau</p>
              <a href="tel:+12012905627" className="text-[#C9A962] hover:underline block mt-1">
                201-290-5627
              </a>
              <a href="mailto:Kyle@bytheglassimports.com" className="text-[#C9A962] hover:underline block mt-1">
                Kyle@bytheglassimports.com
              </a>
            </div>
            <div>
              <p className="font-semibold text-white">Jim Treanor</p>
              <a href="mailto:Jimt@threesixtyfivewines.com" className="text-[#C9A962] hover:underline block mt-1">
                Jimt@threesixtyfivewines.com
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
