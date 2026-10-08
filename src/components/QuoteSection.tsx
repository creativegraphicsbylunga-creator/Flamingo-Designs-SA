import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { BUSINESS_INFO, SERVICES_LIST } from '../data/mockData';
import { Calculator, MessageSquare, Check, ArrowRight, Sparkles, Send } from 'lucide-react';

interface QuoteSectionProps {
  initialServiceId?: string;
  initialAddon?: string;
}

export const QuoteSection: React.FC<QuoteSectionProps> = ({ initialServiceId, initialAddon }) => {
  const { currentUser, addQuoteRequest } = useApp();

  const [selectedCategory, setSelectedCategory] = useState(initialServiceId || 'graphic-design');
  const [selectedAddons, setSelectedAddons] = useState<string[]>(initialAddon ? [initialAddon] : []);
  const [timeline, setTimeline] = useState('Standard (7-14 Days)');
  const [brief, setBrief] = useState('');
  
  // Client contact fields
  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [phone, setPhone] = useState(currentUser.phone);
  const [company, setCompany] = useState(currentUser.company);

  const [submittedQuoteId, setSubmittedQuoteId] = useState<string | null>(null);

  // Sync if initialServiceId changes
  useEffect(() => {
    if (initialServiceId) {
      setSelectedCategory(initialServiceId);
    }
    if (initialAddon && !selectedAddons.includes(initialAddon)) {
      setSelectedAddons(prev => [...prev, initialAddon]);
    }
  }, [initialServiceId, initialAddon]);

  // Update form if currentUser changes
  useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.email);
    setPhone(currentUser.phone);
    setCompany(currentUser.company);
  }, [currentUser]);

  const addonOptions = [
    { id: 'social_posters_950', label: 'Socials: Poster Designs & Publish (R950/mo)', price: 950 },
    { id: 'social_general_450', label: 'General Socials: Posting & Geo-Targeting - No Art (R450/mo)', price: 450 },
    { id: 'web_maintenance_260', label: 'Monthly Website Maintenance, Security & Backup (R260/mo)', price: 260 },
    { id: 'it_online_1600', label: 'IT Support: Online Helpdesk & Cloud Backups (R1,600/mo)', price: 1600 },
    { id: 'it_onsite_5600', label: 'IT Support: Online + Monthly Onsite Office Visits (R5,600/mo)', price: 5600 },
    { id: 'cards_500', label: '500 Business Cards Print Special (350gsm)', price: 750 },
    { id: 'pullup_banner', label: 'Executive Pull-Up Banner (850x2000mm)', price: 890 },
    { id: 'hosting_domain', label: '1-Year .co.za Domain & NVMe Hosting', price: 950 },
    { id: 'gold_foil', label: 'Metallic Gold Foil Stamping Finish', price: 450 },
    { id: 'rush_48h', label: 'Express 48-Hour Priority Studio Rush', price: 650 }
  ];

  // Calculate live dynamic quote estimate
  const baseService = SERVICES_LIST.find(s => s.id === selectedCategory) || SERVICES_LIST[0];
  const basePrice = baseService.priceFrom;
  const addonsTotal = selectedAddons.reduce((sum, addonId) => {
    const item = addonOptions.find(a => a.id === addonId);
    return sum + (item ? item.price : 0);
  }, 0);
  const estimatedTotal = basePrice + addonsTotal;

  const toggleAddon = (id: string) => {
    if (selectedAddons.includes(id)) {
      setSelectedAddons(selectedAddons.filter(a => a !== id));
    } else {
      setSelectedAddons([...selectedAddons, id]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const addonLabels = selectedAddons.map(id => {
      const match = addonOptions.find(a => a.id === id);
      return match ? match.label : id;
    });

    const newQuote = addQuoteRequest({
      name,
      email,
      phone,
      company,
      category: baseService.title,
      estimatedBudget: `R ${estimatedTotal.toLocaleString()}`,
      timeline,
      brief,
      selectedAddons: addonLabels,
      estimatedCost: estimatedTotal
    });

    setSubmittedQuoteId(newQuote.id);
  };

  const getWhatsAppQuoteMessage = () => {
    const addonNames = selectedAddons
      .map(id => addonOptions.find(a => a.id === id)?.label)
      .filter(Boolean)
      .join(', ');

    return `Hi Flamingo Designs SA,

I would like to request an official quote:
*Client:* ${name} (${company || 'Individual'})
*Phone:* ${phone}
*Service:* ${baseService.title}
*Estimated Scope:* R ${estimatedTotal.toLocaleString()}
*Selected Add-ons:* ${addonNames || 'None'}
*Timeline:* ${timeline}
*Brief:* ${brief || 'Standard specifications'}

Please provide lead time and invoice details.`;
  };

  return (
    <section id="quote" className="py-20 bg-zinc-950 border-b border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold text-orange-400 uppercase tracking-wider mb-2">
            <Calculator className="w-3.5 h-3.5" />
            <span>Interactive Estimator & Project Brief</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Request an Accurate Project Quote
          </h2>
          <p className="text-zinc-400 text-sm mt-2 font-light leading-relaxed">
            Configure your project requirements below to see an instant baseline estimate in South African Rand (ZAR), then submit for a formal itemized quotation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Form Side */}
          <div className="lg:col-span-8 bg-zinc-900/70 border border-zinc-800 rounded-2xl p-6 sm:p-8">
            {submittedQuoteId ? (
              <div className="text-center py-10 space-y-5 animate-in fade-in zoom-in-95 duration-200">
                <div className="w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-400 mx-auto flex items-center justify-center border border-emerald-500/30">
                  <Check className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-display text-2xl font-bold text-white">
                    Quote Request Received!
                  </h3>
                  <p className="text-xs text-orange-400 font-mono mt-1">
                    Reference ID: {submittedQuoteId}
                  </p>
                </div>
                <p className="text-sm text-zinc-300 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="text-white">{name}</strong>. Our creative director has logged your brief. An itemized invoice proposal is being prepared.
                </p>

                {/* Direct 1-Click WhatsApp push */}
                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href={`https://wa.me/${BUSINESS_INFO.whatsappRaw}?text=${encodeURIComponent(getWhatsAppQuoteMessage())}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Send Quote via WhatsApp Direct (+27 83 337 4954)</span>
                  </a>

                  <button
                    onClick={() => setSubmittedQuoteId(null)}
                    className="w-full sm:w-auto px-5 py-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-medium text-xs rounded-xl cursor-pointer"
                  >
                    Create Another Quote
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* 1. Service Selection */}
                <div>
                  <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2.5">
                    1. Select Core Service Discipline
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {SERVICES_LIST.map(service => (
                      <button
                        type="button"
                        key={service.id}
                        onClick={() => setSelectedCategory(service.id)}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                          selectedCategory === service.id
                            ? 'bg-orange-500/10 border-orange-500/80 text-white shadow-sm ring-1 ring-orange-500/30'
                            : 'bg-zinc-950/60 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                        }`}
                      >
                        <p className="text-xs font-semibold truncate">{service.title}</p>
                        <p className="text-[11px] font-mono text-orange-400 mt-1">
                          From R {service.priceFrom.toLocaleString()}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Popular Add-ons */}
                <div>
                  <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2.5">
                    2. Optional Add-ons & Commercial Packages
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {addonOptions.map(addon => {
                      const isChecked = selectedAddons.includes(addon.id);
                      return (
                        <div
                          key={addon.id}
                          onClick={() => toggleAddon(addon.id)}
                          className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-colors ${
                            isChecked
                              ? 'bg-orange-500/10 border-orange-500/60 text-white'
                              : 'bg-zinc-950/40 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 truncate pr-2">
                            <div className={`w-4 h-4 rounded flex items-center justify-center border text-[10px] ${
                              isChecked ? 'bg-orange-500 border-orange-500 text-white' : 'border-zinc-600'
                            }`}>
                              {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                            </div>
                            <span className="text-xs font-medium truncate">{addon.label}</span>
                          </div>
                          <span className="text-xs font-mono tabular-nums text-zinc-300 whitespace-nowrap">
                            +R {addon.price}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 3. Client details */}
                <div className="pt-2 border-t border-zinc-800/80">
                  <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-3">
                    3. Contact & Business Details
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs text-zinc-400 mb-1">Your Full Name</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="e.g. Sipho Khumalo"
                        className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-700 rounded-xl text-xs text-white focus:outline-none focus:border-orange-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-zinc-400 mb-1">Company / Trading Name</label>
                      <input
                        type="text"
                        value={company}
                        onChange={e => setCompany(e.target.value)}
                        placeholder="e.g. Horizon Safari Co."
                        className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-700 rounded-xl text-xs text-white focus:outline-none focus:border-orange-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-zinc-400 mb-1">Email Address</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="e.g. sipho@company.co.za"
                        className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-700 rounded-xl text-xs text-white focus:outline-none focus:border-orange-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-zinc-400 mb-1">WhatsApp / Phone Number</label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        placeholder="e.g. +27 83 123 4567"
                        className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-700 rounded-xl text-xs text-white focus:outline-none focus:border-orange-500"
                      />
                    </div>
                  </div>
                </div>

                {/* 4. Timeline & Brief */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs text-zinc-400 mb-1">Desired Project Timeline</label>
                    <select
                      value={timeline}
                      onChange={e => setTimeline(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-700 rounded-xl text-xs text-white focus:outline-none focus:border-orange-500 cursor-pointer"
                    >
                      <option value="Urgent (2-3 Days Rush)">Urgent (2-3 Days Rush)</option>
                      <option value="Standard (7-14 Days)">Standard (7-14 Days)</option>
                      <option value="Flexible (2-4 Weeks)">Flexible (2-4 Weeks)</option>
                      <option value="Ongoing Monthly Retainer">Ongoing Monthly Retainer</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs text-zinc-400 mb-1">Delivery Destination</label>
                    <input
                      type="text"
                      placeholder="e.g. Gauteng, Western Cape, KZN or Digital"
                      className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-700 rounded-xl text-xs text-white focus:outline-none focus:border-orange-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-zinc-400 mb-1">Project Scope & Deliverable Notes</label>
                  <textarea
                    rows={3}
                    value={brief}
                    onChange={e => setBrief(e.target.value)}
                    placeholder="Describe your design objectives, dimensions, print quantities, or website features needed..."
                    className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-700 rounded-xl text-xs text-white focus:outline-none focus:border-orange-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-gradient-to-r from-orange-500 via-amber-500 to-rose-600 hover:from-orange-600 hover:to-rose-700 text-white font-semibold text-xs rounded-xl shadow-lg shadow-orange-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Quote Request for R {estimatedTotal.toLocaleString()}</span>
                </button>

              </form>
            )}
          </div>

          {/* Right Live Estimator Card */}
          <div className="lg:col-span-4 space-y-5">
            <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-5 sticky top-24">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Live Scope Summary</span>
                <span className="px-2 py-0.5 rounded bg-orange-500/10 text-orange-400 text-[11px] font-mono font-semibold">
                  ZAR (R)
                </span>
              </div>

              {/* Breakdown */}
              <div className="space-y-3 text-xs">
                <div className="flex justify-between items-center text-zinc-300">
                  <span>{baseService.title}</span>
                  <span className="font-mono tabular-nums font-semibold">R {basePrice.toLocaleString()}</span>
                </div>

                {selectedAddons.length > 0 && (
                  <div className="space-y-1.5 pt-2 border-t border-zinc-800/60">
                    <span className="text-[11px] text-zinc-400 uppercase tracking-wider font-semibold block">Add-ons:</span>
                    {selectedAddons.map(id => {
                      const item = addonOptions.find(a => a.id === id);
                      if (!item) return null;
                      return (
                        <div key={id} className="flex justify-between text-zinc-400 text-[11px]">
                          <span className="truncate pr-2">{item.label}</span>
                          <span className="font-mono tabular-nums text-zinc-300">+R {item.price}</span>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Subtotal */}
                <div className="pt-3 border-t border-zinc-800 flex justify-between items-baseline">
                  <div>
                    <span className="text-xs text-zinc-400 block">Estimated Baseline</span>
                    <span className="text-[10px] text-zinc-400">Excl. SARS VAT 15%</span>
                  </div>
                  <div className="text-right">
                    <span className="font-display text-2xl font-extrabold text-white font-mono tabular-nums">
                      R {estimatedTotal.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp fast response callout */}
              <div className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800 space-y-2">
                <p className="text-xs font-semibold text-white">Need an immediate price confirmation?</p>
                <p className="text-[11px] text-zinc-400 leading-relaxed">
                  WhatsApp our studio with your artwork or concept for a quotation within 30 minutes.
                </p>
                <a
                  href={`https://wa.me/${BUSINESS_INFO.whatsappRaw}?text=${encodeURIComponent(getWhatsAppQuoteMessage())}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 px-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-lg flex items-center justify-center gap-1.5 cursor-pointer mt-2"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp Direct Inquiry</span>
                </a>
              </div>

              {/* Studio Contact */}
              <div className="text-[11px] text-zinc-400 space-y-1 pt-1">
                <p>Email: <strong className="text-zinc-300 font-mono">{BUSINESS_INFO.email}</strong></p>
                <p>Phone: <strong className="text-zinc-300 font-mono">{BUSINESS_INFO.phone}</strong></p>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
