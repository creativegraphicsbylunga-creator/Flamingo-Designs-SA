import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MessageSquare, Calendar, User, ShieldCheck, Menu, X, ArrowUpRight } from 'lucide-react';
import { BUSINESS_INFO } from '../data/mockData';
import { FlamingoLogo } from './FlamingoLogo';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, activeSection }) => {
  const { currentUser, switchUser, users, invoices, setActiveModal } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  // Calculate unpaid balance for client
  const userInvoices = invoices.filter(inv => inv.clientEmail === currentUser.email);
  const unpaidCount = userInvoices.filter(inv => inv.status === 'Unpaid').length;

  const navLinks = [
    { id: 'services', label: 'Services' },
    { id: 'specials', label: 'Printing Specials' },
    { id: 'portfolio', label: 'Our Work' },
    { id: 'quote', label: 'Request Quote' },
    { id: 'upload', label: 'Upload Artwork' },
    { id: 'portal', label: 'Client Portal' }
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* Zone 1: Official Brand Logo with Flamingo Emblem and Tagline */}
        <div className="flex items-center">
          <button
            onClick={() => onNavigate('hero')}
            className="text-left group cursor-pointer focus:outline-none"
            aria-label="Flamingo Designs SA Home"
          >
            <FlamingoLogo size="sm" className="sm:scale-105 origin-left transition-transform duration-200 group-hover:opacity-95" />
          </button>
        </div>

        {/* Zone 2: Clean 4-6 text navigation links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-zinc-300">
          {navLinks.map(link => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`relative py-1 transition-colors hover:text-white cursor-pointer ${
                  isActive ? 'text-orange-400 font-semibold' : 'text-zinc-300'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500 rounded-full" />
                )}
                {link.id === 'portal' && unpaidCount > 0 && currentUser.role === 'client' && (
                  <span className="ml-1.5 inline-block w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Consultation button */}
          <button
            onClick={() => setActiveModal('booking')}
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-zinc-200 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/80 rounded-lg transition-all duration-150 cursor-pointer whitespace-nowrap"
          >
            <Calendar className="w-3.5 h-3.5 text-amber-400" />
            <span>Book Consultation</span>
          </button>

          {/* User Account / Demo Switcher */}
          <div className="relative">
            <button
              onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-zinc-200 bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-700/60 rounded-lg transition-colors cursor-pointer"
              title="Switch demo account"
            >
              <div className="w-5 h-5 rounded-full bg-orange-500/20 text-orange-400 flex items-center justify-center font-bold text-[10px]">
                {currentUser.name.charAt(0)}
              </div>
              <span className="max-w-[100px] truncate">{currentUser.name.split(' ')[0]}</span>
              {currentUser.role === 'admin' ? (
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 ml-0.5" />
              ) : null}
            </button>

            {userDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-zinc-900 border border-zinc-700/80 rounded-xl shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-100">
                <div className="px-3 py-2 border-b border-zinc-800">
                  <p className="text-xs text-zinc-400">Current Role</p>
                  <p className="text-xs font-semibold text-white capitalize">{currentUser.role === 'admin' ? 'Agency Admin' : 'Client Account'}</p>
                  <p className="text-[11px] text-zinc-400 truncate">{currentUser.company}</p>
                </div>
                <div className="py-1">
                  <p className="px-3 py-1 text-[10px] font-semibold text-zinc-500 uppercase tracking-wider">Switch Demo Account</p>
                  {users.map(u => (
                    <button
                      key={u.id}
                      onClick={() => {
                        switchUser(u.id);
                        setUserDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs rounded-lg transition-colors flex items-center justify-between cursor-pointer ${
                        currentUser.id === u.id ? 'bg-orange-500/10 text-orange-400 font-semibold' : 'text-zinc-300 hover:bg-zinc-800'
                      }`}
                    >
                      <div className="truncate">
                        <p className="truncate">{u.name}</p>
                        <p className="text-[10px] text-zinc-400 truncate">{u.company}</p>
                      </div>
                      <span className="text-[10px] text-zinc-400 ml-2 font-mono">{u.role}</span>
                    </button>
                  ))}
                </div>
                <div className="pt-1 border-t border-zinc-800">
                  <button
                    onClick={() => {
                      onNavigate('portal');
                      setUserDropdownOpen(false);
                    }}
                    className="w-full text-center px-3 py-1.5 text-xs text-orange-400 hover:text-orange-300 font-medium cursor-pointer"
                  >
                    Open Client Portal →
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Direct WhatsApp CTA */}
          <a
            href={`https://wa.me/${BUSINESS_INFO.whatsappRaw}?text=${encodeURIComponent('Hi Flamingo Designs SA, I would like to request a quote for design/printing.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg shadow-sm transition-all duration-150 whitespace-nowrap cursor-pointer"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>WhatsApp</span>
          </a>
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={() => onNavigate('portal')}
            className="p-2 text-zinc-300 hover:text-white bg-zinc-900 rounded-lg border border-zinc-800"
            title="Portal"
          >
            <User className="w-4 h-4 text-orange-400" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-zinc-300 hover:text-white bg-zinc-900 rounded-lg border border-zinc-800"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-zinc-950 border-b border-zinc-800 px-4 pt-3 pb-6 space-y-3">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-zinc-800">
            {navLinks.map(link => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                  activeSection === link.id ? 'bg-orange-500/10 text-orange-400 font-semibold' : 'text-zinc-300 hover:bg-zinc-900'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-2 pt-2">
            <button
              onClick={() => {
                setActiveModal('booking');
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-sm font-semibold bg-zinc-900 border border-zinc-700 rounded-lg text-zinc-100"
            >
              <Calendar className="w-4 h-4 text-amber-400" />
              <span>Book Google Consultation</span>
            </button>
            <a
              href={`https://wa.me/${BUSINESS_INFO.whatsappRaw}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-sm font-semibold bg-emerald-600 rounded-lg text-white"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Chat on WhatsApp (+27 83 337 4954)</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
