import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import HeroSection from "@/components/Hero/HeroSection";
import FeaturesSection from "@/components/Features/FeaturesSection";
import DashboardPreview from "@/components/Dashboard/DashboardPreview";
import PricingSection from "@/components/Pricing/PricingSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <DashboardPreview />
        <PricingSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
