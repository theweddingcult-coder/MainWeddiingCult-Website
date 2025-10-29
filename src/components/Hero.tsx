import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import heroImage from "@/assets/hero-wedding.jpg";

const Hero = () => {
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
      {/* Background Image with Parallax Effect */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-105 transition-transform duration-700"
        style={{
          backgroundImage: `url(${heroImage})`,
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/60 via-primary/40 to-primary/70" />

      {/* Content */}
      <div className="relative h-full flex items-center justify-center text-center px-4">
        <div className="max-w-4xl animate-fade-in">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-primary-foreground mb-6 leading-tight">
            Indian Wedding Stories,
            <br />
            <span className="text-gradient-gold">Told With Heart</span>
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/90 mb-10 max-w-2xl mx-auto font-light">
            Candid moments, timeless portraits, and cinematic films across weddings, haldi, mehndi, pre-weddings, and baby showers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
