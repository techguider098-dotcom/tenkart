import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { BeforeAfterSlider } from './components/BeforeAfterSlider';
import { PresetCategoriesGrid } from './components/PresetCategoriesGrid';
import { InteractivePresetLab } from './components/InteractivePresetLab';
import { WhatsIncludedGrid } from './components/WhatsIncludedGrid';
import { PricingSection } from './components/PricingSection';
import { TrustGuaranteeSection } from './components/TrustGuaranteeSection';
import { TestimonialsGrid } from './components/TestimonialsGrid';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { PackDetailModal } from './components/PackDetailModal';
import { StickyBottomBar } from './components/StickyBottomBar';
import { PresetPack } from './types';
import { RAZORPAY_CHECKOUT_URL } from './data/presetData';

export default function App() {
  const [selectedPack, setSelectedPack] = useState<PresetPack | null>(null);

  const handleDownloadRedirect = () => {
    window.location.href = RAZORPAY_CHECKOUT_URL;
  };

  const handleSelectPack = (pack: PresetPack) => {
    setSelectedPack(pack);
  };

  const handleClosePackModal = () => {
    setSelectedPack(null);
  };

  const scrollToCategories = () => {
    const el = document.getElementById('categories');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#faf7f2] text-neutral-900 selection:bg-amber-500 selection:text-white flex flex-col font-sans">
      
      {/* 3-Zone Navigation Bar */}
      <Navbar onOpenCheckout={handleDownloadRedirect} />

      <main className="flex-1">
        {/* Hero Section matching screenshot faithfully */}
        <HeroSection
          onOpenCheckout={handleDownloadRedirect}
          onExplorePresets={scrollToCategories}
        />

        {/* Interactive Before & After Photo Comparison Slider */}
        <BeforeAfterSlider />

        {/* Responsive Bento Grid of 10 Curated Theme Packs (6,000+ presets) */}
        <PresetCategoriesGrid
          onSelectPack={handleSelectPack}
          onOpenCheckout={handleDownloadRedirect}
        />

        {/* Live Preset Sandbox / Calibration Playground */}
        <InteractivePresetLab onOpenCheckout={handleDownloadRedirect} />

        {/* Technical Architecture & What's Included (.DNG, .XMP, .CUBE) */}
        <WhatsIncludedGrid />

        {/* Pricing Stack, Countdown & Comparison Grid */}
        <PricingSection onOpenCheckout={handleDownloadRedirect} />

        {/* 30-Day Money Back Guarantee & Instant Digital Delivery Trust Section */}
        <TrustGuaranteeSection onOpenCheckout={handleDownloadRedirect} />

        {/* Social Proof & Photographer Testimonials Grid */}
        <TestimonialsGrid />

        {/* Frequently Asked Questions */}
        <FaqSection />
      </main>

      {/* Quiet Footer */}
      <Footer onOpenCheckout={handleDownloadRedirect} />

      {/* Pack Detail Lightbox Modal */}
      <PackDetailModal
        pack={selectedPack}
        onClose={handleClosePackModal}
        onOpenCheckout={handleDownloadRedirect}
      />

      {/* Sticky Bottom Conversion Bar */}
      <StickyBottomBar onOpenCheckout={handleDownloadRedirect} />

    </div>
  );
}
