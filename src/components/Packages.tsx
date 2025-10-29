import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";

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
    name: "Essential",
    tagline: "For intimate events and single-day coverage",
    price: "Starting at ₹45,000",
    features: [
      { text: "1 lead photographer + 1 assistant" },
      { text: "Up to 8 hours coverage" },
      { text: "Candid + traditional photography" },
      { text: "150 professionally edited photos" },
      { text: "Private online gallery with download" },
      { text: "Delivery within 10 days" },
    ],
  },
  {
    name: "Classic",
    tagline: "Ideal for wedding day + one ceremony",
    price: "Starting at ₹95,000",
    features: [
      { text: "2 photographers + 1 videographer" },
      { text: "Up to 12 hours coverage" },
      { text: "Candid + traditional photography" },
      { text: "350 edited photos" },
      { text: "4K cinematic highlight film (3-5 mins)" },
      { text: "1 premium album (12x18, 30 sheets)" },
      { text: "Drone coverage (subject to venue)" },
      { text: "Delivery within 14-18 days" },
    ],
    highlighted: true,
  },
  {
    name: "Royal",
    tagline: "For multi-day celebrations with full film",
    price: "Starting at ₹2,50,000",
    features: [
      { text: "3 photographers + 2 videographers" },
      { text: "2-3 days coverage" },
      { text: "600+ edited photos" },
      { text: "4K highlight film (5-7 mins)" },
      { text: "Full documentary film (45-60 mins)" },
      { text: "Same-day teaser (30-60 sec)" },
      { text: "2 premium albums (panoramic + parents')" },
      { text: "Drone + gimbal cinematic setup" },
      { text: "Dedicated project manager" },
      { text: "Delivery within 21-28 days" },
    ],
  },
];

const Packages = () => {
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
    <section id="packages" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-4">
            Transparent Packages
          </h2>
          <div className="w-24 h-1 bg-secondary mx-auto mb-8" />
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Designed for your celebrations, customizable to your needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {packages.map((pkg) => (
            <Card
              key={pkg.name}
              className={`p-8 rounded-2xl transition-all duration-300 hover-lift ${
                pkg.highlighted
                  ? "bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-elevated border-2 border-secondary transform md:-translate-y-4"
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
                <h3 className={`text-3xl font-heading font-bold mb-2 ${
                  pkg.highlighted ? "text-primary-foreground" : "text-primary"
                }`}>
                  {pkg.name}
                </h3>
                <p className={`text-sm mb-4 ${
                  pkg.highlighted ? "text-primary-foreground/80" : "text-muted-foreground"
                }`}>
                  {pkg.tagline}
                </p>
                <div className={`text-2xl font-semibold ${
                  pkg.highlighted ? "text-secondary" : "text-secondary"
                }`}>
                  {pkg.price}
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {pkg.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                      pkg.highlighted ? "text-secondary" : "text-secondary"
                    }`} />
                    <span className={`text-sm ${
                      pkg.highlighted ? "text-primary-foreground/90" : "text-foreground"
                    }`}>
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              <Button
                onClick={scrollToContact}
                className={`w-full rounded-full py-6 font-medium transition-all duration-300 ${
                  pkg.highlighted
                    ? "bg-secondary text-foreground hover:bg-secondary/90 shadow-gold"
                    : "bg-primary text-primary-foreground hover:bg-secondary hover:text-foreground border border-transparent hover:border-secondary"
                }`}
              >
                Enquire for {pkg.name}
              </Button>
            </Card>
          ))}
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
