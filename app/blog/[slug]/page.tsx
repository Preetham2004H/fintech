import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar, Tag } from "lucide-react";
import { blogPosts } from "@/lib/api";
import BlogCard from "@/components/BlogCard";
import AdUnit from "@/components/AdUnit";

interface Props { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const post = blogPosts.find((p) => p.slug === slug);
    if (!post) return { title: "Article Not Found" };
    return {
        title: post.title,
        description: post.excerpt,
        openGraph: { title: post.title, description: post.excerpt, type: "article", publishedTime: post.date },
    };
}

export function generateStaticParams() {
    return blogPosts.map((post) => ({ slug: post.slug }));
}

function renderContent(content: string) {
    return content.split("\n").map((line, i) => {
        if (line.startsWith("## ")) return <h2 key={i} className="text-2xl font-bold text-navy-900 mt-8 mb-4">{line.slice(3)}</h2>;
        if (line.startsWith("### ")) return <h3 key={i} className="text-xl font-bold text-navy-900 mt-6 mb-3">{line.slice(4)}</h3>;
        if (line.startsWith("#### ")) return <h4 key={i} className="text-lg font-bold text-navy-900 mt-5 mb-2">{line.slice(5)}</h4>;
        if (line.startsWith("**") && line.endsWith("**")) return <p key={i} className="font-bold text-navy-900 mt-4 mb-2">{line.slice(2, -2)}</p>;
        if (line.startsWith("- ")) return <li key={i} className="text-gray-600 ml-4 mb-1 list-disc">{line.slice(2)}</li>;
        if (line.startsWith("| ")) {
            const cells = line.split("|").filter(Boolean).map((c) => c.trim());
            return <tr key={i} className="border-t border-gray-100">{cells.map((c, j) => <td key={j} className="px-3 py-2 text-sm text-gray-600">{c}</td>)}</tr>;
        }
        if (line.startsWith("#")) return null;
        if (!line.trim()) return <div key={i} className="mb-2" />;
        return <p key={i} className="text-gray-600 leading-relaxed mb-3 text-sm" dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>') }} />;
    });
}

export default async function BlogDetailPage({ params }: Props) {
    const { slug } = await params;
    const post = blogPosts.find((p) => p.slug === slug);
    if (!post) notFound();

    const related = blogPosts.filter((p) => p.slug !== slug && p.category === post.category).slice(0, 3);
    const otherRelated = related.length < 3 ? blogPosts.filter((p) => p.slug !== slug && !related.includes(p)).slice(0, 3 - related.length) : [];
    const relatedPosts = [...related, ...otherRelated].slice(0, 3);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <section className="bg-navy-900 py-10">
                <div className="max-w-4xl mx-auto px-4">
                    <Link href="/blog" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 text-sm transition-colors">
                        <ArrowLeft className="w-4 h-4" /> Back to Blog
                    </Link>
                    <div className="inline-block bg-gold-500 text-navy-900 text-xs font-bold px-3 py-1 rounded-full mb-4">{post.category}</div>
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 leading-tight">{post.title}</h1>
                    <div className="flex flex-wrap items-center gap-4 text-gray-400 text-sm">
                        <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{post.readTime}</span>
                        <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
                    </div>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <AdUnit format="leaderboard" className="mb-8 flex justify-center" />

                <div className="grid lg:grid-cols-4 gap-10">
                    {/* Article */}
                    <article className="lg:col-span-3">
                        <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                            <p className="text-lg text-gray-700 font-medium leading-relaxed mb-8 pb-8 border-b border-gray-100">{post.excerpt}</p>
                            <div className="article-content">{renderContent(post.content)}</div>
                        </div>

                        {/* In-Article Ad */}
                        <div className="my-8">
                            <AdUnit format="rectangle" className="flex justify-center" />
                        </div>

                        {/* Tags */}
                        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-8">
                            <div className="flex items-center gap-2 flex-wrap">
                                <Tag className="w-4 h-4 text-gray-400" />
                                {post.tags.map((tag) => (
                                    <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full hover:bg-gold-100 hover:text-gold-700 transition-colors cursor-pointer">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Disclaimer */}
                        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-5 text-sm text-yellow-800">
                            <strong>⚠️ Disclaimer:</strong> This article is for educational purposes only and does not constitute financial advice. Always consult a qualified financial advisor before making investment decisions.
                        </div>
                    </article>

                    {/* Sidebar */}
                    <aside className="lg:col-span-1 space-y-6">
                        {/* TOC */}
                        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm sticky top-24">
                            <h3 className="font-bold text-navy-900 mb-4 text-sm uppercase tracking-wider">In This Article</h3>
                            <nav className="space-y-2">
                                {post.content.split("\n").filter((l) => l.startsWith("## ")).map((heading) => (
                                    <a key={heading} href={`#${heading.slice(3).toLowerCase().replace(/\s+/g, "-")}`}
                                        className="block text-xs text-gray-500 hover:text-gold-600 leading-relaxed transition-colors py-1 border-l-2 border-gray-100 hover:border-gold-500 pl-3">
                                        {heading.slice(3)}
                                    </a>
                                ))}
                            </nav>
                        </div>
                        <AdUnit format="sidebar" />
                    </aside>
                </div>

                {/* Related Posts */}
                {relatedPosts.length > 0 && (
                    <div className="mt-12">
                        <h2 className="text-2xl font-bold text-navy-900 mb-6">Related Articles</h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            {relatedPosts.map((p) => <BlogCard key={p.slug} post={p} />)}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
