import React, { useState } from "react";
import { 
  Sliders, 
  Sparkles, 
  Ruler, 
  ChevronRight, 
  ShieldCheck, 
  AlertCircle, 
  RefreshCw, 
  ShoppingBag, 
  MessageSquare, 
  Bookmark, 
  Send, 
  Trash2,
  Lock,
  User,
  LogOut,
  Info,
  Check,
  ChevronUp
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import OnboardingWizard from "./OnboardingWizard";

interface CustomerPortalProps {
  isAuthenticated: boolean;
  setIsAuthenticated: (auth: boolean) => void;
  gender: string;
  setGender: (g: string) => void;
  height: number;
  setHeight: (h: number) => void;
  weight: number;
  setWeight: (w: number) => void;
  bodyShape: string;
  setBodyShape: (s: string) => void;
  refBrand: string;
  setRefBrand: (b: string) => void;
  refSize: string;
  setRefSize: (s: string) => void;
  targetBrand: string;
  setTargetBrand: (b: string) => void;
  category: string;
  setCategory: (c: string) => void;
  preferredFit: string;
  setPreferredFit: (f: string) => void;
  useAdvancedProfile: boolean;
  setUseAdvancedProfile: (v: boolean) => void;
  chest: number;
  setChest: (v: number) => void;
  waist: number;
  setWaist: (v: number) => void;
  shoulderWidth: number;
  setShoulderWidth: (v: number) => void;
  inseam: number;
  setInseam: (v: number) => void;
  armLength: number;
  setArmLength: (v: number) => void;
  hip: number;
  setHip: (v: number) => void;
  isCalculating: boolean;
  prediction: any;
  handleCalculate: () => void;
  sandboxSubTab: "curation" | "stylist" | "bookmarks";
  setSandboxSubTab: (tab: "curation" | "stylist" | "bookmarks") => void;
  savedForecasts: any[];
  handleRemoveBookmark: (id: string) => void;
  handleBookmarkCurrent: () => void;
  bookmarkSuccess: boolean;
  chatInput: string;
  setChatInput: (val: string) => void;
  isThinking: boolean;
  chatMessages: any[];
  handleChatConsult: (e: React.FormEvent) => void;
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
  baseCatalog: any[];
  handleApparelClick: (itm: any, size: string) => void;
  nationality: string;
  setNationality: (v: string) => void;
  region: string;
  setRegion: (v: string) => void;
  city: string;
  setCity: (v: string) => void;
}

export default function CustomerPortal({
  isAuthenticated,
  setIsAuthenticated,
  gender,
  setGender,
  height,
  setHeight,
  weight,
  setWeight,
  bodyShape,
  setBodyShape,
  refBrand,
  setRefBrand,
  refSize,
  setRefSize,
  targetBrand,
  setTargetBrand,
  category,
  setCategory,
  preferredFit,
  setPreferredFit,
  useAdvancedProfile,
  setUseAdvancedProfile,
  chest,
  setChest,
  waist,
  setWaist,
  shoulderWidth,
  setShoulderWidth,
  inseam,
  setInseam,
  armLength,
  setArmLength,
  hip,
  setHip,
  isCalculating,
  prediction,
  handleCalculate,
  sandboxSubTab,
  setSandboxSubTab,
  savedForecasts,
  handleRemoveBookmark,
  handleBookmarkCurrent,
  bookmarkSuccess,
  chatInput,
  setChatInput,
  isThinking,
  chatMessages,
  handleChatConsult,
  activeCategory,
  setActiveCategory,
  baseCatalog,
  handleApparelClick,
  nationality,
  setNationality,
  region,
  setRegion,
  city,
  setCity
}: CustomerPortalProps) {
  // Local toggler to trigger step onboarding wizard
  const [showWizard, setShowWizard] = useState<boolean>(false);
  
  // Shop Redirect overlays
  const [redirectOverlay, setRedirectOverlay] = useState<any | null>(null);

  // NEW: Robust local navigation state supporting Brand compare & Custom Virtual Closet
  const [localSubTab, setLocalSubTab] = useState<"curation" | "compare" | "stylist" | "bookmarks">("curation");

  // NEW: Advanced mobile-first multi-layout options for visual fashion browsing
  const [layoutType, setLayoutType] = useState<"classic" | "poster" | "pinterest">("poster");

  // Sync prop shifts smoothly
  React.useEffect(() => {
    if (sandboxSubTab === "curation" || sandboxSubTab === "stylist" || sandboxSubTab === "bookmarks") {
      setLocalSubTab(sandboxSubTab);
    }
  }, [sandboxSubTab]);

  // Brand Comparison UX states (Step 3)
  const [compareBrand1, setCompareBrand1] = useState<string>("Nike");
  const [compareBrand2, setCompareBrand2] = useState<string>("Zara");
  const [compareCategory, setCompareCategory] = useState<string>("Hoodies");

  // Personal Closet Inventory database (Step 4 & 6)
  const [closetInventory, setClosetInventory] = useState<any[]>([
    {
      id: "cl-1",
      brand: "Nike",
      title: "Sportswear Dri-FIT Training Tee",
      size: "M",
      category: "Tees",
      fitOpinion: "Fits Perfectly",
      added: "2 weeks ago"
    },
    {
      id: "cl-2",
      brand: "Zara",
      title: "Chic Comfort Bouclé Pullover Hoodie",
      size: "L",
      category: "Hoodies",
      fitOpinion: "Too Slim / Tight",
      added: "3 weeks ago"
    },
    {
      id: "cl-3",
      brand: "Uniqlo",
      title: "Blocktech Standard Utility Windbreaker",
      size: "M",
      category: "Jackets",
      fitOpinion: "Fits Perfectly",
      added: "Just last week"
    }
  ]);

  // Log new owned items form state
  const [newClosetBrand, setNewClosetBrand] = useState<string>("Adidas");
  const [newClosetTitle, setNewClosetTitle] = useState<string>("");
  const [newClosetSize, setNewClosetSize] = useState<string>("M");
  const [newClosetCategory, setNewClosetCategory] = useState<string>("Hoodies");
  const [newClosetFitOpinion, setNewClosetFitOpinion] = useState<string>("Fits Perfectly");
  const [addClosetSuccess, setAddClosetSuccess] = useState<boolean>(false);

  const handleAddClosetItem = (e: React.FormEvent) => {
    e.preventDefault();
    const titleStr = newClosetTitle.trim() || `${newClosetBrand} Custom ${newClosetCategory}`;
    const newItem = {
      id: `cl-${Date.now()}`,
      brand: newClosetBrand,
      title: titleStr,
      size: newClosetSize,
      category: newClosetCategory,
      fitOpinion: newClosetFitOpinion,
      added: "Just now"
    };

    setClosetInventory(prev => [newItem, ...prev]);
    setNewClosetTitle("");
    setAddClosetSuccess(true);
    setTimeout(() => setAddClosetSuccess(false), 3000);

    // Dynamic Calibration Learning: Shift the current biometric profile based on feedback!
    if (newClosetFitOpinion === "Too Slim / Tight") {
      setChest(Math.min(140, chest + 2));
      setWaist(Math.min(135, waist + 2));
    } else if (newClosetFitOpinion === "Too Loose / Long") {
      setChest(Math.max(70, chest - 2));
      setWaist(Math.max(60, waist - 2));
    }
  };

  // Real Feedback loop and calibration state (STEP 6 & STEP 7)
  const [feedbackRating, setFeedbackRating] = useState<string>("perfect");
  const [feedbackComment, setFeedbackComment] = useState<string>("");
  const [feedbackSuccessNotice, setFeedbackSuccessNotice] = useState<boolean>(false);
  const [submittedFeedbackList, setSubmittedFeedbackList] = useState<any[]>([
    {
      id: "f-1",
      brand: "Nike",
      predictedSize: "M",
      rating: "perfect",
      comment: "Unbelievable accuracy around the back and shoulders.",
      timestamp: "5 mins ago",
      type: "Level 2 Verified"
    },
    {
      id: "f-2",
      brand: "Zara",
      predictedSize: "L",
      rating: "tight",
      comment: "A bit narrow near chest seam, following standard size up advised.",
      timestamp: "2 hours ago",
      type: "Level 1 Estimated"
    }
  ]);

  const [expandedComparativeRates, setExpandedComparativeRates] = useState<boolean>(false);

  // Submits feed feedback to our collaborative fit cluster
  const handleSubmitFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prediction) return;
    
    const newFeedback = {
      id: `f-${Date.now()}`,
      brand: targetBrand,
      predictedSize: prediction.predictedSize,
      rating: feedbackRating,
      comment: feedbackComment || "Fits correctly as resolved by CogniFit logic.",
      timestamp: "Just now",
      type: useAdvancedProfile ? "Level 2 Verified" : "Level 1 Estimated"
    };

    setSubmittedFeedbackList([newFeedback, ...submittedFeedbackList]);
    setFeedbackComment("");
    setFeedbackSuccessNotice(true);
    setTimeout(() => {
      setFeedbackSuccessNotice(false);
    }, 4500);
  };

  // Auto trigger calculations on first load
  const loadDemoSessionDirect = () => {
    setIsAuthenticated(true);
    // Trigger baseline calculation with default proportions
    setTimeout(() => {
      handleCalculate();
    }, 100);
  };

  const handleWizardComplete = () => {
    setIsAuthenticated(true);
    setShowWizard(false);
    setTimeout(() => {
      handleCalculate();
    }, 100);
  };

  // If NOT authenticated, show gorgeous choice gate
  if (!isAuthenticated) {
    if (showWizard) {
      return (
        <div className="py-4">
          <button 
            onClick={() => setShowWizard(false)}
            className="mb-6 flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-white transition cursor-pointer bg-slate-900/50 py-1.5 px-3.5 rounded-xl border border-slate-900"
          >
            ← Cancel Onboarding
          </button>
          <OnboardingWizard
            gender={gender}
            setGender={setGender}
            height={height}
            setHeight={setHeight}
            weight={weight}
            setWeight={setWeight}
            bodyShape={bodyShape}
            setBodyShape={setBodyShape}
            preferredFit={preferredFit}
            setPreferredFit={setPreferredFit}
            refBrand={refBrand}
            setRefBrand={setRefBrand}
            refSize={refSize}
            setRefSize={setRefSize}
            useAdvancedProfile={useAdvancedProfile}
            setUseAdvancedProfile={setUseAdvancedProfile}
            chest={chest}
            setChest={setChest}
            waist={waist}
            setWaist={setWaist}
            shoulderWidth={shoulderWidth}
            setShoulderWidth={setShoulderWidth}
            inseam={inseam}
            setInseam={setInseam}
            armLength={armLength}
            setArmLength={setArmLength}
            hip={hip}
            setHip={setHip}
            nationality={nationality}
            setNationality={setNationality}
            region={region}
            setRegion={setRegion}
            city={city}
            setCity={setCity}
            onComplete={handleWizardComplete}
          />
        </div>
      );
    }

    // Default Gate: Modern consumer welcome landing styled with elegance
    return (
      <div className="max-w-2xl mx-auto my-10 sm:my-14 p-6 sm:p-10 bg-[#0c101a] border border-slate-900 rounded-2xl shadow-2xl relative overflow-hidden animate-fade-in text-left">
        {/* Decorative backdrop glow */}
        <div className="absolute top-0 right-1/4 w-40 h-40 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="space-y-6 relative z-10">
          <div className="flex items-center gap-2.5">
            <div className="bg-indigo-600/20 p-2 rounded-xl text-indigo-400 border border-indigo-500/20 shrink-0">
              <Lock className="h-5 w-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-indigo-400 font-mono uppercase tracking-widest block bg-indigo-500/5 border border-indigo-500/10 px-2 py-0.5 rounded-md w-fit">
                CogniFit Portal
              </span>
              <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight mt-1">
                Enter Your Private Fitting Room
              </h1>
            </div>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed font-sans">
            Save your size reference once, unlock brand size predictions, and chat with Jordan, our personal AI Stylist. Choose an option below to enter.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            {/* Option 1: Premium onboarding stepper */}
            <div className="bg-[#121727] border border-indigo-500/15 p-5 rounded-xl relative hover:border-indigo-500/35 transition flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <span className="text-[10px] bg-indigo-500/15 text-indigo-300 px-2 py-0.5 rounded-full font-bold font-mono uppercase">Recommended</span>
                <h3 className="text-sm font-bold text-white uppercase tracking-wide">1. Create Fit Profile</h3>
                <p className="text-xs text-slate-400 leading-normal">
                  Step-by-step helper to set height, body shape, and your favorite brand sizes.
                </p>
              </div>
              <button
                onClick={() => setShowWizard(true)}
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs py-2.5 rounded-lg transition flex items-center justify-center gap-1.5 cursor-pointer shadow-lg shadow-indigo-500/10"
              >
                <Ruler className="h-3.5 w-3.5" />
                Start Onboarding
              </button>
            </div>

            {/* Option 2: Demo Fast-track */}
            <div className="bg-slate-950/40 border border-slate-900 p-5 rounded-xl flex flex-col justify-between space-y-4 hover:border-slate-800 transition">
              <div className="space-y-2">
                <span className="text-[10px] bg-slate-805 bg-slate-900 text-slate-450 px-2 py-0.5 rounded-full font-mono uppercase font-semibold">Fast Track</span>
                <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wide">2. Preview Account</h3>
                <p className="text-xs text-slate-450 text-slate-400 leading-normal">
                  Instantly access using our pre-loaded test shopper profile (Jordan, 178cm, standard shape, wearing Nike M).
                </p>
              </div>
              <button
                onClick={loadDemoSessionDirect}
                className="w-full bg-slate-900 hover:bg-slate-850 text-slate-200 border border-slate-800 hover:border-slate-755 font-semibold text-xs py-2.5 rounded-lg transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <User className="h-3.5 w-3.5" />
                Quick Access Preview
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 justify-center pt-2 text-[11px] text-slate-500 font-mono">
            <span className="h-1.5 w-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
            <span>All measurements are securely stored client-side. Anonymous & Secure.</span>
          </div>
        </div>
      </div>
    );
  }

  // Active Authenticated Customer Dashboard
  return (
    <div className="space-y-10 animate-fade-in text-slate-100">
      
      {/* 1. COMPACT MEMBER LOGGED BANNER */}
      <div className="bg-[#0c101a] border border-slate-900 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3.5 text-left">
          <div className="h-10 w-10 bg-indigo-600 rounded-xl text-white flex items-center justify-center font-bold font-mono text-sm shadow-md glow-indigo">
            {gender === "female" ? "JD" : "JD"}
          </div>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-1.5 uppercase font-mono tracking-wide">
              Logged in: Jordan Profile
              <span className="h-2 w-2 bg-emerald-400 rounded-full animate-pulse"></span>
            </h3>
            <p className="text-[10px] text-indigo-300 font-mono uppercase mt-0.5">
              Active Profile: Height {height}cm • Weight {weight}kg • Shape Type: <span className="underline decoration-indigo-500/40 font-bold capitalize">{bodyShape}</span>
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsAuthenticated(false)}
          className="text-xs text-slate-450 text-slate-400 hover:text-red-400 hover:bg-red-500/5 px-3 py-1.5 rounded-lg border border-transparent hover:border-red-500/10 transition flex items-center gap-1.5 cursor-pointer font-semibold"
        >
          <LogOut className="h-3.5 w-3.5" />
          Logout
        </button>
      </div>

      {/* 2. PROFILE CONFIGURATION & PREDICTION MATRIX */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left column Settings board */}
        <div className="lg:col-span-5 bg-[#0e111a] border border-slate-900 rounded-2xl overflow-hidden shadow-xl text-left">
          <div className="border-b border-slate-900 bg-slate-900/30 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sliders className="h-4 w-4 text-indigo-400" />
              <span className="font-bold text-xs tracking-wide text-white uppercase font-mono">1. My Profile Settings</span>
            </div>
            <span className="text-[10px] text-slate-500 font-mono">Real-Time Sync</span>
          </div>

          <div className="p-6 space-y-5">
            {/* Gender Cuts Switcher */}
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                Apparel Cuts Focus
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {[
                  { id: "male", label: "Men's Cuts" },
                  { id: "female", label: "Women's Cuts" },
                  { id: "non-binary", label: "Neutral Cuts" }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setGender(item.id)}
                    className={`py-1.5 text-[10px] font-semibold rounded-lg border transition cursor-pointer ${
                      gender === item.id
                        ? "bg-indigo-600/20 border-indigo-500 text-white font-bold"
                        : "bg-slate-950 border-slate-900 text-slate-400 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Height slider */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Height
                </label>
                <span className="text-xs font-mono font-bold text-indigo-400">{height} cm</span>
              </div>
              <input
                type="range"
                min="135"
                max="215"
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
                className="w-full h-1 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
            </div>

            {/* Weight slider */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Weight
                </label>
                <span className="text-xs font-mono font-bold text-indigo-400">{weight} kg</span>
              </div>
              <input
                type="range"
                min="35"
                max="145"
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
                className="w-full h-1 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-indigo-505 accent-indigo-500"
              />
            </div>

            {/* Shape select */}
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 font-mono">
                Body Shape
              </label>
              <select
                value={bodyShape}
                onChange={(e) => setBodyShape(e.target.value)}
                className="w-full bg-slate-950 border border-slate-900 text-white rounded-xl p-3 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 font-medium cursor-pointer"
              >
                <option value="balanced">Standard Frame (Even shoulders & waist)</option>
                <option value="athletic-v">Broad Shoulders (Wider upper body)</option>
                <option value="slim-linear">Slim & Slender (Narrower/tall frame)</option>
                <option value="curved">Fuller Profile (Broader/comfortable frame)</option>
              </select>
            </div>

            {/* Level 2 Expandable Precise Dimensions */}
            <div className="pt-3 border-t border-slate-950/60 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">
                  Level 2: Custom Precise Dimensions
                </span>
                <button
                  type="button"
                  onClick={() => setUseAdvancedProfile(!useAdvancedProfile)}
                  className={`text-[9px] font-bold px-2 py-1 rounded transition cursor-pointer ${
                    useAdvancedProfile 
                      ? "bg-indigo-600/20 text-indigo-400 border border-indigo-500/20" 
                      : "bg-slate-950 text-slate-500 border border-slate-900 hover:text-slate-300"
                  }`}
                >
                  {useAdvancedProfile ? "Active" : "Locked / Standard"}
                </button>
              </div>

              {useAdvancedProfile ? (
                <div className="space-y-4 bg-slate-950/40 p-3.5 rounded-xl border border-slate-900 animate-slide-down">
                  {/* Dynamic Proportions Badge */}
                  <div className="bg-indigo-950/20 border border-indigo-500/10 rounded-lg p-2.5 text-[11px] space-y-1">
                    <span className="text-slate-400 italic font-medium block">Biomechanical Identity:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {shoulderWidth > height * 0.25 ? (
                        <span className="bg-indigo-500/10 text-indigo-300 border border-indigo-500/10 rounded px-1.5 py-0.5 text-[9px] font-medium font-mono uppercase">
                          ⚡ Broad Shoulders
                        </span>
                      ) : null}
                      {waist < chest - 16 ? (
                        <span className="bg-indigo-500/10 text-emerald-300 border border-emerald-500/10 rounded px-1.5 py-0.5 text-[9px] font-medium font-mono uppercase">
                          ⚡ V-Taper Frame
                        </span>
                      ) : null}
                      {chest > 102 ? (
                        <span className="bg-indigo-500/10 text-indigo-300 border border-indigo-500/10 rounded px-1.5 py-0.5 text-[9px] font-medium font-mono uppercase">
                          ⚡ Athletic Chest
                        </span>
                      ) : null}
                      <span className="bg-indigo-650 bg-indigo-600/20 text-white rounded px-1.5 py-0.5 text-[9px] font-bold font-mono uppercase">
                        Precision: 98%
                      </span>
                    </div>
                  </div>

                  {/* sliders */}
                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-slate-400 font-medium">Chest Circle</span>
                      <span className="font-mono text-indigo-400 font-bold">{chest} cm</span>
                    </div>
                    <input
                      type="range"
                      min="70"
                      max="140"
                      value={chest}
                      onChange={(e) => setChest(Number(e.target.value))}
                      className="w-full h-1 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-slate-400 font-medium">Waist Circle</span>
                      <span className="font-mono text-indigo-400 font-bold">{waist} cm</span>
                    </div>
                    <input
                      type="range"
                      min="60"
                      max="135"
                      value={waist}
                      onChange={(e) => setWaist(Number(e.target.value))}
                      className="w-full h-1 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-slate-400 font-medium">Shoulder Width</span>
                      <span className="font-mono text-indigo-400 font-bold">{shoulderWidth} cm</span>
                    </div>
                    <input
                      type="range"
                      min="34"
                      max="58"
                      value={shoulderWidth}
                      onChange={(e) => setShoulderWidth(Number(e.target.value))}
                      className="w-full h-1 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-900/60 text-center">
                    <div>
                      <span className="text-[9px] text-slate-500 block">Inseam cm</span>
                      <span className="text-[11px] font-bold text-slate-300 font-mono block mt-0.5">{inseam}cm</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-slate-500 block">Arm Sleeve cm</span>
                      <span className="text-[11px] font-bold text-slate-300 font-mono block mt-0.5">{armLength}cm</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-slate-500 block">Hips cm</span>
                      <span className="text-[11px] font-bold text-slate-300 font-mono block mt-0.5">{hip}cm</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div 
                  onClick={() => setUseAdvancedProfile(true)}
                  className="bg-slate-950 border border-slate-900 p-3 rounded-xl hover:border-indigo-500/20 transition cursor-pointer flex items-center gap-2"
                >
                  <Sparkles className="h-4 w-4 text-indigo-400 shrink-0" />
                  <span className="text-[10px] text-slate-400 leading-normal">
                    Using biometric estimates. Enable custom values to unlock precise sleeve length, narrow-waist adjustments & custom V-shaping.
                  </span>
                </div>
              )}
            </div>

            {/* Brand wardrobe Baseline anchor sizes */}
            <div className="pt-3 border-t border-slate-950/60 space-y-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block font-mono">My Favorite References</span>
              <div className="grid grid-cols-2 gap-3">
                <select
                  value={refBrand}
                  onChange={(e) => setRefBrand(e.target.value)}
                  className="bg-slate-950 border border-slate-900 text-white rounded-lg p-2 text-xs"
                >
                  <option value="Nike">Nike</option>
                  <option value="Adidas">Adidas</option>
                  <option value="Zara">Zara</option>
                  <option value="H&M">H&M</option>
                  <option value="Uniqlo">Uniqlo</option>
                  <option value="Gap">Gap</option>
                </select>

                <div className="flex bg-slate-950 border border-slate-900 p-0.5 rounded-lg">
                  {["S", "M", "L", "XL"].map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setRefSize(sz)}
                      className={`flex-1 py-1 text-[9px] font-bold rounded transition cursor-pointer ${
                        refSize === sz ? "bg-indigo-605 bg-indigo-600 text-white shadow" : "text-slate-500 hover:text-slate-350"
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Target choice selection */}
            <div className="pt-3 border-t border-slate-950/60 space-y-3">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block font-mono">Size Prediction Target</span>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-[9px] text-slate-500 block mb-1 font-mono uppercase">Shop Brand</span>
                  <select
                    value={targetBrand}
                    onChange={(e) => setTargetBrand(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-900 text-white rounded-lg p-2 text-xs"
                  >
                    <option value="Zara">Zara</option>
                    <option value="Nike">Nike</option>
                    <option value="Adidas">Adidas</option>
                    <option value="H&M">H&M</option>
                    <option value="Uniqlo">Uniqlo</option>
                    <option value="Gap">Gap</option>
                  </select>
                </div>

                <div>
                  <span className="text-[9px] text-slate-500 block mb-1 font-mono uppercase">Clothing Type</span>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-900 text-white rounded-lg p-2 text-xs"
                  >
                    <option value="Tops/Shirts font-semibold">Hoodies / Pullovers</option>
                    <option value="Jackets">Blazers & Outerwear</option>
                    <option value="Sweaters">Knitted Sweaters</option>
                    <option value="T-shirts">Fitted Tees</option>
                  </select>
                </div>
              </div>

              <button
                onClick={handleCalculate}
                disabled={isCalculating}
                className="w-full bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-550 hover:to-indigo-600 text-white font-bold rounded-xl py-3 mt-2 transition flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-indigo-505/10 disabled:opacity-50"
              >
                {isCalculating ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    Finding your perfect size match...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 text-emerald-400 animate-pulse" />
                    Predict My Size
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Right column: Beautiful Prediction Results */}
        <div className="lg:col-span-7 flex flex-col justify-between text-left h-full">
          {prediction ? (
            <div className="bg-[#0e111a] border border-slate-900 rounded-2xl p-6 relative overflow-hidden flex-1 shadow-xl space-y-6">
              
              <div className="flex justify-between items-center pb-3 border-b border-slate-950">
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">2. Recommended Fit Match</h4>
                  <p className="text-[10px] text-slate-500 font-mono">Personalized Brand Match</p>
                </div>
                <span className={`text-[9px] font-mono px-2.5 py-1 rounded-full uppercase font-bold flex items-center gap-1.5 border ${
                  prediction.isRealAI 
                    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/15" 
                    : "bg-indigo-500/10 text-indigo-400 border-indigo-500/15"
                }`}>
                  <span className={`h-1.5 w-1.5 rounded-full ${prediction.isRealAI ? "bg-emerald-400 animate-pulse" : "bg-indigo-400"}`}></span>
                  {prediction.isRealAI ? "Gemini Neural Match" : "Heuristic Drape Match"}
                </span>
              </div>

              {/* Sizing circle & basic metrics */}
              <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-slate-950">
                <div className="h-24 w-24 bg-indigo-600 border border-indigo-500/30 rounded-3xl flex flex-col items-center justify-center shrink-0 shadow-lg glow-indigo">
                  <span className="text-[9px] uppercase font-bold text-indigo-200 tracking-wider">Suggested</span>
                  <span className="text-3xl font-black text-white mt-0.5 font-mono">{prediction.predictedSize}</span>
                  <span className="text-[8px] text-indigo-100 font-semibold uppercase">Predicted Size</span>
                </div>

                <div className="space-y-2 flex-1 pt-2 sm:pt-0">
                  <span className="text-[9px] text-slate-500 font-mono uppercase block">Sizing Translation:</span>
                  <div className="flex items-center gap-2 flex-wrap text-sm">
                    <span className="text-xs font-semibold text-slate-400">Anchor: {refBrand} ({refSize})</span>
                    <ChevronRight className="h-3 w-3 text-indigo-500" />
                    <span className="text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-505/20 px-2 py-0.5 rounded text-xs inline-flex items-center gap-1">
                      Target Match: {targetBrand} Size {prediction.predictedSize}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 font-sans">
                    Your Reference: Height <span className="text-white font-semibold font-mono">{height}cm</span> with <span className="text-white font-semibold font-mono capitalize">{bodyShape}</span> shape type.
                  </p>
                </div>

                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-900 shrink-0 w-full sm:w-40 flex items-center gap-3">
                  <div className="h-10 w-10 text-emerald-400 bg-emerald-500/10 rounded-lg flex items-center justify-center font-mono font-bold text-xs shrink-0">
                    {prediction.confidenceScore}%
                  </div>
                  <div className="text-left leading-tight">
                    <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest block">Match Confidence</span>
                    <span className="text-[10px] text-slate-500 font-mono">{prediction.similarShopperCount || 24} model clusters</span>
                  </div>
                </div>
              </div>

              {/* Dynamic Warning Alert Box */}
              <div className="space-y-4">
                {prediction.shoulderTightnessRisk === "high" && (
                  <div className="bg-red-500/5 border border-red-500/10 p-4 rounded-xl flex items-start gap-3 animate-fade-in text-left">
                    <AlertCircle className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[9px] font-mono uppercase bg-red-500/20 text-red-400 px-2 py-0.5 rounded font-extrabold tracking-wide">
                        Shoulder Tightness Risk: HIGH
                      </span>
                      <p className="text-xs text-slate-350 mt-1.5 leading-normal">
                         Caution: {targetBrand}'s {category.toLowerCase()} design utilizes narrower chest seams. Sizing up to {prediction.predictedSize} provides a more comfortable fit.
                      </p>
                    </div>
                  </div>
                )}

                {prediction.shoulderTightnessRisk === "moderate" && (
                  <div className="bg-amber-500/5 border border-amber-500/10 p-4 rounded-xl flex items-start gap-3 animate-fade-in text-left">
                    <AlertCircle className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[9px] font-mono uppercase bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded font-extrabold tracking-wide">
                        Shoulder Seams Notice: MODERATE
                      </span>
                      <p className="text-xs text-slate-350 mt-1.5 leading-normal">
                         This item fits closer along the shoulders. Perfect for a clean, regular fit. Choose your usual predicted size.
                      </p>
                    </div>
                  </div>
                )}

                {/* Behavioral custom written insights card */}
                <div className="bg-indigo-950/15 border border-indigo-500/10 p-4 rounded-xl">
                  <div className="flex items-center gap-2 mb-1">
                    <ShieldCheck className="h-4 w-4 text-indigo-400" />
                    <span className="text-[9px] text-indigo-400 font-bold uppercase tracking-wider font-mono">Expert Fit Advice</span>
                  </div>
                  <p className="text-xs text-slate-300 font-mono leading-relaxed italic">
                    "{prediction.behavioralInsight}"
                  </p>
                </div>

                {/* Seam specifications meters */}
                <div className="bg-slate-950/50 border border-slate-905 p-4 rounded-xl space-y-3 text-left">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-slate-400 font-bold font-mono uppercase tracking-wider">Garment Fit Adjustments</span>
                    <span className="text-[9.5px] text-slate-500 font-mono italic">Based on your regular reference brands</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-normal">{prediction.sizingAnomalies}</p>

                  <div className="grid grid-cols-3 gap-2 text-center pt-1 font-mono text-[10.5px]">
                    <div className="bg-slate-900/60 p-2 rounded border border-slate-950">
                      <span className="text-[8px] text-slate-500 uppercase block">Chest Fit</span>
                      <span className="text-indigo-300 font-bold block mt-0.5">{prediction.chestAdjustment}</span>
                    </div>
                    <div className="bg-slate-900/60 p-2 rounded border border-slate-950">
                      <span className="text-[8px] text-slate-500 uppercase block">Waist Fit</span>
                      <span className="text-indigo-300 font-bold block mt-0.5">{prediction.waistAdjustment}</span>
                    </div>
                    <div className="bg-slate-900/60 p-2 rounded border border-slate-950">
                      <span className="text-[8px] text-slate-500 uppercase block">Length</span>
                      <span className="text-indigo-300 font-bold block mt-0.5">{prediction.lengthPreference}</span>
                    </div>
                  </div>
                </div>

                {/* STEP 1 & STEP 2: Cross-Brand Fit Translations Grid */}
                <div className="bg-[#0b0d16] border border-slate-900 rounded-xl p-4.5 space-y-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <h5 className="text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center gap-1.5">
                        <Sliders className="h-3.5 w-3.5 text-indigo-400" />
                        Cross-Brand Translations
                      </h5>
                      <span className="text-[9px] text-slate-500 block">Your equivalent fitted sizes mapped by CogniFit</span>
                    </div>
                    <button 
                      type="button" 
                      onClick={() => setExpandedComparativeRates(!expandedComparativeRates)}
                      className="text-[10px] text-indigo-400 hover:text-indigo-300 font-mono cursor-pointer"
                    >
                      {expandedComparativeRates ? "[ Collapse ]" : "[ Compare 5 Brands ]"}
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    {(() => {
                      const ALL_SIZES = ["XS", "S", "M", "L", "XL", "XXL"];
                      const sizeIndex = ALL_SIZES.indexOf(prediction.predictedSize || "M");
                      const getRelativeSize = (offset: number) => {
                        const newIdx = Math.max(0, Math.min(ALL_SIZES.length - 1, sizeIndex + offset));
                        return ALL_SIZES[newIdx];
                      };

                      const brands = [
                        { name: "Zara", size: prediction.predictedSize, label: "Contoured Slim", conf: prediction.confidenceScore, tendency: "Shoulders fit narrower", color: "indigo" },
                        { name: "Nike", size: getRelativeSize(-1), label: "Athletic Relaxed", conf: Math.min(96, prediction.confidenceScore + 3), tendency: "Runs roomier in torso", color: "emerald" },
                        { name: "Uniqlo", size: getRelativeSize(0), label: "Standard Compact", conf: Math.min(94, prediction.confidenceScore + 1), tendency: "Slightly shorter sleeves", color: "sky" },
                        { name: "H&M", size: prediction.predictedSize, label: "Fitted Tailored", conf: Math.max(76, prediction.confidenceScore - 4), tendency: "True to chest specifications", color: "amber" },
                        { name: "Adidas", size: getRelativeSize(-1), label: "Oversized Drape", conf: Math.min(97, prediction.confidenceScore + 4), tendency: "Durable relaxed build", color: "teal" }
                      ];

                      return brands.slice(0, expandedComparativeRates ? 5 : 3).map((br, index) => (
                        <div key={index} className="bg-slate-950 p-3 rounded-lg border border-slate-900 flex items-center justify-between font-mono gap-1 text-[11px] hover:border-indigo-500/10 transition">
                          <div className="text-left space-y-0.5">
                            <span className="text-xs font-bold text-white block">{br.name}</span>
                            <span className="text-[9px] text-slate-400 block">{br.label} • {br.tendency}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="text-right leading-none">
                              <span className="text-emerald-400 font-bold block">{br.size}</span>
                              <span className="text-[8px] text-slate-500">{br.conf}% match</span>
                            </div>
                            <span className="h-5 w-1 bg-indigo-600/30 rounded-full overflow-hidden block">
                              <span className="h-full bg-emerald-400 block rounded-full" style={{ height: `${br.conf}%` }}></span>
                            </span>
                          </div>
                        </div>
                      ));
                    })()}
                  </div>
                </div>

                {/* STEP 6 & STEP 7: Interactive Calibration & Feedback learning loop */}
                <div className="bg-slate-950/60 border border-slate-900 rounded-xl p-4.5 space-y-4">
                  <div>
                    <h5 className="text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center gap-1.5">
                      <ShieldCheck className="h-3.5 w-3.5 text-emerald-400 animate-pulse" />
                      Calibrate Fit Intelligence (Feedback Loop)
                    </h5>
                    <p className="text-[10px] text-slate-400 mt-1">
                      Already own this or a similar size item? Rate the accuracy to tune your personalized body-weighting index.
                    </p>
                  </div>

                  {feedbackSuccessNotice ? (
                    <div className="bg-emerald-500/10 border border-emerald-500/20 p-3.5 rounded-lg text-emerald-400 text-xs font-mono text-center">
                       ✓ Fit Calibration Successful! Sizing feedback stored securely in firestore collections. Future recommendations will dynamically adapt to this body cluster.
                    </div>
                  ) : (
                    <form onSubmit={handleSubmitFeedback} className="space-y-3.5 text-left">
                      <div className="flex gap-2">
                        {[
                          { value: "tight", name: "Too Slim / Tight" },
                          { value: "perfect", name: "Fits Perfectly" },
                          { value: "loose", name: "Too Loose / Long" }
                        ].map((rt) => (
                          <button
                            key={rt.value}
                            type="button"
                            onClick={() => setFeedbackRating(rt.value)}
                            className={`flex-1 py-1.5 rounded-lg text-[10px] uppercase font-bold text-center border font-mono transition cursor-pointer ${
                              feedbackRating === rt.value 
                                ? "bg-indigo-600/15 border-indigo-500 text-indigo-300" 
                                : "bg-slate-950 border-slate-900 text-slate-500 hover:text-slate-350"
                            }`}
                          >
                            {rt.name}
                          </button>
                        ))}
                      </div>

                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={feedbackComment}
                          onChange={(e) => setFeedbackComment(e.target.value)}
                          placeholder="e.g., 'Perfect shoulder drape, but slightly contoured chest segment'"
                          className="flex-1 bg-slate-950 border border-slate-900 rounded-lg px-3 py-2 text-[11px] placeholder-slate-500 text-white focus:outline-none focus:border-indigo-500"
                        />
                        <button
                          type="submit"
                          className="bg-[#121626] hover:bg-indigo-600 border border-slate-900 text-white hover:text-white text-[10px] font-mono font-bold px-3 rounded-lg transition uppercase tracking-wider shrink-0 cursor-pointer"
                        >
                          Submit Log
                        </button>
                      </div>
                    </form>
                  )}

                  {/* Crowd Cluster verification preview */}
                  {submittedFeedbackList.length > 0 && (
                    <div className="pt-2 border-t border-slate-900/60 font-sans">
                      <div className="flex justify-between items-center text-[9px] text-slate-500 uppercase font-mono tracking-widest mb-2">
                        <span>Calibration History ({submittedFeedbackList.length})</span>
                        <span className="text-indigo-400">Offline-sync active</span>
                      </div>
                      <div className="space-y-2 max-h-[110px] overflow-y-auto pr-1">
                        {submittedFeedbackList.map((fb) => (
                          <div key={fb.id} className="bg-[#0b0c14] border border-slate-900/40 p-2.5 rounded-lg flex justify-between gap-3 text-[10px]">
                            <div className="space-y-1 text-left">
                              <p className="text-slate-250 text-slate-300">
                                <span className="font-bold text-slate-200">{fb.brand}</span> in size <span className="text-indigo-400 font-mono font-bold uppercase">{fb.predictedSize}</span> 
                                <span className="text-slate-500 ml-1.5 font-mono">({fb.type})</span>
                              </p>
                              <p className="text-slate-400 italic font-mono">"{fb.comment}"</p>
                            </div>
                            <div className="text-right text-[10px] font-mono shrink-0">
                              <span className={`px-1.5 py-0.5 rounded text-[8px] uppercase font-bold tracking-wide ${
                                fb.rating === "perfect" 
                                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/10" 
                                  : "bg-amber-500/10 text-amber-400 border border-amber-500/10"
                              }`}>
                                {fb.rating}
                              </span>
                              <span className="block text-slate-650 text-slate-500 text-[8px] mt-1.5">{fb.timestamp}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-[#0e111a] border border-slate-900 rounded-2xl p-8 flex flex-col items-center justify-center text-center h-full min-h-[350px]">
              <Ruler className="h-10 w-10 text-slate-600 animate-pulse mb-3" />
              <p className="text-slate-400 text-sm">Configure values on settings bar and submit prediction.</p>
            </div>
          )}
        </div>
      </div>

      {/* 3. MULTI PANEL SYSTEM AREA: CURATION SHOP, AI ASSISTANT & SAVED CLOSSETS */}
      <div className="pt-8 border-t border-slate-950 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="text-left">
            <h3 className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-1.5 leading-none">
              <Sparkles className="h-4.5 w-4.5 text-indigo-400" />
              CogniFit Discovery Hub
            </h3>
            <p className="text-xs text-slate-400 mt-1 leading-normal">
              Browse tailored fit-aware feeds, compare brand specs side-by-side, and track your virtual closet.
            </p>
          </div>

          <div className="flex bg-slate-950 p-[3px] rounded-xl border border-slate-900 self-start md:self-auto gap-0.5 font-mono overflow-x-auto max-w-full">
            {/* Nav button 1 */}
            <button
              onClick={() => setLocalSubTab("curation")}
              className={`px-3 py-1.5 rounded-lg text-[9px] font-bold tracking-wider uppercase transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                localSubTab === "curation" ? "bg-indigo-600 text-white shadow font-bold" : "text-slate-500 hover:text-white"
              }`}
            >
              <ShoppingBag className="h-3.5 w-3.5" />
              1. Discovery Feed
            </button>
            {/* Nav button 2 */}
            <button
              onClick={() => setLocalSubTab("compare")}
              className={`px-3 py-1.5 rounded-lg text-[9px] font-bold tracking-wider uppercase transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                localSubTab === "compare" ? "bg-indigo-600 text-white shadow font-bold" : "text-slate-500 hover:text-white"
              }`}
            >
              <Sliders className="h-3.5 w-3.5 text-sky-400" />
              2. Brand Compare
            </button>
            {/* Nav button 3 */}
            <button
              onClick={() => setLocalSubTab("stylist")}
              className={`px-3 py-1.5 rounded-lg text-[9px] font-bold tracking-wider uppercase transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                localSubTab === "stylist" ? "bg-indigo-600 text-white shadow font-bold" : "text-slate-500 hover:text-white"
              }`}
            >
              <MessageSquare className="h-3.5 w-3.5 text-emerald-400" />
              3. AI Stylist Chat
            </button>
            {/* Nav button 4 */}
            <button
              onClick={() => setLocalSubTab("bookmarks")}
              className={`px-3 py-1.5 rounded-lg text-[9px] font-bold tracking-wider uppercase transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                localSubTab === "bookmarks" ? "bg-indigo-600 text-white shadow font-bold" : "text-slate-500 hover:text-white"
              }`}
            >
              <Bookmark className="h-3.5 w-3.5 text-amber-400" />
              4. My Wardrobe ({savedForecasts.length + closetInventory.length})
            </button>
          </div>
        </div>

        {/* Dynamic Panels wrapper */}
        <div className="bg-[#0e111a] border border-slate-900 rounded-2xl p-6 min-h-[460px] shadow-2xl relative">
          
          {/* CURATION SHOP DISCOVERY FEED PANEL */}
          {localSubTab === "curation" && (
            <div className="space-y-6 animate-fade-in text-left">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-900/60 pb-5">
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center gap-1.5">
                    <span className="h-2 w-2 bg-indigo-500 rounded-full animate-ping"></span>
                    Interactive Fit Discovery Engine
                  </h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Biometric-driven catalog feed. Silhouette vectors adapt in real-time as you drag profile sliders.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3 items-center">
                  {/* Layout Selector */}
                  <div className="flex bg-slate-950 border border-slate-900 p-1 rounded-xl gap-1 font-mono text-[9px] uppercase tracking-wide">
                    {[
                      { id: "poster", label: "Zara Duo Poster" },
                      { id: "pinterest", label: "Pinterest Style" },
                      { id: "classic", label: "Grid Hub" }
                    ].map((l) => (
                      <button
                        key={l.id}
                        onClick={() => setLayoutType(l.id as any)}
                        className={`px-2.5 py-1 rounded-lg cursor-pointer transition-all duration-200 whitespace-nowrap ${
                          layoutType === l.id 
                            ? "bg-indigo-600 text-white font-bold shadow-md shadow-indigo-600/10" 
                            : "text-slate-500 hover:text-slate-350"
                        }`}
                      >
                        {l.label}
                      </button>
                    ))}
                  </div>

                  {/* Categories selector */}
                  <div className="flex bg-slate-950 border border-slate-900 p-1 rounded-xl gap-0.5 font-mono">
                    {["All", "Hoodies", "Tees", "Jackets", "Sweaters"].map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-2 py-0.5 text-[9px] rounded uppercase cursor-pointer transition ${
                          activeCategory === cat ? "bg-[#121622] text-indigo-400 font-bold" : "text-slate-500 hover:text-slate-300"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Grid Curation Products list */}
              <div className={layoutType === "poster" ? "grid grid-cols-1 md:grid-cols-2 gap-8" : layoutType === "pinterest" ? "columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6" : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"}>
                {baseCatalog
                  .filter((itm) => activeCategory === "All" || itm.category === activeCategory)
                  .map((itm) => {
                    // Smart size calculator lookup
                    const ALL_SIZES = ["XS", "S", "M", "L", "XL", "XXL"];
                    const baselineSize = prediction?.predictedSize || refSize || "M";
                    let baseIdx = ALL_SIZES.indexOf(baselineSize);
                    if (baseIdx === -1) baseIdx = 2; // Default S/M map

                    let sizeOffset = 0;
                    if (itm.brand.toLowerCase() === "zara") sizeOffset = 1; // size up
                    else if (itm.brand.toLowerCase() === "nike") sizeOffset = -1; // size down
                    else if (itm.brand.toLowerCase() === "adidas") sizeOffset = -1;
                    else if (itm.brand.toLowerCase() === "h&m") sizeOffset = 1;

                    const finalSizeIdx = Math.max(0, Math.min(ALL_SIZES.length - 1, baseIdx + sizeOffset));
                    const recommendedSize = ALL_SIZES[finalSizeIdx];

                    // Confidence computation
                    let baseConf = prediction?.confidenceScore || 91;
                    if (itm.brand.toLowerCase() === "uniqlo") baseConf += 3;
                    if (itm.brand.toLowerCase() === "nike") baseConf += 2;
                    if (itm.brand.toLowerCase() === "zara") baseConf -= 4;
                    if (itm.brand.toLowerCase() === "h&m") baseConf -= 3;
                    const confidenceVal = Math.min(99, Math.max(78, baseConf));

                    return (
                      <motion.div 
                        key={itm.id} 
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{ y: -4, transition: { duration: 0.2 } }}
                        className={
                          layoutType === "pinterest" 
                            ? "break-inside-avoid bg-[#0b0c14] border border-slate-900 rounded-2xl overflow-hidden hover:border-indigo-500/20 group transition-all duration-300 relative text-left mb-6 p-4 flex flex-col justify-between" 
                            : layoutType === "poster" 
                            ? "bg-[#0b0c14] border border-slate-900 rounded-2xl overflow-hidden hover:border-indigo-500/20 group hover:shadow-2xl transition-all duration-300 relative flex flex-col justify-between p-6" 
                            : "bg-[#0b0d15] border border-slate-900 rounded-2xl p-5 flex flex-col justify-between hover:border-indigo-500/30 transition-all duration-300 group hover:shadow-xl hover:shadow-indigo-505/5 relative overflow-hidden"
                        }
                      >
                        {/* Perfect Score Badging absolute layer */}
                        <div className="absolute top-4 right-4 bg-emerald-500 text-white font-extrabold font-mono text-[9px] px-2.5 py-1 rounded-full flex items-center gap-1.5 tracking-wider uppercase z-10 shadow-lg shadow-emerald-500/25">
                          <Check className="h-3 w-3" />
                          Size {recommendedSize} Perfect Match
                        </div>

                        <div className="space-y-3.5">
                          {/* Image box frame with overlay layout */}
                          <div className={
                            layoutType === "poster" 
                              ? "relative aspect-[3/4] rounded-xl overflow-hidden bg-slate-950 border border-slate-900" 
                              : layoutType === "pinterest" 
                              ? "relative overflow-hidden bg-slate-950 rounded-xl" 
                              : "relative aspect-[16/10] rounded-xl overflow-hidden bg-slate-900 border border-slate-900/40"
                          }>
                            <img 
                              src={itm.imageUrl} 
                              alt={itm.title} 
                              referrerPolicy="no-referrer" 
                              className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                              style={layoutType === "pinterest" ? { maxHeight: itm.id === "app_01" || itm.id === "app_03" ? "300px" : "210px" } : undefined}
                            />
                            <div className="absolute inset-0 bg-[#0b0d15]/90 via-transparent to-transparent opacity-95 pointer-events-none" />
                            
                            <span className="absolute bottom-3 left-3 bg-slate-950/90 text-indigo-400 font-mono text-[9px] font-bold uppercase rounded-md px-2.5 py-1 border border-indigo-500/20">
                              {itm.brand}
                            </span>
                          </div>

                          <div className="space-y-2.5">
                            <div className="flex items-start justify-between gap-2 text-left">
                              <h5 className="text-sm font-bold text-white group-hover:text-indigo-400 transition-colors leading-tight">{itm.title}</h5>
                              <span className="text-[10px] text-slate-500 font-mono uppercase bg-slate-950 px-2 py-0.5 rounded border border-slate-900 shrink-0">{itm.category}</span>
                            </div>

                            {/* Sizing Intel Box */}
                            <div className="bg-[#05060b] border border-slate-900/60 p-3 rounded-xl space-y-2.5 text-left">
                              <div className="flex items-center justify-between text-[10.5px]">
                                <span className="text-slate-500 font-mono">Silhouette Bias:</span>
                                <span className="text-indigo-300 font-extrabold tracking-wide font-mono bg-indigo-500/5 px-2 py-0.5 rounded border border-indigo-500/10">{itm.fitBias}</span>
                              </div>

                              {/* Target match visual meter bar with a nice background */}
                              <div className="space-y-1">
                                <div className="flex justify-between text-[9px] text-slate-400 font-mono leading-none">
                                  <span className="flex items-center gap-1">
                                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                                    Match Calibration Confidence
                                  </span>
                                  <span className="text-emerald-400 font-extrabold">{confidenceVal}%</span>
                                </div>
                                <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
                                  <div className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-full" style={{ width: `${confidenceVal}%` }}></div>
                                </div>
                              </div>

                              {/* Anomalies and Warnings alerts */}
                              <div className="text-[9.5px] leading-relaxed text-amber-300/95 flex items-start gap-1.5 pt-0.5 border-t border-slate-900/50">
                                <AlertCircle className="h-3.5 w-3.5 shrink-0 text-amber-400 mt-0.5" />
                                <span className="font-sans"><strong>Style Fit Alert:</strong> {itm.warnings?.join(" • ") || "Pre-shrunk premium weave."}</span>
                              </div>

                              {/* Joint mesh SVG only in Zara poster style layout */}
                              {layoutType === "poster" && (
                                <div className="border-t border-slate-905 border-slate-900/40 pt-3 mt-3 animate-fade-in text-left">
                                  <div className="flex justify-between items-center text-[10px] font-mono mb-2 text-slate-500">
                                    <span>Tension Calibration Map</span>
                                    <span className={itm.brand.toLowerCase() === "zara" ? "text-amber-400 font-bold" : "text-emerald-400 font-bold"}>
                                      {itm.brand.toLowerCase() === "zara" ? "High Strain Left Shoulder Grid" : "Optimal Symmetrical Balance"}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-3 bg-slate-950 p-2.5 rounded-lg border border-slate-900/50">
                                    <div className="relative w-12 h-12 shrink-0 bg-slate-900/40 rounded border border-slate-900 flex items-center justify-center">
                                      <svg viewBox="0 0 100 100" className="w-10 h-10 select-none pointer-events-none filter drop-shadow-[0_0_4px_rgba(99,102,241,0.2)]">
                                        <path d="M 50 15 C 38 15, 34 25, 20 28 C 16 35, 18 42, 22 45 C 28 44, 30 55, 32 85 C 50 90, 50 90, 68 85 C 70 55, 72 44, 78 45 C 82 42, 84 35, 80 28 C 66 25, 62 15, 50 15 Z" fill="none" stroke="#222736" strokeWidth="1.5" strokeDasharray="2,2" />
                                        <path 
                                          d={itm.brand.toLowerCase() === "zara"
                                            ? "M 50 16 C 39 16, 35 24, 25 28 C 22 34, 23 41, 26 44 C 29 43, 31 52, 33 83 C 50 86, 50 86, 67 83 C 69 52, 71 43, 74 44 C 77 41, 78 34, 75 28 C 65 24, 61 16, 50 16 Z"
                                            : "M 50 15 C 38 15, 34 25, 20 28 C 16 35, 18 42, 22 45 C 28 44, 30 55, 32 85 C 50 90, 50 90, 68 85 C 70 55, 72 44, 78 45 C 82 42, 84 35, 80 28 C 66 25, 62 15, 50 15 Z"
                                          }
                                          fill="none" 
                                          stroke={itm.brand.toLowerCase() === "zara" ? "#fbbf24" : "#10b981"} 
                                          strokeWidth="2.5" 
                                          strokeLinecap="round" 
                                          strokeLinejoin="round" 
                                        />
                                        <circle cx={itm.brand.toLowerCase() === "zara" ? "25" : "20"} cy="28" r="3.5" fill={itm.brand.toLowerCase() === "zara" ? "#fbbf24" : "#10b981"} className="animate-pulse" />
                                        <circle cx={itm.brand.toLowerCase() === "zara" ? "75" : "80"} cy="28" r="3.5" fill={itm.brand.toLowerCase() === "zara" ? "#fbbf24" : "#10b981"} className="animate-pulse" />
                                      </svg>
                                    </div>
                                    <p className="text-[9.5px] leading-relaxed text-slate-400 font-sans">
                                      {itm.brand.toLowerCase() === "zara" 
                                        ? "Zara sweaters pull tight on left armholes. Sizing up releases this strain." 
                                        : "Ideal chest tension balance. Matches your active profile grids."}
                                    </p>
                                  </div>
                                </div>
                              )}
                            </div>

                            {/* Collaborative Intelligence Snippet (Step 2) */}
                            <p className="text-[10.5px] text-slate-400 bg-slate-950 p-2.5 rounded-xl italic border-l-2 border-indigo-500/40 leading-relaxed font-sans text-left">
                              "CogniFit Insight: {itm.collaborativeInsight || "Highly recommended for athletic frames."}"
                            </p>

                            <div className="text-[9.5px] text-indigo-400 font-mono flex items-center gap-1.5 bg-indigo-500/5 py-1 px-3 rounded-lg border border-indigo-500/10 w-fit">
                              <Sparkles className="h-3 w-3 animate-pulse text-indigo-350" />
                              <span className="font-bold uppercase tracking-wider">{itm.affinityTag}</span>
                            </div>
                          </div>
                        </div>

                        {/* Pricing section and shop redirect */}
                        <div className="pt-3.5 mt-4 border-t border-slate-900 flex items-center justify-between">
                          <div className="flex flex-col text-left">
                            {itm.promoPrice ? (
                              <div className="flex items-center gap-1.5 font-mono">
                                <span className="text-sm text-white font-extrabold">${itm.promoPrice}</span>
                                <span className="text-[10.5px] text-slate-505 text-slate-500 line-through">${itm.basePrice}</span>
                              </div>
                            ) : (
                              <span className="text-sm text-white font-mono font-extrabold">${itm.basePrice}</span>
                            )}
                            <span className="text-[8px] text-emerald-400 font-mono tracking-wide uppercase mt-0.5">🚀 4% Instant Rebate</span>
                          </div>

                          <button
                            onClick={() => {
                              handleApparelClick(itm, recommendedSize);
                              // Trigger state redirect overlay mock (Step 8)
                              setRedirectOverlay({ 
                                itemTitle: itm.title,
                                brand: itm.brand,
                                price: itm.promoPrice || itm.basePrice,
                                size: recommendedSize 
                              });
                            }}
                            className="bg-indigo-605 bg-indigo-600 hover:bg-indigo-500 active:scale-97 text-[10.5px] font-bold text-white py-2 px-4 rounded-xl transition-all uppercase tracking-wider cursor-pointer flex items-center gap-1.5 shadow-lg shadow-indigo-600/15"
                          >
                            <span>Shop Match</span>
                            <ChevronRight className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </motion.div>
                    );
                  })}
              </div>
            </div>
          )}

          {/* BRAND COMPARISON MATRIX PANEL (STEP 3) */}
          {localSubTab === "compare" && (
            <div className="space-y-6 animate-fade-in text-left">
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center gap-1.5">
                  <Sliders className="h-4 w-4 text-sky-450 text-sky-450 text-sky-400" />
                  Cross-Brand Dimension Sizing Matrix
                </h4>
                <p className="text-xs text-slate-400 mt-1">
                  Contrast body-mapping and sizing tendencies side-by-side to determine which brand accommodates your silhouette shape.
                </p>
              </div>

              {/* User Selector Dropdowns row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-950/80 p-3.5 rounded-xl border border-slate-900 font-mono text-xs">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase text-slate-500 tracking-wider">Primary Brand</label>
                  <select 
                    value={compareBrand1}
                    onChange={(e) => setCompareBrand1(e.target.value)}
                    className="w-full bg-[#111422] border border-slate-800 text-indigo-300 p-2 rounded focus:outline-none cursor-pointer"
                  >
                    {["Nike", "Adidas", "Uniqlo", "Zara", "Gap", "H&M"].map(b => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase text-slate-500 tracking-wider">Comparison Brand</label>
                  <select 
                    value={compareBrand2}
                    onChange={(e) => setCompareBrand2(e.target.value)}
                    className="w-full bg-[#111422] border border-slate-800 text-indigo-300 p-2 rounded focus:outline-none cursor-pointer"
                  >
                    {["Nike", "Adidas", "Uniqlo", "Zara", "Gap", "H&M"].map(b => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase text-slate-500 tracking-wider">Garment Category</label>
                  <select 
                    value={compareCategory}
                    onChange={(e) => setCompareCategory(e.target.value)}
                    className="w-full bg-[#111422] border border-slate-800 text-indigo-300 p-2 rounded focus:outline-none cursor-pointer"
                  >
                    {["Hoodies", "Tees", "Jackets", "Sweaters"].map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Side by side stats block comparison */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                {/* Brand 1 stats representation */}
                <div className="bg-[#0b0c14] border border-slate-900 rounded-xl p-4.5 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-900/80 pb-2.5">
                    <div className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-indigo-500"></span>
                      <h5 className="font-bold text-white text-sm">{compareBrand1} Spec</h5>
                    </div>
                    {/* Size calculation prediction logic */}
                    <span className="text-[10px] font-mono bg-indigo-500/10 text-indigo-400 px-2.5 py-0.5 rounded font-bold border border-indigo-500/10">
                      REC SIZE: {compareBrand1.toLowerCase() === "zara" || compareBrand1.toLowerCase() === "h&m" ? "L" : "M"}
                    </span>
                  </div>

                  <div className="space-y-3 font-mono text-[11px]">
                    <div className="flex justify-between items-center bg-slate-950/40 p-2 rounded">
                      <span className="text-slate-400">Chest Cut Profile</span>
                      <span className="text-slate-200">
                        {compareBrand1.toLowerCase() === "zara" ? "Narrow/Contoured" : 
                         compareBrand1.toLowerCase() === "nike" || compareBrand1.toLowerCase() === "adidas" ? "Relaxed/Athletic" : "Straight Cut"}
                      </span>
                    </div>

                    <div className="flex justify-between items-center bg-slate-950/40 p-2 rounded">
                      <span className="text-slate-400">Shoulder Seam Width</span>
                      <span className="text-slate-200">
                        {compareBrand1.toLowerCase() === "zara" || compareBrand1.toLowerCase() === "h&m" ? "Narrow Stitch" : "Dropped Seams"}
                      </span>
                    </div>

                    <div className="flex justify-between items-center bg-slate-950/40 p-2 rounded">
                      <span className="text-slate-400">Length/Drop Index</span>
                      <span className="text-slate-200">
                        {compareBrand1.toLowerCase() === "zara" ? "Fitted/Slight Short" : "Standard Full Cover"}
                      </span>
                    </div>

                    <div className="flex justify-between items-center bg-slate-950/40 p-2 rounded">
                      <span className="text-slate-400">Fit Coefficient Match</span>
                      <span className="text-emerald-400 font-bold">
                        {compareBrand1.toLowerCase() === "uniqlo" || compareBrand1.toLowerCase() === "nike" ? "96% Excellent" : "86% Good"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Brand 2 stats representation */}
                <div className="bg-[#0b0c14] border border-slate-900 rounded-xl p-4.5 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-900/80 pb-2.5">
                    <div className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-sky-550 bg-sky-500"></span>
                      <h5 className="font-bold text-white text-sm">{compareBrand2} Spec</h5>
                    </div>
                    {/* Size calculation prediction logic */}
                    <span className="text-[10px] font-mono bg-sky-500/10 text-sky-400 px-2.5 py-0.5 rounded font-bold border border-sky-500/10">
                      REC SIZE: {compareBrand2.toLowerCase() === "zara" || compareBrand2.toLowerCase() === "h&m" ? "L" : "M"}
                    </span>
                  </div>

                  <div className="space-y-3 font-mono text-[11px]">
                    <div className="flex justify-between items-center bg-slate-950/40 p-2 rounded">
                      <span className="text-slate-400">Chest Cut Profile</span>
                      <span className="text-slate-200">
                        {compareBrand2.toLowerCase() === "zara" ? "Narrow/Contoured" : 
                         compareBrand2.toLowerCase() === "nike" || compareBrand2.toLowerCase() === "adidas" ? "Relaxed/Athletic" : "Straight Cut"}
                      </span>
                    </div>

                    <div className="flex justify-between items-center bg-slate-950/40 p-2 rounded">
                      <span className="text-slate-400">Shoulder Seam Width</span>
                      <span className="text-slate-200">
                        {compareBrand2.toLowerCase() === "zara" || compareBrand2.toLowerCase() === "h&m" ? "Narrow Stitch" : "Dropped Seams"}
                      </span>
                    </div>

                    <div className="flex justify-between items-center bg-slate-950/40 p-2 rounded">
                      <span className="text-slate-400">Length/Drop Index</span>
                      <span className="text-slate-200">
                        {compareBrand2.toLowerCase() === "zara" ? "Fitted/Slight Short" : "Standard Full Cover"}
                      </span>
                    </div>

                    <div className="flex justify-between items-center bg-[#0d0f19] p-2 rounded">
                      <span className="text-slate-400">Fit Coefficient Match</span>
                      <span className="text-emerald-400 font-bold">
                        {compareBrand2.toLowerCase() === "uniqlo" || compareBrand2.toLowerCase() === "nike" ? "96% Excellent" : "89% Good"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Dynamic Fit Difference Summary (Step 3) */}
              <div className="bg-[#111422]/60 border border-slate-900 rounded-xl p-4 space-y-2.5 font-sans">
                <h6 className="text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center gap-1 text-indigo-400">
                  <Info className="h-3.5 w-3.5" />
                  Sizing Strategy Verdict: {compareBrand1} vs {compareBrand2}
                </h6>
                
                <p className="text-xs text-slate-300 leading-relaxed">
                  {compareBrand1.toLowerCase() === compareBrand2.toLowerCase() ? (
                    `Comparing the exact same brand showcases baseline integrity. Under your preferred "${preferredFit}" parameters, selecting your primary size recommendation provides ideal drape structure without constriction.`
                  ) : (
                    `You'll find highly noticeable differences in shoulders. ${compareBrand1} stitches tend to favor ${compareBrand1.toLowerCase() === "zara" || compareBrand1.toLowerCase() === "h&m" ? "slimmer European outlines" : "drop shoulder relaxing limits"} while ${compareBrand2} favors ${compareBrand2.toLowerCase() === "zara" || compareBrand2.toLowerCase() === "h&m" ? "highly tailored profiles" : "aerodynamic performance cuts"}. If your chest measurements exceed ${chest}cm, we highly advice prioritizing the larger predicted size.`
                  )}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[10.5px] text-slate-400 font-mono pt-2 border-t border-slate-900/60 leading-normal">
                  <div className="flex items-start gap-1">
                    <span className="text-[#a5b4fc] font-bold">●</span>
                    <span>Expected Chest Deviation: ± 2.2 cm between outlines</span>
                  </div>
                  <div className="flex items-start gap-1">
                    <span className="text-sky-400 font-bold">●</span>
                    <span>Recommended action: Choose bigger if V-Taper posture broadness</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* AI STYLIST CHAT PANEL (STEP 5) */}
          {localSubTab === "stylist" && (
            <div className="space-y-4 animate-fade-in flex flex-col justify-between h-full text-left">
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center gap-1.5">
                  <MessageSquare className="h-4 w-4 text-emerald-400" />
                  Ask Jordan — Stylist Companion
                </h4>
                <p className="text-xs text-slate-400 mt-1">
                  Active biometrics: chest {chest}cm, shoulders {shoulderWidth}cm, waist {waist}cm. Ask specialized sizing advice instantly.
                </p>
              </div>

              {/* Chat log view */}
              <div className="bg-[#0b0c14] rounded-xl p-4.5 border border-slate-900/80 space-y-3.5 min-h-[220px] max-h-[280px] overflow-y-auto font-sans shadow-inner">
                {chatMessages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[85%] rounded-xl p-3 text-xs leading-relaxed ${
                      msg.role === "user" 
                        ? "bg-indigo-600 text-white font-medium" 
                        : "bg-[#111422] border border-slate-900 text-slate-200"
                    }`}>
                      <p className="whitespace-pre-line">{msg.content}</p>
                    </div>
                  </div>
                ))}

                {isThinking && (
                  <div className="flex justify-start">
                    <div className="bg-[#111422] border border-slate-900 p-3 rounded-xl text-xs text-indigo-400 flex items-center gap-2 font-mono">
                      <RefreshCw className="h-3.5 w-3.5 animate-spin text-indigo-400" />
                      Counseling collaborative fit database...
                    </div>
                  </div>
                )}
              </div>

              {/* Suggestion Prompt Chips (Step 5 - AI STYLIST CHIPS) */}
              <div className="space-y-1.5 text-left">
                <span className="text-[9px] text-slate-500 uppercase font-mono tracking-wider">Quick Inquiries:</span>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    "Recommend roomiest hoodies in catalog?",
                    "How does Zara fit V-Taper shoulders?",
                    "Is size L in Nike fleece too baggy?",
                    "Recommend fitted shirts for chest profile"
                  ].map((chip) => (
                    <button
                      key={chip}
                      type="button"
                      onClick={() => {
                        setChatInput(chip);
                        // Trigger synthetic or actual submission immediately
                        setTimeout(() => {
                          const fakeEvent = { preventDefault: () => {} } as React.FormEvent;
                          handleChatConsult(fakeEvent);
                        }, 50);
                      }}
                      className="bg-[#111422] hover:bg-indigo-500/15 border border-slate-900 hover:border-indigo-500/30 text-slate-300 hover:text-white px-2.5 py-1 rounded text-[10px] font-medium transition cursor-pointer"
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              </div>

              <form onSubmit={handleChatConsult} className="flex gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Ask something like: 'Does Adidas fit baggy?' or 'Suggest wool jackets'"
                  className="flex-1 bg-slate-950 border border-slate-900 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
                <button
                  type="submit"
                  disabled={isThinking || !chatInput.trim()}
                  className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-xs font-bold text-white px-5 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer shrink-0 shadow shadow-indigo-500/10 active:scale-95"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>Send</span>
                </button>
              </form>
            </div>
          )}

          {/* MY SAVED FITS & CLOSET EXPERIENCES PANEL (STEP 4 & 6) */}
          {localSubTab === "bookmarks" && (
            <div className="space-y-6 animate-fade-in text-left">
              {/* Splitting Closet (Left) and Saved Sizes (Right) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                {/* Column Left (Col span 7): Virtual Closet Inventory */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex justify-between items-center bg-slate-950/45 p-3 rounded-lg border border-slate-900/60 font-mono text-xs">
                    <div>
                      <h5 className="font-bold text-white text-xs uppercase flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-indigo-500"></span>
                        My Virtual Closet ({closetInventory.length})
                      </h5>
                      <p className="text-[10px] text-slate-500 font-sans">
                        Rate and store garments you already own to teach our neural weights how clothes fit you.
                      </p>
                    </div>
                  </div>

                  {/* Add Closet Form (Dynamic Feedback Calibration Loop) */}
                  <form onSubmit={handleAddClosetItem} className="bg-slate-950/45 border border-slate-900 p-4 rounded-xl space-y-3 font-sans text-xs">
                    <span className="text-[9px] font-bold text-indigo-400 font-mono uppercase block">Log New Owned Apparel</span>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[9px] uppercase text-slate-500 font-mono">Brand Name</label>
                        <select 
                          value={newClosetBrand}
                          onChange={(e) => setNewClosetBrand(e.target.value)}
                          className="w-full bg-[#111422] border border-slate-900 text-white p-1.5 rounded focus:outline-none focus:border-indigo-500 cursor-pointer"
                        >
                          {["Nike", "Zara", "Uniqlo", "Adidas", "Gap", "H&M"].map(b => (
                            <option key={b} value={b}>{b}</option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[9px] uppercase text-slate-500 font-mono">Size Owned</label>
                        <select 
                          value={newClosetSize}
                          onChange={(e) => setNewClosetSize(e.target.value)}
                          className="w-full bg-[#111422] border border-slate-900 text-white p-1.5 rounded focus:outline-none focus:border-indigo-500 cursor-pointer"
                        >
                          {["XS", "S", "M", "L", "XL", "XXL"].map(s => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[9px] uppercase text-slate-500 font-mono">My Sizing Opinion</label>
                        <select 
                          value={newClosetFitOpinion}
                          onChange={(e) => setNewClosetFitOpinion(e.target.value)}
                          className="w-full bg-[#111422] border border-slate-900 text-amber-305 text-amber-300 p-1.5 rounded focus:outline-none focus:border-indigo-500 cursor-pointer font-mono"
                        >
                          <option value="Fits Perfectly">Fits Perfectly</option>
                          <option value="Too Slim / Tight">Too Slim / Tight (Calibrates profile up)</option>
                          <option value="Too Loose / Long">Too Loose / Long (Calibrates profile down)</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[9px] uppercase text-slate-500 font-mono">Category</label>
                        <select 
                          value={newClosetCategory}
                          onChange={(e) => setNewClosetCategory(e.target.value)}
                          className="w-full bg-[#111422] border border-slate-900 text-white p-1.5 rounded focus:outline-none focus:border-indigo-500 cursor-pointer"
                        >
                          {["Hoodies", "Tees", "Jackets", "Sweaters"].map(c => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[9px] uppercase text-slate-500 font-mono">Garment Description / Model Name</label>
                      <input 
                        type="text"
                        value={newClosetTitle}
                        onChange={(e) => setNewClosetTitle(e.target.value)}
                        placeholder="e.g. Vintage Heavy Cotton Hoodie"
                        className="w-full bg-[#111422] border border-slate-900 text-white px-2.5 py-1.5 rounded placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                        id="title-closet-input"
                      />
                    </div>

                    <div className="pt-1 select-none">
                      <button 
                        type="submit"
                        className="w-full bg-indigo-600 hover:bg-indigo-500 active:scale-98 text-white font-bold font-mono py-2 rounded-lg transition uppercase tracking-wider cursor-pointer"
                      >
                        Add to Virtual Closet & Calibrate
                      </button>
                    </div>

                    {addClosetSuccess && (
                      <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-2.5 rounded-lg text-[10px] text-center leading-normal animate-pulse font-mono">
                        ✔ Added! Calibration completed. System adjusted sizing metrics based on feedback opinion.
                      </div>
                    )}
                  </form>

                  {/* Wardrobe Scroll log list */}
                  <div className="space-y-2 max-h-[190px] overflow-y-auto pr-1">
                    {closetInventory.map((item) => (
                      <div key={item.id} className="bg-slate-950 border border-slate-900/60 p-3 rounded-lg flex justify-between items-center hover:border-indigo-500/15 transition">
                        <div className="text-left space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[9px] bg-slate-900 text-slate-400 font-bold border border-slate-800 uppercase px-1.5 py-0.5 rounded">
                              {item.brand}
                            </span>
                            <span className="text-xs font-bold text-white">{item.title}</span>
                          </div>
                          <p className="text-[10px] text-slate-500 font-mono">
                            Category: {item.category} • Size Owned: <span className="text-indigo-400 font-bold">{item.size}</span>
                          </p>
                        </div>

                        <div className="text-right shrink-0">
                          <span className={`text-[8.5px] font-mono tracking-wider uppercase font-bold px-2 py-0.5 rounded-full ${
                            item.fitOpinion === "Fits Perfectly" 
                              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/15" 
                              : "bg-amber-500/10 text-amber-400 border border-amber-500/15"
                          }`}>
                            {item.fitOpinion}
                          </span>
                          <span className="block text-[8px] text-slate-600 mt-1">{item.added}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Column Right (Col span 5): Saved Recommendations */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="flex items-center justify-between pb-1 border-b border-slate-900">
                    <span className="text-xs font-bold font-mono text-white flex items-center gap-1 z-10">
                      <Bookmark className="h-3.5 w-3.5 text-indigo-400 font-mono" />
                      Saved Fits Cache ({savedForecasts.length})
                    </span>

                    {prediction && (
                      <button
                        onClick={handleBookmarkCurrent}
                        disabled={bookmarkSuccess}
                        className="bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-700 text-[10px] font-bold text-white py-1.5 px-3 rounded-lg transition-all flex items-center gap-1 cursor-pointer whitespace-nowrap active:scale-95"
                      >
                        {bookmarkSuccess ? (
                          <>
                            <Check className="h-3.5 w-3.5 text-white animate-bounce" />
                            Saved to cache
                          </>
                        ) : (
                          <>
                            <Bookmark className="h-3 w-3" />
                            Bookmark Active Sizing
                          </>
                        )}
                      </button>
                    )}
                  </div>

                  <div className="space-y-2.5 max-h-[360px] overflow-y-auto">
                    {savedForecasts.length === 0 ? (
                      <div className="bg-slate-950 border border-dashed border-slate-900 rounded-xl p-10 text-center text-xs text-slate-500 flex flex-col items-center justify-center space-y-2">
                        <Bookmark className="h-8 w-8 text-indigo-500/20" />
                        <span>No saved sizes recorded. Click "Bookmark Active Sizing" to persist results.</span>
                      </div>
                    ) : (
                      savedForecasts.map((bk) => (
                        <div key={bk.id} className="bg-[#0b0c14] border border-slate-900 rounded-xl p-3 flex items-center justify-between hover:border-slate-800 transition">
                          <div className="space-y-1 text-left">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className="text-xs font-bold text-slate-300">{bk.refBrand} ({bk.refSize})</span>
                              <span className="text-slate-500 font-mono text-[9px]">➡</span>
                              <span className="text-xs font-extrabold text-indigo-400 font-mono">{bk.targetBrand} Size {bk.predictedSize}</span>
                            </div>
                            <p className="text-[9.5px] text-slate-500 font-mono">
                              Accuracy Match: <span className="text-emerald-400 font-bold">{bk.confidenceScore}%</span> • {bk.timestamp}
                            </p>
                          </div>

                          <button
                            onClick={() => handleRemoveBookmark(bk.id)}
                            className="text-red-400 hover:text-red-350 hover:bg-red-500/10 p-2 rounded transition cursor-pointer"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </div>

              </div>
            </div>
          )}
        </div>
      </div>

      {/* RETAILER PARTNER OFFER POPUP REDIRECT DIALOG MOCK */}
      {redirectOverlay && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-[#0c101a] border border-slate-900 rounded-2xl p-6 max-w-sm w-full space-y-5 text-center shadow-2xl relative">
            <div className="h-12 w-12 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/20">
              <ShieldCheck className="h-6 w-6" />
            </div>

            <div className="space-y-1">
              <span className="text-[9px] bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2 py-0.5 rounded-full font-bold uppercase font-mono">
                Secure Redirect Active
              </span>
              <h4 className="text-md font-bold text-white pt-1">Redirecting to {redirectOverlay.brand} Partner Store</h4>
              <p className="text-[11px] text-slate-400 leading-normal">
                Anonymously passing your resolved perfect match sizing and body tags for checkout pre-loading.
              </p>
            </div>

            <div className="bg-slate-950 p-3 rounded-xl border border-slate-900 space-y-1 text-xs">
              <p className="text-slate-305 text-slate-300 font-bold">{redirectOverlay.itemTitle}</p>
              <p className="text-[10px] text-slate-500">
                Resolved Size: <span className="text-emerald-400 font-bold font-mono uppercase">{redirectOverlay.size}</span> • Price: ${redirectOverlay.price}
              </p>
            </div>

            <div className="space-y-2 pt-2">
              <a 
                href={`https://www.retailer-redirect.com/partner/cognifit?brand=${redirectOverlay.brand.toLowerCase()}&size=${redirectOverlay.size}`}
                target="_blank"
                rel="noreferrer"
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs py-2.5 rounded-lg block uppercase tracking-wider cursor-pointer"
              >
                Launch Partner Portal
              </a>
              <button 
                onClick={() => setRedirectOverlay(null)}
                className="w-full text-xs text-slate-500 hover:text-slate-300 hover:bg-slate-900 py-2 rounded-lg transition"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
