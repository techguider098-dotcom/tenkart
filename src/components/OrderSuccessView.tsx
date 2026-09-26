import React, { useState } from 'react';
import { 
  CheckCircle2, 
  DownloadCloud, 
  ExternalLink, 
  Copy, 
  Check, 
  Smartphone, 
  Laptop, 
  FileText, 
  ShieldCheck, 
  Mail, 
  ArrowLeft,
  Sparkles
} from 'lucide-react';
import { motion } from 'framer-motion';

interface OrderSuccessViewProps {
  paymentId: string;
  onReturnHome: () => void;
}

export const OrderSuccessView: React.FC<OrderSuccessViewProps> = ({
  paymentId,
  onReturnHome,
}) => {
  const [copiedKey, setCopiedKey] = useState(false);
  const [activeGuideTab, setActiveGuideTab] = useState<'ios' | 'android' | 'desktop'>('ios');
  
  const licenseKey = `TK-6K-${paymentId.replace(/[^a-zA-Z0-9]/g, '').slice(-6).toUpperCase() || 'LR2026'}-VAULT`;

  const handleCopyKey = () => {
    navigator.clipboard.writeText(licenseKey);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const handleDownloadManifest = () => {
    const textContent = `=====================================================
TENKART MASTER COLLECTION - 6000+ LIGHTROOM PRESETS
=====================================================
Order / Payment ID: ${paymentId}
License Key: ${licenseKey}
Amount Paid: ₹299 INR
Access: Lifetime Unlimited

YOUR CLOUD MIRROR ACCESS LINKS:
-----------------------------------------------------
1. Google Drive Cloud Vault:
   https://drive.google.com/drive/folders/tenkart-master-collection-vault

2. Dropbox Backup Mirror:
   https://www.dropbox.com/sh/tenkart-master-lightroom-backup

3. Direct AWS S3 Archive:
   https://downloads.tenkart.com/vault/Tenkart_Master_6000_Presets.zip

INCLUDED FOLDERS IN YOUR VAULT:
-----------------------------------------------------
- /01_Mobile_DNG_Presets (6,000+ DNG files for free iOS & Android Lightroom)
- /02_Desktop_XMP_Presets (Modern .XMP for Lightroom Classic, CC & Photoshop)
- /03_Legacy_LRTEMPLATE_Presets (For Lightroom 4, 5, 6)
- /04_Cinematic_Video_LUTs_CUBE (For Premiere Pro, DaVinci, FCP, CapCut)
- /05_Retouching_Brushes_And_Radial_Tools
- /06_Visual_Installation_Manual_PDF.pdf

CUSTOMER SUPPORT:
-----------------------------------------------------
Have any questions or need custom camera assistance?
Email our team: support@tenkart.com (24/7 turnaround)
30-Day 100% Money-Back Guarantee valid worldwide.
=====================================================`;

    const blob = new Blob([textContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Tenkart_Master_Collection_${paymentId || 'Access'}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#faf7f2] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Top return link */}
        <button
          onClick={onReturnHome}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-neutral-600 hover:text-neutral-950 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Tenkart Home</span>
        </button>

        {/* Hero Success Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl p-6 sm:p-10 border border-neutral-200/90 shadow-xl overflow-hidden relative"
        >
          {/* Ambient decorative glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative text-center max-w-2xl mx-auto space-y-4">
            
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 shadow-md shadow-emerald-500/20 mb-2">
              <CheckCircle2 className="w-12 h-12 stroke-[2.5]" />
            </div>

            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold uppercase tracking-wider text-emerald-800">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Payment Verified via Razorpay • ₹299 INR</span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-neutral-950 tracking-tight">
              You're In! Welcome to The Master Collection
            </h1>

            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
              Your transaction has been processed successfully. Below is your personal lifetime vault access with all 6,000+ presets, 4K video LUTs, and guides.
            </p>

            {/* Transaction reference & License key */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
              <div className="bg-[#faf7f2] p-3.5 rounded-xl border border-neutral-200">
                <span className="text-[11px] uppercase tracking-wider font-semibold text-neutral-500 block">
                  Razorpay Transaction ID
                </span>
                <span className="font-mono text-xs sm:text-sm font-bold text-neutral-900 break-all">
                  {paymentId}
                </span>
              </div>

              <div className="bg-[#faf7f2] p-3.5 rounded-xl border border-neutral-200 flex items-center justify-between">
                <div>
                  <span className="text-[11px] uppercase tracking-wider font-semibold text-neutral-500 block">
                    Your Master License Key
                  </span>
                  <span className="font-mono text-xs sm:text-sm font-bold text-amber-700">
                    {licenseKey}
                  </span>
                </div>
                <button
                  onClick={handleCopyKey}
                  className="p-2 rounded-lg bg-white border border-neutral-200 hover:bg-neutral-100 text-neutral-700 transition-colors cursor-pointer"
                  title="Copy License Key"
                >
                  {copiedKey ? (
                    <Check className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

          </div>

          {/* Primary Download CTAs */}
          <div className="mt-8 pt-8 border-t border-neutral-200 grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            <button
              onClick={handleDownloadManifest}
              className="p-5 rounded-2xl bg-neutral-950 hover:bg-neutral-900 text-white font-bold text-sm flex flex-col items-center justify-center gap-2 shadow-lg transition-all active:scale-98 cursor-pointer text-center"
            >
              <DownloadCloud className="w-6 h-6 text-amber-400" />
              <span>Download Master Vault (.ZIP)</span>
              <span className="text-[11px] text-neutral-400 font-normal">
                Direct High-Speed Download · 3.8 GB
              </span>
            </button>

            <a
              href="https://drive.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 rounded-2xl bg-white hover:bg-neutral-50 text-neutral-900 font-bold text-sm border-2 border-neutral-200 hover:border-amber-400 flex flex-col items-center justify-center gap-2 shadow-sm transition-all cursor-pointer text-center group"
            >
              <div className="flex items-center gap-1.5">
                <ExternalLink className="w-5 h-5 text-[#0084ff] group-hover:scale-110 transition-transform" />
                <span>Google Drive Mirror</span>
              </div>
              <span className="text-[11px] text-neutral-500 font-normal">
                Browse & Download Folders Individually
              </span>
            </a>

            <a
              href="https://dropbox.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 rounded-2xl bg-white hover:bg-neutral-50 text-neutral-900 font-bold text-sm border-2 border-neutral-200 hover:border-amber-400 flex flex-col items-center justify-center gap-2 shadow-sm transition-all cursor-pointer text-center group"
            >
              <div className="flex items-center gap-1.5">
                <ExternalLink className="w-5 h-5 text-sky-600 group-hover:scale-110 transition-transform" />
                <span>Dropbox Backup Mirror</span>
              </div>
              <span className="text-[11px] text-neutral-500 font-normal">
                Permanent 24/7 Cloud Backup
              </span>
            </a>

          </div>

        </motion.div>

        {/* Step-by-Step Installation Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200 shadow-sm"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-3 py-0.5 rounded-full mb-1">
                <Sparkles className="w-3 h-3" />
                <span>Quick-Start Guide</span>
              </div>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-neutral-950">
                How to Install Your Presets in 60 Seconds
              </h2>
            </div>

            {/* Device tabs */}
            <div className="flex bg-[#faf7f2] p-1 rounded-xl border border-neutral-200 self-start sm:self-auto">
              <button
                onClick={() => setActiveGuideTab('ios')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeGuideTab === 'ios'
                    ? 'bg-neutral-900 text-white shadow-sm'
                    : 'text-neutral-600 hover:text-neutral-950'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>iPhone / iPad</span>
              </button>
              <button
                onClick={() => setActiveGuideTab('android')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeGuideTab === 'android'
                    ? 'bg-neutral-900 text-white shadow-sm'
                    : 'text-neutral-600 hover:text-neutral-950'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Android</span>
              </button>
              <button
                onClick={() => setActiveGuideTab('desktop')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeGuideTab === 'desktop'
                    ? 'bg-neutral-900 text-white shadow-sm'
                    : 'text-neutral-600 hover:text-neutral-950'
                }`}
              >
                <Laptop className="w-3.5 h-3.5" />
                <span>Mac / Windows</span>
              </button>
            </div>
          </div>

          {/* Guide Steps */}
          {activeGuideTab === 'ios' && (
            <div className="space-y-4 text-xs sm:text-sm text-neutral-700">
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#faf7f2] border border-neutral-200/80">
                <div className="w-6 h-6 rounded-full bg-neutral-900 text-white font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">
                  1
                </div>
                <div>
                  <strong className="text-neutral-950 block mb-0.5">
                    Download the Mobile .DNG Presets Folder
                  </strong>
                  Open the Google Drive or ZIP link on your iPhone/iPad and save the DNG files directly to your Files or Camera Roll.
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#faf7f2] border border-neutral-200/80">
                <div className="w-6 h-6 rounded-full bg-neutral-900 text-white font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">
                  2
                </div>
                <div>
                  <strong className="text-neutral-950 block mb-0.5">
                    Open Free Adobe Lightroom Mobile
                  </strong>
                  Launch the free Lightroom app (no paid subscription needed). Tap the (+) Add Photo button and select the preset DNG files.
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#faf7f2] border border-neutral-200/80">
                <div className="w-6 h-6 rounded-full bg-neutral-900 text-white font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">
                  3
                </div>
                <div>
                  <strong className="text-neutral-950 block mb-0.5">
                    Apply or Save Preset
                  </strong>
                  Open any preset photo, tap the three dots (•••) in the top-right corner, and tap "Create Preset" to save it forever into your Presets menu!
                </div>
              </div>
            </div>
          )}

          {activeGuideTab === 'android' && (
            <div className="space-y-4 text-xs sm:text-sm text-neutral-700">
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#faf7f2] border border-neutral-200/80">
                <div className="w-6 h-6 rounded-full bg-neutral-900 text-white font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">
                  1
                </div>
                <div>
                  <strong className="text-neutral-950 block mb-0.5">
                    Download .DNG Files to Internal Storage
                  </strong>
                  Tap the download link above and extract the ZIP file using your phone's File Manager.
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#faf7f2] border border-neutral-200/80">
                <div className="w-6 h-6 rounded-full bg-neutral-900 text-white font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">
                  2
                </div>
                <div>
                  <strong className="text-neutral-950 block mb-0.5">
                    Import Into Lightroom Mobile
                  </strong>
                  Open the Lightroom app, select the "Presets" icon or import the DNG images into an album named "Master Presets".
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#faf7f2] border border-neutral-200/80">
                <div className="w-6 h-6 rounded-full bg-neutral-900 text-white font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">
                  3
                </div>
                <div>
                  <strong className="text-neutral-950 block mb-0.5">
                    Save to User Presets
                  </strong>
                  Tap the three dots (•••) &gt; "Create Preset" and organize them into your favorite theme packs!
                </div>
              </div>
            </div>
          )}

          {activeGuideTab === 'desktop' && (
            <div className="space-y-4 text-xs sm:text-sm text-neutral-700">
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#faf7f2] border border-neutral-200/80">
                <div className="w-6 h-6 rounded-full bg-neutral-900 text-white font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">
                  1
                </div>
                <div>
                  <strong className="text-neutral-950 block mb-0.5">
                    Lightroom Classic (v7.3+)
                  </strong>
                  Go to File &gt; Import Develop Profiles and Presets. Select the entire `.XMP` folder. All 10 curated collections will immediately populate in your Presets panel.
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#faf7f2] border border-neutral-200/80">
                <div className="w-6 h-6 rounded-full bg-neutral-900 text-white font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">
                  2
                </div>
                <div>
                  <strong className="text-neutral-950 block mb-0.5">
                    Photoshop Camera Raw (ACR)
                  </strong>
                  Open any image in Adobe Camera Raw &gt; Click the Presets tab &gt; Click (...) More Options &gt; Import Profiles &amp; Presets &gt; Choose the `.XMP` folder.
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#faf7f2] border border-neutral-200/80">
                <div className="w-6 h-6 rounded-full bg-neutral-900 text-white font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">
                  3
                </div>
                <div>
                  <strong className="text-neutral-950 block mb-0.5">
                    Video LUTs (.CUBE)
                  </strong>
                  In Premiere Pro (Lumetri Color &gt; Creative &gt; Look &gt; Browse) or DaVinci Resolve (Color Page &gt; LUTs &gt; Open LUT Folder).
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {/* Support & Guarantee Footer */}
        <div className="bg-white rounded-2xl p-6 border border-neutral-200 text-center flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-left">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center shrink-0">
              <Mail className="w-5 h-5 text-amber-900" />
            </div>
            <div>
              <div className="text-sm font-bold text-neutral-900">Need Help or File Backup?</div>
              <div className="text-xs text-neutral-500">
                Our team is on standby 24/7. Email us anytime at <span className="font-semibold text-neutral-800">support@tenkart.com</span>.
              </div>
            </div>
          </div>

          <button
            onClick={onReturnHome}
            className="px-6 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs sm:text-sm rounded-xl transition-colors cursor-pointer whitespace-nowrap"
          >
            Explore Tenkart
          </button>
        </div>

      </div>
    </div>
  );
};
