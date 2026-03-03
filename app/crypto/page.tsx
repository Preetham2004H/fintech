"use client";
import { useState, useEffect } from "react";
import { fetchCryptoPrices, fetchFearGreedIndex, type CryptoPrice } from "@/lib/api";
import { formatCurrency, formatCompact, formatPercent, formatNumber } from "@/lib/utils";
import { TrendingUp, TrendingDown, Search, RefreshCw } from "lucide-react";
import AdUnit from "@/components/AdUnit";

function FearGreedWidget({ value }: { value: number }) {
    const getColor = (v: number) => {
        if (v <= 25) return "text-red-500";
        if (v <= 45) return "text-orange-500";
        if (v <= 55) return "text-yellow-500";
        if (v <= 75) return "text-lime-500";
        return "text-emerald-500";
    };
    const getLabel = (v: number) => {
        if (v <= 25) return "Extreme Fear";
        if (v <= 45) return "Fear";
        if (v <= 55) return "Neutral";
        if (v <= 75) return "Greed";
        return "Extreme Greed";
    };
    const degrees = (v: number) => ((v / 100) * 180) - 90;

    return (
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm text-center">
            <h3 className="font-bold text-navy-900 mb-4 text-sm uppercase tracking-wider">Fear & Greed Index</h3>
            <div className="relative w-40 h-20 mx-auto mb-4 overflow-hidden">
                <div className="absolute bottom-0 left-0 right-0 h-full rounded-t-full border-8 border-gray-100 border-b-transparent" style={{ borderLeftColor: '#ef4444', borderRightColor: '#10b981' }} />
                <div style={{ transform: `rotate(${degrees(value)}deg)`, transformOrigin: 'bottom center' }} className="absolute bottom-0 left-1/2 w-1 h-16 bg-navy-900 rounded-full -translate-x-1/2 transition-transform duration-1000" />
            </div>
            <div className={`text-4xl font-extrabold ${getColor(value)}`}>{value}</div>
            <div className={`font-semibold text-sm mt-1 ${getColor(value)}`}>{getLabel(value)}</div>
        </div>
    );
}

function BitcoinProfitCalc() {
    const [buyPrice, setBuyPrice] = useState(30000);
    const [sellPrice, setSellPrice] = useState(65000);
    const [quantity, setQuantity] = useState(1);

    const investment = buyPrice * quantity;
    const currentValue = sellPrice * quantity;
    const profit = currentValue - investment;
    const roi = ((profit / investment) * 100);

    return (
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <h3 className="font-bold text-navy-900 mb-4 flex items-center gap-2">
                <span>₿</span> Bitcoin Profit Calculator
            </h3>
            <div className="space-y-3">
                {[
                    { label: "Buy Price ($)", value: buyPrice, setter: setBuyPrice },
                    { label: "Sell Price ($)", value: sellPrice, setter: setSellPrice },
                    { label: "Quantity (BTC)", value: quantity, setter: setQuantity },
                ].map(({ label, value, setter }) => (
                    <div key={label}>
                        <label className="text-xs text-gray-500 font-medium">{label}</label>
                        <input type="number" value={value} onChange={(e) => setter(Number(e.target.value))}
                            className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm mt-1 focus:ring-2 focus:ring-gold-500 focus:outline-none" />
                    </div>
                ))}
                <div className={`rounded-xl p-4 text-center mt-4 ${profit >= 0 ? "bg-emerald-50 border border-emerald-200" : "bg-red-50 border border-red-200"}`}>
                    <p className="text-xs text-gray-500 mb-1">Profit / Loss</p>
                    <p className={`text-xl font-extrabold ${profit >= 0 ? "text-emerald-600" : "text-red-600"}`}>
                        {profit >= 0 ? "+" : ""}{formatCurrency(profit)}
                    </p>
                    <p className={`text-sm font-medium mt-1 ${profit >= 0 ? "text-emerald-500" : "text-red-500"}`}>
                        {formatPercent(roi)} ROI
                    </p>
                </div>
            </div>
        </div>
    );
}

export default function CryptoPage() {
    const [coins, setCoins] = useState<CryptoPrice[]>([]);
    const [fearGreed, setFearGreed] = useState(52);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [portfolio, setPortfolio] = useState<{ id: string; name: string; quantity: number }[]>([]);

    useEffect(() => {
        async function load() {
            setLoading(true);
            const [priceData, fgData] = await Promise.all([
                fetchCryptoPrices(20),
                fetchFearGreedIndex(),
            ]);
            setCoins(priceData);
            if (fgData) setFearGreed(Number(fgData.value));
            setLoading(false);
        }
        load();
    }, []);

    const filtered = coins.filter(
        (c) => c.name.toLowerCase().includes(search.toLowerCase()) || c.symbol.toLowerCase().includes(search.toLowerCase())
    );

    const portfolioValue = portfolio.reduce((sum, item) => {
        const coin = coins.find((c) => c.id === item.id);
        return sum + (coin ? coin.current_price * item.quantity : 0);
    }, 0);

    const addToPortfolio = (coin: CryptoPrice) => {
        setPortfolio((prev) => {
            const exists = prev.find((p) => p.id === coin.id);
            if (exists) return prev;
            return [...prev, { id: coin.id, name: coin.name, quantity: 1 }];
        });
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <section className="bg-navy-900 py-12">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h1 className="text-4xl font-extrabold text-white mb-3">₿ <span className="text-gold-500">Cryptocurrency</span> Tracker</h1>
                    <p className="text-gray-300">Live prices, portfolio tracker, fear & greed index, and profit calculators.</p>
                </div>
            </section>

            {/* Ticker Bar */}
            <div className="bg-navy-800 border-b border-white/10 overflow-hidden py-3">
                <div className="ticker-content flex items-center gap-8">
                    {[...coins, ...coins].map((coin, i) => (
                        <div key={`${coin.id}-${i}`} className="flex items-center gap-2 shrink-0">
                            <span className="text-white font-semibold text-sm uppercase">{coin.symbol}</span>
                            <span className="text-gray-300 text-sm">{formatCurrency(coin.current_price)}</span>
                            <span className={`text-xs font-medium ${coin.price_change_percentage_24h >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                                {formatPercent(coin.price_change_percentage_24h)}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <AdUnit format="leaderboard" className="mb-8 flex justify-center" />

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Table */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Search */}
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text" placeholder="Search coins..." value={search} onChange={(e) => setSearch(e.target.value)}
                                className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-gold-500 focus:outline-none text-sm"
                            />
                        </div>

                        {/* Coin Table */}
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-navy-900 text-white text-xs">
                                        <tr>
                                            <th className="px-4 py-3 text-left">#</th>
                                            <th className="px-4 py-3 text-left">Coin</th>
                                            <th className="px-4 py-3 text-right">Price</th>
                                            <th className="px-4 py-3 text-right">24h</th>
                                            <th className="px-4 py-3 text-right hidden md:table-cell">Market Cap</th>
                                            <th className="px-4 py-3 text-right hidden lg:table-cell">Volume</th>
                                            <th className="px-4 py-3 text-center">+Portfolio</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {loading ? (
                                            Array.from({ length: 10 }).map((_, i) => (
                                                <tr key={i} className="border-t border-gray-100">
                                                    <td colSpan={7} className="px-4 py-4"><div className="h-4 shimmer rounded" /></td>
                                                </tr>
                                            ))
                                        ) : filtered.map((coin) => (
                                            <tr key={coin.id} className="border-t border-gray-100 hover:bg-gray-50 transition-colors">
                                                <td className="px-4 py-3 text-xs text-gray-400">{coin.market_cap_rank}</td>
                                                <td className="px-4 py-3">
                                                    <div className="flex items-center gap-2">
                                                        <img src={coin.image} alt={coin.name} className="w-7 h-7 rounded-full" />
                                                        <div>
                                                            <p className="font-semibold text-navy-900 text-sm">{coin.name}</p>
                                                            <p className="text-xs text-gray-400 uppercase">{coin.symbol}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3 text-right font-semibold text-sm">{formatCurrency(coin.current_price)}</td>
                                                <td className="px-4 py-3 text-right">
                                                    <span className={`flex items-center justify-end gap-1 text-sm font-medium ${coin.price_change_percentage_24h >= 0 ? "text-emerald-600" : "text-red-500"}`}>
                                                        {coin.price_change_percentage_24h >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                                                        {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3 text-right text-sm text-gray-600 hidden md:table-cell">{formatCompact(coin.market_cap)}</td>
                                                <td className="px-4 py-3 text-right text-sm text-gray-600 hidden lg:table-cell">{formatCompact(coin.total_volume)}</td>
                                                <td className="px-4 py-3 text-center">
                                                    <button onClick={() => addToPortfolio(coin)} className="text-xs px-3 py-1 bg-gold-500/10 text-gold-700 hover:bg-gold-500 hover:text-navy-900 rounded-full font-medium transition-all">+ Add</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <FearGreedWidget value={fearGreed} />
                        <BitcoinProfitCalc />

                        {/* Portfolio Tracker */}
                        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-bold text-navy-900">My Portfolio</h3>
                                <span className="text-gold-600 font-bold">{formatCurrency(portfolioValue)}</span>
                            </div>
                            {portfolio.length === 0 ? (
                                <p className="text-gray-400 text-sm text-center py-4">Add coins from the table to track your portfolio</p>
                            ) : (
                                <div className="space-y-3">
                                    {portfolio.map((item) => {
                                        const coin = coins.find((c) => c.id === item.id);
                                        return (
                                            <div key={item.id} className="flex items-center justify-between gap-2">
                                                <span className="font-medium text-sm">{item.name}</span>
                                                <input
                                                    type="number" value={item.quantity} min={0.001} step={0.001}
                                                    onChange={(e) => setPortfolio((prev) => prev.map((p) => p.id === item.id ? { ...p, quantity: Number(e.target.value) } : p))}
                                                    className="w-20 border border-gray-200 rounded-lg px-2 py-1 text-xs text-center"
                                                />
                                                <span className="text-sm font-semibold text-navy-900 w-24 text-right">
                                                    {formatCurrency((coin?.current_price || 0) * item.quantity)}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>

                        <AdUnit format="sidebar" />
                    </div>
                </div>

                {/* Articles */}
                <div className="mt-12">
                    <h2 className="text-2xl font-bold text-navy-900 mb-6">Crypto Guides</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {[
                            { title: "Crypto Investing 101: Complete Beginner's Guide", desc: "Learn the fundamentals of cryptocurrency investing, how to choose exchanges, and best practices for security." },
                            { title: "Top Altcoins to Watch in 2025", desc: "Beyond Bitcoin and Ethereum, discover promising altcoins with strong fundamentals and growth potential." },
                        ].map((article) => (
                            <div key={article.title} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm card-hover">
                                <h3 className="font-bold text-navy-900 mb-2">{article.title}</h3>
                                <p className="text-gray-500 text-sm">{article.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
