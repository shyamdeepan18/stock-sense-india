import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { HelpCircle, TrendingUp, IndianRupee, BarChart3, Percent, PiggyBank, Wallet } from "lucide-react";
import { formatINR, formatMarketCap, formatRatio, formatPercentage } from "@/lib/format";
import { getExplanation } from "@/lib/explanations";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface KeyMetricsCardsProps {
  peRatio: number;
  marketCap: number;
  high52Week: number;
  low52Week: number;
  eps: number;
  dividendYield?: number;
  currentPrice: number;
}

interface MetricCardItemProps {
  label: string;
  value: string;
  icon: LucideIcon;
  metricKey?: string;
  valueClassName?: string;
}

function MetricCardItem({ label, value, icon: Icon, metricKey, valueClassName }: MetricCardItemProps) {
  const explanation = metricKey ? getExplanation(metricKey) : undefined;

  return (
    <Card className="relative overflow-hidden group hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-primary/10">
              <Icon className="h-4 w-4 text-primary" />
            </div>
            <span className="text-sm text-muted-foreground">{label}</span>
          </div>
          {explanation && (
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <HelpCircle className="h-4 w-4 text-muted-foreground" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80" side="top">
                <div className="space-y-2">
                  <h4 className="font-semibold">{explanation.name}</h4>
                  <p className="text-sm text-muted-foreground">{explanation.shortExplanation}</p>
                  <p className="text-sm">{explanation.detailedExplanation}</p>
                  {explanation.goodRange && (
                    <div className="text-xs bg-muted p-2 rounded-md">
                      <strong>Good range:</strong> {explanation.goodRange}
                    </div>
                  )}
                  {explanation.example && (
                    <p className="text-xs text-muted-foreground italic">{explanation.example}</p>
                  )}
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
        <p className={cn("text-2xl font-bold mt-2 tabular-nums", valueClassName)}>{value}</p>
      </CardContent>
    </Card>
  );
}

export function KeyMetricsCards({
  peRatio,
  marketCap,
  high52Week,
  low52Week,
  eps,
  dividendYield,
  currentPrice
}: KeyMetricsCardsProps) {
  const distanceFromHigh = ((high52Week - currentPrice) / high52Week) * 100;
  const distanceFromLow = ((currentPrice - low52Week) / low52Week) * 100;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold flex items-center gap-2">
        <BarChart3 className="h-5 w-5 text-primary" />
        Key Metrics
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <MetricCardItem
          label="P/E Ratio"
          value={formatRatio(peRatio)}
          icon={TrendingUp}
          metricKey="peRatio"
          valueClassName={peRatio < 15 ? "text-success" : peRatio > 40 ? "text-warning" : undefined}
        />
        <MetricCardItem
          label="Market Cap"
          value={formatMarketCap(marketCap)}
          icon={IndianRupee}
          metricKey="marketCap"
        />
        <MetricCardItem
          label="52-Week High"
          value={formatINR(high52Week)}
          icon={TrendingUp}
          metricKey="high52Week"
          valueClassName="text-success"
        />
        <MetricCardItem
          label="52-Week Low"
          value={formatINR(low52Week)}
          icon={TrendingUp}
          metricKey="low52Week"
          valueClassName="text-danger"
        />
        <MetricCardItem
          label="EPS"
          value={formatINR(eps, false)}
          icon={PiggyBank}
          metricKey="eps"
        />
        <MetricCardItem
          label="Dividend Yield"
          value={dividendYield ? formatPercentage(dividendYield, false) : "—"}
          icon={Wallet}
          metricKey="dividendYield"
          valueClassName={dividendYield && dividendYield > 2 ? "text-success" : undefined}
        />
      </div>
    </div>
  );
}
