import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Sparkles, 
  Check, 
  Star, 
  Clock, 
  Zap, 
  Headphones, 
  BookOpen, 
  ChevronDown, 
  ShieldCheck, 
  MessageCircle,
  Download,
  Award,
  Layers,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface EnglishEbooksPageProps {
  onBackToHome: () => void;
}

const RAZORPAY_CHECKOUT_URL = 'https://rzp.io/rzp/nQllqCJ';

// List of 24 core ebooks in the bundle
const EBOOKS_LIST = [
  { id: 1, title: 'Tenses E-book', img: 'https://graphyx.in/wp-content/uploads/2023/09/1.png', tag: 'Core Grammar' },
  { id: 2, title: 'Synonyms & Antonyms', img: 'https://graphyx.in/wp-content/uploads/2023/09/2.png', tag: 'Vocabulary' },
  { id: 3, title: 'Interview Skills', img: 'https://graphyx.in/wp-content/uploads/2023/09/3.png', tag: 'Career Boost' },
  { id: 4, title: 'Voice & Accent', img: 'https://graphyx.in/wp-content/uploads/2023/09/4.png', tag: 'Pronunciation' },
  { id: 5, title: 'Speak Natively', img: 'https://graphyx.in/wp-content/uploads/2023/09/5.png', tag: 'Fluency' },
  { id: 6, title: 'English Spoken Idioms', img: 'https://graphyx.in/wp-content/uploads/2023/09/6.png', tag: 'Expressions' },
  { id: 7, title: 'Basics of English Speaking', img: 'https://graphyx.in/wp-content/uploads/2023/09/7.png', tag: 'Beginner Guide' },
  { id: 8, title: 'Useful Common English Expressions', img: 'https://graphyx.in/wp-content/uploads/2023/09/8.png', tag: 'Daily Life' },
  { id: 9, title: '200 Phrasal Verbs and Idioms', img: 'https://graphyx.in/wp-content/uploads/2023/09/9.png', tag: 'Master Verbs' },
  { id: 10, title: 'Conversational Topics', img: 'https://graphyx.in/wp-content/uploads/2023/09/10.png', tag: 'Dialogue' },
  { id: 11, title: 'Grammar Rules', img: 'https://graphyx.in/wp-content/uploads/2023/09/11.png', tag: 'Rules & Logic' },
  { id: 12, title: 'Native Idioms', img: 'https://graphyx.in/wp-content/uploads/2023/09/12.png', tag: 'Advanced' },
  { id: 13, title: 'Golden Frames of English Speaking', img: 'https://graphyx.in/wp-content/uploads/2023/09/13.png', tag: 'Formula' },
  { id: 14, title: 'Effective Sentences to Speak Naturally', img: 'https://graphyx.in/wp-content/uploads/2023/09/14.png', tag: 'Confidence' },
  { id: 15, title: 'Daily Used Spoken Vocabulary', img: 'https://graphyx.in/wp-content/uploads/2023/09/15.png', tag: 'Word Bank' },
  { id: 16, title: 'Grammar Ebook with Exercises', img: 'https://graphyx.in/wp-content/uploads/2023/09/16.png', tag: 'Practice' },
  { id: 17, title: 'Job Interview Questions', img: 'https://graphyx.in/wp-content/uploads/2023/09/17.png', tag: 'HR Prep' },
  { id: 18, title: 'Practical Guide for Business Writing', img: 'https://graphyx.in/wp-content/uploads/2023/09/18.png', tag: 'Emails & Docs' },
  { id: 19, title: 'Daily Habits for Communication', img: 'https://graphyx.in/wp-content/uploads/2023/09/19.png', tag: 'Mindset' },
  { id: 20, title: 'How to Speak English Fluently', img: 'https://graphyx.in/wp-content/uploads/2023/09/20.png', tag: 'Speed & Flow' },
  { id: 21, title: '100 Days Motivation for Spoken English', img: 'https://graphyx.in/wp-content/uploads/2023/09/21.png', tag: 'Daily Practice' },
  { id: 22, title: 'Business Communications', img: 'https://graphyx.in/wp-content/uploads/2023/09/22.png', tag: 'Corporate' },
  { id: 23, title: 'Basic British Accent', img: 'https://graphyx.in/wp-content/uploads/2023/09/23.png', tag: 'UK Phonetics' },
  { id: 24, title: 'American Accent Pronunciation', img: 'https://graphyx.in/wp-content/uploads/2023/09/24.png', tag: 'US Phonetics' },
];

export const EnglishEbooksPage: React.FC<EnglishEbooksPageProps> = ({ onBackToHome }) => {
  // Countdown Timer State (e.g. 23 hours, 48 mins, 20 secs)
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 23,
    minutes: 48,
    seconds: 20,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return { days: 0, hours: 23, minutes: 59, seconds: 59 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Accordion state
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Direct checkout handler with Pixel tracking
  const handleBuyNow = () => {
    if (typeof window !== 'undefined' && (window as any).fbq) {
      try {
        (window as any).fbq('track', 'InitiateCheckout', {
          content_name: '25 Spoken English E-Books Bundle + 500 Audio Ebook',
          value: 99,
          currency: 'INR',
        });
      } catch (err) {
        // continue
      }
    }
    window.location.href = RAZORPAY_CHECKOUT_URL;
  };

  const faqs = [
    {
      q: 'What is included in the English Spoken Ebook bundle?',
      a: 'The English Spoken eBook Bundle consists of 24 comprehensive structured eBooks covering vocabulary expansion, pronunciation, tenses, grammar rules, conversation strategies, job interview mastery, and accents. PLUS you get the huge bonus: 500+ Listening Comprehension Audio MP3 files with full English conversation transcripts!',
    },
    {
      q: 'Who can benefit from this ebook bundle?',
      a: 'The eBook bundle is beneficial for anyone looking to enhance their spoken English skills, whether beginners, students preparing for exams or job interviews, working professionals, business owners, or individuals aiming to communicate fluently and naturally.',
    },
    {
      q: 'Are the ebooks suitable for self-study or do I need a tutor?',
      a: 'The eBooks are specially designed as self-study resources, providing step-by-step guidance, real-life examples, and practical speaking drills so you can easily master spoken English at your own pace without needing an expensive tutor.',
    },
    {
      q: 'Can I read these on my phone or tablet?',
      a: 'Absolutely! All eBooks are in universally compatible PDF format and the audio is standard MP3, making them seamlessly accessible on Android smartphones, iPhones, iPads, laptops, and tablets.',
    },
    {
      q: 'Is there any support provided if I have questions or need clarification?',
      a: 'Yes, we provide dedicated WhatsApp and email support. If you ever face any issues accessing files or have questions, our team is ready to assist you.',
    },
    {
      q: 'When will I get the ebooks after making payment?',
      a: 'Instant digital delivery! You will immediately receive a direct Google Drive download link on your screen and to your email address right after completing the ₹99 payment.',
    },
    {
      q: 'What payment methods do you support?',
      a: 'All payment methods are supported via 100% secure RBI-regulated gateway: UPI (Google Pay, PhonePe, Paytm, BHIM), Net Banking, Credit Cards, and Debit Cards.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#faf8f5] text-neutral-900 font-sans antialiased selection:bg-amber-400 selection:text-black">
      
      {/* 1. Top Offer Ribbon */}
      <div className="bg-gradient-to-r from-neutral-950 via-neutral-900 to-neutral-950 text-white py-2.5 px-4 text-center border-b border-amber-500/20 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2">
        <Sparkles className="w-4 h-4 text-amber-400 animate-pulse shrink-0" />
        <span>
          🎁 <strong>Special Limited Offer:</strong> Get 25+ Ebooks &amp; 500 Audio MP3 Files at Just <strong className="text-amber-400">Rs. 99/-</strong> (95% OFF)
        </span>
      </div>

      {/* 2. Top Header Navigation */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200 py-3.5 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-neutral-700 hover:text-black transition-colors p-1.5 rounded-lg hover:bg-neutral-100 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Tenkart</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <span className="font-extrabold text-sm sm:text-base tracking-tight text-neutral-900">
              TENKART <span className="text-[#007aff]">SPOKEN ENGLISH</span>
            </span>
          </div>

          <button
            onClick={handleBuyNow}
            className="px-4 sm:px-6 py-2 bg-[#007aff] hover:bg-[#0066d6] text-white text-xs sm:text-sm font-extrabold rounded-xl shadow-md transition-all active:scale-95 cursor-pointer flex items-center gap-1.5"
          >
            <Zap className="w-3.5 h-3.5 fill-white" />
            <span>BUY NOW @99</span>
          </button>

        </div>
      </header>

      {/* 3. Hero Section (Matched from screenshot & reference) */}
      <section className="pt-8 pb-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="text-center space-y-4">
          
          <span className="inline-block text-xs font-bold uppercase tracking-wider text-neutral-500 bg-neutral-100 px-3 py-1 rounded-full border border-neutral-200">
            Improve Your Spoken Skills
          </span>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-neutral-950 tracking-tight leading-tight">
            To Get Spoken English E-Books Bundle{' '}
            <span className="text-rose-600 block sm:inline">At Just Rs. 99/-</span>
          </h1>

          <p className="text-base sm:text-lg font-bold text-emerald-800 max-w-2xl mx-auto">
            Get FREE 500 Listening Comprehension Audio E-Book (MP3 + Transcripts)
          </p>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-900 text-xs font-bold border border-amber-200">
            <Clock className="w-3.5 h-3.5 text-amber-700" />
            <span>Offer Valid For Limited Time · Get It Now</span>
          </div>

          {/* Social Proof Pills */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <div className="px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-1.5 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>85K+ People Benefited From This</span>
            </div>
            <div className="px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold flex items-center gap-1.5 shadow-2xs">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span>4.45 / 5 Average Ratings</span>
            </div>
            <div className="px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-900 text-xs font-bold shadow-2xs">
              ✅ Only Positive Impacts &amp; Results
            </div>
          </div>

          {/* Hero Banner Graphic Container */}
          <div className="pt-4 max-w-2xl mx-auto">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-gradient-to-br from-indigo-900 via-neutral-900 to-neutral-950 p-2 sm:p-4">
              <div className="absolute top-4 right-4 z-20 bg-rose-600 text-white font-black text-xs sm:text-sm px-4 py-1.5 rounded-full shadow-lg transform rotate-2 animate-bounce">
                JUST ₹99/- NOW
              </div>
              <img
                src="https://graphyx.in/wp-content/uploads/2024/10/banner-1-ebook.png"
                alt="Unlock 25+ Ebooks + 500 Listening Comprehension Audio Files"
                className="w-full h-auto rounded-2xl object-cover"
                onError={(e) => {
                  // Fallback visual if third-party image is slow
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
          </div>

          {/* Primary BUY NOW Button */}
          <div className="pt-6 max-w-md mx-auto space-y-2">
            <button
              onClick={handleBuyNow}
              className="w-full py-4 px-6 rounded-2xl bg-[#007aff] hover:bg-[#0066d6] text-white font-black text-base sm:text-lg shadow-xl shadow-blue-500/25 transition-all transform active:scale-98 cursor-pointer flex items-center justify-center gap-2"
            >
              <span>BUY NOW FOR @99 →</span>
            </button>
            <p className="text-xs text-neutral-500 font-medium">
              ⚡ Instant Download Access On Your Email &amp; WhatsApp
            </p>
          </div>

        </div>
      </section>

      {/* 4. Who is This Bundle For? (Matched from Screenshot) */}
      <section className="py-12 bg-neutral-950 text-white text-center px-4 sm:px-6">
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 mx-auto flex items-center justify-center text-2xl font-bold">
            <AlertTriangle className="w-6 h-6 text-amber-400" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Who Is This Bundle For?
          </h2>
          
          <p className="text-lg sm:text-xl font-bold text-amber-300 max-w-xl mx-auto leading-relaxed">
            Anyone Who wants to improve their English Spoken Skills and Communication Skills!
          </p>

          <div className="pt-4 border-t border-neutral-800 space-y-1">
            <h3 className="text-xl font-extrabold text-neutral-200">Inside The Bundle ?</h3>
            <p className="text-sm font-semibold text-rose-400">
              Register in next 5 Minutes to Unlock the 25+ Ebooks &amp; audio file at Just Rs. 99/-
            </p>
          </div>
        </div>
      </section>

      {/* 5. 24 Ebooks Grid (Exact covers from graphyx) */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="text-center space-y-2 mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
            Complete Library
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-neutral-950">
            24 Core Spoken English E-Books Included
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 max-w-xl mx-auto">
            Click on any ebook to preview. Master every aspect of conversational fluency, corporate communication, and native accents.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {EBOOKS_LIST.map((book) => (
            <div 
              key={book.id}
              className="bg-white rounded-2xl p-3 sm:p-4 border border-neutral-200 hover:border-blue-400 hover:shadow-xl transition-all group flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-neutral-100 border border-neutral-200/60 shadow-xs flex items-center justify-center">
                  <img
                    src={book.img}
                    alt={book.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  <span className="absolute top-2 left-2 bg-neutral-900/80 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                    Ebook {book.id}
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                    {book.tag}
                  </span>
                  <h3 className="font-extrabold text-xs sm:text-sm text-neutral-900 leading-snug line-clamp-2">
                    {book.title}
                  </h3>
                </div>
              </div>

              <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-[11px] font-semibold text-neutral-500">
                <span>PDF Format</span>
                <span className="text-emerald-600 font-bold">Included</span>
              </div>
            </div>
          ))}
        </div>

        {/* Big Red Plus Graphic */}
        <div className="py-10 flex justify-center">
          <div className="w-14 h-14 rounded-full bg-rose-600 text-white flex items-center justify-center text-3xl font-black shadow-lg shadow-rose-600/30">
            +
          </div>
        </div>

        {/* 6. Huge Bonus Section: 500+ Listening Audio E-Book */}
        <div className="bg-gradient-to-br from-amber-50 via-white to-orange-50 border-2 border-amber-300 rounded-3xl p-6 sm:p-10 shadow-xl space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            
            <div className="space-y-4">
              <span className="px-3 py-1 rounded-full bg-rose-600 text-white font-extrabold text-xs tracking-wider uppercase">
                EXCLUSIVE MEGA BONUS #1
              </span>
              
              <h3 className="text-2xl sm:text-3xl font-black text-neutral-950 leading-tight">
                500+ Listening Comprehension E-Book &amp; Audio MP3 Files
              </h3>

              <p className="text-sm text-neutral-700 leading-relaxed">
                You can speak fluent English using these <strong>500 real-world conversations in just 30 days</strong>. Listen to native speakers on your earphones anytime, anywhere.
              </p>

              <div className="space-y-2 text-xs font-semibold text-neutral-800">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
                  <span>500 Complete English Conversations MP3 Audio Files</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
                  <span>Full Conversations Transcript Guide (Word-for-Word)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
                  <span>Native Pronunciation, Rhythm &amp; Intonation Practice</span>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <img
                src="https://graphyx.in/wp-content/uploads/2024/10/free-ausio-ebook-english.png"
                alt="500 Listening Comprehension Audio Files"
                className="max-h-72 w-auto rounded-2xl shadow-md border border-amber-200"
              />
            </div>

          </div>

          <div className="pt-4 border-t border-amber-200/80 text-center space-y-3">
            <p className="text-xs font-bold text-neutral-700">
              👆 Click On This Button To Get Spoken English Bundle Now !
            </p>
            <button
              onClick={handleBuyNow}
              className="px-8 py-3.5 bg-[#007aff] hover:bg-[#0066d6] text-white font-black text-base rounded-2xl shadow-lg transition-all active:scale-95 cursor-pointer inline-flex items-center gap-2"
            >
              <span>BUY NOW FOR @99 →</span>
            </button>
          </div>
        </div>

      </section>

      {/* 7. Urgent Countdown Timer */}
      <section className="py-14 bg-neutral-900 text-white text-center px-4 sm:px-6">
        <div className="max-w-3xl mx-auto space-y-6">
          <span className="text-amber-400 font-extrabold text-sm uppercase tracking-wider block">
            + Many More... Time is Running Out. BUY IT NOW!
          </span>

          <h2 className="text-2xl sm:text-3xl font-black">
            Hurry Up! Don't Miss The Opportunity <br />
            <span className="text-rose-400">This Page is Closing Down In:</span>
          </h2>

          {/* Countdown Boxes */}
          <div className="flex items-center justify-center gap-3 sm:gap-6 font-mono">
            <div className="bg-neutral-800 border border-neutral-700 rounded-2xl p-3 sm:p-5 w-20 sm:w-24 shadow-md">
              <span className="text-2xl sm:text-4xl font-black text-white block">
                {String(timeLeft.days).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs text-neutral-400 uppercase font-sans font-bold">Days</span>
            </div>
            <span className="text-2xl font-bold text-neutral-600">:</span>
            <div className="bg-neutral-800 border border-neutral-700 rounded-2xl p-3 sm:p-5 w-20 sm:w-24 shadow-md">
              <span className="text-2xl sm:text-4xl font-black text-amber-400 block">
                {String(timeLeft.hours).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs text-neutral-400 uppercase font-sans font-bold">Hours</span>
            </div>
            <span className="text-2xl font-bold text-neutral-600">:</span>
            <div className="bg-neutral-800 border border-neutral-700 rounded-2xl p-3 sm:p-5 w-20 sm:w-24 shadow-md">
              <span className="text-2xl sm:text-4xl font-black text-amber-400 block">
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs text-neutral-400 uppercase font-sans font-bold">Min</span>
            </div>
            <span className="text-2xl font-bold text-neutral-600">:</span>
            <div className="bg-neutral-800 border border-neutral-700 rounded-2xl p-3 sm:p-5 w-20 sm:w-24 shadow-md">
              <span className="text-2xl sm:text-4xl font-black text-rose-500 block">
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs text-neutral-400 uppercase font-sans font-bold">Sec</span>
            </div>
          </div>

          <div className="pt-4 space-y-2 max-w-md mx-auto">
            <p className="text-xs text-neutral-400">
              👆 Click On This Button To Get 25+ Spoken English Bundle Now !
            </p>
            <button
              onClick={handleBuyNow}
              className="w-full py-4 rounded-2xl bg-[#007aff] hover:bg-[#0066d6] text-white font-black text-base shadow-xl active:scale-95 transition-all cursor-pointer"
            >
              <span>BUY NOW FOR @99 →</span>
            </button>
          </div>
        </div>
      </section>

      {/* 8. Better English Better Life (3 Simple Steps) */}
      <section className="py-14 bg-white border-y border-neutral-200 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-black text-neutral-950 tracking-tight">
            BETTER ENGLISH · BETTER LIFE
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            
            <div className="p-6 rounded-2xl bg-[#faf8f5] border border-neutral-200 space-y-2">
              <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 font-black text-sm flex items-center justify-center mx-auto">
                1
              </div>
              <h3 className="font-extrabold text-base text-neutral-900">STEP 1: Buy Now</h3>
              <p className="text-xs text-neutral-600">
                Make a one-time secure payment of just ₹99 using UPI, Card, or Netbanking.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#faf8f5] border border-neutral-200 space-y-2">
              <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 font-black text-sm flex items-center justify-center mx-auto">
                2
              </div>
              <h3 className="font-extrabold text-base text-neutral-900">STEP 2: Instant Download</h3>
              <p className="text-xs text-neutral-600">
                Get instant access link on your screen, email, and WhatsApp without any wait.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#faf8f5] border border-neutral-200 space-y-2">
              <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-700 font-black text-sm flex items-center justify-center mx-auto">
                3
              </div>
              <h3 className="font-extrabold text-base text-neutral-900">STEP 3: Start Speaking</h3>
              <p className="text-xs text-neutral-600">
                Listen to the audio files and practice daily conversations to achieve fluency.
              </p>
            </div>

          </div>

          <div className="pt-2 space-y-3 max-w-sm mx-auto">
            <h4 className="font-bold text-sm text-neutral-900">
              Take Action Now, Don't Regret Again. BUY IT NOW!
            </h4>
            <button
              onClick={handleBuyNow}
              className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm rounded-xl shadow-md transition-all active:scale-95 cursor-pointer"
            >
              <span>BUY NOW FOR @99 →</span>
            </button>
          </div>
        </div>
      </section>

      {/* 9. Testimonials: What Our Users Say */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="text-center space-y-2 mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
            Real Reviews
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-neutral-950">
            What Our Users Say About Our Product
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="bg-white rounded-3xl p-6 border border-neutral-200 shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex text-amber-400 text-sm">★★★★★</div>
              <p className="text-xs text-neutral-700 italic leading-relaxed">
                "I am really impressed with the quality of this eBook bundle. The modules are well-structured, and the content is easy to understand. It has definitely enhanced my vocabulary and confidence in speaking English."
              </p>
            </div>
            <div className="flex items-center gap-3 pt-3 border-t border-neutral-100">
              <img
                src="https://graphyx.in/wp-content/uploads/2023/07/images-17.jpg"
                alt="Manoj bisht"
                className="w-10 h-10 rounded-full object-cover border border-neutral-200"
                onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
              />
              <div>
                <span className="font-bold text-xs text-neutral-900 block">Manoj bisht</span>
                <span className="text-[10px] text-emerald-600 font-semibold">Verified Student ✓</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-neutral-200 shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex text-amber-400 text-sm">★★★★★</div>
              <p className="text-xs text-neutral-700 italic leading-relaxed">
                "I was looking for a resource to improve my pronunciation, and this eBook bundle exceeded my expectations. The pronunciation exercises and tips provided have greatly helped me in sounding more natural while speaking English. Great value for money!"
              </p>
            </div>
            <div className="flex items-center gap-3 pt-3 border-t border-neutral-100">
              <img
                src="https://graphyx.in/wp-content/uploads/2023/07/close-up-portrait-of-young-beautiful-indian-or-south-asian-teenage-girl-in-dress-photo.jpg"
                alt="Richa"
                className="w-10 h-10 rounded-full object-cover border border-neutral-200"
                onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
              />
              <div>
                <span className="font-bold text-xs text-neutral-900 block">Richa</span>
                <span className="text-[10px] text-emerald-600 font-semibold">Verified Learner ✓</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-neutral-200 shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex text-amber-400 text-sm">★★★★★</div>
              <p className="text-xs text-neutral-700 italic leading-relaxed">
                "This eBook bundle has proved to be extremely helpful in improving my English skills. It covers all the essential topics comprehensively and provides practical exercises for real-life application. Highly recommended!"
              </p>
            </div>
            <div className="flex items-center gap-3 pt-3 border-t border-neutral-100">
              <img
                src="https://graphyx.in/wp-content/uploads/2023/07/depositphotos_81108858-stock-photo-casual-business-indian-boy-portrait.webp"
                alt="Ashwini gupta"
                className="w-10 h-10 rounded-full object-cover border border-neutral-200"
                onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
              />
              <div>
                <span className="font-bold text-xs text-neutral-900 block">Ashwini gupta</span>
                <span className="text-[10px] text-emerald-600 font-semibold">Verified Professional ✓</span>
              </div>
            </div>
          </div>

        </div>

        {/* Pricing Box Striking */}
        <div className="mt-12 bg-neutral-950 text-white rounded-3xl p-6 sm:p-8 text-center max-w-lg mx-auto space-y-4 shadow-xl">
          <div className="space-y-1">
            <span className="text-neutral-400 line-through text-base font-semibold block">
              Actual Ebook Value: Rs. 1999/-
            </span>
            <div className="text-3xl sm:text-4xl font-black text-amber-400 tracking-tight">
              Only Today You Pay: Rs. 99/-
            </div>
          </div>

          <button
            onClick={handleBuyNow}
            className="w-full py-4 rounded-xl bg-[#007aff] hover:bg-[#0066d6] text-white font-extrabold text-base shadow-lg transition-all active:scale-95 cursor-pointer"
          >
            <span>BUY NOW FOR @99 →</span>
          </button>
        </div>
      </section>

      {/* 10. WhatsApp Support Section (Matched from screenshot) */}
      <section className="py-12 bg-emerald-50/70 border-y border-emerald-200 text-center px-4 sm:px-6">
        <div className="max-w-xl mx-auto space-y-4">
          <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto text-xl shadow-md">
            💬
          </div>
          
          <h3 className="text-lg sm:text-xl font-extrabold text-neutral-900">
            Payment Kar Liya? Click Here For Instant WhatsApp Delivery
          </h3>
          <p className="text-xs text-neutral-600">
            If you made the payment or face any issue, click below to get instant access directly on WhatsApp:
          </p>

          <a
            href="https://wa.me/917830782683?text=Hi%2C%20I%20have%20completed%20the%20payment%20of%20%E2%82%B999%20for%2025%20English%20Spoken%20Ebooks.%20Please%20send%20me%20the%20download%20links."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white font-extrabold text-xs sm:text-sm shadow-md transition-all active:scale-95 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>CLICK AFTER PAYMENT — WHATSAPP 7830782683</span>
          </a>
        </div>
      </section>

      {/* 11. Frequently Asked Questions Accordion */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
            Doubts Cleared
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-neutral-950">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border border-neutral-200 rounded-2xl overflow-hidden bg-white shadow-xs">
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-4 sm:p-5 text-left font-bold text-xs sm:text-sm text-neutral-900 flex items-center justify-between hover:bg-neutral-50 transition-colors cursor-pointer"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-neutral-500 transition-transform ${openFaq === idx ? 'rotate-180 text-blue-600' : ''}`}
                />
              </button>
              {openFaq === idx && (
                <div className="p-4 sm:p-5 text-xs sm:text-sm text-neutral-600 bg-neutral-50/50 leading-relaxed border-t border-neutral-100">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 12. Final Satisfaction Guarantee & Offer Box */}
      <section className="py-16 bg-neutral-950 text-white px-4 sm:px-6 lg:px-8 border-t border-neutral-800">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          
          <div className="w-20 h-20 rounded-full border-4 border-amber-400 bg-amber-500/10 flex flex-col items-center justify-center mx-auto text-amber-400 font-black">
            <Award className="w-8 h-8" />
            <span className="text-[9px] uppercase tracking-wider">100% Guaranteed</span>
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-400 block">
              ONLY TODAY... YOU WILL GET...
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Lifetime FREE Updates &amp; Access + Unlimited Download
            </h2>
            <p className="text-sm font-bold text-emerald-400">
              Today You Will Get: Rs. 99/- Only
            </p>
          </div>

          <p className="text-xs text-neutral-400 max-w-md mx-auto">
            It can be a great deal for you! After payment, you will receive your access details directly to your email address and WhatsApp.
          </p>

          <div className="pt-2">
            <button
              onClick={handleBuyNow}
              className="w-full sm:w-auto px-10 py-4 rounded-2xl bg-[#007aff] hover:bg-[#0066d6] text-white font-extrabold text-base shadow-xl transition-all active:scale-95 cursor-pointer inline-flex items-center justify-center gap-2"
            >
              <span>BUY NOW FOR @99 →</span>
            </button>
          </div>

          <div className="pt-8 border-t border-neutral-800/80 text-[11px] text-neutral-500 space-y-2">
            <p>
              DISCLAIMER: This site is not a part of Facebook or Meta Inc. Additionally, this site is NOT endorsed by Facebook in any way. FACEBOOK is a trademark of FACEBOOK, Inc.
            </p>
            <p>© {new Date().getFullYear()} Tenkart Spoken English. All rights reserved.</p>
          </div>

        </div>
      </section>

      {/* 13. Mobile Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-neutral-200 p-3 sm:hidden shadow-lg flex items-center justify-between">
        <div>
          <span className="text-[10px] text-neutral-500 block leading-tight font-semibold">25+ Spoken Ebooks</span>
          <span className="text-base font-black text-neutral-950">₹99 Only</span>
        </div>

        <button
          onClick={handleBuyNow}
          className="px-5 py-2.5 bg-[#007aff] text-white font-extrabold text-xs rounded-xl shadow-md cursor-pointer flex items-center gap-1.5"
        >
          <Zap className="w-3.5 h-3.5 fill-white" />
          <span>BUY NOW @99</span>
        </button>
      </div>

    </div>
  );
};
