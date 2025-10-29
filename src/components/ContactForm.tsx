import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { MessageCircle } from "lucide-react";

const ContactForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    eventType: "",
    eventDate: "",
    city: "",
    services: [] as string[],
    budget: "",
    message: "",
    consent: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.consent) {
      toast({
        title: "Consent Required",
        description: "Please agree to be contacted via phone/WhatsApp.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Enquiry Received!",
        description: "We'll get back to you within 24 hours. Check your email for confirmation.",
      });
      
      // Reset form
      setFormData({
        name: "",
        phone: "",
        email: "",
        eventType: "",
        eventDate: "",
        city: "",
        services: [],
        budget: "",
        message: "",
        consent: false,
      });
      
      setIsSubmitting(false);
    }, 1500);
  };

  const handleServiceToggle = (service: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }));
  };

  return (
    <section id="contact" className="py-20 md:py-32 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-4">
            Let's Plan Your Story
          </h2>
          <div className="w-24 h-1 bg-secondary mx-auto mb-8" />
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Share your celebration details and we'll create a personalized proposal
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                  className="mt-2"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="mt-2"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="eventType">Event Type *</Label>
                <Select value={formData.eventType} onValueChange={(value) => setFormData({ ...formData, eventType: value })}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select event type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="wedding">Wedding</SelectItem>
                    <SelectItem value="haldi">Haldi</SelectItem>
                    <SelectItem value="mehndi">Mehndi</SelectItem>
                    <SelectItem value="pre-wedding">Pre-Wedding</SelectItem>
                    <SelectItem value="baby-shower">Baby Shower</SelectItem>
                    <SelectItem value="multiple">Multiple Events</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="eventDate">Event Date(s)</Label>
                <Input
                  id="eventDate"
                  type="date"
                  value={formData.eventDate}
                  onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                  className="mt-2"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="city">City/Venue</Label>
              <Input
                id="city"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                placeholder="e.g., Mumbai, Jaipur"
                className="mt-2"
              />
            </div>

            <div>
              <Label>Services Needed</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-3">
                {["Photography", "Videography", "Drone", "Albums", "Same-Day Edit"].map((service) => (
                  <div key={service} className="flex items-center gap-2">
                    <Checkbox
                      id={service}
                      checked={formData.services.includes(service)}
                      onCheckedChange={() => handleServiceToggle(service)}
                    />
                    <Label htmlFor={service} className="cursor-pointer font-normal">
                      {service}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="budget">Estimated Budget</Label>
              <Select value={formData.budget} onValueChange={(value) => setFormData({ ...formData, budget: value })}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select budget range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="under-50k">Under ₹50,000</SelectItem>
                  <SelectItem value="50k-1l">₹50,000 - ₹1,00,000</SelectItem>
                  <SelectItem value="1l-2l">₹1,00,000 - ₹2,00,000</SelectItem>
                  <SelectItem value="2l-3l">₹2,00,000 - ₹3,00,000</SelectItem>
                  <SelectItem value="above-3l">Above ₹3,00,000</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="message">Message/Notes</Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Tell us about your vision, special requests, or any questions..."
                rows={5}
                className="mt-2"
              />
            </div>

            <div className="flex items-start gap-3">
              <Checkbox
                id="consent"
                checked={formData.consent}
                onCheckedChange={(checked) => setFormData({ ...formData, consent: checked as boolean })}
              />
              <Label htmlFor="consent" className="cursor-pointer font-normal text-sm">
                I agree to be contacted via phone/WhatsApp regarding my enquiry *
              </Label>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-primary text-primary-foreground hover:bg-secondary hover:text-foreground border border-transparent hover:border-secondary transition-all duration-300 rounded-full py-6 text-lg font-medium shadow-gold hover-lift"
              >
                {isSubmitting ? "Sending..." : "Submit Enquiry"}
              </Button>
              <Button
                type="button"
                variant="outline"
                className="flex-1 border-secondary text-foreground hover:bg-secondary hover:text-foreground rounded-full py-6 text-lg font-medium hover-lift"
                onClick={() => window.open("https://wa.me/919876543210?text=Hi, I'm interested in your photography services", "_blank")}
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Chat on WhatsApp
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
