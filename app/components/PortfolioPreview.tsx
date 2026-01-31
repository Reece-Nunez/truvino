import Image from "next/image";

const products = [
  { src: "/hero-slideshow/product1.jpeg", name: "Premium Selection", category: "Red Wine" },
  { src: "/hero-slideshow/product2.jpeg", name: "Reserve Collection", category: "White Wine" },
  { src: "/hero-slideshow/product3.jpeg", name: "Grand Cru", category: "Champagne" },
  { src: "/hero-slideshow/product4.jpeg", name: "Single Malt", category: "Whisky" },
  { src: "/hero-slideshow/product5.jpeg", name: "Vintage Select", category: "Port" },
  { src: "/hero-slideshow/product6.jpeg", name: "Artisan Blend", category: "Spirits" },
];

export default function PortfolioPreview() {
  return (
    <section id="portfolio" className="bg-[#111111] py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center">
          <h2 className="font-[family-name:var(--font-cormorant)] text-3xl font-bold text-white sm:text-4xl">
            Our <span className="text-[#C9A962]">Portfolio</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl font-[family-name:var(--font-montserrat)] text-lg text-gray-400">
            A curated selection of the world&apos;s finest wines and spirits
          </p>
        </div>

        {/* Products Grid */}
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl bg-[#1a1a1a] border border-[#C9A962]/10"
            >
              <div className="aspect-[4/5] overflow-hidden">
                <Image
                  src={product.src}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white opacity-0 transition-all duration-300 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0">
                <p className="font-[family-name:var(--font-montserrat)] text-sm uppercase tracking-wider text-[#C9A962]">
                  {product.category}
                </p>
                <h3 className="mt-1 font-[family-name:var(--font-cormorant)] text-xl font-semibold">
                  {product.name}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full border-2 border-[#C9A962] px-8 py-3 font-[family-name:var(--font-montserrat)] text-sm font-medium text-[#C9A962] transition-all hover:bg-[#C9A962] hover:text-black"
          >
            View Full Catalog
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
