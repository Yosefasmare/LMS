/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Search, X } from "lucide-react";
import { useState } from "react";

interface SearchBarProps {
  className?: string;
  variant?: "header" | "hero";
  setBooks?: any;
  setIsSearching?: any;
}

export default function SearchBar({ className = "", variant = "hero" }: SearchBarProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      // if (setIsSearching) setIsSearching(true);
      // try {
      //   const req = await fetch(`/api/books/search?q=${query}`);
      //   const data = await req.json();
      //   if (setBooks) setBooks(data);
      // } catch (error) {
      //   console.error("Search failed:", error);
      // } finally {
      //   if (setIsSearching) setIsSearching(false);
      // }
    }
  };

  const clearSearch = () => {
    setQuery("");
    // Optionally trigger a reset of books if desired, e.g., fetching all again
  };

  if (variant === "hero") {
    return (
      <form onSubmit={handleSubmit} className={`relative flex w-full items-center ${className}`}>
        <div className="group relative w-full">
          <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-secondary transition-colors group-focus-within:text-accent">
            <Search className="h-5 w-5" />
          </div>
          <input
            type="text"
            className="w-full rounded-lg border border-border bg-card py-2.5 pl-10 pr-32 text-base text-foreground shadow-sm outline-none transition-all placeholder:text-secondary focus:border-accent focus:ring-2 focus:ring-accent/20"
            placeholder="Search books, authors..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute inset-y-0 right-24 flex items-center justify-center p-2 text-secondary hover:text-foreground"
              aria-label="Clear search"
            >
              <X onClick={() => window.location.reload()} className="h-5 w-5" />
            </button>
          )}
          <button
            type="submit"
            className="absolute inset-y-1.5 right-1.5 rounded-md bg-accent px-4 py-1 text-sm font-semibold text-white transition-all hover:brightness-110"
          >
            Search
          </button>
        </div>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`relative hidden w-full max-w-xs items-center md:flex ${className}`}>
      <div className="group relative w-full">
        <div className="pointer-events-none absolute inset-y-0 left-2.5 flex items-center text-secondary transition-colors group-focus-within:text-accent">
          <Search className="h-3.5 w-3.5" />
        </div>
        <input
          type="text"
          className="w-full rounded-md border border-border bg-background py-1.5 pl-8 pr-8 text-xs text-foreground outline-none transition-all placeholder:text-secondary focus:border-accent focus:ring-1 focus:ring-accent/20"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {query && (
          <button
            type="button"
            onClick={clearSearch}
            className="absolute inset-y-0 right-2 flex items-center justify-center p-1 text-secondary hover:text-foreground"
            aria-label="Clear search"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
    </form>
  );
}
