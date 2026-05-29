import React, { useState, useEffect } from "react";
import { 
  BarChart3, 
  Users, 
  CheckCircle2, 
  Mail, 
  TrendingUp, 
  Globe, 
  RefreshCw, 
  Database,
  Trash2,
  PlusCircle,
  Sparkles,
  Award
} from "lucide-react";

interface AnalyticsHubProps {
  calculationsCount: number;
  waitlistEmails: string[];
  addWaitlistEmail: (email: string) => void;
  removeWaitlistEmail: (idx: number) => void;
  surveyVotes: { [key: string]: number };
  submitSurveyVote: (brand: string) => void;
  nationality: string;
  city: string;
}

export default function AnalyticsHub({
  calculationsCount,
  waitlistEmails,
  addWaitlistEmail,
  removeWaitlistEmail,
  surveyVotes,
  submitSurveyVote,
  nationality,
  city
}: AnalyticsHubProps) {
  const [newEmail, setNewEmail] = useState("");
  const [sessionVisitors, setSessionVisitors] = useState(1);
  const [selectedVoteBrand, setSelectedVoteBrand] = useState("Zara");
  const [hasVoted, setHasVoted] = useState(false);

  // Initialize simulated session page-view statistics
  useEffect(() => {
    const visits = Number(localStorage.getItem("zarevat_visitor_count") || "1042");
    setSessionVisitors(visits);
    
    // Auto increment slightly for organic feel
    const randomTimer = setInterval(() => {
      setSessionVisitors(prev => {
        const next = prev + (Math.random() > 0.7 ? 1 : 0);
        localStorage.setItem("zarevat_visitor_count", String(next));
        return next;
      });
    }, 15000);

    return () => clearInterval(randomTimer);
  }, []);

  const handleManualEmailAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (newEmail.trim() && newEmail.includes("@")) {
      addWaitlistEmail(newEmail.trim());
      setNewEmail("");
    }
  };

  const handleVoteSubmit = () => {
    submitSurveyVote(selectedVoteBrand);
    setHasVoted(true);
  };

  // Funnel analytics metrics calculations
  const totalSubmissions = waitlistEmails.length;
  const staticWaitlistBaseline = 348; // Baseline mockup
  const finalWaitlistCount = staticWaitlistBaseline + totalSubmissions;
  
  const staticCalculationsBaseline = 859;
  const finalCalculationsCount = staticCalculationsBaseline + calculationsCount;

  const waitlistConversionRate = ((finalWaitlistCount / sessionVisitors) * 100).toFixed(1);
  const calculationRate = ((finalCalculationsCount / sessionVisitors) * 100).toFixed(1);

  // Sorting voting data
  const maxVoteVal = Math.max(...Object.values(surveyVotes), 1);

  return (
    <div className="space-y-10 py-2 text-slate-205 text-left" id="analytics-hub-root">
      
      {/* Header and explanation of MVP validation concept */}
      <div className="border-b border-slate-900 pb-5 space-y-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-bold text-indigo-400 font-mono tracking-widest uppercase block">Founder Command Center</span>
            <h1 className="text-3xl font-black text-white tracking-tight">MVP Validation Dashboard</h1>
          </div>
          <p className="text-[10px] sm:text-xs font-mono text-slate-400 bg-slate-950 border border-slate-902 px-3 py-1.5 rounded-xl block max-w-sm shrink-0">
             🔥 Front-End Sandbox Mode. Local telemetry tracks visitor actions in real time without external database latency.
          </p>
        </div>
        <p className="text-slate-400 text-xs sm:text-sm">
          Measure authentic product-market fit metrics. This panel monitors conversion funnels, gathers cohort survey responses, and organizes local waitlist pipelines instantly to validate demand.
        </p>
      </div>

      {/* ================= TELEMETRY MATRIX GRID ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" id="telemetry-grid">
        
        {/* Visitors */}
        <div className="bg-[#0e111a] border border-slate-900 p-5 rounded-2xl flex flex-col justify-between space-y-4">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold block font-mono">1. Unique Visitors</span>
              <span className="text-3xl font-black text-white font-mono">{sessionVisitors}</span>
            </div>
            <span className="bg-indigo-500/10 text-indigo-400 p-2.5 rounded-xl border border-indigo-500/15">
              <Users className="h-5 w-5" />
            </span>
          </div>
          <div className="text-[10px] text-slate-500 font-mono flex items-center gap-1">
            <span className="h-1.5 w-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
            Simulated organic traffic rate scaling
          </div>
        </div>

        {/* Calculations run */}
        <div className="bg-[#0e111a] border border-slate-900 p-5 rounded-2xl flex flex-col justify-between space-y-4">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold block font-mono">2. Match Calculations</span>
              <span className="text-3xl font-black text-white font-mono">{finalCalculationsCount}</span>
            </div>
            <span className="bg-emerald-500/10 text-emerald-400 p-2.5 rounded-xl border border-emerald-500/15">
              <TrendingUp className="h-5 w-5" />
            </span>
          </div>
          <div className="text-[10px] text-slate-500 font-mono">
             Run conversion rate: <strong className="text-emerald-400">{calculationRate}%</strong>
          </div>
        </div>

        {/* Waitlist submits */}
        <div className="bg-[#0e111a] border border-slate-900 p-5 rounded-2xl flex flex-col justify-between space-y-4">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold block font-mono">3. Waitlist Signups</span>
              <span className="text-3xl font-black text-white font-mono">{finalWaitlistCount}</span>
            </div>
            <span className="bg-purple-500/10 text-purple-400 p-2.5 rounded-xl border border-purple-500/15">
              <Mail className="h-5 w-5" />
            </span>
          </div>
          <div className="text-[10px] text-slate-500 font-mono">
            Conversion signup CTR: <strong className="text-purple-400">{waitlistConversionRate}%</strong>
          </div>
        </div>

        {/* Survey responses counts */}
        <div className="bg-[#0e111a] border border-slate-900 p-5 rounded-2xl flex flex-col justify-between space-y-4">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold block font-mono">4. Cohort Survey Responses</span>
              <span className="text-3xl font-black text-white font-mono">
                {Object.values(surveyVotes).reduce((a, b) => a + b, 0)}
              </span>
            </div>
            <span className="bg-amber-500/10 text-amber-400 p-2.5 rounded-xl border border-amber-500/15">
              <BarChart3 className="h-5 w-5" />
            </span>
          </div>
          <div className="text-[10px] text-slate-500 font-mono">
            Target feature mapping priority set
          </div>
        </div>

      </div>

      {/* ================= SPLIT SECTION: WAITLIST VS SURVEYS ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT: Waitlist Manager (Col 7) */}
        <div className="lg:col-span-7 bg-[#0b0c14] border border-slate-900 rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-950 pb-3">
            <div className="flex items-center gap-2">
              <Database className="h-5 w-5 text-indigo-400" />
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">Waitlist Database Hub</h3>
                <p className="text-[10px] text-slate-400">Offline pipeline saved in cache</p>
              </div>
            </div>
            <span className="text-[10px] font-mono text-indigo-400 bg-indigo-500/10 border border-indigo-500/15 px-2 py-0.5 rounded-full font-bold">
              {waitlistEmails.length} Registered in Session
            </span>
          </div>

          {/* Registration manual injector */}
          <form onSubmit={handleManualEmailAdd} className="flex gap-2">
            <input
              type="email"
              required
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              placeholder="Inject simulated buyer email into pipeline..."
              className="flex-1 bg-slate-950 border border-slate-900 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 font-mono"
            />
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-550 text-white font-bold text-xs px-4 rounded-xl transition flex items-center gap-1.5 cursor-pointer shrink-0"
            >
              <PlusCircle className="h-4 w-4" />
              Add User
            </button>
          </form>

          {/* List display */}
          <div className="max-h-[300px] overflow-y-auto space-y-2 pr-1 text-left select-none font-mono text-xs">
            {waitlistEmails.length === 0 ? (
              <div className="text-center py-10 text-slate-500 bg-slate-950 rounded-xl border border-slate-920 space-y-1">
                <p>Waitlist pipeline empty in this session.</p>
                <p className="text-[10px]">Add emails above or complete the waitlist form on Landing page!</p>
              </div>
            ) : (
              <div className="space-y-2">
                {waitlistEmails.map((email, idx) => {
                  // Reconstruct realistic metadata
                  const mockIndex = idx % 3;
                  const mockCity = mockIndex === 0 ? "Dammam" : mockIndex === 1 ? "Riyadh" : "Dubai";
                  const mockCohort = mockIndex === 0 ? "Saudi Arabian • Male" : mockIndex === 1 ? "Saudi Arabian • Male" : "Emirati • Female";
                  return (
                    <div 
                      key={idx}
                      className="bg-slate-950 p-3 rounded-xl border border-slate-900/80 flex items-center justify-between gap-4 group"
                    >
                      <div className="space-y-0.5">
                        <p className="font-bold text-white">{email}</p>
                        <div className="flex gap-2 text-[10px] text-slate-500 flex-wrap">
                          <span>📍 Cohort: {mockCity}</span>
                          <span>•</span>
                          <span>Profile: {mockCohort}</span>
                        </div>
                      </div>
                      
                      <button
                        type="button"
                        onClick={() => removeWaitlistEmail(idx)}
                        className="text-slate-500 hover:text-rose-400 p-1.5 rounded-lg hover:bg-rose-500/5 transition cursor-pointer"
                        title="Remove user entry"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Quick simulation seed warning text */}
          <p className="text-[10px] text-slate-550 text-slate-500 italic">
            * This list behaves dynamically and maintains itself locally in your browser's Cache pool.
          </p>

        </div>

        {/* RIGHT: MVP Community Surveys (Col 5) */}
        <div className="lg:col-span-5 bg-[#0b0c14] border border-slate-900 rounded-2xl p-6 space-y-6">
          <div className="border-b border-slate-950 pb-3 flex items-center gap-2">
            <Award className="h-5 w-5 text-indigo-400 animate-pulse" />
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">Next Brand Survey mapping</h3>
              <p className="text-[10px] text-slate-400 font-mono">Regional Shopper Priority Pool</p>
            </div>
          </div>

          {/* Mini Interactive Survey Vote Block */}
          <div className="bg-slate-950 p-4 border border-slate-900 rounded-2xl text-left space-y-3.5">
            <span className="text-[10px] font-bold text-indigo-400 font-mono uppercase tracking-wider block">
              💡 Cast Your Voter Priority
            </span>
            <p className="text-xs text-slate-300">
              Which high-street or local brand has the most severe sizing inconsistency and needs to be cohort-mapped next?
            </p>

            {hasVoted ? (
              <div className="bg-emerald-500/5 border border-emerald-500/10 p-3 rounded-xl flex items-center gap-2 text-emerald-400 font-mono text-xs">
                <CheckCircle2 className="h-4 w-4" />
                Vote registered! Survey metrics updated below.
              </div>
            ) : (
              <div className="flex gap-2">
                <select
                  value={selectedVoteBrand}
                  onChange={(e) => setSelectedVoteBrand(e.target.value)}
                  className="flex-1 bg-[#101420] border border-slate-900 text-white rounded-xl p-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-505 focus:ring-indigo-500 font-medium cursor-pointer"
                >
                  <option value="Mango">Mango Sizing Pool</option>
                  <option value="Pull & Bear">Pull & Bear Sizing Pool</option>
                  <option value="H&M Premium">H&M Premium Sizing Pool</option>
                  <option value="Massimo Dutti">Massimo Dutti Sizing Pool</option>
                  <option value="Adidas Athletics">Adidas Athletics Sizing Pool</option>
                  <option value="Nike Tech Pro">Nike Tech Pro Sizing Pool</option>
                </select>
                <button
                  type="button"
                  onClick={handleVoteSubmit}
                  className="bg-indigo-600 hover:bg-indigo-550 text-white px-4 text-xs font-bold rounded-xl transition cursor-pointer"
                >
                  Vote
                </button>
              </div>
            )}
          </div>

          {/* Voting Chart Bars */}
          <div className="space-y-3 font-mono text-xs">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
              Priority Survey Backlog Matrix
            </span>

            <div className="space-y-2.5">
              {Object.entries(surveyVotes).map(([brand, votes]) => {
                const percentage = Math.round((votes / maxVoteVal) * 100);
                return (
                  <div key={brand} className="space-y-1">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-slate-350">{brand}</span>
                      <span className="text-indigo-400 font-bold">{votes} votes</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-indigo-550 to-indigo-500 rounded-full transition-all duration-700" 
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>

      {/* ================= GEOGRAPHIC VALIDATION BREAKDOWN CHART ================= */}
      <div className="bg-[#0e111a] border border-slate-900 rounded-2xl p-6 text-left space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-950 pb-3 gap-2">
          <div className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-indigo-400" />
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">Validation Channel Map</h3>
              <p className="text-[10px] text-slate-400">Regional interest weights</p>
            </div>
          </div>
          <span className="text-[9px] uppercase tracking-wider bg-indigo-500/10 border border-indigo-500/15 text-indigo-400 font-mono font-bold px-2.5 py-0.5 rounded-full">
            Active Hubs: 5
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 pt-1">
          {[
            { city: "Dammam, SA", weight: "38%", color: "emerald", label: "Primary Pilot Hub" },
            { city: "Riyadh, SA", weight: "27%", color: "indigo", label: "Expansion Hub" },
            { city: "Dubai, UAE", weight: "18%", color: "sky", label: "Expansion Hub" },
            { city: "Jeddah, SA", weight: "11%", color: "purple", label: "Testing Hub" },
            { city: "Doha, Qatar", weight: "6%", color: "amber", label: "Observation Hub" }
          ].map((item, idx) => (
            <div key={idx} className="bg-slate-950/60 border border-slate-902 p-3 rounded-xl space-y-1">
              <span className="text-xs font-bold text-white font-mono block">{item.city}</span>
              <span className="text-[9.5px] text-slate-500 block leading-tight font-mono">{item.label}</span>
              <div className="flex items-baseline gap-2 pt-1 font-mono">
                <span className="text-lg font-black text-indigo-300">{item.weight}</span>
                <span className="text-[9px] text-slate-400 uppercase tracking-wider">Interest</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
    </div>
  );
}
