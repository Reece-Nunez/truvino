import Header from "./components/Header";
import HeroSlideshow from "./components/HeroSlideshow";
import ServicesSection from "./components/ServicesSection";
import PortfolioPreview from "./components/PortfolioPreview";
import GlobalPresence from "./components/GlobalPresence";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSlideshow />
        <ServicesSection />
        <PortfolioPreview />
        <GlobalPresence />
      </main>
      <Footer />
    </>
  );
}
