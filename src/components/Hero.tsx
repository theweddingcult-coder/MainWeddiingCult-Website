import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

// Use an array of hero image URLs
const heroImages = [
  "https://ncfewnymjjkloxvtlypy.supabase.co/storage/v1/object/public/Images/Wedding/39.jpg",
  "https://ncfewnymjjkloxvtlypy.supabase.co/storage/v1/object/public/Images/PreWedding/_11A3453.JPG",
  "https://ncfewnymjjkloxvtlypy.supabase.co/storage/v1/object/public/Images/Haldi/32.jpg",
  // Add more if desired
];

const CAROUSEL_INTERVAL = 4000; // ms

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Carousel auto-advance logic
  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, CAROUSEL_INTERVAL);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [currentIndex]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden grain-texture">
      {/* Carousel Images with blur overlay */}
      <div className="absolute inset-0 w-full h-full z-10">
        {heroImages.map((img, idx) => (
          <div
            key={img}
            className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-700 ${idx === currentIndex ? "opacity-100 scale-105 z-20" : "opacity-0 scale-105 z-10"}`}
            style={{ backgroundImage: `url(${img})` }}
          />
        ))}
        {/* Blur Overlay */}
        <div className="absolute inset-0 backdrop-blur-sm bg-black/20 z-30 pointer-events-none" />
      </div>

      {/* Content and Buttons - always stacked, always above dots */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-20 z-40 w-full flex flex-col items-center px-4 space-y-5">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-primary-foreground leading-tight mb-3">
            Soulful Wedding Stories
          </h1>
          <p className="md:text-2xl text-lg font-light text-primary-foreground max-w-2xl mx-auto mb-0">
            At The Wedding Cult, we turn your shaadi moments into everlasting memories.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center w-full max-w-2xl">
          <Button
            onClick={() => scrollToSection("portfolio")}
            size="lg"
            className="bg-secondary text-foreground hover:bg-secondary/90 border-2 border-secondary rounded-full px-8 py-6 text-lg font-medium shadow-gold hover-lift"
          >
            View Portfolio
          </Button>
          <Button
            onClick={() => scrollToSection("packages")}
            size="lg"
            variant="outline"
            className="bg-transparent text-primary-foreground border-2 border-primary-foreground hover:bg-primary-foreground hover:text-primary rounded-full px-8 py-6 text-lg font-medium hover-lift"
          >
            Check Packages
          </Button>
        </div>
      </div>

      {/* Carousel Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-30">
        {heroImages.map((_img, idx) => (
          <button
            key={idx}
            className={`w-3 h-3 rounded-full transition-all duration-300 border-2 border-secondary ${idx === currentIndex ? "bg-secondary" : "bg-secondary/40"}`}
            aria-label={`Go to slide ${idx + 1}`}
            onClick={() => setCurrentIndex(idx)}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={() => scrollToSection("portfolio")}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-primary-foreground hover:text-secondary transition-colors"
        aria-label="Scroll down"
      >
        <ChevronDown size={40} />
      </button>
    </section>
  );
};

export default Hero;
