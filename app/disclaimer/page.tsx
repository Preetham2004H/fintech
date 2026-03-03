import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Financial Disclaimer – HFinTech",
    description: "Important financial disclaimer from HFinTech. All content is for educational purposes only and does not constitute financial advice.",
};

export default function DisclaimerPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <section className="bg-navy-900 py-12">
                <div className="max-w-4xl mx-auto px-4">
                    <h1 className="text-3xl font-extrabold text-white">⚠️ Financial Disclaimer</h1>
                    <p className="text-gray-400 mt-2 text-sm">Last updated: March 1, 2025</p>
                </div>
            </section>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
                <div className="bg-yellow-50 border-2 border-yellow-300 rounded-2xl p-6 mb-8">
                    <p className="text-yellow-800 font-semibold text-center">
                        ⚠️ The content on HFinTech is for EDUCATIONAL PURPOSES ONLY and does NOT constitute financial, investment, tax, or legal advice.
                    </p>
                </div>
                <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm space-y-6">
                    {[
                        { title: "Not Financial Advice", content: "HFinTech and its authors are not licensed financial advisors, registered investment advisors, or certified financial planners. Nothing on this website should be construed as financial advice. Always consult a qualified financial professional before making any investment decisions." },
                        { title: "Investment Risk", content: "All investments carry risk, including the possible loss of principal. Past performance is not indicative of future results. Cryptocurrency, stocks, and other financial instruments can fluctuate significantly in value. You could lose some or all of your investment." },
                        { title: "Cryptocurrency Risks", content: "Cryptocurrency is a highly speculative asset class. Digital assets are subject to extreme price volatility, regulatory uncertainty, security risks (hacks, loss of keys), and potential total loss. Never invest more than you can afford to lose completely." },
                        { title: "Calculator Accuracy", content: "Our financial calculators provide estimates based on the inputs provided. Results are for illustrative purposes only. Actual results will vary based on factors including but not limited to: market conditions, fees, taxes, inflation, and investment choices." },
                        { title: "Third-Party Information", content: "HFinTech may reference or link to information from third-party sources. We do not guarantee the accuracy, completeness, or timeliness of such information. References to third-party products or services do not constitute endorsement unless explicitly stated." },
                        { title: "No Guarantees", content: "HFinTech makes no representations or warranties about the completeness, reliability, suitability, or availability of the information on this site. Any reliance you place on such information is strictly at your own risk." },
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
