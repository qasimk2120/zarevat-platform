import React, { useState } from "react";
import { 
  Sparkles, 
  ShoppingBag, 
  Ruler, 
  ChevronRight, 
  Check, 
  RefreshCw, 
  ShieldCheck, 
  TrendingUp, 
  AlertCircle,
  Sliders,
  ArrowRight,
  Shirt,
  Zap,
  Tag,
  Star,
  Users,
  Eye,
  Percent,
  CheckCircle2,
  Globe,
  MapPin
} from "lucide-react";
import { motion } from "motion/react";
import zareveLogo from "../../assets/zarivat-logp.png";

interface PublicLandingProps {
  gender: string;
  setGender: (g: string) => void;
  refBrand: string;
  setRefBrand: (b: string) => void;
  refSize: string;
  setRefSize: (s: string) => void;
  targetBrand: string;
  setTargetBrand: (b: string) => void;
  category: string;
  setCategory: (c: string) => void;
  isCalculating: boolean;
  handleCalculate: () => void;
  prediction: any;
  waitlistEmail: string;
  setWaitlistEmail: (e: string) => void;
  waitlistSuccess: boolean;
  setWaitlistSuccess: (s: boolean) => void;
  setActiveTab: (tab: "landing" | "app" | "admin") => void;
  setIsAuthenticated: (auth: boolean) => void;
  nationality: string;
  setNationality: (n: string) => void;
  region: string;
  setRegion: (r: string) => void;
  city: string;
  setCity: (c: string) => void;
}

export default function PublicLanding({
  gender,
  setGender,
  refBrand,
  setRefBrand,
  refSize,
  setRefSize,
  targetBrand,
  setTargetBrand,
  category,
  setCategory,
  isCalculating,
  handleCalculate,
  prediction,
  waitlistEmail,
  setWaitlistEmail,
  waitlistSuccess,
  setWaitlistSuccess,
  setActiveTab,
  setIsAuthenticated,
  nationality,
  setNationality,
  region,
  setRegion,
  city,
  setCity
}: PublicLandingProps) {
  
  // Custom interactive demo states for Zarevat's regional matching simulator
  const [demoNationality, setDemoNationality] = useState("Saudi Arabian");
  const [demoCity, setDemoCity] = useState("Dammam");
  const [demoBrand, setDemoBrand] = useState("Zara");
  const [demoCategory, setDemoCategory] = useState("Hoodie");

  const startOnboarding = () => {
    setIsAuthenticated(true);
    setActiveTab("app");
  };

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (waitlistEmail.trim()) {
      setWaitlistSuccess(true);
    }
  };

  // Static Regional Fit Wisdom Matrix for the Landing Preview
  const getRegionalInsights = (corpCity: string, brandName: string) => {
    if (brandName === "Zara") {
      return {
        suggestedSize: "XL",
        confidence: 94,
        voters: 143,
        keptPercentage: 72,
        alternateSize: "L",
        alternatePercentage: 18,
        exchangedPercentage: 10,
        feedback: ["Shoulders run narrow.", "Sleeves slightly short."],
        testimonial: "Zara's European slim template is tighter around the upper back. Saudi shoppers of our athletic frame sized up to secure a balanced drape."
      };
    } else if (brandName === "Gap") {
      return {
        suggestedSize: "M",
        confidence: 96,
        voters: 98,
        keptPercentage: 81,
        alternateSize: "S",
        alternatePercentage: 12,
        exchangedPercentage: 7,
        feedback: ["Generous fit spacing.", "Relaxed shoulder drop."],
        testimonial: "Gap runs a classic, loose American sizing. Stand down one unit if you prefer a compact silhouette."
      };
    } else {
      return {
        suggestedSize: "L",
        confidence: 91,
        voters: 156,
        keptPercentage: 78,
        alternateSize: "M",
        alternatePercentage: 15,
        exchangedPercentage: 7,
        feedback: ["Boxy body proportions.", "True to standard measures."],
        testimonial: "Uniqlo relies on athletic box shapes. Baseline fit is optimal unless you prefer tapered, tight cuts."
      };
    }
  };

  const currentWisdom = getRegionalInsights(demoCity, demoBrand);

  const previews = [
    {
      id: "feed-1",
      title: "Cozy Fleece Sweatshirt",
      brand: "Zara",
      nationality: "Emirati",
      city: "Dubai",
      voters: 119,
      size: "XL",
      kept: 75,
      otherSize: "L",
      otherKept: 15,
      exchanged: 10,
      feedback: ["Narrow shoulder contours", "Snug armholes"],
      imageUrl: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: "feed-2",
      title: "Essential Everyday Hoodie",
      brand: "Zara",
      nationality: "Saudi Arabian",
      city: "Riyadh",
      voters: 234,
      size: "XL",
      kept: 72,
      otherSize: "L",
      otherKept: 18,
      exchanged: 10,
      feedback: ["Sleeves run slightly short", "Chest drapes clean"],
      imageUrl: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: "feed-3",
      title: "Relaxed Classic Pull",
      brand: "Gap",
      nationality: "Kuwaiti",
      city: "Kuwait City",
      voters: 84,
      size: "M",
      kept: 82,
      otherSize: "S",
      otherKept: 11,
      exchanged: 7,
      feedback: ["Generous torso room", "Soft cuffs spacing"],
      imageUrl: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=600"
    }
  ];

  return (
    <div className="space-y-24 py-2 text-slate-200" id="landing-root">
      
      {/* ================= HERO REDESIGN ================= */}
      <section className="relative overflow-hidden max-w-7xl mx-auto pt-6 pb-12 text-left" id="hero-section">
        {/* Soft elegant glows */}
        <div className="absolute -top-24 left-1/4 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-10 right-1/10 w-[500px] h-[500px] bg-pink-500/5 rounded-full blur-[140px] pointer-events-none"></div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* LEFT - Editorial Hook */}
          <div className="lg:col-span-6 space-y-6" id="hero-left">
            {/* Zarevat Logo */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <img src={zareveLogo} alt="Zarevat Logo" className="h-12 w-auto mb-6" />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/15 px-3.5 py-1.5 rounded-full text-indigo-300 font-bold font-mono tracking-wider text-[10px] uppercase"
              id="rebrand-tag"
            >
              <Users className="h-3.5 w-3.5 text-indigo-400 animate-pulse" />
              Regional & Community Fit Intelligence
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6.5xl font-black tracking-tight leading-[1.05] text-white"
              id="hero-heading"
            >
              Stop guessing. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 via-indigo-400 to-purple-300">
                Buy clothes that fit.
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-lg font-sans"
              id="hero-subtitle"
            >
              No body scanner cameras. No sterile generic AI predictions. Zarevat pools the outcomes of similar shoppers from your exact region, nationality, and physical build so you always know how garments represent in real life.
            </motion.p>

            {/* Quick Community Context Tags */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="grid grid-cols-3 gap-3 pt-2"
              id="community-stats-grid"
            >
              <div className="bg-slate-900/40 border border-slate-900/80 rounded-xl p-3 text-left">
                <span className="text-xl sm:text-2xl font-black text-indigo-400 font-mono">143+</span>
                <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-1 font-mono font-bold">Similar Shoppers</p>
              </div>
              <div className="bg-slate-900/40 border border-slate-900/80 rounded-xl p-3 text-left">
                <span className="text-xl sm:text-2xl font-black text-emerald-400 font-mono">72%</span>
                <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-1 font-mono font-bold">Consensus Kept</p>
              </div>
              <div className="bg-slate-900/40 border border-slate-900/80 rounded-xl p-3 text-left">
                <span className="text-xl sm:text-2xl font-black text-purple-400 font-mono">24+</span>
                <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-1 font-mono font-bold">Regional Hubs</p>
              </div>
            </motion.div>

            {/* Direct primary checkout hook commands */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-3 pt-3"
              id="cta-block"
            >
              <button
                onClick={startOnboarding}
                className="w-full sm:w-auto bg-indigo-650 hover:bg-indigo-600 text-white font-bold text-xs px-8 py-4 rounded-xl transition duration-300 shadow-lg shadow-indigo-600/10 flex items-center justify-center gap-2 cursor-pointer border border-transparent hover:scale-101 active:scale-99"
                id="btn-match-profile"
              >
                <Ruler className="h-4.5 w-4.5 text-emerald-400 animate-pulse" />
                Find My Fitting Match
              </button>
              <a
                href="#interactive-predictor"
                className="w-full sm:w-auto bg-slate-900/80 hover:bg-slate-900 border border-slate-800 text-slate-300 hover:text-white font-bold text-xs px-8 py-4 rounded-xl transition duration-300 flex items-center justify-center gap-2 hover:scale-101"
                id="btn-try-sim"
              >
                <Globe className="h-4 w-4 text-indigo-400" />
                Browse Regional Feed
              </a>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="flex items-center gap-2 pt-4 text-[11px] font-mono text-slate-400"
              id="trust-badge"
            >
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
              98.4% fit confidence verified by actual shoppers in Dammam, Riyadh, Dubai & Doha.
            </motion.div>
          </div>

          {/* RIGHT - Interactive Zarevat Spotify/Reddit Sizing View Card */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 relative"
            id="hero-right"
          >
            {/* Ambient Back Glow and decorative rings */}
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-2xl blur-xl -m-4 opacity-70 z-0"></div>

            {/* Simulated Live User Floating Profile */}
            <div className="absolute -top-3 -left-3 bg-[#0a0d14]/95 border border-slate-800/80 rounded-xl px-3 py-2 text-[10.5px] font-mono font-bold text-indigo-300 shadow-xl flex items-center gap-2 z-35" id="floating-spec-badge">
              <Globe className="h-3.5 w-3.5 text-emerald-400" />
              Saudi Arabian • Male • 178cm • Dammam
            </div>

            <div className="absolute -bottom-4 right-10 bg-[#0a0d14]/95 border border-slate-800/80 rounded-xl px-3.5 py-2 text-[10px] font-mono font-black text-rose-450 text-rose-400 shadow-xl flex items-center gap-2 z-35 animate-pulse" id="floating-alert-badge">
              <AlertCircle className="h-3.5 w-3.5 text-rose-400" />
              Zara Hoodie: Narrow shoulders advice fit
            </div>

            {/* PRIMARY OUTCOME STATS CARD FRAME */}
            <div className="bg-[#0b0e17] border border-slate-900 rounded-2xl overflow-hidden shadow-2xl relative z-10" id="main-landing-card">
              
              {/* Product Editorial Preview Photo */}
              <div className="relative aspect-[16/10] bg-slate-950 overflow-hidden group">
                <img 
                  src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=800" 
                  alt="Zarevat Premium Experience" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0e17] via-[#0b0e17]/30 to-transparent"></div>
                
                {/* Brand label overlay */}
                <div className="absolute top-4 right-4 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-lg border border-slate-800 text-[11px] font-mono font-bold text-white">
                  Zara Hoodie
                </div>

                {/* Direct Community Consensus Header */}
                <div className="absolute bottom-4 left-4 right-4 bg-slate-950/95 backdrop-blur-md p-3.5 rounded-xl border border-slate-800/80 shadow-lg flex items-center justify-between">
                  <div className="space-y-0.5 text-left">
                    <span className="text-[9px] uppercase tracking-wider text-slate-400 block font-mono">Consensus Size</span>
                    <span className="font-mono font-black text-xl text-indigo-400">Size XL</span>
                  </div>
                  <div className="h-8 w-px bg-slate-800"></div>
                  <div className="space-y-0.5 text-right">
                    <span className="text-[9px] uppercase tracking-wider text-slate-400 block font-mono">Similar Shoppers</span>
                    <span className="font-mono text-xs font-black text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded">143 Shoppers Checked</span>
                  </div>
                </div>
              </div>

              {/* OUTCOMES & TESTIMONIAL GRID (Pure Reddit & Spotify Concept) */}
              <div className="p-5 text-left space-y-4" id="card-inner-details">
                
                {/* Visual outcome breakdown stats */}
                <div className="bg-slate-950/80 border border-slate-900 rounded-xl p-3 space-y-2.5">
                  <div className="flex justify-between text-[11px] font-mono text-slate-400 font-bold border-b border-slate-905 pb-1.5">
                    <span>Community Outcome States</span>
                    <span className="text-white">Ratio %</span>
                  </div>
                  
                  <div className="space-y-1.5 text-xs font-mono">
                    {/* Kept XL */}
                    <div>
                      <div className="flex justify-between mb-0.5">
                        <span className="text-white font-bold flex items-center gap-1">
                          <Check className="h-3 w-3 text-emerald-400" /> Kept Size XL
                        </span>
                        <span className="text-emerald-400 font-black">72%</span>
                      </div>
                      <div className="w-full h-1 bg-slate-900 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-400 rounded-full" style={{ width: "72%" }}></div>
                      </div>
                    </div>

                    {/* Kept L */}
                    <div className="pt-1">
                      <div className="flex justify-between mb-0.5">
                        <span className="text-slate-450 text-slate-400">Kept Size L (Fitted)</span>
                        <span className="text-slate-300">18%</span>
                      </div>
                      <div className="w-full h-1 bg-slate-900 rounded-full overflow-hidden">
                        <div className="h-full bg-slate-655 bg-indigo-500/30 rounded-full" style={{ width: "18%" }}></div>
                      </div>
                    </div>

                    {/* Exchanged L for XL */}
                    <div className="pt-1">
                      <div className="flex justify-between mb-0.5 flex-nowrap">
                        <span className="text-slate-450 text-slate-400 flex items-center gap-1">
                          <RefreshCw className="h-2.5 w-2.5 text-amber-500" /> Exchanged L for XL
                        </span>
                        <span className="text-slate-350 font-bold text-amber-400">10%</span>
                      </div>
                      <div className="w-full h-1 bg-slate-900 rounded-full overflow-hidden">
                        <div className="h-full bg-amber-500 rounded-full" style={{ width: "10%" }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Common feedback points */}
                <div className="flex flex-wrap gap-2 pt-1" id="com-feedback">
                  <span className="text-[10px] font-mono bg-[#111625] border border-indigo-500/10 text-indigo-350 text-indigo-300 px-2.5 py-1 rounded-md">
                    ⚠️ Shoulders run narrow
                  </span>
                  <span className="text-[10px] font-mono bg-[#111625] border border-indigo-500/10 text-indigo-350 text-indigo-300 px-2.5 py-1 rounded-md">
                    📏 Sleeves slightly short
                  </span>
                </div>

                {/* Quote details */}
                <p className="text-[11px] text-slate-400 italic leading-normal">
                  "Most common outcome state report: European narrow seams trigger shoulder tension. Adding one standard scale block solves sleeve drop length perfectly."
                </p>

              </div>

            </div>
          </motion.div>

        </div>
      </section>

      {/* ================= GEOGRAPHIC REGIONAL COMMUNITY INTELLIGENCE THEORY ================= */}
      <section className="max-w-6xl mx-auto space-y-12" id="concept-theory">
        <div className="text-center max-w-xl mx-auto space-y-3">
          <span className="text-xs font-bold text-indigo-400 font-mono tracking-widest uppercase">Community Over Arbitrary Guidelines</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Built on Real Shopper Outcomes
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm font-sans">
            Sizing tables assume human proportions align mathematically. Zarevat answers a better question: "What did people of my region and nationality actually keep?"
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          
          <div className="bg-[#0e111a] border border-slate-900 p-6 rounded-2xl flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="h-9 w-9 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-bold">
                <Globe className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-white tracking-tight">Regional Cohorts</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Garment aesthetics shift by local consumer habits. We pool regional metrics (Saudi Arabian, Emirati, British, etc.) to discover patterns that generic brand databases completely miss.
              </p>
            </div>
          </div>

          <div className="bg-[#0e111a] border border-slate-900 p-6 rounded-2xl flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="h-9 w-9 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold">
                <TrendingUp className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-white tracking-tight">Real Purchase Demarcation</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                We monitor direct keeping or return rates of sizes down to separate cities (Jeddah, Riyadh, Doha, Dubai). See actual percentages of similar users keeping their items.
              </p>
            </div>
          </div>

          <div className="bg-[#0e111a] border border-slate-900 p-6 rounded-2xl flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="h-9 w-9 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center font-bold">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-white tracking-tight">No Camera Scans</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Stop uploading sensitive personal photographs onto cloud measurement servers. Zarevat respects privacy, establishing beautiful physical profiles in seconds without intrusive scanner SDKs.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ================= INTERACTIVE DYNAMIC SIMULATOR PLAYGROUND ================= */}
      <section id="interactive-predictor" className="max-w-5xl mx-auto space-y-10 scroll-mt-24">
        
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-indigo-400 text-xs font-mono tracking-widest font-bold uppercase block">Interactive Fit Sandbox</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Dynamic Regional Translator
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm">
            Select your matching coordinates, then choose destination lines to instantly query community feedback.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch pt-2">
          
          {/* Controls Panel (Col 5) */}
          <div className="md:col-span-5 bg-[#0e111a] border border-slate-900 p-6 rounded-2xl text-left space-y-5 flex flex-col justify-between">
            
            {/* Demographic input selection mockups */}
            <div className="space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold block">1. Regional Coordinates</span>
              
              <div className="space-y-3">
                {/* Nationality Selector mockup links */}
                <div>
                  <label className="text-[9px] text-slate-500 font-mono block mb-1 uppercase tracking-wider">Demographic Profile</label>
                  <div className="grid grid-cols-2 gap-2">
                    {["Saudi Arabian", "Emirati"].map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => {
                          setDemoNationality(item);
                          setDemoCity(item === "Saudi Arabian" ? "Dammam" : "Dubai");
                        }}
                        className={`text-xs py-2 px-3 border rounded-xl font-mono text-left transition cursor-pointer ${
                          demoNationality === item
                            ? "bg-indigo-600/10 border-indigo-500 text-indigo-300 font-bold"
                            : "bg-slate-950 border-slate-900 text-slate-500 hover:text-slate-300"
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>

                {/* City focus mockup list */}
                <div>
                  <label className="text-[9px] text-slate-500 font-mono block mb-1 uppercase tracking-wider">Current Location</label>
                  <div className="grid grid-cols-2 gap-2">
                    {["Dammam", "Riyadh", "Dubai", "Abu Dhabi"].map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => setDemoCity(item)}
                        className={`text-xs py-2 px-3 border rounded-xl font-mono text-left transition cursor-pointer ${
                          demoCity === item
                            ? "bg-indigo-650/10 border-indigo-500 text-indigo-300 font-bold"
                            : "bg-slate-950 border-slate-900 text-slate-500 hover:text-slate-350"
                        }`}
                      >
                        📍 {item}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Target Catalog Selectors */}
            <div className="space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold block">2. Target Retail Catalog</span>
              <div className="grid grid-cols-3 gap-2">
                {["Zara", "Gap", "Uniqlo"].map((brand) => (
                  <button
                    key={brand}
                    type="button"
                    onClick={() => setDemoBrand(brand)}
                    className={`text-[10.5px] py-2 border rounded-xl font-bold transition cursor-pointer ${
                      demoBrand === brand
                        ? "bg-indigo-600/20 border-indigo-500 text-white font-extrabold"
                        : "bg-slate-950 border-slate-900 text-slate-500 hover:text-slate-300"
                    }`}
                  >
                    {brand}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={startOnboarding}
              className="w-full bg-indigo-600 hover:bg-indigo-550 text-white font-bold text-xs py-3.5 rounded-xl transition flex items-center justify-center gap-2 cursor-pointer"
            >
              Verify My Demographics Profile
              <ArrowRight className="h-4.5 w-4.5 text-indigo-200" />
            </button>

          </div>

          {/* Results Analytics Panel (Col 7) */}
          <div className="md:col-span-7 bg-[#121622] border border-slate-900 p-6 rounded-2xl text-left flex flex-col justify-between" id="sand-results-column">
            
            <div className="space-y-5">
              <div className="flex items-center justify-between border-b border-slate-950 pb-3">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-black flex items-center gap-1.5">
                  <Sliders className="h-3.5 w-3.5 text-indigo-400 animate-pulse" /> Zarevat Community Insights
                </span>
                <span className="text-[10px] bg-emerald-500/10 border border-emerald-500/15 text-emerald-400 font-mono font-extrabold px-3 py-0.5 rounded-full">
                  {currentWisdom.confidence}% Fit Match Accuracy
                </span>
              </div>

              {/* Suggestions */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                
                {/* Visual Suggested Bubble */}
                <div className="sm:col-span-4 bg-slate-950 border border-slate-900/65 py-6 px-3 rounded-2xl flex flex-col items-center justify-center text-center">
                  <div className="h-16 w-16 bg-indigo-600 font-mono font-bold text-2xl rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-600/35 text-white">
                    {currentWisdom.suggestedSize}
                  </div>
                  <span className="text-[9px] uppercase tracking-wider text-slate-400 mt-2 font-mono">Suggested Size</span>
                </div>

                {/* Outcome Percentages breakdown */}
                <div className="sm:col-span-8 space-y-3 font-mono text-xs">
                  <div>
                    <div className="flex justify-between mb-0.5">
                      <span className="text-white font-bold flex items-center gap-1">✓ Kept Size {currentWisdom.suggestedSize}</span>
                      <span className="text-emerald-400 font-extrabold">{currentWisdom.keptPercentage}%</span>
                    </div>
                    <div className="w-full h-1 bg-slate-950 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${currentWisdom.keptPercentage}%` }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-0.5">
                      <span className="text-slate-400">Kept Alternate Size {currentWisdom.alternateSize}</span>
                      <span className="text-slate-300 text-indigo-300">{currentWisdom.alternatePercentage}%</span>
                    </div>
                    <div className="w-full h-1 bg-slate-950 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-400/50 rounded-full" style={{ width: `${currentWisdom.alternatePercentage}%` }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-0.5">
                      <span className="text-slate-450 text-slate-400 flex items-center gap-1">
                        <RefreshCw className="h-2.5 w-2.5 text-amber-500" /> Exchanged sizes
                      </span>
                      <span className="text-amber-400">{currentWisdom.exchangedPercentage}%</span>
                    </div>
                    <div className="w-full h-1 bg-slate-950 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-500 rounded-full" style={{ width: `${currentWisdom.exchangedPercentage}%` }}></div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Insights Explanations */}
              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-900/80 mt-2">
                <span className="text-[9.5px] font-mono text-indigo-400 uppercase tracking-widest font-bold block mb-1">
                  Verified {demoNationality} Experience Study
                </span>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  "Querying {currentWisdom.voters} verified shoppers in {demoCity} with similar biometric frames: {currentWisdom.testimonial}"
                </p>
              </div>

              {/* Warnings tags */}
              <div className="flex flex-wrap gap-2 pt-1" id="sandbox-warn-pills">
                {currentWisdom.feedback.map((point, index) => (
                  <span key={index} className="text-[10px] font-mono bg-yellow-500/5 border border-yellow-500/10 text-yellow-500 px-3 py-1 rounded-xl">
                    ⚠️ {point}
                  </span>
                ))}
              </div>

            </div>

            {/* Running Status pathway bar */}
            <div className="border-t border-slate-950/60 pt-4 mt-6">
              <div className="flex justify-between items-center text-[9px] text-slate-500 font-mono uppercase tracking-widest font-extrabold mb-1">
                <span>Dammam Community matching database active</span>
                <span className="text-indigo-400">{currentWisdom.voters} shopper entries found</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ================= GEOGRAPHIC FEED SAMPLES (Spotify recommendation look) ================= */}
      <section className="max-w-6xl mx-auto space-y-8" id="geographic-feed">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-900/60 pb-5 text-left">
          <div className="space-y-1">
            <span className="text-indigo-400 text-xs font-mono tracking-widest font-bold uppercase">Consensus Catalog</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Community Fit Feed Feed
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm">
              Discover popular catalog listings paired showing direct keep ratios of cohorts in your region.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {previews.map((item) => (
            <div 
              key={item.id}
              className="bg-[#0b0c14] border border-slate-900 rounded-2xl overflow-hidden group hover:border-indigo-500/20 hover:shadow-2xl transition-all duration-300 text-left flex flex-col justify-between"
            >
              {/* Top Image area */}
              <div className="relative aspect-[16/11] bg-slate-950 overflow-hidden">
                <img 
                  src={item.imageUrl} 
                  alt={item.title} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover opacity-80 group-hover:scale-103 transition duration-500"
                />
                
                {/* Cohort tags overlay */}
                <div className="absolute top-3 left-3 bg-slate-950/90 text-[10px] font-mono text-emerald-400 border border-slate-850 px-2.5 py-1 rounded-md">
                   📍 {item.city} cohort
                </div>

                <div className="absolute bottom-3 right-3 bg-slate-950/90 text-[9px] font-mono text-slate-400 border border-slate-850 px-2 py-0.5 rounded">
                   {item.brand}
                </div>
              </div>

              {/* Feed Card stats */}
              <div className="p-4 space-y-3.5">
                <div>
                  <h4 className="text-xs font-extrabold text-white leading-snug group-hover:text-indigo-300 transition">
                    {item.title}
                  </h4>
                  <p className="text-[10px] text-slate-500 font-mono mt-0.5">Based on {item.voters} verified buyers</p>
                </div>

                {/* Spotify Stats Box */}
                <div className="bg-[#121622] border border-slate-900 p-3 rounded-xl space-y-1.5 font-mono text-[11px]">
                  <div className="flex justify-between text-white font-bold">
                    <span>👥 Recommended Sizing</span>
                    <span className="text-indigo-400">Size {item.size}</span>
                  </div>
                  
                  <div className="flex justify-between text-[10px] text-slate-400 border-t border-slate-900/60 pt-1.5">
                    <span>Keep rate:</span>
                    <span className="text-emerald-400">{item.kept}% kept Size {item.size}</span>
                  </div>

                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>Alternate size kept:</span>
                    <span>{item.otherKept}% kept Size {item.otherSize}</span>
                  </div>
                </div>

                {/* Feedback points list */}
                <div className="text-[10px] leading-relaxed text-yellow-400 bg-yellow-500/5 border border-yellow-500/10 p-2.5 rounded-lg flex items-start gap-1.5">
                  <AlertCircle className="h-3.5 w-3.5 text-yellow-500 shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <span className="font-bold">Regional feedback notes:</span>
                    <p className="text-slate-400">{item.feedback.join(" • ")}</p>
                  </div>
                </div>

                <button
                  onClick={startOnboarding}
                  className="w-full bg-slate-950 border border-slate-900 hover:border-indigo-505 hover:border-indigo-500 text-slate-400 hover:text-white transition py-2 text-[9.5px] font-mono font-bold rounded-lg uppercase tracking-wider cursor-pointer"
                >
                  Join Saudi-Arabian Cohort Match
                </button>

              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= SHOPS & WARDROBE CONFIDENCE TESTIMONIALS ================= */}
      <section className="text-center max-w-5xl mx-auto space-y-12" id="social-stories">
        <div className="space-y-2">
          <span className="text-indigo-400 text-xs font-mono tracking-widest font-bold uppercase block">Shopper Consensus</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Loved By Wardrobe Enthusiasts
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm">
            Read direct experiences from shoppers celebrating returned package relief across key retail models.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          
          <div className="bg-[#0e111a] border border-slate-900 p-6 rounded-2xl relative space-y-4">
            <div className="flex items-center gap-1 text-yellow-400">
              {[...Array(5)].map((_, i) => <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />)}
            </div>
            <p className="text-slate-300 text-xs leading-relaxed italic">
              "I swap between Nike L and Zara XL constantly. Sizing jackets was always an exercise in trial-and-error until Zarevat. The outcome statistics saved me three double-orders this month alone!"
            </p>
            <div className="pt-3 border-t border-slate-950 flex justify-between items-center text-[10.5px]">
              <span className="text-white font-extrabold font-mono">Fahad M.</span>
              <span className="text-[10px] text-indigo-400 uppercase tracking-widest font-bold font-mono">Riyadh Shopper</span>
            </div>
          </div>

          <div className="bg-[#0e111a] border border-slate-900 p-6 rounded-2xl relative space-y-4">
            <div className="flex items-center gap-1 text-yellow-400">
              {[...Array(5)].map((_, i) => <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />)}
            </div>
            <p className="text-slate-300 text-xs leading-relaxed italic">
              "Broad athletic shoulders restrict me to baggy tees under standard retail designs. Zarevat gave me exact specifications on Zara's upper sleeve drapes and similar outcomes from 143 other Saudi shoppers. Kept XL—fits perfectly!"
            </p>
            <div className="pt-3 border-t border-slate-950 flex justify-between items-center text-[10.5px]">
              <span className="text-white font-extrabold font-mono">Ali K.</span>
              <span className="text-[10px] text-indigo-400 uppercase tracking-widest font-bold font-mono">Dammam cohort</span>
            </div>
          </div>

          <div className="bg-[#0e111a] border border-slate-900 p-6 rounded-2xl relative space-y-4">
            <div className="flex items-center gap-1 text-yellow-400">
              {[...Array(5)].map((_, i) => <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />)}
            </div>
            <p className="text-slate-300 text-xs leading-relaxed italic">
              "I verify all checkout orders against local Emirati outcome reports on Zarevat on my phone first. The warnings about tight chests are 100% correct!"
            </p>
            <div className="pt-3 border-t border-[#000]/20 flex justify-between items-center text-[10.5px]">
              <span className="text-white font-extrabold font-mono">Zayed A.</span>
              <span className="text-[10px] text-indigo-400 uppercase tracking-widest font-bold font-mono">Dubai cohort</span>
            </div>
          </div>

        </div>
      </section>

      {/* ================= THE WARDROBE PREMIUM WAITLIST ================= */}
      <section className="bg-gradient-to-r from-slate-950 via-indigo-950/30 to-slate-950 border border-slate-900 rounded-3xl p-8 sm:p-10 max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left shadow-lg">
        
        <div className="space-y-3 max-w-md">
          <h3 className="text-2xl sm:text-3.5xl font-black text-white tracking-tight leading-none">
            Stop guessing. <br /> Shop with confidence.
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans">
            Build your private geographic fit profile today and instantly view outcomes calculated for your specific demographic matches.
          </p>
        </div>

        <div className="w-full md:w-auto min-w-[310px] shrink-0 space-y-3">
          {waitlistSuccess ? (
            <div className="bg-emerald-500/10 border border-emerald-500/20 p-4.5 rounded-xl flex items-center gap-3 animate-fade-in text-left">
              <Check className="h-5.5 w-5.5 text-emerald-400 shrink-0" />
              <div className="space-y-0.5">
                <p className="text-xs font-bold text-white">Joined the Zarevat sizing pool!</p>
                <p className="text-[10px] text-slate-400 mt-0.5">Your email is verified under regional queue #0{Math.floor(Math.random() * 500) + 219}. We'll notify you as new brand batches go live.</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleWaitlistSubmit} className="flex gap-2 w-full">
              <input
                type="email"
                required
                value={waitlistEmail}
                onChange={(e) => setWaitlistEmail(e.target.value)}
                placeholder="Enter email to join waiting pool..."
                className="flex-1 bg-slate-950 border border-slate-900 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition font-mono"
              />
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-550 text-white font-bold px-4 py-3 text-xs rounded-xl transition shrink-0 cursor-pointer hover:scale-101"
              >
                Join Waitlist
              </button>
            </form>
          )}

          <div className="flex items-center gap-2 justify-center md:justify-start">
            <span className="h-1.5 w-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
            <span className="text-[10px] text-slate-505 text-slate-550 text-slate-500 font-mono uppercase font-bold">
              14,812 members trusted • No credit card ever
            </span>
          </div>
        </div>

      </section>

    </div>
  );
}
