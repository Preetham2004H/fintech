"use client";
import { useState } from "react";
import AdUnit from "@/components/AdUnit";

const stocks = [
    { ticker: "AAPL", company: "Apple Inc.", price: 189.30, pe: 28.5, marketCap: "2.98T", high52: 198.23, low52: 164.08, sector: "Technology", change: 1.23 },
    { ticker: "MSFT", company: "Microsoft Corp.", price: 415.20, pe: 35.2, marketCap: "3.09T", high52: 430.82, low52: 309.45, sector: "Technology", change: -0.54 },
    { ticker: "GOOGL", company: "Alphabet Inc.", price: 175.49, pe: 25.1, marketCap: "2.18T", high52: 191.88, low52: 120.21, sector: "Technology", change: 2.14 },
    { ticker: "AMZN", company: "Amazon.com Inc.", price: 192.45, pe: 68.4, marketCap: "2.01T", high52: 201.20, low52: 118.35, sector: "Consumer Disc.", change: 0.87 },
    { ticker: "NVDA", company: "NVIDIA Corp.", price: 875.35, pe: 65.2, marketCap: "2.16T", high52: 953.86, low52: 461.57, sector: "Technology", change: 3.45 },
    { ticker: "META", company: "Meta Platforms", price: 519.80, pe: 32.8, marketCap: "1.32T", high52: 531.49, low52: 279.40, sector: "Technology", change: 1.95 },
    { ticker: "BRK.B", company: "Berkshire Hathaway", price: 384.50, pe: 22.1, marketCap: "842B", high52: 390.01, low52: 313.06, sector: "Financials", change: 0.33 },
    { ticker: "JPM", company: "JPMorgan Chase", price: 218.60, pe: 12.3, marketCap: "630B", high52: 220.82, low52: 145.65, sector: "Financials", change: -0.21 },
    { ticker: "JNJ", company: "Johnson & Johnson", price: 147.25, pe: 15.8, marketCap: "354B", high52: 168.52, low52: 143.13, sector: "Healthcare", change: 0.45 },
    { ticker: "XOM", company: "Exxon Mobil", price: 112.30, pe: 14.2, marketCap: "450B", high52: 123.75, low52: 95.77, sector: "Energy", change: -1.23 },
    { ticker: "V", company: "Visa Inc.", price: 276.45, pe: 31.4, marketCap: "555B", high52: 290.96, low52: 227.00, sector: "Financials", change: 0.72 },
    { ticker: "WMT", company: "Walmart Inc.", price: 68.70, pe: 30.1, marketCap: "551B", high52: 71.11, low52: 48.02, sector: "Consumer Staples", change: 1.10 },
];

const sectors = ["All", "Technology", "Financials", "Healthcare", "Energy", "Consumer Disc.", "Consumer Staples"];

export default function StocksPage() {
    const [search, setSearch] = useState("");
    const [sector, setSector] = useState("All");
    const [sortBy, setSortBy] = useState<keyof typeof stocks[0]>("marketCap");

    const filtered = stocks
        .filter((s) =>
            (sector === "All" || s.sector === sector) &&
            (s.company.toLowerCase().includes(search.toLowerCase()) || s.ticker.toLowerCase().includes(search.toLowerCase()))
        );

    const trending = [...stocks].sort((a, b) => Math.abs(b.change) - Math.abs(a.change)).slice(0, 5);

    return (
        <div className="min-h-screen bg-gray-50">
            <section className="bg-navy-900 py-12">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h1 className="text-4xl font-extrabold text-white mb-3">
                        📈 <span className="text-gold-500">Stock</span> Screener
                    </h1>
                    <p className="text-gray-300 max-w-2xl mx-auto">Screen, filter, and analyze top stocks. Find your next investment opportunity.</p>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <AdUnit format="leaderboard" className="mb-8 flex justify-center" />

                {/* Trending */}
                <div className="bg-navy-900 rounded-2xl p-6 mb-8">
                    <h3 className="text-white font-bold mb-4">🔥 Trending Today</h3>
                    <div className="flex flex-wrap gap-3">
                        {trending.map((s) => (
                            <div key={s.ticker} className="flex items-center gap-2 bg-white/10 rounded-xl px-4 py-2">
                                <span className="text-white font-bold text-sm">{s.ticker}</span>
                                <span className={`text-sm font-medium ${s.change >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                                    {s.change >= 0 ? "+" : ""}{s.change}%
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <input
                        type="text" placeholder="Search by ticker or company..." value={search} onChange={(e) => setSearch(e.target.value)}
                        className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-sm bg-white focus:ring-2 focus:ring-gold-500 focus:outline-none"
                    />
                    <select value={sector} onChange={(e) => setSector(e.target.value)}
                        className="border border-gray-200 rounded-xl px-4 py-3 text-sm bg-white focus:ring-2 focus:ring-gold-500 focus:outline-none">
                        {sectors.map((s) => <option key={s}>{s}</option>)}
                    </select>
                </div>

                {/* Main Table */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-10">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-navy-900 text-white">
                                <tr>
                                    <th className="px-4 py-3 text-left">Ticker</th>
                                    <th className="px-4 py-3 text-left">Company</th>
                                    <th className="px-4 py-3 text-right">Price</th>
                                    <th className="px-4 py-3 text-right">24h Chg</th>
                                    <th className="px-4 py-3 text-right hidden md:table-cell">P/E Ratio</th>
                                    <th className="px-4 py-3 text-right hidden md:table-cell">Mkt Cap</th>
                                    <th className="px-4 py-3 text-right hidden lg:table-cell">52W High</th>
                                    <th className="px-4 py-3 text-right hidden lg:table-cell">52W Low</th>
                                    <th className="px-4 py-3 text-left hidden sm:table-cell">Sector</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.map((stock, i) => (
                                    <tr key={stock.ticker} className={`border-t border-gray-100 hover:bg-gray-50 transition-colors ${i % 2 === 0 ? "" : "bg-gray-50/50"}`}>
                                        <td className="px-4 py-3"><span className="font-bold text-navy-900 bg-navy-50 px-2 py-1 rounded text-xs">{stock.ticker}</span></td>
                                        <td className="px-4 py-3 font-medium text-gray-800">{stock.company}</td>
                                        <td className="px-4 py-3 text-right font-semibold">${stock.price.toFixed(2)}</td>
                                        <td className={`px-4 py-3 text-right font-medium ${stock.change >= 0 ? "text-emerald-600" : "text-red-500"}`}>
                                            {stock.change >= 0 ? "+" : ""}{stock.change}%
                                        </td>
                                        <td className="px-4 py-3 text-right text-gray-600 hidden md:table-cell">{stock.pe}</td>
                                        <td className="px-4 py-3 text-right text-gray-600 hidden md:table-cell">{stock.marketCap}</td>
                                        <td className="px-4 py-3 text-right text-gray-600 hidden lg:table-cell">${stock.high52}</td>
                                        <td className="px-4 py-3 text-right text-gray-600 hidden lg:table-cell">${stock.low52}</td>
                                        <td className="px-4 py-3 hidden sm:table-cell">
                                            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">{stock.sector}</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <AdUnit format="rectangle" className="mb-10 flex justify-center" />

                {/* Article */}
                <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                    <h2 className="text-2xl font-bold text-navy-900 mb-4">How to Analyze a Stock Before Buying</h2>
                    <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-600">
                        <div>
                            <h3 className="font-bold text-navy-900 mb-2">📊 Fundamental Analysis</h3>
                            <ul className="space-y-2">
                                <li>✓ <strong>P/E Ratio:</strong> Compare to industry average. Lower = potentially undervalued</li>
                                <li>✓ <strong>Revenue Growth:</strong> Consistent 10%+ annual growth is a good sign</li>
                                <li>✓ <strong>Profit Margins:</strong> Higher and improving margins show competitive advantage</li>
                                <li>✓ <strong>Debt/Equity Ratio:</strong> Lower is better; high debt is risky</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-bold text-navy-900 mb-2">📈 Technical Analysis</h3>
                            <ul className="space-y-2">
                                <li>✓ <strong>52-Week High/Low:</strong> Understand where price sits in its range</li>
                                <li>✓ <strong>Moving Averages:</strong> 50-day and 200-day MAs indicate trends</li>
                                <li>✓ <strong>Volume:</strong> High volume on price moves signals conviction</li>
                                <li>✓ <strong>RSI:</strong> Above 70 = overbought, below 30 = oversold</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
