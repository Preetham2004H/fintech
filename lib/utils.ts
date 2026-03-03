import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatCurrency(value: number, currency = "USD"): string {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(value);
}

export function formatNumber(value: number, decimals = 2): string {
    return new Intl.NumberFormat("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
    }).format(value);
}

export function formatCompact(value: number): string {
    return new Intl.NumberFormat("en-US", {
        notation: "compact",
        maximumFractionDigits: 2,
    }).format(value);
}

export function formatPercent(value: number, decimals = 2): string {
    return `${value >= 0 ? "+" : ""}${value.toFixed(decimals)}%`;
}

export function calculateEMI(
    principal: number,
    annualRate: number,
    tenureMonths: number
): number {
    const monthlyRate = annualRate / 12 / 100;
    if (monthlyRate === 0) return principal / tenureMonths;
    const emi =
        (principal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) /
        (Math.pow(1 + monthlyRate, tenureMonths) - 1);
    return emi;
}

export function calculateCompoundInterest(
    principal: number,
    rate: number,
    time: number,
    frequency: number
): number {
    return principal * Math.pow(1 + rate / 100 / frequency, frequency * time);
}

export function calculateSIP(
    monthlyAmount: number,
    annualReturn: number,
    durationYears: number
): number {
    const monthlyRate = annualReturn / 12 / 100;
    const months = durationYears * 12;
    return (
        monthlyAmount *
        ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) *
        (1 + monthlyRate)
    );
}

export function slugify(text: string): string {
    return text
        .toLowerCase()
        .replace(/[^\w ]+/g, "")
        .replace(/ +/g, "-");
}

export function truncate(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
}

export const CHART_COLORS = {
    navy: "rgba(10, 22, 40, 0.8)",
    gold: "rgba(245, 158, 11, 0.8)",
    blue: "rgba(59, 130, 246, 0.8)",
    green: "rgba(16, 185, 129, 0.8)",
    red: "rgba(239, 68, 68, 0.8)",
    purple: "rgba(139, 92, 246, 0.8)",
};
