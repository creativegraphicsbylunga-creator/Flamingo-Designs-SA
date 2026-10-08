import React, { useState } from 'react';
import { BUSINESS_INFO } from '../data/mockData';
import { MessageSquare, X, Send, Sparkles, CheckCircle2 } from 'lucide-react';

export const WhatsAppWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [customMessage, setCustomMessage] = useState('');

  const quickPrompts = [
    'Hi Flamingo Designs, I would like Socials Management + Poster Designs (R950/mo).',
    'Hi, I would like General Socials Management without designs (R450/mo).',
    'Hi, I need Monthly Website Maintenance & Security Backups (R260/mo).',
    'Hi, I would like to inquire about General IT Support retainers (from R1,600/mo).',
    'Hi, I would like to order the 500 Business Cards special (R750).'
  ];

  const handleSendPrompt = (text: string) => {
    const url = `https://wa.me/${BUSINESS_INFO.whatsappRaw}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customMessage.trim()) return;
    handleSendPrompt(customMessage);
    setCustomMessage('');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      
      {/* Quick Chat Popup */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 bg-zinc-900 border border-zinc-700/90 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
          
          {/* Header */}
          <div className="p-4 bg-emerald-600 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center font-bold text-sm">
                FD
              </div>
              <div>
                <p className="font-semibold text-xs leading-none">Flamingo Designs SA</p>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
                  <span className="text-[10px] text-emerald-100">WhatsApp Desk Active (+27 83 337 4954)</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-white/10 rounded-lg transition-colors cursor-pointer text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 space-y-3 bg-zinc-950/90 text-xs">
            <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-xl space-y-1">
              <p className="text-zinc-200 font-medium">Hello! How can we bring your vision to life?</p>
              <p className="text-zinc-400 text-[11px]">
                Click a quick topic or type your message below to start a direct WhatsApp chat with our South African studio.
              </p>
            </div>

            {/* Quick prompts */}
            <div className="space-y-1.5">
              <p className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">Quick Enquiries</p>
              {quickPrompts.map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => handleSendPrompt(prompt)}
                  className="w-full text-left p-2.5 rounded-lg bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800/80 text-zinc-300 hover:text-white transition-colors cursor-pointer text-[11px] leading-snug truncate"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Custom message input */}
            <form onSubmit={handleCustomSubmit} className="pt-2 flex items-center gap-2 border-t border-zinc-800">
              <input
                type="text"
                value={customMessage}
                onChange={e => setCustomMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500"
              />
              <button
                type="submit"
                className="p-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl cursor-pointer"
                aria-label="Send WhatsApp message"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center gap-2.5 px-4 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow-2xl shadow-emerald-950/50 transition-all duration-200 cursor-pointer hover:scale-105"
        aria-label="Open WhatsApp conversation"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
        </span>
        <MessageSquare className="w-4 h-4" />
        <span className="hidden sm:inline-block font-medium">Chat on WhatsApp</span>
      </button>

    </div>
  );
};
