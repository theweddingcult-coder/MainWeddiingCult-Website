import { useState } from "react";
import emailjs from "@emailjs/browser";
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const ContactForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    eventType: "",
    eventDate: "",
    city: "",
    services: [] as string[],
    budget: "",
    packageSelected: "",
    message: "",
    consent: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting) return;

    if (!formData.consent) {
      toast({
        title: "Consent Required",
        description: "Please agree to be contacted via phone/WhatsApp.",
        variant: "destructive",
      });
      return;
    }

    setShowTerms(true);
  };

  const sendEnquiry = async () => {
    setIsSubmitting(true);
    const serviceId = (import.meta.env.VITE_EMAILJS_SERVICE_ID as string) || "service_a11jexo";
    const userTemplateId = (import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string) || (import.meta.env.VITE_EMAILJS_TEMPLATE_ID_USER as string);
    const adminTemplateId = (import.meta.env.VITE_EMAILJS_TEMPLATE_ID_ADMIN as string) || undefined;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string;

    if (!userTemplateId || !publicKey) {
      toast({
        title: "Email service not configured",
        description: "Missing EmailJS credentials. Please add VITE_EMAILJS_* env vars.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      emailjs.init(publicKey);

      const commonParams = {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        event_type: formData.eventType,
        event_date: formData.eventDate,
        city: formData.city,
        package_selected: formData.packageSelected,
        services: formData.services.join(", "),
        budget: formData.budget,
        message: formData.message,
        submitted_at: new Date().toLocaleString(),
      } as Record<string, string>;

      // Auto-reply to the user
      const userParams = {
        ...commonParams,
        to_email: formData.email,
        to_name: formData.name || "There",
        reply_to: "theweddiingcult@gmail.com",
        brand_name: "the wedding cult",
        whatsapp: "+91 98110 98155",
        address: "House no. 2015, Block B1, Sector 57, Gurugram, Haryana 122003",
        hours: "10 am–8 pm daily",
        instagram: "https://www.instagram.com/the_wedding_cult",
        youtube: "https://www.youtube.com/@theweddingcult9471",
        facebook: "https://www.facebook.com/share/1BmxtQx2PY/",
      } as Record<string, string>;

      // Admin notification (optional if admin template provided)
      const adminParams = {
        ...commonParams,
        to_name: "the wedding cult",
        reply_to: formData.email,
      } as Record<string, string>;

      if (adminTemplateId) {
        await emailjs.send(serviceId, adminTemplateId, adminParams);
      }

      await emailjs.send(serviceId, userTemplateId, userParams);

      toast({
        title: "Enquiry Sent!",
        description: "We've emailed a copy to the address you provided.",
      });

      setFormData({
        name: "",
        phone: "",
        email: "",
        eventType: "",
        eventDate: "",
        city: "",
        services: [],
        budget: "",
        packageSelected: "",
        message: "",
        consent: false,
      });
    } catch (err: any) {
      const details = err?.text || err?.message || "";
      toast({
        title: "Failed to send",
        description: details ? `EmailJS error: ${details}` : "Please try again or use WhatsApp instead.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTermsAgree = async () => {
    setShowTerms(false);
    await sendEnquiry();
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
          <div className="bg-card rounded-2xl shadow-soft border border-border p-8 md:p-10">
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
                    <SelectItem value="wedding">wedding</SelectItem>
                    <SelectItem value="haldi">Haldi</SelectItem>
                    <SelectItem value="mehndi">Mehndi</SelectItem>
                    <SelectItem value="pre-wedding">Pre-wedding</SelectItem>
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
                {["Photography", "Videography", "Drone Coverage", "Albums", "Same-Day Edit", "Pre-wedding Shoot"].map((service) => (
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
              <Label htmlFor="packageSelected">Interested Package (Optional)</Label>
              <Select value={formData.packageSelected} onValueChange={(value) => setFormData({ ...formData, packageSelected: value })}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select a package" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="basic">Basic - Wedding Package - ₹25,000</SelectItem>
                  <SelectItem value="standard">Standard - Wedding Package - ₹45,000</SelectItem>
                  <SelectItem value="essential">Essential - Wedding Package - ₹75,000 (Most Popular)</SelectItem>
                  <SelectItem value="premium">Premium - 3-Day Coverage - ₹3,56,000</SelectItem>
                  <SelectItem value="not-sure">Not sure yet</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="budget">Estimated Budget</Label>
              <Select value={formData.budget} onValueChange={(value) => setFormData({ ...formData, budget: value })}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select budget range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="basic">Basic - ₹25,000</SelectItem>
                  <SelectItem value="standard">Standard - ₹45,000</SelectItem>
                  <SelectItem value="essential">Essential - ₹75,000</SelectItem>
                  <SelectItem value="premium">Premium - ₹3,56,000</SelectItem>
                  <SelectItem value="custom">Custom Quote</SelectItem>
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
                onClick={() => window.open("https://wa.me/919811098155?text=Hi,%20I'm%20interested%20in%20your%20photography%20services", "_blank")}
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Chat on WhatsApp
              </Button>
            </div>
          </form>
          </div>
        </div>
      </div>

      <AlertDialog open={showTerms} onOpenChange={(open) => setShowTerms(open)}>
        <AlertDialogContent className="max-w-xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Terms & Conditions</AlertDialogTitle>
            <AlertDialogDescription className="space-y-4 text-foreground">
              <p>
                By submitting this form, you acknowledge that the wedding cult team may contact you via phone, WhatsApp, or email
                regarding your enquiry. We will only use the information supplied to craft proposals, share availability, and coordinate services.
              </p>
              <p>
                Your data stays private: we do not sell or share your details with third parties. You may request deletion of your information at any time by
                emailing <a href="mailto:theweddiingcult@gmail.com" className="underline">theweddiingcult@gmail.com</a>.
              </p>
              <p>
                Please confirm that you understand and accept these conditions before we send your enquiry.
              </p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-3 sm:gap-2">
            <AlertDialogCancel disabled={isSubmitting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleTermsAgree}
              disabled={isSubmitting}
              className="bg-primary text-primary-foreground hover:bg-secondary hover:text-foreground"
            >
              {isSubmitting ? "Sending..." : "I Agree & Send"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
};

export default ContactForm;
