import React, { useState } from 'react';
import { FAQS } from '../data/presetData';
import { ChevronDown, HelpCircle, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

export const FaqSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 bg-[#faf7f2] relative border-t border-neutral-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-600 bg-neutral-200/80 px-3 py-1 rounded-full mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Got Questions? We've Got Answers</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-neutral-950 tracking-tight mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
            Everything you need to know about compatibility, file formats, and your lifetime download access.
          </p>
        </motion.div>

        {/* Accordion list */}
        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.4, delay: idx * 0.05, ease: 'easeOut' }}
                className="bg-white rounded-xl border border-neutral-200/90 shadow-2xs overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-neutral-900 hover:text-amber-700 transition-colors cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-neutral-500 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'transform rotate-180 text-amber-600' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-neutral-600 leading-relaxed border-t border-neutral-100 bg-neutral-50/50 animate-in fade-in duration-200">
                    {faq.answer}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Support contact bar */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.55, delay: 0.15, ease: 'easeOut' }}
          className="mt-10 p-6 bg-white rounded-2xl border border-neutral-200 text-center flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3 text-left">
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-900 flex items-center justify-center shrink-0">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-neutral-900">Need help with an uncommon camera?</div>
              <div className="text-xs text-neutral-500">Our team is available 24/7 to assist with installation or custom camera profiles.</div>
            </div>
          </div>

          <a
            href="mailto:support@tenkart.com"
            className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap"
          >
            Email Support
          </a>
        </motion.div>

      </div>
    </section>
  );
};
