"use client";

import { Search } from "lucide-react";
import React from "react";

const LibrarySearchBar = () => {
  return (
    <div className="w-full max-w-2xl mx-auto py-2">
      <div className="group relative">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-secondary/40 group-focus-within:text-accent transition-colors duration-300">
          <Search className="h-5 w-5" />
        </div>
        <input
          type="text"
          className="w-full bg-card/40 border border-border/50 rounded-xl py-3 pl-12 pr-6 text-sm font-medium outline-none shadow-sm backdrop-blur-sm transition-all duration-300 placeholder:text-secondary/30 focus:ring-2 focus:ring-accent/10 focus:border-accent hover:bg-card/60"
          placeholder="Search books, authors, or genres..."
        />
      </div>
    </div>
  );
};

export default LibrarySearchBar;
