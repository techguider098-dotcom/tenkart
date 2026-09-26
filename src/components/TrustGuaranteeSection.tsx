import React from 'react';
import { 
  ShieldCheck, 
  Zap, 
  CheckCircle2, 
  Lock, 
  RefreshCcw, 
  Mail, 
  DownloadCloud, 
  Sparkles
} from 'lucide-react';
import { motion } from 'framer-motion';

interface TrustSectionProps {
  onOpenCheckout: () => void;
}

export const TrustGuaranteeSection: React.FC<TrustSectionProps> = ({ onOpenCheckout }) => {
  return (
    <section className="py-12 bg-white border-y border-neutral-200/90 relative overflow-hidden">
      {/* Background ambient accents */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-72 h-72 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-72 h-72 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Heading Badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="text-center max-w-2xl mx-auto mb-10"
        >
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-3.5 py-1 rounded-full mb-3 shadow-2xs">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Buyer Protection & Instant Fulfillment</span>
          </div>
          <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-neutral-950 tracking-tight">
            Order With Complete Peace of Mind
          </h3>
          <p className="text-xs sm:text-sm text-neutral-600 mt-2">
            No risks, no waiting. Experience professional edits immediately with full buyer security.
          </p>
        </motion.div>

        {/* Two Featured Hero Trust Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          
          {/* Card 1: 30-Day Money Back Guarantee */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
            className="relative bg-gradient-to-br from-emerald-50/90 via-[#f5fbf7] to-white rounded-2xl p-6 sm:p-7 border-2 border-emerald-200/90 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-emerald-600/20">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/90 px-2.5 py-0.5 rounded-full">
                    100% Risk Free
                  </span>
                  <span className="text-xs font-semibold text-neutral-500">
                    Tenkart Buyer Protection
                  </span>
                </div>
                <h4 className="font-display text-lg sm:text-xl font-bold text-neutral-950">
                  30-Day Money-Back Guarantee
                </h4>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed pt-1">
                  We stand 100% behind the quality of our 6,000+ presets. Test them on your personal portraits, travel shots, and client shoots. If you don't achieve gorgeous, professional color grading in 1 click within 30 days, email us at <span className="font-semibold text-neutral-800">support@tenkart.com</span> and we will immediately process a full 100% refund — no questions asked.
                </p>

                <div className="pt-3 flex flex-wrap items-center gap-y-1 gap-x-4 text-xs font-medium text-emerald-900">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    Zero questions asked
                  </span>
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    Fast refund processing
                  </span>
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    You keep the presets
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Instant Digital Delivery */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
            className="relative bg-gradient-to-br from-sky-50/90 via-[#f4f9fd] to-white rounded-2xl p-6 sm:p-7 border-2 border-sky-200/90 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#0084ff] text-white flex items-center justify-center shrink-0 shadow-md shadow-sky-600/20">
                <Zap className="w-8 h-8" />
              </div>
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-sky-800 bg-sky-100/90 px-2.5 py-0.5 rounded-full">
                    Instant Access
                  </span>
                  <span className="text-xs font-semibold text-neutral-500">
                    24/7 Automated Delivery
                  </span>
                </div>
                <h4 className="font-display text-lg sm:text-xl font-bold text-neutral-950">
                  Instant Digital Delivery
                </h4>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed pt-1">
                  The moment your payment of ₹299 is confirmed through Razorpay, you receive immediate on-screen access to your personal high-speed download portal. A permanent backup link is also dispatched straight to your email with Google Drive and Dropbox mirrors so you can download anytime, anywhere.
                </p>

                <div className="pt-3 flex flex-wrap items-center gap-y-1 gap-x-4 text-xs font-medium text-sky-900">
                  <span className="flex items-center gap-1">
                    <DownloadCloud className="w-3.5 h-3.5 text-[#0084ff] shrink-0" />
                    Instant Google Drive link
                  </span>
                  <span className="flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-[#0084ff] shrink-0" />
                    Email backup dispatch
                  </span>
                  <span className="flex items-center gap-1">
                    <RefreshCcw className="w-3.5 h-3.5 text-[#0084ff] shrink-0" />
                    Lifetime unlimited re-downloads
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>

        {/* 4 Trust Highlights Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-30px' }}
          transition={{ duration: 0.5, delay: 0.25, ease: 'easeOut' }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-2"
        >
          
          <div className="bg-[#faf7f2] rounded-xl p-4 border border-neutral-200/80 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-neutral-900">30-Day Guarantee</div>
              <div className="text-[11px] text-neutral-500">100% money back if not satisfied</div>
            </div>
          </div>

          <div className="bg-[#faf7f2] rounded-xl p-4 border border-neutral-200/80 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-sky-100 text-sky-800 flex items-center justify-center shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-neutral-900">Instant Delivery</div>
              <div className="text-[11px] text-neutral-500">Under 60 seconds fulfillment</div>
            </div>
          </div>

          <div className="bg-[#faf7f2] rounded-xl p-4 border border-neutral-200/80 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-neutral-900">Secure Payments</div>
              <div className="text-[11px] text-neutral-500">256-bit encrypted via Razorpay</div>
            </div>
          </div>

          <div className="bg-[#faf7f2] rounded-xl p-4 border border-neutral-200/80 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-100 text-purple-800 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-neutral-900">Lifetime Access</div>
              <div className="text-[11px] text-neutral-500">No monthly fees or renewals</div>
            </div>
          </div>

        </motion.div>

      </div>
    </section>
  );
};
