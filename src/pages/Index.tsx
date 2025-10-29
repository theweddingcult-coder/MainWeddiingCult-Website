import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Portfolio from "@/components/Portfolio";
import Services from "@/components/Services";
import Packages from "@/components/Packages";
import PackageDetails from "@/components/PackageDetails";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import StudioMap from "@/components/StudioMap";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <Portfolio />
      <Services />
      <Packages />
      <PackageDetails />
      <About />
      <Testimonials />
      <StudioMap />
      <ContactForm />
      <Footer />
    </main>
  );
};

export default Index;
