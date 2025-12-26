import { useState, useMemo } from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { formatINR, formatPercentage } from "@/lib/format";
import { HistoricalPrice } from "@/types/stock";
import { cn } from "@/lib/utils";

interface PriceChartProps {
  currentPrice: number;
  change: number;
  changePercent: number;
  high52Week: number;
  low52Week: number;
  historicalPrices: HistoricalPrice[];
}

type TimeRange = "1D" | "1W" | "1M" | "3M" | "1Y";

export function PriceChart({
  currentPrice,
  change,
  changePercent,
  high52Week,
  low52Week,
  historicalPrices
}: PriceChartProps) {
  const [timeRange, setTimeRange] = useState<TimeRange>("1M");

  const filteredData = useMemo(() => {
    const now = new Date();
    let cutoffDate: Date;

    switch (timeRange) {
      case "1D":
        cutoffDate = new Date(now);
        cutoffDate.setDate(now.getDate() - 1);
        break;
      case "1W":
        cutoffDate = new Date(now);
        cutoffDate.setDate(now.getDate() - 7);
        break;
      case "1M":
        cutoffDate = new Date(now);
        cutoffDate.setMonth(now.getMonth() - 1);
        break;
      case "3M":
        cutoffDate = new Date(now);
        cutoffDate.setMonth(now.getMonth() - 3);
        break;
      case "1Y":
      default:
        cutoffDate = new Date(now);
        cutoffDate.setFullYear(now.getFullYear() - 1);
        break;
    }

    return historicalPrices
      .filter(p => new Date(p.date) >= cutoffDate)
      .map(p => ({
        date: p.date,
        price: p.close,
        displayDate: formatDateForRange(p.date, timeRange)
      }));
  }, [historicalPrices, timeRange]);

  const rangeChange = useMemo(() => {
    if (filteredData.length < 2) return { value: 0, percent: 0 };
    const startPrice = filteredData[0].price;
    const endPrice = filteredData[filteredData.length - 1].price;
    return {
      value: endPrice - startPrice,
      percent: ((endPrice - startPrice) / startPrice) * 100
    };
  }, [filteredData]);

  const isPositive = rangeChange.value >= 0;
  const priceRange = useMemo(() => {
    if (filteredData.length === 0) return { min: 0, max: 0 };
    const prices = filteredData.map(d => d.price);
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    const padding = (max - min) * 0.1;
    return { min: min - padding, max: max + padding };
  }, [filteredData]);

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <CardTitle className="text-lg font-medium text-muted-foreground">Current Price</CardTitle>
            <div className="flex items-baseline gap-3 mt-1">
              <span className="text-4xl font-bold tabular-nums">{formatINR(currentPrice)}</span>
              <div className={cn(
                "flex items-center gap-1 px-2 py-1 rounded-full text-sm font-medium",
                isPositive ? "bg-success-muted text-success" : "bg-danger-muted text-danger"
              )}>
                {isPositive ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                {formatPercentage(rangeChange.percent)}
              </div>
            </div>
          </div>

          <div className="flex gap-1.5">
            {(["1D", "1W", "1M", "3M", "1Y"] as TimeRange[]).map((range) => (
              <Button
                key={range}
                variant={timeRange === range ? "default" : "outline"}
                size="sm"
                onClick={() => setTimeRange(range)}
                className="min-w-[44px]"
              >
                {range}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <div className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={filteredData}
              margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="priceGradientUp" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--success))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--success))" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="priceGradientDown" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--danger))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--danger))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="displayDate"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                tickMargin={8}
                interval="preserveStartEnd"
                minTickGap={50}
              />
              <YAxis
                domain={[priceRange.min, priceRange.max]}
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                tickFormatter={(value) => `₹${value.toFixed(0)}`}
                width={60}
                tickMargin={8}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-popover border border-border rounded-lg shadow-lg p-3">
                        <p className="text-sm text-muted-foreground">{payload[0].payload.date}</p>
                        <p className="text-lg font-bold">{formatINR(payload[0].value as number)}</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Area
                type="monotone"
                dataKey="price"
                stroke={isPositive ? "hsl(var(--success))" : "hsl(var(--danger))"}
                strokeWidth={2}
                fill={isPositive ? "url(#priceGradientUp)" : "url(#priceGradientDown)"}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* 52-Week Range */}
        <div className="px-6 py-4 border-t border-border bg-muted/30">
          <div className="flex items-center justify-between text-sm">
            <div>
              <span className="text-muted-foreground">52-Week Low</span>
              <p className="font-semibold text-danger">{formatINR(low52Week)}</p>
            </div>
            <div className="flex-1 mx-4">
              <div className="relative h-2 bg-secondary rounded-full overflow-hidden">
                <div
                  className="absolute h-full bg-gradient-to-r from-danger via-warning to-success"
                  style={{ width: "100%" }}
                />
                <div
                  className="absolute w-3 h-3 bg-foreground rounded-full -top-0.5 shadow-md"
                  style={{
                    left: `${Math.min(100, Math.max(0, ((currentPrice - low52Week) / (high52Week - low52Week)) * 100))}%`,
                    transform: "translateX(-50%)"
                  }}
                />
              </div>
            </div>
            <div className="text-right">
              <span className="text-muted-foreground">52-Week High</span>
              <p className="font-semibold text-success">{formatINR(high52Week)}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function formatDateForRange(dateStr: string, range: TimeRange): string {
  const date = new Date(dateStr);
  switch (range) {
    case "1D":
    case "1W":
      return date.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
    case "1M":
    case "3M":
      return date.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
    case "1Y":
      return date.toLocaleDateString("en-IN", { month: "short", year: "2-digit" });
    default:
      return dateStr;
  }
}
