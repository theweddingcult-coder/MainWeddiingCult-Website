import { useState } from "react";
import { cn } from "@/lib/utils";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Portfolio from "@/components/Portfolio";
import { pickPortfolioImageUrls, portfolioItems } from "@/data/portfolioItems";
import Services from "@/components/Services";
import Packages from "@/components/Packages";
import PackageDetails from "@/components/PackageDetails";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import OfficeMap from "@/components/OfficeMap";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import WelcomeScreen from "@/components/WelcomeScreen";
import { useImagePreloader } from "@/hooks/useImagePreloader";
import logo from "/public/Logo.png";

const WELCOME_SLIDESHOW_IMAGES = pickPortfolioImageUrls(8, "cdn");

const PORTFOLIO_IMAGE_URLS = portfolioItems.map((item) => item.image);
const PRELOAD_IMAGE_URLS = [...WELCOME_SLIDESHOW_IMAGES, ...PORTFOLIO_IMAGE_URLS];

const Index = () => {
  const [showWelcome, setShowWelcome] = useState(true);
  const [welcomeComplete, setWelcomeComplete] = useState(false);

  useImagePreloader(PRELOAD_IMAGE_URLS, { priorityCount: 12, throttleMs: 90 });

  const handleWelcomeFinish = () => {
    setWelcomeComplete(true);
    setShowWelcome(false);
  };

  return (
    <>
      {showWelcome && (
        <WelcomeScreen
          logoSrc={logo}
          logoAlt="Photographer Office signature mark"
          slideshowImages={WELCOME_SLIDESHOW_IMAGES}
          onFinish={handleWelcomeFinish}
        />
      )}
      <main
        aria-hidden={showWelcome}
        className={cn(
          "min-h-screen transition-opacity duration-500 ease-[cubic-bezier(0.22,0.9,0.34,1)]",
          welcomeComplete ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      >
        <Navigation />
        <Hero />
        <Portfolio />
        <Services />
        <Packages />
        <PackageDetails />
        <About />
        <Testimonials />
        <OfficeMap />
        <ContactForm />
        <Footer />
      </main>
    </>
  );
};

export default Index;
