import React from 'react';
import { Download, Sparkles, CheckCircle2, ShieldCheck, Smartphone, Laptop, Film, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeroSectionProps {
  onOpenCheckout: () => void;
  onExplorePresets: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenCheckout, onExplorePresets }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#fcd3ad] via-[#f7d6bd] to-[#f4c89f] py-14 sm:py-20 lg:py-24 border-b border-amber-900/10">
      {/* Subtle grid pattern overlay matching screenshot */}
      <div className="absolute inset-0 hero-grid-pattern pointer-events-none opacity-80" />

      {/* Atmospheric warm light glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-amber-200/40 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Intro Tagline from screenshot */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-sm sm:text-base md:text-lg font-medium text-neutral-800 tracking-tight mb-6 sm:mb-8 max-w-3xl mx-auto text-balance"
        >
          Introducing The Master Collection Lightroom Presets by <span className="font-bold text-neutral-950">Tenkart</span> – The Ultimate Bundle For Photography Enthusiasts!
        </motion.p>

        {/* Primary Giant Headline from screenshot */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
          className="mb-6 sm:mb-8"
        >
          <h1 className="font-display font-extrabold text-neutral-950 tracking-tight leading-[1.05] sm:leading-[1.02]">
            <span className="block text-6xl sm:text-7xl md:text-8xl lg:text-9xl mb-1 sm:mb-2 text-neutral-950 drop-shadow-xs">
              6000+
            </span>
            <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-neutral-950">
              Premium Presets
            </span>
          </h1>
        </motion.div>

        {/* Description Copy from screenshot */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.2, ease: 'easeOut' }}
          className="text-neutral-800 text-sm sm:text-base md:text-lg leading-relaxed max-w-4xl mx-auto font-normal mb-8 sm:mb-10 text-balance"
        >
          If You're Passionate About Photography And Want To Elevate Your Editing Game, This Preset Collection Is Made For You. Whether You're A Beginner Or A Seasoned Pro, Our 6000+ Meticulously Crafted Presets Cover A Wide Range Of Photography Styles, From Portraits To Landscapes, And Everything In Between. Just One Click And Your Photos Will Be Transformed With Stunning, Professional-Grade Edits. Compatible With Both Mobile And Desktop, The Master Collection Is Perfect For Photographers Who Want Fast, Flawless Results.
        </motion.p>

        {/* High-Converting CTA Ribbon Bar from screenshot */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
          className="max-w-2xl mx-auto mb-10"
        >
          <div className="bg-amber-50/90 backdrop-blur-md border border-amber-900/15 rounded-xl sm:rounded-2xl p-2 sm:p-2.5 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-2">
            
            {/* Left ribbon text */}
            <div className="text-xs sm:text-sm font-semibold text-neutral-800 px-3 flex items-center gap-1.5 whitespace-nowrap">
              <span>*Lifetime Access - One-Time Payment*</span>
            </div>

            {/* Vibrant Blue Download Button from screenshot */}
            <button
              onClick={onOpenCheckout}
              className="w-full sm:w-auto px-8 sm:px-10 py-3 sm:py-3.5 bg-[#0084ff] hover:bg-[#0070e0] text-white font-bold text-base sm:text-lg rounded-lg sm:rounded-xl shadow-md hover:shadow-lg transition-all transform active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Download className="w-5 h-5 text-white" />
              <span>Download Now • ₹299</span>
            </button>

            {/* Right ribbon text */}
            <div className="text-xs sm:text-sm font-semibold text-neutral-800 px-3 flex items-center gap-1.5 whitespace-nowrap">
              <span>*Instant Access - 100% Risk Free*</span>
            </div>
          </div>

          {/* Micro urgency / value anchor */}
          <div className="mt-3 flex flex-wrap items-center justify-center gap-x-5 gap-y-1 text-xs text-neutral-700">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
              Instant Download Link
            </span>
            <span className="text-neutral-400">·</span>
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
              30-Day Money-Back Guarantee
            </span>
            <span className="text-neutral-400">·</span>
            <span className="font-semibold text-neutral-900">
              Only ₹299 INR <span className="line-through text-neutral-500 font-normal">₹4,999</span> (94% OFF)
            </span>
          </div>
        </motion.div>

        {/* Feature Pills / Compatibility Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
          className="pt-6 border-t border-amber-900/10 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto text-left"
        >
          
          <div className="bg-white/60 backdrop-blur-xs rounded-xl p-3 border border-amber-900/10 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-500/15 text-amber-900 flex items-center justify-center shrink-0">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-neutral-900">100% Free Mobile App</div>
              <div className="text-[11px] text-neutral-600">iOS & Android (.DNG)</div>
            </div>
          </div>

          <div className="bg-white/60 backdrop-blur-xs rounded-xl p-3 border border-amber-900/10 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-500/15 text-amber-900 flex items-center justify-center shrink-0">
              <Laptop className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-neutral-900">Lightroom Desktop & ACR</div>
              <div className="text-[11px] text-neutral-600">Mac & PC (.XMP / .LRTEMPLATE)</div>
            </div>
          </div>

          <div className="bg-white/60 backdrop-blur-xs rounded-xl p-3 border border-amber-900/10 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-500/15 text-amber-900 flex items-center justify-center shrink-0">
              <Film className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-neutral-900">4K Video LUTs Included</div>
              <div className="text-[11px] text-neutral-600">Premiere, DaVinci, FCP (.CUBE)</div>
            </div>
          </div>

          <div className="bg-white/60 backdrop-blur-xs rounded-xl p-3 border border-amber-900/10 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-500/15 text-amber-900 flex items-center justify-center shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-neutral-900">Instant Cloud Access</div>
              <div className="text-[11px] text-neutral-600">Google Drive + Direct ZIP</div>
            </div>
          </div>

        </motion.div>

      </div>
    </section>
  );
};
