import React, { useState, useEffect } from 'react';
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
import { OrderSuccessView } from './components/OrderSuccessView';
import { EcomEasyPage } from './components/EcomEasyPage';
import { PresetPack } from './types';
import { RAZORPAY_CHECKOUT_URL } from './data/presetData';

export default function App() {
  const [selectedPack, setSelectedPack] = useState<PresetPack | null>(null);
  const [completedPaymentId, setCompletedPaymentId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<'presets' | 'ecomeasy'>(() => {
    if (typeof window === 'undefined') return 'presets';
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('page') === 'ecomeasy' || window.location.pathname === '/ecomeasy') {
      return 'ecomeasy';
    }
    return 'presets';
  });

  // Listen to browser navigation popstate
  useEffect(() => {
    const onPopState = () => {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('page') === 'ecomeasy' || window.location.pathname === '/ecomeasy') {
        setCurrentPage('ecomeasy');
      } else {
        setCurrentPage('presets');
      }
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  // Check URL parameters on mount to detect Razorpay post-payment redirection
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const urlParams = new URLSearchParams(window.location.search);
    const razorpayPaymentId = urlParams.get('razorpay_payment_id');
    const paymentId = urlParams.get('payment_id');
    const isSuccess = urlParams.get('payment') === 'success' || urlParams.get('status') === 'success';
    const isPathSuccess = window.location.pathname === '/thank-you' || window.location.pathname === '/order-success';

    if (razorpayPaymentId || paymentId || isSuccess || isPathSuccess) {
      const activePaymentId = razorpayPaymentId || paymentId || `pay_${Math.random().toString(36).substring(2, 11)}`;
      setCompletedPaymentId(activePaymentId);

      // Track Facebook/Meta Pixel Purchase Event
      const trackingKey = `fbq_purchase_tracked_${activePaymentId}`;
      const hasTracked = sessionStorage.getItem(trackingKey);

      if (!hasTracked && (window as any).fbq) {
        try {
          (window as any).fbq('track', 'Purchase', {
            content_name: 'Tenkart Master Collection 6000+ Lightroom Presets',
            content_type: 'product',
            content_ids: ['tenkart-master-vault-6000'],
            value: 299,
            currency: 'INR',
            order_id: activePaymentId,
            num_items: 1,
          });
          sessionStorage.setItem(trackingKey, 'true');
        } catch (err) {
          console.error('Meta Pixel Purchase tracking error:', err);
        }
      }
    }
  }, []);

  const handleDownloadRedirect = () => {
    if (typeof window !== 'undefined' && (window as any).fbq) {
      try {
        (window as any).fbq('track', 'InitiateCheckout', {
          content_name: 'Tenkart Master Collection 6000+ Lightroom Presets',
          value: 299,
          currency: 'INR',
        });
      } catch (err) {
        // Continue to redirect regardless of adblocker/pixel state
      }
    }
    window.location.href = RAZORPAY_CHECKOUT_URL;
  };

  const handleReturnHome = () => {
    setCompletedPaymentId(null);
    if (typeof window !== 'undefined' && window.history) {
      const cleanUrl = window.location.origin + window.location.pathname;
      window.history.pushState({}, '', cleanUrl);
    }
  };

  const handleNavigateToEcomEasy = () => {
    setCurrentPage('ecomeasy');
    if (typeof window !== 'undefined' && window.history) {
      const newUrl = window.location.origin + window.location.pathname + '?page=ecomeasy';
      window.history.pushState({ page: 'ecomeasy' }, '', newUrl);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBackToPresets = () => {
    setCurrentPage('presets');
    if (typeof window !== 'undefined' && window.history) {
      const cleanUrl = window.location.origin + window.location.pathname;
      window.history.pushState({}, '', cleanUrl);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // If customer returned from successful Razorpay payment, render the Order Fulfillment & Download Hub
  if (completedPaymentId) {
    return (
      <OrderSuccessView
        paymentId={completedPaymentId}
        onReturnHome={handleReturnHome}
      />
    );
  }

  // If on EcomEasy page
  if (currentPage === 'ecomeasy') {
    return (
      <EcomEasyPage onBackToPresets={handleBackToPresets} />
    );
  }

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
      <Footer 
        onOpenCheckout={handleDownloadRedirect} 
        onNavigateToEcomEasy={handleNavigateToEcomEasy} 
      />

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
