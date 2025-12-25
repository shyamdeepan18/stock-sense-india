import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { BarChart3, X, Plus } from "lucide-react";
import { stocks, getStockById } from "@/data/stocks";
import { Stock } from "@/types/stock";
import { formatINR, formatMarketCap, formatPercentage, formatRatio, getValueColorClass } from "@/lib/format";
import { HealthBadge } from "@/components/stock/HealthBadge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

export default function ComparePage() {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const selectedStocks = selectedIds.map(id => getStockById(id)).filter(Boolean) as Stock[];

  const addStock = (id: string) => {
    if (selectedIds.length < 3 && !selectedIds.includes(id)) {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const removeStock = (id: string) => {
    setSelectedIds(selectedIds.filter(s => s !== id));
  };

  const availableStocks = stocks.filter(s => !selectedIds.includes(s.id));

  const getBestValue = (values: number[], higherIsBetter = true) => {
    if (values.length === 0) return -1;
    const best = higherIsBetter ? Math.max(...values) : Math.min(...values);
    return values.indexOf(best);
  };

  return (
    <>
      <Helmet>
        <title>Compare Stocks | StockSankhya</title>
        <meta name="description" content="Compare up to 3 Indian stocks side by side on key fundamental metrics." />
      </Helmet>

      <main className="container py-8 pb-24 md:pb-8">
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold flex items-center gap-3">
            <BarChart3 className="h-8 w-8 text-primary" />
            Compare Stocks
          </h1>
          <p className="text-muted-foreground mt-1">Select up to 3 stocks to compare side by side</p>
        </div>

        {/* Stock Selector */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          {selectedStocks.map((stock) => (
            <div key={stock.id} className="flex items-center gap-2 bg-secondary px-3 py-2 rounded-lg">
              <span className="font-medium">{stock.ticker}</span>
              <button onClick={() => removeStock(stock.id)} className="text-muted-foreground hover:text-foreground">
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
          {selectedIds.length < 3 && (
            <Select onValueChange={addStock}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Add stock..." />
              </SelectTrigger>
              <SelectContent>
                {availableStocks.map((stock) => (
                  <SelectItem key={stock.id} value={stock.id}>
                    {stock.ticker} - {stock.name.slice(0, 20)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>

        {selectedStocks.length === 0 ? (
          <div className="text-center py-16 bg-card border border-border rounded-xl">
            <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Select stocks to compare</h2>
            <p className="text-muted-foreground">Choose 2-3 stocks from the dropdown above</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-4 px-4 font-medium text-muted-foreground">Metric</th>
                  {selectedStocks.map((stock) => (
                    <th key={stock.id} className="text-center py-4 px-4 min-w-[180px]">
                      <div className="font-bold text-lg">{stock.ticker}</div>
                      <div className="text-sm text-muted-foreground truncate">{stock.name}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* Health Badges */}
                <tr className="border-b border-border bg-muted/30">
                  <td className="py-4 px-4 font-medium">Health</td>
                  {selectedStocks.map((stock) => (
                    <td key={stock.id} className="py-4 px-4 text-center">
                      <div className="flex flex-wrap justify-center gap-1">
                        {stock.health && (
                          <>
                            <HealthBadge type="financialStrength" value={stock.health.financialStrength} size="sm" />
                            <HealthBadge type="debtLevel" value={stock.health.debtLevel} size="sm" />
                          </>
                        )}
                      </div>
                    </td>
                  ))}
                </tr>
                {/* Price */}
                <tr className="border-b border-border">
                  <td className="py-4 px-4 font-medium">Price</td>
                  {selectedStocks.map((stock) => (
                    <td key={stock.id} className="py-4 px-4 text-center font-semibold">
                      {formatINR(stock.currentPrice)}
                    </td>
                  ))}
                </tr>
                {/* Market Cap */}
                <tr className="border-b border-border">
                  <td className="py-4 px-4 font-medium">Market Cap</td>
                  {selectedStocks.map((stock, i) => (
                    <td key={stock.id} className={cn("py-4 px-4 text-center", getBestValue(selectedStocks.map(s => s.marketCap)) === i && "text-success font-semibold")}>
                      {formatMarketCap(stock.marketCap)}
                    </td>
                  ))}
                </tr>
                {/* PE Ratio */}
                <tr className="border-b border-border">
                  <td className="py-4 px-4 font-medium">PE Ratio</td>
                  {selectedStocks.map((stock, i) => (
                    <td key={stock.id} className={cn("py-4 px-4 text-center", getBestValue(selectedStocks.map(s => s.fundamentals.peRatio), false) === i && "text-success font-semibold")}>
                      {formatRatio(stock.fundamentals.peRatio)}
                    </td>
                  ))}
                </tr>
                {/* ROE */}
                <tr className="border-b border-border">
                  <td className="py-4 px-4 font-medium">ROE</td>
                  {selectedStocks.map((stock, i) => (
                    <td key={stock.id} className={cn("py-4 px-4 text-center", getBestValue(selectedStocks.map(s => s.fundamentals.roe)) === i && "text-success font-semibold")}>
                      {formatPercentage(stock.fundamentals.roe, false)}
                    </td>
                  ))}
                </tr>
                {/* D/E */}
                <tr className="border-b border-border">
                  <td className="py-4 px-4 font-medium">Debt/Equity</td>
                  {selectedStocks.map((stock, i) => (
                    <td key={stock.id} className={cn("py-4 px-4 text-center", getBestValue(selectedStocks.map(s => s.fundamentals.debtToEquity), false) === i && "text-success font-semibold")}>
                      {formatRatio(stock.fundamentals.debtToEquity)}
                    </td>
                  ))}
                </tr>
                {/* Profit Growth */}
                <tr className="border-b border-border">
                  <td className="py-4 px-4 font-medium">Profit Growth</td>
                  {selectedStocks.map((stock, i) => (
                    <td key={stock.id} className={cn("py-4 px-4 text-center", getValueColorClass(stock.fundamentals.profitGrowth), getBestValue(selectedStocks.map(s => s.fundamentals.profitGrowth)) === i && "font-semibold")}>
                      {formatPercentage(stock.fundamentals.profitGrowth)}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </main>
    </>
  );
}
