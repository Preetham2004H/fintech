"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { TrendingUp, Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/calculators", label: "Calculators" },
    {
        label: "Markets",
        children: [
            { href: "/crypto", label: "₿ Crypto" },
            { href: "/stocks", label: "📈 Stocks" },
        ],
    },
    { href: "/credit-cards", label: "Credit Cards" },
    { href: "/insurance", label: "Insurance" },
    { href: "/mortgage", label: "Mortgage" },
    { href: "/blog", label: "Blog" },
];

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                scrolled
                    ? "bg-navy-900/95 backdrop-blur-md shadow-lg shadow-black/20"
                    : "bg-navy-900"
            )}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2 group">
                        <div className="w-9 h-9 bg-gradient-to-br from-gold-500 to-gold-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                            <TrendingUp className="w-5 h-5 text-navy-900" strokeWidth={2.5} />
                        </div>
                        <span className="text-white font-bold text-xl tracking-tight">
                            H<span className="text-gold-500">FinTech</span>
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden lg:flex items-center space-x-1">
                        {navLinks.map((link) =>
                            link.children ? (
                                <div key={link.label} className="relative">
                                    <button
                                        onMouseEnter={() => setDropdownOpen(true)}
                                        onMouseLeave={() => setDropdownOpen(false)}
                                        className="flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-all"
                                    >
                                        <span>{link.label}</span>
                                        <ChevronDown className="w-3 h-3" />
                                    </button>
                                    {dropdownOpen && (
                                        <div
                                            onMouseEnter={() => setDropdownOpen(true)}
                                            onMouseLeave={() => setDropdownOpen(false)}
                                            className="absolute top-full left-0 mt-1 w-44 bg-navy-900 border border-white/10 rounded-xl shadow-xl overflow-hidden"
                                        >
                                            {link.children.map((child) => (
                                                <Link
                                                    key={child.href}
                                                    href={child.href}
                                                    className="block px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
                                                >
                                                    {child.label}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <Link
                                    key={link.href}
                                    href={link.href!}
                                    className={cn(
                                        "px-3 py-2 rounded-lg text-sm font-medium transition-all",
                                        pathname === link.href
                                            ? "text-gold-500 bg-gold-500/10"
                                            : "text-gray-300 hover:text-white hover:bg-white/10"
                                    )}
                                >
                                    {link.label}
                                </Link>
                            )
                        )}
                    </nav>

                    {/* CTA + Mobile Menu */}
                    <div className="flex items-center space-x-3">
                        <Link
                            href="/calculators"
                            className="hidden sm:flex items-center px-4 py-2 bg-gold-500 hover:bg-gold-600 text-navy-900 font-semibold text-sm rounded-lg transition-all hover:scale-105 active:scale-95"
                        >
                            Free Tools
                        </Link>
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="lg:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all"
                        >
                            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {menuOpen && (
                    <div className="lg:hidden border-t border-white/10 py-4 space-y-1 animate-slide-up">
                        {navLinks.map((link) =>
                            link.children ? (
                                <div key={link.label}>
                                    <div className="px-3 py-2 text-xs font-semibold text-gold-500 uppercase tracking-wider">
                                        {link.label}
                                    </div>
                                    {link.children.map((child) => (
                                        <Link
                                            key={child.href}
                                            href={child.href}
                                            onClick={() => setMenuOpen(false)}
                                            className="block pl-6 pr-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                                        >
                                            {child.label}
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <Link
                                    key={link.href}
                                    href={link.href!}
                                    onClick={() => setMenuOpen(false)}
                                    className={cn(
                                        "block px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                                        pathname === link.href
                                            ? "text-gold-500 bg-gold-500/10"
                                            : "text-gray-300 hover:text-white hover:bg-white/10"
                                    )}
                                >
                                    {link.label}
                                </Link>
                            )
                        )}
                        <Link
                            href="/calculators"
                            onClick={() => setMenuOpen(false)}
                            className="block mt-2 px-3 py-2 bg-gold-500 text-navy-900 font-semibold text-sm rounded-lg text-center"
                        >
                            Free Financial Tools
                        </Link>
                    </div>
                )}
            </div>
        </header>
    );
}
