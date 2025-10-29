import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import haldiImage from "@/assets/portfolio-haldi.jpg";
import mehndiImage from "@/assets/portfolio-mehndi.jpg";
import preweddingImage from "@/assets/portfolio-prewedding.jpg";
import babyshowerImage from "@/assets/portfolio-babyshower.jpg";
import weddingImage from "@/assets/portfolio-wedding-1.jpg";

type FilterType = "All" | "Wedding" | "Haldi" | "Mehndi" | "Pre-Wedding" | "Baby Shower";

interface PortfolioItem {
  id: number;
  image: string;
  title: string;
  location: string;
  category: FilterType;
}

const portfolioItems: PortfolioItem[] = [
  { id: 1, image: weddingImage, title: "Grand Pheras", location: "Jaipur", category: "Wedding" },
  { id: 2, image: haldiImage, title: "Haldi Joy", location: "Mumbai", category: "Haldi" },
  { id: 3, image: mehndiImage, title: "Mehndi Moments", location: "Delhi", category: "Mehndi" },
  { id: 4, image: preweddingImage, title: "Pre-Wedding by the Sea", location: "Goa", category: "Pre-Wedding" },
  { id: 5, image: babyshowerImage, title: "Baby Shower Bliss", location: "Bengaluru", category: "Baby Shower" },
];

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState<FilterType>("All");

  const filters: FilterType[] = ["All", "Wedding", "Haldi", "Mehndi", "Pre-Wedding", "Baby Shower"];

  const filteredItems = activeFilter === "All" 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeFilter);

  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <section id="portfolio" className="py-20 md:py-32 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-4">
            Our Portfolio
          </h2>
          <div className="w-24 h-1 bg-secondary mx-auto mb-8" />
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Capturing emotions, preserving memories, celebrating love
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {filters.map((filter) => (
            <Badge
              key={filter}
              variant={activeFilter === filter ? "default" : "outline"}
              className={`cursor-pointer px-6 py-2 text-sm font-medium rounded-full transition-all duration-300 hover-lift ${
                activeFilter === filter
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-transparent text-foreground border-muted hover:border-secondary hover:text-secondary"
              }`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </Badge>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group relative overflow-hidden rounded-xl shadow-soft hover:shadow-elevated transition-all duration-300 hover-lift cursor-pointer aspect-[4/5]"
            >
              <img
                src={item.image}
                alt={`${item.title} - ${item.location}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <Badge className="bg-secondary text-foreground mb-2">
                    {item.category}
                  </Badge>
                  <h3 className="text-2xl font-heading font-semibold text-primary-foreground mb-1">
                    {item.title}
                  </h3>
                  <p className="text-primary-foreground/90">{item.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-muted-foreground mb-6 text-lg">
            Want a film like this?
          </p>
          <Button
            onClick={scrollToContact}
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-secondary hover:text-foreground border border-transparent hover:border-secondary transition-all duration-300 rounded-full px-8 shadow-gold hover-lift"
          >
            Enquire Now
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
