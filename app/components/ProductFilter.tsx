"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FilterOption {
  value: string;
  label: string;
  count: number;
}

interface ProductFilterProps {
  categories: FilterOption[];
  types: FilterOption[];
  sizes: FilterOption[];
  activeCategory: string;
  activeTypes: string[];
  activeSizes: string[];
  onCategoryChange: (category: string) => void;
  onTypesChange: (types: string[]) => void;
  onSizesChange: (sizes: string[]) => void;
  onClearAll: () => void;
  totalResults: number;
}

function DropdownMultiSelect({
  label,
  options,
  selected,
  onChange,
  icon,
}: {
  label: string;
  options: FilterOption[];
  selected: string[];
  onChange: (values: string[]) => void;
  icon: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleValue = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter((v) => v !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-[family-name:var(--font-montserrat)] font-medium transition-all duration-200 ${
          selected.length > 0
            ? "border-[#C9A962] bg-[#C9A962]/10 text-[#C9A962]"
            : "border-white/10 bg-white/5 text-gray-300 hover:border-white/20 hover:bg-white/10"
        }`}
      >
        {icon}
        <span>{label}</span>
        {selected.length > 0 && (
          <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#C9A962] text-black text-[10px] font-bold">
            {selected.length}
          </span>
        )}
        <svg
          className={`w-3.5 h-3.5 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 mt-2 min-w-[220px] max-h-[320px] overflow-y-auto rounded-xl border border-white/10 bg-[#1a1a1a] shadow-xl shadow-black/40 z-50 scrollbar-hide"
          >
            <div className="p-2">
              {selected.length > 0 && (
                <button
                  onClick={() => onChange([])}
                  className="w-full text-left px-3 py-2 text-xs font-[family-name:var(--font-montserrat)] text-[#C9A962] hover:bg-white/5 rounded-lg transition-colors mb-1"
                >
                  Clear selection
                </button>
              )}
              {options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => toggleValue(option.value)}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/5 transition-colors"
                >
                  <div
                    className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                      selected.includes(option.value)
                        ? "bg-[#C9A962] border-[#C9A962]"
                        : "border-white/20"
                    }`}
                  >
                    {selected.includes(option.value) && (
                      <svg className="w-2.5 h-2.5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span className="font-[family-name:var(--font-montserrat)] text-sm text-gray-300 flex-1 text-left">
                    {option.label}
                  </span>
                  <span className="font-[family-name:var(--font-montserrat)] text-xs text-gray-500">
                    {option.count}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ProductFilter({
  categories,
  types,
  sizes,
  activeCategory,
  activeTypes,
  activeSizes,
  onCategoryChange,
  onTypesChange,
  onSizesChange,
  onClearAll,
  totalResults,
}: ProductFilterProps) {
  const hasActiveFilters = activeCategory !== "all" || activeTypes.length > 0 || activeSizes.length > 0;

  const typeLabels: Record<string, string> = {
    red: "Red Wine",
    white: "White Wine",
    rosé: "Rosé",
    sparkling: "Sparkling",
    dessert: "Dessert Wine",
    fortified: "Fortified",
    bourbon: "Bourbon",
    whisky: "Whisky",
    cognac: "Cognac",
    tequila: "Tequila",
    vodka: "Vodka",
    gin: "Gin",
    rum: "Rum",
    cachaça: "Cachaça",
    soju: "Soju",
    sake: "Sake",
    rtd: "RTD",
    sangria: "Sangria",
    liqueur: "Liqueur",
  };

  return (
    <div className="space-y-4">
      {/* Filter controls row */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Category toggle */}
        <div className="flex rounded-xl border border-white/10 bg-white/5 overflow-hidden">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => onCategoryChange(cat.value)}
              className={`relative px-4 py-2.5 text-sm font-[family-name:var(--font-montserrat)] font-medium transition-all duration-300 ${
                activeCategory === cat.value
                  ? "text-black"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {activeCategory === cat.value && (
                <motion.div
                  layoutId="category-bg"
                  className="absolute inset-0 bg-[#C9A962]"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                />
              )}
              <span className="relative z-10">{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Divider */}
        <div className="hidden sm:block w-px h-8 bg-white/10" />

        {/* Type dropdown */}
        <DropdownMultiSelect
          label="Variety"
          options={types}
          selected={activeTypes}
          onChange={onTypesChange}
          icon={
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 3h10l-1 8a5 5 0 01-4 4.9V20h3v1H9v-1h3v-4.1A5 5 0 018 12L7 3z" />
            </svg>
          }
        />

        {/* Size dropdown */}
        <DropdownMultiSelect
          label="Bottle Size"
          options={sizes}
          selected={activeSizes}
          onChange={onSizesChange}
          icon={
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375" />
            </svg>
          }
        />

        {/* Results count + clear */}
        <div className="ml-auto flex items-center gap-3">
          <span className="font-[family-name:var(--font-montserrat)] text-sm text-gray-500">
            {totalResults} product{totalResults !== 1 ? "s" : ""}
          </span>
          {hasActiveFilters && (
            <button
              onClick={onClearAll}
              className="font-[family-name:var(--font-montserrat)] text-xs text-[#C9A962] hover:text-[#d4b96f] transition-colors"
            >
              Clear all
            </button>
          )}
        </div>
      </div>

      {/* Active filter chips */}
      <AnimatePresence>
        {hasActiveFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="flex flex-wrap gap-2 overflow-hidden"
          >
            {activeCategory !== "all" && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={() => onCategoryChange("all")}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#C9A962]/15 border border-[#C9A962]/30 text-[#C9A962] text-xs font-[family-name:var(--font-montserrat)] font-medium"
              >
                {categories.find((c) => c.value === activeCategory)?.label}
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>
            )}
            {activeTypes.map((type) => (
              <motion.button
                key={type}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={() => onTypesChange(activeTypes.filter((t) => t !== type))}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#C9A962]/15 border border-[#C9A962]/30 text-[#C9A962] text-xs font-[family-name:var(--font-montserrat)] font-medium"
              >
                {typeLabels[type] || type}
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>
            ))}
            {activeSizes.map((size) => (
              <motion.button
                key={size}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={() => onSizesChange(activeSizes.filter((s) => s !== size))}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#C9A962]/15 border border-[#C9A962]/30 text-[#C9A962] text-xs font-[family-name:var(--font-montserrat)] font-medium"
              >
                {size}
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
