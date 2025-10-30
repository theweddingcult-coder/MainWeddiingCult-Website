import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import React from "react";

type FilterType = "All" | "Wedding" | "Haldi" | "Mehndi" | "Pre-Wedding" | "Baby shoot" | "Shagan";

interface PortfolioItem {
  id: number;
  image: string;
  title: string;
  location: string;
  category: FilterType;
}

// Update these image URLs as needed; external links will render directly
const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    image:
      "https://ncfewnymjjkloxvtlypy.supabase.co/storage/v1/object/public/Images/Wedding/39.jpg",
    title: "Bride entry",
    location: "Jaipur",
    category: "Wedding",
  },
  {
    id: 2,
    image:
      "https://ncfewnymjjkloxvtlypy.supabase.co/storage/v1/object/public/Images/Wedding/bbb%20(473).JPG",
    title: "Varmala Ceremony",
    location: "Mumbai",
    category: "Wedding",
  },
  {
    id: 3,
    image:
      "https://ncfewnymjjkloxvtlypy.supabase.co/storage/v1/object/public/Images/Wedding/SPV60738.JPG",
    title: "Bride and Groom",
    location: "Delhi",
    category: "Wedding",
  },
  {
    id: 4,
    image:
      "https://ncfewnymjjkloxvtlypy.supabase.co/storage/v1/object/public/Images/Baby%20Shoot/SPV%20(124).JPG",
    title: "First Birthday",
    location: "Delhi",
    category: "Baby shoot",
  },
  {
    id: 5,
    image:
      "https://ncfewnymjjkloxvtlypy.supabase.co/storage/v1/object/public/Images/Haldi/abc%20(1754).JPG",
    title: "Haldi Ceremony",
    location: "Bengaluru",
    category: "Haldi",
  },
  {
    id: 6,
    image:
      "https://ncfewnymjjkloxvtlypy.supabase.co/storage/v1/object/public/Images/Parth%20and%20Khushi/011A5174.JPG",
    title: "Pre-Wedding Shoot",
    location: "Delhi",
    category: "Pre-Wedding",
  },
  {
    id: 7,
    image:
      "https://ncfewnymjjkloxvtlypy.supabase.co/storage/v1/object/public/Images/Mehendi/SPV65729.JPG",
    title: "Mehndi Ceremony",
    location: "Delhi",
    category: "Mehndi",
  },
  {
    id: 8,
    image:
      "https://ncfewnymjjkloxvtlypy.supabase.co/storage/v1/object/public/Images/Haldi/35.jpg",
    title: "Haldi moments",
    location: "Delhi",
    category: "Haldi",
  },
  {
    id: 9,
    image:
      "https://ncfewnymjjkloxvtlypy.supabase.co/storage/v1/object/public/Images/Baby%20Shoot/SPV%20(662).JPG",
    title: "Pretty little baby",
    location: "Delhi",
    category: "Baby shoot",
  },
  {
    id: 10,
    image:
      "https://ncfewnymjjkloxvtlypy.supabase.co/storage/v1/object/public/Images/Wedding/SPV60832.JPG",
    title: "Bride Entry",
    location: "Mumbai",
    category: "Wedding",
  },
  {
    id: 11,
    image:
      "https://ncfewnymjjkloxvtlypy.supabase.co/storage/v1/object/public/Images/Mehendi/abc%20(60).JPG",
    title: "Pre-Wedding Shoot",
    location: "Delhi",
    category: "Pre-Wedding",
  },
  {
    id: 12,
    image:
      "https://ncfewnymjjkloxvtlypy.supabase.co/storage/v1/object/public/Images/Mehendi/SPV65583.JPG",
    title: "Mehndi Ceremony",
    location: "Dwarka",
    category: "Mehndi",
  },
  {
    id: 13,
    image:
      "https://ncfewnymjjkloxvtlypy.supabase.co/storage/v1/object/public/Images/Shagan/10%20-%20Copy%20(2).jpg",
    title: "Mehndi Ceremony",
    location: "Delhi",
    category: "Shagan",
  },
  {
    id: 14,
    image:
      "https://ncfewnymjjkloxvtlypy.supabase.co/storage/v1/object/public/Images/Shagan/18%20-%20Copy%20(2).jpg",
    title: "Wedding Shoot",
    location: "Dwarka",
    category: "Wedding",
  },
  {
    id: 15,
    image:
      "https://ncfewnymjjkloxvtlypy.supabase.co/storage/v1/object/public/Images/PreWedding/_11A3289.JPG",
    title: "Pre-Wedding Shoot",
    location: "Delhi",
    category: "Pre-Wedding",
  },
  {
    id: 16,
    image:
      "https://ncfewnymjjkloxvtlypy.supabase.co/storage/v1/object/public/Images/Baby%20Shoot/SPV%20(513).JPG",
    title: "Baby shoot",
    location: "Delhi",
    category: "Baby shoot",
  },
  {
    id: 17,
    image:
      "https://ncfewnymjjkloxvtlypy.supabase.co/storage/v1/object/public/Images/Baby%20Shoot/SPV%20(87).JPG",
    title: "Family Photoshoot",
    location: "Delhi",
    category: "Baby shoot",
  },
  {
    id: 18,
    image:
      "https://ncfewnymjjkloxvtlypy.supabase.co/storage/v1/object/public/Images/Parth%20and%20Khushi/SPV61179%20copy.jpg",
    title: "Romantic Couple",
    location: "Delhi",
    category: "Pre-Wedding",
  },
]

const IMAGES_PER_PAGE = 9;

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState<FilterType>("All");
  const [visibleBatches, setVisibleBatches] = useState(1);

  const filters: FilterType[] = [
    "All",
    "Wedding",
    "Haldi",
    "Mehndi",
    "Pre-Wedding",
    "Baby shoot",
    "Shagan",
  ];

  const filteredItems =
    activeFilter === "All"
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === activeFilter);
  
  // Reset batching when filter changes
  React.useEffect(() => {
    setVisibleBatches(1);
  }, [activeFilter]);

  const imagesToShow = filteredItems.slice(0, visibleBatches * IMAGES_PER_PAGE);
  const hasMore = imagesToShow.length < filteredItems.length;

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {imagesToShow.map((item) => (
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
        {/* View More Button */}
        {hasMore && (
          <div className="flex justify-center mb-12">
            <Button
              variant="outline"
              className="px-8 py-2 rounded-full border-secondary text-secondary hover:bg-secondary/20 transition-all"
              onClick={() => setVisibleBatches((v) => v + 1)}
            >
              View More
            </Button>
          </div>
        )}
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
