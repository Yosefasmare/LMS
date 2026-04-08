export type  BookCardDataType= {
    id: string,
    title: string,
    author: string
    coverImage: string | null
    category: string | null
}    

export type BookDataType  = {
    title: string;
    author: string;
    description?: string;
    category: string;
    coverImage?: string;

    soft_copy?: DigitalCopy  ;
    physical_copies?: Copy[]
}


 interface DigitalCopy  {
    filePath: string;
    fileType: string;
    fileSize: number;
}

 type Copy = {
    bookkId?: string;
    bookCode: string;
    status?: string;
     
    reservations?: Reservation[]
    borrows?: Borrow[]
}

type Reservation = {
    code:string;
    userId: string;
    copyId: string;
    status: string;
}

type Borrow = {
    userId:string;
    copyId: string;

}

export type BookDetail = {
    title: string, 
    author: string, 
    category: string, 
    description: string, 
    coverImage?: string, 
    createdAt: Date, 

    soft_copy?:  {
        id: string,
        filePath: string,
        fileType: string,
        numberofDownloads: number,
        fileSize: number
    },

    
    availablePhysicalCopies: number
    totalPhysicalCopies: number
  
}