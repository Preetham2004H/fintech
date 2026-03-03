import type { Metadata } from "next";
import Link from "next/link";
import { Shield, TrendingUp, BookOpen, Users } from "lucide-react";

export const metadata: Metadata = {
    title: "About HFinTech – Your Smart Finance Guide",
    description: "Learn about HFinTech – our mission to make personal finance, crypto, and investing accessible to everyone through free tools and expert content.",
};

const team = [
    { name: "Alex Finance", role: "Founder & Lead Analyst", emoji: "👨‍💼", bio: "10+ years in investment banking and personal finance education." },
    { name: "Sarah Crypto", role: "Crypto Markets Editor", emoji: "₿", bio: "Former blockchain developer and DeFi researcher with 5 years in crypto." },
    { name: "Mike Invest", role: "Stock Market Analyst", emoji: "📈", bio: "CFA charterholder with expertise in value investing and equity research." },
];

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <section className="bg-navy-900 py-16">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h1 className="text-4xl font-extrabold text-white mb-4">About <span className="text-gold-500">HFinTech</span></h1>
                    <p className="text-gray-300 text-lg leading-relaxed">
                        We're on a mission to democratize financial knowledge and give everyone access to the tools and information they need to achieve financial freedom.
                    </p>
                </div>
            </section>

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
                {/* Mission */}
                <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                    <h2 className="text-2xl font-bold text-navy-900 mb-4">Our Mission</h2>
                    <p className="text-gray-600 leading-relaxed mb-4">
                        HFinTech was founded with a simple belief: everyone deserves access to quality financial education and tools, regardless of their income or background.
                    </p>
                    <p className="text-gray-600 leading-relaxed">
                        We provide free calculators, real-time market data, credit card comparisons, insurance guides, and expert articles to help you make smarter financial decisions every day.
                    </p>
                </div>

                {/* Values */}
                <div className="grid sm:grid-cols-2 gap-6">
                    {[
                        { icon: Shield, title: "Trustworthy", desc: "We never provide financial advice — only education and tools to help you research.", color: "text-blue-600 bg-blue-50" },
                        { icon: BookOpen, title: "Educational", desc: "Our content breaks down complex finance topics into clear, actionable guides.", color: "text-emerald-600 bg-emerald-50" },
                        { icon: TrendingUp, title: "Data-Driven", desc: "Real-time market data and calculators based on industry-standard formulas.", color: "text-gold-600 bg-gold-50" },
                        { icon: Users, title: "Community First", desc: "Built for everyday people, not just Wall Street professionals.", color: "text-purple-600 bg-purple-50" },
                    ].map(({ icon: Icon, title, desc, color }) => (
                        <div key={title} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color} mb-4`}>
                                <Icon className="w-5 h-5" />
                            </div>
                            <h3 className="font-bold text-navy-900 mb-2">{title}</h3>
                            <p className="text-gray-500 text-sm">{desc}</p>
                        </div>
                    ))}
                </div>

                {/* Team */}
                <div>
                    <h2 className="text-2xl font-bold text-navy-900 mb-6">Our Team</h2>
                    <div className="grid sm:grid-cols-3 gap-6">
                        {team.map((member) => (
                            <div key={member.name} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm text-center card-hover">
                                <div className="text-4xl mb-4">{member.emoji}</div>
                                <h3 className="font-bold text-navy-900">{member.name}</h3>
                                <p className="text-gold-600 text-xs font-medium mb-2">{member.role}</p>
                                <p className="text-gray-500 text-xs">{member.bio}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Disclosure */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
                    <h3 className="font-bold text-yellow-800 mb-2">Important Disclosure</h3>
                    <p className="text-yellow-700 text-sm leading-relaxed">
                        HFinTech participates in affiliate marketing programs and may receive commissions from products and services featured on this site. This does not influence our editorial content. We only recommend products we genuinely believe provide value. See our <Link href="/affiliate-disclosure" className="underline font-semibold">Affiliate Disclosure</Link> for more details.
                    </p>
                </div>
            </div>
        </div>
    );
}
