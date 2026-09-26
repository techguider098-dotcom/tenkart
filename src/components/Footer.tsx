import React from 'react';
import { Camera, ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  onOpenCheckout: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenCheckout }) => {
  return (
    <footer className="bg-neutral-950 text-neutral-400 py-14 border-t border-neutral-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-neutral-800">
          
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5 text-white">
              <div className="w-8 h-8 rounded-lg bg-white text-neutral-950 flex items-center justify-center">
                <Camera className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-lg text-white leading-tight">
                  Tenkart
                </span>
                <span className="text-[10px] uppercase font-semibold text-neutral-400 tracking-wider">
                  The Master Collection
                </span>
              </div>
            </div>
            
            <p className="text-neutral-400 text-xs max-w-sm leading-relaxed">
              Tenkart brings you 6000+ meticulously calibrated Lightroom presets and video LUTs for photography enthusiasts, professionals, and content creators. Designed to give your photos timeless film tones in one click at just ₹299 INR.
            </p>

            <div className="flex items-center gap-2 text-neutral-400 text-xs">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>30-Day Money-Back Guarantee · Lifetime Free Updates</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <div className="font-bold text-white text-xs uppercase tracking-wider mb-2">
              Preset Collections
            </div>
            <ul className="space-y-2">
              <li><a href="#before-after" className="hover:text-white transition-colors">Before & After Slider</a></li>
              <li><a href="#categories" className="hover:text-white transition-colors">10 Curated Theme Packs</a></li>
              <li><a href="#interactive-lab" className="hover:text-white transition-colors">Live Preset Simulator</a></li>
              <li><a href="#whats-included" className="hover:text-white transition-colors">What's Included (.DNG, .XMP)</a></li>
              <li><a href="#reviews" className="hover:text-white transition-colors">Photographer Reviews</a></li>
            </ul>
          </div>

          {/* Support & Legal */}
          <div className="space-y-2">
            <div className="font-bold text-white text-xs uppercase tracking-wider mb-2">
              Support & Legal
            </div>
            <ul className="space-y-2">
              <li><a href="#faq" className="hover:text-white transition-colors">Frequently Asked Questions</a></li>
              <li><a href="mailto:support@tenkart.com" className="hover:text-white transition-colors">24/7 Dedicated Support (support@tenkart.com)</a></li>
              <li><span className="text-neutral-500">Privacy Policy</span></li>
              <li><span className="text-neutral-500">Terms of Service</span></li>
              <li><span className="text-neutral-500">Refund Guarantee Terms</span></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
          <p>
            © {new Date().getFullYear()} Tenkart. All rights reserved. Adobe®, Lightroom®, and Photoshop® are registered trademarks of Adobe Systems Inc.
          </p>

          <div className="flex items-center gap-4">
            <span>Instant Digital Delivery</span>
            <span>·</span>
            <span>Worldwide Access</span>
            <span>·</span>
            <span>Secure 256-Bit SSL</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
