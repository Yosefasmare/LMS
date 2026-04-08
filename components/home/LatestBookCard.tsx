'use client'

import Image from "next/image";
import { BookCardDataType } from "@/lib/types";
import { ArrowRight, BookOpen } from "lucide-react";
import Link from "next/link";

export default function LatestBookCard({
  id,
  title,
  author,
  coverImage,
  category = "Programming", // Default to Programming as per request example
}: BookCardDataType) {


  return (
    <Link href={`/library/${id}`} className="group relative flex w-full max-w-[240px] flex-col transition-all duration-500">
      {/* Book Cover Container with Soft Shadow and Elegant Lift on Hover */}
      <div className="relative aspect-[2/3] w-full overflow-hidden rounded-[2.5rem] bg-white shadow-xl shadow-slate-900/5 ring-1 ring-border/50 transition-all duration-700 group-hover:-translate-y-4 group-hover:shadow-2xl group-hover:shadow-accent/20">
        <Image
          src={coverImage || '/defualt_cover.png'}
          alt={title}
          fill
          className="object-cover transition-transform duration-1000 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 33vw, 25vw"
        />

        {/* Soft Category Badge */}
        <div className="absolute left-4 top-4 z-20">
          <span className="inline-flex items-center rounded-xl bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-accent backdrop-blur-md ring-1 ring-accent/10">
            {category}
          </span>
        </div>

        {/* Overlay with Quick View Button that appears on hover */}
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-accent/5 opacity-0 backdrop-blur-[2px] transition-all duration-500 group-hover:opacity-100">
          <button className="flex items-center gap-2 rounded-2xl bg-foreground px-6 py-3 text-xs font-bold uppercase tracking-widest text-background shadow-2xl shadow-slate-900/40 transition-all duration-300 hover:scale-105 active:scale-95">
            <BookOpen size={14} />
            Quick view
          </button>
        </div>
      </div>

      {/* Book Information Section */}
      <div className="mt-8 flex w-full flex-col space-y-2 px-2">
        <h3 className="line-clamp-1 text-xl font-black tracking-tight text-foreground transition-colors duration-300 group-hover:text-accent">
          {title}
        </h3>
        <div className="flex items-center justify-between">
          <p className="text-sm font-bold uppercase tracking-wide text-secondary/60 font-sans">
            {author}
          </p>
          <div className="h-1 w-1 rounded-full bg-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>
      </div>
    </Link>
  );
}
