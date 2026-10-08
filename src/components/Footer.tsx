import React from 'react';
import { BUSINESS_INFO } from '../data/mockData';
import { MessageSquare, Mail, Phone, MapPin, Calendar, ArrowUpRight } from 'lucide-react';
import { FlamingoLogo } from './FlamingoLogo';

interface FooterProps {
  onNavigate: (section: string) => void;
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenBooking }) => {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-800 text-zinc-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Col 1 & 2: Brand Lockup & Value */}
          <div className="lg:col-span-2 space-y-4">
            <FlamingoLogo size="sm" className="mb-2" />

            <p className="text-zinc-400 text-xs leading-relaxed max-w-sm">
              South African creative agency and commercial prepress studio specializing in high-impact graphic design, litho & digital print runs, responsive web development, and client management.
            </p>

            <div className="space-y-2 text-zinc-400 text-xs pt-1">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-orange-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-zinc-200 font-medium">Van Riebeeck Ave, Edenvale, 1609</p>
                  <p className="text-[11px] text-zinc-400">Harding Street, Estcourt KZN</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                <a href={`tel:${BUSINESS_INFO.phone.replace(/[^0-9+]/g, '')}`} className="hover:text-white transition-colors font-mono">
                  {BUSINESS_INFO.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                <a href={`mailto:${BUSINESS_INFO.email}`} className="hover:text-white transition-colors font-mono">
                  {BUSINESS_INFO.email}
                </a>
              </div>
            </div>
          </div>

          {/* Col 3: Services */}
          <div className="space-y-3">
            <p className="font-display text-xs font-bold text-white uppercase tracking-wider">Services</p>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-white transition-colors cursor-pointer">
                  Graphic & Print Design
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-white transition-colors cursor-pointer">
                  Web Design & Fast Hosting
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-white transition-colors cursor-pointer">
                  Brand Identity & Logo Suite
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-white transition-colors cursor-pointer">
                  Commercial Litho Print
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-white transition-colors cursor-pointer">
                  Socials + Posters (R950/mo)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-white transition-colors cursor-pointer">
                  Website Maintenance (from R260/mo)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-white transition-colors cursor-pointer">
                  General IT Support (from R1,600/mo)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Quick Portals & Specials */}
          <div className="space-y-3">
            <p className="font-display text-xs font-bold text-white uppercase tracking-wider">Client Center</p>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onNavigate('portal')} className="text-orange-400 hover:text-orange-300 font-semibold transition-colors cursor-pointer">
                  Client Portal & Invoices
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('specials')} className="hover:text-white transition-colors cursor-pointer">
                  500 Cards R750 Special
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('upload')} className="hover:text-white transition-colors cursor-pointer">
                  Artwork Pre-Press Upload
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('portfolio')} className="hover:text-white transition-colors cursor-pointer">
                  Our Work & Case Studies
                </button>
              </li>
              <li>
                <button onClick={onOpenBooking} className="hover:text-white transition-colors cursor-pointer flex items-center gap-1">
                  <span>Google Meet Consult</span>
                  <ArrowUpRight className="w-3 h-3" />
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Banking / Settlement Reference */}
          <div className="space-y-3">
            <p className="font-display text-xs font-bold text-white uppercase tracking-wider">EFT Settlement</p>
            <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-xl space-y-1 text-[11px]">
              <p className="text-zinc-200 font-semibold">{BUSINESS_INFO.bankDetails.bank}</p>
              <p className="text-zinc-400 font-mono">Acc: {BUSINESS_INFO.bankDetails.accountNumber}</p>
              <p className="text-zinc-400 font-mono">Branch: {BUSINESS_INFO.bankDetails.branchCode}</p>
              <p className="text-orange-400 font-mono">Ref: Inv Number</p>
            </div>
            <a
              href={`https://wa.me/${BUSINESS_INFO.whatsappRaw}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 text-xs font-semibold"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Direct WhatsApp Desk</span>
            </a>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-12 mt-12 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-400">
          <p>© {new Date().getFullYear()} Flamingo Designs SA. All rights reserved. Registered South African Creative Studio.</p>
          <div className="flex items-center gap-4">
            <span>ZAR (R) Pricing</span>
            <span aria-hidden="true">·</span>
            <span>VAT Registered</span>
            <span aria-hidden="true">·</span>
            <span>POPIA & GDPR Compliant</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
