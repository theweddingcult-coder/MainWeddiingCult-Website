import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      setIsMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { label: "Portfolio", id: "portfolio" },
    { label: "Packages", id: "packages" },
    { label: "About", id: "about" },
    { label: "Visit Studio", id: "studio" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-background shadow-md border-b border-secondary/20"
            : "bg-transparent"
        )}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <button
              onClick={() => scrollToSection("hero")}
              className="flex items-center gap-2"
              aria-label="the wedding cult home"
            >
              <img src={logo} alt="the wedding cult" className="h-20 md:h-20 w-auto" />
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="text-sm font-medium text-foreground hover:text-secondary transition-colors relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-secondary transition-all duration-300 group-hover:w-full" />
                </button>
              ))}
              <Button
                onClick={() => scrollToSection("contact")}
                className="bg-primary text-primary-foreground hover:bg-secondary hover:text-foreground border border-transparent hover:border-secondary transition-all duration-300 rounded-full px-6"
              >
                Enquire
              </Button>
            </div>

            
          </div>
        </div>
      </nav>
      {/* Mobile Menu Toggle */}
      <button
        className="md:hidden text-foreground z-[999] fixed top-4 right-6"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-background md:hidden">
          <div className="flex flex-col items-center justify-center h-full gap-8 px-4">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-2xl font-heading font-medium text-foreground hover:text-secondary transition-colors"
              >
                {link.label}
              </button>
            ))}
            <Button
              onClick={() => scrollToSection("contact")}
              className="bg-primary text-primary-foreground hover:bg-secondary hover:text-foreground border border-transparent hover:border-secondary transition-all duration-300 rounded-full px-8 py-6 text-lg"
            >
              Enquire
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;
