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
              src="https://www.google.com/maps?q=House%20no.%202015%2C%20Block%20B1%2C%20Sector%2057%2C%20Gurugram%2C%20Haryana%20122003&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="the wedding cult Location"
            />
          </div>

          {/* Details */}
          <div className="flex flex-col justify-center">
            <div className="bg-card p-8 rounded-2xl shadow-soft border border-border">
              <h3 className="text-2xl font-heading font-bold text-primary mb-6">
                the wedding cult
              </h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-foreground mb-1">Address</p>
                    <p className="text-muted-foreground">
                      House no. 2015, Block B1, Sector 57, Gurugram, Haryana 122003
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Clock className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-foreground mb-1">Studio Hours</p>
                    <p className="text-muted-foreground">10 am–8 pm daily</p>
                  </div>
                </div>

                <div className="pt-6 border-t border-border">
                  <p className="text-sm text-muted-foreground mb-4">
                    We'd love to meet you in person! Browse our complete portfolio, watch full wedding films on our cinema display, and discuss your vision over coffee.
                  </p>
                  <a
                    href="https://www.google.com/maps/place/The+Wedding+Cult/@28.4234107,77.0717287,15z/data=!4m10!1m2!2m1!1sHouse+no.+2015,+Block+B1,+Sector+57,+Gurugram,+Haryana+122003!3m6!1s0x390d194c75db287f:0x142d8135eba4f0cb!8m2!3d28.4285374!4d77.0860365!15sCj1Ib3VzZSBuby4gMjAxNSwgQmxvY2sgQjEsIFNlY3RvciA1NywgR3VydWdyYW0sIEhhcnlhbmEgMTIyMDAzWjoiOGhvdXNlIG5vIDIwMTUgYmxvY2sgYjEgc2VjdG9yIDU3IGd1cnVncmFtIGhhcnlhbmEgMTIyMDAzkgEUd2VkZGluZ19waG90b2dyYXBoZXKaASNDaFpEU1VoTk1HOW5TMFZKUTBGblNVUnRibUV6ZEU5bkVBReABAPoBBAgAEEY!16s%2Fg%2F11ns0qv5lx?entry=ttu&g_ep=EgoyMDI1MTAyOS4yIKXMDSoASAFQAw%3D%3D"
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
