import { Stock, StockHealth } from "@/types/stock";

/**
 * Calculate health indicators based on fundamentals
 */
export function calculateStockHealth(stock: Stock): StockHealth {
  const { fundamentals } = stock;
  
  // Financial Strength: Based on ROE and profit margins
  let financialStrength: StockHealth["financialStrength"];
  if (fundamentals.roe >= 15 && fundamentals.netProfit > 0) {
    financialStrength = "Strong";
  } else if (fundamentals.roe >= 8 && fundamentals.netProfit > 0) {
    financialStrength = "Average";
  } else {
    financialStrength = "Weak";
  }
  
  // Profitability
  const profitability: StockHealth["profitability"] = 
    fundamentals.netProfit > 0 ? "Profitable" : "Loss-making";
  
  // Debt Level: Based on Debt-to-Equity ratio
  let debtLevel: StockHealth["debtLevel"];
  if (fundamentals.debtToEquity <= 0.5) {
    debtLevel = "Low";
  } else if (fundamentals.debtToEquity <= 1.5) {
    debtLevel = "Medium";
  } else {
    debtLevel = "High";
  }
  
  return { financialStrength, profitability, debtLevel };
}

/**
 * Get explanation for health indicators
 */
export function getHealthExplanation(type: string, value: string): string {
  const explanations: Record<string, Record<string, string>> = {
    financialStrength: {
      Strong: "High ROE (>15%) with consistent profits indicates efficient capital usage.",
      Average: "Moderate ROE (8-15%) suggests decent but not exceptional performance.",
      Weak: "Low ROE or losses suggest poor capital efficiency or challenging business conditions.",
    },
    profitability: {
      Profitable: "The company is generating positive net income after all expenses.",
      "Loss-making": "The company's expenses exceed its revenue, resulting in losses.",
    },
    debtLevel: {
      Low: "Debt-to-equity below 0.5x indicates conservative borrowing and lower financial risk.",
      Medium: "Debt-to-equity between 0.5-1.5x is typical for most companies.",
      High: "Debt-to-equity above 1.5x suggests higher leverage and potential financial stress.",
    },
  };
  
  return explanations[type]?.[value] || "No explanation available.";
}

/**
 * Get badge styling based on health type and value
 */
export function getHealthBadgeStyle(type: string, value: string): { 
  bgClass: string; 
  textClass: string;
  icon: string;
} {
  const styles: Record<string, Record<string, { bgClass: string; textClass: string; icon: string }>> = {
    financialStrength: {
      Strong: { bgClass: "bg-success-muted", textClass: "text-success", icon: "💪" },
      Average: { bgClass: "bg-warning-muted", textClass: "text-warning", icon: "📊" },
      Weak: { bgClass: "bg-danger-muted", textClass: "text-danger", icon: "⚠️" },
    },
    profitability: {
      Profitable: { bgClass: "bg-success-muted", textClass: "text-success", icon: "📈" },
      "Loss-making": { bgClass: "bg-danger-muted", textClass: "text-danger", icon: "📉" },
    },
    debtLevel: {
      Low: { bgClass: "bg-success-muted", textClass: "text-success", icon: "✓" },
      Medium: { bgClass: "bg-warning-muted", textClass: "text-warning", icon: "○" },
      High: { bgClass: "bg-danger-muted", textClass: "text-danger", icon: "!" },
    },
  };
  
  return styles[type]?.[value] || { bgClass: "bg-muted", textClass: "text-muted-foreground", icon: "•" };
}
