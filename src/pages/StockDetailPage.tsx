import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, Heart, ExternalLink } from "lucide-react";
import { getStockById } from "@/data/stocks";
import { MetricsDashboard } from "@/components/stock/MetricsDashboard";
import { HealthBadge } from "@/components/stock/HealthBadge";
import { useWatchlist } from "@/hooks/useWatchlist";
import { Button } from "@/components/ui/button";
import { formatINR, formatMarketCap } from "@/lib/format";
import { cn } from "@/lib/utils";

export default function StockDetailPage() {
  const { id } = useParams<{ id: string }>();
  const stock = getStockById(id || "");
  const { isInWatchlist, toggleWatchlist } = useWatchlist();

  if (!stock) {
    return (
      <main className="container py-8">
        <div className="text-center py-16">
          <h1 className="text-2xl font-bold mb-4">Stock Not Found</h1>
          <p className="text-muted-foreground mb-6">The stock "{id}" could not be found.</p>
          <Link to="/">
            <Button>Back to Home</Button>
          </Link>
        </div>
      </main>
    );
  }

  const inWatchlist = isInWatchlist(stock.id);

  return (
    <>
      <Helmet>
        <title>{stock.ticker} - {stock.name} | StockSankhya</title>
        <meta name="description" content={`Fundamental analysis of ${stock.name} (${stock.ticker}). View key metrics like PE ratio, ROE, debt levels and more.`} />
      </Helmet>

      <main className="container py-6 pb-24 md:pb-8">
        {/* Back Button */}
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8">
          <div className="flex items-start gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-secondary text-secondary-foreground font-display font-bold text-2xl">
              {stock.ticker.slice(0, 2)}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-2xl md:text-3xl font-display font-bold">{stock.ticker}</h1>
                <span className="text-xs px-2 py-1 bg-secondary rounded-full">{stock.exchange}</span>
              </div>
              <p className="text-muted-foreground">{stock.name}</p>
              <p className="text-sm text-muted-foreground">{stock.sector} • {stock.industry}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-3xl font-bold tabular-nums">{formatINR(stock.currentPrice)}</div>
              <div className="text-sm text-muted-foreground">{formatMarketCap(stock.marketCap)}</div>
            </div>
            <Button
              variant={inWatchlist ? "default" : "outline"}
              size="icon"
              onClick={() => toggleWatchlist(stock.id)}
              className="h-12 w-12"
            >
              <Heart className={cn("h-5 w-5", inWatchlist && "fill-current")} />
            </Button>
          </div>
        </div>

        {/* Health Badges */}
        {stock.health && (
          <div className="flex flex-wrap gap-3 mb-8">
            <HealthBadge type="financialStrength" value={stock.health.financialStrength} />
            <HealthBadge type="profitability" value={stock.health.profitability} />
            <HealthBadge type="debtLevel" value={stock.health.debtLevel} />
          </div>
        )}

        {/* Description */}
        {stock.description && (
          <div className="bg-card border border-border rounded-xl p-6 mb-8">
            <h2 className="font-semibold mb-2">About {stock.name}</h2>
            <p className="text-muted-foreground">{stock.description}</p>
          </div>
        )}

        {/* Metrics Dashboard */}
        <MetricsDashboard stock={stock} />
      </main>
    </>
  );
}
