import React from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import AddBookForm from "@/components/admin/AddBookForm";

export default function AddBookPage() {

  let bookData

    // await addbook(bookData);


  return (
    <div className="max-w-3xl mx-auto p-6 md:p-10 relative">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/admin/books"
          className="p-2 hover:bg-black/5 rounded-full transition-colors text-foreground"
        >
          <ChevronLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Add New Book</h1>
          <p className="text-sm text-secondary font-medium mt-1">Enter book details to add to the library</p>
        </div>
      </div>

      <AddBookForm />
    </div>
  );
}
