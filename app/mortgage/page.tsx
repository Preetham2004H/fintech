"use client";
import { useState } from "react";
import { formatCurrency, calculateEMI, formatNumber } from "@/lib/utils";
import AdUnit from "@/components/AdUnit";

export default function MortgagePage() {
    const [loanAmount, setLoanAmount] = useState(3000000);
    const [rate, setRate] = useState(8.5);
    const [tenure, setTenure] = useState(240);
    const [view, setView] = useState<"emi" | "comparison">("emi");

    const emi = calculateEMI(loanAmount, rate, tenure);
    const totalPayment = emi * tenure;
    const totalInterest = totalPayment - loanAmount;

    // Rent vs Buy (simple)
    const rentMonthly = loanAmount * 0.003; // ~0.3% of property value
    const appreciationRate = 0.07; // 7% annual
    const propertyValue = loanAmount * Math.pow(1 + appreciationRate, tenure / 12);
    const equityBuilt = propertyValue - loanAmount;

    return (
        <div className="min-h-screen bg-gray-50">
            <section className="bg-navy-900 py-12">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h1 className="text-4xl font-extrabold text-white mb-3">
                        🏠 <span className="text-gold-500">Mortgage</span> Calculator
                    </h1>
                    <p className="text-gray-300 max-w-2xl mx-auto">Calculate your monthly EMI, compare rent vs buy, and understand fixed vs variable rates.</p>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <AdUnit format="leaderboard" className="mb-8 flex justify-center" />

                {/* Tabs */}
                <div className="flex gap-3 mb-8">
                    {[{ id: "emi", label: "🧮 Mortgage Calculator" }, { id: "comparison", label: "🏠 Rent vs Buy" }].map((tab) => (
                        <button key={tab.id} onClick={() => setView(tab.id as "emi" | "comparison")}
                            className={`px-5 py-3 rounded-xl font-semibold text-sm transition-all ${view === tab.id ? "bg-navy-900 text-white" : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"}`}>
                            {tab.label}
                        </button>
                    ))}
                </div>

                {view === "emi" && (
                    <div className="grid lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-6">
                            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                                <h2 className="text-xl font-bold text-navy-900 mb-6">Mortgage Details</h2>
                                {[
                                    { label: `Loan Amount: ${formatCurrency(loanAmount, "INR")}`, value: loanAmount, setter: setLoanAmount, min: 100000, max: 50000000, step: 100000 },
                                    { label: `Interest Rate: ${rate}%`, value: rate, setter: setRate, min: 5, max: 20, step: 0.1 },
                                    { label: `Tenure: ${tenure} months (${(tenure / 12).toFixed(0)} years)`, value: tenure, setter: setTenure, min: 12, max: 360, step: 12 },
                                ].map(({ label, value, setter, min, max, step }) => (
                                    <div key={label} className="mb-5">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
                                        <input type="range" min={min} max={max} step={step} value={value}
                                            onChange={(e) => setter(Number(e.target.value))}
                                            className="w-full accent-gold-500 cursor-pointer" />
                                    </div>
                                ))}
                            </div>

                            {/* Results */}
                            <div className="grid sm:grid-cols-3 gap-4">
                                <div className="bg-navy-900 rounded-2xl p-5 text-center">
                                    <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Monthly EMI</p>
                                    <p className="text-gold-400 text-2xl font-extrabold">{formatCurrency(emi, "INR")}</p>
                                </div>
                                <div className="bg-white border border-gray-100 rounded-2xl p-5 text-center shadow-sm">
                                    <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Total Interest</p>
                                    <p className="text-red-500 text-2xl font-extrabold">{formatCurrency(totalInterest, "INR")}</p>
                                </div>
                                <div className="bg-white border border-gray-100 rounded-2xl p-5 text-center shadow-sm">
                                    <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Total Payment</p>
                                    <p className="text-navy-900 text-2xl font-extrabold">{formatCurrency(totalPayment, "INR")}</p>
                                </div>
                            </div>

                            {/* Fixed vs Variable */}
                            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                                <h3 className="font-bold text-navy-900 mb-4">📊 Fixed vs Variable Rate Comparison</h3>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                        <thead className="bg-gray-50"><tr>
                                            <th className="px-4 py-2 text-left">Feature</th>
                                            <th className="px-4 py-2 text-center text-blue-700">Fixed Rate</th>
                                            <th className="px-4 py-2 text-center text-orange-600">Variable Rate</th>
                                        </tr></thead>
                                        <tbody className="divide-y divide-gray-100">
                                            {[
                                                ["Rate", `${rate}%`, `${(rate - 1.5).toFixed(1)}% – ${(rate + 2).toFixed(1)}%`],
                                                ["Monthly EMI", formatCurrency(emi, "INR"), "Varies"],
                                                ["Predictability", "High ✅", "Low ⚠️"],
                                                ["Best For", "Long-term security", "Short-term / rising income"],
                                                ["Risk", "Low", "Medium-High"],
                                            ].map(([feature, fixed, variable]) => (
                                                <tr key={feature}><td className="px-4 py-2 text-gray-600">{feature}</td>
                                                    <td className="px-4 py-2 text-center font-medium text-blue-700">{fixed}</td>
                                                    <td className="px-4 py-2 text-center font-medium text-orange-600">{variable}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                                <h3 className="font-bold text-navy-900 mb-4">💡 Quick Tips</h3>
                                <ul className="space-y-3 text-sm text-gray-600">
                                    {[
                                        "A larger down payment reduces your EMI and total interest.",
                                        "Even 1 extra EMI per year can reduce tenure by 3-4 years.",
                                        "Compare at least 3 lenders before taking a mortgage.",
                                        "Factor in property tax, insurance, and maintenance costs.",
                                    ].map((tip) => (<li key={tip} className="flex gap-2"><span className="text-gold-500 mt-0.5">✓</span>{tip}</li>))}
                                </ul>
                            </div>
                            <AdUnit format="sidebar" />
                        </div>
                    </div>
                )}

                {view === "comparison" && (
                    <div className="grid lg:grid-cols-2 gap-8">
                        <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-8">
                            <h3 className="text-xl font-bold text-blue-800 mb-6">🏠 Buying a Home</h3>
                            <div className="space-y-4 text-sm">
                                <div className="flex justify-between"><span className="text-gray-600">Monthly EMI</span><span className="font-bold">{formatCurrency(emi, "INR")}</span></div>
                                <div className="flex justify-between"><span className="text-gray-600">Down Payment (20%)</span><span className="font-bold">{formatCurrency(loanAmount * 0.25, "INR")}</span></div>
                                <div className="flex justify-between"><span className="text-gray-600">Property Value ({(tenure / 12).toFixed(0)} yrs)</span><span className="font-bold text-emerald-600">{formatCurrency(propertyValue, "INR")}</span></div>
                                <div className="flex justify-between"><span className="text-gray-600">Equity Built</span><span className="font-bold text-emerald-600">+{formatCurrency(equityBuilt, "INR")}</span></div>
                            </div>
                            <div className="mt-6 bg-blue-100 rounded-xl p-4 text-blue-800 text-sm font-medium text-center">Building wealth through property ownership 📈</div>
                        </div>
                        <div className="bg-orange-50 border-2 border-orange-200 rounded-2xl p-8">
                            <h3 className="text-xl font-bold text-orange-800 mb-6">🏢 Renting</h3>
                            <div className="space-y-4 text-sm">
                                <div className="flex justify-between"><span className="text-gray-600">Monthly Rent</span><span className="font-bold">{formatCurrency(rentMonthly, "INR")}</span></div>
                                <div className="flex justify-between"><span className="text-gray-600">Total Rent Paid ({(tenure / 12).toFixed(0)} yrs)</span><span className="font-bold text-red-500">{formatCurrency(rentMonthly * tenure * 1.3, "INR")}</span></div>
                                <div className="flex justify-between"><span className="text-gray-600">Equity Built</span><span className="font-bold text-red-500">₹0</span></div>
                                <div className="flex justify-between"><span className="text-gray-600">Flexibility</span><span className="font-bold text-emerald-600">High ✅</span></div>
                            </div>
                            <div className="mt-6 bg-orange-100 rounded-xl p-4 text-orange-800 text-sm font-medium text-center">Money spent without building ownership 💸</div>
                        </div>
                    </div>
                )}

                {/* Article */}
                <div className="mt-10 bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                    <h2 className="text-2xl font-bold text-navy-900 mb-4">First-Time Home Buyer's Complete Guide</h2>
                    <div className="space-y-3 text-gray-600 text-sm leading-relaxed">
                        <p>Buying your first home is one of the biggest financial decisions of your life. Here's what you need to know.</p>
                        <p><strong>Save for the Down Payment:</strong> Most lenders require 10-20% down. On a ₹50L home, that's ₹5-10L. Start saving early to avoid PMI (Private Mortgage Insurance).</p>
                        <p><strong>Get Pre-Approved:</strong> Know your budget before house hunting. Pre-approval shows sellers you're a serious buyer and speeds up the purchase process.</p>
                        <p><strong>Consider Total Costs:</strong> Beyond EMI, factor in property taxes, home insurance, maintenance (1% of value/year), and utility costs.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
