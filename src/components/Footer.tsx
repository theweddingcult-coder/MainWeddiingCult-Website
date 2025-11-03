import { Instagram, Youtube, Facebook, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* About */}
          <div>
            <h3 className="text-2xl font-heading font-bold mb-4 text-secondary">
              the wedding cult
            </h3>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              Capturing the essence of Indian celebrations with warmth, authenticity, and cinematic beauty. Every frame tells your unique story.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-secondary">Quick Links</h4>
            <ul className="space-y-3">
              {["portfolio", "packages", "about", "studio", "contact"].map((link) => (
                <li key={link}>
                  <button
                    onClick={() => scrollToSection(link)}
                    className="text-primary-foreground/80 hover:text-secondary transition-colors text-sm capitalize"
                  >
                    {link === "studio" ? "Visit Studio" : link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-secondary">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-primary-foreground/80 text-sm">
                <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <a href="tel:+919811098155" className="hover:text-secondary transition-colors">
                  +91 98110 98155
                </a>
              </li>
              <li className="flex items-start gap-3 text-primary-foreground/80 text-sm">
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <a href="mailto:theweddingcult@gmail.com" className="hover:text-secondary transition-colors">
                  theweddingcult@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3 text-primary-foreground/80 text-sm">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>House no. 2015, Block B1, Sector 57, Gurugram, Haryana 122003</span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold mb-4 text-secondary">Follow Us</h4>
            <div className="flex gap-4 mb-6">
              <a
                href="https://www.instagram.com/the_wedding_cult"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-secondary flex items-center justify-center text-secondary hover:bg-secondary hover:text-primary transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://www.youtube.com/@theweddingcult9471"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-secondary flex items-center justify-center text-secondary hover:bg-secondary hover:text-primary transition-all duration-300"
                aria-label="YouTube"
              >
                <Youtube size={20} />
              </a>
              <a
                href="https://www.facebook.com/share/1BmxtQx2PY/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-secondary flex items-center justify-center text-secondary hover:bg-secondary hover:text-primary transition-all duration-300"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
            </div>
            <div className="flex flex-wrap gap-3">
              <span className="text-xs bg-secondary/10 text-secondary px-3 py-1 rounded-full">
                4K Films
              </span>
              <span className="text-xs bg-secondary/10 text-secondary px-3 py-1 rounded-full">
                Drone Ready
              </span>
              <span className="text-xs bg-secondary/10 text-secondary px-3 py-1 rounded-full">
                Pan-India
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-secondary/20">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-primary-foreground/60 text-sm">
            © {currentYear} the wedding cult. Made with love in Gurugram.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
