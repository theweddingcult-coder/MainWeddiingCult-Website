import { MapPin, Clock } from "lucide-react";

const StudioMap = () => {
  return (
    <section id="studio" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-4">
            Visit Our Studio
          </h2>
          <div className="w-24 h-1 bg-secondary mx-auto mb-8" />
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Drop by for a coffee and a walkthrough of full wedding films
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Map */}
          <div className="relative rounded-2xl overflow-hidden shadow-elevated h-[400px] lg:h-[500px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.8932698547944!2d72.8310494!3d19.0232211!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7cec95d994a9f%3A0x8a4e6a3e8b8c8e8e!2sBandra%2C%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Aanya Studios Location"
            />
          </div>

          {/* Details */}
          <div className="flex flex-col justify-center">
            <div className="bg-card p-8 rounded-2xl shadow-soft border border-border">
              <h3 className="text-2xl font-heading font-bold text-primary mb-6">
                Aanya Studios
              </h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-foreground mb-1">Address</p>
                    <p className="text-muted-foreground">
                      3rd Floor, Sunshine Plaza<br />
                      Linking Road, Bandra West<br />
                      Mumbai, Maharashtra 400050
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Clock className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-foreground mb-1">Studio Hours</p>
                    <p className="text-muted-foreground">
                      Monday - Saturday: 11:00 AM - 7:00 PM<br />
                      Sunday: By appointment only
                    </p>
                  </div>
                </div>

                <div className="pt-6 border-t border-border">
                  <p className="text-sm text-muted-foreground mb-4">
                    We'd love to meet you in person! Browse our complete portfolio, watch full wedding films on our cinema display, and discuss your vision over coffee.
                  </p>
                  <a
                    href="https://maps.google.com/?q=Bandra+West+Mumbai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-secondary hover:text-accent font-medium transition-colors"
                  >
                    Get Directions →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StudioMap;
