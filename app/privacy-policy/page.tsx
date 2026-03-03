import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Privacy Policy – HFinTech",
    description: "HFinTech privacy policy detailing data collection practices, Google AdSense cookies, and your rights as a user.",
};

export default function PrivacyPolicyPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <section className="bg-navy-900 py-12">
                <div className="max-w-4xl mx-auto px-4">
                    <h1 className="text-3xl font-extrabold text-white">Privacy Policy</h1>
                    <p className="text-gray-400 mt-2 text-sm">Last updated: March 1, 2025</p>
                </div>
            </section>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
                <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm prose prose-sm max-w-none text-gray-600 space-y-6">
                    {[
                        { title: "Information We Collect", content: "HFinTech collects information you provide when using our contact forms (name, email, message). We also collect usage data through Google Analytics to understand how visitors use our site, including page views, session duration, and geographic location." },
                        { title: "Google AdSense & Cookies", content: "HFinTech uses Google AdSense to display advertisements. Google uses cookies to serve ads based on your prior visits to our site or other sites on the Internet. Google's use of advertising cookies enables it and its partners to serve ads based on your visit to HFinTech and/or other sites on the Internet. You may opt out of personalized advertising by visiting Google Ads Settings. We also use Google Analytics which sets cookies to help us analyze how users interact with our site." },
                        { title: "Third-Party Services", content: "We use: Google Analytics (usage tracking), Google AdSense (advertising), CoinGecko API (crypto price data - no personal data shared), and Formspree/EmailJS for contact forms. These services have their own privacy policies which we encourage you to review." },
                        { title: "Data Retention", content: "We retain contact form submissions for 90 days. Analytics data is retained for 26 months as per Google Analytics default settings. We do not sell, trade, or transfer your personal information to third parties." },
                        { title: "Your Rights", content: "You have the right to access, correct, or delete your personal data. You can opt out of personalized ads through your Google account settings. To request deletion of your data, contact us at privacy@hfintech.com." },
                        { title: "Children's Privacy", content: "HFinTech does not knowingly collect personal information from children under 13. If you believe a child has provided us with personal information, please contact us immediately at privacy@hfintech.com." },
                        { title: "Changes to This Policy", content: "We may update this Privacy Policy periodically. Changes will be posted on this page with an updated date. Continued use of our site after changes constitutes acceptance of the updated policy." },
                        { title: "Contact Us", content: "If you have questions about this Privacy Policy, contact us at privacy@hfintech.com or through our Contact page." },
                    ].map(({ title, content }) => (
                        <div key={title}>
                            <h2 className="text-lg font-bold text-navy-900 mb-2">{title}</h2>
                            <p className="text-gray-600 text-sm leading-relaxed">{content}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
