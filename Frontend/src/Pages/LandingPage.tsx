import { Navbar } from "@/components/Landing/Navbar"; 
import { HeroSection } from "@/components/Landing/HeroSection";
import { FeaturesSection } from "@/components/Landing/FeaturesSection";
import { HowItWorks } from "@/components/Landing/HowItWorks";
import { Testimonials } from "@/components/Landing/Testimonials";
import { Footer } from "@/components/layout/Footer"
export function  LandingPage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <HowItWorks />
        <Testimonials />
        {/* You could add a final CTA section here before the footer */}
      </main>
      <Footer />
    </>
  );
}