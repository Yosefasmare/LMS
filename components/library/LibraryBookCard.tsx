import { BookCardDataType } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BookOpen } from "lucide-react";

interface LibraryBookCardProps {
  id: string;
  title: string;
  author: string;
  coverImage: string;
}

 

const LibraryBookCard = ({ id, title, author, coverImage }: BookCardDataType) => {
  return (
    <Link href={`/library/${id}`} className="group relative flex-shrink-0 w-[140px] sm:w-[180px] md:w-[200px] flex flex-col transition-all duration-500 hover:-translate-y-2 cursor-pointer">
      <div className="relative aspect-[2/3] w-full overflow-hidden rounded-[2rem] bg-white shadow-lg shadow-slate-900/5 ring-1 ring-border/50 transition-all duration-700 group-hover:shadow-2xl group-hover:shadow-accent/20">
        <Image
          src={coverImage || `/defualt_cover.png`}
          alt={title}
          fill
          className="object-cover transition-transform duration-1000 group-hover:scale-110"
          sizes="(max-width: 640px) 140px, (max-width: 768px) 180px, 200px"
        />
        
        {/* Quick View Button that appears on hover */}
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-accent/5 opacity-0 backdrop-blur-[2px] transition-all duration-500 group-hover:opacity-100">
          <button className="flex items-center gap-1.5 rounded-xl bg-foreground px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-background shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95">
            <BookOpen size={12} />
            Quick view
          </button>
        </div>
      </div>
      
      <div className="mt-4 flex flex-col space-y-1.5 px-2">
        <h3 className="line-clamp-2 text-sm font-black tracking-tight text-foreground transition-colors duration-300 group-hover:text-accent leading-snug">
          {title}
        </h3>
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-bold uppercase tracking-wider text-secondary/60 truncate">
            {author}
          </p>
          <div className="h-1 w-1 rounded-full bg-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>
      </div>
    </Link>
  );
};

export default LibraryBookCard;
