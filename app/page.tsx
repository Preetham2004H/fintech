"use client";
import Link from "next/link";
import {
  TrendingUp, Calculator, CreditCard, Shield, Home, Bitcoin,
  BarChart3, ArrowRight, ChevronRight, Star, Zap, Users, Globe
} from "lucide-react";
import AdUnit from "@/components/AdUnit";
import BlogCard from "@/components/BlogCard";
import { blogPosts } from "@/lib/api";

const tools = [
  { icon: Calculator, label: "EMI Calculator", desc: "Calculate loan EMI & amortization", href: "/calculators#emi", color: "from-blue-500 to-blue-700" },
  { icon: Bitcoin, label: "Crypto Tracker", desc: "Live prices for top 20 coins", href: "/crypto", color: "from-orange-500 to-orange-700" },
  { icon: BarChart3, label: "Stock Screener", desc: "Filter & analyze stocks", href: "/stocks", color: "from-emerald-500 to-emerald-700" },
  { icon: Home, label: "Mortgage Calc", desc: "EMI + total interest breakdown", href: "/mortgage", color: "from-purple-500 to-purple-700" },
  { icon: TrendingUp, label: "SIP Calculator", desc: "Grow wealth with SIP investing", href: "/calculators#sip", color: "from-yellow-500 to-yellow-700" },
  { icon: CreditCard, label: "Credit Cards", desc: "Compare best cashback cards", href: "/credit-cards", color: "from-pink-500 to-pink-700" },
  { icon: Shield, label: "Insurance", desc: "Term & health plan comparisons", href: "/insurance", color: "from-teal-500 to-teal-700" },
  { icon: Calculator, label: "Net Worth Calc", desc: "Track assets vs liabilities", href: "/calculators#networth", color: "from-indigo-500 to-indigo-700" },
];

const stats = [
  { label: "Free Tools", value: "15+", icon: Zap },
  { label: "Monthly Readers", value: "500K+", icon: Users },
  { label: "Countries", value: "50+", icon: Globe },
  { label: "Avg. Rating", value: "4.9★", icon: Star },
];

const recentPosts = blogPosts.slice(0, 3);

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* AdSense - Top Leaderboard */}
      <div className="bg-gray-100 py-2">
        <div className="max-w-7xl mx-auto px-4">
          <AdUnit format="leaderboard" label="" />
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32" style={{ background: "linear-gradient(135deg, #0A1628 0%, #1e3a6e 50%, #0A1628 100%)" }}>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full blur-3xl" style={{ background: "rgba(245, 158, 11, 0.1)" }} />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full blur-3xl animate-pulse" style={{ background: "rgba(59, 130, 246, 0.1)" }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-8" style={{ background: "rgba(245, 158, 11, 0.1)", border: "1px solid rgba(245, 158, 11, 0.3)" }}>
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#F59E0B" }} />
              <span className="text-sm font-medium" style={{ color: "#fbbf24" }}>Your All-in-One Finance Hub</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white mb-6 leading-tight">
              Your Smart Guide to
              <span className="block gradient-text mt-2">Personal Finance & Crypto</span>
            </h1>
            <p className="text-gray-300 text-lg sm:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
              Free calculators, live market data, expert articles, and smart tools to help you build wealth, reduce debt, and achieve financial freedom.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/calculators" className="inline-flex items-center gap-2 px-8 py-4 font-bold rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg" style={{ background: "#F59E0B", color: "#0A1628" }}>
                <Calculator className="w-5 h-5" />
                Explore Free Tools
              </Link>
              <Link href="/blog" className="inline-flex items-center gap-2 px-8 py-4 text-white font-semibold rounded-xl transition-all duration-200" style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)" }}>
                Latest Articles
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section style={{ background: "#122651", borderTop: "1px solid rgba(255,255,255,0.1)", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map(({ label, value, icon: Icon }) => (
              <div key={label} className="text-center">
                <div className="flex justify-center mb-2">
                  <Icon className="w-6 h-6" style={{ color: "#F59E0B" }} />
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-white">{value}</div>
                <div className="text-sm mt-1" style={{ color: "#9ca3af" }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Tools Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block font-semibold text-sm uppercase tracking-wider mb-3" style={{ color: "#d97706" }}>Free Financial Tools</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4" style={{ color: "#0A1628" }}>
              Everything You Need in One Place
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Powerful, easy-to-use tools to help you plan, track, and grow your wealth.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {tools.map(({ icon: Icon, label, desc, href, color }) => (
              <Link key={label} href={href}>
                <div className="group bg-white rounded-2xl p-6 shadow-sm border border-gray-100 h-full card-hover">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-base mb-1" style={{ color: "#0A1628" }}>{label}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
                  <div className="mt-4 flex items-center text-xs font-semibold" style={{ color: "#d97706" }}>
                    <span>Try now</span>
                    <ChevronRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* AdSense - Rectangle after hero */}
      <div className="py-8 bg-gray-100 flex justify-center">
        <AdUnit format="rectangle" />
      </div>

      {/* Latest Blog Posts */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <span className="inline-block font-semibold text-sm uppercase tracking-wider mb-2" style={{ color: "#d97706" }}>Expert Insights</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold" style={{ color: "#0A1628" }}>Latest Articles</h2>
            </div>
            <Link href="/blog" className="hidden sm:flex items-center gap-2 font-semibold transition-colors" style={{ color: "#1e3a6e" }}>
              View All
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recentPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>

          <div className="text-center mt-10 sm:hidden">
            <Link href="/blog" className="inline-flex items-center gap-2 px-6 py-3 text-white font-semibold rounded-xl transition-all" style={{ background: "#0A1628" }}>
              View All Articles <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 relative overflow-hidden" style={{ background: "#0A1628" }}>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full blur-3xl" style={{ background: "rgba(245, 158, 11, 0.05)" }} />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full blur-3xl" style={{ background: "rgba(59, 130, 246, 0.05)" }} />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <span className="font-semibold text-sm uppercase tracking-wider" style={{ color: "#F59E0B" }}>Stay Informed</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3 mb-4">
            Get Weekly Finance Tips
          </h2>
          <p className="mb-8" style={{ color: "#d1d5db" }}>
            Join 50,000+ readers who get our weekly newsletter on personal finance, crypto, and investing strategies.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-5 py-4 rounded-xl text-white placeholder-gray-400 focus:outline-none text-sm"
              style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)" }}
            />
            <button
              type="submit"
              className="px-8 py-4 font-bold rounded-xl transition-all hover:scale-105 active:scale-95 whitespace-nowrap"
              style={{ background: "#F59E0B", color: "#0A1628" }}
            >
              Subscribe Free
            </button>
          </form>
          <p className="text-xs mt-4" style={{ color: "#6b7280" }}>No spam, unsubscribe anytime. We respect your privacy.</p>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { icon: "🔒", title: "SSL Secured", desc: "Your data is safe" },
              { icon: "📊", title: "Real-Time Data", desc: "Live market prices" },
              { icon: "🆓", title: "100% Free", desc: "No hidden charges" },
              { icon: "📱", title: "Mobile Friendly", desc: "Works on all devices" },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="flex flex-col items-center">
                <span className="text-3xl mb-2">{icon}</span>
                <h3 className="font-bold text-sm" style={{ color: "#0A1628" }}>{title}</h3>
                <p className="text-gray-500 text-xs">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
