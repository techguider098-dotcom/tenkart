import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Check, 
  Sparkles, 
  ShieldCheck, 
  ExternalLink, 
  X, 
  ChevronDown, 
  Zap, 
  Clock, 
  TrendingUp, 
  Gift, 
  Play, 
  Smartphone, 
  Laptop, 
  CheckCircle2,
  Lock,
  Layers
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface EcomEasyPageProps {
  onBackToPresets: () => void;
}

export const EcomEasyPage: React.FC<EcomEasyPageProps> = ({ onBackToPresets }) => {
  // Interactive Simulator state
  const [platform, setPlatform] = useState<'flipkart' | 'meesho'>('flipkart');
  const [isAutofilling, setIsAutofilling] = useState(false);
  const [autofillDone, setAutofillDone] = useState(false);
  const [simulatedFields, setSimulatedFields] = useState({
    title: '',
    desc: '',
    cat: '',
    price: '',
  });

  // Comparison Tab state
  const [compareTab, setCompareTab] = useState<'manual' | 'tool'>('manual');

  // ROI Calculator state
  const [dailyListings, setDailyListings] = useState(30);
  const [timePerListing, setTimePerListing] = useState(5);

  // FAQ open item
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Video Playing State
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);

  // Demo autofill templates
  const demoData = {
    flipkart: {
      url: 'flipkart.com/seller/listing/new',
      title: 'Women Cotton Printed Kurti — Regular Fit',
      desc: 'Premium combed cotton, breathable ethnic wear, all-day comfort, machine washable.',
      cat: 'Women Ethnic Wear · S / M / L / XL',
      price: '₹499',
    },
    meesho: {
      url: 'meesho.com/seller/listing/new',
      title: 'Men Casual Solid Round Neck T-Shirt',
      desc: '100% Bio-washed cotton blend, high stitch density, soft touch daily essential.',
      cat: 'Men Clothing · M / L / XL',
      price: '₹289',
    },
  };

  // Run the autofill simulator
  const handleRunAutofill = () => {
    setIsAutofilling(true);
    setAutofillDone(false);
    setSimulatedFields({ title: '', desc: '', cat: '', price: '' });

    const target = demoData[platform];
    setTimeout(() => {
      setSimulatedFields(target);
      setIsAutofilling(false);
      setAutofillDone(true);
    }, 900);
  };

  // Switch demo platform
  const handleSelectPlatform = (plat: 'flipkart' | 'meesho') => {
    setPlatform(plat);
    setAutofillDone(false);
    setSimulatedFields({ title: '', desc: '', cat: '', price: '' });
  };

  const ECOMEASY_RAZORPAY_URL = 'https://rzp.io/rzp/nQllqCJ';

  const handleOpenCheckout = () => {
    if (typeof window !== 'undefined' && (window as any).fbq) {
      try {
        (window as any).fbq('track', 'InitiateCheckout', {
          content_name: 'EcomEasy Vardaan Bundle Pack (4 Tools + 3 Bonus)',
          value: 99,
          currency: 'INR',
        });
      } catch (err) {
        // Continue to redirect regardless of adblocker/pixel state
      }
    }
    window.location.href = ECOMEASY_RAZORPAY_URL;
  };

  // Calculate saved time
  const manualMinutesTotal = dailyListings * timePerListing;
  const toolMinutesTotal = dailyListings * 0.35; // 20 seconds per listing
  const savedMinutesDaily = Math.round(manualMinutesTotal - toolMinutesTotal);
  const hoursSavedMonthly = Math.round((savedMinutesDaily * 26) / 60);

  return (
    <div className="min-h-screen bg-[#f7f5ef] text-[#16241d] font-sans antialiased selection:bg-[#c9952d] selection:text-white">
      
      {/* 1. Urgency Top Banner */}
      <div className="bg-gradient-to-r from-[#0a2620] via-[#0d3b2e] to-[#124832] text-[#f3e2b3] text-xs font-semibold py-2 px-4 text-center border-b border-emerald-950 flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-[#c9952d] shrink-0" />
        <span>
          🎁 Vardaan Bundle Pack Special: <strong className="text-white font-bold">₹99 Only</strong> (Save 98%) · Lifetime Validity · 4 Tools + 3 Bonus Gifts Ek Saath
        </span>
      </div>

      {/* 2. Top Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#e1ddd0] py-3.5 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          
          <div className="flex items-center gap-4">
            <button
              onClick={onBackToPresets}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-600 hover:text-neutral-950 transition-colors p-1.5 rounded-lg hover:bg-neutral-100 cursor-pointer"
              title="Return to Lightroom Presets"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back to Tenkart Presets</span>
            </button>

            <div className="h-4 w-px bg-neutral-200 hidden sm:block" />

            <div className="flex items-center gap-2.5">
              <div className="flex gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-[#e8615c]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#e3b341]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#3fb556]" />
              </div>
              <div>
                <span className="font-extrabold text-base tracking-tight text-[#0d3b2e]">
                  ECOMEASY<span className="text-[#c9952d]">VARDAAN</span>
                </span>
                <span className="text-[10px] text-neutral-400 font-mono block leading-none">
                  ecomeasy.store
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleOpenCheckout}
              className="px-4 sm:px-6 py-2 bg-gradient-to-r from-[#17703f] via-[#1f8a52] to-[#2fae6b] hover:from-[#135d34] hover:to-[#279259] text-white text-xs sm:text-sm font-extrabold rounded-xl shadow-md transition-all active:scale-95 cursor-pointer flex items-center gap-2"
            >
              <Zap className="w-4 h-4 fill-white" />
              <span>Abhi Kharido — ₹99</span>
            </button>
          </div>

        </div>
      </header>

      {/* 3. Hero Section */}
      <section className="pt-10 pb-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e2efe8] border border-[#1d5c47]/20 text-[#1d5c47] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#c9952d]" />
            <span>ecomeasy · Vardaan Bundle Pack</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0d3b2e] tracking-tight leading-tight">
            4 Powerful Tools Se Apna Meesho + Flipkart Par 1000+ Orders Karo{' '}
            <span className="text-[#c9952d] block sm:inline">— Ek Hi Bundle Mein</span>
          </h1>

          <p className="text-sm sm:text-base text-neutral-700 max-w-2xl mx-auto leading-relaxed">
            Meesho aur Flipkart par listing, shipping aur competitor research — sab kuch ek click mein. Vardaan Bundle ke 4 tools se apna selling kaam fast, easy aur profitable banao.
          </p>

          {/* Social Proof Star Bar */}
          <div className="flex items-center justify-center gap-2 text-xs text-neutral-600 font-semibold pt-1">
            <div className="flex text-amber-500 text-sm">★★★★★</div>
            <span><strong className="text-neutral-900">5.0 Rating</strong> · <strong>2,847+ Sellers</strong> already using ecomeasy tools</span>
          </div>

          {/* Compatibility Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            <span className="px-3 py-1 rounded-lg bg-white border border-[#e1ddd0] text-xs font-bold text-[#0d3b2e] shadow-2xs">
              🧰 4 Tools 1 Bundle
            </span>
            <span className="px-3 py-1 rounded-lg bg-white border border-[#e1ddd0] text-xs font-bold text-[#0d3b2e] shadow-2xs">
              💻 Mobile + PC
            </span>
            <span className="px-3 py-1 rounded-lg bg-white border border-[#e1ddd0] text-xs font-bold text-[#0d3b2e] shadow-2xs">
              🚫 No Monthly Charges
            </span>
            <span className="px-3 py-1 rounded-lg bg-white border border-[#e1ddd0] text-xs font-bold text-[#0d3b2e] shadow-2xs">
              ♾️ Lifetime Access
            </span>
            <span className="px-3 py-1 rounded-lg bg-white border border-[#e1ddd0] text-xs font-bold text-[#0d3b2e] shadow-2xs">
              🎁 3 Bonus Gifts
            </span>
          </div>

          {/* Video Preview Frame */}
          <div className="pt-6 max-w-2xl mx-auto">
            <div className="bg-[#1c2b25] rounded-2xl overflow-hidden shadow-2xl border border-white/10">
              <div className="flex items-center gap-2 px-4 py-2.5 bg-[#152019] border-b border-white/5">
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#e8615c]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#e3b341]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#3fb556]" />
                </div>
                <div className="bg-white/5 px-3 py-1 rounded text-[11px] font-mono text-[#9fc2b3] flex items-center gap-1.5">
                  <Zap className="w-3 h-3 text-amber-400" />
                  <span>ecomeasy.store/vardaan-bundle</span>
                </div>
              </div>

              <div className="relative aspect-video bg-neutral-950 flex items-center justify-center overflow-hidden group">
                <video
                  src="https://pub-c599eb800f744776a60c49f792a9de2e.r2.dev/ecomeasy%20new%20hai.mp4"
                  playsInline
                  controls={isPlayingVideo}
                  className="w-full h-full object-cover"
                />

                {!isPlayingVideo && (
                  <div 
                    onClick={() => setIsPlayingVideo(true)}
                    className="absolute inset-0 bg-black/40 hover:bg-black/20 flex flex-col items-center justify-center cursor-pointer transition-colors backdrop-blur-[2px]"
                  >
                    <div className="w-16 h-16 rounded-full bg-[#c9952d] text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="w-8 h-8 fill-white ml-1" />
                    </div>
                    <span className="text-white text-xs font-bold mt-2 uppercase tracking-wider">
                      Live Demo Dekho
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Primary CTA (WITHOUT ANY PUCHO BUTTON) */}
          <div className="pt-6 space-y-2 max-w-md mx-auto">
            <button
              onClick={handleOpenCheckout}
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#17703f] via-[#1f8a52] to-[#2fae6b] hover:from-[#135d34] hover:to-[#279259] text-white font-black text-base sm:text-lg shadow-xl shadow-emerald-950/20 hover:shadow-2xl transition-all active:scale-98 cursor-pointer flex items-center justify-center gap-2"
            >
              <span>🚀 ₹99 mein Abhi Kharido — 4 Tools + 3 Bonus →</span>
            </button>
            <p className="text-xs text-neutral-500 font-medium">
              ✅ Payment ke baad sab kuch turant WhatsApp aur email par milega
            </p>
          </div>

        </div>
      </section>

      {/* 4. What's in the Bundle — 4 Tools */}
      <section className="py-14 bg-white border-y border-[#e1ddd0] px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-8">
          
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#c9952d]">
              Bundle mein kya milega
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0d3b2e]">
              4 Powerful Tools — Ek Saath
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 max-w-xl mx-auto">
              Har tool alag se bhi kaam ka hai, lekin bundle mein saath use karo toh listing, pricing aur research teeno cover ho jaate hain.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Tool 1 */}
            <div className="p-6 rounded-2xl bg-[#f7f5ef] border border-[#e1ddd0] hover:border-[#c9952d] transition-all space-y-3 relative overflow-hidden group">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-neutral-400">01</span>
                <span className="px-2 py-0.5 rounded bg-pink-100 text-pink-700 text-[11px] font-bold">Meesho</span>
              </div>
              <h3 className="font-extrabold text-lg text-[#0d3b2e]">
                ⚡ Meesho Autolisting Tool
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                1 click mein multiple product listings — title, description, images, size sab auto-fill. Manual kaam ka time 90% kam ho jaata hai.
              </p>
            </div>

            {/* Tool 2 */}
            <div className="p-6 rounded-2xl bg-[#f7f5ef] border border-[#e1ddd0] hover:border-[#c9952d] transition-all space-y-3 relative overflow-hidden group">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-neutral-400">02</span>
                <span className="px-2 py-0.5 rounded bg-pink-100 text-pink-700 text-[11px] font-bold">Meesho</span>
              </div>
              <h3 className="font-extrabold text-lg text-[#0d3b2e]">
                💰 Meesho Low Shipping Tool
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Low shipping zones aur weight slabs samajhne ke liye guide + tool, taaki shipping cost kam ho aur margin maximum bane.
              </p>
            </div>

            {/* Tool 3 */}
            <div className="p-6 rounded-2xl bg-[#f7f5ef] border border-[#e1ddd0] hover:border-[#c9952d] transition-all space-y-3 relative overflow-hidden group">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-neutral-400">03</span>
                <span className="px-2 py-0.5 rounded bg-pink-100 text-pink-700 text-[11px] font-bold">Meesho</span>
              </div>
              <h3 className="font-extrabold text-lg text-[#0d3b2e]">
                🔍 Meesho Competitor Tool
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Competitor listings ki pricing, category aur positioning dekho — apni listing ko unse behtar plan karne ke liye.
              </p>
            </div>

            {/* Tool 4 */}
            <div className="p-6 rounded-2xl bg-[#f7f5ef] border border-[#e1ddd0] hover:border-[#c9952d] transition-all space-y-3 relative overflow-hidden group">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-neutral-400">04</span>
                <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-700 text-[11px] font-bold">Flipkart</span>
              </div>
              <h3 className="font-extrabold text-lg text-[#0d3b2e]">
                ⚡ Flipkart Autolisting Tool
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Flipkart seller panel ke liye bhi wahi 1-click auto listing speed — title, description aur images instant auto-fill.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 5. 3 Bonus Gifts */}
      <section className="py-14 bg-[#f1f7f3] border-b border-[#e1ddd0] px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-8">
          
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#c9952d]">
              Sath mein 100% Free
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0d3b2e]">
              3 Bonus Gifts — Bundle Ke Sath
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 max-w-xl mx-auto">
              Ye teeno bonuses sirf Vardaan Bundle buyers ko completely free milte hain.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            
            <div className="bg-white p-6 rounded-2xl border border-[#e1ddd0] shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-xl bg-red-100 text-red-700 flex items-center justify-center text-2xl font-bold">
                📕
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#f3e2b3] text-[#a87a1f]">
                Bonus #1
              </span>
              <h3 className="font-extrabold text-base text-[#0d3b2e]">
                1000+ Per Day Orders PDF
              </h3>
              <p className="text-xs text-neutral-600">
                1000 Orders lane ki Per day sabse best and top secret blueprint in 7 days.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#e1ddd0] shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center text-2xl font-bold">
                📈
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#f3e2b3] text-[#a87a1f]">
                Bonus #2
              </span>
              <h3 className="font-extrabold text-base text-[#0d3b2e]">
                Trending Products List
              </h3>
              <p className="text-xs text-neutral-600">
                Trending high-demand product list jisse aap lakho ki sales kar sakte hain Meesho aur Flipkart par.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#e1ddd0] shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center text-2xl font-bold">
                🎯
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#f3e2b3] text-[#a87a1f]">
                Bonus #3
              </span>
              <h3 className="font-extrabold text-base text-[#0d3b2e]">
                Free Unlimited Ads Credit Trick
              </h3>
              <p className="text-xs text-neutral-600">
                Meesho / Flipkart ke free advertising credits claim karne ki secret trick to boost rankings.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 6. Comparison: Manual vs Vardaan Bundle */}
      <section className="py-14 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="text-center space-y-2 mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-[#c9952d]">
            Compare karo
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0d3b2e]">
            Manual vs Vardaan Bundle — Khud Dekho Farak
          </h2>
        </div>

        <div className="bg-white rounded-3xl border border-[#e1ddd0] p-6 sm:p-8 shadow-sm space-y-6">
          
          <div className="flex bg-[#f7f5ef] p-1 rounded-xl border border-[#e1ddd0] max-w-xs mx-auto">
            <button
              onClick={() => setCompareTab('manual')}
              className={`flex-1 py-2 text-xs font-extrabold rounded-lg transition-all cursor-pointer ${
                compareTab === 'manual'
                  ? 'bg-red-600 text-white shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              😓 Manual
            </button>
            <button
              onClick={() => setCompareTab('tool')}
              className={`flex-1 py-2 text-xs font-extrabold rounded-lg transition-all cursor-pointer ${
                compareTab === 'tool'
                  ? 'bg-[#17703f] text-white shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              🚀 With Bundle
            </button>
          </div>

          {compareTab === 'manual' ? (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-red-50/60 border border-red-200 text-xs sm:text-sm text-red-900 space-y-2.5">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-red-700">❌</span>
                  <span>Ek single listing banane mein 5–8 minute lagte hain</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-red-700">❌</span>
                  <span>Shipping cost manually calculate karna padta hai</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-red-700">❌</span>
                  <span>Competitor pricing track karne ka koi easy tool nahi</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-red-700">❌</span>
                  <span>Trending products dhundhne mein ghanto nikal jaate hain</span>
                </div>
              </div>
              <div className="text-center font-mono font-bold text-xs text-red-700">
                ⏱ Daily Time Wasted: ~3–4 Ghante Har Din
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-emerald-50/80 border border-emerald-200 text-xs sm:text-sm text-emerald-950 space-y-2.5">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-emerald-600">✓</span>
                  <span>1 click mein listing auto-create — Meesho + Flipkart dono</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-emerald-600">✓</span>
                  <span>Low shipping tool se delivery cost pehle hi optimize</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-emerald-600">✓</span>
                  <span>Competitor tool se pricing gap turant pata chale</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-emerald-600">✓</span>
                  <span>Curated trending products list ready-made mil jaati hai</span>
                </div>
              </div>
              <div className="text-center font-mono font-bold text-xs text-emerald-700">
                ⚡ Work Done In: ~15–20 Minute Mein Khatam
              </div>
            </div>
          )}

        </div>
      </section>

      {/* 7. Live Interactive Autofill Demo */}
      <section className="py-14 bg-white border-y border-[#e1ddd0] px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-8">
          
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#c9952d]">
              Live Simulator · Khud Try Karo
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0d3b2e]">
              Profile Choose Karo, Autofill Dabao, Dekho Jaadu
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 max-w-xl mx-auto">
              Ye wahi real feature hai jo bundle ke autolisting tools Flipkart aur Meesho seller panel pe karte hain — yahan live try karke dekhein!
            </p>
          </div>

          <div className="bg-[#1c2b25] rounded-3xl overflow-hidden shadow-2xl border border-white/10 text-white">
            
            {/* Window bar */}
            <div className="px-5 py-3 bg-[#152019] flex items-center justify-between border-b border-white/10">
              <div className="flex gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#e8615c]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#e3b341]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#3fb556]" />
              </div>
              <div className="bg-white/10 px-4 py-1 rounded text-xs font-mono text-[#9fc2b3]">
                {demoData[platform].url}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleSelectPlatform('flipkart')}
                  className={`px-3 py-1 rounded-md text-xs font-bold transition-all cursor-pointer ${
                    platform === 'flipkart' ? 'bg-[#007aff] text-white' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Flipkart Profile
                </button>
                <button
                  onClick={() => handleSelectPlatform('meesho')}
                  className={`px-3 py-1 rounded-md text-xs font-bold transition-all cursor-pointer ${
                    platform === 'meesho' ? 'bg-pink-600 text-white' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Meesho Profile
                </button>
              </div>
            </div>

            {/* Form grid */}
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="space-y-4 text-xs">
                <div>
                  <label className="text-neutral-400 block mb-1 font-semibold">Product Title</label>
                  <div className="bg-white/5 border border-white/10 p-2.5 rounded-lg font-mono text-emerald-300 min-h-9 flex items-center">
                    {simulatedFields.title || (
                      <span className="text-neutral-500 italic">Click 'Autofill Karo' to fill...</span>
                    )}
                  </div>
                </div>

                <div>
                  <label className="text-neutral-400 block mb-1 font-semibold">Description</label>
                  <div className="bg-white/5 border border-white/10 p-2.5 rounded-lg font-mono text-emerald-300 min-h-16 flex items-start">
                    {simulatedFields.desc || (
                      <span className="text-neutral-500 italic">Product description will be auto-generated...</span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-neutral-400 block mb-1 font-semibold">Category & Size</label>
                    <div className="bg-white/5 border border-white/10 p-2.5 rounded-lg font-mono text-emerald-300 min-h-9 flex items-center">
                      {simulatedFields.cat || '—'}
                    </div>
                  </div>
                  <div>
                    <label className="text-neutral-400 block mb-1 font-semibold">Optimal Price</label>
                    <div className="bg-white/5 border border-white/10 p-2.5 rounded-lg font-mono text-amber-300 font-bold min-h-9 flex items-center">
                      {simulatedFields.price || '—'}
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={handleRunAutofill}
                    disabled={isAutofilling}
                    className="w-full py-3 bg-[#c9952d] hover:bg-[#b58323] disabled:opacity-50 text-white font-extrabold rounded-xl transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Zap className="w-4 h-4 fill-white" />
                    <span>{isAutofilling ? 'Autofilling...' : '⚡ Autofill Karo — 1 Click'}</span>
                  </button>
                </div>
              </div>

              {/* Preview card */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider block mb-3">
                    Live Seller Panel Listing Preview
                  </span>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
                    <div className="w-full h-28 bg-white/10 rounded-lg flex items-center justify-center text-3xl">
                      {platform === 'flipkart' ? '👗' : '👕'}
                    </div>
                    <div className="font-bold text-sm text-white">
                      {simulatedFields.title || 'Sample Listing Title'}
                    </div>
                    <div className="text-xs text-amber-300 font-bold">
                      {simulatedFields.price || '₹0'}
                    </div>
                    <div className="text-[11px] text-neutral-400">
                      {simulatedFields.cat || 'Select size & category'}
                    </div>
                  </div>
                </div>

                {autofillDone && (
                  <div className="mt-4 p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                    <span>🎉 Listing ready in 1.4s! Asli bundle se 20+ listings esi speed se banti hain.</span>
                  </div>
                )}
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 8. Time-Saving Receipt Calculator */}
      <section className="py-14 px-4 sm:px-6 lg:px-8 max-w-xl mx-auto">
        <div className="text-center space-y-2 mb-6">
          <span className="text-xs font-bold uppercase tracking-wider text-[#c9952d]">
            Apna Number Nikalo
          </span>
          <h2 className="text-2xl font-extrabold text-[#0d3b2e]">
            Time-Saving Estimate Receipt
          </h2>
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#e1ddd0] shadow-md font-mono text-xs space-y-5">
          <div className="text-center pb-2 border-b border-dashed border-neutral-300">
            <span className="font-bold text-sm tracking-wider text-[#0d3b2e] block">
              ECOMEASY VARDAAN · ROI ESTIMATE
            </span>
            <span className="text-[10px] text-neutral-500">Official Seller Productivity Audit</span>
          </div>

          <div className="space-y-3 font-sans">
            <div>
              <label className="text-[11px] text-neutral-500 uppercase font-mono block mb-1">
                Daily Listings Count
              </label>
              <select
                value={dailyListings}
                onChange={(e) => setDailyListings(Number(e.target.value))}
                className="w-full p-2.5 rounded-lg border border-neutral-300 bg-[#f7f5ef] text-neutral-900 font-semibold cursor-pointer"
              >
                <option value={10}>10 Listings / Day</option>
                <option value={20}>20 Listings / Day</option>
                <option value={30}>30 Listings / Day</option>
                <option value={50}>50 Listings / Day</option>
                <option value={100}>100 Listings / Day</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] text-neutral-500 uppercase font-mono block mb-1">
                Manual Time Per Listing
              </label>
              <select
                value={timePerListing}
                onChange={(e) => setTimePerListing(Number(e.target.value))}
                className="w-full p-2.5 rounded-lg border border-neutral-300 bg-[#f7f5ef] text-neutral-900 font-semibold cursor-pointer"
              >
                <option value={3}>3 Minutes (Fast)</option>
                <option value={5}>5 Minutes (Average)</option>
                <option value={8}>8 Minutes (Detailed)</option>
                <option value={10}>10 Minutes (Slow)</option>
              </select>
            </div>
          </div>

          <div className="border-t border-dashed border-neutral-300 pt-3 space-y-2">
            <div className="flex justify-between text-neutral-600">
              <span>Time Saved Daily:</span>
              <span className="font-bold text-emerald-700">{savedMinutesDaily} Minutes</span>
            </div>
            <div className="flex justify-between text-neutral-600">
              <span>Hours Saved Monthly:</span>
              <span className="font-bold text-emerald-700">~{hoursSavedMonthly} Hours / Month</span>
            </div>
            <div className="flex justify-between text-neutral-600">
              <span>Bundle Cost:</span>
              <span className="font-bold text-neutral-900">₹99 One-Time</span>
            </div>
            <div className="flex justify-between text-sm font-bold text-[#0d3b2e] pt-2 border-t border-neutral-200">
              <span>Potential Productivity Value:</span>
              <span className="text-[#c9952d]">100x+ Return</span>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Real WhatsApp Reviews */}
      <section className="py-14 bg-[#f1f7f3] border-y border-[#e1ddd0] px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#c9952d]">
              Real Sellers
            </span>
            <h2 className="text-2xl font-extrabold text-[#0d3b2e]">
              Jaise WhatsApp Pe Baat Hoti Hai
            </h2>
          </div>

          <div className="bg-[#e5ddd5] rounded-3xl p-4 sm:p-6 shadow-md border border-neutral-300 space-y-3">
            
            <div className="bg-white p-3.5 rounded-2xl rounded-tl-none shadow-xs text-xs space-y-1 max-w-sm">
              <span className="font-bold text-emerald-700 block">Rohit Kumar · Delhi</span>
              <p className="text-neutral-800">
                ★★★★★ Pehle 1 listing mein 5–7 min lagte the. Ab poora bundle use karke 10 min mein 25+ listings bana leta hoon!
              </p>
              <div className="text-[10px] text-neutral-400 text-right">Verified Buyer ✓✓</div>
            </div>

            <div className="bg-white p-3.5 rounded-2xl rounded-tl-none shadow-xs text-xs space-y-1 max-w-sm ml-auto">
              <span className="font-bold text-emerald-700 block">Pooja Jain · Mumbai</span>
              <p className="text-neutral-800">
                ★★★★★ Low shipping tool se margins better ho gaye, aur competitor tool se pata chalta hai kya price rakhun.
              </p>
              <div className="text-[10px] text-neutral-400 text-right">Verified Buyer ✓✓</div>
            </div>

            <div className="bg-white p-3.5 rounded-2xl rounded-tl-none shadow-xs text-xs space-y-1 max-w-sm">
              <span className="font-bold text-emerald-700 block">Sandeep Verma · Bangalore</span>
              <p className="text-neutral-800">
                ★★★★★ ₹99 mein 4 tools + bonus PDF, expected se zyada value mila. Setup bhi 2 minute mein ho gaya.
              </p>
              <div className="text-[10px] text-neutral-400 text-right">Verified Buyer ✓✓</div>
            </div>

          </div>
        </div>
      </section>

      {/* 10. Official Pricing Section (WITHOUT ANY PUCHO BUTTON) */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-xl mx-auto">
        <div className="text-center space-y-2 mb-6">
          <span className="text-xs font-bold uppercase tracking-wider text-[#c9952d]">
            Ek Baar Ki Keemat
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0d3b2e]">
            4 Tools + 3 Bonus — Lifetime Faida
          </h2>
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#c9952d] shadow-xl space-y-6 relative overflow-hidden">
          
          <div className="absolute top-0 right-0 bg-[#c9952d] text-white text-[10px] font-bold px-4 py-1 rounded-bl-xl uppercase tracking-wider">
            98% OFF DEAL
          </div>

          <div className="text-center space-y-1 pt-2">
            <span className="text-neutral-400 line-through text-lg font-bold">₹4,999</span>
            <div className="text-5xl font-black text-[#0d3b2e] tracking-tight">
              ₹99 <span className="text-xs font-bold text-neutral-500 uppercase tracking-normal">One-Time Only</span>
            </div>
            <p className="text-xs text-emerald-700 font-semibold">
              Lifetime Access · Koi Monthly Charge Nahi
            </p>
          </div>

          <div className="space-y-2.5 text-xs text-neutral-700 border-t border-b border-neutral-200 py-5">
            <div className="flex items-center gap-2.5">
              <Check className="w-4 h-4 text-emerald-600 shrink-0 stroke-[3]" />
              <span>Meesho Autolisting Tool (1-Click Fill)</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Check className="w-4 h-4 text-emerald-600 shrink-0 stroke-[3]" />
              <span>Meesho Low Shipping Calculator & Guide</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Check className="w-4 h-4 text-emerald-600 shrink-0 stroke-[3]" />
              <span>Meesho Competitor Insights & Price Tracker</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Check className="w-4 h-4 text-emerald-600 shrink-0 stroke-[3]" />
              <span>Flipkart Autolisting Tool</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Check className="w-4 h-4 text-[#c9952d] shrink-0 stroke-[3]" />
              <span className="font-semibold text-neutral-900">Bonus #1: High-Orders Playbook PDF</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Check className="w-4 h-4 text-[#c9952d] shrink-0 stroke-[3]" />
              <span className="font-semibold text-neutral-900">Bonus #2: Trending Products Ready List</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Check className="w-4 h-4 text-[#c9952d] shrink-0 stroke-[3]" />
              <span className="font-semibold text-neutral-900">Bonus #3: Free Ads Credit Trick</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Check className="w-4 h-4 text-emerald-600 shrink-0 stroke-[3]" />
              <span>Sab kuch instant WhatsApp & Email delivery</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-semibold text-center">
            🛡️ 7-Day Money Back Guarantee — Kaam na kare toh poora ₹99 wapas
          </div>

          {/* SINGLE PRIMARY CTA BUTTON — NO PUCHO BUTTON HERE */}
          <div className="space-y-2">
            <button
              onClick={handleOpenCheckout}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-[#17703f] via-[#1f8a52] to-[#2fae6b] hover:from-[#135d34] hover:to-[#279259] text-white font-extrabold text-base shadow-lg transition-all active:scale-98 cursor-pointer flex items-center justify-center gap-2"
            >
              <span>🚀 Abhi Kharido — Bundle ₹99 Only</span>
            </button>
            <p className="text-[11px] text-neutral-500 text-center font-medium">
              ✅ 100% Safe & RBI Approved Payment via UPI, Cards & Netbanking
            </p>
          </div>

        </div>
      </section>

      {/* 11. FAQ Accordion */}
      <section className="py-14 bg-white border-t border-[#e1ddd0] px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#c9952d]">
              Saare Sawaal
            </span>
            <h2 className="text-2xl font-extrabold text-[#0d3b2e]">
              Jo Bhi Doubts Hain
            </h2>
          </div>

          <div className="space-y-3">
            {[
              {
                q: 'Bundle mein exactly kya-kya milega?',
                a: '4 tools — Meesho Autolisting, Meesho Low Shipping, Meesho Competitor Tool, Flipkart Autolisting — plus 3 bonuses: Playbook PDF, Trending Products List, aur Ads credit trick.',
              },
              {
                q: 'Kya new sellers ke liye kaam karega?',
                a: 'Bilkul! Naye ya experienced dono sellers ke liye listing, shipping aur competitor research process bohot fast ho jaata hai.',
              },
              {
                q: 'Payment ke baad access kaise milega?',
                a: 'Payment confirm hote hi WhatsApp aur email pe turant sabhi 4 tools ka link + bonus PDFs download access mil jayenge.',
              },
              {
                q: 'Kya one-time payment hai?',
                a: 'Haan, sirf ek baar ₹99 dena hai. Lifetime access rahega — koi renewal ya hidden charges nahi.',
              },
              {
                q: 'Refund milega agar kaam na kare?',
                a: 'Haan! 7 din mein agar bundle aapke liye kaam na kare toh full refund diya jaata hai.',
              },
            ].map((faq, idx) => (
              <div key={idx} className="border border-[#e1ddd0] rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-4 text-left font-bold text-xs sm:text-sm text-[#0d3b2e] flex items-center justify-between bg-[#f7f5ef] hover:bg-neutral-100 transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${openFaq === idx ? 'rotate-180 text-[#c9952d]' : ''}`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="p-4 text-xs text-neutral-600 bg-white leading-relaxed border-t border-[#e1ddd0]">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 12. Footer with Link Back to Tenkart Lightroom Presets */}
      <footer className="bg-[#0a2620] text-neutral-400 py-12 px-4 sm:px-6 lg:px-8 border-t border-neutral-800 text-xs">
        <div className="max-w-6xl mx-auto space-y-6">
          
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-white/10">
            <div>
              <span className="font-extrabold text-base tracking-tight text-white block">
                ECOMEASY<span className="text-[#c9952d]">VARDAAN</span>
              </span>
              <p className="text-[11px] text-neutral-400">
                Helping Meesho and Flipkart sellers scale with automated tools.
              </p>
            </div>

            <button
              onClick={onBackToPresets}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Visit Tenkart Lightroom Presets</span>
            </button>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-neutral-500">
            <p>© {new Date().getFullYear()} EcomEasy.store · All rights reserved.</p>
            <div className="flex gap-4">
              <span>Instant WhatsApp Delivery</span>
              <span>·</span>
              <span>7-Day Refund Policy</span>
              <span>·</span>
              <span>RBI Secure Gateway</span>
            </div>
          </div>

        </div>
      </footer>

      {/* 13. Sticky Bottom Bar on Mobile (Without Pucho Button) */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-neutral-200 p-3 sm:hidden shadow-lg flex items-center justify-between">
        <div>
          <span className="text-xs text-neutral-500 block leading-tight">Vardaan Bundle</span>
          <span className="text-base font-extrabold text-[#0d3b2e]">₹99 Only</span>
        </div>

        <button
          onClick={handleOpenCheckout}
          className="px-5 py-2.5 bg-gradient-to-r from-[#17703f] to-[#2fae6b] text-white font-extrabold text-xs rounded-xl shadow-md cursor-pointer flex items-center gap-1.5"
        >
          <Zap className="w-3.5 h-3.5 fill-white" />
          <span>🚀 Abhi Kharido</span>
        </button>
      </div>

    </div>
  );
};
