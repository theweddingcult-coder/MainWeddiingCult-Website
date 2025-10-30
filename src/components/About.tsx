import { Button } from "@/components/ui/button";
import { Award, Camera, Heart } from "lucide-react";

const About = () => {
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
    <section id="about" className="py-20 md:py-32 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Image */}
          <div className="relative">
            <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-elevated">
              <img
                
                alt="Professional wedding photographer portrait"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-secondary text-foreground p-6 rounded-xl shadow-gold hidden md:block">
              <p className="text-4xl font-heading font-bold">8+</p>
              <p className="text-sm">Years Experience</p>
            </div>
          </div>

          {/* Content */}
          <div>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-6">
              Meet Gulshan Kumar
            </h2>
            <div className="w-24 h-1 bg-secondary mb-8" />
            
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              With over 8 years capturing Indian weddings across Mumbai, Delhi, Jaipur, and beyond, I blend candid storytelling with editorial finesse. From haldi laughter to mehndi artistry and grand pheras, my approach is unobtrusive yet intentional—so you can relive the feeling, not just the frame.
            </p>

            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Every celebration is unique, and I believe your memories should reflect that. My team and I are passionate about preserving the essence of your special moments with warmth, authenticity, and cinematic beauty.
            </p>

            {/* Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="flex items-start gap-3">
                <Camera className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-foreground">200+ Weddings</p>
                  <p className="text-sm text-muted-foreground">Shot across India</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Award className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-foreground">Featured</p>
                  <p className="text-sm text-muted-foreground">Wedding Sutra, WedMeGood</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Heart className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-foreground">Based in Mumbai</p>
                  <p className="text-sm text-muted-foreground">Available across India</p>
                </div>
              </div>
            </div>

            <Button
              onClick={scrollToContact}
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-secondary hover:text-foreground border border-transparent hover:border-secondary transition-all duration-300 rounded-full px-8 shadow-gold hover-lift"
            >
              Let's Connect
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
