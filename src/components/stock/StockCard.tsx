import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { Stock } from "@/types/stock";
import { formatINR, formatMarketCap, formatPercentage, getValueColorClass } from "@/lib/format";
import { useWatchlist } from "@/hooks/useWatchlist";
import { HealthBadge } from "./HealthBadge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface StockCardProps {
  stock: Stock;
  variant?: "default" | "compact";
}

export function StockCard({ stock, variant = "default" }: StockCardProps) {
  const { isInWatchlist, toggleWatchlist } = useWatchlist();
  const inWatchlist = isInWatchlist(stock.id);

  return (
    <div className="group relative bg-card border border-border rounded-xl p-5 hover:border-primary/50 hover:shadow-md transition-all duration-200 animate-fade-in">
      {/* Watchlist Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggleWatchlist(stock.id);
        }}
        className={cn(
          "absolute top-4 right-4 h-8 w-8",
          inWatchlist ? "text-danger" : "text-muted-foreground opacity-0 group-hover:opacity-100"
        )}
      >
        <Heart className={cn("h-4 w-4", inWatchlist && "fill-current")} />
      </Button>

      <Link to={`/stock/${stock.id}`} className="block">
        {/* Header */}
        <div className="flex items-start gap-3 mb-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary text-secondary-foreground font-display font-bold text-base">
            {stock.ticker.slice(0, 2)}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground truncate">{stock.ticker}</h3>
            <p className="text-sm text-muted-foreground truncate">{stock.name}</p>
          </div>
        </div>

        {/* Price & Change */}
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-2xl font-bold tabular-nums">
            {formatINR(stock.currentPrice)}
          </span>
          <span className={cn("text-sm font-medium", getValueColorClass(stock.fundamentals.profitGrowth))}>
            {formatPercentage(stock.fundamentals.profitGrowth)}
          </span>
        </div>

        {variant === "default" && (
          <>
            {/* Key Metrics */}
            <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
              <div>
                <span className="text-muted-foreground">Market Cap</span>
                <p className="font-medium">{formatMarketCap(stock.marketCap)}</p>
              </div>
              <div>
                <span className="text-muted-foreground">PE Ratio</span>
                <p className="font-medium">{stock.fundamentals.peRatio.toFixed(2)}</p>
              </div>
              <div>
                <span className="text-muted-foreground">ROE</span>
                <p className="font-medium">{formatPercentage(stock.fundamentals.roe, false)}</p>
              </div>
              <div>
                <span className="text-muted-foreground">D/E</span>
                <p className="font-medium">{stock.fundamentals.debtToEquity.toFixed(2)}</p>
              </div>
            </div>

            {/* Health Badges */}
            {stock.health && (
              <div className="flex flex-wrap gap-2">
                <HealthBadge type="financialStrength" value={stock.health.financialStrength} size="sm" />
                <HealthBadge type="profitability" value={stock.health.profitability} size="sm" />
                <HealthBadge type="debtLevel" value={stock.health.debtLevel} size="sm" />
              </div>
            )}
          </>
        )}

        {variant === "compact" && (
          <div className="flex items-center gap-2 text-xs">
            <span className="text-muted-foreground">{stock.exchange}</span>
            <span className="text-muted-foreground">•</span>
            <span className="text-muted-foreground">{stock.sector}</span>
          </div>
        )}
      </Link>
    </div>
  );
}
