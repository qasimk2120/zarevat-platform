import React, { useState, useEffect } from "react";
import { 
  Ruler, 
  Cpu, 
  ShoppingBag, 
  RefreshCw,
  BarChart3,
} from "lucide-react";

// Sub-components for distinct product layers
import PublicLanding from "./components/PublicLanding";
import CustomerPortal from "./components/CustomerPortal";
import AnalyticsHub from "./components/AnalyticsHub";

export default function App() {
  // Navigation - Layer Domain Tab routing
  const [activeTab, setActiveTab] = useState<"landing" | "app" | "admin">("landing");
  const [isAdminMode, setIsAdminMode] = useState<boolean>(false);
  const [versionClicks, setVersionClicks] = useState<number>(0);

  // Simulated Customer Application Session States (Layer 2)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [waitlistEmail, setWaitlistEmail] = useState<string>("visitor.member@gmail.com");
  const [waitlistSuccess, setWaitlistSuccess] = useState<boolean>(false);
  
  // Local persistence and local telemetry data structures for offline MVP matching
  const [waitlistEmails, setWaitlistEmails] = useState<string[]>([]);
  const [surveyVotes, setSurveyVotes] = useState<{ [key: string]: number }>({
    "Mango Sizing Pool": 45,
    "Pull & Bear Sizing Pool": 32,
    "H&M Premium Sizing Pool": 28,
    "Massimo Dutti Sizing Pool": 19,
    "Adidas Athletics Sizing Pool": 14,
    "Nike Tech Pro Sizing Pool": 22
  });

  const addWaitlistEmail = (email: string) => {
    if (!waitlistEmails.includes(email)) {
      const next = [email, ...waitlistEmails];
      setWaitlistEmails(next);
      localStorage.setItem("zarevat_waitlist", JSON.stringify(next));
    }
  };

  const removeWaitlistEmail = (idx: number) => {
    const next = [...waitlistEmails];
    next.splice(idx, 1);
    setWaitlistEmails(next);
    localStorage.setItem("zarevat_waitlist", JSON.stringify(next));
  };

  const submitSurveyVote = (brand: string) => {
    const next = { ...surveyVotes };
    const keys = Object.keys(next);
    const matchedKey = keys.find(k => k.toLowerCase().includes(brand.toLowerCase())) || brand;
    next[matchedKey] = (next[matchedKey] || 0) + 1;
    setSurveyVotes(next);
    localStorage.setItem("zarevat_survey_votes", JSON.stringify(next));
  };

  const handleSetWaitlistSuccess = (success: boolean) => {
    setWaitlistSuccess(success);
    if (success && waitlistEmail.trim()) {
      addWaitlistEmail(waitlistEmail.trim());
    }
  };
  
  // Quick click redirection logs logger for the Founder hub
  const [recentRedirects, setRecentRedirects] = useState<any[]>([
    { id: "r_011", brand: "Zara", title: "Comfort Pocket Tee", resolvedSize: "L", timestamp: "3 mins ago", value: "1.40" },
    { id: "r_012", brand: "Uniqlo", title: "Contoured Down Jacket", resolvedSize: "M", timestamp: "10 mins ago", value: "3.80" }
  ]);

  // Live Fit Calculation sandbox states (shared between public demo & customer dashboard)
  const [gender, setGender] = useState<string>("male");
  const [height, setHeight] = useState<number>(178);
  const [weight, setWeight] = useState<number>(76);
  const [bodyShape, setBodyShape] = useState<string>("balanced");
  const [refBrand, setRefBrand] = useState<string>("Nike");
  const [refSize, setRefSize] = useState<string>("M");
  const [targetBrand, setTargetBrand] = useState<string>("Zara");
  const [category, setCategory] = useState<string>("Hoodies");
  const [nationality, setNationality] = useState<string>("Saudi Arabian");
  const [region, setRegion] = useState<string>("Middle East");
  const [city, setCity] = useState<string>("Dammam");

  // Level 2 - Advanced Physical Profile dimensions (Optional) + Fit Target Goals
  const [preferredFit, setPreferredFit] = useState<string>("standard");
  const [useAdvancedProfile, setUseAdvancedProfile] = useState<boolean>(false);
  const [chest, setChest] = useState<number>(96);
  const [waist, setWaist] = useState<number>(82);
  const [shoulderWidth, setShoulderWidth] = useState<number>(44);
  const [inseam, setInseam] = useState<number>(80);
  const [armLength, setArmLength] = useState<number>(62);
  const [hip, setHip] = useState<number>(94);
  
  const [isCalculating, setIsCalculating] = useState<boolean>(false);
  const [prediction, setPrediction] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Sub-tabs for Sandbox Customer Extra Interactions
  const [sandboxSubTab, setSandboxSubTab] = useState<"curation" | "stylist" | "bookmarks">("curation");

  // Saved Sizing Bookmarks State (Saved Recommendations Cache)
  const [savedForecasts, setSavedForecasts] = useState<any[]>([
    { id: "b_01", refBrand: "Nike", refSize: "M", targetBrand: "Zara", predictedSize: "L", confidenceScore: 89, timestamp: "Just now" },
    { id: "b_02", refBrand: "Nike", refSize: "M", targetBrand: "Uniqlo", predictedSize: "M", confidenceScore: 94, timestamp: "1 hour ago" }
  ]);
  const [bookmarkSuccess, setBookmarkSuccess] = useState<boolean>(false);

  // AI Stylist Chat State
  const [chatInput, setChatInput] = useState<string>("Hi! What did fellow Saudi Arabian shoppers say about Zara hoodies?");
  const [isThinking, setIsThinking] = useState<boolean>(false);
  const [chatMessages, setChatMessages] = useState<any[]>([
    { role: "assistant", content: "Salaam! I am your Zarevat community fit assistant. I can show you exactly what other shoppers from your region, nationality, and size build experienced with Zara, Nike, Uniqlo, and other key brands. Try asking: 'What size in Zara do people matching my athletic build keep?'" }
  ]);

  // Discovery Curation Categories
  const [activeCategory, setActiveCategory] = useState<string>("All");
  
  const baseCatalog = [
    { 
      id: "app_01", 
      brand: "Nike", 
      title: "Sportswear Tech Fleece Windrunner", 
      category: "Hoodies", 
      basePrice: 130, 
      promoPrice: 110, 
      imageUrl: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=600",
      fitBias: "Relaxed / Roomy Fit",
      warnings: ["Torso fits roomy", "Perfect armlength draping"],
      collaborativeInsight: "93% of athletic builds report an elegant loose silhouette. Great for active layers.",
      affinityTag: "Accents broad shoulder frames",
      rating: 4.8
    },
    { 
      id: "app_02", 
      brand: "Zara", 
      title: "Comfort Tailored Pocket Tee", 
      category: "Tees", 
      basePrice: 35, 
      imageUrl: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=600",
      fitBias: "Contoured Slim Fit",
      warnings: ["Shoulders run very narrow", "Short cropped sleeve hem"],
      collaborativeInsight: "92% of active users size up for adequate chest expansion.",
      affinityTag: "Ideal for slimmer, taller frames",
      rating: 4.2
    },
    { 
      id: "app_03", 
      brand: "Uniqlo", 
      title: "Hybrid Contoured Down Outer Jacket", 
      category: "Jackets", 
      basePrice: 120, 
      promoPrice: 95, 
      imageUrl: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&q=80&w=600",
      fitBias: "Standard Compact Fit",
      warnings: ["Slightly shorter sleeves", "Straight waist profile"],
      collaborativeInsight: "Matches exact baseline standard chest templates. True-to-life sizing.",
      affinityTag: "Popular among balanced silhouettes",
      rating: 4.6
    },
    {
      id: "app_04",
      brand: "Adidas",
      title: "Future Icons Relaxed Pullover",
      category: "Hoodies",
      basePrice: 85,
      promoPrice: 70,
      imageUrl: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=600",
      fitBias: "Oversized Drape Fit",
      warnings: ["Draft roomier in torso", "Deep armholes outline"],
      collaborativeInsight: "Crowd consensus recommends sizing down if you dislike baggy sleeve lines.",
      affinityTag: "Adapts well to curves & broader builds",
      rating: 4.7
    },
    {
      id: "app_05",
      brand: "Gap",
      title: "Classic Arch Fleece Heritage Hoodie",
      category: "Hoodies",
      basePrice: 75,
      imageUrl: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=600",
      fitBias: "Traditional Relaxed Stretch",
      warnings: ["Stretchable cotton cuffs", "Longer overall waist draping"],
      collaborativeInsight: "Classic American relaxed cut. Fits with comfortable extra space around torso.",
      affinityTag: "Highly forgiving fit for all profiles",
      rating: 4.4
    },
    {
      id: "app_06",
      brand: "H&M",
      title: "Premium Edition Merino Knit Sweater",
      category: "Sweaters",
      basePrice: 60,
      promoPrice: 48,
      imageUrl: "https://images.unsplash.com/photo-1614975058789-41316d0e2e9c?auto=format&fit=crop&q=80&w=600",
      fitBias: "Fitted Tailored Fit",
      warnings: ["Chest contour snugness", "Ribbed bottom band stays fitted"],
      collaborativeInsight: "Beautiful form fit highlights chest expansion. Select standard size.",
      affinityTag: "Best for athletic V-taper shape types",
      rating: 4.3
    },
    {
      id: "app_07",
      brand: "Zara",
      title: "Minimalist Boxy Crew Sweater",
      category: "Sweaters",
      basePrice: 49,
      imageUrl: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&q=80&w=600",
      fitBias: "Cropped Boxy Fit",
      warnings: ["Intentionally short body", "Long cozy sleeves style"],
      collaborativeInsight: "Fitted snug in length but loose in chest. Adapts to modern styles.",
      affinityTag: "Perfect street look for slim & balanced waist",
      rating: 4.5
    },
    {
      id: "app_08",
      brand: "Nike",
      title: "Dri-FIT ADV Tech Knit Tee",
      category: "Tees",
      basePrice: 45,
      imageUrl: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&q=80&w=600",
      fitBias: "Ergonomic Comfort Fit",
      warnings: ["Accentuates active arm lines", "Stretch material conforms to shape"],
      collaborativeInsight: "Athletic body hugging. Size up if you prefer standard room.",
      affinityTag: "Flattering active silhouette",
      rating: 4.9
    }
  ];

  // Simulated Analytics Telemetry values
  const [numPredictions, setNumPredictions] = useState<number>(3);
  const [numClicks, setNumClicks] = useState<number>(1);
  const [totalCommission, setTotalCommission] = useState<number>(4.40);

  // Notification for interactive outbound links
  const [trackedRedirect, setTrackedRedirect] = useState<any>(null);

  // Core persistence: load from cache on mount
  useEffect(() => {
    // Check if admin is set in URL parameters or local cache
    try {
      const params = new URLSearchParams(window.location.search);
      const isParamAdmin = params.get("admin") === "true";
      const storedAdmin = localStorage.getItem("zarevat_admin") === "true";
      if (isParamAdmin || storedAdmin) {
        setIsAdminMode(true);
        if (isParamAdmin) {
          localStorage.setItem("zarevat_admin", "true");
        }
      }
    } catch (err) {
      console.error("Failed to parse admin url params", err);
    }

    try {
      const cached = localStorage.getItem("zarevat_profile");
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed.gender) setGender(parsed.gender);
        if (parsed.height) setHeight(parsed.height);
        if (parsed.weight) setWeight(parsed.weight);
        if (parsed.bodyShape) setBodyShape(parsed.bodyShape);
        if (parsed.refBrand) setRefBrand(parsed.refBrand);
        if (parsed.refSize) setRefSize(parsed.refSize);
        if (parsed.preferredFit) setPreferredFit(parsed.preferredFit);
        if (parsed.useAdvancedProfile !== undefined) setUseAdvancedProfile(parsed.useAdvancedProfile);
        if (parsed.chest) setChest(parsed.chest);
        if (parsed.waist) setWaist(parsed.waist);
        if (parsed.shoulderWidth) setShoulderWidth(parsed.shoulderWidth);
        if (parsed.inseam) setInseam(parsed.inseam);
        if (parsed.armLength) setArmLength(parsed.armLength);
        if (parsed.hip) setHip(parsed.hip);
        if (parsed.nationality) setNationality(parsed.nationality);
        if (parsed.region) setRegion(parsed.region);
        if (parsed.city) setCity(parsed.city);
        setIsAuthenticated(true);
      }
    } catch (e) {
      console.error("Failed to load cached profile", e);
    }

    // Initialize local validation records
    try {
      const cachedWaitlist = localStorage.getItem("zarevat_waitlist");
      if (cachedWaitlist) {
        setWaitlistEmails(JSON.parse(cachedWaitlist));
      } else {
        const initial = ["fahad.m@gmail.com", "ali.dammam@outlook.com", "zayed.dubai@yahoo.com"];
        setWaitlistEmails(initial);
        localStorage.setItem("zarevat_waitlist", JSON.stringify(initial));
      }

      const cachedVotes = localStorage.getItem("zarevat_survey_votes");
      if (cachedVotes) {
        setSurveyVotes(JSON.parse(cachedVotes));
      }

      const cachedCalculationsCount = localStorage.getItem("zarevat_calculations_count");
      if (cachedCalculationsCount) {
        setNumPredictions(Number(cachedCalculationsCount));
      } else {
        setNumPredictions(18);
        localStorage.setItem("zarevat_calculations_count", "18");
      }
    } catch (vErr) {
      console.error("Failed to restore validation storage", vErr);
    }

    // Fire calculate
    setTimeout(() => {
      handleCalculate();
    }, 150);
  }, []);

  // Save profile state updates to cache automatically for onboarding persistence
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const profile = {
          gender, height, weight, bodyShape, refBrand, refSize, preferredFit,
          useAdvancedProfile, chest, waist, shoulderWidth, inseam, armLength, hip,
          nationality, region, city
        };
        localStorage.setItem("zarevat_profile", JSON.stringify(profile));
      } catch (e) {
        console.error("Failed to persist profile", e);
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [gender, height, weight, bodyShape, refBrand, refSize, preferredFit, useAdvancedProfile, chest, waist, shoulderWidth, inseam, armLength, hip, nationality, region, city]);

  // Biometric Standard Estimations (Level 1 automatically updates Level 2 unless customized)
  useEffect(() => {
    if (!useAdvancedProfile) {
      const estChest = Math.round(weight * 1.05 + height * 0.08);
      const estWaist = Math.round(weight * 0.9 + height * 0.06);
      const estShoulder = Math.round(height * 0.24 + (gender === "male" ? 1.5 : -1));
      const estInseam = Math.round(height * 0.44);
      const estArm = Math.round(height * 0.35);
      const estHip = Math.round(weight * 1.1 + height * 0.05);

      setChest(estChest);
      setWaist(estWaist);
      setShoulderWidth(estShoulder);
      setInseam(estInseam);
      setArmLength(estArm);
      setHip(estHip);
    }
  }, [height, weight, gender, useAdvancedProfile]);

  const handleVersionClick = () => {
    setVersionClicks(prev => {
      const next = prev + 1;
      if (next >= 5) {
        const targetAdminMode = !isAdminMode;
        setIsAdminMode(targetAdminMode);
        localStorage.setItem("zarevat_admin", String(targetAdminMode));
        return 0;
      }
      return next;
    });
  };

  const handleCalculate = async () => {
    setIsCalculating(true);
    setErrorMsg(null);
    
    // Simulate fit engine computation delay to feel real-time and intelligent
    setTimeout(() => {
      let predictedSize = "M";
      let behavioralInsight = `${targetBrand} matches standard sizing specifications. Choose your usual typical size.`;
      let anomalies = "None identified. Fabric blends include comfortable stretch properties.";
      let chestAdj = "Standard Fit";
      let waistAdj = "Regular Fit";
      let lengthPref = "Sits True to Waist";
      let shoulderRisk = "low";

      if (targetBrand.toLowerCase() === "zara") {
        predictedSize = refSize === "S" ? "M" : refSize === "M" ? "L" : "XL";
        behavioralInsight = "Zara garments run slightly narrower in the chest and shoulders. Sizing up covers athletic framing comfortably.";
        anomalies = "Sleeve caps fit high on the shoulder socket. Body length is cut narrower.";
        chestAdj = "1.5cm narrower";
        waistAdj = "Tailored / Fitted";
        lengthPref = "Slightly cropped";
        shoulderRisk = "high";
      } else if (targetBrand.toLowerCase() === "gap") {
        predictedSize = refSize === "XL" ? "L" : refSize === "L" ? "M" : "S";
        behavioralInsight = "GAP uses traditional relaxed American sizing guidelines. Customers frequently size down for a modern fitted aesthetic.";
        anomalies = "Generous chest width. Armholes drop low with maximum mobility.";
        chestAdj = "2.2cm wider";
        waistAdj = "Generous / Loose";
        lengthPref = "Slightly long";
        shoulderRisk = "low";
      } else if (targetBrand.toLowerCase() === "uniqlo") {
        predictedSize = refSize;
        behavioralInsight = "Uniqlo's boxy comfort contours conform to typical measurements. Sizing remains consistent across categories.";
        anomalies = "Straight tubular box trunk drapes cleanly off standard skeletal frames.";
        chestAdj = "Classic Fit";
        waistAdj = "Tubular Relaxed";
        lengthPref = "Sits at Hips";
        shoulderRisk = "moderate";
      }

      setPrediction({
        predictedSize,
        confidenceScore: 89 + (Math.floor(Math.random() * 8)),
        behavioralInsight,
        sizingAnomalies: anomalies,
        chestAdjustment: chestAdj,
        waistAdjustment: waistAdj,
        lengthPreference: lengthPref,
        shoulderTightnessRisk: shoulderRisk,
        similarShopperCount: targetBrand.toLowerCase() === "zara" ? 143 : targetBrand.toLowerCase() === "uniqlo" ? 156 : 98,
        isRealAI: false
      });

      // Track telemetry locally
      setNumPredictions(prev => {
        const next = prev + 1;
        localStorage.setItem("zarevat_calculations_count", String(next));
        return next;
      });
      setIsCalculating(false);
    }, 600);
  };

  const handleChatConsult = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || isThinking) return;

    const userMsg = chatInput;
    setChatInput("");
    setChatMessages(prev => [...prev, { role: "user", content: userMsg }]);
    setIsThinking(true);

    setTimeout(() => {
      let ans = "";
      const text = userMsg.toLowerCase();
      if (text.includes("zara")) {
        ans = `Ah, Zara! Saudi Arabian shoppers in our ${city} cohort report that Zara's European patterns fit slightly narrow across the shoulders. For your ${height}cm, ${weight}kg frame, Zara tops in Size ${refSize === "S" ? "M" : refSize === "M" ? "L" : "XL"} provide a balanced, modern streetwear drape without tight sleeve tension. In contrast, Nike tops in Size ${refSize} offer equivalent volume.`;
      } else if (text.includes("gap") || text.includes("american")) {
        ans = `GAP runs a classic, loose casual fit. With reference to your anchor items, GAP Size ${refSize === "XL" ? "L" : refSize === "L" ? "M" : "S"} delivers standard breathing room. If you prefer a snug, styled fit, scaling down to Size S/XS is highly recommended by similar Emirati/Saudi cohorts checked who are ${height - 5}-${height + 5}cm tall.`;
      } else if (text.includes("uniqlo")) {
        ans = `Uniqlo uses tubular athletic comfort boxes. In jackets, sleeve lengths run true to standard guidelines. Most buyers keep their standard Size ${refSize}. Shoulders fit standard with moderate flexibility.`;
      } else if (text.includes("size") || text.includes("fit") || text.includes("keep") || text.includes("outcome")) {
        ans = `Comparing your physical silhouette against Similar Shopper cohorts: We've mapped several users matching your exact biometrics. Sizing up one scale block for high-street brands (Zara, H&M) and standing fast on comfort-designed brands (Nike, GAP) protects you from unnecessary exchanges!`;
      } else {
        ans = `Salaam! As a community fit specialist representing the Arabian Gulf (${city}, Riyadh, Dubai), I verified that shoppers with athletic or regular silhouettes sizing top layers are most concerned with shoulder tension. Tell me which catalog item you're looking at (Zara, Gap, or Nike) and I will query our regional consensus data!`;
      }

      setChatMessages(prev => [...prev, { role: "assistant", content: ans }]);
      setIsThinking(false);
    }, 700);
  };

  const handleBookmarkCurrent = () => {
    if (!prediction) return;
    const newBookmark = {
      id: "b_" + Date.now(),
      refBrand,
      refSize,
      targetBrand,
      predictedSize: prediction.predictedSize,
      confidenceScore: prediction.confidenceScore,
      timestamp: "Just saved"
    };
    setSavedForecasts(prev => [newBookmark, ...prev]);
    setBookmarkSuccess(true);
    setTimeout(() => setBookmarkSuccess(false), 2000);
  };

  const handleApparelClick = (apparel: any, resolvedSize: string) => {
    const commissionEst = (apparel.promoPrice || apparel.basePrice) * 0.04;
    
    // Increment telemetry clicks
    setNumClicks(prev => prev + 1);
    setTotalCommission(prev => prev + commissionEst);

    // Append to live administrative redirect list
    const redirectObj = {
      id: "r_" + Date.now(),
      brand: apparel.brand,
      title: apparel.title,
      resolvedSize,
      timestamp: "Just logged",
      value: commissionEst.toFixed(2)
    };
    setRecentRedirects(prev => [redirectObj, ...prev]);

    setTrackedRedirect({
      brand: apparel.brand,
      title: apparel.title,
      resolvedSize,
      commissionEst: commissionEst.toFixed(2),
      url: `https://www.retailer-redirect.com/partner/zarevat?brand=${apparel.brand.toLowerCase()}&size=${resolvedSize}`
    });

    setTimeout(() => {
      setTrackedRedirect(null);
    }, 6000);
  };

  const handleRemoveBookmark = (id: string) => {
    setSavedForecasts(prev => prev.filter(f => f.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#0a0c10] text-[#e2e8f0] selection:bg-indigo-505 selection:bg-indigo-600/35 selection:text-white font-sans flex flex-col justify-between">
      
      {/* BRAND HEADER BAR WITH 3-TAB LEVEL TOOGLE */}
      <header className="border-b border-slate-900 bg-[#0c0f16]/95 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2.5">
            <div className="bg-indigo-600 p-2.5 rounded-xl glow-indigo text-white flex items-center justify-center shrink-0">
              <Ruler className="h-5.5 w-5.5 text-white" />
            </div>
            <div className="text-left">
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-extrabold text-white tracking-tight">Zarevat</span>
                <span 
                  onClick={handleVersionClick}
                  className="text-[9px] bg-indigo-500/15 text-indigo-400 font-mono font-bold px-1.5 py-0.5 rounded-full uppercase border border-indigo-500/10 cursor-pointer hover:bg-indigo-500/30 transition select-none"
                  title="Founder build"
                >
                  MVP v2.0
                </span>
              </div>
              <p className="text-[10px] text-slate-400">Regional & Community Fit Intelligence</p>
            </div>
          </div>

          {/* Layer Domain Tab Toggles */}
          <nav className="flex bg-[#111622]/80 p-1 rounded-xl border border-slate-950 max-w-full overflow-x-auto shrink-0 gap-1 lg:max-w-2xl" md-id="nav-container">
            <button
              id="tab-landing-trigger"
              onClick={() => setActiveTab("landing")}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all shrink-0 cursor-pointer ${
                activeTab === "landing"
                  ? "bg-indigo-600 text-white shadow font-bold"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/50"
              }`}
            >
              <ShoppingBag className="h-3.5 w-3.5 text-indigo-400" />
              1. Brand Web <span className="hidden md:inline font-normal opacity-85">(Public Website)</span>
            </button>
            <button
              id="tab-app-trigger"
              onClick={() => setActiveTab("app")}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all shrink-0 relative cursor-pointer ${
                activeTab === "app"
                  ? "bg-indigo-600 text-white shadow font-bold"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/50"
              }`}
            >
              <Ruler className="h-3.5 w-3.5 text-emerald-400" />
              2. Sizing Portal <span className="hidden md:inline font-normal opacity-85">(Member App)</span>
              {isAuthenticated ? (
                <span className="absolute -top-0.5 -right-0.5 h-1.5 w-1.5 bg-emerald-400 rounded-full"></span>
              ) : (
                <span className="absolute -top-0.5 -right-0.5 h-1.5 w-1.5 bg-amber-400 rounded-full animate-pulse"></span>
              )}
            </button>
            {isAdminMode && (
              <button
                id="tab-admin-trigger"
                onClick={() => setActiveTab("admin")}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all shrink-0 cursor-pointer ${
                  activeTab === "admin"
                    ? "bg-indigo-600 text-white shadow font-bold"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/50"
                }`}
              >
                <BarChart3 className="h-3.5 w-3.5 text-amber-400" />
                3. Analytics Console <span className="hidden md:inline font-normal opacity-85">(Founder Hub)</span>
              </button>
            )}
          </nav>
        </div>
      </header>

      {/* PORTAL CONTAINER CORE LAYERS */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full" id="main-frame">
        {/* Layer 1: Public marketing website */}
        {activeTab === "landing" && (
          <PublicLanding
            gender={gender}
            setGender={setGender}
            refBrand={refBrand}
            setRefBrand={setRefBrand}
            refSize={refSize}
            setRefSize={setRefSize}
            targetBrand={targetBrand}
            setTargetBrand={setTargetBrand}
            category={category}
            setCategory={setCategory}
            isCalculating={isCalculating}
            handleCalculate={handleCalculate}
            prediction={prediction}
            waitlistEmail={waitlistEmail}
            setWaitlistEmail={setWaitlistEmail}
            waitlistSuccess={waitlistSuccess}
            setWaitlistSuccess={handleSetWaitlistSuccess}
            setActiveTab={setActiveTab}
            setIsAuthenticated={setIsAuthenticated}
            nationality={nationality}
            setNationality={setNationality}
            region={region}
            setRegion={setRegion}
            city={city}
            setCity={setCity}
          />
        )}

        {/* Layer 2: Authenticated customer sizing workspace */}
        {activeTab === "app" && (
          <CustomerPortal
            isAuthenticated={isAuthenticated}
            setIsAuthenticated={setIsAuthenticated}
            gender={gender}
            setGender={setGender}
            height={height}
            setHeight={setHeight}
            weight={weight}
            setWeight={setWeight}
            bodyShape={bodyShape}
            setBodyShape={setBodyShape}
            refBrand={refBrand}
            setRefBrand={setRefBrand}
            refSize={refSize}
            setRefSize={setRefSize}
            targetBrand={targetBrand}
            setTargetBrand={setTargetBrand}
            category={category}
            setCategory={setCategory}
            preferredFit={preferredFit}
            setPreferredFit={setPreferredFit}
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
            isCalculating={isCalculating}
            prediction={prediction}
            handleCalculate={handleCalculate}
            sandboxSubTab={sandboxSubTab}
            setSandboxSubTab={setSandboxSubTab}
            savedForecasts={savedForecasts}
            handleRemoveBookmark={handleRemoveBookmark}
            handleBookmarkCurrent={handleBookmarkCurrent}
            bookmarkSuccess={bookmarkSuccess}
            chatInput={chatInput}
            setChatInput={setChatInput}
            isThinking={isThinking}
            chatMessages={chatMessages}
            handleChatConsult={handleChatConsult}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            baseCatalog={baseCatalog}
            handleApparelClick={handleApparelClick}
            nationality={nationality}
            setNationality={setNationality}
            region={region}
            setRegion={setRegion}
            city={city}
            setCity={setCity}
          />
        )}

        {/* Layer 3: MVP Code validation dashboard tracking conversions and surveys */}
        {activeTab === "admin" && isAdminMode && (
          <AnalyticsHub
            calculationsCount={numPredictions}
            waitlistEmails={waitlistEmails}
            addWaitlistEmail={addWaitlistEmail}
            removeWaitlistEmail={removeWaitlistEmail}
            surveyVotes={surveyVotes}
            submitSurveyVote={submitSurveyVote}
            nationality={nationality}
            city={city}
          />
        )}
      </main>

      {/* SHARED FOOTER ARCHITECTURE PANEL */}
      <footer className="border-t border-slate-900 bg-[#080a0e] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© 2026 Zarevat. All rights reserved.</p>
          <div className="flex gap-4 items-center">
            <span className="hover:text-slate-300 cursor-pointer transition">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-slate-300 cursor-pointer transition">Terms & Conditions</span>
            <span>•</span>
            <span className="hover:text-slate-300 cursor-pointer transition">Support Helpdesk</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
