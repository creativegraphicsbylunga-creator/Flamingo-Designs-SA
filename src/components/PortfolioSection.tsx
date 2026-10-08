import React, { useState } from 'react';
import { PORTFOLIO_ITEMS } from '../data/mockData';
import { PortfolioItem } from '../types';
import { ArrowUpRight, Check, X, Sparkles } from 'lucide-react';

export const PortfolioSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  const categories = ['All', 'Branding', 'Web Design', 'Print & Signage', 'Social Media'];

  const filteredItems = activeCategory === 'All'
    ? PORTFOLIO_ITEMS
    : PORTFOLIO_ITEMS.filter(item => item.category === activeCategory);

  return (
    <section id="portfolio" className="py-20 bg-zinc-950 border-b border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-orange-400 uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Selected Work & Case Studies</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Crafted for South African Market Leaders
            </h2>
            <p className="text-zinc-400 text-sm mt-2 max-w-xl font-light">
              Real commercial identities, packaging runs, and high-performance digital solutions delivering measurable business growth.
            </p>
          </div>

          {/* Interactive Filter Control Tabs */}
          <div className="flex items-center flex-wrap gap-1.5 p-1 bg-zinc-900 border border-zinc-800 rounded-xl">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                  activeCategory === cat
                    ? 'bg-zinc-800 text-white shadow-sm font-semibold'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredItems.map(item => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="group cursor-pointer rounded-2xl bg-zinc-900/60 border border-zinc-800 hover:border-zinc-700 overflow-hidden transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Image showcase */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-950">
                  <img
                    src={item.coverImage}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
                  
                  {/* Category badge */}
                  <div className="absolute top-4 left-4 bg-zinc-950/80 backdrop-blur-md border border-zinc-800 px-3 py-1 rounded-md text-xs font-medium text-orange-400">
                    {item.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Unboxed Metadata with Typographic Separator */}
                  <div className="flex items-center gap-2 text-xs text-zinc-400 mb-2">
                    <span className="font-semibold text-zinc-300">{item.client}</span>
                    <span aria-hidden="true">·</span>
                    <span>{item.year}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-emerald-400 font-medium">{item.outcome}</span>
                  </div>

                  <h3 className="font-display text-xl font-bold text-white group-hover:text-orange-400 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-zinc-400 mt-2 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-6 pb-6 pt-2 flex items-center justify-between border-t border-zinc-800/60 text-xs">
                <div className="flex items-center gap-2 text-zinc-400">
                  {item.tags.map((tag, i) => (
                    <span key={i} className="text-zinc-400">
                      #{tag}
                    </span>
                  ))}
                </div>
                <span className="text-orange-400 font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Case Study <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Case Study Detail Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl bg-zinc-900 border border-zinc-700/80 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs text-orange-400 font-semibold mb-1">
                  <span>{selectedItem.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{selectedItem.client}</span>
                  <span aria-hidden="true">·</span>
                  <span>{selectedItem.year}</span>
                </div>
                <h3 className="font-display text-xl font-bold text-white">
                  {selectedItem.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedItem(null)}
                className="p-2 text-zinc-400 hover:text-white bg-zinc-800 rounded-lg cursor-pointer transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6">
              {/* Image banner */}
              <div className="rounded-xl overflow-hidden aspect-[16/9] w-full bg-zinc-950">
                <img
                  src={selectedItem.coverImage}
                  alt={selectedItem.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Key Metric Banner */}
              <div className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-between">
                <div>
                  <p className="text-xs text-orange-400 font-semibold uppercase tracking-wider">Business Impact</p>
                  <p className="text-lg font-bold text-white mt-0.5">{selectedItem.outcome}</p>
                </div>
                <span className="font-mono text-xs text-zinc-400">Verified Client Metric</span>
              </div>

              {/* Challenge & Solution Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 rounded-xl bg-zinc-950/60 border border-zinc-800">
                  <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">The Challenge</h4>
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">{selectedItem.challenge}</p>
                </div>
                <div className="p-4 rounded-xl bg-zinc-950/60 border border-zinc-800">
                  <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">Flamingo Solution</h4>
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">{selectedItem.solution}</p>
                </div>
              </div>

              {/* Deliverables */}
              <div>
                <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-3">Key Deliverables</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedItem.deliverables.map((del, i) => (
                    <div key={i} className="flex items-center gap-2 p-2.5 rounded-lg bg-zinc-950/40 border border-zinc-800 text-xs text-zinc-200">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{del}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-zinc-800 bg-zinc-950 flex items-center justify-between">
              <span className="text-xs text-zinc-400">Need something similar for your company?</span>
              <button
                onClick={() => {
                  setSelectedItem(null);
                  const el = document.getElementById('quote');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white font-semibold text-xs rounded-xl cursor-pointer"
              >
                Request Similar Project Quote
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
