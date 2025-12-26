export interface Stock {
  id: string;
  ticker: string;
  name: string;
  exchange: "NSE" | "BSE" | "NSE/BSE";
  sector: string;
  industry: string;
  marketCap: number; // in crores
  currentPrice: number;
  
  // Price data
  priceData?: PriceData;
  
  // Fundamental Metrics
  fundamentals: {
    revenue: number; // in crores
    netProfit: number; // in crores
    eps: number;
    peRatio: number;
    roe: number; // percentage
    debtToEquity: number;
    dividendYield?: number; // percentage
    
    // Growth metrics (YoY)
    revenueGrowth: number; // percentage
    profitGrowth: number; // percentage
    epsGrowth: number; // percentage
  };

  // Financial Statements
  financials?: FinancialStatements;
  
  // Revenue Breakdown
  revenueBreakdown?: RevenueSegment[];
  
  // 5-Year Historical Data
  historicalData?: HistoricalData;
  
  // Company Info
  companyInfo?: CompanyInfo;
  
  // Business Quality
  moat?: BusinessMoat;
  
  // News
  news?: NewsItem[];

  // About the company
  description?: string;
  
  // Health indicators (computed)
  health?: StockHealth;
}

export interface PriceData {
  current: number;
  change: number;
  changePercent: number;
  high52Week: number;
  low52Week: number;
  open: number;
  previousClose: number;
  volume: number;
  // Historical prices for chart
  historicalPrices: HistoricalPrice[];
}

export interface HistoricalPrice {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface FinancialStatements {
  incomeStatement: {
    quarterly: IncomeStatementPeriod[];
    annual: IncomeStatementPeriod[];
  };
  balanceSheet: {
    quarterly: BalanceSheetPeriod[];
    annual: BalanceSheetPeriod[];
  };
  cashFlow: {
    quarterly: CashFlowPeriod[];
    annual: CashFlowPeriod[];
  };
}

export interface IncomeStatementPeriod {
  period: string;
  revenue: number;
  operatingIncome: number;
  netIncome: number;
  eps: number;
}

export interface BalanceSheetPeriod {
  period: string;
  totalAssets: number;
  totalLiabilities: number;
  totalDebt: number;
  cashAndEquivalents: number;
}

export interface CashFlowPeriod {
  period: string;
  operatingCashFlow: number;
  investingCashFlow: number;
  financingCashFlow: number;
  freeCashFlow: number;
}

export interface RevenueSegment {
  segment: string;
  revenue: number;
  percentage: number;
}

export interface HistoricalData {
  incomeStatement: AnnualMetric[];
  balanceSheet: AnnualBalanceMetric[];
  cashFlow: AnnualCashFlowMetric[];
}

export interface AnnualMetric {
  year: string;
  revenue: number;
  netIncome: number;
  eps: number;
}

export interface AnnualBalanceMetric {
  year: string;
  totalAssets: number;
  totalLiabilities: number;
  equity: number;
}

export interface AnnualCashFlowMetric {
  year: string;
  operatingCashFlow: number;
  freeCashFlow: number;
}

export interface CompanyInfo {
  ceo: string;
  headquarters: string;
  founded?: string;
  employees?: number;
  website?: string;
}

export interface BusinessMoat {
  competitiveEdge: string;
  marketPosition: string;
  innovationFocus: string;
  sustainability: string;
}

export interface NewsItem {
  id: string;
  title: string;
  source: string;
  date: string;
  url?: string;
}

export interface StockHealth {
  financialStrength: "Strong" | "Average" | "Weak";
  profitability: "Profitable" | "Loss-making";
  debtLevel: "Low" | "Medium" | "High";
}

export type HealthBadgeType = "strong" | "average" | "weak" | "profitable" | "loss" | "low" | "medium" | "high";

export interface CompareStock {
  stock: Stock;
  isWinner?: boolean;
}

export interface WatchlistItem {
  stockId: string;
  addedAt: string;
}

// Formatting utilities types
export type NumberFormat = "inr" | "crores" | "lakhs" | "percentage" | "ratio";

// Metric explanations
export interface MetricExplanation {
  name: string;
  shortExplanation: string;
  detailedExplanation: string;
  goodRange?: string;
  example?: string;
}
