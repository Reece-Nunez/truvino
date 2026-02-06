"use client";

import { useState, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Line,
} from "react-simple-maps";
import type { CountryData } from "../data/portfolio-data";

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

interface WorldMapProps {
  countries: CountryData[];
  activeCountry: string | null;
  onCountrySelect: (countryId: string) => void;
  onCountryHover: (countryId: string | null) => void;
}

// Map our country IDs to ISO 3166-1 alpha-3 codes (used in the TopoJSON)
const countryToISO: Record<string, string[]> = {
  italy: ["ITA"],
  france: ["FRA"],
  spain: ["ESP"],
  portugal: ["PRT"],
  georgia: ["GEO"],
  greece: ["GRC"],
  scotland: ["GBR"], // Part of UK
  argentina: ["ARG"],
  brazil: ["BRA"],
  chile: ["CHL"],
  usa: ["USA"],
  "south-korea": ["KOR"],
  japan: ["JPN"],
  india: ["IND"],
  china: ["CHN"],
  mexico: ["MEX"],
  "new-zealand": ["NZL"],
  caribbean: ["CUB", "JAM", "DOM", "PRI", "HTI", "TTO"],
};

// Build a reverse lookup: ISO code -> our country ID
function buildISOLookup(): Map<string, string> {
  const map = new Map<string, string>();
  for (const [countryId, isoCodes] of Object.entries(countryToISO)) {
    for (const iso of isoCodes) {
      map.set(iso, countryId);
    }
  }
  return map;
}

// Connection lines between countries
const connectionPairs: [string, string][] = [
  ["italy", "france"],
  ["france", "spain"],
  ["spain", "portugal"],
  ["italy", "greece"],
  ["greece", "georgia"],
  ["usa", "mexico"],
  ["argentina", "chile"],
  ["argentina", "brazil"],
  ["south-korea", "japan"],
  ["india", "china"],
];

export default function WorldMap({
  countries,
  activeCountry,
  onCountrySelect,
  onCountryHover,
}: WorldMapProps) {
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null);

  const isoLookup = useMemo(() => buildISOLookup(), []);
  const countryMap = useMemo(
    () => new Map(countries.map((c) => [c.id, c])),
    [countries]
  );

  // All ISO codes that belong to our portfolio countries
  const highlightedISOs = useMemo(() => {
    const set = new Set<string>();
    for (const codes of Object.values(countryToISO)) {
      for (const code of codes) set.add(code);
    }
    return set;
  }, []);

  const handleGeoHover = useCallback((countryId: string | null) => {
    setHoveredCountry(countryId);
    onCountryHover(countryId);
  }, [onCountryHover]);

  // Unified mouse move handler on the wrapper div
  const handleMapMouseMove = useCallback((e: React.MouseEvent) => {
    // Walk up from the event target to find a data-country attribute
    let el = e.target as HTMLElement | SVGElement | null;
    let countryId: string | null = null;
    while (el && el !== e.currentTarget) {
      const attr = el.getAttribute("data-country");
      if (attr) {
        countryId = attr;
        break;
      }
      el = el.parentElement;
    }

    if (countryId) {
      handleGeoHover(countryId);
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      setTooltipPos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    } else {
      handleGeoHover(null);
      setTooltipPos(null);
    }
  }, [handleGeoHover]);

  const displayedCountry = hoveredCountry || activeCountry;
  const tooltipData = displayedCountry ? countryMap.get(displayedCountry) : null;

  return (
    <div className="w-full">
      {/* Desktop: react-simple-maps */}
      <div className="hidden sm:block">
        <div
          className="relative w-full mx-auto"
          onMouseMove={handleMapMouseMove}
          onMouseLeave={() => {
            setTooltipPos(null);
            handleGeoHover(null);
          }}
        >
          {/* Tooltip */}
          {tooltipData && tooltipPos && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute z-20 pointer-events-none flex items-center gap-2 px-4 py-2 rounded-full bg-[#1a1a1a]/95 border border-[#C9A962]/50 backdrop-blur-sm"
              style={{
                left: tooltipPos.x,
                top: tooltipPos.y - 50,
                transform: "translateX(-50%)",
              }}
            >
              {tooltipData.icon ? (
                <span
                  className="inline-block h-4 w-4 bg-[#C9A962]"
                  style={{
                    mask: `url(${tooltipData.icon}) center/contain no-repeat`,
                    WebkitMask: `url(${tooltipData.icon}) center/contain no-repeat`,
                  }}
                />
              ) : (
                <span className="text-sm">{tooltipData.flag}</span>
              )}
              <span className="font-[family-name:var(--font-montserrat)] text-sm text-white whitespace-nowrap">
                {tooltipData.name}{" "}
                <span className="text-[#C9A962]">
                  ({tooltipData.products.length})
                </span>
              </span>
            </motion.div>
          )}

          <ComposableMap
            projection="geoNaturalEarth1"
            projectionConfig={{
              scale: 190,
              center: [10, 15],
            }}
            width={960}
            height={550}
            style={{ width: "100%", height: "auto", maxHeight: "80vh" }}
          >
            {/* Country shapes */}
            <Geographies geography={GEO_URL}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const isoCode = geo.properties.ISO_A3 || geo.id;
                  const ourCountryId = isoLookup.get(isoCode);
                  const isPortfolio = highlightedISOs.has(isoCode);
                  const isHovered = ourCountryId === hoveredCountry;
                  const isActive = ourCountryId === activeCountry;
                  const isHighlighted = isHovered || isActive;

                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      data-country={ourCountryId || ""}
                      onClick={() => {
                        if (ourCountryId) {
                          onCountrySelect(ourCountryId);
                        }
                      }}
                      style={{
                        default: {
                          fill: isHighlighted
                            ? "#C9A962"
                            : isPortfolio
                            ? "#2a2520"
                            : "#161616",
                          stroke: isPortfolio ? "#C9A962" : "#222",
                          strokeWidth: isHighlighted
                            ? 1.5
                            : isPortfolio
                            ? 0.5
                            : 0.25,
                          opacity: isHighlighted ? 1 : isPortfolio ? 0.9 : 0.6,
                          cursor: isPortfolio ? "pointer" : "default",
                          transition: "all 250ms",
                          outline: "none",
                        },
                        hover: {
                          fill: isPortfolio ? "#C9A962" : "#1a1a1a",
                          stroke: isPortfolio ? "#C9A962" : "#333",
                          strokeWidth: isPortfolio ? 1.5 : 0.25,
                          opacity: 1,
                          cursor: isPortfolio ? "pointer" : "default",
                          outline: "none",
                        },
                        pressed: {
                          fill: isPortfolio ? "#D4BA7A" : "#161616",
                          outline: "none",
                        },
                      }}
                    />
                  );
                })
              }
            </Geographies>

            {/* Connection lines between portfolio countries */}
            {connectionPairs.map(([a, b], i) => {
              const ca = countryMap.get(a);
              const cb = countryMap.get(b);
              if (!ca || !cb) return null;
              return (
                <Line
                  key={`connection-${i}`}
                  from={[ca.mapPosition.x, ca.mapPosition.y]}
                  to={[cb.mapPosition.x, cb.mapPosition.y]}
                  stroke="#C9A962"
                  strokeWidth={0.5}
                  strokeDasharray="4 4"
                  strokeOpacity={0.15}
                  style={{ pointerEvents: "none" }}
                />
              );
            })}

            {/* Country marker dots */}
            {countries.map((country) => {
              const isHighlighted =
                country.id === hoveredCountry || country.id === activeCountry;

              return (
                <Marker
                  key={country.id}
                  coordinates={[
                    country.mapPosition.x,
                    country.mapPosition.y,
                  ]}
                >
                  {/* Pulse ring */}
                  {isHighlighted && (
                    <circle
                      r={12}
                      fill="none"
                      stroke="#C9A962"
                      strokeWidth={1}
                      opacity={0.4}
                      pointerEvents="none"
                    >
                      <animate
                        attributeName="r"
                        from="6"
                        to="18"
                        dur="1.5s"
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="opacity"
                        from="0.6"
                        to="0"
                        dur="1.5s"
                        repeatCount="indefinite"
                      />
                    </circle>
                  )}
                  {/* Glow */}
                  <circle
                    r={isHighlighted ? 10 : 4}
                    fill="#C9A962"
                    opacity={isHighlighted ? 0.2 : 0.5}
                    pointerEvents="none"
                  />
                  {/* Dot */}
                  <circle
                    r={isHighlighted ? 5 : 3}
                    fill="#C9A962"
                    stroke="#0a0a0a"
                    strokeWidth={1}
                    data-country={country.id}
                    style={{ cursor: "pointer" }}
                    onClick={() => onCountrySelect(country.id)}
                  />
                </Marker>
              );
            })}
          </ComposableMap>

          {/* Instruction text */}
          <p className="text-center mt-4 font-[family-name:var(--font-montserrat)] text-sm text-gray-500">
            Click on a highlighted country to explore its wines &amp; spirits
          </p>
        </div>
      </div>

      {/* Mobile: Country card grid */}
      <div className="sm:hidden">
        <div className="grid grid-cols-2 gap-3">
          {countries.map((country, i) => (
            <motion.button
              key={country.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              onClick={() => onCountrySelect(country.id)}
              className={`flex items-center gap-3 p-3 rounded-xl border transition-all duration-300 text-left ${
                activeCountry === country.id
                  ? "bg-[#C9A962]/10 border-[#C9A962]/40"
                  : "bg-[#1a1a1a] border-[#C9A962]/10 hover:border-[#C9A962]/30"
              }`}
            >
              {country.icon ? (
                <div
                  className="h-7 w-7 flex-shrink-0 bg-[#C9A962]"
                  style={{
                    mask: `url(${country.icon}) center/contain no-repeat`,
                    WebkitMask: `url(${country.icon}) center/contain no-repeat`,
                  }}
                />
              ) : (
                <span className="text-2xl">{country.flag}</span>
              )}
              <div className="min-w-0">
                <p className="font-[family-name:var(--font-montserrat)] text-sm font-medium text-white truncate">
                  {country.name}
                </p>
                <p className="font-[family-name:var(--font-montserrat)] text-xs text-gray-500">
                  {country.products.length} products
                </p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
