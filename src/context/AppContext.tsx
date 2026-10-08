import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User,
  Invoice,
  ArtworkFile,
  ProofItem,
  QuoteRequest,
  Booking
} from '../types';
import {
  INITIAL_USERS,
  INITIAL_INVOICES,
  INITIAL_ARTWORK_FILES,
  INITIAL_PROOFS,
  INITIAL_QUOTES,
  INITIAL_BOOKINGS
} from '../data/mockData';

interface AppContextType {
  currentUser: User;
  setCurrentUser: (user: User) => void;
  users: User[];
  invoices: Invoice[];
  artworkFiles: ArtworkFile[];
  proofs: ProofItem[];
  quotes: QuoteRequest[];
  bookings: Booking[];
  activeModal: string | null;
  setActiveModal: (modal: string | null) => void;
  selectedInvoice: Invoice | null;
  setSelectedInvoice: (invoice: Invoice | null) => void;
  selectedProof: ProofItem | null;
  setSelectedProof: (proof: ProofItem | null) => void;
  
  // Actions
  addQuoteRequest: (quoteData: Partial<QuoteRequest>) => QuoteRequest;
  updateQuoteStatus: (id: string, status: QuoteRequest['status']) => void;
  addArtworkFile: (file: { fileName: string; fileSize: number; fileType: string; notes?: string; jobReference?: string; previewUrl?: string }) => ArtworkFile;
  updateProofStatus: (id: string, status: ProofItem['status'], feedback?: string) => void;
  addBooking: (bookingData: Omit<Booking, 'id' | 'createdAt' | 'status' | 'googleMeetUrl'>) => Booking;
  markInvoicePaid: (id: string, paymentMethod?: Invoice['paymentMethod']) => void;
  createInvoice: (invoiceData: Omit<Invoice, 'id' | 'vatAmount' | 'total'>) => Invoice;
  switchUser: (userId: string) => void;
  resetAllData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User>(() => {
    const saved = localStorage.getItem('flamingo_user');
    return saved ? JSON.parse(saved) : INITIAL_USERS[0]; // Sipho Khumalo by default
  });

  const [invoices, setInvoices] = useState<Invoice[]>(() => {
    const saved = localStorage.getItem('flamingo_invoices');
    return saved ? JSON.parse(saved) : INITIAL_INVOICES;
  });

  const [artworkFiles, setArtworkFiles] = useState<ArtworkFile[]>(() => {
    const saved = localStorage.getItem('flamingo_artwork');
    return saved ? JSON.parse(saved) : INITIAL_ARTWORK_FILES;
  });

  const [proofs, setProofs] = useState<ProofItem[]>(() => {
    const saved = localStorage.getItem('flamingo_proofs');
    return saved ? JSON.parse(saved) : INITIAL_PROOFS;
  });

  const [quotes, setQuotes] = useState<QuoteRequest[]>(() => {
    const saved = localStorage.getItem('flamingo_quotes');
    return saved ? JSON.parse(saved) : INITIAL_QUOTES;
  });

  const [bookings, setBookings] = useState<Booking[]>(() => {
    const saved = localStorage.getItem('flamingo_bookings');
    return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
  });

  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [selectedProof, setSelectedProof] = useState<ProofItem | null>(null);

  // Sync state to LocalStorage
  useEffect(() => {
    localStorage.setItem('flamingo_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('flamingo_invoices', JSON.stringify(invoices));
  }, [invoices]);

  useEffect(() => {
    localStorage.setItem('flamingo_artwork', JSON.stringify(artworkFiles));
  }, [artworkFiles]);

  useEffect(() => {
    localStorage.setItem('flamingo_proofs', JSON.stringify(proofs));
  }, [proofs]);

  useEffect(() => {
    localStorage.setItem('flamingo_quotes', JSON.stringify(quotes));
  }, [quotes]);

  useEffect(() => {
    localStorage.setItem('flamingo_bookings', JSON.stringify(bookings));
  }, [bookings]);

  const switchUser = (userId: string) => {
    const found = INITIAL_USERS.find(u => u.id === userId);
    if (found) {
      setCurrentUser(found);
    }
  };

  const addQuoteRequest = (quoteData: Partial<QuoteRequest>): QuoteRequest => {
    const newQuote: QuoteRequest = {
      id: `quote_${Date.now()}`,
      name: quoteData.name || currentUser.name,
      email: quoteData.email || currentUser.email,
      phone: quoteData.phone || currentUser.phone,
      company: quoteData.company || currentUser.company,
      category: quoteData.category || 'Graphic Design',
      estimatedBudget: quoteData.estimatedBudget || 'Under R 2,500',
      timeline: quoteData.timeline || 'Standard (1-2 weeks)',
      brief: quoteData.brief || '',
      selectedAddons: quoteData.selectedAddons || [],
      submittedAt: new Date().toISOString().split('T')[0],
      status: 'Pending',
      estimatedCost: quoteData.estimatedCost
    };

    setQuotes(prev => [newQuote, ...prev]);
    return newQuote;
  };

  const updateQuoteStatus = (id: string, status: QuoteRequest['status']) => {
    setQuotes(prev => prev.map(q => q.id === id ? { ...q, status } : q));
  };

  const addArtworkFile = (file: {
    fileName: string;
    fileSize: number;
    fileType: string;
    notes?: string;
    jobReference?: string;
    previewUrl?: string;
  }): ArtworkFile => {
    const newFile: ArtworkFile = {
      id: `art_${Date.now()}`,
      fileName: file.fileName,
      fileSize: file.fileSize,
      fileType: file.fileType,
      uploadedAt: new Date().toISOString().split('T')[0],
      clientName: currentUser.name,
      clientEmail: currentUser.email,
      status: 'Uploaded',
      notes: file.notes || 'Client artwork file submission',
      jobReference: file.jobReference || 'General Order',
      previewUrl: file.previewUrl
    };

    setArtworkFiles(prev => [newFile, ...prev]);
    return newFile;
  };

  const updateProofStatus = (id: string, status: ProofItem['status'], feedback?: string) => {
    setProofs(prev => prev.map(p => {
      if (p.id === id) {
        return {
          ...p,
          status,
          feedbackNotes: feedback ? feedback : p.feedbackNotes
        };
      }
      return p;
    }));
  };

  const addBooking = (bookingData: Omit<Booking, 'id' | 'createdAt' | 'status' | 'googleMeetUrl'>): Booking => {
    const code = Math.random().toString(36).substring(2, 6);
    const newBooking: Booking = {
      ...bookingData,
      id: `book_${Date.now()}`,
      status: 'Confirmed',
      googleMeetUrl: `https://meet.google.com/flm-meet-${code}`,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setBookings(prev => [newBooking, ...prev]);
    return newBooking;
  };

  const markInvoicePaid = (id: string, paymentMethod: Invoice['paymentMethod'] = 'EFT') => {
    setInvoices(prev => prev.map(inv => {
      if (inv.id === id) {
        return {
          ...inv,
          status: 'Paid',
          paidAt: new Date().toISOString().split('T')[0],
          paymentMethod
        };
      }
      return inv;
    }));
  };

  const createInvoice = (invoiceData: Omit<Invoice, 'id' | 'vatAmount' | 'total'>): Invoice => {
    const vat = invoiceData.subtotal * (invoiceData.vatRate || 0.15);
    const total = invoiceData.subtotal + vat;
    const newInv: Invoice = {
      ...invoiceData,
      id: `inv_${Date.now()}`,
      vatAmount: Math.round(vat * 100) / 100,
      total: Math.round(total * 100) / 100
    };

    setInvoices(prev => [newInv, ...prev]);
    return newInv;
  };

  const resetAllData = () => {
    localStorage.removeItem('flamingo_invoices');
    localStorage.removeItem('flamingo_artwork');
    localStorage.removeItem('flamingo_proofs');
    localStorage.removeItem('flamingo_quotes');
    localStorage.removeItem('flamingo_bookings');
    localStorage.removeItem('flamingo_user');
    setInvoices(INITIAL_INVOICES);
    setArtworkFiles(INITIAL_ARTWORK_FILES);
    setProofs(INITIAL_PROOFS);
    setQuotes(INITIAL_QUOTES);
    setBookings(INITIAL_BOOKINGS);
    setCurrentUser(INITIAL_USERS[0]);
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        users: INITIAL_USERS,
        invoices,
        artworkFiles,
        proofs,
        quotes,
        bookings,
        activeModal,
        setActiveModal,
        selectedInvoice,
        setSelectedInvoice,
        selectedProof,
        setSelectedProof,
        addQuoteRequest,
        updateQuoteStatus,
        addArtworkFile,
        updateProofStatus,
        addBooking,
        markInvoicePaid,
        createInvoice,
        switchUser,
        resetAllData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
