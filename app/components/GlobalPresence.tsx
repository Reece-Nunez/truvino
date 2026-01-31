import Image from "next/image";

const locations = [
  {
    country: "California, USA",
    description: "Our North American headquarters, serving the US market",
    icon: "/icons/california.svg",
  },
  {
    country: "France",
    description: "Heart of world-renowned wine regions",
    icon: "/icons/france.svg",
  },
  {
    country: "Italy",
    description: "Home to centuries of winemaking tradition",
    icon: "/icons/italy.svg",
  },
  {
    country: "Spain",
    description: "Rich heritage of wines and spirits",
    icon: "/icons/spain.svg",
  },
  {
    country: "Scotland",
    description: "Legendary whisky craftsmanship",
    icon: "/icons/scotland.svg",
  },
  {
    country: "Sri Lanka",
    description: "Strategic gateway to Asian markets",
    icon: "/icons/sri-lanka.svg",
  },
];

export default function GlobalPresence() {
  return (
    <section id="global" className="bg-[#0a0a0a] py-24 border-t border-[#C9A962]/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center">
          <h2 className="font-[family-name:var(--font-cormorant)] text-3xl font-bold text-white sm:text-4xl">
            Global <span className="text-[#C9A962]">Presence</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl font-[family-name:var(--font-montserrat)] text-lg text-gray-400">
            Connecting the world&apos;s finest producers with discerning markets across continents
          </p>
        </div>

        {/* Locations Grid */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {locations.map((location, index) => (
            <div
              key={index}
              className="group rounded-xl bg-[#1a1a1a] p-6 border border-[#C9A962]/10 transition-all hover:border-[#C9A962]/30"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 relative h-12 w-12">
                  <div className="absolute inset-0 bg-[#C9A962] rounded transition-opacity duration-300 opacity-0 group-hover:opacity-100" style={{ mask: `url(${location.icon}) center/contain no-repeat`, WebkitMask: `url(${location.icon}) center/contain no-repeat` }} />
                  <Image
                    src={location.icon}
                    alt={location.country}
                    width={48}
                    height={48}
                    className="h-12 w-12 invert opacity-70 transition-opacity duration-300 group-hover:opacity-0"
                  />
                </div>
                <div>
                  <h3 className="font-[family-name:var(--font-cormorant)] text-lg font-semibold text-white">
                    {location.country}
                  </h3>
                  <p className="mt-1 font-[family-name:var(--font-montserrat)] text-sm text-gray-400">
                    {location.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-16 grid gap-8 border-t border-[#C9A962]/10 pt-16 sm:grid-cols-2 lg:grid-cols-4">
          <div className="text-center">
            <p className="font-[family-name:var(--font-cormorant)] text-4xl font-bold text-[#C9A962]">
              6+
            </p>
            <p className="mt-2 font-[family-name:var(--font-montserrat)] text-gray-400">
              Countries
            </p>
          </div>
          <div className="text-center">
            <p className="font-[family-name:var(--font-cormorant)] text-4xl font-bold text-[#C9A962]">
              100+
            </p>
            <p className="mt-2 font-[family-name:var(--font-montserrat)] text-gray-400">
              Partner Producers
            </p>
          </div>
          <div className="text-center">
            <p className="font-[family-name:var(--font-cormorant)] text-4xl font-bold text-[#C9A962]">
              1000+
            </p>
            <p className="mt-2 font-[family-name:var(--font-montserrat)] text-gray-400">
              Products Distributed
            </p>
          </div>
          <div className="text-center">
            <p className="font-[family-name:var(--font-cormorant)] text-4xl font-bold text-[#C9A962]">
              24/7
            </p>
            <p className="mt-2 font-[family-name:var(--font-montserrat)] text-gray-400">
              Global Support
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
