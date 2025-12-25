import { Link } from "react-router-dom";
import { Stock } from "@/types/stock";
import { cn } from "@/lib/utils";

interface SectorBadgeProps {
  sector: string;
  count?: number;
  isActive?: boolean;
}

export function SectorBadge({ sector, count, isActive }: SectorBadgeProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors",
        isActive
          ? "bg-primary text-primary-foreground"
          : "bg-secondary text-secondary-foreground hover:bg-accent"
      )}
    >
      {sector}
      {count !== undefined && (
        <span className={cn(
          "text-xs px-1.5 py-0.5 rounded-full",
          isActive ? "bg-primary-foreground/20" : "bg-muted"
        )}>
          {count}
        </span>
      )}
    </button>
  );
}

interface PopularStocksProps {
  stocks: Stock[];
  title?: string;
}

export function PopularStocks({ stocks, title = "Popular Stocks" }: PopularStocksProps) {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-3">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {stocks.map((stock) => (
          <Link
            key={stock.id}
            to={`/stock/${stock.id}`}
            className="inline-flex items-center gap-2 px-3 py-2 bg-card border border-border rounded-lg hover:border-primary/50 hover:shadow-sm transition-all"
          >
            <span className="font-medium">{stock.ticker}</span>
            <span className="text-xs text-muted-foreground">{stock.sector}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
