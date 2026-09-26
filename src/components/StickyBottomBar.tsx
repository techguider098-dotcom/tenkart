import React, { useState, useEffect } from 'react';
import { Download, Sparkles, X } from 'lucide-react';

interface StickyBottomBarProps {
  onOpenCheckout: () => void;
}

export const StickyBottomBar: React.FC<StickyBottomBarProps> = ({ onOpenCheckout }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show when scrolled down 450px
      if (window.scrollY > 450) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible || dismissed) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 bg-neutral-950/95 text-white backdrop-blur-md border-t border-neutral-800 shadow-2xl py-2.5 px-4 sm:px-6 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        
        {/* Left info */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 items-center justify-center shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
              <span>Tenkart 6000+ Master Presets Bundle</span>
              <span className="hidden md:inline-block text-[11px] font-normal text-neutral-400">
                (Mobile .DNG + Desktop .XMP)
              </span>
            </div>
            <div className="text-[11px] text-neutral-300 flex items-center gap-1.5">
              <span className="text-amber-400 font-bold font-mono">₹299 INR</span>
              <span className="line-through text-neutral-500 text-[10px]">₹4,999</span>
              <span>· 94% Limited Launch Discount</span>
            </div>
          </div>
        </div>

        {/* Right CTA and Dismiss */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenCheckout}
            className="px-5 py-2 bg-[#0084ff] hover:bg-[#0070e0] text-white text-xs sm:text-sm font-bold rounded-lg shadow-md transition-all active:scale-95 flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
          >
            <Download className="w-4 h-4 text-white" />
            <span>Download Now • ₹299</span>
          </button>

          <button
            onClick={() => setDismissed(true)}
            className="p-1.5 text-neutral-400 hover:text-white rounded-md transition-colors cursor-pointer"
            aria-label="Dismiss sticky banner"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
