import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { searchStocks } from "@/data/stocks";
import { Stock } from "@/types/stock";
import { formatMarketCap } from "@/lib/format";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  autoFocus?: boolean;
  placeholder?: string;
  className?: string;
}

export function SearchBar({ autoFocus = false, placeholder = "Search stocks by name or ticker...", className }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Stock[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (query.trim()) {
      const found = searchStocks(query).slice(0, 8);
      setResults(found);
      setIsOpen(true);
      setSelectedIndex(-1);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [query]);

  const handleSelect = (stock: Stock) => {
    setQuery("");
    setIsOpen(false);
    navigate(`/stock/${stock.id}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || results.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex(prev => (prev < results.length - 1 ? prev + 1 : prev));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === "Enter" && selectedIndex >= 0) {
      e.preventDefault();
      handleSelect(results[selectedIndex]);
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  const clearSearch = () => {
    setQuery("");
    setResults([]);
    setIsOpen(false);
    inputRef.current?.focus();
  };

  return (
    <div className={cn("relative w-full", className)}>
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => query && setIsOpen(true)}
          placeholder={placeholder}
          autoFocus={autoFocus}
          className="pl-12 pr-10 h-14 text-lg rounded-xl border-2 focus:border-primary bg-card"
        />
        {query && (
          <button
            onClick={clearSearch}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-accent"
          >
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
        )}
      </div>

      {/* Search Results Dropdown */}
      {isOpen && results.length > 0 && (
        <div className="absolute z-50 w-full mt-2 py-2 bg-card border border-border rounded-xl shadow-lg animate-fade-in">
          {results.map((stock, index) => (
            <button
              key={stock.id}
              onClick={() => handleSelect(stock)}
              className={cn(
                "w-full px-4 py-3 text-left flex items-center justify-between hover:bg-accent transition-colors",
                selectedIndex === index && "bg-accent"
              )}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary text-secondary-foreground font-semibold text-sm">
                  {stock.ticker.slice(0, 2)}
                </div>
                <div>
                  <div className="font-medium text-foreground">{stock.ticker}</div>
                  <div className="text-sm text-muted-foreground truncate max-w-[200px]">
                    {stock.name}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs text-muted-foreground">{stock.exchange}</div>
                <div className="text-sm font-medium">{formatMarketCap(stock.marketCap)}</div>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* No results */}
      {isOpen && query && results.length === 0 && (
        <div className="absolute z-50 w-full mt-2 py-6 px-4 bg-card border border-border rounded-xl shadow-lg text-center">
          <p className="text-muted-foreground">No stocks found for "{query}"</p>
        </div>
      )}
    </div>
  );
}
