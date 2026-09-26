import React, { useState, useEffect } from 'react';
import { BUNDLE_VALUE_ITEMS } from '../data/presetData';
import { Check, ShieldCheck, Download, Clock, Sparkles, Star, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

interface PricingSectionProps {
  onOpenCheckout: () => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onOpenCheckout }) => {
  const [timeLeft, setTimeLeft] = useState<{ minutes: number; seconds: number }>({
    minutes: 14,
    seconds: 48,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { minutes: prev.minutes - 1, seconds: 59 };
        } else {
          return { minutes: 14, seconds: 59 }; // loop softly
        }
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="pricing" className="py-20 bg-gradient-to-b from-[#faf7f2] to-[#f4eedf] relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Urgency countdown bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="max-w-md mx-auto mb-8 bg-amber-500/15 border border-amber-500/30 rounded-full px-4 py-2 flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold text-amber-950"
        >
          <Clock className="w-4 h-4 text-amber-700 animate-pulse" />
          <span>Limited-Time 95% Launch Discount Ends In:</span>
          <span className="font-mono font-bold text-amber-900 bg-amber-200/80 px-2 py-0.5 rounded">
            {String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
          </span>
        </motion.div>

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.55, delay: 0.1, ease: 'easeOut' }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-neutral-950 tracking-tight mb-4">
            One Small Payment. Lifetime Creative Freedom.
          </h2>
          <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
            Gain immediate access to all 6,000+ presets from Tenkart, video LUTs, brush kits, and future updates. No monthly subscriptions, no renewals.
          </p>
        </motion.div>

        {/* Main Pricing Box */}
        <motion.div
          initial={{ opacity: 0, y: 35, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
          className="bg-white rounded-3xl border-2 border-amber-500 shadow-2xl overflow-hidden relative"
        >
          
          {/* Top banner tag */}
          <div className="bg-amber-500 py-2.5 px-4 text-center text-neutral-950 font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 fill-neutral-950" />
            <span>The Complete 2026 Tenkart Master Lightroom Vault · 95% Discount</span>
          </div>

          <div className="p-6 sm:p-10 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Column: Value Breakdown (7 cols) */}
              <div className="lg:col-span-7 space-y-4">
                <div className="text-xs uppercase tracking-wider font-bold text-neutral-500">
                  Everything Included in Today's Download:
                </div>

                <div className="space-y-3">
                  {BUNDLE_VALUE_ITEMS.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs sm:text-sm border-b border-neutral-100 pb-2.5">
                      <div className="flex items-center gap-2.5 text-neutral-800 font-medium">
                        <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                          <Check className="w-3 h-3" />
                        </div>
                        <span>{item.name}</span>
                      </div>
                      <span className="text-neutral-400 line-through text-xs font-mono">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 flex items-center justify-between text-xs sm:text-sm font-semibold text-neutral-700">
                  <span>Total Combined Retail Value:</span>
                  <span className="text-neutral-400 line-through font-mono text-sm">₹12,193</span>
                </div>
              </div>

              {/* Right Column: Price Box & CTA (5 cols) */}
              <div className="lg:col-span-5 bg-[#faf7f2] rounded-2xl p-6 sm:p-8 border border-neutral-200 text-center flex flex-col justify-between">
                
                <div>
                  <div className="inline-block bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full mb-3">
                    Save ₹11,894 Today
                  </div>

                  <div className="flex items-baseline justify-center gap-2 mb-2">
                    <span className="text-neutral-400 line-through text-2xl font-bold font-mono">
                      ₹4,999
                    </span>
                    <span className="font-display text-5xl sm:text-6xl font-extrabold text-neutral-950 font-mono tracking-tight">
                      ₹299
                    </span>
                  </div>
                  
                  <div className="text-xs text-neutral-500 font-medium mb-6">
                    One-time payment · ₹299 INR · Lifetime access · No subscriptions
                  </div>
                </div>

                {/* Big Action Button */}
                <div className="space-y-3">
                  <button
                    onClick={onOpenCheckout}
                    className="w-full py-4 px-6 bg-[#0084ff] hover:bg-[#0070e0] text-white font-bold text-base sm:text-lg rounded-xl shadow-lg hover:shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Download className="w-5 h-5 text-white" />
                    <span>Download All 6000+ Now • ₹299</span>
                  </button>

                  <div className="flex items-center justify-center gap-1.5 text-xs text-neutral-600">
                    <Lock className="w-3.5 h-3.5 text-neutral-500" />
                    <span>Instant SSL 256-Bit Encrypted Checkout</span>
                  </div>
                </div>

                {/* Trust guarantee inside price card */}
                <div className="mt-6 pt-4 border-t border-neutral-200 text-left flex items-start gap-2.5">
                  <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
                  <div className="text-[11px] text-neutral-600 leading-tight">
                    <span className="font-bold text-neutral-900 block mb-0.5">
                      30-Day 100% Money-Back Guarantee
                    </span>
                    Try them completely risk-free. If you don't love the edits, get a full refund instantly.
                  </div>
                </div>

              </div>

            </div>
          </div>

          {/* Bottom Trust Ribbons */}
          <div className="bg-neutral-900 text-neutral-300 py-3.5 px-6 text-xs flex flex-wrap items-center justify-around gap-4 text-center">
            <span className="flex items-center gap-1.5 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>30-Day 100% Money-Back Guarantee</span>
            </span>
            <span className="hidden sm:inline text-neutral-700">|</span>
            <span className="flex items-center gap-1.5 font-medium">
              <Download className="w-4 h-4 text-sky-400" />
              <span>Instant Digital Delivery in 60s</span>
            </span>
            <span className="hidden sm:inline text-neutral-700">|</span>
            <span className="flex items-center gap-1.5 font-medium">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span>Rated 4.9/5 by 18,400+ Creators</span>
            </span>
          </div>

        </motion.div>

        {/* Dedicated Trust Grid directly adjacent to Pricing Card */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.55, delay: 0.2, ease: 'easeOut' }}
          className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          
          <div className="bg-white/90 backdrop-blur-xs rounded-2xl p-5 border border-emerald-500/30 shadow-sm flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-neutral-950">30-Day Money-Back Guarantee</span>
                <span className="text-[10px] font-bold uppercase text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">100% Risk Free</span>
              </div>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Try the presets on your own photos for 30 full days. If you're not thrilled with the color transformations, get an immediate, full refund. Zero hassle.
              </p>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-xs rounded-2xl p-5 border border-sky-500/30 shadow-sm flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-sky-100 text-[#0084ff] flex items-center justify-center shrink-0">
              <Download className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-neutral-950">Instant Digital Delivery</span>
                <span className="text-[10px] font-bold uppercase text-sky-800 bg-sky-100 px-2 py-0.5 rounded-full">Immediate Access</span>
              </div>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Right after checkout, access your high-speed Google Drive and direct ZIP download links instantly on-screen and via email delivery.
              </p>
            </div>
          </div>

        </motion.div>

      </div>
    </section>
  );
};
