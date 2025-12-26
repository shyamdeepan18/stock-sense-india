import { useState } from "react";
import { Sparkles, Loader2, AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Stock } from "@/types/stock";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface AISummaryProps {
  stock: Stock;
}

export function AISummary({ stock }: AISummaryProps) {
  const [summary, setSummary] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateSummary = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const { data, error: funcError } = await supabase.functions.invoke("stock-summary", {
        body: {
          stockName: stock.name,
          ticker: stock.ticker,
          sector: stock.sector,
          fundamentals: stock.fundamentals,
        },
      });

      if (funcError) {
        throw new Error(funcError.message);
      }

      if (data?.error) {
        if (data.error.includes("Rate limit")) {
          toast.error("Too many requests. Please wait a moment.");
        } else if (data.error.includes("credits")) {
          toast.error("AI credits exhausted.");
        }
        throw new Error(data.error);
      }

      setSummary(data.summary);
    } catch (err) {
      console.error("Error generating summary:", err);
      setError(err instanceof Error ? err.message : "Failed to generate summary");
    } finally {
      setIsLoading(false);
    }
  };

  if (!summary && !isLoading && !error) {
    return (
      <div className="bg-card border border-border rounded-xl p-6 mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <h2 className="font-semibold">AI Analysis</h2>
          </div>
          <Button onClick={generateSummary} variant="outline" size="sm">
            <Sparkles className="h-4 w-4 mr-2" />
            Generate Summary
          </Button>
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          Get a plain-English explanation of {stock.name}'s fundamentals powered by AI.
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="bg-card border border-border rounded-xl p-6 mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="h-5 w-5 text-primary" />
          <h2 className="font-semibold">AI Analysis</h2>
        </div>
        <div className="flex items-center gap-3 text-muted-foreground">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span>Analyzing {stock.ticker} fundamentals...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-card border border-danger/20 rounded-xl p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-danger" />
            <h2 className="font-semibold">AI Analysis</h2>
          </div>
          <Button onClick={generateSummary} variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Retry
          </Button>
        </div>
        <p className="text-sm text-danger">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-card border border-primary/20 rounded-xl p-6 mb-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <h2 className="font-semibold">AI Analysis</h2>
        </div>
        <Button onClick={generateSummary} variant="ghost" size="sm">
          <RefreshCw className="h-4 w-4 mr-2" />
          Regenerate
        </Button>
      </div>
      <div className="prose prose-sm dark:prose-invert max-w-none">
        <p className="text-muted-foreground whitespace-pre-line">{summary}</p>
      </div>
    </div>
  );
}
