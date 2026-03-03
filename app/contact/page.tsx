"use client";
import { useState } from "react";
import type { FormEvent } from "react";
import { Mail, MapPin, MessageSquare, Send, CheckCircle } from "lucide-react";

export default function ContactPage() {
    const [submitted, setSubmitted] = useState(false);
    const [form, setForm] = useState({ name: "", email: "", message: "" });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <section className="bg-navy-900 py-16">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h1 className="text-4xl font-extrabold text-white mb-4">📬 Contact <span className="text-gold-500">Us</span></h1>
                    <p className="text-gray-300 text-lg">Have a question, feedback, or collaboration proposal? We'd love to hear from you.</p>
                </div>
            </section>

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Form */}
                    <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                        {submitted ? (
                            <div className="text-center py-12">
                                <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
                                <h3 className="text-2xl font-bold text-navy-900 mb-2">Message Sent!</h3>
                                <p className="text-gray-500">Thanks for reaching out. We'll get back to you within 24 hours.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-5">
                                <h2 className="text-xl font-bold text-navy-900 mb-6">Send a Message</h2>
                                {[
                                    { id: "name", label: "Your Name", type: "text", placeholder: "John Smith" },
                                    { id: "email", label: "Email Address", type: "email", placeholder: "john@example.com" },
                                ].map(({ id, label, type, placeholder }) => (
                                    <div key={id}>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
                                        <input
                                            id={id} type={type} required placeholder={placeholder}
                                            value={form[id as keyof typeof form]}
                                            onChange={(e) => setForm((prev) => ({ ...prev, [id]: e.target.value }))}
                                            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-gold-500 focus:outline-none"
                                        />
                                    </div>
                                ))}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                                    <textarea
                                        required rows={5} placeholder="Tell us what's on your mind..."
                                        value={form.message}
                                        onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
                                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-gold-500 focus:outline-none resize-none"
                                    />
                                </div>
                                <button type="submit"
                                    className="w-full flex items-center justify-center gap-2 py-3.5 bg-navy-900 hover:bg-navy-800 text-white font-semibold rounded-xl transition-all hover:scale-[1.01] active:scale-[0.99]">
                                    <Send className="w-4 h-4" /> Send Message
                                </button>
                            </form>
                        )}
                    </div>

                    {/* Info */}
                    <div className="space-y-6">
                        {[
                            { icon: Mail, title: "Email", value: "hello@hfintech.com", desc: "We respond within 24 hours" },
                            { icon: MessageSquare, title: "Advertise With Us", value: "ads@hfintech.com", desc: "500K+ monthly readers" },
                            { icon: MapPin, title: "Content Partnerships", value: "partnerships@hfintech.com", desc: "Guest posts & collaborations" },
                        ].map(({ icon: Icon, title, value, desc }) => (
                            <div key={title} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex gap-4">
                                <div className="w-10 h-10 bg-gold-50 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <Icon className="w-5 h-5 text-gold-600" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-navy-900 text-sm">{title}</h3>
                                    <p className="text-gold-600 font-medium text-sm mt-1">{value}</p>
                                    <p className="text-gray-400 text-xs mt-0.5">{desc}</p>
                                </div>
                            </div>
                        ))}

                        <div className="bg-navy-900 rounded-2xl p-6 text-white">
                            <h3 className="font-bold mb-2">💼 Advertising Opportunities</h3>
                            <p className="text-gray-300 text-sm leading-relaxed">
                                HFinTech reaches 500K+ monthly readers in the personal finance, crypto, and investing niche. We offer sponsored content, display advertising, and email newsletter sponsorships.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
