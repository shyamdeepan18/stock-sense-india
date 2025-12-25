import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Heart, Trash2 } from "lucide-react";
import { useWatchlist } from "@/hooks/useWatchlist";
import { getStockById } from "@/data/stocks";
import { StockCard } from "@/components/stock/StockCard";
import { Button } from "@/components/ui/button";

export default function WatchlistPage() {
  const { watchlist, clearWatchlist } = useWatchlist();
  const watchlistStocks = watchlist.map(item => getStockById(item.stockId)).filter(Boolean);

  return (
    <>
      <Helmet>
        <title>My Watchlist | StockSankhya</title>
        <meta name="description" content="Your saved stocks for quick access and monitoring." />
      </Helmet>

      <main className="container py-8 pb-24 md:pb-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-display font-bold flex items-center gap-3">
              <Heart className="h-8 w-8 text-danger" />
              My Watchlist
            </h1>
            <p className="text-muted-foreground mt-1">{watchlistStocks.length} stocks saved</p>
          </div>
          {watchlistStocks.length > 0 && (
            <Button variant="outline" size="sm" onClick={clearWatchlist}>
              <Trash2 className="h-4 w-4 mr-2" />
              Clear All
            </Button>
          )}
        </div>

        {watchlistStocks.length === 0 ? (
          <div className="text-center py-16 bg-card border border-border rounded-xl">
            <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Your watchlist is empty</h2>
            <p className="text-muted-foreground mb-6">Start adding stocks to keep track of your favorites</p>
            <Link to="/">
              <Button>Browse Stocks</Button>
            </Link>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {watchlistStocks.map((stock) => stock && (
              <StockCard key={stock.id} stock={stock} />
            ))}
          </div>
        )}
      </main>
    </>
  );
}
