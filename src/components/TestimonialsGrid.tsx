import React from 'react';
import { TESTIMONIALS } from '../data/presetData';
import { Star, CheckCircle, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

export const TestimonialsGrid: React.FC = () => {
  return (
    <section id="reviews" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="max-w-3xl mx-auto text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-100/70 px-3 py-1 rounded-full mb-3">
            <Heart className="w-3.5 h-3.5 text-amber-600 fill-amber-600" />
            <span>Real Results From Real Photographers</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-neutral-950 tracking-tight mb-4">
            Loved By Over 18,400+ Creators Worldwide
          </h2>
          <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
            From professional wedding and commercial shooters to everyday mobile content creators, here is why photographers rely on The Master Collection.
          </p>
        </motion.div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, index) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: (index % 3) * 0.1, ease: 'easeOut' }}
              className="bg-[#faf7f2] rounded-2xl p-6 border border-neutral-200/80 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                {/* Rating Stars & Verified Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-full">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Verified Buyer</span>
                  </span>
                </div>

                {/* Quote */}
                <blockquote className="text-sm text-neutral-800 leading-relaxed mb-6 italic">
                  "{t.quote}"
                </blockquote>
              </div>

              {/* Author Info */}
              <div className="pt-4 border-t border-neutral-200/70 flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold text-neutral-950">{t.name}</div>
                  <div className="text-xs text-neutral-500">
                    {t.role} · {t.location}
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-amber-800 bg-amber-100/60 px-2 py-0.5 rounded">
                    Favorite: {t.favoritePack.split('&')[0]}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Aggregate proof stats */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.55, delay: 0.15, ease: 'easeOut' }}
          className="mt-12 p-6 bg-[#faf7f2] rounded-2xl border border-neutral-200 text-center max-w-4xl mx-auto flex flex-wrap items-center justify-around gap-6"
        >
          <div>
            <div className="font-display text-3xl font-extrabold text-neutral-950">18,400+</div>
            <div className="text-xs text-neutral-600">Active Photographers</div>
          </div>
          <div className="hidden sm:block w-px h-10 bg-neutral-300" />
          <div>
            <div className="font-display text-3xl font-extrabold text-neutral-950">4.92 / 5.0</div>
            <div className="text-xs text-neutral-600">Average Rating (2,340+ Reviews)</div>
          </div>
          <div className="hidden sm:block w-px h-10 bg-neutral-300" />
          <div>
            <div className="font-display text-3xl font-extrabold text-neutral-950">6,000+</div>
            <div className="text-xs text-neutral-600">Presets & LUTs in 1 Vault</div>
          </div>
          <div className="hidden sm:block w-px h-10 bg-neutral-300" />
          <div>
            <div className="font-display text-3xl font-extrabold text-neutral-950">100%</div>
            <div className="text-xs text-neutral-600">Risk-Free Guarantee</div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
