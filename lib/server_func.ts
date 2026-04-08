'use server'

import { addbook } from "@/lib/prisma_func";
import { BookDataType } from "@/lib/types";
import { revalidatePath } from "next/cache";
import { Storage } from "@google-cloud/storage";

const storage = new Storage({
  projectId: process.env.GCP_PROJECT_ID,
  credentials: {
    client_email: process.env.GCP_CLIENT_EMAIL,
    private_key: process.env.GCP_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  },
});

const bucket = storage.bucket(process.env.GCP_BUCKET_NAME!);


export const uploadBookDigitalCopy = async (file:File) => {
 try {
    if(!file) throw Error('no file uploaded')

       const buffer = Buffer.from(await file.arrayBuffer());
       const bookpath = `digital-books/${Date.now()}-${file.name}`;
       const gcsFile = bucket.file(bookpath);


       await gcsFile.save(buffer, {
        metadata: {
            contentType: file.type
        }
       })


       return {
        data: bookpath,
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


export const uploadCoverImage =  async (coverImage: File) => {
   try {
    
    if(!coverImage) throw Error('no file uploaded')

            const buffer = Buffer.from(await coverImage.arrayBuffer());
            const coverPath = `book-cover/${Date.now()}-${coverImage.name}`;
            const gcsFile = bucket.file(coverPath);
     
   
             await gcsFile.save(buffer, {
              metadata: {
                  contentType: coverImage.type
              }
             })

            const coverPublicUrl = `https://storage.googleapis.com/${process.env.GCP_BUCKET_NAME}/${coverPath}`

            return {
              data: coverPublicUrl,
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






export async function createBookAction(data: BookDataType) {
  try {
    const newBook = await addbook(data);
    
    // This tells Next.js to refresh the library page data
    revalidatePath("/library"); 
    
    return { success: true, book: newBook };
  } catch (error) {
    console.error("Database Error:", error);
    return { success: false, error: "Failed to add book to database" };
  }
}