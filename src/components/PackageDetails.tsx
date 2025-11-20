import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Package, Map, CreditCard, CheckCircle, Tag } from "lucide-react";

const PackageDetails = () => {
  return (
    <section id="package-details" className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-4">
            Package Details
          </h2>
          <div className="w-24 h-1 bg-secondary mx-auto mb-8" />
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Complete transparency on what's included and our policies
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="whats-included" className="bg-card rounded-2xl shadow-soft border border-border px-6">
              <AccordionTrigger className="text-lg font-semibold hover:no-underline py-6">
                <div className="flex items-center gap-3">
                  <Package className="w-6 h-6 text-primary" />
                  <span>What's Included</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-6 text-muted-foreground">
                <ul className="space-y-3 ml-9">
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-1">•</span>
                    <span>All packages include professional photography team with backup equipment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-1">•</span>
                    <span>High-resolution edited photos delivered via private online gallery</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-1">•</span>
                    <span>Cinematic 4K video with professional color grading (Classic & Royal)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-1">•</span>
                    <span>Premium albums with custom design layout (Classic & Royal)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-1">•</span>
                    <span>Drone coverage where permitted by venue (Classic & Royal)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-1">•</span>
                    <span>Dedicated support throughout planning and post-production</span>
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="travel-policy" className="bg-card rounded-2xl shadow-soft border border-border px-6">
              <AccordionTrigger className="text-lg font-semibold hover:no-underline py-6">
                <div className="flex items-center gap-3">
                  <Map className="w-6 h-6 text-primary" />
                  <span>Travel Policy</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-6 text-muted-foreground">
                <ul className="space-y-3 ml-9">
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-1">•</span>
                    <span>Local coverage within 50 km of our studio is included in all packages</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-1">•</span>
                    <span>Outstation events: Travel and accommodation costs at actuals (economy flights, 3-star hotels)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-1">•</span>
                    <span>For destination weddiings, we provide a detailed travel estimate after location confirmation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-1">•</span>
                    <span>Team travels one day prior for multi-day events to ensure readiness</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-1">•</span>
                    <span>All travel arrangements can be made directly by client to ensure transparency</span>
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="payment-terms" className="bg-card rounded-2xl shadow-soft border border-border px-6">
              <AccordionTrigger className="text-lg font-semibold hover:no-underline py-6">
                <div className="flex items-center gap-3">
                  <CreditCard className="w-6 h-6 text-primary" />
                  <span>Payment Terms</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-6 text-muted-foreground">
                <ul className="space-y-3 ml-9">
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-1">•</span>
                    <span><strong>Booking:</strong> 30% advance to secure your date</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-1">•</span>
                    <span><strong>Pre-event:</strong> 50% due 15 days before the first event</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-1">•</span>
                    <span><strong>Final:</strong> 20% balance upon delivery of edited content</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-1">•</span>
                    <span>Accepted methods: Bank transfer, UPI, credit card, or cheque</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-1">•</span>
                    <span>Invoices provided for all transactions with GST details</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-1">•</span>
                    <span><strong>Cancellation:</strong> Advance is non-refundable but can be adjusted to future dates (subject to availability)</span>
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="editing-delivery" className="bg-card rounded-2xl shadow-soft border border-border px-6">
              <AccordionTrigger className="text-lg font-semibold hover:no-underline py-6">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-primary" />
                  <span>Editing & Delivery</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-6 text-muted-foreground">
                <ul className="space-y-3 ml-9">
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-1">•</span>
                    <span>All photos go through professional color correction, retouching, and creative grading</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-1">•</span>
                    <span>Videos include cinematic editing with music, transitions, and color grading</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-1">•</span>
                    <span><strong>Preview:</strong> 15-20 teaser photos shared within 48 hours (for social sharing)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-1">•</span>
                    <span><strong>Photos:</strong> Full gallery delivered as per package timeline</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-1">•</span>
                    <span><strong>Films:</strong> Highlight film 2-3 days after photos; documentary film as per timeline</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-1">•</span>
                    <span><strong>Albums:</strong> Design proof sent within 7 days of content delivery; printed album ships 10-14 days after approval</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-1">•</span>
                    <span>All content archived for 2 years; re-download available anytime</span>
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="addon-pricing" className="bg-card rounded-2xl shadow-soft border border-border px-6">
              <AccordionTrigger className="text-lg font-semibold hover:no-underline py-6">
                <div className="flex items-center gap-3">
                  <Tag className="w-6 h-6 text-primary" />
                  <span>Add-on Pricing</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-6 text-muted-foreground">
                <div className="space-y-4 ml-9">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Photography Add-ons</h4>
                    <ul className="space-y-2">
                      <li className="flex justify-between">
                        <span>Additional photographer (per day)</span>
                        <span className="text-secondary font-medium">₹8,000</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Extra coverage hours</span>
                        <span className="text-secondary font-medium">₹3,500/hour</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Pre-weddiing shoot (4 hours)</span>
                        <span className="text-secondary font-medium">₹25,000</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Videography Add-ons</h4>
                    <ul className="space-y-2">
                      <li className="flex justify-between">
                        <span>Additional videographer (per day)</span>
                        <span className="text-secondary font-medium">₹12,000</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Same-day edit (ready by reception)</span>
                        <span className="text-secondary font-medium">₹18,000</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Drone coverage upgrade</span>
                        <span className="text-secondary font-medium">₹15,000</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Albums & Prints</h4>
                    <ul className="space-y-2">
                      <li className="flex justify-between">
                        <span>Additional premium album (12x18)</span>
                        <span className="text-secondary font-medium">₹12,000</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Parent album (10x12, 20 sheets)</span>
                        <span className="text-secondary font-medium">₹7,500</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Photo prints (set of 50)</span>
                        <span className="text-secondary font-medium">₹4,000</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default PackageDetails;
