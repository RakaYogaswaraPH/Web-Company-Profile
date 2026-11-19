import { HeroSection } from "@/components/sections/hero-section";
import { BrandStripSection } from "@/components/sections/brand-strip-section";
import { AboutSection } from "@/components/sections/about-section";
import { ServicesSection } from "@/components/sections/services-section";
import { ClientsPartnersSection } from "@/components/sections/clients-partners-section";
import { ContactSection } from "@/components/sections/contact-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <BrandStripSection />
      <AboutSection />
      <ServicesSection />
      <ClientsPartnersSection />
      <ContactSection />
    </>
  );
}
