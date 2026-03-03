"use client";

interface AdUnitProps {
    slot?: string;
    format?: "auto" | "rectangle" | "leaderboard" | "sidebar";
    className?: string;
    label?: string;
}

export default function AdUnit({
    slot = "XXXXXXXXXX",
    format = "auto",
    className = "",
    label = "Advertisement",
}: AdUnitProps) {
    const dimensions: Record<string, string> = {
        auto: "w-full min-h-[90px]",
        rectangle: "w-full max-w-[336px] h-[280px]",
        leaderboard: "w-full max-w-[728px] h-[90px]",
        sidebar: "w-full max-w-[300px] h-[600px]",
    };

    return (
        <div className={`flex flex-col items-center ${className}`}>
            <p className="text-xs text-gray-400 uppercase tracking-widest mb-2 font-medium">
                {label}
            </p>
            <div
                className={`${dimensions[format]} bg-gradient-to-br from-gray-100 to-gray-200 border border-dashed border-gray-300 rounded-xl flex items-center justify-center`}
            >
                <div className="text-center p-4">
                    <div className="text-gray-400 text-sm font-medium mb-1">Ad Space</div>
                    <ins
                        className="adsbygoogle"
                        style={{ display: "block" }}
                        data-ad-client="ca-pub-XXXXXXXXXX"
                        data-ad-slot={slot}
                        data-ad-format={format === "auto" ? "auto" : undefined}
                        data-full-width-responsive="true"
                    />
                </div>
            </div>
        </div>
    );
}
