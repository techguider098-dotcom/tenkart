import React, { useState, useRef, useEffect, useCallback } from 'react';
import { BEFORE_AFTER_ITEMS } from '../data/presetData';
import { Sliders, Sparkles, MoveHorizontal, Check, Eye } from 'lucide-react';
import { motion } from 'framer-motion';

export const BeforeAfterSlider: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>(BEFORE_AFTER_ITEMS[0].id);
  const [sliderPosition, setSliderPosition] = useState<number>(52);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeItem = BEFORE_AFTER_ITEMS.find((item) => item.id === selectedId) || BEFORE_AFTER_ITEMS[0];

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const clampedPercentage = Math.min(Math.max((x / rect.width) * 100, 5), 95);
    setSliderPosition(clampedPercentage);
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  }, [isDragging, handleMove]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  }, [isDragging, handleMove]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove]);

  return (
    <section id="before-after" className="py-20 bg-neutral-900 text-white relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-sky-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 hero-grid-pattern-dark pointer-events-none opacity-40" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Color Grading Engine</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
            See The 1-Click Transformation
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            Drag the slider horizontally across any photo to compare the RAW unedited shot against the instant Master Collection edit. No tedious manual tweaking required.
          </p>
        </motion.div>

        {/* Preset Category Switcher Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.15, ease: 'easeOut' }}
          className="flex items-center justify-center gap-2 flex-wrap mb-8"
        >
          {BEFORE_AFTER_ITEMS.map((item) => {
            const isSelected = item.id === selectedId;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setSelectedId(item.id);
                  setSliderPosition(50);
                }}
                className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-amber-500 text-neutral-950 font-bold shadow-md shadow-amber-500/20'
                    : 'bg-neutral-800/80 text-neutral-300 hover:bg-neutral-800 hover:text-white border border-neutral-700/50'
                }`}
              >
                {item.title}
              </button>
            );
          })}
        </motion.div>

        {/* Main Comparison Canvas */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.65, delay: 0.2, ease: 'easeOut' }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
        >
          
          {/* Slider Container (col-span-8) */}
          <div className="lg:col-span-8">
            <div
              ref={containerRef}
              onMouseDown={(e) => {
                setIsDragging(true);
                handleMove(e.clientX);
              }}
              onTouchStart={(e) => {
                setIsDragging(true);
                handleMove(e.touches[0].clientX);
              }}
              className="relative w-full aspect-[4/3] sm:aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl border border-neutral-800 select-none cursor-ew-resize bg-neutral-950 group"
            >
              {/* "AFTER" (Master Graded) Background Layer */}
              <div className="absolute inset-0 w-full h-full">
                <img
                  src={activeItem.afterImage}
                  alt={`After edit: ${activeItem.title}`}
                  className="w-full h-full object-cover"
                  style={{
                    filter:
                      activeItem.id === 'ba-portrait'
                        ? 'brightness(1.12) contrast(1.15) saturate(1.22) sepia(0.12)'
                        : activeItem.id === 'ba-mountains'
                        ? 'brightness(1.02) contrast(1.3) saturate(0.85) hue-rotate(-12deg)'
                        : activeItem.id === 'ba-wedding'
                        ? 'brightness(1.1) contrast(1.1) saturate(1.05) sepia(0.25)'
                        : activeItem.id === 'ba-urban'
                        ? 'brightness(1.05) contrast(1.4) saturate(1.4) hue-rotate(15deg)'
                        : 'brightness(1.08) contrast(1.2) saturate(0.95) sepia(0.2)',
                  }}
                  referrerPolicy="no-referrer"
                />
                {/* After Label */}
                <div className="absolute top-4 right-4 bg-amber-500/90 text-neutral-950 font-bold text-xs uppercase px-3 py-1 rounded-md backdrop-blur-md shadow-md flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3" />
                  <span>Master Preset Edit</span>
                </div>
              </div>

              {/* "BEFORE" (Raw Unedited) Foreground Layer (Clipped by slider position) */}
              <div
                className="absolute inset-y-0 left-0 overflow-hidden"
                style={{ width: `${sliderPosition}%` }}
              >
                <div
                  className="relative w-full h-full"
                  style={{
                    width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%',
                    height: '100%',
                  }}
                >
                  <img
                    src={activeItem.beforeImage}
                    alt={`Before edit: ${activeItem.title}`}
                    className="w-full h-full object-cover max-w-none"
                    style={{
                      width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%',
                      filter: 'contrast(0.88) brightness(0.94) saturate(0.85)', // simulated flat RAW look
                    }}
                    referrerPolicy="no-referrer"
                  />
                  {/* Before Label */}
                  <div className="absolute top-4 left-4 bg-neutral-900/80 text-neutral-300 font-semibold text-xs uppercase px-3 py-1 rounded-md backdrop-blur-md border border-neutral-700">
                    Original RAW Photo
                  </div>
                </div>
              </div>

              {/* Draggable Divider Line & Handle */}
              <div
                className="absolute top-0 bottom-0 z-20 pointer-events-none"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="absolute inset-y-0 -left-px w-0.5 bg-white shadow-[0_0_10px_rgba(255,255,255,0.7)]" />
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-11 h-11 rounded-full bg-white text-neutral-900 shadow-xl flex items-center justify-center border-2 border-amber-400 group-hover:scale-110 transition-transform">
                  <MoveHorizontal className="w-5 h-5 text-neutral-900" />
                </div>
              </div>

              {/* Bottom Instructions Prompt */}
              <div className="absolute bottom-3 inset-x-0 flex justify-center pointer-events-none">
                <span className="bg-black/60 backdrop-blur-md text-[11px] text-neutral-300 px-3 py-1 rounded-full border border-white/10 flex items-center gap-1.5">
                  <MoveHorizontal className="w-3 h-3 text-amber-400" />
                  Drag handle to slide before & after
                </span>
              </div>
            </div>

            {/* Quick quick control buttons */}
            <div className="flex items-center justify-between mt-3 text-xs text-neutral-400 px-1">
              <button
                onClick={() => setSliderPosition(0)}
                className="hover:text-amber-400 transition-colors cursor-pointer"
              >
                Show 100% Master Edit
              </button>
              <button
                onClick={() => setSliderPosition(50)}
                className="hover:text-amber-400 transition-colors cursor-pointer"
              >
                Reset Split to 50/50
              </button>
              <button
                onClick={() => setSliderPosition(100)}
                className="hover:text-amber-400 transition-colors cursor-pointer"
              >
                Show 100% Raw Original
              </button>
            </div>
          </div>

          {/* Preset Metadata & Lightroom Adjustments Inspector (col-span-4) */}
          <div className="lg:col-span-4 space-y-5">
            <div className="bg-neutral-800/80 rounded-2xl p-6 border border-neutral-700/60 backdrop-blur-md shadow-xl">
              
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs uppercase tracking-wider text-amber-400 font-semibold">
                  Applied Preset
                </span>
                <span className="text-xs text-neutral-400 font-mono">
                  {activeItem.location}
                </span>
              </div>

              <h3 className="font-display text-xl font-bold text-white mb-1">
                {activeItem.presetName}
              </h3>
              <p className="text-xs text-neutral-400 mb-6">
                Photographed by {activeItem.photographer} · Shot in RAW
              </p>

              {/* Lightroom Inspector sliders readouts */}
              <div className="space-y-3 pt-4 border-t border-neutral-700">
                <div className="text-xs font-semibold text-neutral-300 flex items-center gap-1.5 mb-2">
                  <Sliders className="w-3.5 h-3.5 text-amber-400" />
                  <span>Lightroom Calibration Values</span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-neutral-900/70 p-2.5 rounded-lg border border-neutral-800 flex justify-between items-center">
                    <span className="text-neutral-400">Exposure</span>
                    <span className="font-mono font-bold text-amber-400">{activeItem.settings.exposure}</span>
                  </div>
                  <div className="bg-neutral-900/70 p-2.5 rounded-lg border border-neutral-800 flex justify-between items-center">
                    <span className="text-neutral-400">Contrast</span>
                    <span className="font-mono font-bold text-amber-400">{activeItem.settings.contrast}</span>
                  </div>
                  <div className="bg-neutral-900/70 p-2.5 rounded-lg border border-neutral-800 flex justify-between items-center">
                    <span className="text-neutral-400">Highlights</span>
                    <span className="font-mono font-bold text-sky-400">{activeItem.settings.highlights}</span>
                  </div>
                  <div className="bg-neutral-900/70 p-2.5 rounded-lg border border-neutral-800 flex justify-between items-center">
                    <span className="text-neutral-400">Shadows</span>
                    <span className="font-mono font-bold text-sky-400">{activeItem.settings.shadows}</span>
                  </div>
                  <div className="bg-neutral-900/70 p-2.5 rounded-lg border border-neutral-800 flex justify-between items-center">
                    <span className="text-neutral-400">Temp</span>
                    <span className="font-mono font-bold text-amber-400">{activeItem.settings.temp}</span>
                  </div>
                  <div className="bg-neutral-900/70 p-2.5 rounded-lg border border-neutral-800 flex justify-between items-center">
                    <span className="text-neutral-400">Vibrance</span>
                    <span className="font-mono font-bold text-emerald-400">{activeItem.settings.vibrance}</span>
                  </div>
                </div>
              </div>

              {/* Key benefit bullet */}
              <div className="mt-6 pt-4 border-t border-neutral-700/60 space-y-2">
                <div className="flex items-start gap-2 text-xs text-neutral-300">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Protects skin tones from clipping or over-saturation</span>
                </div>
                <div className="flex items-start gap-2 text-xs text-neutral-300">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Restores lost highlight information in clouds & skies</span>
                </div>
                <div className="flex items-start gap-2 text-xs text-neutral-300">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Works with both Mobile (iOS/Android) & Desktop (Mac/PC)</span>
                </div>
              </div>

            </div>
          </div>

        </motion.div>

      </div>
    </section>
  );
};
