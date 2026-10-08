import React from 'react';
import { SERVICES_LIST } from '../data/mockData';
import { ServiceItem } from '../types';
import { ArrowUpRight, CheckCircle2, Clock, Palette } from 'lucide-react';

interface ServicesSectionProps {
  onSelectService: (service: ServiceItem) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  return (
    <section id="services" className="py-20 bg-zinc-950 border-b border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-2 text-xs font-semibold text-orange-400 uppercase tracking-wider mb-2">
            <Palette className="w-3.5 h-3.5" />
            <span>Capabilities & Studio Disciplines</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Complete creative execution from concept to print & live launch.
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-3 font-light leading-relaxed">
            Every engagement is engineered for clarity, brand cohesion, and commercial impact. No generic cookie-cutter templates—only bespoke South African craftsmanship.
          </p>
        </div>

        {/* Services Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES_LIST.map((service, index) => {
            const indexFormatted = String(index + 1).padStart(2, '0');
            return (
              <div
                key={service.id}
                className="group relative flex flex-col justify-between p-7 rounded-2xl bg-zinc-900/60 hover:bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-all duration-300"
              >
                <div>
                  {/* Human Editorial Numbering & Starting Price */}
                  <div className="flex items-center justify-between pb-4 border-b border-zinc-800/80">
                    <span className="font-display text-sm font-bold text-orange-400">
                      {indexFormatted}.
                    </span>
                    <div className="flex items-center gap-1.5 text-xs text-zinc-400">
                      <span>From</span>
                      <span className="font-mono tabular-nums font-bold text-white">
                        R {service.priceFrom.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div className="mt-5">
                    <h3 className="font-display text-lg font-bold text-white group-hover:text-orange-400 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-300 mt-2 leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {/* Deliverables List */}
                  <div className="mt-6 space-y-2">
                    <p className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
                      Deliverables Included
                    </p>
                    <ul className="space-y-1.5">
                      {service.deliverables.slice(0, 3).map((item, i) => (
                        <li key={i} className="flex items-center gap-2 text-xs text-zinc-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span className="truncate">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Turnaround speed */}
                  <div className="mt-5 flex items-center gap-2 text-xs text-zinc-400">
                    <Clock className="w-3.5 h-3.5 text-zinc-500" />
                    <span>Est. Turnaround: <strong className="text-zinc-300">{service.turnaround}</strong></span>
                  </div>
                </div>

                {/* Bottom Action */}
                <div className="mt-8 pt-4 border-t border-zinc-800/80 flex items-center justify-between">
                  <button
                    onClick={() => onSelectService(service)}
                    className="text-xs font-semibold text-orange-400 group-hover:text-orange-300 flex items-center gap-1.5 cursor-pointer py-1"
                  >
                    <span>Request Quote for {service.title.split('&')[0].trim()}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
