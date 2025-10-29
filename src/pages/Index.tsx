import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Portfolio from "@/components/Portfolio";
import Packages from "@/components/Packages";
import About from "@/components/About";
import StudioMap from "@/components/StudioMap";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <Portfolio />
      <Packages />
      <About />
      <StudioMap />
      <ContactForm />
      <Footer />
    </main>
  );
};

export default Index;
