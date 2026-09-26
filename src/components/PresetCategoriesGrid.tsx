import React, { useState, useEffect } from 'react';
import { PRESET_PACKS } from '../data/presetData';
import { PresetPack } from '../types';
import { Layers, ArrowRight, Eye } from 'lucide-react';
import { motion } from 'framer-motion';

interface PresetCategoriesGridProps {
  onSelectPack: (pack: PresetPack) => void;
  onOpenCheckout: () => void;
}

const PresetCardSkeleton: React.FC = () => (
  <div className="bg-white rounded-2xl overflow-hidden border border-neutral-200/80 shadow-xs flex flex-col justify-between animate-pulse">
    {/* Image Skeleton */}
    <div className="relative aspect-[16/10] bg-neutral-200/80 skeleton-shimmer overflow-hidden">
      <div className="absolute top-3 left-3 flex items-center gap-2">
        <div className="w-16 h-5 rounded-md bg-neutral-300/80" />
        <div className="w-20 h-5 rounded-md bg-neutral-300/60" />
      </div>
      <div className="absolute top-3 right-3 w-20 h-5 rounded-md bg-amber-200/80" />
      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <div className="w-10 h-3 rounded bg-neutral-300/60" />
          <div className="w-3.5 h-3.5 rounded-full bg-neutral-300/90" />
          <div className="w-3.5 h-3.5 rounded-full bg-neutral-300/90" />
          <div className="w-3.5 h-3.5 rounded-full bg-neutral-300/90" />
          <div className="w-3.5 h-3.5 rounded-full bg-neutral-300/90" />
        </div>
        <div className="w-14 h-5 rounded-md bg-neutral-300/80" />
      </div>
    </div>

    {/* Content Skeleton */}
    <div className="p-5 flex-1 flex flex-col justify-between">
      <div>
        {/* Title */}
        <div className="h-5 w-3/4 rounded-md bg-neutral-200/90 skeleton-shimmer mb-3" />
        {/* Description */}
        <div className="space-y-1.5 mb-5">
          <div className="h-3 w-full rounded bg-neutral-200/80 skeleton-shimmer" />
          <div className="h-3 w-5/6 rounded bg-neutral-200/80 skeleton-shimmer" />
          <div className="h-3 w-2/3 rounded bg-neutral-200/60 skeleton-shimmer" />
        </div>
        {/* Engineered for tags */}
        <div className="space-y-2 mb-5">
          <div className="h-2.5 w-24 rounded bg-neutral-200 skeleton-shimmer" />
          <div className="flex flex-wrap gap-1.5">
            <div className="h-5 w-24 rounded-md bg-neutral-100 border border-neutral-200/60 skeleton-shimmer" />
            <div className="h-5 w-28 rounded-md bg-neutral-100 border border-neutral-200/60 skeleton-shimmer" />
            <div className="h-5 w-20 rounded-md bg-neutral-100 border border-neutral-200/60 skeleton-shimmer" />
          </div>
        </div>
      </div>

      {/* Footer Skeleton */}
      <div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
        <div className="h-3 w-28 rounded bg-neutral-200 skeleton-shimmer" />
        <div className="h-4 w-20 rounded bg-sky-100 skeleton-shimmer" />
      </div>
    </div>
  </div>
);

export const PresetCategoriesGrid: React.FC<PresetCategoriesGridProps> = ({
  onSelectPack,
  onOpenCheckout,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [isInitializing, setIsInitializing] = useState<boolean>(true);
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});

  useEffect(() => {
    // Subtle initialization window
    const timer = setTimeout(() => {
      setIsInitializing(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const handleCategoryChange = (cat: string) => {
    if (cat === activeCategory) return;
    setActiveCategory(cat);
  };

  const handleImageLoad = (packId: string) => {
    setLoadedImages((prev) => ({ ...prev, [packId]: true }));
  };

  const categories = [
    'All',
    'Portraits',
    'Film & Nostalgia',
    'Travel & Nature',
    'Weddings & Events',
    'Urban & Architecture',
    'Commercial',
  ];

  const filteredPacks =
    activeCategory === 'All'
      ? PRESET_PACKS
      : PRESET_PACKS.filter((p) => p.category === activeCategory);

  const totalPresetsCount = PRESET_PACKS.reduce((acc, p) => acc + p.count, 0);

  return (
    <section id="categories" className="py-20 bg-[#faf7f2] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="max-w-3xl mx-auto text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-100/70 px-3 py-1 rounded-full mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>Complete Vault Architecture · {totalPresetsCount.toLocaleString()}+ Total Presets</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-neutral-950 tracking-tight mb-4">
            Curated Into 10 Signature Theme Packs
          </h2>
          <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
            Every preset has been rigorously engineered and tested across hundreds of camera brands (Sony, Canon, Nikon, Fujifilm, Leica, iPhone, Android) to ensure smooth skin tones, balanced exposure, and timeless color science.
          </p>
        </motion.div>

        {/* Filter Navigation Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-30px' }}
          transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
          className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none"
        >
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-neutral-900 text-white shadow-md'
                    : 'bg-white text-neutral-600 hover:text-neutral-950 hover:bg-neutral-100 border border-neutral-200'
                }`}
              >
                {cat === 'All' ? `All Collections (${totalPresetsCount}+)` : cat}
              </button>
            );
          })}
        </motion.div>

        {/* Responsive Bento Grid Layout with Skeleton Animation State */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isInitializing ? (
            // Skeleton Placeholder Cards while initializing
            Array.from({ length: 6 }).map((_, index) => (
              <PresetCardSkeleton key={`skeleton-${index}`} />
            ))
          ) : (
            filteredPacks.map((pack, idx) => {
              const isImageLoaded = loadedImages[pack.id];
              return (
                <motion.div
                  key={pack.id}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.45, delay: (idx % 3) * 0.08, ease: 'easeOut' }}
                  className="group relative bg-white rounded-2xl overflow-hidden border border-neutral-200/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  {/* Top Image Showcase with Simulated Grading & Skeleton Shimmer Fallback */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-neutral-900">
                    
                    {/* Subtle In-Card Skeleton Shimmer while specific image loads */}
                    {!isImageLoaded && (
                      <div className="absolute inset-0 bg-neutral-200 skeleton-shimmer z-0" />
                    )}

                    <img
                      src={pack.sampleImage}
                      alt={pack.title}
                      onLoad={() => handleImageLoad(pack.id)}
                      className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 relative z-10 ${
                        isImageLoaded ? 'opacity-100' : 'opacity-0'
                      }`}
                      style={{
                        filter: `brightness(${pack.filterStyle.brightness}) contrast(${pack.filterStyle.contrast}) saturate(${pack.filterStyle.saturate}) sepia(${pack.filterStyle.sepia}) hue-rotate(${pack.filterStyle.hueRotate}deg)`,
                      }}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Subtle Gradient Scrim for readable badges */}
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-black/30 pointer-events-none z-10" />

                    {/* Pack Number & Category pill */}
                    <div className="absolute top-3 left-3 flex items-center gap-2 z-20">
                      <span className="font-mono text-xs font-bold bg-neutral-900/80 text-amber-300 backdrop-blur-md px-2 py-0.5 rounded-md border border-white/10">
                        Pack {pack.number}
                      </span>
                      <span className="text-[11px] font-medium bg-black/50 text-neutral-200 backdrop-blur-md px-2 py-0.5 rounded-md">
                        {pack.category}
                      </span>
                    </div>

                    {/* Preset Count Badge */}
                    <div className="absolute top-3 right-3 bg-amber-500 text-neutral-950 font-bold text-xs px-2.5 py-1 rounded-md shadow-sm z-20">
                      {pack.count}+ Presets
                    </div>

                    {/* Bottom Swatch bar over image */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between z-20">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-300 mr-1">
                          Palette:
                        </span>
                        {pack.palette.map((color, idx) => (
                          <span
                            key={idx}
                            className="w-3.5 h-3.5 rounded-full border border-white/60 shadow-xs"
                            style={{ backgroundColor: color }}
                            title={color}
                          />
                        ))}
                      </div>
                      
                      <button
                        onClick={() => onSelectPack(pack)}
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-white bg-white/20 hover:bg-white/30 backdrop-blur-md px-2.5 py-1 rounded-md transition-colors cursor-pointer"
                      >
                        <Eye className="w-3 h-3 text-amber-300" />
                        <span>Inspect</span>
                      </button>
                    </div>
                  </div>

                  {/* Card Content & Details */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-display text-lg font-bold text-neutral-950 mb-2 group-hover:text-amber-700 transition-colors">
                        {pack.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-4">
                        {pack.description}
                      </p>

                      {/* Ideal For tags */}
                      <div className="space-y-1 mb-5">
                        <div className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider">
                          Engineered For:
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {pack.idealFor.map((item, idx) => (
                            <span
                              key={idx}
                              className="text-xs text-neutral-700 bg-neutral-100 px-2 py-0.5 rounded-md border border-neutral-200/60"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Action bottom footer */}
                    <div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
                      <div className="text-xs text-neutral-500">
                        <span className="font-semibold text-neutral-900">.DNG · .XMP · .CUBE</span>
                      </div>
                      
                      <button
                        onClick={() => onSelectPack(pack)}
                        className="text-xs font-bold text-[#007aff] hover:text-[#005bb5] flex items-center gap-1 group/btn cursor-pointer"
                      >
                        <span>View Samples</span>
                        <ArrowRight className="w-3.5 h-3.5 transform group-hover/btn:translate-x-0.5 transition-transform" />
                      </button>
                    </div>

                  </div>

                </motion.div>
              );
            })
          )}
        </div>

        {/* Value Callout Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mt-14 bg-gradient-to-r from-amber-500 via-amber-600 to-orange-600 rounded-2xl p-6 sm:p-8 text-neutral-950 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="space-y-1 text-center md:text-left">
            <div className="text-xs font-bold uppercase tracking-wider text-amber-950/80">
              Complete Photography Arsenal
            </div>
            <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-neutral-950">
              Get All 10 Packs (6,000+ Presets) In One Download
            </h3>
            <p className="text-sm text-amber-950/90 max-w-xl">
              Normally sold individually for ₹499 per pack (₹4,990 total). Today you get the entire Tenkart Master Collection for a single payment of just ₹299 INR.
            </p>
          </div>

          <button
            onClick={onOpenCheckout}
            className="w-full md:w-auto px-8 py-3.5 bg-neutral-950 hover:bg-neutral-900 text-white font-bold text-sm sm:text-base rounded-xl shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer shrink-0"
          >
            <span>Unlock All 10 Packs • ₹299</span>
          </button>
        </motion.div>

      </div>
    </section>
  );
};

