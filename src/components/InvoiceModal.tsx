import React from 'react';
import { useApp } from '../context/AppContext';
import { BUSINESS_INFO } from '../data/mockData';
import { Printer, Download, CreditCard, MessageSquare, X, CheckCircle2, Clock } from 'lucide-react';
import { Invoice } from '../types';
import { FlamingoLogo } from './FlamingoLogo';

interface InvoiceModalProps {
  invoice: Invoice | null;
  onClose: () => void;
  onOpenPayment: (invoice: Invoice) => void;
}

export const InvoiceModal: React.FC<InvoiceModalProps> = ({ invoice, onClose, onOpenPayment }) => {
  if (!invoice) return null;

  const isPaid = invoice.status === 'Paid';

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-zinc-950 border border-zinc-700/80 rounded-2xl shadow-2xl overflow-hidden my-8 flex flex-col">
        
        {/* Top Control Bar (Hidden on print) */}
        <div className="no-print p-4 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-orange-400">{invoice.invoiceNumber}</span>
            <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
              isPaid ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
            }`}>
              {invoice.status.toUpperCase()}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {!isPaid && (
              <button
                onClick={() => {
                  onClose();
                  onOpenPayment(invoice);
                }}
                className="px-3 py-1.5 bg-orange-600 hover:bg-orange-500 text-white font-semibold text-xs rounded-lg flex items-center gap-1.5 cursor-pointer shadow"
              >
                <CreditCard className="w-3.5 h-3.5" />
                <span>Pay Invoice Online</span>
              </button>
            )}

            <button
              onClick={handlePrint}
              className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium rounded-lg flex items-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>

            <a
              href={`https://wa.me/${BUSINESS_INFO.whatsappRaw}?text=${encodeURIComponent(`Hi Flamingo Designs SA, I have an inquiry regarding Invoice ${invoice.invoiceNumber} (${invoice.clientCompany}).`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 bg-emerald-600/20 hover:bg-emerald-600 text-emerald-400 hover:text-white rounded-lg transition-colors"
              title="Inquire on WhatsApp"
            >
              <MessageSquare className="w-4 h-4" />
            </a>

            <button
              onClick={onClose}
              className="p-1.5 text-zinc-400 hover:text-white bg-zinc-800 rounded-lg cursor-pointer transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Official Printable Tax Invoice Document */}
        <div id="printable-invoice" className="p-8 sm:p-10 bg-zinc-950 text-zinc-100 print:bg-white print:text-black space-y-8">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-6 border-b border-zinc-800 print:border-neutral-300 pb-8">
            <div className="space-y-1.5">
              <div className="print:hidden">
                <FlamingoLogo variant="dark-bg" size="sm" />
              </div>
              <div className="hidden print:block">
                <FlamingoLogo variant="light-bg" size="sm" />
              </div>
              <p className="text-xs text-zinc-400 print:text-neutral-600 pt-1">
                Creative Agency & Pre-Press Production Studio
              </p>
              <div className="text-[11px] text-zinc-400 print:text-neutral-500 space-y-0.5 pt-1">
                <p>VAT Reg: ZA 4920199120 · Co Reg: 2021/481902/07</p>
                <p>Van Riebeeck Ave, Edenvale, 1609 · Harding Street, Estcourt KZN</p>
                <p>info@flamingodesignssa.co.za · +27 83 337 4954</p>
              </div>
            </div>

            <div className="sm:text-right space-y-1">
              <span className="font-display text-xl font-bold uppercase tracking-wider text-orange-400 print:text-neutral-900 block">
                TAX INVOICE
              </span>
              <p className="font-mono text-sm font-bold text-white print:text-black">
                {invoice.invoiceNumber}
              </p>
              <div className="text-xs text-zinc-400 print:text-neutral-600 space-y-0.5 pt-1">
                <p>Issue Date: <strong className="text-zinc-200 print:text-black font-mono">{invoice.issueDate}</strong></p>
                <p>Due Date: <strong className="text-zinc-200 print:text-black font-mono">{invoice.dueDate}</strong></p>
              </div>
            </div>
          </div>

          {/* Billed To / Client Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pb-2">
            <div className="space-y-1">
              <span className="text-[11px] font-semibold text-zinc-400 print:text-neutral-500 uppercase tracking-wider">
                Billed To
              </span>
              <p className="font-display text-base font-bold text-white print:text-black">
                {invoice.clientCompany || invoice.clientName}
              </p>
              <div className="text-xs text-zinc-300 print:text-neutral-700 space-y-0.5">
                <p>Attn: {invoice.clientName}</p>
                <p>{invoice.clientEmail}</p>
                <p>{invoice.clientPhone}</p>
                {invoice.clientVat && <p className="font-mono">Client VAT: {invoice.clientVat}</p>}
              </div>
            </div>

            {/* Payment Status Stamp */}
            <div className="sm:text-right flex flex-col sm:items-end justify-center">
              {isPaid ? (
                <div className="p-3 border-2 border-emerald-500 rounded-xl text-center inline-block bg-emerald-500/10">
                  <div className="flex items-center gap-1.5 text-emerald-400 font-display font-extrabold tracking-widest text-sm uppercase">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>PAID IN FULL</span>
                  </div>
                  <p className="text-[10px] text-zinc-400 print:text-neutral-600 mt-0.5 font-mono">
                    Paid {invoice.paidAt || '2026-09-20'} · via {invoice.paymentMethod || 'EFT'}
                  </p>
                </div>
              ) : (
                <div className="p-3 border-2 border-amber-500 rounded-xl text-center inline-block bg-amber-500/10">
                  <div className="flex items-center gap-1.5 text-amber-400 font-display font-extrabold tracking-widest text-sm uppercase">
                    <Clock className="w-4 h-4" />
                    <span>PAYMENT DUE</span>
                  </div>
                  <p className="text-[10px] text-zinc-400 print:text-neutral-600 mt-0.5 font-mono">
                    Due by {invoice.dueDate}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Line items table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-zinc-800 print:border-neutral-300 text-zinc-400 print:text-neutral-600 uppercase text-[10px] tracking-wider">
                  <th className="py-2.5 pr-4 font-semibold">Description</th>
                  <th className="py-2.5 px-3 font-semibold text-center w-16">Qty</th>
                  <th className="py-2.5 px-3 font-semibold text-right w-28">Rate (ZAR)</th>
                  <th className="py-2.5 pl-3 font-semibold text-right w-28">Amount (ZAR)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60 print:divide-neutral-200">
                {invoice.items.map((item, index) => (
                  <tr key={index}>
                    <td className="py-3.5 pr-4 text-zinc-200 print:text-black font-medium leading-relaxed">
                      {item.description}
                    </td>
                    <td className="py-3.5 px-3 text-center text-zinc-400 print:text-neutral-600 font-mono tabular-nums">
                      {item.quantity}
                    </td>
                    <td className="py-3.5 px-3 text-right text-zinc-400 print:text-neutral-600 font-mono tabular-nums">
                      R {item.unitPrice.toLocaleString()}
                    </td>
                    <td className="py-3.5 pl-3 text-right text-white print:text-black font-mono tabular-nums font-semibold">
                      R {item.total.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Summary / Totals */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-6 pt-4 border-t border-zinc-800 print:border-neutral-300">
            {/* Banking details */}
            <div className="p-4 rounded-xl bg-zinc-900/60 print:bg-neutral-100 border border-zinc-800 print:border-neutral-200 text-[11px] space-y-1 sm:max-w-xs w-full">
              <span className="font-bold text-zinc-200 print:text-black uppercase tracking-wider block">
                Banking Details (EFT)
              </span>
              <p className="text-zinc-400 print:text-neutral-700">Bank: <strong className="text-zinc-200 print:text-black">{BUSINESS_INFO.bankDetails.bank}</strong></p>
              <p className="text-zinc-400 print:text-neutral-700">Account: <strong className="text-zinc-200 print:text-black font-mono">{BUSINESS_INFO.bankDetails.accountNumber}</strong></p>
              <p className="text-zinc-400 print:text-neutral-700">Branch Code: <strong className="text-zinc-200 print:text-black font-mono">{BUSINESS_INFO.bankDetails.branchCode}</strong></p>
              <p className="text-zinc-400 print:text-neutral-700">Reference: <strong className="text-orange-400 print:text-black font-mono">{invoice.invoiceNumber}</strong></p>
            </div>

            {/* Totals math */}
            <div className="space-y-2 sm:w-64 w-full text-xs">
              <div className="flex justify-between text-zinc-400 print:text-neutral-600">
                <span>Subtotal:</span>
                <span className="font-mono tabular-nums text-zinc-200 print:text-black">
                  R {invoice.subtotal.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-zinc-400 print:text-neutral-600">
                <span>SARS VAT (15%):</span>
                <span className="font-mono tabular-nums text-zinc-200 print:text-black">
                  R {invoice.vatAmount.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-baseline pt-2 border-t border-zinc-800 print:border-neutral-300 font-bold text-base text-white print:text-black">
                <span>Total Due:</span>
                <span className="font-display font-extrabold text-orange-400 print:text-black font-mono tabular-nums">
                  R {invoice.total.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Notes */}
          {invoice.notes && (
            <div className="pt-2 text-[11px] text-zinc-400 print:text-neutral-500 italic border-t border-zinc-800 print:border-neutral-200">
              Note: {invoice.notes}
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
