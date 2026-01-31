import Image from "next/image";
import Header from "../components/Header";
import CareersForm from "../components/CareersForm";
import Footer from "../components/Footer";

export const metadata = {
  title: "Careers | Truvino",
  description: "Join the Truvino team. Explore career opportunities in premium wine and spirits distribution.",
};

const benefits = [
  {
    title: "Global Opportunities",
    description: "Work with teams across California, Europe, and Asia in a truly international environment.",
    icon: (
      <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Industry Expertise",
    description: "Learn from experts in premium wine and spirits distribution with decades of experience.",
    icon: (
      <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
  {
    title: "Growth & Development",
    description: "Continuous learning opportunities and clear paths for career advancement.",
    icon: (
      <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
  },
  {
    title: "Competitive Benefits",
    description: "Comprehensive health coverage, retirement plans, and industry-leading compensation.",
    icon: (
      <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

const values = [
  {
    title: "Excellence",
    description: "We pursue the highest standards in everything we do, from product selection to customer service.",
  },
  {
    title: "Integrity",
    description: "Honesty and transparency guide our relationships with partners, clients, and colleagues.",
  },
  {
    title: "Passion",
    description: "We share a genuine love for fine wines and spirits that drives our dedication to quality.",
  },
  {
    title: "Innovation",
    description: "We embrace new ideas and technologies to stay ahead in a dynamic global market.",
  },
];

export default function CareersPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative h-[70vh] min-h-[600px] w-full overflow-hidden pt-32">
          <Image
            src="/hero-slideshow/product8.jpeg"
            alt="Join Truvino"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
              <h1 className="font-[family-name:var(--font-playfair)] text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
                Join Our <span className="text-[#C9A962]">Team</span>
              </h1>
              <p className="mx-auto mt-6 max-w-2xl font-[family-name:var(--font-montserrat)] text-lg text-gray-300 sm:text-xl">
                Build your career with a global leader in premium wine and spirits distribution
              </p>
              <div className="mt-10">
                <a
                  href="#apply"
                  className="rounded-full bg-[#C9A962] px-8 py-3 font-[family-name:var(--font-montserrat)] text-sm font-medium text-black transition-all hover:bg-[#D4BA7A] hover:shadow-lg hover:shadow-[#C9A962]/20"
                >
                  Apply Now
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Why Join Us Section */}
        <section className="bg-[#0a0a0a] py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-white sm:text-4xl">
                Why <span className="text-[#C9A962]">Truvino</span>?
              </h2>
              <p className="mx-auto mt-4 max-w-2xl font-[family-name:var(--font-montserrat)] text-lg text-gray-400">
                Join a passionate team dedicated to bringing the world&apos;s finest wines and spirits to discerning markets
              </p>
            </div>

            <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="group rounded-2xl bg-[#1a1a1a] p-8 border border-[#C9A962]/10 transition-all hover:border-[#C9A962]/30 hover:shadow-lg hover:shadow-[#C9A962]/5"
                >
                  <div className="mb-6 text-[#C9A962] transition-transform group-hover:scale-110">
                    {benefit.icon}
                  </div>
                  <h3 className="font-[family-name:var(--font-playfair)] text-xl font-semibold text-white">
                    {benefit.title}
                  </h3>
                  <p className="mt-3 font-[family-name:var(--font-montserrat)] text-sm text-gray-400">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Values Section */}
        <section className="bg-[#111111] py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
              <div>
                <h2 className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-white sm:text-4xl">
                  Our <span className="text-[#C9A962]">Values</span>
                </h2>
                <p className="mt-4 font-[family-name:var(--font-montserrat)] text-lg text-gray-400">
                  At Truvino, our values shape every interaction and decision. They define who we are and guide how we work together.
                </p>
                <div className="mt-10 space-y-8">
                  {values.map((value, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex-shrink-0 w-1 bg-[#C9A962] rounded-full" />
                      <div>
                        <h3 className="font-[family-name:var(--font-playfair)] text-xl font-semibold text-white">
                          {value.title}
                        </h3>
                        <p className="mt-2 font-[family-name:var(--font-montserrat)] text-sm text-gray-400">
                          {value.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative h-[500px] rounded-2xl overflow-hidden border border-[#C9A962]/10">
                <Image
                  src="/hero-slideshow/product5.jpeg"
                  alt="Truvino Team"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
            </div>
          </div>
        </section>

        {/* Application Form Section */}
        <section id="apply" className="bg-[#0a0a0a] py-24">
          <CareersForm />
        </section>
      </main>
      <Footer />
    </>
  );
}
