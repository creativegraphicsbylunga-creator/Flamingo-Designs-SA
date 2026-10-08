export type UserRole = 'client' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  company: string;
  phone: string;
  role: UserRole;
  avatar?: string;
}

export type ServiceCategory = 
  | 'graphic-design'
  | 'web-hosting'
  | 'brand-identity'
  | 'print-signage'
  | 'video-animation'
  | 'social-media'
  | 'web-maintenance'
  | 'it-support';

export interface ServiceItem {
  id: string;
  title: string;
  category: ServiceCategory;
  priceFrom: number; // in ZAR
  turnaround: string;
  description: string;
  deliverables: string[];
  features: string[];
}

export interface PortfolioItem {
  id: string;
  title: string;
  client: string;
  category: 'Branding' | 'Web Design' | 'Print & Signage' | 'Social Media';
  year: string;
  coverImage: string;
  tags: string[];
  outcome: string;
  description: string;
  challenge: string;
  solution: string;
  deliverables: string[];
}

export interface PrintSpecial {
  id: string;
  title: string;
  originalPrice: number;
  specialPrice: number;
  unit: string;
  turnaround: string;
  badge?: string;
  description: string;
  specs: string[];
  image: string;
  popular?: boolean;
}

export interface ArtworkFile {
  id: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  uploadedAt: string;
  clientName: string;
  clientEmail: string;
  notes?: string;
  status: 'Uploaded' | 'Pre-flight Verified' | 'Proof Ready' | 'Print Ready' | 'Approved' | 'In Print';
  previewUrl?: string;
  jobReference?: string;
}

export interface ProofItem {
  id: string;
  title: string;
  jobReference: string;
  version: string;
  previewUrl: string;
  specs: string;
  uploadedAt: string;
  status: 'Pending Review' | 'Approved' | 'Revisions Requested';
  feedbackNotes?: string;
}

export interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  clientName: string;
  clientEmail: string;
  clientCompany: string;
  clientPhone: string;
  clientVat?: string;
  issueDate: string;
  dueDate: string;
  items: InvoiceItem[];
  subtotal: number;
  vatRate: number; // 0.15 for 15% VAT
  vatAmount: number;
  total: number;
  status: 'Paid' | 'Unpaid' | 'Overdue';
  paidAt?: string;
  paymentMethod?: 'EFT' | 'PayFast' | 'SnapScan' | 'Card';
  notes?: string;
}

export interface QuoteRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  category: string;
  estimatedBudget: string;
  timeline: string;
  brief: string;
  selectedAddons: string[];
  submittedAt: string;
  status: 'Pending' | 'Contacted' | 'Quoted' | 'Converted to Invoice';
  estimatedCost?: number;
}

export interface Booking {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  company: string;
  consultationType: string;
  date: string;
  time: string;
  notes?: string;
  googleMeetUrl: string;
  status: 'Confirmed' | 'Completed' | 'Cancelled';
  createdAt: string;
}
