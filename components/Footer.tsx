import Link from "next/link";
import { TrendingUp, Twitter, Linkedin, Youtube, Mail } from "lucide-react";

const footerLinks = {
    Tools: [
        { label: "Interest Calculator", href: "/calculators#interest" },
        { label: "EMI Calculator", href: "/calculators#emi" },
        { label: "SIP Calculator", href: "/calculators#sip" },
        { label: "Mortgage Calculator", href: "/mortgage" },
        { label: "Crypto ROI Calculator", href: "/calculators#crypto-roi" },
    ],
    Markets: [
        { label: "Crypto Tracker", href: "/crypto" },
        { label: "Stock Screener", href: "/stocks" },
        { label: "Credit Cards", href: "/credit-cards" },
        { label: "Insurance Plans", href: "/insurance" },
        { label: "Home Loans", href: "/mortgage" },
    ],
    Resources: [
        { label: "Blog", href: "/blog" },
        { label: "About HFinTech", href: "/about" },
        { label: "Contact Us", href: "/contact" },
        { label: "Privacy Policy", href: "/privacy-policy" },
        { label: "Disclaimer", href: "/disclaimer" },
    ],
};

export default function Footer() {
    return (
        <footer className="bg-navy-900 text-white">
            {/* Main Footer */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Brand */}
                    <div>
                        <Link href="/" className="flex items-center space-x-2 mb-4">
                            <div className="w-9 h-9 bg-gradient-to-br from-gold-500 to-gold-600 rounded-lg flex items-center justify-center">
                                <TrendingUp className="w-5 h-5 text-navy-900" strokeWidth={2.5} />
                            </div>
                            <span className="font-bold text-xl">
                                H<span className="text-gold-500">FinTech</span>
                            </span>
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed mb-6">
                            Your Smart Guide to Personal Finance & Crypto. Free tools, expert articles, and real-time market data to help you make better financial decisions.
                        </p>
                        <div className="flex space-x-3">
                            {[
                                { Icon: Twitter, href: "#", label: "Twitter" },
                                { Icon: Linkedin, href: "#", label: "LinkedIn" },
                                { Icon: Youtube, href: "#", label: "YouTube" },
                                { Icon: Mail, href: "mailto:hello@hfintech.com", label: "Email" },
                            ].map(({ Icon, href, label }) => (
                                <a
                                    key={label}
                                    href={href}
                                    aria-label={label}
                                    className="w-9 h-9 bg-white/10 hover:bg-gold-500 hover:text-navy-900 rounded-lg flex items-center justify-center transition-all duration-200"
                                >
                                    <Icon className="w-4 h-4" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links */}
                    {Object.entries(footerLinks).map(([title, links]) => (
                        <div key={title}>
                            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
                                {title}
                            </h3>
                            <ul className="space-y-2">
                                {links.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            href={link.href}
                                            className="text-gray-400 hover:text-gold-500 text-sm transition-colors"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            {/* Disclaimer Bar */}
            <div className="border-t border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <p className="text-gray-500 text-xs leading-relaxed text-center mb-3">
                        <strong className="text-gray-400">⚠️ Financial Disclaimer:</strong> The information on HFinTech is for educational purposes only and does not constitute financial advice. Past performance is not indicative of future results. Crypto and stock investments involve significant risk. Always consult a qualified financial advisor before making investment decisions.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                        <p className="text-gray-500 text-xs">
                            © {new Date().getFullYear()} HFinTech. All rights reserved.
                        </p>
                        <div className="flex items-center space-x-4 text-xs">
                            <Link href="/privacy-policy" className="text-gray-500 hover:text-gray-300 transition-colors">Privacy</Link>
                            <Link href="/disclaimer" className="text-gray-500 hover:text-gray-300 transition-colors">Disclaimer</Link>
                            <Link href="/affiliate-disclosure" className="text-gray-500 hover:text-gray-300 transition-colors">Affiliate Disclosure</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
