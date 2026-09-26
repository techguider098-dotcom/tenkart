import React, { useState } from 'react';
import { X, Check, Lock, Download, ShieldCheck, Sparkles, ExternalLink, Mail, Key } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [includeAddon, setIncludeAddon] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [licenseKey, setLicenseKey] = useState('');

  if (!isOpen) return null;

  const basePrice = 299;
  const addonPrice = 99;
  const totalPrice = includeAddon ? basePrice + addonPrice : basePrice;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = 'https://pages.razorpay.com/pl_TgbqHk52qsbuQ1/view';
  };

  const handleDownloadSample = () => {
    // Generate a simple text-based preset manifest as an instant download trigger
    const manifest = `The Master Collection (6000+ Presets)
License Key: ${licenseKey || 'MC-8492-LR6K-2026'}
Registered To: ${name || 'Photography Enthusiast'} (${email || 'customer@example.com'})

Included Folders:
- /01_Mobile_DNG_Presets (6,000+ Files - Free iOS & Android Lightroom)
- /02_Desktop_XMP_Presets (Lightroom Classic, CC, Photoshop ACR)
- /03_Cinematic_Video_LUTs_CUBE (Premiere, DaVinci, FCP, CapCut)
- /04_Brushes_And_Adjustment_Tools
- /05_Step_By_Step_Installation_Guide.pdf

Cloud Mirrors:
Google Drive: https://drive.google.com/drive/folders/master-collection-vault-2026
Dropbox: https://dropbox.com/sh/master-collection-backup-2026

Thank you for your purchase! 30-Day Money-Back Guarantee valid worldwide.`;

    const blob = new Blob([manifest], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Master_Collection_Access_Manifest.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl border border-neutral-200 relative animate-in zoom-in-95 duration-150">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-700 flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {!isCompleted ? (
          <div>
            {/* Header */}
            <div className="bg-[#faf7f2] p-6 border-b border-neutral-200 text-left">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-800 mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Instant Digital Access</span>
              </div>
              <h3 className="font-display text-2xl font-bold text-neutral-950">
                Unlock The Master Collection
              </h3>
              <p className="text-xs text-neutral-600 mt-1">
                Get immediate access to all 6,000+ presets for Mobile & Desktop.
              </p>
            </div>

            {/* Form & Order Details */}
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              
              {/* Items summary */}
              <div className="bg-neutral-50 rounded-xl p-4 border border-neutral-200/80 space-y-2 text-xs">
                <div className="flex justify-between font-semibold text-neutral-900">
                  <span>Tenkart Master Collection (6,000+ Presets & LUTs)</span>
                  <span>₹299.00</span>
                </div>
                <div className="text-[11px] text-neutral-500">
                  • 10 Preset Packs (.DNG Mobile + .XMP Desktop)
                  <br />• 4K Video LUTs + 120 Adjustment Brushes
                  <br />• Lifetime Free Updates & 24/7 Support
                </div>

                {/* Optional Bump */}
                <div className="pt-2 mt-2 border-t border-neutral-200 flex items-start gap-2.5">
                  <input
                    type="checkbox"
                    id="addon"
                    checked={includeAddon}
                    onChange={(e) => setIncludeAddon(e.target.checked)}
                    className="mt-0.5 rounded text-amber-600 focus:ring-amber-500 h-4 w-4 cursor-pointer"
                  />
                  <label htmlFor="addon" className="cursor-pointer text-xs leading-tight text-neutral-800">
                    <span className="font-bold">Add 4K Video Editing Masterclass (+₹99)</span>
                    <span className="block text-[11px] text-neutral-500 mt-0.5">
                      60-minute video walkthrough showing how to match video footage with Lightroom presets in CapCut & Premiere.
                    </span>
                  </label>
                </div>
              </div>

              {/* Total Row */}
              <div className="flex justify-between items-center px-1 text-sm font-bold text-neutral-950">
                <span>Total Due Today:</span>
                <span className="text-xl font-mono text-[#0084ff]">₹{totalPrice}.00</span>
              </div>

              {/* Inputs */}
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Alex Morgan"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-neutral-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Email Address (For Instant Download Delivery)
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex@example.com"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-neutral-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-4 px-6 bg-[#0084ff] hover:bg-[#0070e0] text-white font-bold text-base rounded-xl shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
              >
                {isProcessing ? (
                  <span>Generating Secure Vault Access...</span>
                ) : (
                  <>
                    <Download className="w-5 h-5" />
                    <span>Proceed to Razorpay Checkout • ₹{totalPrice}</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-4 text-xs text-neutral-500 pt-1">
                <span className="flex items-center gap-1">
                  <Lock className="w-3.5 h-3.5" /> 256-Bit SSL
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> 30-Day Money-Back
                </span>
                <span>•</span>
                <span>Instant Delivery</span>
              </div>

            </form>
          </div>
        ) : (
          /* Order Complete / Instant Download Hub */
          <div className="p-6 sm:p-8 text-center space-y-6 animate-in zoom-in-95 duration-150">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>

            <div>
              <div className="inline-block bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full mb-2">
                Order Confirmed · Instant Download Ready
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-neutral-950">
                Welcome to The Master Collection!
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 mt-1 max-w-md mx-auto">
                We've sent a receipt and permanent backup download links to <span className="font-semibold text-neutral-900">{email}</span>.
              </p>
            </div>

            {/* License Key Box */}
            <div className="bg-[#faf7f2] p-4 rounded-xl border border-neutral-200 text-left">
              <div className="flex items-center justify-between text-xs text-neutral-500 mb-1">
                <span className="flex items-center gap-1 font-semibold text-neutral-700">
                  <Key className="w-3.5 h-3.5 text-amber-600" />
                  Your Lifetime License Key
                </span>
                <span className="text-[11px] text-emerald-700 font-bold">Active & Verified</span>
              </div>
              <div className="font-mono text-sm font-bold text-neutral-900 bg-white p-2.5 rounded-lg border border-neutral-200 text-center select-all">
                {licenseKey}
              </div>
            </div>

            {/* Download Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleDownloadSample}
                className="w-full py-3.5 px-6 bg-[#0084ff] hover:bg-[#0070e0] text-white font-bold text-sm sm:text-base rounded-xl shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-5 h-5" />
                <span>Download Vault Manifest & License (.txt)</span>
              </button>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <a
                  href="https://drive.google.com"
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-neutral-600" />
                  <span>Google Drive Vault</span>
                </a>
                <a
                  href="https://dropbox.com"
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-neutral-600" />
                  <span>Dropbox Mirror</span>
                </a>
              </div>
            </div>

            {/* Installation Reminder */}
            <div className="p-3 bg-neutral-50 rounded-xl text-left border border-neutral-200/80 text-[11px] text-neutral-600 flex items-start gap-2">
              <Mail className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>
                Check your inbox for the PDF guide with quick 2-minute import instructions for iPhone, Android, and Desktop.
              </span>
            </div>

            <button
              onClick={onClose}
              className="text-xs text-neutral-500 hover:text-neutral-900 underline cursor-pointer"
            >
              Return to Website
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
