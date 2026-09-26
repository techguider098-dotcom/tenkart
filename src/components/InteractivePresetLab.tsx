import React, { useState } from 'react';
import { Sliders, Sparkles, RefreshCw, CheckCircle2, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface PresetStyle {
  id: string;
  name: string;
  tone: string;
  filter: {
    brightness: number;
    contrast: number;
    saturate: number;
    sepia: number;
    hueRotate: number;
  };
  metrics: {
    exposure: string;
    contrast: string;
    vibrance: string;
  };
}

const PRESET_STYLES: PresetStyle[] = [
  {
    id: 'raw',
    name: '00. Original RAW Flat',
    tone: 'Unedited camera sensor data',
    filter: { brightness: 1, contrast: 1, saturate: 1, sepia: 0, hueRotate: 0 },
    metrics: { exposure: '0.00', contrast: '0', vibrance: '0' },
  },
  {
    id: 'portra',
    name: '01. Portra 400 Film',
    tone: 'Creamy skin tones & warm analog highlights',
    filter: { brightness: 1.08, contrast: 1.15, saturate: 1.12, sepia: 0.18, hueRotate: -6 },
    metrics: { exposure: '+0.35', contrast: '+14', vibrance: '+16' },
  },
  {
    id: 'nordic',
    name: '02. Nordic Deep Pine',
    tone: 'Muted forest greens & moody alpine contrast',
    filter: { brightness: 0.96, contrast: 1.3, saturate: 0.82, sepia: 0.08, hueRotate: -15 },
    metrics: { exposure: '-0.20', contrast: '+26', vibrance: '+8' },
  },
  {
    id: 'golden',
    name: '03. Honey Sunset Glow',
    tone: 'Rich sun-drenched amber & soft backlight',
    filter: { brightness: 1.07, contrast: 1.18, saturate: 1.35, sepia: 0.3, hueRotate: -10 },
    metrics: { exposure: '+0.40', contrast: '+18', vibrance: '+32' },
  },
  {
    id: 'cyber',
    name: '04. Tokyo Teal & Orange',
    tone: 'Cinematic wet asphalt & electric neon glow',
    filter: { brightness: 1.02, contrast: 1.38, saturate: 1.4, sepia: 0.04, hueRotate: 20 },
    metrics: { exposure: '+0.15', contrast: '+34', vibrance: '+28' },
  },
  {
    id: 'noir',
    name: '05. Fine Art Silver Noir',
    tone: 'Deep crushed blacks & silken silver scale',
    filter: { brightness: 1.04, contrast: 1.5, saturate: 0, sepia: 0, hueRotate: 0 },
    metrics: { exposure: '+0.25', contrast: '+42', vibrance: '-100' },
  },
];

const SAMPLE_PHOTOS = [
  {
    id: 'portrait',
    label: 'Portrait',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80',
    alt: 'Studio Portrait Model',
  },
  {
    id: 'landscape',
    label: 'Landscape',
    url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=80',
    alt: 'Alpine Mountain Landscape',
  },
  {
    id: 'street',
    label: 'Street',
    url: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1000&q=80',
    alt: 'Tokyo City Street',
  },
  {
    id: 'wedding',
    label: 'Wedding',
    url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80',
    alt: 'Sunset Wedding Couple',
  },
];

interface InteractivePresetLabProps {
  onOpenCheckout: () => void;
}

export const InteractivePresetLab: React.FC<InteractivePresetLabProps> = ({ onOpenCheckout }) => {
  const [selectedPhoto, setSelectedPhoto] = useState(SAMPLE_PHOTOS[0]);
  const [selectedStyle, setSelectedStyle] = useState(PRESET_STYLES[1]);
  const [intensity, setIntensity] = useState<number>(100);

  // Compute interpolated filter styles based on intensity
  const factor = intensity / 100;
  const computedBrightness = 1 + (selectedStyle.filter.brightness - 1) * factor;
  const computedContrast = 1 + (selectedStyle.filter.contrast - 1) * factor;
  const computedSaturate = 1 + (selectedStyle.filter.saturate - 1) * factor;
  const computedSepia = selectedStyle.filter.sepia * factor;
  const computedHueRotate = selectedStyle.filter.hueRotate * factor;

  return (
    <section id="interactive-lab" className="py-20 bg-neutral-900 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="max-w-3xl mx-auto text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full mb-3">
            <Sliders className="w-3.5 h-3.5" />
            <span>Interactive Preset Simulator</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Test Drive The Color Science Right Now
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            Choose a test photograph below, click any preset tone, and adjust the Lightroom intensity slider to test how the color curves adapt dynamically.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Canvas (8 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="lg:col-span-8 space-y-4"
          >
            
            {/* Photo Selector Tabs */}
            <div className="flex items-center justify-between gap-2 overflow-x-auto pb-1">
              <span className="text-xs uppercase font-bold tracking-wider text-neutral-400">
                Sample Shot:
              </span>
              <div className="flex gap-2">
                {SAMPLE_PHOTOS.map((photo) => (
                  <button
                    key={photo.id}
                    onClick={() => setSelectedPhoto(photo)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                      selectedPhoto.id === photo.id
                        ? 'bg-amber-500 text-neutral-950 font-bold'
                        : 'bg-neutral-800 text-neutral-400 hover:text-white'
                    }`}
                  >
                    {photo.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Simulated Live Viewport */}
            <div className="relative aspect-[4/3] sm:aspect-[16/10] rounded-2xl overflow-hidden bg-black border border-neutral-800 shadow-2xl">
              <img
                src={selectedPhoto.url}
                alt={selectedPhoto.alt}
                className="w-full h-full object-cover transition-all duration-300"
                style={{
                  filter: `brightness(${computedBrightness}) contrast(${computedContrast}) saturate(${computedSaturate}) sepia(${computedSepia}) hue-rotate(${computedHueRotate}deg)`,
                }}
                referrerPolicy="no-referrer"
              />

              {/* Viewport Overlay HUD */}
              <div className="absolute top-4 left-4 flex items-center gap-2 bg-neutral-950/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-neutral-800">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-mono font-medium text-neutral-200">
                  {selectedStyle.name} ({intensity}%)
                </span>
              </div>

              {/* Preset tone description ribbon */}
              <div className="absolute bottom-4 left-4 right-4 bg-neutral-950/85 backdrop-blur-md px-4 py-2.5 rounded-xl border border-neutral-800 flex items-center justify-between gap-4">
                <span className="text-xs text-neutral-300 truncate">
                  {selectedStyle.tone}
                </span>
                <button
                  onClick={() => {
                    setSelectedStyle(PRESET_STYLES[0]);
                    setIntensity(100);
                  }}
                  className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1 shrink-0 cursor-pointer"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Reset to RAW</span>
                </button>
              </div>
            </div>

            {/* Preset Amount / Intensity Slider (Lightroom modern feature) */}
            <div className="bg-neutral-800/80 rounded-xl p-4 border border-neutral-700/60">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-semibold text-neutral-300 flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-amber-400" />
                  Preset Amount / Intensity
                </span>
                <span className="font-mono font-bold text-amber-400">{intensity}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={intensity}
                onChange={(e) => setIntensity(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer h-2 bg-neutral-700 rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-neutral-500 mt-1">
                <span>0% (Original Raw)</span>
                <span>50% (Subtle Film)</span>
                <span>100% (Full Master Edit)</span>
              </div>
            </div>

          </motion.div>

          {/* Right Controls Panel (4 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
            className="lg:col-span-4 space-y-3"
          >
            <div className="text-xs uppercase font-bold tracking-wider text-neutral-400 px-1">
              Select Preset Look:
            </div>

            {PRESET_STYLES.map((style) => {
              const isSelected = selectedStyle.id === style.id;
              return (
                <button
                  key={style.id}
                  onClick={() => {
                    setSelectedStyle(style);
                    if (style.id === 'raw') setIntensity(100);
                  }}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'bg-amber-500/15 border-amber-500 text-white shadow-md'
                      : 'bg-neutral-800/60 border-neutral-750 text-neutral-300 hover:bg-neutral-800 hover:text-white'
                  }`}
                >
                  <div>
                    <div className="text-sm font-bold flex items-center gap-2">
                      <span>{style.name}</span>
                      {isSelected && (
                        <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                      )}
                    </div>
                    <div className="text-xs text-neutral-400 mt-0.5 line-clamp-1">
                      {style.tone}
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-neutral-900 text-neutral-400">
                      {style.metrics.exposure}
                    </span>
                  </div>
                </button>
              );
            })}

            {/* Quick Checkout Trigger */}
            <div className="pt-4">
              <button
                onClick={onOpenCheckout}
                className="w-full py-3.5 px-4 bg-[#0084ff] hover:bg-[#0070e0] text-white font-bold text-sm rounded-xl shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Get All 6,000+ Presets • ₹299</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <p className="text-[11px] text-center text-neutral-400 mt-2">
                Instant delivery to your email and screen · Lifetime access
              </p>
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
};
