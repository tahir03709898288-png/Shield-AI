import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnimatedBackground from '@/components/AnimatedBackground';
import Hero from '@/components/sections/Hero';
import TrustSection from '@/components/sections/TrustSection';
import StatsSection from '@/components/sections/StatsSection';
import FeaturesGrid from '@/components/sections/FeaturesGrid';
import HowItWorks from '@/components/sections/HowItWorks';
import Testimonials from '@/components/sections/Testimonials';
import FAQ from '@/components/sections/FAQ';
import CTA from '@/components/sections/CTA';

export default function HomePage() {
  return (
    <>
      <AnimatedBackground />
      <Navbar />
      <main>
        <Hero />
        <TrustSection />
        <StatsSection />
        <FeaturesGrid />
        <HowItWorks />
        <Testimonials />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
