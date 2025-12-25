import { Helmet } from "react-helmet-async";
import { SearchBar } from "@/components/search/SearchBar";
import { StockCard } from "@/components/stock/StockCard";
import { PopularStocks } from "@/components/stock/SectorBadge";
import { getPopularStocks, getSectors, stocks } from "@/data/stocks";
import { BarChart3, TrendingUp, Shield } from "lucide-react";

export default function HomePage() {
  const popularStocks = getPopularStocks(6);
  const topGainers = [...stocks].sort((a, b) => b.fundamentals.profitGrowth - a.fundamentals.profitGrowth).slice(0, 6);

  return (
    <>
      <Helmet>
        <title>StockSankhya - Indian Stock Fundamental Analysis Made Simple</title>
        <meta name="description" content="Simplify your stock research with clear fundamental analysis for Indian stocks. Understand company health, compare stocks, and build your watchlist." />
      </Helmet>

      <main className="container py-8 pb-24 md:pb-8">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
            Stock Fundamentals,{" "}
            <span className="text-primary">Simplified</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Understand the financial health of Indian companies without the noise. Clear metrics, simple explanations, smart investing.
          </p>
          <SearchBar autoFocus className="max-w-2xl mx-auto" />
        </section>

        {/* Features */}
        <section className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-card border border-border rounded-xl p-6 text-center">
            <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary mb-4">
              <BarChart3 className="h-6 w-6" />
            </div>
            <h3 className="font-semibold mb-2">Clear Metrics</h3>
            <p className="text-sm text-muted-foreground">Key fundamentals explained in plain English with INR formatting</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-6 text-center">
            <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-success/10 text-success mb-4">
              <Shield className="h-6 w-6" />
            </div>
            <h3 className="font-semibold mb-2">Health Indicators</h3>
            <p className="text-sm text-muted-foreground">Quick visual badges showing financial strength and debt levels</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-6 text-center">
            <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-warning/10 text-warning mb-4">
              <TrendingUp className="h-6 w-6" />
            </div>
            <h3 className="font-semibold mb-2">Compare Stocks</h3>
            <p className="text-sm text-muted-foreground">Side-by-side comparison of up to 3 companies</p>
          </div>
        </section>

        {/* Popular Stocks Grid */}
        <section className="mb-12">
          <h2 className="text-2xl font-display font-bold mb-6">Popular Stocks</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {popularStocks.map((stock) => (
              <StockCard key={stock.id} stock={stock} />
            ))}
          </div>
        </section>

        {/* Top Gainers */}
        <section>
          <h2 className="text-2xl font-display font-bold mb-6">Top Performers</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {topGainers.map((stock) => (
              <StockCard key={stock.id} stock={stock} />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
