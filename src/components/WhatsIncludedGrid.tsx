import React, { useState, useRef, useEffect } from 'react';
import { 
  Smartphone, 
  Laptop, 
  Film, 
  BookOpen, 
  Brush, 
  CloudDownload, 
  Check, 
  Sparkles, 
  Info, 
  X,
  HelpCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface TermInfo {
  term: string;
  fullName: string;
  badge: string;
  badgeColor: string;
  explanation: string;
  beginnerTip: string;
}

const TECH_TERMS: Record<string, TermInfo> = {
  dng: {
    term: '.DNG',
    fullName: 'Digital Negative Format (Mobile Presets)',
    badge: '100% Free Lightroom Mobile',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    explanation:
      'The universal preset format for smartphones and tablets. Each preset comes pre-applied inside a sample image. When opened in the free Adobe Lightroom Mobile app, you simply tap "Copy Settings" to apply it to any of your own photos in 1 click.',
    beginnerTip: 'No Adobe subscription or credit card needed! Works on free iOS & Android apps.',
  },
  xmp: {
    term: '.XMP',
    fullName: 'Extensible Metadata Platform (Desktop)',
    badge: 'Lightroom Classic & Photoshop',
    badgeColor: 'bg-sky-500/20 text-sky-300 border-sky-500/30',
    explanation:
      'The modern standard file format for Lightroom Classic (v7.3+), Lightroom CC, Adobe Camera Raw (ACR), and Photoshop on Mac and Windows. Presets install into your preset tab with 1 click and preserve maximum dynamic range.',
    beginnerTip: 'Synchronizes automatically across your desktop Adobe catalog.',
  },
  lrtemplate: {
    term: '.LRTEMPLATE',
    fullName: 'Legacy Lightroom Format',
    badge: 'Lightroom 4, 5, 6 & Older CC',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    explanation:
      'The classic preset format created for older standalone versions of Adobe Lightroom. We bundle both modern .XMP and legacy .lrtemplate so you are 100% covered even if you run older software.',
    beginnerTip: 'Backward-compatible with older computers and perpetual licenses.',
  },
  cube: {
    term: '.CUBE',
    fullName: '3D Color Lookup Table (Video LUT)',
    badge: 'Video Color Grading',
    badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    explanation:
      'Industry-standard 3D LUT files used by professional video colorists. Allows you to color-grade motion video footage in Premiere Pro, DaVinci Resolve, Final Cut Pro, CapCut, and VN Editor to match your photo tones.',
    beginnerTip: 'Give your Instagram Reels, TikToks, and YouTube videos a cinematic film look.',
  },
  raw: {
    term: 'RAW / Formats',
    fullName: 'Sensor RAW, JPEG, TIFF & PNG',
    badge: 'Universal Image Compatibility',
    badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
    explanation:
      'Presets adapt intelligently regardless of whether your photo is uncompressed RAW from a dedicated camera (Sony, Canon, Nikon, Fujifilm) or JPEG/ProRAW from an iPhone or Android phone.',
    beginnerTip: 'Handles high-contrast highlights and soft skin tones without clipping.',
  },
};

interface TechTooltipTriggerProps {
  termKey: 'dng' | 'xmp' | 'lrtemplate' | 'cube' | 'raw';
  displayText?: string;
  showIconOnly?: boolean;
}

const TechTooltipTrigger: React.FC<TechTooltipTriggerProps> = ({
  termKey,
  displayText,
  showIconOnly = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);
  const termData = TECH_TERMS[termKey];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isOpen]);

  if (!termData) return <span>{displayText}</span>;

  return (
    <span
      ref={containerRef}
      className="relative inline-flex items-center align-middle mx-0.5 group/tooltip"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* Trigger element */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className="inline-flex items-center gap-1 font-semibold text-neutral-900 bg-amber-500/10 hover:bg-amber-500/25 text-neutral-900 px-1.5 py-0.5 rounded border border-amber-500/30 text-xs sm:text-sm transition-colors cursor-pointer select-none"
        aria-label={`Learn what ${termData.term} means`}
        aria-expanded={isOpen}
      >
        {!showIconOnly && (
          <span className="font-mono text-amber-950 font-bold">{displayText || termData.term}</span>
        )}
        <Info className="w-3.5 h-3.5 text-amber-700 group-hover/tooltip:text-amber-900 transition-colors shrink-0" />
      </button>

      {/* Floating Animated Popover Tooltip */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.96 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 sm:w-80 max-w-[calc(100vw-2rem)] p-4 bg-neutral-950 text-white rounded-2xl shadow-2xl border border-neutral-700/80 z-50 text-left pointer-events-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header with Term & Badge */}
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-mono font-bold text-sm text-amber-400 bg-amber-500/15 border border-amber-500/30 px-2 py-0.5 rounded">
                  {termData.term}
                </span>
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${termData.badgeColor}`}
                >
                  {termData.badge}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-neutral-400 hover:text-white p-1 rounded-md transition-colors"
                aria-label="Close tooltip"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Full Name */}
            <div className="text-xs font-bold text-neutral-200 mb-1.5">
              {termData.fullName}
            </div>

            {/* Explanation */}
            <p className="text-xs text-neutral-300 leading-relaxed mb-3">
              {termData.explanation}
            </p>

            {/* Beginner tip highlight */}
            <div className="bg-neutral-900/90 rounded-lg p-2.5 border border-neutral-800 text-[11px] text-amber-200/90 flex items-start gap-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
              <span>
                <strong className="text-amber-300">Beginner Tip:</strong> {termData.beginnerTip}
              </span>
            </div>

            {/* Small Downward Arrow */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-6 border-x-transparent border-t-6 border-t-neutral-950" />
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
};

export const WhatsIncludedGrid: React.FC = () => {
  return (
    <section id="whats-included" className="py-20 bg-white relative border-y border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="max-w-3xl mx-auto text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-3 py-1 rounded-full mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Complete Architecture & Compatibility</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-neutral-950 tracking-tight mb-4">
            Everything Inside The Master Collection Vault
          </h2>
          <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
            One comprehensive download equipped with all universal formats, cross-platform compatibility, and video color LUTs. No hidden upgrades or add-on costs.
          </p>

          <div className="inline-flex items-center gap-2 mt-4 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs text-amber-900">
            <HelpCircle className="w-3.5 h-3.5 text-amber-700" />
            <span>Hover or tap any <span className="font-bold underline decoration-amber-500/50">info icon (ℹ)</span> below for beginner-friendly file format guides!</span>
          </div>
        </motion.div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Card 1: Mobile .DNG */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45, delay: 0.05, ease: 'easeOut' }}
            className="bg-[#faf7f2] rounded-2xl p-6 border border-neutral-200/90 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-11 h-11 rounded-xl bg-amber-500/15 text-amber-900 flex items-center justify-center">
                  <Smartphone className="w-5 h-5 text-amber-900" />
                </div>
                <span className="text-xs font-bold text-neutral-700 bg-white px-2.5 py-1 rounded-md border border-neutral-200/80 shadow-2xs">
                  100% Free App
                </span>
              </div>

              <h3 className="font-display text-lg font-bold text-neutral-950 mb-2 flex flex-wrap items-center gap-1.5">
                <span>Mobile 1-Click</span>
                <TechTooltipTrigger termKey="dng" displayText=".DNG" />
                <span>Presets</span>
              </h3>
              
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-5">
                Works seamlessly on the free Adobe Lightroom Mobile app for iPhone, iPad, and Android. No Adobe subscription or credit card needed.
              </p>
            </div>

            <div className="pt-4 border-t border-neutral-200/70 space-y-2">
              <div className="flex items-center justify-between text-xs text-neutral-700">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>6,000+ files in format:</span>
                </div>
                <TechTooltipTrigger termKey="dng" displayText=".DNG" />
              </div>
              <div className="flex items-center gap-2 text-xs text-neutral-700">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Zero subscription required</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-neutral-700">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Instant iOS & Android import</span>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Desktop .XMP & .LRTEMPLATE */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45, delay: 0.15, ease: 'easeOut' }}
            className="bg-[#faf7f2] rounded-2xl p-6 border border-neutral-200/90 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-11 h-11 rounded-xl bg-amber-500/15 text-amber-900 flex items-center justify-center">
                  <Laptop className="w-5 h-5 text-amber-900" />
                </div>
                <span className="text-xs font-bold text-neutral-700 bg-white px-2.5 py-1 rounded-md border border-neutral-200/80 shadow-2xs">
                  Mac & Windows
                </span>
              </div>

              <h3 className="font-display text-lg font-bold text-neutral-950 mb-2 flex flex-wrap items-center gap-1.5">
                <span>Desktop</span>
                <TechTooltipTrigger termKey="xmp" displayText=".XMP" />
                <span>&</span>
                <TechTooltipTrigger termKey="lrtemplate" displayText=".LRTEMPLATE" />
              </h3>
              
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-5">
                Engineered for Lightroom Classic, Lightroom CC, Adobe Camera Raw (ACR), and Photoshop. Compatible with RAW, JPEG, TIFF, and PNG formats.
              </p>
            </div>

            <div className="pt-4 border-t border-neutral-200/70 space-y-2">
              <div className="flex items-center justify-between text-xs text-neutral-700">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Modern Desktop standard:</span>
                </div>
                <TechTooltipTrigger termKey="xmp" displayText=".XMP" />
              </div>
              <div className="flex items-center justify-between text-xs text-neutral-700">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Legacy Lightroom support:</span>
                </div>
                <TechTooltipTrigger termKey="lrtemplate" displayText=".lrtemplate" />
              </div>
              <div className="flex items-center justify-between text-xs text-neutral-700">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Camera sensor calibration:</span>
                </div>
                <TechTooltipTrigger termKey="raw" displayText="RAW & JPEG" />
              </div>
            </div>
          </motion.div>

          {/* Card 3: 4K Cinematic Video LUTs (.CUBE) */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45, delay: 0.25, ease: 'easeOut' }}
            className="bg-[#faf7f2] rounded-2xl p-6 border border-neutral-200/90 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-11 h-11 rounded-xl bg-amber-500/15 text-amber-900 flex items-center justify-center">
                  <Film className="w-5 h-5 text-amber-900" />
                </div>
                <span className="text-xs font-bold text-neutral-700 bg-white px-2.5 py-1 rounded-md border border-neutral-200/80 shadow-2xs">
                  Video Grading
                </span>
              </div>

              <h3 className="font-display text-lg font-bold text-neutral-950 mb-2 flex flex-wrap items-center gap-1.5">
                <span>4K Video LUTs</span>
                <TechTooltipTrigger termKey="cube" displayText="(.CUBE)" />
              </h3>
              
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-5">
                Color grade your video clips to match your photography aesthetic in Adobe Premiere Pro, DaVinci Resolve, Final Cut Pro, and CapCut.
              </p>
            </div>

            <div className="pt-4 border-t border-neutral-200/70 space-y-2">
              <div className="flex items-center justify-between text-xs text-neutral-700">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Industry 3D LUT format:</span>
                </div>
                <TechTooltipTrigger termKey="cube" displayText=".CUBE" />
              </div>
              <div className="flex items-center gap-2 text-xs text-neutral-700">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Rec.709, Apple Log & flat profiles</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-neutral-700">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Smooth skin tone roll-offs</span>
              </div>
            </div>
          </motion.div>

          {/* Card 4: Visual PDF & Video Guide */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45, delay: 0.1, ease: 'easeOut' }}
            className="bg-[#faf7f2] rounded-2xl p-6 border border-neutral-200/90 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-11 h-11 rounded-xl bg-amber-500/15 text-amber-900 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-amber-900" />
                </div>
                <span className="text-xs font-bold text-neutral-700 bg-white px-2.5 py-1 rounded-md border border-neutral-200/80 shadow-2xs">
                  Beginner Friendly
                </span>
              </div>

              <h3 className="font-display text-lg font-bold text-neutral-950 mb-2">
                Visual PDF & 2-Min Video Guide
              </h3>
              
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-5">
                Step-by-step visual installation manual and high-definition video walkthrough showing exactly how to import your presets in under 2 minutes.
              </p>
            </div>

            <div className="pt-4 border-t border-neutral-200/70 space-y-2">
              <div className="flex items-center gap-2 text-xs text-neutral-700">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Illustrated PDF instructions</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-neutral-700">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>2-minute video tutorials</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-neutral-700">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>24/7 dedicated support via Tenkart</span>
              </div>
            </div>
          </motion.div>

          {/* Card 5: Adjustment Brushes */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45, delay: 0.2, ease: 'easeOut' }}
            className="bg-[#faf7f2] rounded-2xl p-6 border border-neutral-200/90 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-11 h-11 rounded-xl bg-amber-500/15 text-amber-900 flex items-center justify-center">
                  <Brush className="w-5 h-5 text-amber-900" />
                </div>
                <span className="text-xs font-bold text-neutral-700 bg-white px-2.5 py-1 rounded-md border border-neutral-200/80 shadow-2xs">
                  Bonus Toolkit
                </span>
              </div>

              <h3 className="font-display text-lg font-bold text-neutral-950 mb-2">
                120+ Radial & Brush Adjustment Tools
              </h3>
              
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-5">
                Localized brushes for teeth whitening, eye sparkle, skin softening, sun flare additions, sky enhancers, and subject pop highlights.
              </p>
            </div>

            <div className="pt-4 border-t border-neutral-200/70 space-y-2">
              <div className="flex items-center gap-2 text-xs text-neutral-700">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Portrait retouching brushes</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-neutral-700">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Landscape sky enhancers</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-neutral-700">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Light leak simulations</span>
              </div>
            </div>
          </motion.div>

          {/* Card 6: Instant Cloud Vault */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45, delay: 0.3, ease: 'easeOut' }}
            className="bg-[#faf7f2] rounded-2xl p-6 border border-neutral-200/90 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-11 h-11 rounded-xl bg-amber-500/15 text-amber-900 flex items-center justify-center">
                  <CloudDownload className="w-5 h-5 text-amber-900" />
                </div>
                <span className="text-xs font-bold text-neutral-700 bg-white px-2.5 py-1 rounded-md border border-neutral-200/80 shadow-2xs">
                  Lifetime Access
                </span>
              </div>

              <h3 className="font-display text-lg font-bold text-neutral-950 mb-2">
                Instant Cloud Vault & Free Updates
              </h3>
              
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-5">
                High-speed instant downloads hosted on private Google Drive, Dropbox, and direct AWS servers. Download as many times as you need forever.
              </p>
            </div>

            <div className="pt-4 border-t border-neutral-200/70 space-y-2">
              <div className="flex items-center gap-2 text-xs text-neutral-700">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>No recurring subscription fees</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-neutral-700">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Unlimited re-downloads</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-neutral-700">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Free seasonal pack updates</span>
              </div>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};

