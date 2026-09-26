import React, { useState } from 'react';
import { Camera, Menu, X, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

interface NavbarProps {
  onOpenCheckout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCheckout }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-amber-900/10 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          
          {/* Zone 1: Single clean text element wordmark */}
          <a href="#" className="flex items-center gap-2.5 text-neutral-900 hover:opacity-90 transition-opacity group">
            <div className="w-9 h-9 rounded-lg bg-neutral-900 text-amber-100 flex items-center justify-center shadow-xs">
              <Camera className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-lg md:text-xl tracking-tight text-neutral-950 leading-tight">
                Tenkart
              </span>
              <span className="text-[10px] uppercase font-semibold text-neutral-500 tracking-wider">
                The Master Collection
              </span>
            </div>
          </a>

          {/* Zone 2: 4-6 text navigation links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-neutral-700">
            <a href="#before-after" className="hover:text-neutral-950 transition-colors">
              Before & After
            </a>
            <a href="#categories" className="hover:text-neutral-950 transition-colors">
              Preset Vault
            </a>
            <a href="#whats-included" className="hover:text-neutral-950 transition-colors">
              What's Included
            </a>
            <a href="#reviews" className="hover:text-neutral-950 transition-colors">
              Photographer Reviews
            </a>
            <a href="#faq" className="hover:text-neutral-950 transition-colors">
              FAQ
            </a>
          </nav>

          {/* Zone 3: Primary action button */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={onOpenCheckout}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-[#007aff] hover:bg-[#0066d6] shadow-sm hover:shadow-md transition-all active:scale-95 whitespace-nowrap cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-200" />
              <span>Get 6,000+ Presets • ₹299</span>
            </button>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onOpenCheckout}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-[#007aff] active:scale-95"
            >
              Get ₹299
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-neutral-200 bg-white/98 px-5 py-4 space-y-3 animate-in fade-in slide-in-from-top-2 duration-150">
          <a
            href="#before-after"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-neutral-800 hover:text-neutral-950 py-1"
          >
            Before & After Comparisons
          </a>
          <a
            href="#categories"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-neutral-800 hover:text-neutral-950 py-1"
          >
            Browse 10 Preset Categories (6,000+)
          </a>
          <a
            href="#interactive-lab"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-neutral-800 hover:text-neutral-950 py-1"
          >
            Live Photo Preset Simulator
          </a>
          <a
            href="#whats-included"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-neutral-800 hover:text-neutral-950 py-1"
          >
            What's Included (.DNG, .XMP, .CUBE)
          </a>
          <a
            href="#reviews"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-neutral-800 hover:text-neutral-950 py-1"
          >
            Photographer Reviews
          </a>
          <a
            href="#faq"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-neutral-800 hover:text-neutral-950 py-1"
          >
            Frequently Asked Questions
          </a>

          <div className="pt-2 border-t border-neutral-100">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCheckout();
              }}
              className="w-full py-3 rounded-lg text-sm font-semibold text-white bg-[#007aff] hover:bg-[#0066d6] flex items-center justify-center gap-2 shadow-sm"
            >
              <span>Download Complete Vault • ₹299</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <div className="flex items-center justify-center gap-1.5 text-xs text-neutral-500 mt-2">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>30-Day Money-Back Guarantee · Instant Download</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
