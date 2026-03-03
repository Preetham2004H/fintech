import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";
import { type BlogPost } from "@/lib/api";

const categoryColors: Record<string, string> = {
    "Credit Cards": "bg-purple-100 text-purple-700",
    "Personal Finance": "bg-blue-100 text-blue-700",
    Crypto: "bg-orange-100 text-orange-700",
    Mortgage: "bg-green-100 text-green-700",
    Insurance: "bg-teal-100 text-teal-700",
    Stocks: "bg-red-100 text-red-700",
};

const categoryEmoji: Record<string, string> = {
    "Credit Cards": "💳",
    "Personal Finance": "💰",
    Crypto: "₿",
    Mortgage: "🏠",
    Insurance: "🛡️",
    Stocks: "📈",
};

interface BlogCardProps {
    post: BlogPost;
    compact?: boolean;
}

export default function BlogCard({ post, compact = false }: BlogCardProps) {
    const colorClass = categoryColors[post.category] || "bg-gray-100 text-gray-700";
    const emoji = categoryEmoji[post.category] || "📄";

    return (
        <Link href={`/blog/${post.slug}`}>
            <article className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 card-hover h-full flex flex-col border border-gray-100">
                {/* Image Placeholder */}
                <div className="bg-gradient-to-br from-navy-900 to-navy-700 h-48 relative overflow-hidden flex items-center justify-center">
                    <span className="text-6xl opacity-30 group-hover:scale-110 transition-transform duration-500">
                        {emoji}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-900/60 to-transparent" />
                    <div className="absolute bottom-3 left-4">
                        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${colorClass}`}>
                            {post.category}
                        </span>
                    </div>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1">
                    <h3 className="font-bold text-navy-900 text-base leading-snug mb-2 group-hover:text-gold-600 transition-colors line-clamp-2">
                        {post.title}
                    </h3>
                    {!compact && (
                        <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2 flex-1">
                            {post.excerpt}
                        </p>
                    )}
                    <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
                        <div className="flex items-center gap-1 text-gray-400 text-xs">
                            <Clock className="w-3 h-3" />
                            <span>{post.readTime}</span>
                        </div>
                        <span className="text-xs text-gray-400">
                            {new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                        </span>
                    </div>
                    <div className="mt-3 flex items-center text-gold-600 text-xs font-semibold group-hover:gap-2 gap-1 transition-all">
                        <span>Read Article</span>
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </div>
                </div>
            </article>
        </Link>
    );
}
