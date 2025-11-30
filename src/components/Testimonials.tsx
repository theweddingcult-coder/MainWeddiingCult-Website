import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Hanisha Taneja",
    event: "wedding, Jaipur",
    text: "I'm so glad I went with them! The pictures are so well done. They're just beautiful. I'm happy with the shots they got, the way I look, and the way everyone else looks. These are some great keepsakes from our special day. Thanks for making our day memorable. I definitely recommend going with The Wedding Cult!",
    rating: 5,
  },
  {
    name: "Reema garg",
    event: "Pre-wedding Shoot, Goa",
    text: "Have got wonderful photoshoot. Value for money and good team. Everyone loved the pictures. Thanks for gracing our event with beautiful clicks. Highly recommended.",
    rating: 5,
  },
  {
    name: "Vikram & Meera",
    event: "Multi-day wedding, Udaipur",
    text: "From mehndi to pheras, they were there capturing moments we didn't even realize happened. The documentary film is now a family heirloom. Professional, punctual, and incredibly talented.",
    rating: 5,
  },
  {
    name: "Kavita Singh",
    event: "Baby Shower, Mumbai",
    text: "Such a joy to work with! They understood the intimate nature of our celebration and delivered photos that were warm, candid, and full of love. The online gallery made sharing so easy.",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-4">
            Client Stories
          </h2>
          <div className="w-24 h-1 bg-secondary mx-auto mb-8" />
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            What our couples and families say about their experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="p-6 rounded-2xl shadow-soft border border-border bg-card hover-lift transition-all duration-300"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-secondary text-secondary" />
                ))}
              </div>
              <p className="text-foreground text-sm mb-4 leading-relaxed">
                "{testimonial.text}"
              </p>
              <div className="border-t border-border pt-4">
                <p className="font-semibold text-primary">{testimonial.name}</p>
                <p className="text-xs text-muted-foreground mt-1">{testimonial.event}</p>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground">
            Want to share your story with us?{" "}
            <a
              href="#contact"
              className="text-secondary hover:underline font-medium"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Get in touch
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
