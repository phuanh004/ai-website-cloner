import { Header } from "@/components/header";
import { HeroCarousel } from "@/components/hero-carousel";
import { VehicleShowcaseList } from "@/components/vehicle-showcase";
import { FeaturesTabsSection } from "@/components/features-tabs-section";
import { SafetySection } from "@/components/safety-section";
import { ChargingSection } from "@/components/charging-section";
import { SoftwareSection } from "@/components/software-section";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroCarousel />
        <VehicleShowcaseList />
        <FeaturesTabsSection />
        <SafetySection />
        <ChargingSection />
        <SoftwareSection />
      </main>
      <Footer />
    </>
  );
}
