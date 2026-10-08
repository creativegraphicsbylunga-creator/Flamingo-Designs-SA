import React from 'react';
import { ArrowRight, MessageSquare, Upload, Sparkles, CheckCircle2 } from 'lucide-react';
import { BUSINESS_INFO } from '../data/mockData';

interface HeroProps {
  onNavigate: (section: string) => void;
  onOpenUpload: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate, onOpenUpload }) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-zinc-800/80">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[450px] bg-gradient-to-b from-orange-600/15 via-rose-600/10 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Subtitle / Trust Kicker */}
        <div className="flex items-center flex-wrap gap-2 text-xs font-medium text-orange-400 mb-4 tracking-wide">
          <span>Edenvale (Van Riebeeck Ave, 1609)</span>
          <span aria-hidden="true">·</span>
          <span>Estcourt KZN (Harding Street)</span>
          <span aria-hidden="true">·</span>
          <span>Commercial Graphic & Web Studio</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Value Proposition & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.08] text-balance">
              Precision graphic design, litho print & high-converting websites.
            </h1>

            <p className="text-base sm:text-lg text-zinc-300 leading-relaxed max-w-2xl font-light">
              We design distinctive brand identities, print premium marketing collateral, and build responsive digital platforms for South African brands ready to stand out.
            </p>

            {/* Quick Proof Signals */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs text-zinc-300 font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0" />
                <span>48h Fast Turnaround</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0" />
                <span>Nationwide SA Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0" />
                <span>Pre-flight Print Checks</span>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3.5">
              <button
                onClick={() => onNavigate('quote')}
                className="px-6 py-3.5 bg-gradient-to-r from-orange-500 to-rose-600 hover:from-orange-600 hover:to-rose-700 text-white font-semibold text-sm rounded-xl shadow-lg shadow-orange-500/25 transition-all duration-150 flex items-center gap-2 cursor-pointer"
              >
                <span>Request Project Quote</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenUpload}
                className="px-5 py-3.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 hover:text-white font-semibold text-sm rounded-xl border border-zinc-700/80 transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Upload className="w-4 h-4 text-amber-400" />
                <span>Upload Artwork File</span>
              </button>

              <button
                onClick={() => onNavigate('specials')}
                className="px-4 py-3.5 text-zinc-300 hover:text-orange-400 font-medium text-sm transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <span>Specials & Retainers (from R260/mo)</span>
                <span className="text-xs text-orange-400">→</span>
              </button>
            </div>

            {/* Live WhatsApp Quick Bar */}
            <div className="pt-4 border-t border-zinc-800/80 flex items-center gap-3 text-xs text-zinc-400">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Direct WhatsApp Desk Available:</span>
              <a
                href={`https://wa.me/${BUSINESS_INFO.whatsappRaw}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 hover:underline font-mono font-medium"
              >
                {BUSINESS_INFO.phone}
              </a>
            </div>

          </div>

          {/* Right Column: High-Fidelity Visual Carrier */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900/60 shadow-2xl group">
              <div className="aspect-[4/3] w-full relative overflow-hidden bg-zinc-950">
                <img
                  src="/src/assets/images/flamingo_brand_hero_1791437552842.jpg"
                  alt="Flamingo Designs SA Brand & Print Materials Showcase"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
              </div>

              {/* High-Impact Visual Caption Overlay */}
              <div className="p-5 relative -mt-10 bg-zinc-900/90 backdrop-blur-md border-t border-zinc-800/90 rounded-b-2xl">
                <div className="flex items-center justify-between text-xs text-zinc-400 mb-1">
                  <span>Featured Production</span>
                  <span className="text-orange-400 font-medium">Bespoke Finish</span>
                </div>
                <h3 className="font-display text-base font-bold text-white">
                  Corporate Identity & Foil-Stamped Litho Print
                </h3>
                <p className="text-xs text-zinc-400 mt-1 line-clamp-2">
                  Double-sided 350gsm silk artboard with protective soft-touch lamination and precision gold foil embossing.
                </p>
                <div className="mt-3 pt-3 border-t border-zinc-800 flex items-center justify-between text-xs">
                  <span className="font-mono tabular-nums text-zinc-300">Run: 500 – 10,000 units</span>
                  <button
                    onClick={() => onNavigate('specials')}
                    className="text-orange-400 hover:text-orange-300 font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <span>View Pricing</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
