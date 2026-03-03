const COINGECKO_BASE = "https://api.coingecko.com/api/v3";

export interface CryptoPrice {
    id: string;
    symbol: string;
    name: string;
    image: string;
    current_price: number;
    market_cap: number;
    market_cap_rank: number;
    price_change_percentage_24h: number;
    total_volume: number;
    high_24h: number;
    low_24h: number;
    circulating_supply: number;
}

export interface FearGreedData {
    value: string;
    value_classification: string;
    timestamp: string;
}

export async function fetchCryptoPrices(
    coins = 20,
    currency = "usd"
): Promise<CryptoPrice[]> {
    try {
        const res = await fetch(
            `${COINGECKO_BASE}/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=${coins}&page=1&sparkline=false&price_change_percentage=24h`,
            { next: { revalidate: 60 } }
        );
        if (!res.ok) throw new Error("Failed to fetch crypto prices");
        return res.json();
    } catch {
        return getMockCryptoData();
    }
}

export async function fetchFearGreedIndex(): Promise<FearGreedData | null> {
    try {
        const res = await fetch("https://api.alternative.me/fng/", {
            next: { revalidate: 3600 },
        });
        if (!res.ok) return null;
        const data = await res.json();
        return data.data?.[0] || null;
    } catch {
        return { value: "52", value_classification: "Neutral", timestamp: Date.now().toString() };
    }
}

// Mock data fallback
function getMockCryptoData(): CryptoPrice[] {
    return [
        { id: "bitcoin", symbol: "btc", name: "Bitcoin", image: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png", current_price: 67432, market_cap: 1326000000000, market_cap_rank: 1, price_change_percentage_24h: 2.34, total_volume: 28000000000, high_24h: 68100, low_24h: 65800, circulating_supply: 19700000 },
        { id: "ethereum", symbol: "eth", name: "Ethereum", image: "https://assets.coingecko.com/coins/images/279/large/ethereum.png", current_price: 3521, market_cap: 422000000000, market_cap_rank: 2, price_change_percentage_24h: 1.87, total_volume: 14000000000, high_24h: 3600, low_24h: 3450, circulating_supply: 120000000 },
        { id: "tether", symbol: "usdt", name: "Tether", image: "https://assets.coingecko.com/coins/images/325/large/Tether.png", current_price: 1.00, market_cap: 115000000000, market_cap_rank: 3, price_change_percentage_24h: 0.01, total_volume: 45000000000, high_24h: 1.00, low_24h: 0.99, circulating_supply: 115000000000 },
        { id: "binancecoin", symbol: "bnb", name: "BNB", image: "https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png", current_price: 428, market_cap: 64000000000, market_cap_rank: 4, price_change_percentage_24h: -0.54, total_volume: 1800000000, high_24h: 440, low_24h: 420, circulating_supply: 149000000 },
        { id: "solana", symbol: "sol", name: "Solana", image: "https://assets.coingecko.com/coins/images/4128/large/solana.png", current_price: 184, market_cap: 82000000000, market_cap_rank: 5, price_change_percentage_24h: 3.21, total_volume: 3200000000, high_24h: 188, low_24h: 178, circulating_supply: 446000000 },
        { id: "ripple", symbol: "xrp", name: "XRP", image: "https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png", current_price: 0.62, market_cap: 34000000000, market_cap_rank: 6, price_change_percentage_24h: -1.12, total_volume: 1400000000, high_24h: 0.64, low_24h: 0.61, circulating_supply: 55000000000 },
        { id: "cardano", symbol: "ada", name: "Cardano", image: "https://assets.coingecko.com/coins/images/975/large/cardano.png", current_price: 0.48, market_cap: 17000000000, market_cap_rank: 7, price_change_percentage_24h: 0.88, total_volume: 520000000, high_24h: 0.49, low_24h: 0.47, circulating_supply: 35000000000 },
        { id: "dogecoin", symbol: "doge", name: "Dogecoin", image: "https://assets.coingecko.com/coins/images/5/large/dogecoin.png", current_price: 0.163, market_cap: 23000000000, market_cap_rank: 8, price_change_percentage_24h: 5.43, total_volume: 2100000000, high_24h: 0.172, low_24h: 0.156, circulating_supply: 143000000000 },
        { id: "avalanche-2", symbol: "avax", name: "Avalanche", image: "https://assets.coingecko.com/coins/images/12559/large/Avalanche_Circle_RedWhite_Trans.png", current_price: 38.2, market_cap: 15600000000, market_cap_rank: 9, price_change_percentage_24h: 2.11, total_volume: 620000000, high_24h: 39.5, low_24h: 37.2, circulating_supply: 408000000 },
        { id: "polkadot", symbol: "dot", name: "Polkadot", image: "https://assets.coingecko.com/coins/images/12171/large/polkadot.png", current_price: 7.82, market_cap: 10200000000, market_cap_rank: 10, price_change_percentage_24h: -0.33, total_volume: 340000000, high_24h: 8.10, low_24h: 7.70, circulating_supply: 1300000000 },
    ];
}

// Blog posts (static data)
export interface BlogPost {
    slug: string;
    title: string;
    excerpt: string;
    category: string;
    date: string;
    readTime: string;
    image: string;
    content: string;
    tags: string[];
}

export const blogPosts: BlogPost[] = [
    {
        slug: "10-best-credit-cards-cashback-2025",
        title: "10 Best Credit Cards for Cashback in 2025",
        excerpt: "Maximize your rewards with these top cashback credit cards that put money back in your pocket on every purchase.",
        category: "Credit Cards",
        date: "2025-03-01",
        readTime: "8 min read",
        image: "/images/blog/credit-cards.jpg",
        tags: ["credit cards", "cashback", "rewards", "personal finance"],
        content: `## Introduction

Choosing the right cashback credit card can save you hundreds or even thousands of dollars annually. In this comprehensive guide, we'll break down the 10 best cashback credit cards available in 2025.

## What to Look for in a Cashback Card

Before diving into our top picks, here's what you should consider:

- **Cashback Rate**: Higher is better, but look at which categories earn the most
- **Annual Fee**: Some premium cards charge fees that eat into your rewards
- **Sign-up Bonus**: Many cards offer lucrative welcome bonuses
- **Redemption Options**: Flexibility in how you redeem rewards matters

## Top 10 Cashback Cards

### 1. Chase Freedom Unlimited
One of the most versatile cashback cards available, offering:
- 1.5% unlimited cashback on every purchase
- 5% on travel booked through Chase
- 3% on dining and drugstores
- $200 sign-up bonus after spending $500 in first 3 months

### 2. Citi Double Cash Card
The simplest and most straightforward cashback card:
- 2% cashback on everything (1% when you buy, 1% when you pay)
- No annual fee
- No rotating categories to track

### 3. American Express Blue Cash Preferred
Best for groceries and streaming:
- 6% cashback at US supermarkets (up to $6,000/year)
- 6% on select US streaming services
- 3% on transit and gas
- $300 statement credit welcome bonus

## Tips to Maximize Your Cashback

1. **Use the right card for each category** - Different cards offer different rates for different spending categories
2. **Meet the minimum spend for bonuses** - Sign-up bonuses are often worth $200-$500
3. **Pay your balance in full** - Interest charges will quickly outweigh any cashback earned
4. **Look for quarterly bonuses** - Some cards offer 5% in rotating categories

## Conclusion

The best cashback credit card depends on your spending habits. Analyze where you spend the most money and choose a card that maximizes rewards in those categories. Always pay your balance in full to avoid interest charges that would negate your cashback earnings.`,
    },
    {
        slug: "how-to-build-emergency-fund",
        title: "How to Build an Emergency Fund",
        excerpt: "Learn the strategies to build a robust emergency fund that protects you from financial shocks and unexpected expenses.",
        category: "Personal Finance",
        date: "2025-02-28",
        readTime: "6 min read",
        image: "/images/blog/emergency-fund.jpg",
        tags: ["emergency fund", "savings", "financial planning", "budgeting"],
        content: `## Why You Need an Emergency Fund

An emergency fund is your financial safety net. It's money set aside specifically for unexpected expenses like job loss, medical emergencies, car repairs, or home maintenance issues.

## How Much Should You Save?

Financial experts recommend saving **3-6 months of living expenses**. Here's how to calculate your target:

1. Calculate your monthly essential expenses (rent/mortgage, utilities, food, insurance)
2. Multiply by 3 (minimum) to 6 (recommended)
3. This is your emergency fund goal

## Where to Keep Your Emergency Fund

Your emergency fund should be:
- **Liquid**: Easily accessible when needed
- **Safe**: Not subject to market volatility
- **Separate**: Not mixed with your regular spending account

**Best options:**
- High-yield savings account (0.5-5% APY)
- Money market account
- Short-term CDs (for portion you won't need immediately)

## Steps to Build Your Emergency Fund

### Step 1: Set a Monthly Savings Goal
Start with whatever you can afford, even $50-100/month. Consistency matters more than amount.

### Step 2: Automate Your Savings
Set up automatic transfers to your emergency fund on payday. You won't miss what you don't see.

### Step 3: Cut Unnecessary Expenses
Review your bank statements and identify spending leaks:
- Unused subscriptions
- Dining out too frequently
- Impulse purchases

### Step 4: Boost Your Income
Consider side hustles or selling unused items to accelerate your savings.

## Conclusion

Building an emergency fund takes time and discipline, but the financial security it provides is priceless. Start small, stay consistent, and you'll reach your goal faster than you think.`,
    },
    {
        slug: "bitcoin-vs-ethereum-which-to-buy",
        title: "Bitcoin vs Ethereum: Which Should You Buy?",
        excerpt: "An in-depth comparison of Bitcoin and Ethereum to help you decide which cryptocurrency deserves a place in your portfolio.",
        category: "Crypto",
        date: "2025-02-25",
        readTime: "10 min read",
        image: "/images/blog/btc-eth.jpg",
        tags: ["bitcoin", "ethereum", "crypto", "investing", "blockchain"],
        content: `## Bitcoin vs Ethereum: The Ultimate Showdown

Both Bitcoin and Ethereum are the giants of the cryptocurrency world, but they serve fundamentally different purposes. Understanding these differences is crucial before investing.

## Bitcoin (BTC): Digital Gold

**What it is**: Bitcoin was created in 2009 as a peer-to-peer digital currency. It's primarily a store of value and medium of exchange.

**Key characteristics:**
- Fixed supply of 21 million coins
- Proof of Work consensus mechanism
- Longest track record in crypto
- Most widely recognized and accepted
- High institutional adoption

**Pros:**
- Most secure and battle-tested blockchain
- Best liquidity and market depth
- Recognized as a legitimate store of value
- Simple, clear value proposition

**Cons:**
- Limited programmability
- Higher transaction fees during congestion
- Slower transaction times
- Energy-intensive mining

## Ethereum (ETH): The World Computer

**What it is**: Ethereum is a programmable blockchain platform that enables smart contracts and decentralized applications (dApps).

**Key characteristics:**
- No fixed supply (but net deflationary since EIP-1559)
- Proof of Stake consensus (since The Merge)
- Powers 80%+ of DeFi and NFT ecosystems
- Foundation for thousands of tokens

**Pros:**
- Wide ecosystem of applications
- Smart contract functionality
- DeFi and NFT opportunities
- More energy efficient than Bitcoin

**Cons:**
- More complex technology
- Higher regulatory risk (SEC scrutiny)
- Competition from other smart contract platforms

## Performance Comparison (2020-2024)

| Period | Bitcoin Return | Ethereum Return |
|--------|---------------|-----------------|
| 2020 | +302% | +469% |
| 2021 | +59% | +400% |
| 2022 | -65% | -67% |
| 2023 | +154% | +90% |

## Which Should You Buy?

**Choose Bitcoin if:**
- You want a simpler, more conservative crypto investment
- You believe in digital gold narrative
- You're concerned about regulatory risks
- You want maximum liquidity

**Choose Ethereum if:**
- You believe in the future of DeFi and Web3
- You want exposure to the broader crypto ecosystem
- You're comfortable with more technological risk
- You want potential for higher upside

**The Best Strategy:** Many investors hold both. A common allocation is 60-70% Bitcoin and 30-40% Ethereum as a core crypto portfolio.

## Conclusion

Both assets have merit in a diversified portfolio. Your choice should depend on your risk tolerance, investment timeline, and belief in their respective use cases. Never invest more than you can afford to lose, and always do your own research.`,
    },
    {
        slug: "mortgage-bad-credit-guide",
        title: "How to Get a Mortgage with Bad Credit",
        excerpt: "Don't let a low credit score stop your homeownership dreams. Here's how to qualify for a mortgage even with imperfect credit.",
        category: "Mortgage",
        date: "2025-02-20",
        readTime: "7 min read",
        image: "/images/blog/mortgage.jpg",
        tags: ["mortgage", "bad credit", "home buying", "loans"],
        content: `## Can You Get a Mortgage with Bad Credit?

Yes, it's possible to get a mortgage with bad credit, but it requires more effort and you may face higher interest rates. Here's everything you need to know.

## Understanding Credit Scores for Mortgages

**Minimum credit score requirements:**
- Conventional loan: 620+
- FHA loan: 500-579 (10% down) or 580+ (3.5% down)
- VA loan: No minimum (lender typically requires 580-620)
- USDA loan: No minimum (lender typically requires 640+)

## Options if Your Credit is Below 620

### 1. FHA Loans
FHA loans are backed by the Federal Housing Administration and are the most accessible option for borrowers with lower credit scores.

**Requirements:**
- Credit score 500+ with 10% down payment
- Credit score 580+ with 3.5% down payment
- Debt-to-income ratio below 43%
- Property must meet FHA standards

### 2. VA Loans (Veterans Only)
If you're a veteran or active military member, VA loans offer:
- No down payment required
- No PMI
- Flexible credit requirements
- Competitive interest rates

### 3. State and Local Programs
Many states offer first-time homebuyer programs with:
- Down payment assistance
- Lower interest rates
- Relaxed credit requirements

## How to Improve Your Credit Before Applying

### Quick Wins (1-3 months)
1. Pay down credit card balances below 30% utilization
2. Dispute errors on your credit report
3. Become an authorized user on a family member's account
4. Don't apply for new credit

### Longer Term (6-12 months)
1. Make all payments on time
2. Pay off collections accounts
3. Build payment history with a secured credit card

## Working with Lenders

**Get pre-approved by multiple lenders.** Different lenders have different requirements and risk tolerance. Shop around for the best rate.

**Consider a mortgage broker** who can match you with lenders that work with lower credit scores.

**Be prepared for higher rates.** A lower credit score means higher risk to the lender, which translates to higher interest rates - sometimes 1-2% higher than prime rates.

## The Real Cost of a Low Credit Score

On a $300,000 mortgage over 30 years:
- 760+ credit score: ~6.5% rate → $1,896/month
- 680-699 credit score: ~7.2% rate → $2,037/month
- 620-639 credit score: ~8.1% rate → $2,224/month

**Difference:** Up to $328/month or $118,000 over the loan term

## Conclusion

Getting a mortgage with bad credit is challenging but achievable. Your best strategy is to explore FHA loans, work on improving your credit score before applying, and shop around with multiple lenders. Even small improvements in your credit score can save you tens of thousands of dollars over the life of your loan.`,
    },
    {
        slug: "best-term-insurance-plans-compared",
        title: "Best Term Insurance Plans Compared",
        excerpt: "Compare the best term life insurance plans in 2025 to find the perfect coverage for you and your family's financial security.",
        category: "Insurance",
        date: "2025-02-15",
        readTime: "9 min read",
        image: "/images/blog/insurance.jpg",
        tags: ["term insurance", "life insurance", "financial planning", "protection"],
        content: `## Why Term Insurance is Your Best Protection

Term life insurance is the purest form of life insurance - it provides coverage for a specific period and pays a death benefit if you pass away during that term. It's the most affordable way to get maximum coverage.

## How Term Insurance Works

You pay regular premiums for a set term (10, 20, or 30 years). If you die during the term, your beneficiaries receive the death benefit. If you outlive the term, coverage ends (unless renewed).

## Top Term Insurance Plans 2025

### 1. Haven Term by Haven Life
**Rating: 9.5/10**

| Feature | Details |
|---------|---------|
| Coverage | $100K - $3M |
| Terms | 10, 15, 20, 25, 30 years |
| Age Range | 18-64 |
| Medical Exam | Not always required |

**Pros:** Completely online process, competitive rates, backed by MassMutual
**Cons:** Age limit of 64

### 2. Banner Life
**Rating: 9.2/10**

Known for competitive rates for older applicants and high coverage amounts.

- Coverage up to $10 million
- Terms from 10 to 40 years
- Excellent financial strength ratings

### 3. Legal & General America
**Rating: 9.0/10**

- No medical exam for qualified applicants
- Very competitive premiums
- Available in all 50 states

## How Much Coverage Do You Need?

A common rule of thumb is **10-12x your annual income**. Consider these factors:
- Outstanding debts (mortgage, loans)
- Future education expenses
- Income your family would need to maintain lifestyle
- Existing savings and investments

**Coverage calculator example:**
- Annual income: $60,000
- Recommended coverage: $600,000 - $720,000

## How to Get the Best Rates

1. **Buy when you're young and healthy** - Rates increase significantly with age
2. **Don't smoke** - Smokers pay 2-4x more than non-smokers
3. **Maintain a healthy weight** - BMI affects your risk classification
4. **Compare multiple quotes** - Rates can vary by 50%+ between insurers
5. **Choose the right term** - Longer terms cost more but lock in your rate

## Term vs Whole Life: Which is Better?

For most people, **term insurance wins** because:
- Premium savings can be invested for better returns
- Coverage is simpler and more transparent
- More affordable, allowing for adequate coverage amounts

The "buy term and invest the difference" strategy typically outperforms whole life insurance for wealth building.

## Conclusion

Term life insurance is an essential financial tool for anyone with dependents or outstanding debts. Compare quotes from multiple providers, choose a term that covers your peak earning years, and secure coverage while you're young and healthy for the best rates.`,
    },
];
