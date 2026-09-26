import React from 'react';
import { PresetPack } from '../types';
import { X, Check, Download, Sparkles, Smartphone, Laptop, Film } from 'lucide-react';

interface PackDetailModalProps {
  pack: PresetPack | null;
  onClose: () => void;
  onOpenCheckout: () => void;
}

export const PackDetailModal: React.FC<PackDetailModalProps> = ({
  pack,
  onClose,
  onOpenCheckout,
}) => {
  if (!pack) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150">
      
      {/* Modal Container */}
      <div className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-neutral-200 relative max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-150">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
          
          {/* Top Image Preview with grading */}
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-neutral-950">
            <img
              src={pack.sampleImage}
              alt={pack.title}
              className="w-full h-full object-cover"
              style={{
                filter: `brightness(${pack.filterStyle.brightness}) contrast(${pack.filterStyle.contrast}) saturate(${pack.filterStyle.saturate}) sepia(${pack.filterStyle.sepia}) hue-rotate(${pack.filterStyle.hueRotate}deg)`,
              }}
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-3 left-3 bg-neutral-900/85 backdrop-blur-md text-amber-300 text-xs font-bold font-mono px-2.5 py-1 rounded-md border border-white/10">
              Pack {pack.number} · {pack.category}
            </div>
            <div className="absolute top-3 right-12 sm:right-14 bg-amber-500 text-neutral-950 text-xs font-bold px-3 py-1 rounded-md shadow-md">
              {pack.count}+ Presets
            </div>
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg text-xs text-white">
              <span>Color Tonal Swatches</span>
              <div className="flex gap-1.5">
                {pack.palette.map((color, i) => (
                  <span
                    key={i}
                    className="w-4 h-4 rounded-full border border-white"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Details */}
          <div>
            <h3 className="font-display text-2xl font-bold text-neutral-950 mb-2">
              {pack.title}
            </h3>
            <p className="text-sm text-neutral-600 leading-relaxed">
              {pack.description}
            </p>
          </div>

          {/* Scenarios */}
          <div>
            <div className="text-xs uppercase font-bold tracking-wider text-neutral-500 mb-2">
              Engineered & Calibrated For:
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm text-neutral-800">
              {pack.idealFor.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 bg-neutral-50 p-2.5 rounded-lg border border-neutral-200/70">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Compatibility Badges */}
          <div className="bg-[#faf7f2] p-4 rounded-2xl border border-neutral-200 flex flex-wrap items-center justify-around gap-4 text-xs font-medium text-neutral-700">
            <span className="flex items-center gap-1.5">
              <Smartphone className="w-4 h-4 text-amber-600" />
              Free Lightroom Mobile (.DNG)
            </span>
            <span className="flex items-center gap-1.5">
              <Laptop className="w-4 h-4 text-amber-600" />
              Lightroom Desktop / ACR (.XMP)
            </span>
            <span className="flex items-center gap-1.5">
              <Film className="w-4 h-4 text-amber-600" />
              Video Grading LUTs (.CUBE)
            </span>
          </div>

        </div>

        {/* Modal Footer with CTA */}
        <div className="p-4 sm:p-6 bg-neutral-50 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <div className="text-xs text-neutral-500">Included in Tenkart Master Collection</div>
            <div className="text-sm font-bold text-neutral-950">
              Get this pack + 9 others (6,000+ Presets Total)
            </div>
          </div>

          <button
            onClick={() => {
              onClose();
              onOpenCheckout();
            }}
            className="w-full sm:w-auto px-6 py-3 bg-[#0084ff] hover:bg-[#0070e0] text-white font-bold text-sm rounded-xl shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
          >
            <Download className="w-4 h-4" />
            <span>Download All 10 Packs • ₹299</span>
          </button>
        </div>

      </div>
    </div>
  );
};
