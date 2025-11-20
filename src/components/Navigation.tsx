import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import logo from "/Logo.png";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeSection, setActiveSection] = useState("hero");
  const [hoverStyle, setHoverStyle] = useState({ left: 0, width: 0 });
  const [activeStyle, setActiveStyle] = useState({ left: 0, width: 0 });
  const navRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isScrollingRef = useRef(false);

  const navLinks = [
    { label: "Home", id: "hero" },
    { label: "Portfolio", id: "portfolio" },
    { label: "Packages", id: "packages" },
    { label: "About", id: "about" },
    { label: "Visit Studio", id: "studio" },
    { label: "Contact", id: "contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Intersection Observer with improved settings
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-15% 0px -55% 0px",
      threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      if (isScrollingRef.current) return;

      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.1) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    const sections = navLinks
      .map((link) => document.getElementById(link.id))
      .filter(Boolean);
    sections.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  // Calculate pill position relative to container
  const calculatePillPosition = (element: HTMLButtonElement) => {
    if (!element || !containerRef.current) return { left: 0, width: 0 };

    const leftWithinContainer = element.offsetLeft;
    const centerOffset = leftWithinContainer + element.offsetWidth / 2;

    return {
      left: centerOffset,
      width: element.offsetWidth,
    };
  };

  // Update active pill position with smooth animation
  useEffect(() => {
    const updateActivePillPosition = () => {
      const activeIndex = navLinks.findIndex((link) => link.id === activeSection);
      if (activeIndex !== -1 && navRefs.current[activeIndex]) {
        const element = navRefs.current[activeIndex];
        if (element) {
          const position = calculatePillPosition(element);
          setActiveStyle(position);
        }
      }
    };

    requestAnimationFrame(updateActivePillPosition);
  }, [activeSection]);

  // Enhanced smooth scroll function
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      isScrollingRef.current = true;
      setActiveSection(id);

      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      const startPosition = window.pageYOffset;
      const distance = offsetPosition - startPosition;
      const duration = 800;
      let start: number | null = null;

      const easeInOutCubic = (t: number): number => {
        return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
      };

      const animation = (currentTime: number) => {
        if (start === null) start = currentTime;
        const timeElapsed = currentTime - start;
        const progress = Math.min(timeElapsed / duration, 1);
        const ease = easeInOutCubic(progress);

        window.scrollTo(0, startPosition + distance * ease);

        if (timeElapsed < duration) {
          requestAnimationFrame(animation);
        } else {
          isScrollingRef.current = false;
        }
      };

      requestAnimationFrame(animation);
      setIsMobileMenuOpen(false);
    }
  };

  const handleMouseEnter = (index: number) => {
    const element = navRefs.current[index];
    if (element) {
      setHoveredIndex(index);
      const position = calculatePillPosition(element);
      setHoverStyle(position);
    }
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  return (
    <>
      {/* Logo - Scrolls with page - Visible on all devices */}
      <div className="absolute top-0 left-0 right-0 z-40">
        <div className="container mx-auto px-4 py-2">
          <button
            onClick={() => scrollToSection("hero")}
            className="flex items-center gap-2 transition-transform duration-300 ease-out hover:scale-105"
            aria-label="the weddiing cult home"
          >
            <img
              src={logo}
              alt="the weddiing cult"
              className="h-20 md:h-28 w-auto object-contain drop-shadow-2xl scale-150"
            />
          </button>
        </div>
      </div>

      {/* Navigation - Hidden on mobile, visible on tablet and above */}
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out",
          "hidden md:flex items-center justify-center",
          "pointer-events-none"
        )}
      >
        <div
          ref={containerRef}
          className={cn(
            "mt-4 flex items-center gap-2 relative pointer-events-auto",
            "bg-background/90 backdrop-blur-md rounded-full",
            "px-3 py-3 border border-secondary/20",
            "transition-all duration-500 ease-out",
            isScrolled ? "shadow-2xl scale-[0.98]" : "shadow-lg"
          )}
          onMouseLeave={handleMouseLeave}
        >
          {/* Active Section Pill */}
          <div
            className="absolute bg-gradient-to-r from-secondary/35 to-secondary/25 rounded-full z-0"
            style={{
              left: `${activeStyle.left}px`,
              width: `${activeStyle.width}px`,
              transform: "translateX(-50%)",
              top: "12px",
              height: "calc(100% - 24px)",
              transition: "all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
          />

          {/* Hover Shadow Pill */}
          <div
            className={cn(
              "absolute bg-secondary/10 rounded-full z-0",
              hoveredIndex === null && "opacity-0"
            )}
            style={{
              left: `${hoverStyle.left}px`,
              width: `${hoverStyle.width}px`,
              transform: "translateX(-50%)",
              top: "12px",
              height: "calc(100% - 24px)",
              transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          />

          {/* Navigation Links */}
          {navLinks.map((link, index) => (
            <button
              key={link.id}
              ref={(el) => (navRefs.current[index] = el)}
              onClick={() => scrollToSection(link.id)}
              onMouseEnter={() => handleMouseEnter(index)}
              className={cn(
                "relative z-10 text-sm font-medium px-3 md:px-4 py-2 rounded-full",
                "transition-all duration-300 ease-out",
                "flex items-center justify-center",
                activeSection === link.id
                  ? "text-secondary font-semibold scale-105"
                  : "text-foreground hover:text-secondary hover:scale-105"
              )}
            >
              {link.label}
            </button>
          ))}

          {/* Enquire Button */}
          <Button
            onClick={() => scrollToSection("contact")}
            className="relative z-10 bg-primary text-primary-foreground hover:bg-secondary hover:text-foreground border border-transparent hover:border-secondary transition-all duration-300 ease-out rounded-full px-4 md:px-6 py-2 ml-2 hover:scale-105 hover:shadow-lg text-sm"
          >
            Enquire
          </Button>
        </div>
      </nav>

      {/* Mobile Menu Toggle - Only visible on mobile */}
      <button
        className="md:hidden text-foreground z-[999] fixed top-6 right-6 transition-transform duration-300 ease-out hover:scale-110"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu Overlay - Only on mobile */}
      <div
        className={cn(
          "fixed inset-0 z-50 bg-background md:hidden transition-all duration-500 ease-out",
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8 px-4">
          {navLinks.map((link, index) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className={cn(
                "text-2xl font-heading font-medium transition-all duration-300 ease-out",
                "hover:scale-110",
                activeSection === link.id
                  ? "text-secondary font-semibold scale-110"
                  : "text-foreground hover:text-secondary"
              )}
              style={{
                transitionDelay: isMobileMenuOpen ? `${index * 50}ms` : "0ms",
              }}
            >
              {link.label}
            </button>
          ))}
          <Button
            onClick={() => scrollToSection("contact")}
            className="bg-primary text-primary-foreground hover:bg-secondary hover:text-foreground border border-transparent hover:border-secondary transition-all duration-300 ease-out rounded-full px-8 py-6 text-lg hover:scale-110 hover:shadow-xl"
          >
            Enquire
          </Button>
        </div>
      </div>
    </>
  );
};

export default Navigation;
