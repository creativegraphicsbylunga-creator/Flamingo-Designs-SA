import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BUSINESS_INFO } from '../data/mockData';
import { Invoice, ProofItem, QuoteRequest } from '../types';
import {
  FileText,
  CreditCard,
  CheckCircle2,
  Clock,
  AlertCircle,
  Upload,
  Eye,
  Check,
  MessageSquare,
  ShieldCheck,
  Plus,
  RefreshCw,
  Calendar,
  Layers,
  ArrowRight,
  Printer
} from 'lucide-react';

interface ClientPortalProps {
  onOpenUpload: () => void;
  onOpenInvoice: (invoice: Invoice) => void;
  onOpenPayment: (invoice: Invoice) => void;
  onNavigateToQuote: () => void;
}

export const ClientPortal: React.FC<ClientPortalProps> = ({
  onOpenUpload,
  onOpenInvoice,
  onOpenPayment,
  onNavigateToQuote
}) => {
  const {
    currentUser,
    switchUser,
    users,
    invoices,
    proofs,
    artworkFiles,
    quotes,
    bookings,
    updateProofStatus,
    updateQuoteStatus,
    createInvoice,
    resetAllData
  } = useApp();

  const [activeTab, setActiveTab] = useState<'invoices' | 'proofs' | 'artwork' | 'admin'>('invoices');
  const [invoiceFilter, setInvoiceFilter] = useState<'all' | 'unpaid' | 'paid'>('all');
  const [revisionFeedback, setRevisionFeedback] = useState<{ [key: string]: string }>({});
  const [activeRevisionId, setActiveRevisionId] = useState<string | null>(null);

  // Admin New Invoice Form State
  const [newInvClientEmail, setNewInvClientEmail] = useState(users[0].email);
  const [newInvDesc, setNewInvDesc] = useState('');
  const [newInvQty, setNewInvQty] = useState(1);
  const [newInvPrice, setNewInvPrice] = useState(750);
  const [adminInvSuccess, setAdminInvSuccess] = useState(false);

  // Filter items by client if not admin
  const isAdmin = currentUser.role === 'admin';
  const displayInvoices = isAdmin
    ? invoices
    : invoices.filter(inv => inv.clientEmail === currentUser.email);

  const filteredInvoices = displayInvoices.filter(inv => {
    if (invoiceFilter === 'unpaid') return inv.status === 'Unpaid';
    if (invoiceFilter === 'paid') return inv.status === 'Paid';
    return true;
  });

  const displayProofs = isAdmin
    ? proofs
    : proofs.filter(p => {
        // match job ref
        const matchingInvoices = displayInvoices.map(i => i.invoiceNumber);
        return matchingInvoices.includes(p.jobReference) || p.jobReference === 'FD-2026-084';
      });

  const displayArtwork = isAdmin
    ? artworkFiles
    : artworkFiles.filter(a => a.clientEmail === currentUser.email);

  // Calculate outstanding balance
  const outstandingBalance = displayInvoices
    .filter(inv => inv.status === 'Unpaid')
    .reduce((sum, inv) => sum + inv.total, 0);

  const handleApproveProof = (proofId: string) => {
    updateProofStatus(proofId, 'Approved', `Approved for production by ${currentUser.name} on ${new Date().toISOString().split('T')[0]}`);
  };

  const handleSubmitRevision = (proofId: string) => {
    const text = revisionFeedback[proofId] || 'Revisions requested by client.';
    updateProofStatus(proofId, 'Revisions Requested', text);
    setActiveRevisionId(null);
  };

  const handleAdminCreateInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    const targetUser = users.find(u => u.email === newInvClientEmail) || users[0];
    const totalLine = newInvQty * newInvPrice;

    const count = invoices.length + 1;
    const invNumber = `FD-2026-${String(count).padStart(3, '0')}`;

    createInvoice({
      invoiceNumber: invNumber,
      clientName: targetUser.name,
      clientEmail: targetUser.email,
      clientCompany: targetUser.company,
      clientPhone: targetUser.phone,
      issueDate: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
      items: [
        {
          description: newInvDesc || 'Commercial Design & Print Service',
          quantity: newInvQty,
          unitPrice: newInvPrice,
          total: totalLine
        }
      ],
      subtotal: totalLine,
      vatRate: 0.15,
      status: 'Unpaid',
      notes: `Invoice issued by Flamingo Admin for ${targetUser.company}. Please reference ${invNumber} on EFT transfer.`
    });

    setAdminInvSuccess(true);
    setNewInvDesc('');
    setTimeout(() => setAdminInvSuccess(false), 3000);
  };

  const handleConvertQuoteToInvoice = (quote: QuoteRequest) => {
    const count = invoices.length + 1;
    const invNumber = `FD-2026-${String(count).padStart(3, '0')}`;
    const subtotal = quote.estimatedCost || 1500;

    createInvoice({
      invoiceNumber: invNumber,
      clientName: quote.name,
      clientEmail: quote.email,
      clientCompany: quote.company || quote.name,
      clientPhone: quote.phone,
      issueDate: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
      items: [
        {
          description: `${quote.category}: ${quote.brief || 'Project scope deliverables'}`,
          quantity: 1,
          unitPrice: subtotal,
          total: subtotal
        }
      ],
      subtotal: subtotal,
      vatRate: 0.15,
      status: 'Unpaid',
      notes: `Generated from Quote Request ${quote.id}. Timeline: ${quote.timeline}.`
    });

    updateQuoteStatus(quote.id, 'Converted to Invoice');
  };

  return (
    <section id="portal" className="py-16 bg-zinc-950 border-b border-zinc-800/80 min-h-[800px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Header Card */}
        <div className="p-6 sm:p-8 rounded-2xl bg-zinc-900 border border-zinc-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-orange-400">
              {isAdmin ? (
                <span className="flex items-center gap-1 text-emerald-400">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Flamingo Admin Mode</span>
                </span>
              ) : (
                <span>Client Account Dashboard</span>
              )}
              <span aria-hidden="true">·</span>
              <span className="text-zinc-400">{currentUser.company || 'Private Client'}</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Welcome back, {currentUser.name}
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 font-light">
              Manage itemized invoices, review artwork proofs, track pre-press uploads, and request project quotes.
            </p>
          </div>

          {/* Account switcher button */}
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="p-1 bg-zinc-950 border border-zinc-800 rounded-xl flex items-center">
              <span className="text-[11px] font-semibold text-zinc-500 px-2 uppercase">Demo Switch:</span>
              {users.map(u => (
                <button
                  key={u.id}
                  onClick={() => switchUser(u.id)}
                  className={`px-2.5 py-1 text-xs rounded-lg transition-colors cursor-pointer ${
                    currentUser.id === u.id
                      ? 'bg-orange-600 text-white font-semibold'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {u.role === 'admin' ? 'Admin' : u.name.split(' ')[0]}
                </button>
              ))}
            </div>

            <button
              onClick={onOpenUpload}
              className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold text-xs rounded-xl border border-zinc-700 flex items-center gap-1.5 cursor-pointer"
            >
              <Upload className="w-3.5 h-3.5 text-amber-400" />
              <span>Upload Artwork</span>
            </button>
          </div>
        </div>

        {/* Financial & Status Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Metric 1: Outstanding Balance */}
          <div className="p-5 rounded-2xl bg-zinc-900/70 border border-zinc-800 space-y-2">
            <div className="flex items-center justify-between text-xs text-zinc-400">
              <span>Outstanding Balance</span>
              <CreditCard className="w-4 h-4 text-orange-400" />
            </div>
            <div className="flex items-baseline gap-1">
              <span className="font-display text-2xl font-extrabold text-white font-mono tabular-nums">
                R {outstandingBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
            <p className="text-[11px] text-zinc-400">
              {displayInvoices.filter(i => i.status === 'Unpaid').length} pending invoice(s)
            </p>
          </div>

          {/* Metric 2: Total Invoices */}
          <div className="p-5 rounded-2xl bg-zinc-900/70 border border-zinc-800 space-y-2">
            <div className="flex items-center justify-between text-xs text-zinc-400">
              <span>Tracked Invoices</span>
              <FileText className="w-4 h-4 text-zinc-400" />
            </div>
            <div className="flex items-baseline gap-1">
              <span className="font-display text-2xl font-extrabold text-white font-mono tabular-nums">
                {displayInvoices.length}
              </span>
              <span className="text-xs text-zinc-400">records</span>
            </div>
            <p className="text-[11px] text-emerald-400">
              {displayInvoices.filter(i => i.status === 'Paid').length} settled in full
            </p>
          </div>

          {/* Metric 3: Artwork Proofs */}
          <div className="p-5 rounded-2xl bg-zinc-900/70 border border-zinc-800 space-y-2">
            <div className="flex items-center justify-between text-xs text-zinc-400">
              <span>Artwork Proofs</span>
              <Layers className="w-4 h-4 text-amber-400" />
            </div>
            <div className="flex items-baseline gap-1">
              <span className="font-display text-2xl font-extrabold text-white font-mono tabular-nums">
                {displayProofs.length}
              </span>
              <span className="text-xs text-zinc-400">items</span>
            </div>
            <p className="text-[11px] text-zinc-400">
              {displayProofs.filter(p => p.status === 'Pending Review').length} awaiting client sign-off
            </p>
          </div>

          {/* Metric 4: Production Files */}
          <div className="p-5 rounded-2xl bg-zinc-900/70 border border-zinc-800 space-y-2">
            <div className="flex items-center justify-between text-xs text-zinc-400">
              <span>Production Files</span>
              <Upload className="w-4 h-4 text-zinc-400" />
            </div>
            <div className="flex items-baseline gap-1">
              <span className="font-display text-2xl font-extrabold text-white font-mono tabular-nums">
                {displayArtwork.length}
              </span>
              <span className="text-xs text-zinc-400">uploaded</span>
            </div>
            <p className="text-[11px] text-emerald-400">Pre-flight verified</p>
          </div>

        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center flex-wrap gap-2 border-b border-zinc-800 pb-3">
          <button
            onClick={() => setActiveTab('invoices')}
            className={`px-4 py-2 text-xs font-semibold rounded-xl transition-colors cursor-pointer flex items-center gap-2 ${
              activeTab === 'invoices'
                ? 'bg-orange-500/10 text-orange-400 border border-orange-500/30'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Monthly Invoices ({displayInvoices.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('proofs')}
            className={`px-4 py-2 text-xs font-semibold rounded-xl transition-colors cursor-pointer flex items-center gap-2 ${
              activeTab === 'proofs'
                ? 'bg-orange-500/10 text-orange-400 border border-orange-500/30'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Artwork Proofs & Approvals ({displayProofs.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('artwork')}
            className={`px-4 py-2 text-xs font-semibold rounded-xl transition-colors cursor-pointer flex items-center gap-2 ${
              activeTab === 'artwork'
                ? 'bg-orange-500/10 text-orange-400 border border-orange-500/30'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Uploaded Files Archive ({displayArtwork.length})</span>
          </button>

          {isAdmin && (
            <button
              onClick={() => setActiveTab('admin')}
              className={`px-4 py-2 text-xs font-semibold rounded-xl transition-colors cursor-pointer flex items-center gap-2 ${
                activeTab === 'admin'
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Studio Management & Billing</span>
            </button>
          )}
        </div>

        {/* TAB 1: INVOICES & PAYMENTS */}
        {activeTab === 'invoices' && (
          <div className="space-y-6">
            
            {/* Filter controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-1.5 p-1 bg-zinc-900 border border-zinc-800 rounded-xl">
                <button
                  onClick={() => setInvoiceFilter('all')}
                  className={`px-3 py-1.5 text-xs rounded-lg transition-colors cursor-pointer ${
                    invoiceFilter === 'all' ? 'bg-zinc-800 text-white font-semibold' : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  All Invoices ({displayInvoices.length})
                </button>
                <button
                  onClick={() => setInvoiceFilter('unpaid')}
                  className={`px-3 py-1.5 text-xs rounded-lg transition-colors cursor-pointer ${
                    invoiceFilter === 'unpaid' ? 'bg-zinc-800 text-amber-400 font-semibold' : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  Unpaid ({displayInvoices.filter(i => i.status === 'Unpaid').length})
                </button>
                <button
                  onClick={() => setInvoiceFilter('paid')}
                  className={`px-3 py-1.5 text-xs rounded-lg transition-colors cursor-pointer ${
                    invoiceFilter === 'paid' ? 'bg-zinc-800 text-emerald-400 font-semibold' : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  Paid ({displayInvoices.filter(i => i.status === 'Paid').length})
                </button>
              </div>

              {outstandingBalance > 0 && (
                <div className="flex items-center gap-3">
                  <span className="text-xs text-zinc-400">
                    Total Due: <strong className="text-orange-400 font-mono">R {outstandingBalance.toLocaleString()}</strong>
                  </span>
                  {displayInvoices.find(i => i.status === 'Unpaid') && (
                    <button
                      onClick={() => onOpenPayment(displayInvoices.find(i => i.status === 'Unpaid')!)}
                      className="px-3.5 py-1.5 bg-orange-600 hover:bg-orange-500 text-white font-semibold text-xs rounded-lg flex items-center gap-1.5 cursor-pointer shadow"
                    >
                      <CreditCard className="w-3.5 h-3.5" />
                      <span>Pay Oldest Invoice</span>
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Invoices List */}
            {filteredInvoices.length === 0 ? (
              <div className="text-center py-12 bg-zinc-900/40 rounded-2xl border border-zinc-800 text-zinc-400 space-y-2">
                <FileText className="w-8 h-8 mx-auto text-zinc-600" />
                <p className="text-sm font-semibold text-zinc-300">No invoices match current filter</p>
                <p className="text-xs text-zinc-500">All settled up or no orders logged under this client account.</p>
              </div>
            ) : (
              <div className="space-y-3.5">
                {filteredInvoices.map(invoice => {
                  const isPaid = invoice.status === 'Paid';
                  return (
                    <div
                      key={invoice.id}
                      className="p-5 rounded-2xl bg-zinc-900/70 border border-zinc-800 hover:border-zinc-700 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-sm font-bold text-white">
                            {invoice.invoiceNumber}
                          </span>
                          <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                            isPaid
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                              : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                          }`}>
                            {invoice.status.toUpperCase()}
                          </span>
                          {isAdmin && (
                            <span className="text-xs text-zinc-400">
                              Client: <strong className="text-zinc-200">{invoice.clientName}</strong> ({invoice.clientCompany})
                            </span>
                          )}
                        </div>

                        {/* Unboxed Metadata with Typographic Separator */}
                        <div className="flex items-center gap-2 text-xs text-zinc-400">
                          <span>Issued: <span className="font-mono">{invoice.issueDate}</span></span>
                          <span aria-hidden="true">·</span>
                          <span>Due: <span className="font-mono">{invoice.dueDate}</span></span>
                          <span aria-hidden="true">·</span>
                          <span>{invoice.items.length} line item(s)</span>
                        </div>

                        <p className="text-xs text-zinc-300 line-clamp-1 pt-1">
                          {invoice.items.map(i => i.description).join('; ')}
                        </p>
                      </div>

                      {/* Right Amount & Actions */}
                      <div className="flex flex-wrap sm:flex-nowrap items-center gap-4">
                        <div className="text-left md:text-right">
                          <span className="text-[10px] text-zinc-400 uppercase tracking-wider block">Total Amount</span>
                          <span className="font-display font-extrabold text-lg text-white font-mono tabular-nums">
                            R {invoice.total.toLocaleString()}
                          </span>
                          <span className="text-[10px] text-zinc-400 block">incl. 15% VAT</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => onOpenInvoice(invoice)}
                            className="px-3 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-white font-medium text-xs rounded-xl flex items-center gap-1.5 cursor-pointer"
                            title="View & Print Invoice"
                          >
                            <Printer className="w-3.5 h-3.5" />
                            <span>View / Print</span>
                          </button>

                          {!isPaid ? (
                            <button
                              onClick={() => onOpenPayment(invoice)}
                              className="px-3.5 py-2 bg-orange-600 hover:bg-orange-500 text-white font-semibold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer shadow-md"
                            >
                              <CreditCard className="w-3.5 h-3.5" />
                              <span>Pay Online</span>
                            </button>
                          ) : (
                            <div className="px-3 py-2 text-emerald-400 font-medium text-xs flex items-center gap-1">
                              <CheckCircle2 className="w-4 h-4" />
                              <span>Settled</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

          </div>
        )}

        {/* TAB 2: ARTWORK PROOFS & APPROVALS */}
        {activeTab === 'proofs' && (
          <div className="space-y-6">
            <div className="max-w-2xl">
              <h3 className="font-display text-lg font-bold text-white">Design Proofs Awaiting Production Sign-Off</h3>
              <p className="text-xs text-zinc-400 mt-1 font-light">
                Inspect high-resolution artwork proofs before plates are made or digital machines begin printing. Approving locks the file for production.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {displayProofs.map(proof => {
                const isApproved = proof.status === 'Approved';
                return (
                  <div
                    key={proof.id}
                    className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-4 flex flex-col justify-between"
                  >
                    <div>
                      {/* Proof Image Preview */}
                      <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-zinc-950 border border-zinc-800">
                        <img
                          src={proof.previewUrl}
                          alt={proof.title}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute top-3 left-3 bg-zinc-950/90 backdrop-blur-md px-2.5 py-1 rounded text-xs font-mono font-semibold text-orange-400 border border-zinc-800">
                          {proof.version}
                        </div>
                        <div className="absolute top-3 right-3">
                          <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                            isApproved
                              ? 'bg-emerald-500 text-white'
                              : proof.status === 'Revisions Requested'
                              ? 'bg-rose-500 text-white'
                              : 'bg-amber-500 text-zinc-950'
                          }`}>
                            {proof.status}
                          </span>
                        </div>
                      </div>

                      <div className="mt-4 space-y-1">
                        <div className="flex items-center gap-2 text-xs text-zinc-400">
                          <span>Ref: <strong className="text-zinc-300 font-mono">{proof.jobReference}</strong></span>
                          <span aria-hidden="true">·</span>
                          <span>Uploaded: <span className="font-mono">{proof.uploadedAt}</span></span>
                        </div>
                        <h4 className="font-display text-base font-bold text-white">
                          {proof.title}
                        </h4>
                        <p className="text-xs text-zinc-400 font-mono mt-1">
                          {proof.specs}
                        </p>
                      </div>

                      {proof.feedbackNotes && (
                        <div className="mt-3 p-3 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-300 space-y-0.5">
                          <span className="font-semibold text-orange-400 block text-[10px] uppercase">Notes:</span>
                          <p>{proof.feedbackNotes}</p>
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-4 border-t border-zinc-800/80">
                      {isApproved ? (
                        <div className="flex items-center justify-between text-xs text-emerald-400 bg-emerald-950/40 p-2.5 rounded-xl border border-emerald-800/40">
                          <div className="flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4" />
                            <span className="font-semibold">Approved for Print Production</span>
                          </div>
                          <span className="text-[11px] text-zinc-400">In Print Queue</span>
                        </div>
                      ) : activeRevisionId === proof.id ? (
                        <div className="space-y-2">
                          <textarea
                            rows={2}
                            placeholder="Detail required text changes, color adjustments, or layout changes..."
                            value={revisionFeedback[proof.id] || ''}
                            onChange={e => setRevisionFeedback({ ...revisionFeedback, [proof.id]: e.target.value })}
                            className="w-full px-3 py-2 bg-zinc-950 border border-zinc-700 rounded-lg text-xs text-white"
                          />
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleSubmitRevision(proof.id)}
                              className="px-3 py-1.5 bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs rounded-lg cursor-pointer"
                            >
                              Submit Revision Notes
                            </button>
                            <button
                              onClick={() => setActiveRevisionId(null)}
                              className="px-3 py-1.5 text-zinc-400 hover:text-white text-xs cursor-pointer"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleApproveProof(proof.id)}
                            className="flex-1 py-2.5 px-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-1.5 cursor-pointer shadow"
                          >
                            <Check className="w-4 h-4" />
                            <span>Approve for Production</span>
                          </button>

                          <button
                            onClick={() => setActiveRevisionId(proof.id)}
                            className="py-2.5 px-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-medium text-xs rounded-xl cursor-pointer"
                          >
                            Request Revisions
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: UPLOADED ARTWORK FILES */}
        {activeTab === 'artwork' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-display text-lg font-bold text-white">Pre-Flight Artwork Archive</h3>
                <p className="text-xs text-zinc-400 mt-0.5">All customer-supplied source and vector files currently in the studio repository.</p>
              </div>

              <button
                onClick={onOpenUpload}
                className="px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white font-semibold text-xs rounded-xl flex items-center gap-2 cursor-pointer shadow"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Upload New File</span>
              </button>
            </div>

            <div className="space-y-3">
              {displayArtwork.map(art => (
                <div
                  key={art.id}
                  className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-white">{art.fileName}</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-zinc-800 text-zinc-300">
                        {art.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-zinc-400">
                      <span>Size: {(art.fileSize / (1024 * 1024)).toFixed(1)} MB</span>
                      <span aria-hidden="true">·</span>
                      <span>Uploaded: {art.uploadedAt}</span>
                      <span aria-hidden="true">·</span>
                      <span>Ref: {art.jobReference || 'N/A'}</span>
                    </div>
                    {art.notes && (
                      <p className="text-xs text-zinc-400 italic">{art.notes}</p>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={`https://wa.me/${BUSINESS_INFO.whatsappRaw}?text=${encodeURIComponent(`Hi Flamingo Designs SA, regarding uploaded file ${art.fileName} (${art.clientName}).`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs rounded-lg flex items-center gap-1.5"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                      <span>WhatsApp Studio Check</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: ADMIN STUDIO MANAGEMENT */}
        {activeTab === 'admin' && isAdmin && (
          <div className="space-y-8 animate-in fade-in duration-200">
            
            {/* Create New Invoice Box */}
            <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <h3 className="font-display text-base font-bold text-white flex items-center gap-2">
                  <Plus className="w-4 h-4 text-orange-400" />
                  <span>Generate New Client Tax Invoice</span>
                </h3>
                <span className="text-xs font-mono text-zinc-400">Flamingo Designs Billing</span>
              </div>

              {adminInvSuccess && (
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-300 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Invoice generated and added to client portal ledger!</span>
                </div>
              )}

              <form onSubmit={handleAdminCreateInvoice} className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
                <div>
                  <label className="block text-zinc-400 mb-1">Select Client</label>
                  <select
                    value={newInvClientEmail}
                    onChange={e => setNewInvClientEmail(e.target.value)}
                    className="w-full px-3 py-2 bg-zinc-950 border border-zinc-700 rounded-lg text-white"
                  >
                    {users.filter(u => u.role === 'client').map(u => (
                      <option key={u.id} value={u.email}>{u.name} ({u.company})</option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-zinc-400 mb-1">Item Description</label>
                  <input
                    type="text"
                    required
                    value={newInvDesc}
                    onChange={e => setNewInvDesc(e.target.value)}
                    placeholder="e.g. 500 Business Cards Special (350gsm Silk, Matt Lam)"
                    className="w-full px-3 py-2 bg-zinc-950 border border-zinc-700 rounded-lg text-white"
                  />
                </div>

                <div className="flex gap-2">
                  <div className="w-1/2">
                    <label className="block text-zinc-400 mb-1">Qty</label>
                    <input
                      type="number"
                      min={1}
                      value={newInvQty}
                      onChange={e => setNewInvQty(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-zinc-950 border border-zinc-700 rounded-lg text-white font-mono"
                    />
                  </div>
                  <div className="w-1/2">
                    <label className="block text-zinc-400 mb-1">Rate (R)</label>
                    <input
                      type="number"
                      value={newInvPrice}
                      onChange={e => setNewInvPrice(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-zinc-950 border border-zinc-700 rounded-lg text-white font-mono"
                    />
                  </div>
                </div>

                <div className="sm:col-span-4 flex items-center flex-wrap gap-1.5 pb-1">
                  <span className="text-[11px] text-zinc-400 font-semibold uppercase tracking-wider mr-1">Presets:</span>
                  <button
                    type="button"
                    onClick={() => { setNewInvDesc('Social Media Management: Poster Designs & Publishing'); setNewInvPrice(950); }}
                    className="px-2 py-1 bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 rounded text-[11px] text-zinc-300 cursor-pointer"
                  >
                    Socials + Posters (R950)
                  </button>
                  <button
                    type="button"
                    onClick={() => { setNewInvDesc('General Social Media Management (Posting on all socials & location targeting)'); setNewInvPrice(450); }}
                    className="px-2 py-1 bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 rounded text-[11px] text-zinc-300 cursor-pointer"
                  >
                    General Socials (R450)
                  </button>
                  <button
                    type="button"
                    onClick={() => { setNewInvDesc('Monthly Website Maintenance: Updates, Security, Optimum Upload Times & Backups'); setNewInvPrice(260); }}
                    className="px-2 py-1 bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 rounded text-[11px] text-zinc-300 cursor-pointer"
                  >
                    Website Maint (R260)
                  </button>
                  <button
                    type="button"
                    onClick={() => { setNewInvDesc('General IT Support Retainer: Online Only (Device care, Email mgmt & Data backup)'); setNewInvPrice(1600); }}
                    className="px-2 py-1 bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 rounded text-[11px] text-zinc-300 cursor-pointer"
                  >
                    IT Online (R1,600)
                  </button>
                  <button
                    type="button"
                    onClick={() => { setNewInvDesc('General IT Support Retainer: Includes Monthly Onsite Office Visits, Device & Email mgmt'); setNewInvPrice(5600); }}
                    className="px-2 py-1 bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 rounded text-[11px] text-zinc-300 cursor-pointer"
                  >
                    IT Onsite (R5,600)
                  </button>
                  <button
                    type="button"
                    onClick={() => { setNewInvDesc('500 Luxury Business Cards Print Special (350gsm Silk, Matt Lam)'); setNewInvPrice(750); }}
                    className="px-2 py-1 bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 rounded text-[11px] text-zinc-300 cursor-pointer"
                  >
                    500 Cards (R750)
                  </button>
                </div>

                <div className="sm:col-span-4 flex justify-end">
                  <button
                    type="submit"
                    className="px-4 py-2.5 bg-orange-600 hover:bg-orange-500 text-white font-semibold text-xs rounded-xl cursor-pointer"
                  >
                    Issue Tax Invoice (R {(newInvQty * newInvPrice * 1.15).toLocaleString(undefined, { maximumFractionDigits: 0 })} incl. VAT)
                  </button>
                </div>
              </form>
            </div>

            {/* Received Quote Requests list with 1-click Convert */}
            <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <div>
                  <h3 className="font-display text-base font-bold text-white">Recent Quote Requests</h3>
                  <p className="text-xs text-zinc-400">Incoming inquiries from website visitors</p>
                </div>
                <span className="font-mono text-xs text-orange-400">{quotes.length} Briefs</span>
              </div>

              <div className="space-y-3">
                {quotes.map(quote => (
                  <div
                    key={quote.id}
                    className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <strong className="text-white text-sm">{quote.name}</strong>
                        <span className="text-zinc-400">({quote.company || 'Private'})</span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                          quote.status === 'Converted to Invoice'
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : 'bg-amber-500/20 text-amber-400'
                        }`}>
                          {quote.status}
                        </span>
                      </div>
                      <p className="text-zinc-300">
                        Category: <strong className="text-orange-400">{quote.category}</strong> · Est: <span className="font-mono">{quote.estimatedBudget}</span> · Timeline: {quote.timeline}
                      </p>
                      <p className="text-zinc-400 italic">"{quote.brief}"</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <a
                        href={`https://wa.me/${quote.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hi ${quote.name}, this is Lunga from Flamingo Designs SA. Regarding your quote request for ${quote.category}...`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg flex items-center gap-1"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>WhatsApp Client</span>
                      </a>

                      {quote.status !== 'Converted to Invoice' && (
                        <button
                          onClick={() => handleConvertQuoteToInvoice(quote)}
                          className="px-3 py-1.5 bg-orange-600 hover:bg-orange-500 text-white rounded-lg flex items-center gap-1 cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Convert to Invoice</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Google Bookings log */}
            <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-4">
              <h3 className="font-display text-base font-bold text-white flex items-center gap-2">
                <Calendar className="w-4 h-4 text-amber-400" />
                <span>Scheduled Google Meet Consultations ({bookings.length})</span>
              </h3>
              <div className="space-y-2">
                {bookings.map(b => (
                  <div key={b.id} className="p-3 bg-zinc-950 rounded-xl border border-zinc-800 flex items-center justify-between text-xs">
                    <div>
                      <p className="font-bold text-white">{b.clientName} ({b.company})</p>
                      <p className="text-zinc-400">{b.consultationType} · <span className="text-orange-400 font-mono">{b.date} @ {b.time}</span></p>
                    </div>
                    <a
                      href={b.googleMeetUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1 bg-zinc-800 hover:bg-zinc-700 text-emerald-400 rounded-lg font-mono text-[11px]"
                    >
                      Join Meet
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Factory Reset button */}
            <div className="pt-4 flex justify-end">
              <button
                onClick={() => {
                  if (confirm('Reset all demo data back to factory defaults?')) {
                    resetAllData();
                  }
                }}
                className="px-3 py-1.5 text-zinc-500 hover:text-rose-400 text-xs flex items-center gap-1.5 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset Demo Database to Initial State</span>
              </button>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
