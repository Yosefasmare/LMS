import { create } from "node:domain";
import { prisma } from "./prisma_init";
import { BookDataType, BookDetail } from "./types";



export const  getLatestBooks = async () => {
    return  await prisma.book.findMany({
        orderBy: {createdAt: 'desc'},
        take: 8
    })
} 

export const searchBooks = async (q:string) => {
  return await prisma.book.findMany({
    where: {
        OR: [
            {title: {contains: q, mode: 'insensitive'}},
            {author: {contains: q, mode: 'insensitive'}}
        ]
    }
  })
}




export const addbook = async (bookdata: BookDataType) => {
    return await prisma.book.create({
        data: {
            title: bookdata.title,
            author: bookdata.author,
            description: bookdata.description ?? null,
            category: bookdata.category,
            coverImage: bookdata.coverImage ?? null,
            
            soft_copy: bookdata.soft_copy ? {
                create: 
                    {
                    filePath: bookdata.soft_copy.filePath,
                    fileType: bookdata.soft_copy.fileType,
                    fileSize: bookdata.soft_copy.fileSize
                }
            
            } : undefined,

            physical_copies: bookdata.physical_copies?.length !== 0 && bookdata.physical_copies ?  {
                create: bookdata.physical_copies.map(copies => ({
                    bookCode: copies.bookCode,
                }))
            }
            : undefined
            
        }

    })
}


export const popularBooks = async () => {
    try {
        
        const data = await prisma.book.findMany({
            take: 10,
            orderBy:[
                 {popularityScore: 'desc'} ,
                 {createdAt: 'desc'}
                ]   
        })

        return {
            data,
            success: true
        }

    } catch (error) {
        console.log('Fetching popular books failed', error)
        return {
            data: null,
            success:false
        }
    }
}


export const fetachBooksBasedOnCatagory = async () => {
    try {

        // get catagories with books in them

         const distinctCategories = await prisma.book.findMany({
           distinct: ['category'],
           select: { category: true },
           take: 10, 
         });

         const categoryList = distinctCategories.map(c => c.category);


         //gets the data based on the catagory list above

         const categoryPromises = categoryList.map((cat) =>
           prisma.book.findMany({
             where: { category: cat },
             orderBy: [{ popularityScore: "desc" }, { createdAt: "desc" }],
             take: 10,
           })
         );
       
         const results = await Promise.all(categoryPromises);

         //combines the book found to thier catagory
       
         const shelfData = categoryList.map((cat, index) => ({
           title: cat,
           books: results[index],
         }));

        return {
            data: shelfData,
            success: true
        }
        
    } catch (error) {
        console.log(error)
        return {
            data: null,
            success: false
        }
    }
}


export const getBookDetail = async (bookId:string) => {
   try {

          const book = await prisma.book.findUnique({
              where: { id: bookId },
              include: {
                soft_copy: true,
                physical_copies: {
                  select: { status: true } 
                },
                _count: {
                  select: { physical_copies: true } 
                }
              }
         });

       if(!book){
        return {
            data: null,
            success: true
        }
       }

       const availableCount = book.physical_copies.filter(
          (copy) => copy.status === "available"
      ).length;

           const data: BookDetail = {
             title: book.title,
             author: book.author,
             category: book.category ?? "General",
             description: book.description ?? "",
             coverImage: book.coverImage ?? undefined,
             createdAt: book.createdAt,
             soft_copy: book.soft_copy ? {
               id: book.soft_copy.id,
               filePath: book.soft_copy.filePath,
               fileType: book.soft_copy.fileType,
               numberofDownloads: book.soft_copy.numberofDownloads,
               fileSize: book.soft_copy.fileSize ?? 0,
             } : undefined,
             totalPhysicalCopies: book._count.physical_copies,
             availablePhysicalCopies: availableCount,
           };


    return {
        data,
        success: true
    }

    
   } catch (error) {
    console.log(error)
    return {
        data: null,
        success: false
    }
   }
}



export const getSimilarBooks = async (currentBookId: string ,author: string, category: string) => {
   try {

    const data = await prisma.book.findMany({
        take: 6,
        where: {
            id: {
                not: currentBookId
            },
            OR: [
                {author},
                {category}
            ],
        
        },
        
        
    })

    return { 
        data,
        success: true
    }

    
   } catch (error) {
    console.log(error)
    return {
        data: null,
        success: false
    }
   }
}