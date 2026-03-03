"use client";
import { useState } from "react";
import { formatCurrency } from "@/lib/utils";
import AdUnit from "@/components/AdUnit";
import {
    Heart, Shield, Car, Home, FileText, Star, CheckCircle,
    ExternalLink, ChevronDown, ChevronUp, Info, AlertCircle,
    Phone, Globe, ArrowRight
} from "lucide-react";

// ─── Real Insurance Providers ─────────────────────────────────────────────
const insuranceData = {
    term: [
        {
            name: "LIC Tech Term",
            logo: "🏛️",
            company: "Life Insurance Corporation of India",
            website: "https://licindia.in",
            premium: "₹12/day",
            monthlyPremium: 360,
            coverage: "₹1 Crore",
            coverageAmount: 10000000,
            term: "30 years",
            claimRatio: "98.86%",
            solvency: "AAA",
            keyFeatures: ["Whole life option", "Joint life cover", "Premium waiver", "No medical up to 45"],
            pros: ["Best claim settlement ratio", "Government-backed", "Wide network"],
            cons: ["Website navigation complex", "Slower online process"],
            minAge: 18,
            maxAge: 65,
            phone: "1800-33-4433",
            badge: "Most Trusted",
            badgeColor: "bg-blue-100 text-blue-700",
            highlight: false,
        },
        {
            name: "HDFC Click 2 Protect",
            logo: "🏦",
            company: "HDFC Life Insurance",
            website: "https://www.hdfclife.com",
            premium: "₹15/day",
            monthlyPremium: 450,
            coverage: "₹1 Crore",
            coverageAmount: 10000000,
            term: "30 years",
            claimRatio: "99.36%",
            solvency: "AAA",
            keyFeatures: ["Return of premium option", "Critical illness cover", "Accidental death benefit", "Online discount 25%"],
            pros: ["Highest claim ratio", "Instant online issuance", "Flexible payout options"],
            cons: ["Premium slightly higher", "Underwriting can be strict"],
            minAge: 18,
            maxAge: 65,
            phone: "1800-266-9777",
            badge: "Editor's Choice",
            badgeColor: "bg-gold-100 text-gold-700",
            highlight: true,
        },
        {
            name: "Max Smart Secure",
            logo: "🛡️",
            company: "Max Life Insurance",
            website: "https://www.maxlifeinsurance.com",
            premium: "₹13/day",
            monthlyPremium: 390,
            coverage: "₹1 Crore",
            coverageAmount: 10000000,
            term: "30 years",
            claimRatio: "99.51%",
            solvency: "AA+",
            keyFeatures: ["Premium back option", "Increasing cover", "Disability benefit", "Spouse cover"],
            pros: ["Highest 24h claim settlement", "Flexible premium payment", "Partner agent network"],
            cons: ["Limited digital features", "Higher premiums for smokers"],
            minAge: 18,
            maxAge: 60,
            phone: "1860-120-5577",
            badge: "Best Claim Ratio",
            badgeColor: "bg-emerald-100 text-emerald-700",
            highlight: false,
        },
        {
            name: "ICICI Pru iProtect Smart",
            logo: "💎",
            company: "ICICI Prudential Life Insurance",
            website: "https://www.iciciprulife.com",
            premium: "₹14/day",
            monthlyPremium: 420,
            coverage: "₹1 Crore",
            coverageAmount: 10000000,
            term: "30 years",
            claimRatio: "97.82%",
            solvency: "AAA",
            keyFeatures: ["Terminal illness benefit", "Job loss waiver", "CI rider available", "Multiple payout modes"],
            pros: ["Strong digital platform", "Job loss premium waiver", "4 payout options"],
            cons: ["Claim ratio slightly lower", "CI rider expensive"],
            minAge: 18,
            maxAge: 65,
            phone: "1860-266-7766",
            badge: "Best Features",
            badgeColor: "bg-purple-100 text-purple-700",
            highlight: false,
        },
        {
            name: "Tata AIA Sampoorna Raksha",
            logo: "🌟",
            company: "Tata AIA Life Insurance",
            website: "https://www.tataaia.com",
            premium: "₹11/day",
            monthlyPremium: 330,
            coverage: "₹1 Crore",
            coverageAmount: 10000000,
            term: "30 years",
            claimRatio: "99.01%",
            solvency: "AA+",
            keyFeatures: ["Lowest premiums", "Waiver on disability", "Customizable riders", "NRI friendly"],
            pros: ["Most affordable premiums", "Strong NRI coverage", "Good digital experience"],
            cons: ["Tata brand trust building", "Limited offline presence"],
            minAge: 18,
            maxAge: 60,
            phone: "1860-266-9966",
            badge: "Best Value",
            badgeColor: "bg-teal-100 text-teal-700",
            highlight: false,
        },
        {
            name: "SBI Life eShield Next",
            logo: "🏛🔴",
            company: "SBI Life Insurance",
            website: "https://www.sbilife.co.in",
            premium: "₹12/day",
            monthlyPremium: 360,
            coverage: "₹1 Crore",
            coverageAmount: 10000000,
            term: "30 years",
            claimRatio: "97.05%",
            solvency: "AAA",
            keyFeatures: ["SBI bank tie-up benefits", "Increasing SA option", "Level or increasing cover", "Home loan protection plan"],
            pros: ["SBI banking integration", "High solvency ratio", "Wide reach tier 2-3 cities"],
            cons: ["Slower online process", "Less innovative features"],
            minAge: 18,
            maxAge: 65,
            phone: "1800-267-9090",
            badge: "Bank Backed",
            badgeColor: "bg-red-100 text-red-700",
            highlight: false,
        },
    ],
    health: [
        {
            name: "Star Health Comprehensive",
            logo: "⭐",
            company: "Star Health Insurance",
            website: "https://www.starhealth.in",
            premium: "₹12,000/yr",
            monthlyPremium: 1000,
            coverage: "₹10 Lakh",
            coverageAmount: 1000000,
            term: "Annual",
            claimRatio: "82.3%",
            solvency: "AAA",
            keyFeatures: ["6,000+ network hospitals", "No claim bonus 100%", "Day care procedures", "OPD cover"],
            pros: ["Largest health insurer", "Quick cashless claims", "Best OPD cover"],
            cons: ["Premium increases with age", "Co-pay for senior citizens"],
            minAge: 18,
            maxAge: 65,
            phone: "1800-425-2255",
            badge: "Largest Network",
            badgeColor: "bg-blue-100 text-blue-700",
            highlight: true,
        },
        {
            name: "Niva Bupa ReAssure 2.0",
            logo: "🔵",
            company: "Niva Bupa Health Insurance",
            website: "https://www.nivabupa.com",
            premium: "₹10,500/yr",
            monthlyPremium: 875,
            coverage: "₹10 Lakh",
            coverageAmount: 1000000,
            term: "Annual",
            claimRatio: "91.4%",
            solvency: "AA+",
            keyFeatures: ["100% claim settlement", "Unlimited restoration", "No room rent limit", "Second opinion benefit"],
            pros: ["Highest claim ratio", "Restore unlimited benefit", "No sub-limits on room rent"],
            cons: ["Premium higher than peers", "Network still expanding"],
            minAge: 18,
            maxAge: 65,
            phone: "1800-103-2529",
            badge: "Best Claim",
            badgeColor: "bg-emerald-100 text-emerald-700",
            highlight: false,
        },
        {
            name: "Care Health Supreme",
            logo: "🩺",
            company: "Care Health Insurance",
            website: "https://www.careinsurance.com",
            premium: "₹9,800/yr",
            monthlyPremium: 817,
            coverage: "₹10 Lakh",
            coverageAmount: 1000000,
            term: "Annual",
            claimRatio: "89.1%",
            solvency: "AA+",
            keyFeatures: ["19,000+ network hospitals", "Unlimited restore", "Annual health check", "Wellness rewards"],
            pros: ["Largest hospital network", "Strong digital app", "Good wellness program"],
            cons: ["Complex policy wording", "Some sub-limits apply"],
            minAge: 18,
            maxAge: 65,
            phone: "1800-102-4488",
            badge: "Best Network",
            badgeColor: "bg-teal-100 text-teal-700",
            highlight: false,
        },
        {
            name: "HDFC ERGO Optima Secure",
            logo: "🏦💊",
            company: "HDFC ERGO General Insurance",
            website: "https://www.hdfcergo.com",
            premium: "₹11,200/yr",
            monthlyPremium: 933,
            coverage: "₹10 Lakh",
            coverageAmount: 1000000,
            term: "Annual",
            claimRatio: "90.8%",
            solvency: "AAA",
            keyFeatures: ["Secure benefit 2x cover", "Plus plan upgrade", "Mental illness cover", "Maternity benefit"],
            pros: ["Unique 2x cover feature", "Mental health coverage", "HDFC brand trust"],
            cons: ["Higher premium", "Limited network in tier 3"],
            minAge: 18,
            maxAge: 65,
            phone: "1800-266-0700",
            badge: "2x Cover",
            badgeColor: "bg-indigo-100 text-indigo-700",
            highlight: false,
        },
    ],
    auto: [
        {
            name: "ICICI Lombard Complete",
            logo: "🚗",
            company: "ICICI Lombard General Insurance",
            website: "https://www.icicilombard.com",
            premium: "₹3,500/yr",
            monthlyPremium: 292,
            coverage: "Own Damage + TP",
            coverageAmount: 500000,
            term: "Annual",
            claimRatio: "88.7%",
            solvency: "AAA",
            keyFeatures: ["Cashless at 7000+ garages", "Zero depreciation add-on", "Engine protection", "NCB protection"],
            pros: ["Best garage network", "Instant policy", "AI-based claims"],
            cons: ["Premium slightly high", "Add-on costs extra"],
            minAge: 18,
            maxAge: 70,
            phone: "1800-209-0001",
            badge: "Best Overall",
            badgeColor: "bg-blue-100 text-blue-700",
            highlight: true,
        },
        {
            name: "Bajaj Allianz Comprehensive",
            logo: "⚡🚗",
            company: "Bajaj Allianz General Insurance",
            website: "https://www.bajajallianz.com",
            premium: "₹3,200/yr",
            monthlyPremium: 267,
            coverage: "Own Damage + TP",
            coverageAmount: 500000,
            term: "Annual",
            claimRatio: "91.23%",
            solvency: "AA+",
            keyFeatures: ["Motor On-the-Spot app", "Pick-up & drop service", "24x7 roadside assistance", "Key protect cover"],
            pros: ["Highest claim ratio", "Roadside assistance included", "Great mobile app"],
            cons: ["Fewer garages in rural areas", "Claims can be slow"],
            minAge: 18,
            maxAge: 70,
            phone: "1800-209-5858",
            badge: "Best Claims",
            badgeColor: "bg-emerald-100 text-emerald-700",
            highlight: false,
        },
    ],
};

const insuranceTypes = [
    { id: "term", emoji: "❤️", label: "Term Life", icon: Heart, desc: "Pure life coverage at lowest premiums" },
    { id: "health", emoji: "🏥", label: "Health", icon: Shield, desc: "Medical expenses & hospitalization" },
    { id: "auto", emoji: "🚗", label: "Auto", icon: Car, desc: "Vehicle damage & third party liability" },
];

// ─── Provider Card ─────────────────────────────────────────────────────────
function ProviderCard({ provider, type }: { provider: typeof insuranceData.term[0]; type: string }) {
    const [expanded, setExpanded] = useState(false);

    return (
        <div className={`bg-white rounded-2xl border-2 shadow-sm transition-all duration-300 overflow-hidden card-hover relative ${provider.highlight ? "border-yellow-400" : "border-gray-100"}`}>
            {/* Highlight badge */}
            {provider.highlight && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-0 bg-yellow-400 text-navy-900 text-xs font-bold px-6 py-1 rounded-b-xl">
                    ⭐ {provider.badge}
                </div>
            )}

            <div className={`p-5 ${provider.highlight ? "pt-8" : ""}`}>
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                        <div className="text-3xl">{provider.logo}</div>
                        <div>
                            <h3 className="font-bold text-navy-900 text-sm leading-tight">{provider.name}</h3>
                            <p className="text-gray-400 text-xs">{provider.company}</p>
                        </div>
                    </div>
                    {!provider.highlight && (
                        <span className={`text-xs font-bold px-2.5 py-1 rounded-full shrink-0 ${provider.badgeColor}`}>{provider.badge}</span>
                    )}
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-2 mb-4">
                    <div className="bg-gray-50 rounded-xl p-3 text-center">
                        <p className="text-xs text-gray-500 mb-0.5">Premium/Month</p>
                        <p className="font-extrabold text-gold-600 text-sm">{provider.premium}</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-3 text-center">
                        <p className="text-xs text-gray-500 mb-0.5">Coverage</p>
                        <p className="font-extrabold text-navy-900 text-sm">{provider.coverage}</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-3 text-center">
                        <p className="text-xs text-gray-500 mb-0.5">Claim Ratio</p>
                        <p className={`font-extrabold text-sm ${parseFloat(provider.claimRatio) >= 98 ? "text-emerald-600" : parseFloat(provider.claimRatio) >= 90 ? "text-blue-600" : "text-orange-500"}`}>{provider.claimRatio}</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-3 text-center">
                        <p className="text-xs text-gray-500 mb-0.5">Solvency</p>
                        <p className="font-extrabold text-navy-900 text-sm">{provider.solvency}</p>
                    </div>
                </div>

                {/* Key Features */}
                <div className="mb-4">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Key Features</p>
                    <div className="flex flex-wrap gap-1.5">
                        {provider.keyFeatures.slice(0, 3).map((f) => (
                            <span key={f} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full">{f}</span>
                        ))}
                    </div>
                </div>

                {/* Expandable Section */}
                <button
                    onClick={() => setExpanded(!expanded)}
                    className="w-full text-xs text-gray-500 hover:text-navy-900 flex items-center justify-center gap-1 transition-colors mb-4"
                >
                    {expanded ? "Hide details" : "Show pros & cons"} {expanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                </button>

                {expanded && (
                    <div className="grid grid-cols-2 gap-3 mb-4 animate-fade-in">
                        <div>
                            <p className="text-xs font-semibold text-emerald-700 mb-1.5 flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Pros</p>
                            {provider.pros.map((p) => <p key={p} className="text-xs text-gray-600 mb-1">• {p}</p>)}
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-red-600 mb-1.5 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> Cons</p>
                            {provider.cons.map((c) => <p key={c} className="text-xs text-gray-600 mb-1">• {c}</p>)}
                        </div>
                    </div>
                )}

                {/* Actions */}
                <div className="flex gap-2">
                    <a
                        href={provider.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold transition-all hover:scale-[1.02]"
                        style={{ background: "#0A1628", color: "white" }}
                    >
                        Get Quote <ExternalLink className="w-3 h-3" />
                    </a>
                    <a
                        href={`tel:${provider.phone}`}
                        className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-medium border border-gray-200 text-gray-600 hover:bg-gray-50 transition-all"
                    >
                        <Phone className="w-3 h-3" /> Call
                    </a>
                    <a
                        href={provider.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-medium border border-gray-200 text-gray-600 hover:bg-gray-50 transition-all"
                    >
                        <Globe className="w-3 h-3" />
                    </a>
                </div>
            </div>
        </div>
    );
}

// ─── Premium Estimator ──────────────────────────────────────────────────────
function PremiumEstimator({ type }: { type: string }) {
    const [age, setAge] = useState(30);
    const [coverage, setCoverage] = useState(10000000);
    const [tenure, setTenure] = useState(30);
    const [gender, setGender] = useState<"male" | "female">("male");
    const [smoker, setSmoker] = useState(false);
    const [disease, setDisease] = useState(false);
    const [income, setIncome] = useState(600000);
    const [members, setMembers] = useState(1);

    // Term life premium estimator
    const estimatePremium = () => {
        if (type === "term") {
            const base = (coverage / 10000000) * 400; // Rs 400/mo base per crore
            const ageMul = age < 25 ? 0.7 : age < 30 ? 0.85 : age < 35 ? 1 : age < 40 ? 1.3 : age < 45 ? 1.8 : age < 50 ? 2.6 : 4;
            const genderMul = gender === "female" ? 0.85 : 1;
            const smokerMul = smoker ? 2.8 : 1;
            const diseaseMul = disease ? 1.5 : 1;
            const tenureMul = tenure <= 15 ? 0.85 : tenure <= 25 ? 1 : 1.1;
            return Math.round(base * ageMul * genderMul * smokerMul * diseaseMul * tenureMul);
        } else if (type === "health") {
            const base = 600; // Rs 600/mo for individual
            const ageMul = age < 30 ? 0.7 : age < 40 ? 1 : age < 50 ? 1.6 : 2.5;
            const coverMul = (coverage / 1000000); // 1x per lakh
            const membersMul = members === 1 ? 1 : members === 2 ? 1.7 : members <= 4 ? 2.2 : 2.8;
            const smokerMul = smoker ? 1.3 : 1;
            const diseaseMul = disease ? 1.4 : 1;
            return Math.round(base * ageMul * coverMul * membersMul * smokerMul * diseaseMul);
        } else {
            return 3500; // flat auto premium
        }
    };

    const monthly = estimatePremium();
    const annual = monthly * 12;
    const coverPerRupee = coverage / annual;

    const coverageOptions = type === "term"
        ? [2500000, 5000000, 10000000, 20000000, 50000000]
        : [500000, 1000000, 2000000, 5000000];

    return (
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <h3 className="font-bold text-navy-900 mb-5 text-base flex items-center gap-2">
                🧮 Premium Calculator
                <span className="text-xs text-gray-400 font-normal">(Indicative)</span>
            </h3>

            <div className="space-y-4">
                {/* Gender */}
                {type === "term" && (
                    <div>
                        <label className="text-xs font-semibold text-gray-600 mb-2 block">Gender</label>
                        <div className="grid grid-cols-2 gap-2">
                            {(["male", "female"] as const).map((g) => (
                                <button key={g} onClick={() => setGender(g)}
                                    className={`py-2 text-xs rounded-xl capitalize font-semibold transition-all ${gender === g ? "text-white" : "bg-gray-100 text-gray-600"}`}
                                    style={gender === g ? { background: "#0A1628" } : {}}>
                                    {g === "male" ? "👨 Male" : "👩 Female"}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Age */}
                <div>
                    <label className="text-xs font-semibold text-gray-600 mb-1 block">Age: <span style={{ color: "#F59E0B" }}>{age} years</span></label>
                    <input type="range" min={18} max={65} value={age} onChange={(e) => setAge(Number(e.target.value))}
                        className="w-full cursor-pointer" style={{ accentColor: "#F59E0B" }} />
                    <div className="flex justify-between text-xs text-gray-400 mt-1"><span>18</span><span>65</span></div>
                </div>

                {/* Coverage */}
                <div>
                    <label className="text-xs font-semibold text-gray-600 mb-2 block">
                        Coverage: <span style={{ color: "#F59E0B" }}>{formatCurrency(coverage, "INR").replace(".00", "")}</span>
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                        {coverageOptions.map((c) => (
                            <button key={c} onClick={() => setCoverage(c)}
                                className={`text-xs px-3 py-1.5 rounded-full border font-medium transition-all ${coverage === c ? "text-white border-transparent" : "border-gray-200 text-gray-600 hover:border-gray-400"}`}
                                style={coverage === c ? { background: "#0A1628" } : {}}>
                                {c >= 10000000 ? `₹${c / 10000000}Cr` : `₹${c / 100000}L`}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Tenure (Term only) */}
                {type === "term" && (
                    <div>
                        <label className="text-xs font-semibold text-gray-600 mb-1 block">Cover Duration: <span style={{ color: "#F59E0B" }}>{tenure} years</span></label>
                        <input type="range" min={10} max={40} step={5} value={tenure} onChange={(e) => setTenure(Number(e.target.value))}
                            className="w-full cursor-pointer" style={{ accentColor: "#F59E0B" }} />
                        <div className="flex justify-between text-xs text-gray-400 mt-1"><span>10yr</span><span>40yr</span></div>
                    </div>
                )}

                {/* Family members (Health only) */}
                {type === "health" && (
                    <div>
                        <label className="text-xs font-semibold text-gray-600 mb-2 block">Family Members: <span style={{ color: "#F59E0B" }}>{members}</span></label>
                        <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map((m) => (
                                <button key={m} onClick={() => setMembers(m)}
                                    className={`flex-1 py-2 text-xs rounded-xl font-semibold transition-all ${members === m ? "text-white" : "bg-gray-100 text-gray-600"}`}
                                    style={members === m ? { background: "#0A1628" } : {}}>
                                    {m}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Toggles */}
                <div className="space-y-3">
                    {[
                        { label: "Smoker / Tobacco user?", value: smoker, setter: setSmoker, warning: "Increases premium by ~2.8x" },
                        { label: "Pre-existing condition?", value: disease, setter: setDisease, warning: "Subject to waiting period" },
                    ].map(({ label, value, setter, warning }) => (
                        <div key={label}>
                            <div className="flex items-center justify-between">
                                <label className="text-xs font-medium text-gray-700">{label}</label>
                                <button onClick={() => setter(!value)}
                                    className="relative w-11 h-6 rounded-full transition-all duration-300"
                                    style={{ background: value ? "#ef4444" : "#d1d5db" }}>
                                    <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all duration-300 ${value ? "right-0.5" : "left-0.5"}`} />
                                </button>
                            </div>
                            {value && <p className="text-xs text-orange-500 mt-1 flex items-center gap-1"><Info className="w-3 h-3" /> {warning}</p>}
                        </div>
                    ))}
                </div>

                {/* Result */}
                <div className="rounded-xl p-5 text-center mt-2" style={{ background: "#0A1628" }}>
                    <p className="text-gray-400 text-xs mb-1">Estimated Monthly Premium</p>
                    <p className="text-3xl font-extrabold mb-1" style={{ color: "#F59E0B" }}>{formatCurrency(monthly, "INR")}</p>
                    <p className="text-gray-400 text-xs">{formatCurrency(annual, "INR")} per year</p>
                    {type === "term" && (
                        <div className="mt-3 bg-white/5 rounded-lg p-2">
                            <p className="text-gray-300 text-xs">Coverage per ₹1 paid: <span className="text-emerald-400 font-bold">₹{Math.round(coverPerRupee).toLocaleString("en-IN")}</span></p>
                        </div>
                    )}
                </div>

                <p className="text-xs text-gray-400 text-center">*Indicative estimate. Actual premium set by insurer based on medical history & underwriting.</p>
            </div>
        </div>
    );
}

// ─── Comparison Table ───────────────────────────────────────────────────────
function ComparisonTable({ providers }: { providers: typeof insuranceData.term }) {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mt-8">
            <div className="px-6 py-4 border-b border-gray-100" style={{ background: "#0A1628" }}>
                <h3 className="font-bold text-white flex items-center gap-2">📊 Side-by-Side Comparison</h3>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-xs">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 py-3 text-left font-semibold text-gray-600">Provider</th>
                            <th className="px-4 py-3 text-center font-semibold text-gray-600">Premium/mo</th>
                            <th className="px-4 py-3 text-center font-semibold text-gray-600">Claim Ratio</th>
                            <th className="px-4 py-3 text-center font-semibold text-gray-600">Solvency</th>
                            <th className="px-4 py-3 text-center font-semibold text-gray-600">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {providers.map((p, i) => (
                            <tr key={p.name} className={`border-t border-gray-100 hover:bg-gray-50 transition-colors ${p.highlight ? "bg-yellow-50/50" : ""}`}>
                                <td className="px-4 py-3">
                                    <div className="flex items-center gap-2">
                                        <span className="text-lg">{p.logo}</span>
                                        <div>
                                            <p className="font-semibold text-navy-900">{p.name}</p>
                                            {p.highlight && <span className="text-xs bg-yellow-100 text-yellow-700 px-1.5 rounded font-medium">Top Pick</span>}
                                        </div>
                                    </div>
                                </td>
                                <td className="px-4 py-3 text-center font-bold" style={{ color: "#d97706" }}>{p.premium}</td>
                                <td className="px-4 py-3 text-center">
                                    <span className={`font-bold ${parseFloat(p.claimRatio) >= 99 ? "text-emerald-600" : parseFloat(p.claimRatio) >= 95 ? "text-blue-600" : "text-orange-500"}`}>
                                        {p.claimRatio}
                                    </span>
                                </td>
                                <td className="px-4 py-3 text-center font-semibold text-navy-900">{p.solvency}</td>
                                <td className="px-4 py-3 text-center">
                                    <a href={p.website} target="_blank" rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1 px-3 py-1.5 text-white text-xs font-semibold rounded-lg hover:opacity-90 transition-all"
                                        style={{ background: "#0A1628" }}>
                                        Apply <ArrowRight className="w-3 h-3" />
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

// ─── Main Page ───────────────────────────────────────────────────────────────
export default function InsurancePage() {
    const [activeType, setActiveType] = useState("term");
    const providers = insuranceData[activeType as keyof typeof insuranceData] || [];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <section className="py-12" style={{ background: "#0A1628" }}>
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h1 className="text-4xl font-extrabold text-white mb-3">
                        🛡️ <span style={{ color: "#F59E0B" }}>Insurance</span> Comparison India
                    </h1>
                    <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                        Compare India's best insurance plans side-by-side. Get quotes, check claim ratios, and choose the right coverage.
                    </p>
                </div>
            </section>

            {/* Insurance Type Tabs */}
            <div className="border-b border-gray-200 bg-white sticky top-16 z-20 shadow-sm">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex overflow-x-auto">
                        {insuranceTypes.map((type) => (
                            <button key={type.id} onClick={() => setActiveType(type.id)}
                                className={`flex items-center gap-2 px-6 py-4 text-sm font-semibold border-b-2 whitespace-nowrap transition-all ${activeType === type.id ? "border-yellow-500 text-navy-900" : "border-transparent text-gray-500 hover:text-gray-800"}`}
                                style={activeType === type.id ? { borderBottomColor: "#F59E0B", color: "#0A1628" } : {}}>
                                <span className="text-lg">{type.emoji}</span>
                                <span>{type.label}</span>
                                {activeType === type.id && <span className="ml-1 bg-yellow-100 text-yellow-700 text-xs px-2 py-0.5 rounded-full">{providers.length} plans</span>}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <AdUnit format="leaderboard" className="mb-8 flex justify-center" />

                {/* Category Description */}
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-8 flex items-start gap-3">
                    <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                        <p className="text-sm font-semibold text-blue-800 mb-0.5">
                            {activeType === "term" && "Term Life Insurance – Best Choice for Pure Protection"}
                            {activeType === "health" && "Health Insurance – Protect Against Medical Expenses"}
                            {activeType === "auto" && "Auto Insurance – Mandatory Third-Party + Own Damage Cover"}
                        </p>
                        <p className="text-xs text-blue-700">
                            {activeType === "term" && "Claim ratios shown are as per IRDAI Annual Report 2023-24. Higher is better. All premiums are indicative for a ₹1 Crore cover, 30-year Male, non-smoker age 30."}
                            {activeType === "health" && "Claim ratios per IRDAI Annual Report 2023-24. Premiums shown for a 30-year non-smoker individual with ₹10L cover."}
                            {activeType === "auto" && "Premiums indicative for a 5-year-old sedan in metro city. Actual premium depends on vehicle value, city, and NCB."}
                        </p>
                    </div>
                </div>

                <div className="grid lg:grid-cols-4 gap-8">
                    {/* Provider Cards – 3 column */}
                    <div className="lg:col-span-3">
                        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
                            {providers.map((p) => (
                                <ProviderCard key={p.name} provider={p} type={activeType} />
                            ))}
                        </div>

                        <ComparisonTable providers={providers} />

                        {/* Article */}
                        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mt-8">
                            <h2 className="text-xl font-bold mb-4" style={{ color: "#0A1628" }}>
                                {activeType === "term" ? "Why You Need Term Insurance in Your 20s" :
                                    activeType === "health" ? "How to Choose the Right Health Insurance Plan" :
                                        "Complete Guide to Auto Insurance in India"}
                            </h2>
                            <div className="space-y-3 text-gray-600 text-sm leading-relaxed">
                                {activeType === "term" && <>
                                    <p><strong>The earlier, the cheaper:</strong> A 25-year-old pays nearly 60% less premium than a 40-year-old for the same ₹1 Crore cover. Lock in your premium now.</p>
                                    <p><strong>Rule of thumb:</strong> Buy cover of <em>10–12x your annual income</em>. If you earn ₹8L/year, aim for ₹80L–1 Crore cover.</p>
                                    <p><strong>Claim settlement ratio matters:</strong> Always pick a plan where the CSR is &gt;95%. HDFC Life (99.36%), Max Life (99.51%), and LIC (98.86%) are top choices.</p>
                                    <p><strong>Read the exclusions:</strong> Most policies exclude suicide in the first year, death due to aviation (non-commercial), and some high-risk activities.</p>
                                </>}
                                {activeType === "health" && <>
                                    <p><strong>Room rent limits are a hidden trap:</strong> Many policies cap room rent at 1% of sum insured per day. Always opt for "no room rent limit" policies like Niva Bupa ReAssure 2.0.</p>
                                    <p><strong>Network hospitals matter:</strong> In an emergency, cashless treatment is crucial. Star Health's 14,000+ network and Care Health's 19,000+ give you the best access.</p>
                                    <p><strong>No Claim Bonus (NCB):</strong> Some plans reward you with up to 100% additional cover for each no-claim year. Compare NCB terms carefully.</p>
                                </>}
                                {activeType === "auto" && <>
                                    <p><strong>Third-party insurance is mandatory</strong> under the Motor Vehicles Act. However, TP alone won't cover your car's damage in an accident.</p>
                                    <p><strong>Zero depreciation add-on</strong> is worth every rupee. Without it, insurers deduct 10–50% depreciation on replaced parts based on vehicle age.</p>
                                </>}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <PremiumEstimator type={activeType} />

                        {/* Quick Tips */}
                        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                            <h3 className="font-bold text-navy-900 mb-4 text-sm">💡 Buying Tips</h3>
                            <ul className="space-y-2.5">
                                {(activeType === "term" ? [
                                    "Never hide health conditions — it can void claims",
                                    "Choose term till age 70-75 for maximum protection",
                                    "Single payout vs monthly income — consider family needs",
                                    "Riders like CI and waiver add value cheaply",
                                ] : activeType === "health" ? [
                                    "Port your policy if your insurer raises premium unfairly",
                                    "Opt for 2-year policy for discounts",
                                    "Family floater is cheapest for young families",
                                    "Super top-up plan is the cheapest way to increase cover",
                                ] : [
                                    "Compare 3+ quotes before buying",
                                    "Set NCB at 50% — the max — for best renewal discounts",
                                    "Add-on riders cost 20-30% more but save 10x in claims",
                                    "Annual policy is cheaper than quarterly payment",
                                ]).map((tip) => (
                                    <li key={tip} className="flex gap-2 text-xs text-gray-600">
                                        <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />{tip}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <AdUnit format="sidebar" />
                    </div>
                </div>
            </div>
        </div>
    );
}
