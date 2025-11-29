import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";



interface PackageFeature {
  text: string;
}



interface Package {
  name: string;
  tagline: string;
  price: string;
  features: PackageFeature[];
  highlighted?: boolean;
}



const packages: Package[] = [
  {
    name: "Basic",
    tagline: "Wedding Package",
    price: "₹25,000",
    features: [
      { text: "3-4 hours of 1 Cinematic Video and 1 Candid Photography" },
      { text: "Highlight video (2-3 minutes)" },
      { text: "Online photo gallery for sharing" },
      { text: "A full ceremony video pendrive" },
    ],
  },
  {
    name: "Standard",
    tagline: "Wedding Package",
    price: "₹45,000",
    features: [
      { text: "4-5 hours of 1 Cinematic Video and 2 Candid Photographers" },
      { text: "50 edited images" },
      { text: "1-2 Instagram reels" },
      { text: "Highlight video (4-5 minutes)" },
      { text: "Online photo gallery for sharing" },
      { text: "Engagement photo session" },
      { text: "A full ceremony video pendrive" },
    ],
  },
  {
    name: "Essential",
    tagline: "Wedding Package",
    price: "₹75,000",
    features: [
      { text: "10-11 hours of 1 Cinematic Video, 1 Traditional Video and 1 Candid Photographer & 1 Traditional Photographer" },
      { text: "100+ images" },
      { text: "Highlight video (3-5 minutes)" },
      { text: "2-3 Reels (30 to 60 seconds)" },
      { text: "Online gallery and engagement photo session" },
      { text: "A full ceremony video pendrive" },
    ],
    highlighted: true,
  },
  {
    name: "Premium",
    tagline: "3-Day Coverage",
    price: "₹3,56,000",
    features: [
      { text: "Team Size: 2-3 Experienced Photographers and 2-3 Cinematographers" },
      { text: "Filming of all rituals and ceremonies" },
      { text: "Getting Ready' Shots" },
      { text: "Special: Dedicated time for 'Royal Portraits' of the couple in their traditional attire" },
      { text: "600 edited images" },
      { text: "3-5 Minute 'Royal Wedding Film Trailer'" },
      { text: "Ceremony and reception coverage" },
      { text: "5-10 Reels (30 to 60 seconds)" },
      { text: "Online gallery and engagement and bridal sessions" },
      { text: "15-20 minutes The Wedding Story" },
      { text: "A full ceremony video pendrive" },
      { text: "Wedding Albums 2, Exclusive, Custom-Designed Premium Albums (12x18 size, 100 pages each)" },
    ],
  },
];



const Packages = () => {
  const [expandedPackage, setExpandedPackage] = useState<string | null>(null);
  const FEATURES_TO_SHOW = 4; // Number of features to show initially



  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };



  const toggleExpand = (packageName: string) => {
    setExpandedPackage(prev => prev === packageName ? null : packageName);
  };



  return (
    <section id="packages" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-4">
            Wedding Service Packages
          </h2>
          <div className="w-24 h-1 bg-secondary mx-auto mb-8" />
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Designed for your celebrations, customizable to your needs
          </p>
        </div>



        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto items-start">
          {packages.map((pkg) => {
            const isExpanded = expandedPackage === pkg.name;
            const hasMoreFeatures = pkg.features.length > FEATURES_TO_SHOW;
            const displayedFeatures = isExpanded
              ? pkg.features
              : pkg.features.slice(0, FEATURES_TO_SHOW);



            return (
              <Card
                key={pkg.name}
                className={`p-8 rounded-3xl transition-all duration-300 hover-lift flex flex-col ${
                  pkg.highlighted
                    ? "bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-elevated border-2 border-secondary"
                    : "bg-card shadow-soft border border-border"
                }`}
              >
                {pkg.highlighted && (
                  <div className="text-center mb-4">
                    <span className="inline-block bg-secondary text-foreground text-sm font-semibold px-4 py-1 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}



                <div className="text-center mb-8">
                  <h3
                    className={`text-3xl font-heading font-bold mb-2 ${
                      pkg.highlighted ? "text-primary-foreground" : "text-primary"
                    }`}
                  >
                    {pkg.name}
                  </h3>
                  <p
                    className={`text-sm mb-4 ${
                      pkg.highlighted
                        ? "text-primary-foreground/80"
                        : "text-muted-foreground"
                    }`}
                  >
                    {pkg.tagline}
                  </p>
                  <div
                    className={`text-2xl font-semibold ${
                      pkg.highlighted ? "text-secondary" : "text-secondary"
                    }`}
                  >
                    {pkg.price}
                  </div>
                </div>



                <div
                  className="flex-grow"
                  style={{ minHeight: isExpanded ? 'auto' : (pkg.name === 'Essential' ? '220px' : '300px') }}
                >
                  <ul className="space-y-4 mb-4">
                    {displayedFeatures.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Check
                          className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                            pkg.highlighted ? "text-secondary" : "text-secondary"
                          }`}
                        />
                        <span
                          className={`text-sm ${
                            pkg.highlighted
                              ? "text-primary-foreground/90"
                              : "text-foreground"
                          }`}
                        >
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>



                  {hasMoreFeatures && (
                    <button
                      onClick={() => toggleExpand(pkg.name)}
                      className={`flex items-center gap-2 text-sm font-medium transition-colors mb-6 ${
                        pkg.highlighted
                          ? "text-secondary hover:text-secondary/80"
                          : "text-secondary hover:text-secondary/80"
                      }`}
                    >
                      {isExpanded ? (
                        <>
                          Show Less
                          <ChevronUp className="w-4 h-4" />
                        </>
                      ) : (
                        <>
                          Read More ({pkg.features.length - FEATURES_TO_SHOW} more
                          features)
                          <ChevronDown className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  )}
                </div>



                <Button
                  onClick={scrollToContact}
                  className={`w-full rounded-full py-6 font-medium transition-all duration-300 mt-auto ${
                    pkg.highlighted
                      ? "bg-secondary text-foreground hover:bg-secondary/90 shadow-gold"
                      : "bg-primary text-primary-foreground hover:bg-secondary hover:text-foreground border border-transparent hover:border-secondary"
                  }`}
                >
                  Enquire for {pkg.name}
                </Button>
              </Card>
            );
          })}
        </div>



        <div className="text-center mt-12">
          <p className="text-muted-foreground text-sm">
            All packages are customizable. Not sure which one?{" "}
            <button
              onClick={scrollToContact}
              className="text-secondary hover:underline font-medium"
            >
              Let's discuss
            </button>
          </p>
        </div>
      </div>
    </section>
  );
};



export default Packages;
