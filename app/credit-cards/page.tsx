import type { Metadata } from "next";
import AdUnit from "@/components/AdUnit";

export const metadata: Metadata = {
    title: "Best Credit Cards 2025 – Compare Cashback, Travel & Rewards",
    description: "Compare the best credit cards in 2025. Find the perfect cashback, travel, student, or business credit card for your spending habits.",
};

const cards = [
    { name: "Chase Freedom Unlimited", rewards: "1.5% cash back on all purchases", apr: "20.49%–29.24%", fee: "$0", bestFor: "All-Around Cashback", rating: 4.8, badge: "Editor's Choice", color: "from-blue-600 to-blue-800" },
    { name: "Citi Double Cash Card", rewards: "2% on everything (1%+1%)", apr: "19.24%–29.24%", fee: "$0", bestFor: "Simple Cashback", rating: 4.7, badge: "Best Value", color: "from-red-600 to-red-800" },
    { name: "Amex Blue Cash Preferred", rewards: "6% at supermarkets, 3% gas", apr: "19.24%–29.99%", fee: "$95", bestFor: "Groceries", rating: 4.9, badge: "Top Rated", color: "from-green-600 to-green-800" },
    { name: "Chase Sapphire Preferred", rewards: "3x on dining, 2x travel", apr: "21.49%–28.49%", fee: "$95", bestFor: "Travel Rewards", rating: 4.8, badge: "Best Travel", color: "from-indigo-600 to-indigo-800" },
    { name: "Capital One Quicksilver", rewards: "1.5% unlimited cashback", apr: "19.99%–29.99%", fee: "$0", bestFor: "No Annual Fee", rating: 4.5, badge: "No Fee Pick", color: "from-gray-600 to-gray-800" },
    { name: "Discover it Student Cash Back", rewards: "5% rotating categories", apr: "18.24%–27.24%", fee: "$0", bestFor: "Students", rating: 4.6, badge: "Best for Students", color: "from-orange-500 to-orange-700" },
];

const categories = ["All", "Cashback", "Travel", "Student", "Business", "No Fee"];

const tips = [
    { icon: "📊", tip: "Check your credit score before applying — it determines your approval odds and interest rate." },
    { icon: "🎯", tip: "Match your card to your top spending category for maximum rewards." },
    { icon: "💳", tip: "Never carry a balance — interest charges quickly erase cashback earnings." },
    { icon: "🎁", tip: "Always chase the welcome bonus — it's often worth $200-$500 in free rewards." },
];

export default function CreditCardsPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <section className="bg-navy-900 py-12">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h1 className="text-4xl font-extrabold text-white mb-3">
                        💳 Best <span className="text-gold-500">Credit Cards</span> 2025
                    </h1>
                    <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                        Compare the top credit cards and maximize your rewards, cashback, and travel miles.
                    </p>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <AdUnit format="leaderboard" className="mb-8 flex justify-center" />

                {/* Category Filter */}
                <div className="flex flex-wrap gap-2 mb-8">
                    {categories.map((cat) => (
                        <button key={cat} className="px-4 py-2 rounded-full text-sm font-medium border bg-white border-gray-200 text-gray-600 hover:bg-navy-900 hover:text-white hover:border-navy-900 transition-all">
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Cards Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {cards.map((card) => (
                        <div key={card.name} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 card-hover border border-gray-100">
                            <div className={`bg-gradient-to-br ${card.color} p-6 text-white relative`}>
                                <div className="flex items-start justify-between mb-8">
                                    <div className="w-12 h-8 bg-white/20 rounded-md flex items-center justify-center text-lg">💳</div>
                                    <span className="text-xs bg-gold-500 text-navy-900 px-3 py-1 rounded-full font-bold">{card.badge}</span>
                                </div>
                                <h3 className="font-bold text-white text-base">{card.name}</h3>
                                <div className="mt-1 text-white/80 text-xs">Best for: {card.bestFor}</div>
                            </div>
                            <div className="p-5 space-y-3">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Rewards</span>
                                    <span className="font-semibold text-navy-900 text-right text-xs max-w-[60%]">{card.rewards}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">APR</span>
                                    <span className="font-semibold text-navy-900">{card.apr}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Annual Fee</span>
                                    <span className={`font-semibold ${card.fee === "$0" ? "text-emerald-600" : "text-gray-700"}`}>{card.fee}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Rating</span>
                                    <span className="font-semibold text-gold-600">⭐ {card.rating}/5</span>
                                </div>
                                <button className="w-full mt-4 py-2.5 bg-navy-900 hover:bg-navy-800 text-white text-sm font-semibold rounded-xl transition-all hover:scale-[1.02]">
                                    Apply Now →
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <AdUnit format="rectangle" className="mb-10 flex justify-center" />

                {/* Comparison Table */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-12">
                    <div className="p-6 border-b border-gray-100">
                        <h2 className="text-2xl font-bold text-navy-900">Side-by-Side Comparison</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-navy-900 text-white">
                                <tr>
                                    <th className="px-4 py-3 text-left">Card Name</th>
                                    <th className="px-4 py-3 text-left">Rewards</th>
                                    <th className="px-4 py-3 text-center">APR</th>
                                    <th className="px-4 py-3 text-center">Annual Fee</th>
                                    <th className="px-4 py-3 text-left">Best For</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cards.map((card, i) => (
                                    <tr key={card.name} className={`border-t border-gray-100 ${i % 2 === 0 ? "bg-gray-50" : "bg-white"}`}>
                                        <td className="px-4 py-3 font-semibold text-navy-900">{card.name}</td>
                                        <td className="px-4 py-3 text-gray-600">{card.rewards}</td>
                                        <td className="px-4 py-3 text-center text-gray-600">{card.apr}</td>
                                        <td className={`px-4 py-3 text-center font-semibold ${card.fee === "$0" ? "text-emerald-600" : "text-gray-700"}`}>{card.fee}</td>
                                        <td className="px-4 py-3 text-gray-600">{card.bestFor}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Tips */}
                <div className="bg-navy-900 rounded-2xl p-8 mb-8">
                    <h2 className="text-2xl font-bold text-white mb-6">💡 Credit Score Tips</h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                        {tips.map(({ icon, tip }) => (
                            <div key={tip} className="flex gap-3 bg-white/5 rounded-xl p-4">
                                <span className="text-2xl">{icon}</span>
                                <p className="text-gray-300 text-sm">{tip}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Article */}
                <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                    <h2 className="text-2xl font-bold text-navy-900 mb-4">How to Choose the Right Credit Card in 2025</h2>
                    <div className="prose prose-sm max-w-none text-gray-600 space-y-4">
                        <p>Choosing the right credit card can save you hundreds of dollars annually through rewards, cashback, and travel benefits. The key is matching the card to your spending habits.</p>
                        <p><strong>Step 1: Know Your Credit Score.</strong> Your credit score determines which cards you qualify for and the interest rate you'll receive. Scores above 700 give you access to premium cards.</p>
                        <p><strong>Step 2: Identify Your Biggest Spending Categories.</strong> If you spend heavily on groceries, the Amex Blue Cash Preferred's 6% rate will earn far more than a flat 2% card.</p>
                        <p><strong>Step 3: Calculate the True Value.</strong> A card with a $95 annual fee that earns 3x more in your top category may outperform a no-fee card by hundreds of dollars annually.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
