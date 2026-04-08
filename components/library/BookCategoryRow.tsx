"use client";

import  { useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import LibraryBookCard from "./LibraryBookCard";
import { BookCardDataType } from "@/lib/types";



interface BookCategoryRowProps {
  title: string;
  books: BookCardDataType[];
  viewAllLink?: string;
}

const BookCategoryRow = ({ title, books, viewAllLink }: BookCategoryRowProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const scrollAmount = clientWidth * 0.8;
      const targetScroll = direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount;
      scrollContainerRef.current.scrollTo({
        left: targetScroll,
        behavior: "smooth",
      });
    }
  };

  if (books.length === 0) return null;

  return (
    <section className="group relative w-full py-4 md:py-6">
      <div className="flex items-center justify-between px-4 sm:px-8 mb-4">
        <h2 className="text-lg font-bold tracking-tight text-foreground md:text-2xl">
          {title}
        </h2>
        {viewAllLink && (
          <Link
            href={`/library/${viewAllLink}`}
            className="text-sm font-semibold text-accent hover:underline decoration-2 underline-offset-4"
          >
            View All
          </Link>
        )}
      </div>

      <div className="relative">
        {/* Scroll Buttons (Desktop Only) */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 hidden lg:flex h-10 w-10 items-center justify-center rounded-full bg-background/80 border border-border/50 text-foreground opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background shadow-sm"
          aria-label="Scroll left"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <button
          onClick={() => scroll("right")}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 hidden lg:flex h-10 w-10 items-center justify-center rounded-full bg-background/80 border border-border/50 text-foreground opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background shadow-sm"
          aria-label="Scroll right"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        <div
          ref={scrollContainerRef}
          className="flex w-full gap-6 overflow-x-auto px-4 sm:px-8 pb-10 pt-4 scrollbar-hide scroll-smooth no-scrollbar"
        >
          {books.map((book) => (
            <LibraryBookCard key={book.id} {...book} />
          ))}
        </div>
      </div>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default BookCategoryRow;
