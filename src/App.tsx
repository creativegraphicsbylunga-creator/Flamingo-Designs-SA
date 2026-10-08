/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SpecialsSection } from './components/SpecialsSection';
import { ServicesSection } from './components/ServicesSection';
import { PortfolioSection } from './components/PortfolioSection';
import { ArtworkUploadSection } from './components/ArtworkUploadSection';
import { QuoteSection } from './components/QuoteSection';
import { ClientPortal } from './components/ClientPortal';
import { ConsultationBookingModal } from './components/ConsultationBookingModal';
import { InvoiceModal } from './components/InvoiceModal';
import { PaymentModal } from './components/PaymentModal';
import { WhatsAppWidget } from './components/WhatsAppWidget';
import { Footer } from './components/Footer';
import { ServiceItem, PrintSpecial, Invoice } from './types';

const MainAppContent: React.FC = () => {
  const {
    activeModal,
    setActiveModal,
    selectedInvoice,
    setSelectedInvoice
  } = useApp();

  const [activeSection, setActiveSection] = useState('hero');
  const [selectedServiceForQuote, setSelectedServiceForQuote] = useState<string | undefined>(undefined);
  const [selectedAddonForQuote, setSelectedAddonForQuote] = useState<string | undefined>(undefined);
  const [paymentInvoice, setPaymentInvoice] = useState<Invoice | null>(null);

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else if (id === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSelectServiceForQuote = (service: ServiceItem) => {
    setSelectedServiceForQuote(service.id);
    scrollToSection('quote');
  };

  const handleSelectSpecialForQuote = (special: PrintSpecial) => {
    if (special.id === 'special-social-posters') {
      setSelectedServiceForQuote('social-media');
      setSelectedAddonForQuote('social_posters_950');
    } else if (special.id === 'special-social-general') {
      setSelectedServiceForQuote('social-media-general');
      setSelectedAddonForQuote('social_general_450');
    } else if (special.id === 'special-web-maintenance') {
      setSelectedServiceForQuote('web-maintenance');
      setSelectedAddonForQuote('web_maintenance_260');
    } else if (special.id === 'special-it-support') {
      setSelectedServiceForQuote('it-support');
      setSelectedAddonForQuote('it_online_1600');
    } else if (special.id === 'special-cards-500') {
      setSelectedServiceForQuote('print-signage');
      setSelectedAddonForQuote('cards_500');
    } else if (special.id === 'special-rollup-banner') {
      setSelectedServiceForQuote('print-signage');
      setSelectedAddonForQuote('pullup_banner');
    } else if (special.id === 'special-starter-web') {
      setSelectedServiceForQuote('web-hosting');
      setSelectedAddonForQuote('hosting_domain');
    } else {
      setSelectedServiceForQuote('social-media');
    }
    scrollToSection('quote');
  };

  const handleOpenUpload = () => {
    scrollToSection('upload');
  };

  const handleOpenInvoiceModal = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
  };

  const handleOpenPaymentModal = (invoice: Invoice) => {
    setPaymentInvoice(invoice);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans selection:bg-orange-500 selection:text-white">
      {/* 3-zone Top Bar Contract Navigation */}
      <Navbar onNavigate={scrollToSection} activeSection={activeSection} />

      {/* Main Page Flow */}
      <main className="flex-1">
        {/* Hero Section */}
        <div id="hero">
          <Hero
            onNavigate={scrollToSection}
            onOpenUpload={handleOpenUpload}
          />
        </div>

        {/* Current Specials & Promotional Packages */}
        <SpecialsSection onSelectSpecialForQuote={handleSelectSpecialForQuote} />

        {/* Core Capabilities & Services */}
        <ServicesSection onSelectService={handleSelectServiceForQuote} />

        {/* Portfolio & Case Studies */}
        <PortfolioSection />

        {/* Interactive Quote Request & Scope Estimator */}
        <QuoteSection
          initialServiceId={selectedServiceForQuote}
          initialAddon={selectedAddonForQuote}
        />

        {/* Pre-flight Artwork File Upload */}
        <ArtworkUploadSection onNavigateToPortal={() => scrollToSection('portal')} />

        {/* Client Management & Invoices Portal */}
        <ClientPortal
          onOpenUpload={handleOpenUpload}
          onOpenInvoice={handleOpenInvoiceModal}
          onOpenPayment={handleOpenPaymentModal}
          onNavigateToQuote={() => scrollToSection('quote')}
        />
      </main>

      {/* Editorial Footer */}
      <Footer
        onNavigate={scrollToSection}
        onOpenBooking={() => setActiveModal('booking')}
      />

      {/* Floating WhatsApp Action Widget */}
      <WhatsAppWidget />

      {/* Modals */}
      <ConsultationBookingModal />

      <InvoiceModal
        invoice={selectedInvoice}
        onClose={() => setSelectedInvoice(null)}
        onOpenPayment={handleOpenPaymentModal}
      />

      <PaymentModal
        invoice={paymentInvoice}
        onClose={() => setPaymentInvoice(null)}
      />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
