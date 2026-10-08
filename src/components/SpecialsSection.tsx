import React, { useState } from 'react';
import { PRINT_SPECIALS, BUSINESS_INFO } from '../data/mockData';
import { PrintSpecial } from '../types';
import { Check, ArrowRight, MessageSquare, Zap, Sparkles } from 'lucide-react';

interface SpecialsSectionProps {
  onSelectSpecialForQuote: (special: PrintSpecial) => void;
}

export const SpecialsSection: React.FC<SpecialsSectionProps> = ({ onSelectSpecialForQuote }) => {
  const [filter, setFilter] = useState<'all' | 'retainers' | 'print' | 'web'>('all');

  const filteredSpecials = PRINT_SPECIALS.filter(s => {
    if (filter === 'retainers') {
      return (
        s.id.includes('social') ||
        s.id.includes('maintenance') ||
        s.id.includes('it-support')
      );
    }
    if (filter === 'print') {
      return s.id.includes('cards') || s.id.includes('banner');
    }
    if (filter === 'web') {
      return s.id.includes('web') || s.id.includes('maintenance');
    }
    return true;
  });

  return (
    <section id="specials" className="py-20 bg-zinc-950 border-b border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-orange-400 uppercase tracking-wider mb-2">
              <Zap className="w-3.5 h-3.5" />
              <span>Current Studio Promotions & Monthly Retainers</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              South African Print Specials & Tech Retainers
            </h2>
            <p className="text-zinc-400 text-sm mt-2 max-w-2xl font-light">
              High-specification commercial print runs, monthly social media publishing, website maintenance, and business IT support retainers.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-zinc-400">Available nationwide in ZAR (R)</span>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center flex-wrap gap-2 mb-10 pb-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
              filter === 'all'
                ? 'bg-zinc-800 text-white font-semibold shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200 bg-zinc-900/60'
            }`}
          >
            All Offers ({PRINT_SPECIALS.length})
          </button>
          <button
            onClick={() => setFilter('retainers')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
              filter === 'retainers'
                ? 'bg-orange-600 text-white font-semibold shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200 bg-zinc-900/60'
            }`}
          >
            Monthly Retainers (Social & IT)
          </button>
          <button
            onClick={() => setFilter('print')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
              filter === 'print'
                ? 'bg-zinc-800 text-white font-semibold shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200 bg-zinc-900/60'
            }`}
          >
            Litho Print & Banners
          </button>
          <button
            onClick={() => setFilter('web')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
              filter === 'web'
                ? 'bg-zinc-800 text-white font-semibold shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200 bg-zinc-900/60'
            }`}
          >
            Websites & Security Care
          </button>
        </div>

        {/* Specials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredSpecials.map(special => {
            const savings = special.originalPrice - special.specialPrice;
            return (
              <div
                key={special.id}
                className={`flex flex-col justify-between rounded-2xl bg-zinc-900/70 border transition-all duration-300 hover:border-zinc-700 hover:bg-zinc-900 ${
                  special.popular
                    ? 'border-orange-500/60 shadow-xl shadow-orange-950/20 ring-1 ring-orange-500/30'
                    : 'border-zinc-800'
                }`}
              >
                <div>
                  {/* Image container */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-t-2xl bg-zinc-950">
                    <img
                      src={special.image}
                      alt={special.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-transparent to-transparent" />
                    
                    {/* Badge */}
                    {special.badge && (
                      <div className="absolute top-3 left-3 bg-zinc-950/90 backdrop-blur-md border border-zinc-700/80 px-2.5 py-1 rounded-md text-[11px] font-medium text-orange-400 flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        <span>{special.badge}</span>
                      </div>
                    )}

                    <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                      <div>
                        <span className="text-[11px] text-zinc-400 block">{special.unit}</span>
                        <div className="flex items-baseline gap-2">
                          <span className="font-display font-extrabold text-2xl text-white font-mono tabular-nums">
                            R {special.specialPrice.toLocaleString()}
                          </span>
                          <span className="text-xs text-zinc-400 line-through font-mono tabular-nums">
                            R {special.originalPrice.toLocaleString()}
                          </span>
                        </div>
                      </div>
                      <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-950/80 border border-emerald-800/80 px-2 py-0.5 rounded">
                        Save R {savings}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 space-y-4">
                    <div>
                      <h3 className="font-display text-base font-bold text-white">
                        {special.title}
                      </h3>
                      <p className="text-xs text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
                        {special.description}
                      </p>
                    </div>

                    {/* Specs list */}
                    <ul className="space-y-2 border-t border-zinc-800 pt-3">
                      {special.specs.map((spec, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-zinc-300">
                          <Check className="w-3.5 h-3.5 text-orange-400 mt-0.5 shrink-0" />
                          <span>{spec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Actions Footer */}
                <div className="p-5 pt-0 space-y-2 border-t border-zinc-800/60 mt-4">
                  <button
                    onClick={() => onSelectSpecialForQuote(special)}
                    className="w-full py-2.5 px-4 bg-orange-600 hover:bg-orange-500 text-white font-semibold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                  >
                    <span>Order / Start Retainer</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <a
                    href={`https://wa.me/${BUSINESS_INFO.whatsappRaw}?text=${encodeURIComponent(`Hi Flamingo Designs SA, I would like to order: ${special.title} for R${special.specialPrice}.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 px-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white font-medium text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                    <span>WhatsApp Inquiry</span>
                  </a>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
