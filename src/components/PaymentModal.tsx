import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BUSINESS_INFO } from '../data/mockData';
import { Invoice } from '../types';
import { CreditCard, CheckCircle2, Copy, X, QrCode, Shield, Check } from 'lucide-react';

interface PaymentModalProps {
  invoice: Invoice | null;
  onClose: () => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({ invoice, onClose }) => {
  const { markInvoicePaid } = useApp();

  const [paymentMethod, setPaymentMethod] = useState<'EFT' | 'Card' | 'SnapScan'>('EFT');
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  if (!invoice) return null;

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleSimulatePayment = () => {
    setProcessing(true);
    setTimeout(() => {
      markInvoicePaid(invoice.id, paymentMethod === 'Card' ? 'Card' : paymentMethod === 'SnapScan' ? 'SnapScan' : 'EFT');
      setProcessing(false);
      setPaymentSuccess(true);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-zinc-900 border border-zinc-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="p-5 border-b border-zinc-800 flex items-center justify-between">
          <div>
            <h3 className="font-display text-base font-bold text-white">
              Settle Invoice Online
            </h3>
            <p className="text-xs text-zinc-400 font-mono">
              {invoice.invoiceNumber} · R {invoice.total.toLocaleString()} ZAR
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-white bg-zinc-800 rounded-lg cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {paymentSuccess ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-400 mx-auto flex items-center justify-center border border-emerald-500/30">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <h4 className="font-display text-xl font-bold text-white">
                  Payment Recorded Successfully!
                </h4>
                <p className="text-xs text-zinc-400 mt-1">
                  Tax receipt issued for Invoice <span className="font-mono text-zinc-200 font-bold">{invoice.invoiceNumber}</span>.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 text-xs space-y-2 text-left">
                <div className="flex justify-between">
                  <span className="text-zinc-400">Amount Settled:</span>
                  <span className="font-mono text-emerald-400 font-bold">R {invoice.total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Payment Channel:</span>
                  <span className="font-semibold text-white">{paymentMethod}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Client Account:</span>
                  <span className="text-zinc-200">{invoice.clientCompany || invoice.clientName}</span>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-full py-2.5 bg-orange-600 hover:bg-orange-500 text-white font-semibold text-xs rounded-xl cursor-pointer"
              >
                Close & Return to Dashboard
              </button>
            </div>
          ) : (
            <div className="space-y-5">
              
              {/* Payment Method Switcher */}
              <div className="grid grid-cols-3 gap-2 p-1 bg-zinc-950 border border-zinc-800 rounded-xl">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('EFT')}
                  className={`py-2 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                    paymentMethod === 'EFT' ? 'bg-zinc-800 text-white shadow-sm font-semibold' : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  Instant EFT
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('Card')}
                  className={`py-2 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                    paymentMethod === 'Card' ? 'bg-zinc-800 text-white shadow-sm font-semibold' : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  PayFast / Card
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('SnapScan')}
                  className={`py-2 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                    paymentMethod === 'SnapScan' ? 'bg-zinc-800 text-white shadow-sm font-semibold' : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  SnapScan QR
                </button>
              </div>

              {/* Option 1: Instant EFT */}
              {paymentMethod === 'EFT' && (
                <div className="space-y-3 bg-zinc-950/80 p-4 rounded-xl border border-zinc-800 text-xs">
                  <p className="font-semibold text-zinc-300">South African Bank Transfer Details</p>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 rounded-lg bg-zinc-900 border border-zinc-800">
                      <div>
                        <span className="text-[10px] text-zinc-400 block">Bank</span>
                        <span className="font-semibold text-zinc-200">{BUSINESS_INFO.bankDetails.bank}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-2 rounded-lg bg-zinc-900 border border-zinc-800">
                      <div>
                        <span className="text-[10px] text-zinc-400 block">Account Number</span>
                        <span className="font-mono text-zinc-200 font-bold">{BUSINESS_INFO.bankDetails.accountNumber}</span>
                      </div>
                      <button
                        onClick={() => copyToClipboard(BUSINESS_INFO.bankDetails.accountNumber, 'acc')}
                        className="px-2 py-1 bg-zinc-800 hover:bg-zinc-700 text-[11px] rounded text-zinc-300 flex items-center gap-1 cursor-pointer"
                      >
                        {copiedField === 'acc' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedField === 'acc' ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-2 rounded-lg bg-zinc-900 border border-zinc-800">
                      <div>
                        <span className="text-[10px] text-zinc-400 block">Branch Code</span>
                        <span className="font-mono text-zinc-200">{BUSINESS_INFO.bankDetails.branchCode}</span>
                      </div>
                      <button
                        onClick={() => copyToClipboard(BUSINESS_INFO.bankDetails.branchCode, 'branch')}
                        className="px-2 py-1 bg-zinc-800 hover:bg-zinc-700 text-[11px] rounded text-zinc-300 flex items-center gap-1 cursor-pointer"
                      >
                        {copiedField === 'branch' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedField === 'branch' ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-2 rounded-lg bg-zinc-900 border border-orange-500/30">
                      <div>
                        <span className="text-[10px] text-orange-400 block font-semibold">Required Payment Reference</span>
                        <span className="font-mono text-orange-300 font-bold">{invoice.invoiceNumber}</span>
                      </div>
                      <button
                        onClick={() => copyToClipboard(invoice.invoiceNumber, 'ref')}
                        className="px-2 py-1 bg-orange-500/20 hover:bg-orange-500/30 text-[11px] rounded text-orange-300 flex items-center gap-1 cursor-pointer"
                      >
                        {copiedField === 'ref' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedField === 'ref' ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Option 2: Card / PayFast */}
              {paymentMethod === 'Card' && (
                <div className="space-y-3 bg-zinc-950/80 p-4 rounded-xl border border-zinc-800 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-zinc-300">PayFast Secure 3D Card Processing</span>
                    <Shield className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="space-y-2 pt-1">
                    <div>
                      <label className="block text-[11px] text-zinc-400 mb-1">Cardholder Name</label>
                      <input
                        type="text"
                        defaultValue={invoice.clientName}
                        className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-zinc-400 mb-1">Card Number</label>
                      <input
                        type="text"
                        placeholder="•••• •••• •••• 4242"
                        className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-xs text-white font-mono"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[11px] text-zinc-400 mb-1">Expiry</label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-xs text-white font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-zinc-400 mb-1">CVV</label>
                        <input
                          type="password"
                          placeholder="•••"
                          maxLength={4}
                          className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-xs text-white font-mono"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Option 3: SnapScan QR */}
              {paymentMethod === 'SnapScan' && (
                <div className="text-center p-5 bg-zinc-950/80 rounded-xl border border-zinc-800 space-y-3">
                  <div className="w-36 h-36 mx-auto bg-white p-2 rounded-xl flex items-center justify-center">
                    <QrCode className="w-32 h-32 text-zinc-950" />
                  </div>
                  <p className="text-xs text-zinc-300 font-semibold">Scan with SnapScan App</p>
                  <p className="text-[11px] text-zinc-400">
                    Auto-populates amount <strong className="text-white">R {invoice.total.toLocaleString()}</strong> and reference <strong className="text-white">{invoice.invoiceNumber}</strong>
                  </p>
                </div>
              )}

              {/* Action Button */}
              <button
                type="button"
                onClick={handleSimulatePayment}
                disabled={processing}
                className="w-full py-3 bg-gradient-to-r from-orange-500 to-rose-600 hover:from-orange-600 hover:to-rose-700 disabled:opacity-50 text-white font-semibold text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {processing ? (
                  <span>Connecting to Bank & Verifying...</span>
                ) : (
                  <>
                    <CreditCard className="w-4 h-4" />
                    <span>Confirm & Record Payment (R {invoice.total.toLocaleString()})</span>
                  </>
                )}
              </button>

            </div>
          )}
        </div>

      </div>
    </div>
  );
};
