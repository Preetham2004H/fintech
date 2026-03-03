import type { Metadata } from "next";
import Link from "next/link";
import BlogCard from "@/components/BlogCard";
import { blogPosts } from "@/lib/api";
import AdUnit from "@/components/AdUnit";

export const metadata: Metadata = {
    title: "Personal Finance Blog – Crypto, Stocks, Credit Cards & More",
    description: "Expert articles on personal finance, cryptocurrency, stock investing, credit cards, insurance, and mortgage. Make smarter money decisions today.",
};

const categories = ["All", "Credit Cards", "Personal Finance", "Crypto", "Mortgage", "Insurance", "Stocks"];

export default function BlogPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <section className="bg-navy-900 py-12">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h1 className="text-4xl font-extrabold text-white mb-3">
                        📰 Finance <span className="text-gold-500">Blog</span>
                    </h1>
                    <p className="text-gray-300 max-w-2xl mx-auto">Expert guides, how-tos, and insights on personal finance, crypto, stocks, and more.</p>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <AdUnit format="leaderboard" className="mb-8 flex justify-center" />

                {/* Category Pills */}
                <div className="flex flex-wrap gap-2 mb-8">
                    {categories.map((cat) => (
                        <Link key={cat} href={`/blog?category=${cat}`}
                            className="px-4 py-2 rounded-full text-sm font-medium bg-white border border-gray-200 text-gray-600 hover:bg-navy-900 hover:text-white hover:border-navy-900 transition-all">
                            {cat}
                        </Link>
                    ))}
                </div>

                {/* Featured Post */}
                <div className="mb-10">
                    <Link href={`/blog/${blogPosts[0].slug}`}>
                        <div className="group relative bg-navy-900 rounded-3xl overflow-hidden h-72 flex items-end p-8 hover:shadow-2xl transition-all duration-300">
                            <div className="absolute inset-0 bg-gradient-to-tr from-navy-900 via-navy-800/80 to-transparent" />
                            <div className="relative z-10">
                                <span className="inline-block bg-gold-500 text-navy-900 text-xs font-bold px-3 py-1 rounded-full mb-3">{blogPosts[0].category}</span>
                                <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2 group-hover:text-gold-400 transition-colors">{blogPosts[0].title}</h2>
                                <p className="text-gray-300 text-sm max-w-xl">{blogPosts[0].excerpt}</p>
                                <div className="flex items-center gap-4 mt-4 text-gray-400 text-xs">
                                    <span>{blogPosts[0].readTime}</span>
                                    <span>{new Date(blogPosts[0].date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>

                {/* All Posts Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                    {blogPosts.map((post) => <BlogCard key={post.slug} post={post} />)}
                </div>

                <AdUnit format="rectangle" className="mt-6 flex justify-center" />
            </div>
        </div>
    );
}
