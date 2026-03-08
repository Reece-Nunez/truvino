import type { SpecProduct } from "../data/specs-data";

interface SpecCardProps {
  product: SpecProduct;
}

export default function SpecCard({ product }: SpecCardProps) {
  return (
    <div className="rounded-xl bg-[#1a1a1a] border border-[#C9A962]/10 p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h3 className="font-[family-name:var(--font-playfair)] text-lg font-semibold text-white">
          {product.name}
        </h3>
        {product.description && (
          <p className="mt-1 font-[family-name:var(--font-montserrat)] text-sm text-gray-400">
            {product.description}
          </p>
        )}
      </div>
      <a
        href={product.techSheet}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#C9A962]/40 px-4 py-2.5 font-[family-name:var(--font-montserrat)] text-sm font-medium text-[#C9A962] transition-colors hover:bg-[#C9A962]/10 whitespace-nowrap flex-shrink-0"
      >
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.64 0 8.577 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.64 0-8.577-3.007-9.964-7.178z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        View Tech Sheet
      </a>
    </div>
  );
}
