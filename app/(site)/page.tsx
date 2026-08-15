import Hero from '@/components/sections/Hero';
import TrustBar from '@/components/sections/TrustBar';
import Intro from '@/components/sections/Intro';
import Services from '@/components/sections/Services';
import WhyChooseUs from '@/components/sections/WhyChooseUs';
import BeforeAfterSlider from '@/components/BeforeAfterSlider';
import ProjectsTeaser from '@/components/sections/ProjectsTeaser';
import Process from '@/components/sections/Process';
import Materials from '@/components/sections/Materials';
import RoofVisualizer from '@/components/RoofVisualizer';
import ReviewsTeaser from '@/components/sections/ReviewsTeaser';
import Warranty from '@/components/sections/Warranty';
import Financing from '@/components/sections/Financing';
import Emergency from '@/components/sections/Emergency';
import ServiceArea from '@/components/sections/ServiceArea';
import FaqAccordion from '@/components/FaqAccordion';
import FinalCta from '@/components/sections/FinalCta';

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <Intro />
      <Services />
      <WhyChooseUs />
      <BeforeAfterSlider />
      <ProjectsTeaser />
      <Process />
      <Materials />
      <RoofVisualizer />
      <ReviewsTeaser />
      <Warranty />
      <Financing />
      <Emergency />
      <ServiceArea />
      <FaqAccordion />
      <FinalCta />
    </>
  );
}
