import { MetricExplanation } from "@/types/stock";

export const metricExplanations: Record<string, MetricExplanation> = {
  peRatio: {
    name: "P/E Ratio (Price-to-Earnings)",
    shortExplanation: "How much investors pay for each rupee of profit",
    detailedExplanation: "The P/E ratio tells you how much you're paying for ₹1 of the company's earnings. Think of it like buying a business - if a shop earns ₹10 lakh/year and costs ₹1 crore, its P/E is 10. You'd recover your investment in 10 years from profits alone.",
    goodRange: "10-25 for most sectors. Lower may mean undervalued, higher may mean growth expectations.",
    example: "If a stock has P/E of 20 and EPS of ₹50, the stock price would be ₹1,000 (20 × ₹50)."
  },
  marketCap: {
    name: "Market Capitalization",
    shortExplanation: "Total value of all company shares in the market",
    detailedExplanation: "Market cap shows how much the entire company is worth in the stock market. It's calculated by multiplying the current stock price by total shares outstanding. It helps classify companies as large-cap (>₹20,000 Cr), mid-cap (₹5,000-20,000 Cr), or small-cap (<₹5,000 Cr).",
    goodRange: "Larger companies are generally more stable but may grow slower.",
    example: "If a company has 10 crore shares at ₹500 each, market cap is ₹5,000 crores."
  },
  eps: {
    name: "Earnings Per Share (EPS)",
    shortExplanation: "Profit earned for each share you own",
    detailedExplanation: "EPS tells you how much profit the company made per share. If you own 100 shares and EPS is ₹10, the company earned ₹1,000 on your behalf. Higher EPS generally means better profitability, but always compare within the same industry.",
    goodRange: "Consistently growing EPS (>10% annually) is a positive sign.",
    example: "A company with ₹100 Cr profit and 1 Cr shares has EPS of ₹100."
  },
  dividendYield: {
    name: "Dividend Yield",
    shortExplanation: "Annual dividend as a percentage of stock price",
    detailedExplanation: "Dividend yield shows what percentage of your investment you'll get back as dividends each year. It's like the 'interest rate' on your stock investment. Some investors prefer high-yield stocks for regular income, while growth stocks may pay little or no dividend.",
    goodRange: "2-6% is considered good. Very high yields (>10%) may signal problems.",
    example: "If a ₹100 stock pays ₹3 annual dividend, the yield is 3%."
  },
  roe: {
    name: "Return on Equity (ROE)",
    shortExplanation: "How efficiently the company uses shareholder money",
    detailedExplanation: "ROE measures how much profit a company generates with the money shareholders have invested. A high ROE means the company is good at turning your investment into profits. Think of it as the 'return' on the owners' stake in the business.",
    goodRange: "Above 15% is good, above 20% is excellent. Compare within sector.",
    example: "If equity is ₹100 Cr and profit is ₹20 Cr, ROE is 20%."
  },
  debtToEquity: {
    name: "Debt-to-Equity Ratio",
    shortExplanation: "How much the company owes vs. what it owns",
    detailedExplanation: "This ratio shows how much debt the company has compared to shareholders' equity. High debt means more risk - the company must pay interest regardless of profits. Low debt companies are safer during tough times.",
    goodRange: "Below 0.5 is conservative, 0.5-1.5 is moderate, above 2 is risky.",
    example: "D/E of 0.5 means for every ₹100 of equity, the company has ₹50 debt."
  },
  revenue: {
    name: "Revenue (Sales)",
    shortExplanation: "Total money earned from selling products/services",
    detailedExplanation: "Revenue is the total income from the company's main business before any expenses. It's the 'top line' of the income statement. Growing revenue usually means the business is expanding its customer base or selling more.",
    goodRange: "Look for consistent growth of 10-20% annually.",
    example: "If a company sells ₹1,000 Cr worth of products, that's its revenue."
  },
  netProfit: {
    name: "Net Profit",
    shortExplanation: "Money left after paying all expenses and taxes",
    detailedExplanation: "Net profit (or net income) is what remains after deducting all costs - salaries, materials, interest, taxes, etc. This is the 'bottom line' and represents the actual profit available to shareholders.",
    goodRange: "Net profit margin (profit/revenue) above 10% is generally healthy.",
    example: "If revenue is ₹100 Cr and all expenses are ₹80 Cr, net profit is ₹20 Cr."
  },
  operatingCashFlow: {
    name: "Operating Cash Flow",
    shortExplanation: "Actual cash generated from business operations",
    detailedExplanation: "This shows the real cash coming in from day-to-day business activities. Unlike accounting profit, cash flow can't be manipulated easily. A company can show profit on paper but struggle with cash - this metric reveals the truth.",
    goodRange: "Should be positive and ideally higher than net profit.",
    example: "A retailer collecting cash daily has strong operating cash flow."
  },
  freeCashFlow: {
    name: "Free Cash Flow",
    shortExplanation: "Cash available after maintaining/expanding the business",
    detailedExplanation: "Free cash flow is what's left after the company spends on capital expenditures (buying equipment, buildings, etc.). This is money that can be used to pay dividends, buy back shares, pay down debt, or make acquisitions.",
    goodRange: "Positive and growing. Negative FCF may be okay for growing companies investing heavily.",
    example: "If operating cash flow is ₹100 Cr and capex is ₹30 Cr, FCF is ₹70 Cr."
  },
  high52Week: {
    name: "52-Week High",
    shortExplanation: "Highest price the stock reached in the past year",
    detailedExplanation: "This shows the peak price over the last 52 weeks. If current price is near the high, the stock has momentum. If it's far below, the stock may be undervalued or facing challenges.",
    goodRange: "Compare current price to see how far from highs.",
    example: "A stock at ₹480 with 52-week high of ₹500 is 4% below its peak."
  },
  low52Week: {
    name: "52-Week Low",
    shortExplanation: "Lowest price the stock fell to in the past year",
    detailedExplanation: "This shows the bottom price over the last 52 weeks. A stock near its 52-week low might be a buying opportunity or a warning sign. Always research why the price fell before investing.",
    goodRange: "If near the low, investigate the reason before buying.",
    example: "A stock at ₹520 with 52-week low of ₹400 is 30% above its bottom."
  }
};

export function getExplanation(metric: string): MetricExplanation | undefined {
  return metricExplanations[metric];
}
