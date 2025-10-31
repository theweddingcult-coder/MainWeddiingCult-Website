import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import React from "react";

type FilterType = "All" | "Wedding" | "Haldi" | "Mehndi" | "Pre-Wedding" | "Baby shoot" | "Shagan";

interface PortfolioItem {
  id: number;
  image: string;
  category: FilterType;
}

// Update these image URLs as needed; external links will render directly
const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    image:
      "https://ncfewnymjjkloxvtlypy.supabase.co/storage/v1/object/public/Images/Wedding/39.jpg",
    category: "Wedding",
  },
  {
    id: 2,
    image:
      "https://ncfewnymjjkloxvtlypy.supabase.co/storage/v1/object/public/Images/Wedding/bbb%20(473).JPG",
    category: "Wedding",
  },
  {
    id: 3,
    image:
      "https://ncfewnymjjkloxvtlypy.supabase.co/storage/v1/object/public/Images/Wedding/SPV60738.JPG",
    category: "Wedding",
  },
  {
    id: 4,
    image:
      "https://ncfewnymjjkloxvtlypy.supabase.co/storage/v1/object/public/Images/Baby%20Shoot/SPV%20(124).JPG",
    category: "Baby shoot",
  },
  {
    id: 5,
    image:
      "https://ncfewnymjjkloxvtlypy.supabase.co/storage/v1/object/public/Images/Haldi/abc%20(1754).JPG",
    category: "Haldi",
  },
  {
    id: 6,
    image:
      "https://ncfewnymjjkloxvtlypy.supabase.co/storage/v1/object/public/Images/Parth%20and%20Khushi/011A5174.JPG",
    category: "Pre-Wedding",
  },
  {
    id: 7,
    image:
      "https://ncfewnymjjkloxvtlypy.supabase.co/storage/v1/object/public/Images/Mehendi/SPV65729.JPG",
    category: "Mehndi",
  },
  {
    id: 8,
    image:
      "https://ncfewnymjjkloxvtlypy.supabase.co/storage/v1/object/public/Images/Haldi/35.jpg",
    category: "Haldi",
  },
  {
    id: 9,
    image:
      "https://ncfewnymjjkloxvtlypy.supabase.co/storage/v1/object/public/Images/Baby%20Shoot/SPV%20(662).JPG",
    category: "Baby shoot",
  },
  {
    id: 10,
    image:
      "https://ncfewnymjjkloxvtlypy.supabase.co/storage/v1/object/public/Images/Wedding/SPV60832.JPG",
    category: "Wedding",
  },
  {
    id: 11,
    image:
      "https://ncfewnymjjkloxvtlypy.supabase.co/storage/v1/object/public/Images/Mehendi/abc%20(60).JPG",
    category: "Pre-Wedding",
  },
  {
    id: 12,
    image:
      "https://ncfewnymjjkloxvtlypy.supabase.co/storage/v1/object/public/Images/Mehendi/SPV65583.JPG",
    category: "Mehndi",
  },
  {
    id: 13,
    image:
      "https://ncfewnymjjkloxvtlypy.supabase.co/storage/v1/object/public/Images/Shagan/10%20-%20Copy%20(2).jpg",
    category: "Shagan",
  },
  {
    id: 14,
    image:
      "https://ncfewnymjjkloxvtlypy.supabase.co/storage/v1/object/public/Images/Shagan/18%20-%20Copy%20(2).jpg",
    category: "Wedding",
  },
  {
    id: 15,
    image:
      "https://ncfewnymjjkloxvtlypy.supabase.co/storage/v1/object/public/Images/PreWedding/_11A3289.JPG",
    category: "Pre-Wedding",
  },
  {
    id: 16,
    image:
      "https://ncfewnymjjkloxvtlypy.supabase.co/storage/v1/object/public/Images/Baby%20Shoot/SPV%20(513).JPG",
    category: "Baby shoot",
  },
  {
    id: 17,
    image:
      "https://ncfewnymjjkloxvtlypy.supabase.co/storage/v1/object/public/Images/Baby%20Shoot/SPV%20(87).JPG",
    category: "Baby shoot",
  },
  {
    id: 18,
    image:
      "https://ncfewnymjjkloxvtlypy.supabase.co/storage/v1/object/public/Images/Parth%20and%20Khushi/SPV61179%20copy.jpg",
    category: "Pre-Wedding",
  },
  {
    id: 19,
    image:
      "https://ncfewnymjjkloxvtlypy.supabase.co/storage/v1/object/public/Images/Baby%20Shoot/SPV%20(134).JPG",
    category: "Baby shoot",
  },
  {
    id: 20,
    image:
      "https://ncfewnymjjkloxvtlypy.supabase.co/storage/v1/object/public/Images/Haldi/20%20-%20Copy%20(2).jpg",
    category: "Haldi",
  },
  {
    id: 21,
    image:
      "https://ncfewnymjjkloxvtlypy.supabase.co/storage/v1/object/public/Images/PreWedding/_11A3133.JPG",
    category: "Pre-Wedding",
  },
  {
    id: 22,
    image:
      "https://ncfewnymjjkloxvtlypy.supabase.co/storage/v1/object/public/Images/Mehendi/abc%20(53).JPG",
    category: "Mehndi",
  },
  {
    id: 23,
    image:
      "https://ncfewnymjjkloxvtlypy.supabase.co/storage/v1/object/public/Images/Wedding/aaa%20(74).JPG",
    category: "Wedding",
  },
  {
    id: 24,
    image:
      "https://ncfewnymjjkloxvtlypy.supabase.co/storage/v1/object/public/Images/PreWedding/_11A3084.JPG",
    category: "Pre-Wedding",
  },
  {
    id: 25,
    image:
      "https://ncfewnymjjkloxvtlypy.supabase.co/storage/v1/object/public/Images/Shagan/_11A0987.JPG",
    category: "Shagan",
  },
  {
    id: 26,
    image:
      "https://ncfewnymjjkloxvtlypy.supabase.co/storage/v1/object/public/Images/PreWedding/_11A2832.JPG",
    category: "Pre-Wedding",
  },
  {
    id: 27,
    image:
      "https://ncfewnymjjkloxvtlypy.supabase.co/storage/v1/object/public/Images/Baby%20Shoot/SPV%20(308).JPG",
    category: "Baby shoot",
  },
  {
    id: 28,
    image:
      "https://ncfewnymjjkloxvtlypy.supabase.co/storage/v1/object/public/Images/Haldi/24%20-%20Copy%20(2).jpg",
    category: "Haldi",
  },
  {
    id: 29,
    image:
      "https://ncfewnymjjkloxvtlypy.supabase.co/storage/v1/object/public/Images/PreWedding/_11A3270.JPG",
    category: "Pre-Wedding",
  },
  {
    id: 30,
    image:
      "https://ncfewnymjjkloxvtlypy.supabase.co/storage/v1/object/public/Images/Mehendi/abc%20(54).JPG",
    category: "Mehndi",
  },
  {
    id: 31,
    image:
      "https://ncfewnymjjkloxvtlypy.supabase.co/storage/v1/object/public/Images/Wedding/bbb%20(455).JPG",
    category: "Wedding",
  },
  {
    id: 32,
    image:
      "https://ncfewnymjjkloxvtlypy.supabase.co/storage/v1/object/public/Images/PreWedding/_11A3299.JPG",
    category: "Pre-Wedding",
  },
  {
    id: 33,
    image:
      "https://ncfewnymjjkloxvtlypy.supabase.co/storage/v1/object/public/Images/Shagan/_11A0997.JPG",
    category: "Shagan",
  },
  {
    id: 34,
    image:
      "https://ncfewnymjjkloxvtlypy.supabase.co/storage/v1/object/public/Images/PreWedding/_11A3536.JPG",
    category: "Pre-Wedding",
  },
  {
    id: 35,
    image:
      "https://ncfewnymjjkloxvtlypy.supabase.co/storage/v1/object/public/Images/Baby%20Shoot/SPV%20(507).JPG",
    category: "Baby shoot",
  },
  {
    id: 36,
    image:
      "https://ncfewnymjjkloxvtlypy.supabase.co/storage/v1/object/public/Images/Haldi/SPV60023.JPG",
    category: "Haldi",
  },
  {
    id: 37,
    image:
      "https://ncfewnymjjkloxvtlypy.supabase.co/storage/v1/object/public/Images/PreWedding/SPV67543.JPG",
    category: "Pre-Wedding",
  },
  {
    id: 38,
    image:
      "https://ncfewnymjjkloxvtlypy.supabase.co/storage/v1/object/public/Images/Mehendi/SPV65736.JPG",
    category: "Mehndi",
  },
  {
    id: 39,
    image:
      "https://ncfewnymjjkloxvtlypy.supabase.co/storage/v1/object/public/Images/Wedding/bbb%20(473).JPG",
    category: "Wedding",
  },
  {
    id: 40,
    image:
      "https://ncfewnymjjkloxvtlypy.supabase.co/storage/v1/object/public/Images/Parth%20and%20Khushi/011A5185.JPG",
    category: "Pre-Wedding",
  },
  {
    id: 41,
    image:
      "https://ncfewnymjjkloxvtlypy.supabase.co/storage/v1/object/public/Images/Shagan/_11A1003.JPG",
    category: "Shagan",
  },
  {
    id: 42,
    image:
      "https://ncfewnymjjkloxvtlypy.supabase.co/storage/v1/object/public/Images/Parth%20and%20Khushi/011A5233.JPG",
    category: "Pre-Wedding",
  },
  {
    id: 43,
    image:
      "https://ncfewnymjjkloxvtlypy.supabase.co/storage/v1/object/public/Images/Baby%20Shoot/SPV%20(509).JPG",
    category: "Baby shoot",
  },
  {
    id: 44,
    image:
      "https://ncfewnymjjkloxvtlypy.supabase.co/storage/v1/object/public/Images/Haldi/SPV69752.JPG",
    category: "Haldi",
  },
  {
    id: 45,
    image:
      "https://ncfewnymjjkloxvtlypy.supabase.co/storage/v1/object/public/Images/Parth%20and%20Khushi/011A5280.JPG",
    category: "Pre-Wedding",
  },
  {
    id: 46,
    image:
      "https://ncfewnymjjkloxvtlypy.supabase.co/storage/v1/object/public/Images/Mehendi/abc%20(58).JPG",
    category: "Mehndi",
  },
  {
    id: 47,
    image:
      "https://ncfewnymjjkloxvtlypy.supabase.co/storage/v1/object/public/Images/Wedding/SPV60832.JPG",
    category: "Wedding",
  },
  {
    id: 48,
    image:
      "https://ncfewnymjjkloxvtlypy.supabase.co/storage/v1/object/public/Images/Parth%20and%20Khushi/011A5287.JPG",
    category: "Pre-Wedding",
  },
  {
    id: 49,
    image:
      "https://ncfewnymjjkloxvtlypy.supabase.co/storage/v1/object/public/Images/Shagan/09%20-%20Copy%20(2).jpg",
    category: "Shagan",
  },
  {
    id: 50,
    image:
      "https://ncfewnymjjkloxvtlypy.supabase.co/storage/v1/object/public/Images/Parth%20and%20Khushi/011A5335.JPG",
    category: "Pre-Wedding",
  },
  {
    id: 51,
    image:
      "https://ncfewnymjjkloxvtlypy.supabase.co/storage/v1/object/public/Images/Baby%20Shoot/SPV%20(512).JPG",
    category: "Baby shoot",
  },
  {
    id: 52,
    image:
      "https://ncfewnymjjkloxvtlypy.supabase.co/storage/v1/object/public/Images/Haldi/SPV66690.JPG",
    category: "Haldi",
  },
  {
    id: 53,
    image:
      "https://ncfewnymjjkloxvtlypy.supabase.co/storage/v1/object/public/Images/Parth%20and%20Khushi/011A5346.JPG",
    category: "Pre-Wedding",
  },
  {
    id: 54,
    image:
      "https://ncfewnymjjkloxvtlypy.supabase.co/storage/v1/object/public/Images/Mehendi/abc%20(73).JPG",
    category: "Mehndi",
  },
  {
    id: 55,
    image:
      "https://ncfewnymjjkloxvtlypy.supabase.co/storage/v1/object/public/Images/Wedding/SPV69626.JPG",
    category: "Wedding",
  },
  {
    id: 56,
    image:
      "https://ncfewnymjjkloxvtlypy.supabase.co/storage/v1/object/public/Images/Parth%20and%20Khushi/011A5402%20copy.jpg",
    category: "Pre-Wedding",
  },
  {
    id: 57,
    image:
      "https://ncfewnymjjkloxvtlypy.supabase.co/storage/v1/object/public/Images/Shagan/14%20-%20Copy.jpg",
    category: "Shagan",
  },
  {
    id: 58,
    image:
      "https://ncfewnymjjkloxvtlypy.supabase.co/storage/v1/object/public/Images/Parth%20and%20Khushi/SPV60969.JPG",
    category: "Pre-Wedding",
  },
  {
    id: 59,
    image:
      "https://ncfewnymjjkloxvtlypy.supabase.co/storage/v1/object/public/Images/Wedding/SPV68869.JPG",
    category: "Wedding",
  },
  {
    id: 60,
    image:
      "https://ncfewnymjjkloxvtlypy.supabase.co/storage/v1/object/public/Images/Parth%20and%20Khushi/SPV61001.JPG",
    category: "Pre-Wedding",
  },
  {
    id: 61,
    image:
      "https://ncfewnymjjkloxvtlypy.supabase.co/storage/v1/object/public/Images/Wedding/bbb%20(904).JPG",
    category: "Wedding",
  },
  {
    id: 62,
    image:
      "https://ncfewnymjjkloxvtlypy.supabase.co/storage/v1/object/public/Images/Shagan/18%20-%20Copy%20(2).jpg",
    category: "Shagan",
  },
  {
    id: 63,
    image:
      "https://ncfewnymjjkloxvtlypy.supabase.co/storage/v1/object/public/Images/Parth%20and%20Khushi/SPV61024.JPG",
    category: "Pre-Wedding",
  },
]

const IMAGES_PER_PAGE = 9;

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState<FilterType>("All");
  const [visibleBatches, setVisibleBatches] = useState(1);
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

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

  React.useEffect(() => {
    if (!selectedItem) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedItem(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedItem]);

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
              onClick={() => setSelectedItem(item)}
            >
              <img
                src={item.image}
                alt={`${item.category} showcase`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <Badge className="bg-secondary text-foreground mb-2">
                    {item.category}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedItem && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
            onClick={() => setSelectedItem(null)}
          >
            <div
              className="relative flex max-h-[90vh] max-w-[95vw] flex-col items-center gap-4"
              onClick={(event) => event.stopPropagation()}
            >
              <img
                src={selectedItem.image}
                alt={`${selectedItem.category} showcase`}
                className="max-h-[80vh] max-w-[90vw] object-contain"
              />
              <Badge className="bg-secondary text-foreground">
                {selectedItem.category}
              </Badge>
              <Button
                variant="outline"
                className="absolute -top-3 -right-3 rounded-full border-white/70 bg-white/10 text-white hover:bg-white/30"
                onClick={() => setSelectedItem(null)}
              >
                Close
              </Button>
            </div>
          </div>
        )}
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
