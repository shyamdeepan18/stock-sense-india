import { Stock } from "@/types/stock";
import { MetricCard } from "./MetricCard";
import { formatINR, formatMarketCap, formatPercentage, formatRatio, getValueColorClass } from "@/lib/format";
import { IndianRupee, TrendingUp, Percent, Scale, BarChart3, PiggyBank } from "lucide-react";

interface MetricsDashboardProps {
  stock: Stock;
}

export function MetricsDashboard({ stock }: MetricsDashboardProps) {
  const { fundamentals } = stock;

  const getTrend = (value: number): "up" | "down" | "neutral" => {
    if (value > 0) return "up";
    if (value < 0) return "down";
    return "neutral";
  };

  return (
    <div className="space-y-6">
      {/* Valuation Metrics */}
      <div>
        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <IndianRupee className="h-5 w-5 text-primary" />
          Valuation
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <MetricCard
            label="Market Cap"
            value={formatMarketCap(stock.marketCap)}
            tooltip="Total market value of the company's outstanding shares"
          />
          <MetricCard
            label="Current Price"
            value={formatINR(stock.currentPrice)}
            tooltip="Latest trading price of the stock"
          />
          <MetricCard
            label="PE Ratio"
            value={formatRatio(fundamentals.peRatio)}
            tooltip="Price-to-Earnings ratio. Lower may indicate undervaluation, but compare within the same sector"
          />
        </div>
      </div>

      {/* Profitability Metrics */}
      <div>
        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <PiggyBank className="h-5 w-5 text-success" />
          Profitability
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <MetricCard
            label="Revenue"
            value={`₹${(fundamentals.revenue / 1000).toFixed(1)}K Cr`}
            subValue={formatPercentage(fundamentals.revenueGrowth) + " YoY"}
            trend={getTrend(fundamentals.revenueGrowth)}
            tooltip="Total income from business operations before expenses"
          />
          <MetricCard
            label="Net Profit"
            value={`₹${(fundamentals.netProfit / 1000).toFixed(1)}K Cr`}
            subValue={formatPercentage(fundamentals.profitGrowth) + " YoY"}
            trend={getTrend(fundamentals.profitGrowth)}
            valueClassName={getValueColorClass(fundamentals.netProfit)}
            tooltip="Profit after all expenses, taxes, and interest"
          />
          <MetricCard
            label="EPS"
            value={formatINR(fundamentals.eps, false)}
            subValue={formatPercentage(fundamentals.epsGrowth) + " YoY"}
            trend={getTrend(fundamentals.epsGrowth)}
            tooltip="Earnings Per Share - profit allocated to each outstanding share"
          />
          <MetricCard
            label="ROE"
            value={formatPercentage(fundamentals.roe, false)}
            tooltip="Return on Equity - how efficiently the company uses shareholder funds. Higher is generally better (>15% is good)"
          />
        </div>
      </div>

      {/* Financial Health */}
      <div>
        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <Scale className="h-5 w-5 text-warning" />
          Financial Health
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <MetricCard
            label="Debt-to-Equity"
            value={formatRatio(fundamentals.debtToEquity)}
            tooltip="Measures how much debt the company uses relative to equity. Lower is safer (<1 is good, <0.5 is excellent)"
          />
          <MetricCard
            label="Debt Status"
            value={fundamentals.debtToEquity <= 0.5 ? "Conservative" : fundamentals.debtToEquity <= 1.5 ? "Moderate" : "Aggressive"}
            valueClassName={fundamentals.debtToEquity <= 0.5 ? "text-success" : fundamentals.debtToEquity <= 1.5 ? "text-warning" : "text-danger"}
            tooltip="Overall assessment of the company's borrowing strategy"
          />
        </div>
      </div>

      {/* Growth Metrics */}
      <div>
        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          Growth (Year-over-Year)
        </h3>
        <div className="grid grid-cols-3 gap-4">
          <MetricCard
            label="Revenue Growth"
            value={formatPercentage(fundamentals.revenueGrowth)}
            valueClassName={getValueColorClass(fundamentals.revenueGrowth)}
            trend={getTrend(fundamentals.revenueGrowth)}
            tooltip="Year-over-year change in total revenue"
          />
          <MetricCard
            label="Profit Growth"
            value={formatPercentage(fundamentals.profitGrowth)}
            valueClassName={getValueColorClass(fundamentals.profitGrowth)}
            trend={getTrend(fundamentals.profitGrowth)}
            tooltip="Year-over-year change in net profit"
          />
          <MetricCard
            label="EPS Growth"
            value={formatPercentage(fundamentals.epsGrowth)}
            valueClassName={getValueColorClass(fundamentals.epsGrowth)}
            trend={getTrend(fundamentals.epsGrowth)}
            tooltip="Year-over-year change in earnings per share"
          />
        </div>
      </div>
    </div>
  );
}
