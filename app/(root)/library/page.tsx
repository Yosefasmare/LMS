import { Suspense } from "react";
import Header from "@/components/home/Header";
import Footer from "@/components/home/Footer";
import LibrarySearchBar from "@/components/library/LibrarySearchBar";
import BookCategoryRow from "@/components/library/BookCategoryRow";
import { BookCardDataType } from "@/lib/types";
import PopularBooks from "@/components/library/PopularBooks";
import LoadingSkeleton from "@/components/library/LoadingSkeleton";
import { SearchX } from "lucide-react";
import { fetachBooksBasedOnCatagory, popularBooks } from "@/lib/prisma_func";


interface CatBooksType {
  title: string | null ,
  books: BookCardDataType[]
}

const LibraryPage = async () => {

        //fetch popular books

        const popREs = await popularBooks()
        
        if(!popREs.success){
           throw new Error('Error on fetaching popular books')
        }

        const popBooks: BookCardDataType[] | null = popREs.data

         //fetch books based on category

        const catRes = await fetachBooksBasedOnCatagory()
        if(!catRes.success){
           throw new Error('Error on fetaching books based on category!')
        }

         // TODO: Fix title null Problem

        const catBooks: CatBooksType[] | null = catRes.data



  return (
   

 <Suspense fallback={<LoadingSkeleton />} >
    <div className="flex min-h-screen flex-col bg-background font-sans">
      <Header />
      <main className="flex-1">
        {/* Search Section */}
        <section className="relative bg-background py-8 md:py-12">
          <div className="container relative z-10 mx-auto px-6 text-center">
            <div className="mx-auto max-w-2xl space-y-3">
              <h1 className="text-2xl font-black tracking-tight text-foreground md:text-4xl">
                Explore <span className="text-accent underline decoration-accent/10 decoration-4 underline-offset-4">Collection</span>
              </h1>
              <p className="mx-auto max-w-lg text-sm font-medium text-secondary/70 md:text-base">
                Find your next favorite book in our diverse repository.
              </p>
              <div className="mx-auto pt-2">
                <LibrarySearchBar />
              </div>
            </div>
          </div>
        </section>
        {/*Popular books*/}


        <PopularBooks
         data={popBooks}
          />

        { 
         catBooks && catBooks.length > 0 ? (
        <div className="container mx-auto py-8">
          {catBooks!.map((category) => (
            <BookCategoryRow
              key={category.title}
              title={category.title || "No Title"}
              books={category.books}
              viewAllLink={category.title || "No Title"}
            />
          ))}
        </div>

        )  : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="mb-6 rounded-full bg-secondary/10 p-6 ring-1 ring-secondary/20">
              <SearchX size={48} className="text-secondary-foreground/40" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              No books found
            </h2>
            <p className="mt-2 max-w-sm text-balance text-muted-foreground">
              We couldn&apos;t find any books matching your current categories or search criteria. 
            </p>
          </div>
        )
        }
      </main>
      <Footer />
    </div>
      
 </Suspense>
   

  );
};

export default LibraryPage;