import LatestBookCard from "./LatestBookCard";
import Link from "next/link";
import { Mosaic } from "react-loading-indicators";
import { BookCardDataType } from "@/lib/types";
import { Suspense } from "react";
import { ArrowRight } from "lucide-react";

export default function FeaturedBooks({books} :{books: BookCardDataType[]}) {
  return (
    <Suspense fallback={
      <div className="flex w-full items-center justify-center py-24 text-center">
            <Mosaic color="#2563EB" size="medium" />
        </div>
    }>

        <section className="relative mx-auto w-full md:w-[95%] max-w-7xl overflow-hidden rounded-2xl md:rounded-[3.5rem] bg-card/60 py-10 md:py-20 shadow-2xl shadow-slate-900/5 backdrop-blur-sm ring-1 ring-border/50 transition-all duration-500 hover:shadow-slate-900/10">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[30rem] h-[30rem] bg-accent/5 blur-[120px] pointer-events-none rounded-full" />
          
          <div className="relative z-10 mx-auto px-4 md:px-6 lg:px-16">
            <div className="mb-12 md:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-10 border-b border-border/50 pb-8 md:pb-12">
              <div className="max-w-2xl space-y-3 md:space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-1.5 text-[10px] md:text-xs font-bold uppercase tracking-widest text-accent ring-1 ring-inset ring-accent/20">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                  </span>
                  New arrivals
                </div>
                <h2 className="text-4xl font-black tracking-tighter text-foreground sm:text-5xl lg:text-6xl">
                  Latest <span className="text-accent underline decoration-accent/20 decoration-4 md:decoration-8 underline-offset-4 md:underline-offset-8">Books</span>
                </h2>
                <p className="text-lg md:text-xl font-medium text-secondary">Discover the freshest titles added to our collection this week.</p>
              </div>
              <Link href="/library" className="group flex items-center justify-center gap-3 rounded-2xl bg-foreground px-6 md:px-8 py-3 md:py-4 text-sm font-bold text-background transition-all hover:scale-105 hover:bg-accent active:scale-95">
                Explore library
                <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
    
              <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center">
                {books.length > 0 ? (
                  books.map((book) => (
                    <LatestBookCard key={book.id} {...book} />
                  ))
                ) : (
                  <div className="col-span-full flex flex-col items-center justify-center py-16 md:py-24 text-center bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
                      <span className="text-2xl opacity-50">📚</span>
                    </div>
                    <p className="text-xl font-bold text-slate-900">No books found</p>
                    <p className="text-slate-500 mt-2 max-w-xs px-4">We couldn&apos;t find any books matching your search. Check back later for new additions.</p>
                  </div>
                )}
              </div>
          </div>
        </section>
    </Suspense>
  );
}
