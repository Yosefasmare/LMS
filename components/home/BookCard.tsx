import Image from "next/image";
import { MouseEvent } from "react";

export type BookAvailability = "available" | "reserved" | "borrowed";

interface BookCardProps {
  title: string;
  author: string;
  coverImage?: string;
  availability?: BookAvailability;
}

export default function BookCard({
  title,
  author,
  coverImage,
  availability = "available",
}: BookCardProps) {

  const defualtBookIcon = `https://storage.googleapis.com/${process.env.GCP_BUCKET_NAME}/defualt_cover.webp`



  const getStatusConfig = (status: BookAvailability) => {
    switch (status) {
      case "available":
        return { bg: "bg-[#16A34A]", text: "Available" };
      case "reserved":
        return { bg: "bg-[#F59E0B]", text: "Reserved" };
      case "borrowed":
        return { bg: "bg-[#DC2626]", text: "Borrowed" };
      default:
        return { bg: "bg-gray-500", text: "Unknown" };
    }
  };

  const statusConfig = getStatusConfig(availability);
  const isAvailable = availability === "available";

  const handleReserve = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    // Implementation for reserve action goes here
  };


  return (
    <div className="group relative w-full flex flex-col overflow-hidden rounded-md border border-gray-200 bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md cursor-pointer">
      
      {/* 1. Cover Image Header (2:3 Aspect) */}
      <div className="relative aspect2/3 w-full overflow-hidden bg-gray-100">
        <Image
          src={coverImage || defualtBookIcon}
          alt={title}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 15vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* 3. Availability Badge */}
        <div className={`absolute right-1.5 top-1.5 rounded-full px-2 py-0.5 text-[10px] font-bold tracking-wide text-white shadow-sm ${statusConfig.bg}`}>
          {statusConfig.text}
        </div>
      </div>

      {/* 2. Info Section (Tight Spacing) */}
      <div className="flex flex-1 flex-col justify-between p-2">
        <div className="mb-2">
          <h3 className="line-clamp-2 text-sm font-medium leading-tight text-[#0F172A]" title={title}>
            {title}
          </h3>
          <p className="mt-0.5 line-clamp-1 text-xs text-[#475569]" title={author}>
            {author}
          </p>
        </div>

        {/* 4. Action Area */}
        <div className="mt-auto">
          {isAvailable ? (
            <button 
              onClick={handleReserve}
              className="w-full rounded bg-[#2563EB] py-1.5 text-xs font-bold text-white transition-colors hover:bg-[#1D4ED8]"
            >
              Reserve
            </button>
          ) : (
            <button 
              disabled
              className="w-full rounded bg-gray-100 py-1.5 text-xs font-bold text-gray-400 cursor-not-allowed"
            >
              Unavailable
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
