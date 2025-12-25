import { WatchlistItem } from "@/types/stock";
import { useState, useEffect, useCallback } from "react";

const WATCHLIST_KEY = "stocksankhya_watchlist";

export function useWatchlist() {
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([]);

  // Load watchlist from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(WATCHLIST_KEY);
    if (stored) {
      try {
        setWatchlist(JSON.parse(stored));
      } catch {
        setWatchlist([]);
      }
    }
  }, []);

  // Save to localStorage whenever watchlist changes
  const saveWatchlist = useCallback((items: WatchlistItem[]) => {
    localStorage.setItem(WATCHLIST_KEY, JSON.stringify(items));
    setWatchlist(items);
  }, []);

  // Check if a stock is in watchlist
  const isInWatchlist = useCallback((stockId: string) => {
    return watchlist.some(item => item.stockId === stockId);
  }, [watchlist]);

  // Add stock to watchlist
  const addToWatchlist = useCallback((stockId: string) => {
    if (!isInWatchlist(stockId)) {
      const newItem: WatchlistItem = {
        stockId,
        addedAt: new Date().toISOString(),
      };
      saveWatchlist([...watchlist, newItem]);
    }
  }, [watchlist, isInWatchlist, saveWatchlist]);

  // Remove stock from watchlist
  const removeFromWatchlist = useCallback((stockId: string) => {
    saveWatchlist(watchlist.filter(item => item.stockId !== stockId));
  }, [watchlist, saveWatchlist]);

  // Toggle stock in watchlist
  const toggleWatchlist = useCallback((stockId: string) => {
    if (isInWatchlist(stockId)) {
      removeFromWatchlist(stockId);
    } else {
      addToWatchlist(stockId);
    }
  }, [isInWatchlist, addToWatchlist, removeFromWatchlist]);

  // Clear entire watchlist
  const clearWatchlist = useCallback(() => {
    saveWatchlist([]);
  }, [saveWatchlist]);

  return {
    watchlist,
    isInWatchlist,
    addToWatchlist,
    removeFromWatchlist,
    toggleWatchlist,
    clearWatchlist,
  };
}
