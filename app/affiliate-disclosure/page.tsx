import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Affiliate Disclosure – HFinTech",
    description: "HFinTech affiliate disclosure. Learn how we may earn commissions from products and services featured on our website.",
};

export default function AffiliateDisclosurePage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <section className="bg-navy-900 py-12">
                <div className="max-w-4xl mx-auto px-4">
                    <h1 className="text-3xl font-extrabold text-white">Affiliate Disclosure</h1>
                    <p className="text-gray-400 mt-2 text-sm">Last updated: March 1, 2025</p>
                </div>
            </section>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
                <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm space-y-6">
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-blue-800 text-sm">
                        <strong>Summary:</strong> HFinTech may earn commissions when you click on links to products or services we recommend. This does not affect our editorial independence or the price you pay.
                    </div>
                    {[
                        { title: "What is Affiliate Marketing?", content: "Affiliate marketing means we may receive a commission when you click on a link to a product or service and make a purchase or sign up. Think of it as a referral fee paid by the company — you pay nothing extra, and often get the same or better price than going directly to the site." },
                        { title: "What Products We Partner With", content: "HFinTech has affiliate relationships with credit card issuers, insurance companies, brokerage platforms, cryptocurrency exchanges, and financial tools. We clearly label sponsored content and affiliate links where applicable." },
                        { title: "Our Editorial Standards", content: "Affiliate relationships do NOT influence our editorial content or reviews. We evaluate products based on features, fees, customer reviews, and overall value. We will never recommend a product we don't believe provides genuine value to our readers, regardless of affiliate compensation." },
                        { title: "Compensation Disclosure", content: "The credit card offers that appear on HFinTech are from companies from which we may receive affiliate compensation. We may also receive compensation for sponsored articles and display advertising. This compensation may impact how and where products appear on this site." },
                        { title: "FTC Compliance", content: "In accordance with the Federal Trade Commission (FTC) guidelines on affiliate marketing, HFinTech discloses that we participate in affiliate programs. When you see a recommendation or review on our site, assume there may be a financial relationship between HFinTech and the referenced company." },
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
