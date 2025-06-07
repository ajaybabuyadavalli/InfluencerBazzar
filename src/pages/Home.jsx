import { motion } from "framer-motion";
import HeroSection from "../components/home/HeroSection";
import MetricCards from "../components/home/MetricCards";
import HowItWorks from "../components/home/HowItWorks";
import BenefitsGrid from "../components/home/BenefitsGrid";
import EarningsSimulator from "../components/home/EarningsSimulator";
import TrustScore from "../components/home/TrustScore";
import TrendingSection from "../components/home/TrendingSection";
import CreatorGallery from "../components/home/CreatorGallery";
import BrandGallery from "../components/home/BrandGallery";
import CaseStudySlider from "../components/home/CaseStudySlider";
import TestimonialCarousel from "../components/home/TestimonialCarousel";
import CampaignFunnel from "../components/home/CampaignFunnel";
import FAQ from "../components/home/FAQ";

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="overflow-hidden"
    >
      <HeroSection />
      <MetricCards />
      <HowItWorks />
      <BenefitsGrid />
      <EarningsSimulator />
      <TrustScore />
      <TrendingSection />
      <CreatorGallery />
      <BrandGallery />
      <CaseStudySlider />
      <TestimonialCarousel />
      <CampaignFunnel />
      <FAQ />
    </motion.div>
  );
}
