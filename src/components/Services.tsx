import { Heart, Sparkles, Gift, Cake, Hand, Users } from "lucide-react";

const services = [
  {
    icon: Heart,
    title: "weddings",
  },
  {
    icon: Sparkles,
    title: "Pre-wedding",
  },
  {
    icon: Gift,
    title: "Engagements",
  },
  {
    icon: Cake,
    title: "Receptions",
  },
  {
    icon: Hand,
    title: "Mehendi",
  },
  {
    icon: Users,
    title: "Haldi",
  },
];

const Services = () => {
  return (
    <section id="services" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-4">
            Explore Our Services
          </h2>
          <div className="w-24 h-1 bg-secondary mx-auto mb-8" />
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Specializing in Indian celebrations and premium event photography
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-6xl mx-auto">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="flex flex-col items-center text-center group cursor-pointer"
              >
                <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4 transition-all duration-300 group-hover:bg-secondary group-hover:shadow-gold hover-lift">
                  <Icon className="w-8 h-8 text-primary transition-colors duration-300 group-hover:text-foreground" />
                </div>
                <h3 className="font-medium text-foreground">
                  {service.title}
                </h3>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
