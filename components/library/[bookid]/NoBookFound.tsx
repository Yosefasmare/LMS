import React from "react";
import Link from "next/link";
import { SearchX, ArrowLeft } from "lucide-react";

const NoBookFound = () => {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <div className="relative mb-8">
        {/* Background Decorative Element */}
        <div className="absolute inset-0 scale-150 animate-pulse bg-accent/5 blur-3xl" />
        
        {/* Icon Container */}
        <div className="relative flex h-24 w-24 items-center justify-center rounded-[2rem] bg-card shadow-2xl shadow-slate-900/5 ring-1 ring-border/50">
          <SearchX size={48} className="text-secondary/40" />
        </div>
      </div>

      <div className="max-w-md space-y-4">
        <h1 className="text-4xl font-black tracking-tight text-foreground sm:text-5xl">
          Book <span className="text-accent">Not Found</span>
        </h1>
        <p className="text-lg font-medium text-secondary/60">
          We couldn&apos;t find the book you&apos;re looking for. It might have been removed, or the link might be broken.
        </p>
      </div>

      <div className="mt-10">
        <Link 
          href="/library"
          className="group inline-flex items-center gap-2 rounded-2xl bg-foreground px-8 py-4 text-sm font-black text-background transition-all hover:scale-[1.02] hover:bg-accent active:scale-95 shadow-xl shadow-slate-900/10"
        >
          <ArrowLeft size={18} />
          Return to Library
        </Link>
      </div>
    </div>
  );
};

export default NoBookFound;