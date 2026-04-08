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

        <section className="relative mx-auto w-[95%] max-w-7xl overflow-hidden rounded-[3.5rem] bg-card/60 py-20 shadow-2xl shadow-slate-900/5 backdrop-blur-sm ring-1 ring-border/50 transition-all duration-500 hover:shadow-slate-900/10">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[30rem] h-[30rem] bg-accent/5 blur-[120px] pointer-events-none rounded-full" />
          
          <div className="relative z-10 mx-auto px-6 lg:px-16">
            <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-10 border-b border-border/50 pb-12">
              <div className="max-w-2xl space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-accent ring-1 ring-inset ring-accent/20">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                  </span>
                  New arrivals
                </div>
                <h2 className="text-5xl font-black tracking-tighter text-foreground sm:text-6xl">
                  Latest <span className="text-accent underline decoration-accent/20 decoration-8 underline-offset-8">Books</span>
                </h2>
                <p className="text-xl font-medium text-secondary">Discover the freshest titles added to our collection this week.</p>
              </div>
              <Link href="/books" className="group flex items-center gap-3 rounded-2xl bg-foreground px-8 py-4 text-sm font-bold text-background transition-all hover:scale-105 hover:bg-accent active:scale-95">
                Explore library
                <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
    
              <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-3 lg:grid-cols-4 justify-items-center">
                {books.length > 0 ? (
                  books.map((book) => (
                    <LatestBookCard key={book.id} {...book} />
                  ))
                ) : (
                  <div className="col-span-full flex flex-col items-center justify-center py-24 text-center bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
                      <span className="text-2xl opacity-50">📚</span>
                    </div>
                    <p className="text-xl font-bold text-slate-900">No books found</p>
                    <p className="text-slate-500 mt-2 max-w-xs">We couldn&apos;t find any books matching your search. Check back later for new additions.</p>
                  </div>
                )}
              </div>
          </div>
        </section>
    </Suspense>
  );
}
