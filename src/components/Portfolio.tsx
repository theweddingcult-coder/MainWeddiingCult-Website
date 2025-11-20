import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import React from "react";
import { type FilterType, type PortfolioItem, portfolioItems } from "@/data/portfolioItems";
import { Skeleton } from "@/components/ui/skeleton";
import { useImagePreloader } from "@/hooks/useImagePreloader";
import { useImageLinkWarmup } from "@/hooks/useImageLinkWarmup";
import {
  buildDriveImageUrl,
  extractDriveFileId,
  type DriveImageVariant,
} from "@/lib/googleDrive";

const IMAGES_PER_BATCH = 9;
const FALLBACK_VARIANTS: DriveImageVariant[] = ["cdn", "download", "view", "thumbnail"];

const Portfolio: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<FilterType>("All");
  const [visibleBatches, setVisibleBatches] = useState<number>(1);
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());
  const [loadedImages, setLoadedImages] = useState<Set<number>>(() => new Set());

  const filterOptions = React.useMemo<Array<{ label: string; value: FilterType }>>(
    () => [
      { label: "All", value: "All" },
      { label: "Wedding", value: "Wedding" },
      { label: "Haldi", value: "Haldi" },
      { label: "Mehndi", value: "Mehndi" },
      { label: "Pre-Wedding", value: "Pre-Wedding" },
      { label: "Shagan", value: "Shagan" },
    ],
    []
  );
  const categoryLabelMap = React.useMemo(() => {
    return filterOptions.reduce<Record<FilterType, string>>((acc, option) => {
      acc[option.value] = option.label;
      return acc;
    }, {} as Record<FilterType, string>);
  }, [filterOptions]);

  const directImageUrls = React.useMemo(
    () => portfolioItems.map((item) => item.image),
    []
  );
  useImagePreloader(directImageUrls, { priorityCount: 24, throttleMs: 75 });
  useImageLinkWarmup(directImageUrls);

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

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === "Escape") {
        setSelectedItem(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedItem]);

  const imagesToShow = filteredItems.slice(0, visibleBatches * IMAGES_PER_BATCH);
  const hasMore = imagesToShow.length < filteredItems.length;
  const canViewLess = visibleBatches > 1;

  const scrollToContact = (): void => {
    const element = document.getElementById("contact");
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  const handleImageLoad = (itemId: number) => {
    setImageErrors((prev) => {
      if (!prev.has(itemId)) return prev;
      const next = new Set(prev);
      next.delete(itemId);
      return next;
    });
    setLoadedImages((prev) => {
      if (prev.has(itemId)) return prev;
      const next = new Set(prev);
      next.add(itemId);
      return next;
    });
  };

  const resetLoadedState = (itemId: number) => {
    setLoadedImages((prev) => {
      if (!prev.has(itemId)) return prev;
      const next = new Set(prev);
      next.delete(itemId);
      return next;
    });
  };

  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>,
    itemId: number
  ): void => {
    const target = e.currentTarget;
    const driveId = target.dataset.driveId || extractDriveFileId(target.currentSrc || "");

    if (!driveId) {
      setImageErrors((prev) => new Set(prev).add(itemId));
      resetLoadedState(itemId);
      return;
    }

    const currentVariant = (target.dataset.driveVariant as DriveImageVariant) || "cdn";
    const currentIndex = FALLBACK_VARIANTS.indexOf(currentVariant);
    const nextVariant = FALLBACK_VARIANTS[currentIndex + 1];

    if (!nextVariant) {
      setImageErrors((prev) => new Set(prev).add(itemId));
      resetLoadedState(itemId);
      return;
    }

    target.dataset.driveVariant = nextVariant;
    target.src = buildDriveImageUrl(driveId, nextVariant);
    resetLoadedState(itemId);
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
          {filterOptions.map((option) => (
            <Badge
              key={option.value}
              variant={activeFilter === option.value ? "default" : "outline"}
              className={`cursor-pointer px-6 py-2 text-sm font-medium rounded-full transition-all duration-300 hover-lift ${
                activeFilter === option.value
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-transparent text-foreground border-muted hover:border-secondary hover:text-secondary"
              }`}
              onClick={() => setActiveFilter(option.value)}
            >
              {option.label}
            </Badge>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {imagesToShow.map((item, index) => {
            const priority = index < 6 ? "high" : "low";
            const driveId = extractDriveFileId(item.image);
            const imageUrl = item.image;
            const isLoaded = loadedImages.has(item.id);
            const hasError = imageErrors.has(item.id);

            return (
              <div
                key={item.id}
                className="group relative overflow-hidden rounded-xl shadow-soft hover:shadow-elevated transition-all duration-300 hover-lift cursor-pointer aspect-[4/5]"
                onClick={() => setSelectedItem(item)}
              >
                {hasError ? (
                  <div className="w-full h-full flex items-center justify-center bg-muted">
                    <div className="text-center p-6">
                      <p className="text-muted-foreground mb-2">Failed to load image</p>
                      <p className="text-xs text-muted-foreground">Please check image permissions</p>
                    </div>
                  </div>
                ) : (
                  <>
                    {!isLoaded && (
                      <Skeleton className="absolute inset-0 h-full w-full animate-pulse" />
                    )}
                    <img
                      ref={(node) => {
                        if (node) {
                          node.setAttribute("fetchpriority", priority);
                          if (driveId) {
                            node.dataset.driveId = driveId;
                            node.dataset.driveVariant = "cdn";
                          }
                        }
                      }}
                      src={imageUrl}
                      alt={`${item.category} showcase`}
                      className={[
                        "w-full h-full object-cover transition-transform duration-500 group-hover:scale-110",
                        isLoaded ? "opacity-100" : "opacity-0",
                      ].join(" ")}
                      loading="lazy"
                      decoding="async"
                      referrerPolicy="no-referrer"
                      onError={(e) => handleImageError(e, item.id)}
                      onLoad={() => handleImageLoad(item.id)}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <Badge className="bg-secondary text-foreground mb-2">
                          {categoryLabelMap[item.category] ?? item.category}
                        </Badge>
                      </div>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>

        {selectedItem &&
          (() => {
            const selectedDriveId = extractDriveFileId(selectedItem.image);
            const modalImageSrc = selectedDriveId
              ? buildDriveImageUrl(selectedDriveId, "cdn")
              : selectedItem.image;

            return (
              <div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
                onClick={() => setSelectedItem(null)}
              >
                <div
                  className="relative flex max-h-[90vh] max-w-[95vw] flex-col items-center gap-4"
                  onClick={(event) => event.stopPropagation()}
                >
                  {!loadedImages.has(selectedItem.id) && (
                    <Skeleton className="absolute inset-0 h-full w-full animate-pulse rounded-xl" />
                  )}
                  <img
                    src={modalImageSrc}
                    alt={`${selectedItem.category} showcase`}
                    className={[
                      "max-h-[80vh] max-w-[90vw] object-contain transition-opacity",
                      loadedImages.has(selectedItem.id) ? "opacity-100" : "opacity-0",
                    ].join(" ")}
                    onError={(e) => handleImageError(e, selectedItem.id)}
                    onLoad={() => handleImageLoad(selectedItem.id)}
                    referrerPolicy="no-referrer"
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
            );
          })()}

        {/* View More Button */}
        {(hasMore || canViewLess) && (
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {hasMore && (
              <Button
                variant="outline"
                className="px-8 py-2 rounded-full border-secondary text-secondary hover:bg-secondary/20 transition-all"
                onClick={() => setVisibleBatches((v) => v + 1)}
              >
                View More
              </Button>
            )}
            {canViewLess && (
              <Button
                variant="ghost"
                className="px-8 py-2 rounded-full text-secondary hover:text-secondary/80 transition-all"
                onClick={() => setVisibleBatches(1)}
              >
                View Less
              </Button>
            )}
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
