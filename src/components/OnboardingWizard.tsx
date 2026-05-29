import React, { useState } from "react";
import { 
  Ruler, 
  ChevronRight, 
  ChevronLeft, 
  Sparkles, 
  Check, 
  User, 
  Info, 
  Sliders, 
  ShoppingBag,
  TrendingUp,
  ShieldCheck,
  AlertCircle,
  Globe,
  MapPin
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface OnboardingWizardProps {
  gender: string;
  setGender: (g: string) => void;
  height: number;
  setHeight: (h: number) => void;
  weight: number;
  setWeight: (w: number) => void;
  bodyShape: string;
  setBodyShape: (s: string) => void;
  preferredFit: string;
  setPreferredFit: (f: string) => void;
  refBrand: string;
  setRefBrand: (b: string) => void;
  refSize: string;
  setRefSize: (s: string) => void;
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
  nationality: string;
  setNationality: (v: string) => void;
  region: string;
  setRegion: (v: string) => void;
  city: string;
  setCity: (v: string) => void;
  onComplete: () => void;
}

export default function OnboardingWizard({
  gender,
  setGender,
  height,
  setHeight,
  weight,
  setWeight,
  bodyShape,
  setBodyShape,
  preferredFit,
  setPreferredFit,
  refBrand,
  setRefBrand,
  refSize,
  setRefSize,
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
  nationality,
  setNationality,
  region,
  setRegion,
  city,
  setCity,
  onComplete
}: OnboardingWizardProps) {
  const [step, setStep] = useState<number>(1);
  const totalSteps = 5;

  const nextStep = () => {
    if (step < totalSteps) {
      setStep(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(prev => prev - 1);
    }
  };

  return (
    <div id="onboarding-wizard-wrapper" className="max-w-xl mx-auto my-8 sm:my-12 p-6 sm:p-8 bg-[#0c101b] border border-slate-900 rounded-2xl shadow-2xl relative overflow-hidden text-left">
      {/* Background ambient glow effects */}
      <div className="absolute top-0 left-1/3 w-64 h-64 bg-indigo-500/5 rounded-full blur-[80px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-500/5 rounded-full blur-[80px] pointer-events-none"></div>

      {/* Progress header with live micro percentage */}
      <div className="flex justify-between items-center mb-6 relative z-10">
        <div className="flex items-center gap-2">
          <div className="bg-indigo-600/20 p-2 rounded-xl border border-indigo-500/20 shadow">
            <Ruler className="h-4 w-4 text-indigo-400" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Zarevat Fit Profile</h3>
            <p className="text-[10px] text-slate-500 font-mono">Regional Community Sizing Context</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[9.5px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full font-bold">
            {Math.floor((step / totalSteps) * 100)}% Complete
          </span>
          <span className="text-xs font-mono font-bold text-indigo-300 bg-indigo-500/10 px-2.5 py-1 rounded-full border border-indigo-500/15">
            Step {step}/{totalSteps}
          </span>
        </div>
      </div>

      {/* Progress progress dots track */}
      <div className="flex gap-1 mb-8 relative z-10">
        {[1, 2, 3, 4, 5].map((i) => (
          <div 
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
              i === step 
                ? "bg-gradient-to-r from-indigo-500 to-indigo-600 shadow-md shadow-indigo-500/20" 
                : i < step 
                ? "bg-indigo-500/40" 
                : "bg-slate-900"
            }`}
          ></div>
        ))}
      </div>

      {/* STEP CONTENT WITH SLIDE TRANSITIONS IN FRAMER MOTION */}
      <div className="min-h-[300px] relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="space-y-6"
          >
            
            {/* Step 1: Base Body Bio & Regional Coordinates */}
            {step === 1 && (
              <div className="space-y-6">
                <div className="space-y-1">
                  <h2 className="text-xl font-bold text-white tracking-tight leading-none">Your Identity & Core Biometrics</h2>
                  <p className="text-xs text-slate-400">
                    Calibrate your physical frame alongside your geographic demographic to find your shopper matches.
                  </p>
                </div>

                {/* Aesthetic interactive Gender Preference */}
                <div>
                  <label className="block text-[9.5px] font-bold text-slate-500 uppercase tracking-widest mb-2 font-mono">
                    Anatomical Pattern Cuts
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: "male", label: "Men's Cuts", desc: "Straight regular contours" },
                      { id: "female", label: "Women's Cuts", desc: "Curved tailored contour" },
                      { id: "non-binary", label: "Neutral Cuts", desc: "Boxier comfortable room" }
                    ].map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setGender(item.id)}
                        className={`p-3 text-left rounded-xl border transition-all cursor-pointer flex flex-col justify-between min-h-[75px] ${
                          gender === item.id
                            ? "bg-indigo-600/10 border-indigo-500 text-white shadow-xl shadow-indigo-600/5 ring-1 ring-indigo-500/30"
                            : "bg-slate-950 border-slate-900 text-slate-400 hover:text-white"
                        }`}
                      >
                        <span className="text-[11px] font-bold block">{item.label}</span>
                        <span className="text-[8.5px] text-slate-500 font-mono leading-none">{item.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* NEW - Nationality & City Fields (REGIONAL FIT EXCLUSIVE) */}
                <div className="grid grid-cols-2 gap-3" id="regional-meta-fields">
                  <div>
                    <label className="block text-[9.5px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 font-mono">
                      Nationality Origin
                    </label>
                    <select
                      value={nationality}
                      onChange={(e) => {
                        setNationality(e.target.value);
                        if (e.target.value === "Saudi Arabian") {
                          setRegion("Middle East");
                          setCity("Dammam");
                        } else if (e.target.value === "Emirati") {
                          setRegion("Middle East");
                          setCity("Dubai");
                        } else if (e.target.value === "British") {
                          setRegion("Western Europe");
                          setCity("London");
                        } else if (e.target.value === "American") {
                          setRegion("North America");
                          setCity("New York");
                        }
                      }}
                      className="w-full bg-slate-950 border border-slate-900 text-white rounded-xl p-3 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 font-medium cursor-pointer"
                    >
                      <option value="Saudi Arabian">Saudi Arabian</option>
                      <option value="Emirati">Emirati</option>
                      <option value="Kuwaiti">Kuwaiti</option>
                      <option value="Qatari">Qatari</option>
                      <option value="British">British</option>
                      <option value="American">American</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[9.5px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 font-mono">
                      Current City Location
                    </label>
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-900 text-white rounded-xl p-3 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 font-medium cursor-pointer"
                    >
                      {nationality === "Saudi Arabian" && (
                        <>
                          <option value="Dammam">Dammam</option>
                          <option value="Riyadh">Riyadh</option>
                          <option value="Jeddah">Jeddah</option>
                        </>
                      )}
                      {nationality === "Emirati" && (
                        <>
                          <option value="Dubai">Dubai</option>
                          <option value="Abu Dhabi">Abu Dhabi</option>
                        </>
                      )}
                      {nationality === "British" && (
                        <>
                          <option value="London">London</option>
                          <option value="Manchester">Manchester</option>
                        </>
                      )}
                      {nationality === "American" && (
                        <>
                          <option value="New York">New York</option>
                          <option value="Los Angeles">Los Angeles</option>
                        </>
                      )}
                      {!["Saudi Arabian", "Emirati", "British", "American"].includes(nationality) && (
                        <>
                          <option value="Riyadh">Riyadh</option>
                          <option value="Dubai">Dubai</option>
                          <option value="Kuwait City">Kuwait City</option>
                          <option value="Doha">Doha</option>
                        </>
                      )}
                    </select>
                  </div>
                </div>

                {/* Height Selector */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-[9.5px] font-bold text-slate-500 uppercase tracking-widest font-mono">
                      Height Meter
                    </label>
                    <span className="text-[11px] font-mono font-bold text-indigo-300 bg-[#121625] border border-indigo-500/15 px-2.5 py-0.5 rounded">
                      {height} cm <span className="text-[9px] text-slate-500 font-normal">({(height / 30.48).toFixed(1)} ft)</span>
                    </span>
                  </div>
                  <input
                    type="range"
                    min="140"
                    max="210"
                    value={height}
                    onChange={(e) => setHeight(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                  />
                  <div className="flex justify-between text-[9px] text-slate-550 text-slate-500 font-mono">
                    <span>140cm</span>
                    <span>175cm (Median)</span>
                    <span>210cm</span>
                  </div>
                </div>

                {/* Weight Selector */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-[9.5px] font-bold text-slate-500 uppercase tracking-widest font-mono">
                      Weight Mass
                    </label>
                    <span className="text-[11px] font-mono font-bold text-indigo-300 bg-[#121625] border border-indigo-500/15 px-2.5 py-0.5 rounded">
                      {weight} kg <span className="text-[9px] text-slate-500 font-normal">({Math.round(weight * 2.204)} lbs)</span>
                    </span>
                  </div>
                  <input
                    type="range"
                    min="40"
                    max="135"
                    value={weight}
                    onChange={(e) => setWeight(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                  />
                  <div className="flex justify-between text-[9px] text-slate-500 font-mono">
                    <span>40kg</span>
                    <span>70kg (Median)</span>
                    <span>135kg</span>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Silhouette & Drape preferences */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="space-y-1">
                  <h2 className="text-xl font-bold text-white tracking-tight leading-none">Your Shape & Fit Aesthetics</h2>
                  <p className="text-xs text-slate-400">
                    Sizing numbers vary drastically on bones, shoulders, and drape preferences.
                  </p>
                </div>

                {/* Body Shape Section */}
                <div className="space-y-2 text-left">
                  <label className="block text-[9.5px] font-bold text-slate-500 uppercase tracking-widest font-mono">
                    Upper Silhouette Shape
                  </label>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {[
                      { id: "balanced", title: "Balanced Proportions", desc: "Standard even alignment" },
                      { id: "athletic-v", title: "Broad Shoulder (V)", desc: "Tricky on sleeve seams" },
                      { id: "slim-linear", title: "Slim / Slender", desc: "Long limbs, thin bones" },
                      { id: "curved", title: "Comfortable Fuller", desc: "Slightly broader torso room" }
                    ].map((sh) => (
                      <button
                        key={sh.id}
                        type="button"
                        onClick={() => setBodyShape(sh.id)}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex justify-between items-center ${
                          bodyShape === sh.id
                            ? "bg-[#111627] border-indigo-500 text-white ring-1 ring-indigo-500/20"
                            : "bg-slate-950 border-slate-900 text-slate-450 text-slate-400 hover:text-white"
                        }`}
                      >
                        <div className="space-y-0.5">
                          <span className="text-xs font-bold block">{sh.title}</span>
                          <span className="text-[10px] text-slate-500 block leading-tight">{sh.desc}</span>
                        </div>
                        {bodyShape === sh.id && (
                          <span className="h-4 w-4 rounded-full bg-indigo-500 flex items-center justify-center text-white shrink-0 scale-110 ml-2">
                            <Check className="h-2.5 w-2.5" />
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Styling Preferred Fit Drape */}
                <div className="space-y-2">
                  <label className="block text-[9.5px] font-bold text-slate-500 uppercase tracking-widest font-mono">
                    Preferred Fabric Drape
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: "snug", label: "Skin Snug", d: "Hugs muscular contours" },
                      { id: "standard", label: "Classic Fitted", d: "Perfect drape lines" },
                      { id: "loose", label: "Relaxed Room", d: "Slightly oversized volume" }
                    ].map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setPreferredFit(item.id)}
                        className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                          preferredFit === item.id
                            ? "bg-indigo-600/20 border-indigo-500 text-white font-bold ring-1 ring-indigo-500/20"
                            : "bg-slate-950 border-slate-900 text-slate-400 hover:text-white"
                        }`}
                      >
                        <span className="text-xs block">{item.label}</span>
                        <span className="text-[9px] text-slate-500 block mt-1 leading-none">{item.d}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Wardrobe Anchors */}
            {step === 3 && (
              <div className="space-y-6">
                <div className="space-y-1">
                  <h2 className="text-xl font-bold text-white tracking-tight leading-none">Your Anchor Item Calibration</h2>
                  <p className="text-xs text-slate-400">
                    Which garment in your current closet fits you best? We reverse-engineer its dimensions.
                  </p>
                </div>

                {/* Base Anchor Brand Selection */}
                <div className="space-y-2 mt-2">
                  <label className="block text-[9.5px] font-bold text-slate-500 uppercase tracking-widest font-mono">
                    Select Reference Closet Label
                  </label>
                  <select
                    value={refBrand}
                    onChange={(e) => setRefBrand(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-900 text-white rounded-xl p-3.5 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 font-medium cursor-pointer"
                  >
                    <option value="Nike">Nike (Standard comfortable sport spacing)</option>
                    <option value="Adidas">Adidas (Sleek functional fit spacing)</option>
                    <option value="Zara">Zara (Narrower high-street tailoring fits smaller)</option>
                    <option value="H&M">H&M (Standard European basic fit)</option>
                    <option value="Uniqlo">Uniqlo (Square comfort box structure)</option>
                    <option value="Gap">Gap (Generous American baseline spacing)</option>
                  </select>
                </div>

                {/* Perfect size selection */}
                <div className="space-y-2">
                  <label className="block text-[9.5px] font-bold text-slate-500 uppercase tracking-widest font-mono">
                    Size Perfect-Fit in {refBrand}
                  </label>
                  <div className="grid grid-cols-4 gap-2.5">
                    {["S", "M", "L", "XL"].map((sz) => (
                      <button
                        key={sz}
                        type="button"
                        onClick={() => setRefSize(sz)}
                        className={`py-3 rounded-xl border transition-all text-xs font-bold cursor-pointer font-mono ${
                          refSize === sz
                            ? "bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-500/10"
                            : "bg-slate-950 border-slate-900 text-slate-400 hover:text-white"
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Micro visual match disclaimer */}
                <div className="bg-[#121622] border border-slate-900 p-4 rounded-xl flex items-start gap-2.5">
                  <ShieldCheck className="h-5 w-5 text-indigo-400 shrink-0 mt-0.5 animate-pulse" />
                  <p className="text-[11px] text-slate-300 leading-relaxed font-sans">
                    <strong>Confidence Anchor Established:</strong> Collective cohort algorithms will reverse-engineer your perfect base measurements on <span className="text-indigo-400 font-bold">{refBrand} Size {refSize}</span> parameters.
                  </p>
                </div>
              </div>
            )}

            {/* Step 4: Optional Biomechanical Dimensions overriding */}
            {step === 4 && (
              <div className="space-y-6">
                <div className="space-y-1">
                  <span className="text-[9px] bg-indigo-500/15 text-indigo-400 font-bold px-2.5 py-1 rounded-full uppercase border border-indigo-500/10 font-mono tracking-wider">
                    Anatomical Precision Level 2
                  </span>
                  <h2 className="text-xl font-bold text-white tracking-tight leading-none mt-1.5">Biomechanic Adjustments</h2>
                  <p className="text-xs text-slate-400 font-sans">
                    Enable standard estimations or configure micro parameters for maximum precision.
                  </p>
                </div>

                {/* Calibration Toggle button */}
                <div className={`p-4 rounded-xl border transition-all ${
                  useAdvancedProfile 
                    ? "bg-indigo-950/20 border-indigo-500/20 shadow-inner" 
                    : "bg-slate-950 border-slate-900"
                }`}>
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <span className="text-xs font-bold text-white block">Manual Overriding Controls</span>
                      <span className="text-[9.5px] text-slate-400 block mt-0.5">Toggle metric slider overrides</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setUseAdvancedProfile(!useAdvancedProfile)}
                      className={`px-3 py-1.5 rounded-lg text-[10px] font-bold font-mono transition cursor-pointer shrink-0 ${
                        useAdvancedProfile 
                          ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/10 border border-transparent" 
                          : "bg-slate-900 text-indigo-400 border border-slate-800 hover:text-white"
                      }`}
                    >
                      {useAdvancedProfile ? "Level 2 Active" : "Level 1 Estimation"}
                    </button>
                  </div>
                </div>

                {/* Override sliders block */}
                {useAdvancedProfile ? (
                  <div className="space-y-4 max-h-[250px] overflow-y-auto pr-1.5 bg-[#090b12] p-4 rounded-xl border border-slate-900 mt-2 text-left">
                    {/* Chest */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center text-xs font-mono">
                        <span className="text-slate-400 font-medium">Chest Circumference</span>
                        <span className="font-mono text-indigo-400 font-bold">{chest} cm</span>
                      </div>
                      <input
                        type="range"
                        min="70"
                        max="140"
                        value={chest}
                        onChange={(e) => setChest(Number(e.target.value))}
                        className="w-full h-1 bg-slate-900 rounded appearance-none cursor-pointer accent-indigo-500"
                      />
                    </div>

                    {/* Waist */}
                    <div className="space-y-1.5 font-mono">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-400 font-medium">Torso Waist Line</span>
                        <span className="font-mono text-indigo-400 font-bold">{waist} cm</span>
                      </div>
                      <input
                        type="range"
                        min="60"
                        max="135"
                        value={waist}
                        onChange={(e) => setWaist(Number(e.target.value))}
                        className="w-full h-1 bg-slate-900 rounded appearance-none cursor-pointer accent-indigo-500"
                      />
                    </div>

                    {/* Shoulders */}
                    <div className="space-y-1.5 font-mono">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-400 font-medium">Shoulders Bone Width</span>
                        <span className="font-mono text-indigo-400 font-bold">{shoulderWidth} cm</span>
                      </div>
                      <input
                        type="range"
                        min="34"
                        max="58"
                        value={shoulderWidth}
                        onChange={(e) => setShoulderWidth(Number(e.target.value))}
                        className="w-full h-1 bg-slate-900 rounded appearance-none cursor-pointer accent-indigo-500"
                      />
                    </div>

                    {/* Inseam */}
                    <div className="space-y-1.5 font-mono">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-400 font-medium">Inseam Length</span>
                        <span className="font-mono text-indigo-400 font-bold">{inseam} cm</span>
                      </div>
                      <input
                        type="range"
                        min="65"
                        max="98"
                        value={inseam}
                        onChange={(e) => setInseam(Number(e.target.value))}
                        className="w-full h-1 bg-slate-900 rounded appearance-none cursor-pointer accent-indigo-500"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="bg-slate-950/50 border border-slate-900 rounded-2xl p-6 text-center">
                    <p className="text-xs text-slate-400 leading-normal max-w-sm mx-auto">
                      Rest easy, Zarevat has calculated biomechanical estimators. Let's move straight away to complete.
                    </p>
                    <button
                      type="button"
                      onClick={() => setStep(5)}
                      className="mt-4 text-xs font-bold text-indigo-400 hover:text-white transition bg-[#131725] px-4 py-2 border border-slate-900 rounded-xl cursor-pointer inline-flex items-center gap-1.5"
                    >
                      Skip Overrides and Finish →
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Step 5: Completed overview */}
            {step === 5 && (
              <div className="space-y-6 text-center py-4">
                <div className="h-16 w-16 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/20 shadow-emerald shadow shadow-lg animate-pulse">
                  <Sparkles className="h-8 w-8 text-emerald-400" />
                </div>

                <div className="space-y-1.5">
                  <h2 className="text-2xl font-extrabold text-white tracking-tight leading-none">Profile Calibrated Accurately!</h2>
                  <p className="text-xs text-slate-300 max-w-sm mx-auto font-sans leading-relaxed">
                     Your geographic demographic profiles and physical drapes are fully aggregated.
                  </p>
                </div>

                {/* Summary block */}
                <div className="bg-slate-950 border border-slate-900 rounded-2xl p-4 max-w-xs mx-auto text-left space-y-3 font-mono">
                  <div className="flex justify-between text-[9.5px] text-slate-500 uppercase tracking-widest">
                    <span>Summary Overview</span>
                    <span className="text-emerald-400 font-bold">
                      {useAdvancedProfile ? "Precision Lvl 2" : "Aqueous Lvl 1"}
                    </span>
                  </div>
                  <div className="text-[11.5px] text-slate-200 space-y-1.5 bg-[#0f121e] p-3 rounded-xl border border-slate-900">
                    <p>Nationality: <span className="text-indigo-455 text-indigo-400 font-bold">{nationality}</span></p>
                    <p>City Location: <span className="text-indigo-455 text-indigo-400 font-bold">{city}</span></p>
                    <p>Cuts Pattern: <span className="text-indigo-455 text-indigo-400 font-bold capitalize">{gender}</span></p>
                    <p>Height Profile: <span className="text-indigo-455 text-indigo-400 font-bold">{height}cm</span></p>
                    <p>Weight Profile: <span className="text-indigo-455 text-indigo-400 font-bold">{weight}kg</span></p>
                    <p>Baseline Size: <span className="text-indigo-455 text-indigo-400 font-bold">{refBrand} {refSize}</span></p>
                  </div>
                </div>

                <p className="text-[10px] text-slate-500 italic max-w-xs mx-auto">
                  Ready to compare size keeping behaviors against regional shoppers.
                </p>
              </div>
            )}

          </motion.div>
        </AnimatePresence>
      </div>

      {/* FOOTER ACTION BUTTONS */}
      <div className="flex justify-between items-center mt-8 pt-4 border-t border-slate-900 relative z-10">
        {step > 1 ? (
          <button
            type="button"
            onClick={prevStep}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-slate-400 hover:text-white transition cursor-pointer"
          >
            <ChevronLeft className="h-4 w-4" />
            Back
          </button>
        ) : (
          <div></div>
        )}

        <button
          type="button"
          onClick={nextStep}
          className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl px-5 py-3 text-xs transition duration-200 flex items-center gap-1.5 cursor-pointer shadow-lg shadow-indigo-600/10 active:scale-98"
        >
          {step === totalSteps ? (
            <>
              Explore Community Wisdom
              <Check className="h-4 w-4 text-emerald-400" />
            </>
          ) : (
            <>
              Continue
              <ChevronRight className="h-4 w-4" />
            </>
          )}
        </button>
      </div>

    </div>
  );
}
