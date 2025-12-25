export interface Stock {
  id: string;
  ticker: string;
  name: string;
  exchange: "NSE" | "BSE" | "NSE/BSE";
  sector: string;
  industry: string;
  marketCap: number; // in crores
  currentPrice: number;
  
  // Fundamental Metrics
  fundamentals: {
    revenue: number; // in crores
    netProfit: number; // in crores
    eps: number;
    peRatio: number;
    roe: number; // percentage
    debtToEquity: number;
    
    // Growth metrics (YoY)
    revenueGrowth: number; // percentage
    profitGrowth: number; // percentage
    epsGrowth: number; // percentage
  };

  // About the company
  description?: string;
  
  // Health indicators (computed)
  health?: StockHealth;
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
