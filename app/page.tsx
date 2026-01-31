import Header from "./components/Header";
import HeroSlideshow from "./components/HeroSlideshow";
import ServicesSection from "./components/ServicesSection";
import CTABanner from "./components/CTABanner";
import PortfolioPreview from "./components/PortfolioPreview";
import TestimonialSection from "./components/TestimonialSection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSlideshow />
        <ServicesSection />
        <CTABanner />
        <PortfolioPreview />
        <TestimonialSection />
        <CTABanner variant="large" />
      </main>
      <Footer />
    </>
  );
}
