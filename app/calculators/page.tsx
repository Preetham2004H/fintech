"use client";
import { useState } from "react";
import { Calculator, TrendingUp, DollarSign, PiggyBank, Clock, Bitcoin, BarChart3, Wallet } from "lucide-react";
import { formatCurrency, formatNumber, calculateEMI, calculateCompoundInterest, calculateSIP } from "@/lib/utils";
import AdUnit from "@/components/AdUnit";

// Chart imports
import { Chart as ChartJS, ArcElement, Tooltip as ChartTooltip, Legend, CategoryScale, LinearScale, BarElement, LineElement, PointElement } from "chart.js";
import { Pie, Bar } from "react-chartjs-2";

ChartJS.register(ArcElement, ChartTooltip, Legend, CategoryScale, LinearScale, BarElement, LineElement, PointElement);

type CalcTab = "emi" | "interest" | "sip" | "fd" | "retirement" | "crypto-roi" | "networth" | "budget";

const tabs = [
    { id: "emi" as CalcTab, label: "EMI / Loan", icon: DollarSign, emoji: "🏦" },
    { id: "interest" as CalcTab, label: "Interest", icon: TrendingUp, emoji: "📈" },
    { id: "sip" as CalcTab, label: "SIP", icon: PiggyBank, emoji: "💰" },
    { id: "fd" as CalcTab, label: "Fixed Deposit", icon: Clock, emoji: "🏛️" },
    { id: "retirement" as CalcTab, label: "Retirement", icon: BarChart3, emoji: "🌴" },
    { id: "crypto-roi" as CalcTab, label: "Crypto ROI", icon: Bitcoin, emoji: "₿" },
    { id: "networth" as CalcTab, label: "Net Worth", icon: Wallet, emoji: "💎" },
    { id: "budget" as CalcTab, label: "Budget", icon: Calculator, emoji: "📊" },
];

// ─── EMI Calculator ────────────────────────────────────────────────────────
function EMICalculator() {
    const [loan, setLoan] = useState(500000);
    const [rate, setRate] = useState(8.5);
    const [tenure, setTenure] = useState(60);

    const emi = calculateEMI(loan, rate, tenure);
    const totalPayment = emi * tenure;
    const totalInterest = totalPayment - loan;

    const chartData = {
        labels: ["Principal", "Interest"],
        datasets: [{ data: [loan, totalInterest], backgroundColor: ["#0A1628", "#F59E0B"], borderWidth: 0 }],
    };

    // Amortization schedule (first 12 months)
    const schedule: { month: number; emi: number; principal: number; interest: number; balance: number }[] = [];
    let balance = loan;
    const monthlyRate = rate / 12 / 100;
    for (let i = 1; i <= Math.min(tenure, 12); i++) {
        const intPart = balance * monthlyRate;
        const prinPart = emi - intPart;
        balance -= prinPart;
        schedule.push({ month: i, emi, principal: prinPart, interest: intPart, balance: Math.max(0, balance) });
    }

    return (
        <div className="space-y-6">
            <div className="grid md:grid-cols-3 gap-4">
                <InputGroup label="Loan Amount (₹)" value={loan} onChange={setLoan} min={10000} max={10000000} step={10000} prefix="₹" />
                <InputGroup label="Interest Rate (%)" value={rate} onChange={setRate} min={1} max={30} step={0.1} suffix="%" />
                <InputGroup label="Tenure (months)" value={tenure} onChange={setTenure} min={6} max={360} step={6} suffix="mo" />
            </div>
            <div className="grid md:grid-cols-3 gap-4">
                <ResultCard label="Monthly EMI" value={formatCurrency(emi, "INR")} highlight />
                <ResultCard label="Total Interest" value={formatCurrency(totalInterest, "INR")} />
                <ResultCard label="Total Payment" value={formatCurrency(totalPayment, "INR")} />
            </div>
            <div className="grid md:grid-cols-2 gap-8">
                <div className="flex items-center justify-center">
                    <div className="w-64 h-64">
                        <Pie data={chartData} options={{ plugins: { legend: { position: "bottom" } } }} />
                    </div>
                </div>
                <div>
                    <h4 className="font-bold text-navy-900 mb-3 text-sm uppercase tracking-wider">Amortization (First 12 Months)</h4>
                    <div className="overflow-auto rounded-xl border border-gray-200">
                        <table className="w-full text-xs">
                            <thead className="bg-navy-900 text-white">
                                <tr>
                                    <th className="px-3 py-2 text-left">Month</th>
                                    <th className="px-3 py-2 text-right">Principal</th>
                                    <th className="px-3 py-2 text-right">Interest</th>
                                    <th className="px-3 py-2 text-right">Balance</th>
                                </tr>
                            </thead>
                            <tbody>
                                {schedule.map((row) => (
                                    <tr key={row.month} className="border-t border-gray-100 hover:bg-gray-50">
                                        <td className="px-3 py-2">{row.month}</td>
                                        <td className="px-3 py-2 text-right text-emerald-600">₹{formatNumber(row.principal, 0)}</td>
                                        <td className="px-3 py-2 text-right text-red-500">₹{formatNumber(row.interest, 0)}</td>
                                        <td className="px-3 py-2 text-right font-medium">₹{formatNumber(row.balance, 0)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ─── Interest Calculator ────────────────────────────────────────────────────
function InterestCalculator() {
    const [principal, setPrincipal] = useState(100000);
    const [rate, setRate] = useState(10);
    const [time, setTime] = useState(5);
    const [frequency, setFrequency] = useState(12);
    const [type, setType] = useState<"simple" | "compound">("compound");

    const simpleInterest = (principal * rate * time) / 100;
    const simpleTotal = principal + simpleInterest;

    const compoundTotal = calculateCompoundInterest(principal, rate, time, frequency);
    const compoundInterest = compoundTotal - principal;

    const interest = type === "simple" ? simpleInterest : compoundInterest;
    const total = type === "simple" ? simpleTotal : compoundTotal;

    const years = Array.from({ length: time }, (_, i) => i + 1);
    const barData = {
        labels: years.map((y) => `Yr ${y}`),
        datasets: [
            { label: "Principal", data: years.map(() => principal), backgroundColor: "#0A1628" },
            { label: "Interest", data: years.map((y) => type === "simple" ? (principal * rate * y) / 100 : calculateCompoundInterest(principal, rate, y, frequency) - principal), backgroundColor: "#F59E0B" },
        ],
    };

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-2 gap-3">
                {(["simple", "compound"] as const).map((t) => (
                    <button key={t} onClick={() => setType(t)} className={`py-3 rounded-xl font-semibold text-sm capitalize transition-all ${type === t ? "bg-navy-900 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
                        {t} Interest
                    </button>
                ))}
            </div>
            <div className="grid md:grid-cols-2 gap-4">
                <InputGroup label="Principal Amount (₹)" value={principal} onChange={setPrincipal} min={1000} max={10000000} step={1000} prefix="₹" />
                <InputGroup label="Annual Rate (%)" value={rate} onChange={setRate} min={0.1} max={50} step={0.1} suffix="%" />
                <InputGroup label="Time (years)" value={time} onChange={setTime} min={1} max={30} step={1} suffix="yrs" />
                {type === "compound" && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Compounding Frequency</label>
                        <select className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-gold-500 focus:outline-none" value={frequency} onChange={(e) => setFrequency(Number(e.target.value))}>
                            <option value={1}>Annually</option>
                            <option value={4}>Quarterly</option>
                            <option value={12}>Monthly</option>
                            <option value={365}>Daily</option>
                        </select>
                    </div>
                )}
            </div>
            <div className="grid md:grid-cols-3 gap-4">
                <ResultCard label="Interest Earned" value={formatCurrency(interest, "INR")} />
                <ResultCard label="Final Amount" value={formatCurrency(total, "INR")} highlight />
                <ResultCard label="Growth" value={`${((interest / principal) * 100).toFixed(1)}%`} />
            </div>
            <div className="h-64">
                <Bar data={barData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { position: "bottom" } }, scales: { x: { stacked: true }, y: { stacked: true } } }} />
            </div>
        </div>
    );
}

// ─── SIP Calculator ─────────────────────────────────────────────────────────
function SIPCalculator() {
    const [monthly, setMonthly] = useState(5000);
    const [returnRate, setReturnRate] = useState(12);
    const [duration, setDuration] = useState(10);

    const invested = monthly * duration * 12;
    const futureValue = calculateSIP(monthly, returnRate, duration);
    const gains = futureValue - invested;

    const chartData = {
        labels: ["Invested", "Returns"],
        datasets: [{ data: [invested, gains], backgroundColor: ["#0A1628", "#F59E0B"], borderWidth: 0 }],
    };

    return (
        <div className="space-y-6">
            <div className="grid md:grid-cols-3 gap-4">
                <InputGroup label="Monthly Investment (₹)" value={monthly} onChange={setMonthly} min={500} max={500000} step={500} prefix="₹" />
                <InputGroup label="Expected Return (%)" value={returnRate} onChange={setReturnRate} min={1} max={30} step={0.5} suffix="%" />
                <InputGroup label="Duration (years)" value={duration} onChange={setDuration} min={1} max={40} step={1} suffix="yrs" />
            </div>
            <div className="grid md:grid-cols-3 gap-4">
                <ResultCard label="Total Invested" value={formatCurrency(invested, "INR")} />
                <ResultCard label="Estimated Returns" value={formatCurrency(gains, "INR")} />
                <ResultCard label="Future Value" value={formatCurrency(futureValue, "INR")} highlight />
            </div>
            <div className="flex items-center justify-center">
                <div className="w-64 h-64">
                    <Pie data={chartData} options={{ plugins: { legend: { position: "bottom" } } }} />
                </div>
            </div>
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-center">
                <p className="text-emerald-800 text-sm font-medium">
                    🎉 Your ₹{formatNumber(monthly, 0)}/month grows to <strong>{formatCurrency(futureValue, "INR")}</strong> in {duration} years — a gain of <strong>{((gains / invested) * 100).toFixed(0)}%!</strong>
                </p>
            </div>
        </div>
    );
}

// ─── FD Calculator ──────────────────────────────────────────────────────────
function FDCalculator() {
    const [principal, setPrincipal] = useState(100000);
    const [rate, setRate] = useState(7);
    const [tenure, setTenure] = useState(3);
    const [frequency, setFrequency] = useState(4);

    const maturity = calculateCompoundInterest(principal, rate, tenure, frequency);
    const interest = maturity - principal;

    return (
        <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
                <InputGroup label="Principal Amount (₹)" value={principal} onChange={setPrincipal} min={1000} max={10000000} step={1000} prefix="₹" />
                <InputGroup label="Interest Rate (%)" value={rate} onChange={setRate} min={1} max={20} step={0.1} suffix="%" />
                <InputGroup label="Tenure (years)" value={tenure} onChange={setTenure} min={1} max={10} step={1} suffix="yrs" />
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Compounding</label>
                    <select className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-gold-500 focus:outline-none" value={frequency} onChange={(e) => setFrequency(Number(e.target.value))}>
                        <option value={12}>Monthly</option>
                        <option value={4}>Quarterly</option>
                        <option value={2}>Semi-annually</option>
                        <option value={1}>Annually</option>
                    </select>
                </div>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
                <ResultCard label="Principal" value={formatCurrency(principal, "INR")} />
                <ResultCard label="Interest Earned" value={formatCurrency(interest, "INR")} />
                <ResultCard label="Maturity Amount" value={formatCurrency(maturity, "INR")} highlight />
            </div>
        </div>
    );
}

// ─── Retirement Calculator ───────────────────────────────────────────────────
function RetirementCalculator() {
    const [currentAge, setCurrentAge] = useState(30);
    const [retirementAge, setRetirementAge] = useState(60);
    const [monthlySavings, setMonthlySavings] = useState(15000);
    const [expectedReturn, setExpectedReturn] = useState(10);

    const years = retirementAge - currentAge;
    const corpus = calculateSIP(monthlySavings, expectedReturn, years);
    const monthlyIncome = (corpus * 0.04) / 12; // 4% SWR

    return (
        <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
                <InputGroup label="Current Age" value={currentAge} onChange={setCurrentAge} min={20} max={60} step={1} suffix="yrs" />
                <InputGroup label="Retirement Age" value={retirementAge} onChange={setRetirementAge} min={currentAge + 1} max={75} step={1} suffix="yrs" />
                <InputGroup label="Monthly Savings (₹)" value={monthlySavings} onChange={setMonthlySavings} min={1000} max={500000} step={1000} prefix="₹" />
                <InputGroup label="Expected Return (%)" value={expectedReturn} onChange={setExpectedReturn} min={4} max={25} step={0.5} suffix="%" />
            </div>
            <div className="grid md:grid-cols-3 gap-4">
                <ResultCard label="Years to Retire" value={`${years} years`} />
                <ResultCard label="Retirement Corpus" value={formatCurrency(corpus, "INR")} highlight />
                <ResultCard label="Monthly Income" value={formatCurrency(monthlyIncome, "INR")} />
            </div>
            <div className="bg-blue-50 rounded-xl p-4 text-sm text-blue-800">
                <strong>Based on 4% Safe Withdrawal Rate:</strong> At retirement, your corpus of {formatCurrency(corpus, "INR")} will provide approximately {formatCurrency(monthlyIncome, "INR")}/month in passive income.
            </div>
        </div>
    );
}

// ─── Crypto ROI Calculator ───────────────────────────────────────────────────
function CryptoROICalculator() {
    const [investment, setInvestment] = useState(100000);
    const [buyPrice, setBuyPrice] = useState(30000);
    const [sellPrice, setSellPrice] = useState(50000);

    const coins = investment / buyPrice;
    const currentValue = coins * sellPrice;
    const profitLoss = currentValue - investment;
    const roi = ((currentValue - investment) / investment) * 100;

    return (
        <div className="space-y-6">
            <div className="grid md:grid-cols-3 gap-4">
                <InputGroup label="Investment Amount ($)" value={investment} onChange={setInvestment} min={100} max={10000000} step={100} prefix="$" />
                <InputGroup label="Buy Price ($)" value={buyPrice} onChange={setBuyPrice} min={0.001} max={1000000} step={100} prefix="$" />
                <InputGroup label="Sell Price ($)" value={sellPrice} onChange={setSellPrice} min={0.001} max={1000000} step={100} prefix="$" />
            </div>
            <div className="grid md:grid-cols-4 gap-4">
                <ResultCard label="Coins Bought" value={formatNumber(coins, 6)} />
                <ResultCard label="Current Value" value={formatCurrency(currentValue)} />
                <ResultCard label="Profit / Loss" value={formatCurrency(profitLoss)} highlight color={profitLoss >= 0 ? "green" : "red"} />
                <ResultCard label="ROI" value={`${roi >= 0 ? "+" : ""}${roi.toFixed(2)}%`} color={roi >= 0 ? "green" : "red"} />
            </div>
            <div className={`p-4 rounded-xl text-center font-semibold ${profitLoss >= 0 ? "bg-emerald-50 text-emerald-800 border border-emerald-200" : "bg-red-50 text-red-800 border border-red-200"}`}>
                {profitLoss >= 0 ? "🚀" : "📉"} {profitLoss >= 0 ? `Profit of ${formatCurrency(profitLoss)} (+${roi.toFixed(2)}%)` : `Loss of ${formatCurrency(Math.abs(profitLoss))} (${roi.toFixed(2)}%)`}
            </div>
        </div>
    );
}

// ─── Net Worth Calculator ────────────────────────────────────────────────────
function NetWorthCalculator() {
    const [assets, setAssets] = useState({ savings: 200000, property: 3000000, stocks: 150000, crypto: 50000 });
    const [liabilities, setLiabilities] = useState({ mortgage: 1500000, carLoan: 200000, creditCard: 30000 });

    const totalAssets = Object.values(assets).reduce((a, b) => a + b, 0);
    const totalLiabilities = Object.values(liabilities).reduce((a, b) => a + b, 0);
    const netWorth = totalAssets - totalLiabilities;

    const updateAsset = (key: keyof typeof assets, val: number) => setAssets((prev) => ({ ...prev, [key]: val }));
    const updateLiability = (key: keyof typeof liabilities, val: number) => setLiabilities((prev) => ({ ...prev, [key]: val }));

    return (
        <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5">
                    <h4 className="font-bold text-emerald-800 mb-4">✅ Assets</h4>
                    <div className="space-y-3">
                        {Object.entries(assets).map(([key, val]) => (
                            <div key={key} className="flex items-center gap-3">
                                <label className="text-sm text-gray-600 w-24 capitalize">{key}</label>
                                <input type="number" value={val} onChange={(e) => updateAsset(key as keyof typeof assets, Number(e.target.value))}
                                    className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-400 focus:outline-none" />
                            </div>
                        ))}
                    </div>
                    <div className="mt-4 text-right font-bold text-emerald-700">Total: {formatCurrency(totalAssets, "INR")}</div>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-xl p-5">
                    <h4 className="font-bold text-red-800 mb-4">❌ Liabilities</h4>
                    <div className="space-y-3">
                        {Object.entries(liabilities).map(([key, val]) => (
                            <div key={key} className="flex items-center gap-3">
                                <label className="text-sm text-gray-600 w-24 capitalize">{key === "creditCard" ? "Credit Card" : key === "carLoan" ? "Car Loan" : key}</label>
                                <input type="number" value={val} onChange={(e) => updateLiability(key as keyof typeof liabilities, Number(e.target.value))}
                                    className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-red-400 focus:outline-none" />
                            </div>
                        ))}
                    </div>
                    <div className="mt-4 text-right font-bold text-red-700">Total: {formatCurrency(totalLiabilities, "INR")}</div>
                </div>
            </div>
            <ResultCard label="Net Worth" value={formatCurrency(netWorth, "INR")} highlight color={netWorth >= 0 ? "green" : "red"} />
        </div>
    );
}

// ─── Budget Planner ──────────────────────────────────────────────────────────
function BudgetPlanner() {
    const [income, setIncome] = useState(60000);
    const needs = income * 0.5;
    const wants = income * 0.3;
    const savings = income * 0.2;

    const chartData = {
        labels: ["Needs (50%)", "Wants (30%)", "Savings (20%)"],
        datasets: [{ data: [needs, wants, savings], backgroundColor: ["#0A1628", "#F59E0B", "#10b981"], borderWidth: 0 }],
    };

    return (
        <div className="space-y-6">
            <InputGroup label="Monthly Income (₹)" value={income} onChange={setIncome} min={10000} max={1000000} step={5000} prefix="₹" />
            <div className="grid md:grid-cols-3 gap-4">
                <ResultCard label="Needs (50%)" value={formatCurrency(needs, "INR")} />
                <ResultCard label="Wants (30%)" value={formatCurrency(wants, "INR")} />
                <ResultCard label="Savings (20%)" value={formatCurrency(savings, "INR")} highlight />
            </div>
            <div className="flex items-center justify-center">
                <div className="w-64 h-64">
                    <Pie data={chartData} options={{ plugins: { legend: { position: "bottom" } } }} />
                </div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800">
                <strong>50/30/20 Rule:</strong> Allocate 50% to essential needs, 30% to lifestyle wants, and save 20% for future goals.
            </div>
        </div>
    );
}

// ─── Shared UI Components ────────────────────────────────────────────────────
function InputGroup({ label, value, onChange, min, max, step, prefix, suffix }: {
    label: string; value: number; onChange: (v: number) => void;
    min: number; max: number; step: number; prefix?: string; suffix?: string;
}) {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
            <div className="relative">
                {prefix && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-medium">{prefix}</span>}
                <input
                    type="number" value={value} min={min} max={max} step={step}
                    onChange={(e) => onChange(Number(e.target.value))}
                    className={`w-full border border-gray-200 rounded-xl py-3 text-sm focus:ring-2 focus:ring-gold-500 focus:outline-none focus:border-transparent ${prefix ? "pl-8 pr-4" : "px-4"} ${suffix ? "pr-12" : ""}`}
                />
                {suffix && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">{suffix}</span>}
            </div>
            <input type="range" min={min} max={max} step={step} value={value}
                onChange={(e) => onChange(Number(e.target.value))}
                className="w-full mt-2 accent-gold-500 cursor-pointer" />
        </div>
    );
}

function ResultCard({ label, value, highlight = false, color }: { label: string; value: string; highlight?: boolean; color?: "green" | "red" }) {
    return (
        <div className={`rounded-xl p-4 text-center border ${highlight ? "bg-navy-900 border-navy-800 text-white" : "bg-white border-gray-200"}`}>
            <p className={`text-xs uppercase tracking-wider mb-1 font-medium ${highlight ? "text-gray-400" : "text-gray-500"}`}>{label}</p>
            <p className={`text-xl font-extrabold ${highlight ? "text-gold-400" : color === "green" ? "text-emerald-600" : color === "red" ? "text-red-600" : "text-navy-900"}`}>
                {value}
            </p>
        </div>
    );
}

// ─── Main Page ───────────────────────────────────────────────────────────────
const calculators: Record<CalcTab, React.FC> = {
    emi: EMICalculator,
    interest: InterestCalculator,
    sip: SIPCalculator,
    fd: FDCalculator,
    retirement: RetirementCalculator,
    "crypto-roi": CryptoROICalculator,
    networth: NetWorthCalculator,
    budget: BudgetPlanner,
};

export default function CalculatorsPage() {
    const [active, setActive] = useState<CalcTab>("emi");
    const ActiveCalc = calculators[active];
    const activeTab = tabs.find((t) => t.id === active)!;

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <section className="bg-navy-900 py-12">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h1 className="text-4xl font-extrabold text-white mb-3">
                        Financial <span className="text-gold-500">Calculators</span>
                    </h1>
                    <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                        8 powerful calculators to plan your EMI, SIP, retirement, and more.
                    </p>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <AdUnit format="leaderboard" className="mb-8 flex justify-center" />

                <div className="flex gap-8 flex-col lg:flex-row">
                    {/* Sidebar Tabs */}
                    <div className="lg:w-56 flex-shrink-0">
                        <nav className="flex lg:flex-col gap-2">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActive(tab.id)}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all w-full text-left whitespace-nowrap ${active === tab.id ? "bg-navy-900 text-white shadow-lg" : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"}`}
                                >
                                    <span>{tab.emoji}</span>
                                    <span className="hidden sm:inline lg:inline">{tab.label}</span>
                                </button>
                            ))}
                        </nav>
                    </div>

                    {/* Calculator Content */}
                    <div className="flex-1">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:p-8">
                            <h2 className="text-2xl font-bold text-navy-900 mb-6 flex items-center gap-2">
                                <span>{activeTab.emoji}</span> {activeTab.label} Calculator
                            </h2>
                            <ActiveCalc />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
