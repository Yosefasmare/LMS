import { BookCardDataType } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";

interface PopularBooksProps {
  data: BookCardDataType[] | null;
}

const PopularBooks = ({ data }: PopularBooksProps) => {
  if (!data || data.length === 0) return null;
  

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="relative mb-10 inline-block">
        <h2 className="relative z-10 bg-accent px-4 py-2 text-3xl font-black uppercase italic tracking-tighter text-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
           Popular Books
        </h2>
        <div className="absolute -bottom-2 -right-2 h-full w-full border-4 border-black bg-white" />
      </div>

      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {data.map((book, index) => (
          <Link
            key={book.id || index}
            href={`/library/${book.id}`}
            className="group relative flex flex-col transition-transform hover:-translate-y-1"
          >
            {/* Neo-brutalism Card Container */}
            <div className="relative aspect-[2/3] w-full overflow-hidden border-4 border-black bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all group-hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <Image
                src={book.coverImage || `/defualt_cover.png`}
                alt={book.title}
                fill
                className="object-cover transition-transform group-hover:scale-105"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
              />
              
              {/* Hot/Pick Badge */}
              <div className="absolute left-2 top-2 z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 border-black bg-[#FFDE59] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                 <Star className="h-5 w-5 fill-black text-black" />
              </div>
            </div>

            {/* Info Section */}
            <div className="mt-4 flex flex-col space-y-1">
              <h3 className="line-clamp-2 text-base font-black leading-tight text-foreground group-hover:text-accent transition-colors">
                {book.title}
              </h3>
              <p className="text-sm font-bold text-secondary uppercase tracking-tight">
                {book.author}
              </p>
            </div>
            
            {/* Category Tag (Optional) */}
            {book.category && (
              <span className="mt-2 inline-block w-fit border-2 border-black bg-secondary-light px-2 py-0.5 text-[10px] font-black uppercase tracking-widest text-black">
                {book.category}
              </span>
            )}
          </Link>
        ))}
      </div>
    </section>
  );
};

export default PopularBooks;