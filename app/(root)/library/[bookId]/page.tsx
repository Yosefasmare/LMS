import Image from "next/image";
import { 
  Download, 
  CheckCircle, 
  AlertCircle, 
  Calendar, 
  FileText, 
  HardDrive,
  ArrowLeft
} from "lucide-react";
import Link from "next/link";
import LibraryBookCard from "@/components/library/LibraryBookCard";
import { BookDetail } from "@/lib/types";
import { Suspense } from "react";
import LoadingSkeleton from "@/components/library/[bookid]/LoadingSkeleton";
import { getBookDetail, getSimilarBooks } from "@/lib/prisma_func";
import NoBookFound from "@/components/library/[bookid]/NoBookFound";


const BookDetailsPage = async ({ params }: { params: { bookId: string }}) => {

  const {bookId} = await  params

  //fetching the book detail

  const resDetails = await getBookDetail(bookId)

  if(!resDetails.success){
    throw new Error('network said not ok, on fetching book detail')
  }

  const data: BookDetail | null  = resDetails.data



  if(!data){
    return (
      <NoBookFound />
    )
  }
  

  const { 
    title, 
    author, 
    category, 
    description, 
    coverImage, 
    soft_copy, 
    availablePhysicalCopies, 
    totalPhysicalCopies,
    createdAt
  } = data;


   //fetching similar books

  const resSimilar = await getSimilarBooks(bookId,author,category)
  const similarBooksData = resSimilar.data || []

  const formattedDate = new Intl.DateTimeFormat('en-US', {
  day: 'numeric',
  month: 'long',
  year: 'numeric'
}).format(new Date(createdAt));

  const isLowAvailability = availablePhysicalCopies === 1;
  const isOutOfStock = availablePhysicalCopies === 0;

  return (
    <Suspense fallback={<LoadingSkeleton />}>

    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Back Button */}
      <Link href="/library" className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-secondary hover:text-accent transition-colors">
        <ArrowLeft size={16} />
        Back to Library
      </Link>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start">
        {/* Left Side: Book Cover */}
        <div className="lg:col-span-4">
          <div className="relative aspect-2/3 w-full overflow-hidden rounded-[2.5rem] bg-white shadow-2xl ring-1 ring-border/50">
            <Image
              src={coverImage || `/defualt_cover.png`}
              alt={title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 33vw"
            />
          </div>
        </div>

        {/* Right Side: Details & Actions */}
        <div className="lg:col-span-8 flex flex-col space-y-10">
          {/* Header Info */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center rounded-full bg-accent/10 px-3 py-1 text-[10px] md:text-xs font-bold uppercase tracking-wider text-accent ring-1 ring-accent/20">
                {category}
              </span>
            </div>
            <h1 className="text-3xl font-black tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              {title}
            </h1>
            <p className="text-lg md:text-xl font-bold text-secondary/80">by <span className="text-foreground">{author}</span></p>
            <div className="mt-6 max-w-3xl">
              <p className="text-base md:text-lg leading-relaxed text-secondary/90">
                {description}
              </p>
            </div>
          </div>

          {/* Availability & Actions Block */}
          <div className="flex flex-col gap-6 rounded-[2rem] bg-card p-8 shadow-xl shadow-slate-900/5 ring-1 ring-border/50 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-6">
              {/* Digital Copy Status */}
              <div className="space-y-3">
                <h3 className="text-sm font-black uppercase tracking-widest text-secondary/40">Digital Availability</h3>
                {soft_copy ? (
                  <button className="flex items-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-bold text-white shadow-lg shadow-accent/20 transition-all hover:scale-105 hover:bg-accent/90 active:scale-95">
                    <Download size={18} />
                    Download Digital Copy
                  </button>
                ) : (
                  <p className="flex items-center gap-2 text-sm font-medium text-secondary/60 italic">
                    <AlertCircle size={16} />
                    No digital copy available
                  </p>
                )}
              </div>

              {/* Physical Copy Status */}
              <div className="space-y-3">
                <h3 className="text-sm font-black uppercase tracking-widest text-secondary/40">Physical Library</h3>
                <div className="flex items-center gap-2">
                  {isOutOfStock ? (
                    <span className="flex items-center gap-2 text-sm font-bold text-error">
                      <AlertCircle size={18} />
                      All copies are currently borrowed / No copies available for this book.
                    </span>
                  ) : (
                    <span className={`flex items-center gap-2 text-sm font-bold ${isLowAvailability ? 'text-warning' : 'text-success'}`}>
                      <CheckCircle size={18} />
                      {availablePhysicalCopies} {availablePhysicalCopies === 1 ? 'copy' : 'copies'} available 
                      <span className="font-medium text-secondary/40"> (of {totalPhysicalCopies} total)</span>
                    </span>
                  )}
                  {isLowAvailability && <span className="animate-pulse rounded-md bg-warning/10 px-2 py-0.5 text-[10px] uppercase tracking-tight text-warning ring-1 ring-warning/20">Only 1 left</span>}
                </div>
              </div>
            </div>

            {/* Main Action Button */}
            <div className="flex flex-col gap-3 min-w-[200px]">
              {!isOutOfStock ? (
                <button className="w-full rounded-2xl bg-foreground px-8 py-5 text-sm font-black text-background transition-all hover:scale-[1.02] hover:bg-accent active:scale-95 shadow-xl shadow-slate-900/10">
                  Borrow Book Now
                </button>
              ) : (
                <button className="w-full rounded-2xl border-2 border-foreground px-8 py-5 text-sm font-black text-foreground transition-all hover:scale-[1.02] hover:bg-foreground hover:text-background active:scale-95">
                  Reserve Book
                </button>
              )}
              <p className="text-center text-[10px] font-bold uppercase tracking-widest text-secondary/30">
                {isOutOfStock ? 'Notify me when available' : 'Standard 14-day loan'}
              </p>
            </div>
          </div>

          {/* Metadata Grid */}
          <div className="grid grid-cols-2 gap-8 border-t border-border/50 pt-10 sm:grid-cols-3">
            <div className="space-y-2">
              <p className="flex items-center gap-2 text-[10px] font-black uppercase tracking-tighter text-secondary/40">
                <Calendar size={12} />
                Added to Library
              </p>
              <p className="text-sm font-bold text-foreground">{formattedDate}</p>
            </div>
            <div className="space-y-2">
              <p className="flex items-center gap-2 text-[10px] font-black uppercase tracking-tighter text-secondary/40">
                <FileText size={12} />
                File Format
              </p>
              <p className="text-sm font-bold text-foreground">{soft_copy ? soft_copy?.fileType : '-'}</p>
            </div>
            <div className="space-y-2">
              <p className="flex items-center gap-2 text-[10px] font-black uppercase tracking-tighter text-secondary/40">
                <HardDrive size={12} />
                File Size
              </p>
              <p className="text-sm font-bold text-foreground">{soft_copy ? (soft_copy?.fileSize / (1024 * 1024)).toFixed(2) + ' MB'  : '-'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Similar Books Section */}
      {similarBooksData && similarBooksData.length > 0 && (
        <section className="mt-24 space-y-10">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl md:text-4xl font-black tracking-tight text-foreground">
              Similar <span className="text-accent">Books</span>
            </h2>
            <Link href="/library" className="group flex items-center gap-2 text-sm font-bold text-accent">
              View all
              <ArrowLeft size={16} className="rotate-180 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="flex gap-8 overflow-x-auto pb-10 scrollbar-hide pt-4">
            {similarBooksData.map((book) => (
              <div key={book.id}>
                <LibraryBookCard {...book} />
              </div>
            ))}
          </div>
        </section>
      )}
    </div>

    </Suspense>

  );
};

export default BookDetailsPage;