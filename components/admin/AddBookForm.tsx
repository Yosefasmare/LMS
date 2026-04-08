"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { Upload, FileText, Book, BookOpen, AlertCircle, CheckCircle2 } from "lucide-react";
import { createBookAction, uploadBookDigitalCopy, uploadCoverImage } from "@/lib/server_func";
import { BookDataType } from "@/lib/types";

type BookType = "digital" | "physical";

const BOOK_CATEGORIES = [
  "Science",
  "Technology",
  "Engineering",
  "Mathematics",
  "History",
  "Literature",
  "Arts",
  "Business",
  "Economics",
  "Social Sciences",
  "Health & Medicine",
  "Others",
];

interface FormState {
  title: string;
  author: string;
  description: string;
  category: string;
  type: BookType;
  digitalFile: File | null;
  physicalCount: number;
  bookCodes: string[];
  coverImage: string | null;
}

interface FormErrors {
  title?: string;
  author?: string;
  category?: string;
  digitalFile?: string;
  physicalCount?: string;
  bookCodes?: string[];
}

export default function AddBookForm() {
  const [form, setForm] = useState<FormState>({
    title: "",
    author: "",
    description: "",
    category: "",
    type: "physical",
    digitalFile: null,
    physicalCount: 1,
    bookCodes: [""],
    coverImage: null,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isUploading, setIsUploading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const validate = () => {
    const newErrors: FormErrors = {};
    if (!form.title.trim()) newErrors.title = "This field is required";
    if (!form.author.trim()) newErrors.author = "This field is required";
    if (!form.category.trim()) newErrors.category = "This field is required";

    if (form.type === "digital" && !form.digitalFile) {
      newErrors.digitalFile = "PDF file is required";
    }

    if (form.type === "physical") {
      if (form.physicalCount < 1) newErrors.physicalCount = "This field is required";
      
      const codeErrors: string[] = [];
      form.bookCodes.forEach((code, index) => {
        if (!code.trim()) {
          codeErrors[index] = "Required";
        }
      });
      
      if (codeErrors.length > 0) {
        newErrors.bookCodes = codeErrors;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setIsUploading(true);

    let fileData = {
      filePath: '',
      fileType: '',
      fileSize: 0,
    };
    
    const input = fileInputRef.current;
    const hasFile = input?.files && input.files.length > 0;

    if (hasFile) {
      const file = input.files![0];
      const uploadFile = await uploadBookDigitalCopy(file);
      if (uploadFile?.success) {
        fileData = {
          filePath: uploadFile.data!,
          fileSize: file.size,
          fileType: file.type
        };
      }
    }

    let coverURL = null;
    const imageInput = imageInputRef.current;
    const hasImage = imageInput?.files && imageInput.files.length > 0;

    if (hasImage) {
      const imageInputFile = imageInput.files![0];
      const resURL = await uploadCoverImage(imageInputFile);
      if (resURL.success) {
        coverURL = resURL.data;
      }
    }

    setIsUploading(false);

    const bookData: BookDataType = {
      title: form.title,
      author: form.author,
      description: form.description,
      category: form.category,
      coverImage: coverURL || undefined,
      soft_copy: form.type === "digital" ? {
        filePath: fileData.filePath,
        fileSize: fileData.fileSize,
        fileType: fileData.fileType
      } : undefined,
      physical_copies: form.type === "physical" ? form.bookCodes.map(code => ({ bookCode: code })) : undefined
    };

    await createBookAction(bookData);

    setIsSubmitting(false);
    setIsSuccess(true);

    setTimeout(() => {
      setIsSuccess(false);
      setForm({
        title: "",
        author: "",
        description: "",
        category: "",
        type: "physical",
        digitalFile: null,
        physicalCount: 1,
        bookCodes: [""],
        coverImage: null,
      });
    }, 3000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'pdf' | 'image') => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (type === 'pdf') {
      if (file.type !== 'application/pdf') {
        setErrors({ ...errors, digitalFile: "Only PDF files are accepted" });
        return;
      }
      setForm({ ...form, digitalFile: file });
      setErrors({ ...errors, digitalFile: undefined });
    } else {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm({ ...form, coverImage: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      {/* Loading Overlay */}
      {(isSubmitting || isSuccess) && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/20 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white/90 p-10 rounded-2xl shadow-2xl border border-white/20 flex flex-col items-center gap-6 min-w-[320px] max-w-md text-center">
            {isSuccess ? (
              <div className="flex flex-col items-center gap-4 animate-in zoom-in duration-300">
                <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10 text-success" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-foreground">Successfully Added</h3>
                  <p className="text-sm text-secondary font-medium leading-relaxed">
                    The new book has been added to your library catalog and is now available for reservation.
                  </p>
                </div>
              </div>
            ) : (
              <>
                <div className="relative">
                  <div className="w-16 h-16 border-4 border-accent/10 border-t-accent rounded-full animate-spin" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-accent animate-pulse" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-foreground">
                    {isUploading ? "Uploading Files..." : "Adding to Library..."}
                  </h3>
                  <p className="text-sm text-secondary font-medium leading-relaxed">
                    {isUploading 
                      ? "Please wait while we securely upload your book's content." 
                      : "Finalizing the process and adding the book to our catalog."}
                  </p>
                </div>

                {isUploading && (
                  <div className="w-full bg-accent/10 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-accent h-full w-1/2 animate-[loading_2s_ease-in-out_infinite]" />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-foreground">
            <BookOpen className="w-5 h-5 text-accent" />
            Basic Information
          </h2>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-bold mb-1.5 text-foreground">Title</label>
              <input
                type="text"
                placeholder="Enter book title"
                className={`w-full px-4 py-3 rounded-lg border bg-white focus:ring-2 transition-all outline-none text-foreground placeholder:text-secondary/50 ${errors.title
                    ? "border-error focus:ring-error/20"
                    : "border-border focus:ring-accent/20 focus:border-accent"
                  }`}
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
              {errors.title && (
                <p className="mt-1.5 text-xs font-bold text-error flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.title}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-bold mb-1.5 text-foreground">Author</label>
                <input
                  type="text"
                  placeholder="Enter author name"
                  className={`w-full px-4 py-3 rounded-lg border bg-white focus:ring-2 transition-all outline-none text-foreground placeholder:text-secondary/50 ${errors.author
                      ? "border-error focus:ring-error/20"
                      : "border-border focus:ring-accent/20 focus:border-accent"
                    }`}
                  value={form.author}
                  onChange={(e) => setForm({ ...form, author: e.target.value })}
                />
                {errors.author && (
                  <p className="mt-1.5 text-xs font-bold text-error flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.author}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-bold mb-1.5 text-foreground">Category</label>
                <select
                  className={`w-full px-4 py-3 rounded-lg border bg-white focus:ring-2 transition-all outline-none text-foreground appearance-none ${
                    errors.category 
                      ? "border-error focus:ring-error/20" 
                      : "border-border focus:ring-accent/20 focus:border-accent"
                  }`}
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                >
                  <option value="" disabled>Select a category</option>
                  {BOOK_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                {errors.category && (
                  <p className="mt-1.5 text-xs font-bold text-error flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.category}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold mb-1.5 text-foreground">Description (Optional)</label>
              <textarea
                placeholder="Enter a brief summary or description of the book"
                rows={4}
                className="w-full px-4 py-3 rounded-lg border border-border bg-white focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all outline-none text-foreground placeholder:text-secondary/50 resize-none"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
            </div>
          </div>
        </div>

        {/* Book Type */}
        <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-foreground">
            <Book className="w-5 h-5 text-accent" />
            Book Type
          </h2>

          <div className="grid grid-cols-2 gap-4 p-1.5 bg-background/50 rounded-xl mb-8 border border-border">
            <button
              type="button"
              onClick={() => setForm({ ...form, type: "physical" })}
              className={`flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-sm font-bold transition-all ${form.type === "physical"
                  ? "bg-white text-accent shadow-sm ring-1 ring-border"
                  : "text-secondary hover:text-foreground"
                }`}
            >
              <Book className="w-4 h-4" />
              Physical Book
            </button>
            <button
              type="button"
              onClick={() => setForm({ ...form, type: "digital" })}
              className={`flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-sm font-bold transition-all ${form.type === "digital"
                  ? "bg-white text-accent shadow-sm ring-1 ring-border"
                  : "text-secondary hover:text-foreground"
                }`}
            >
              <FileText className="w-4 h-4" />
              Digital Book
            </button>
          </div>

          <div className="animate-in fade-in slide-in-from-top-1 duration-300">
            {form.type === "digital" ? (
              <div className="space-y-4">
                <label className="block text-sm font-bold mb-1.5 text-foreground">Upload Book File (PDF)</label>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${errors.digitalFile
                      ? "border-error bg-error/5 hover:bg-error/10"
                      : "border-border bg-white hover:border-accent/50 hover:bg-accent/5"
                    }`}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={(e) => handleFileChange(e, 'pdf')}
                    accept=".pdf"
                    className="hidden"
                  />
                  {form.digitalFile ? (
                    <div className="flex items-center justify-center gap-4">
                      <div className="w-14 h-14 rounded-lg bg-accent/10 flex items-center justify-center">
                        <FileText className="w-8 h-8 text-accent" />
                      </div>
                      <div className="text-left">
                        <p className="text-base font-bold text-foreground truncate max-w-[200px]">{form.digitalFile.name}</p>
                        <p className="text-xs font-bold text-secondary">{(form.digitalFile.size / (1024 * 1024)).toFixed(2)} MB</p>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); setForm({ ...form, digitalFile: null }); }}
                        className="ml-auto text-sm font-bold text-error hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="w-14 h-14 rounded-full bg-background flex items-center justify-center mx-auto mb-3 border border-border">
                        <Upload className="w-6 h-6 text-secondary" />
                      </div>
                      <p className="text-base font-bold text-foreground">Click to upload or drag & drop</p>
                      <p className="text-sm text-secondary font-medium">Only PDF files up to 50MB</p>
                    </div>
                  )}
                </div>
                {errors.digitalFile && (
                  <p className="mt-1.5 text-xs font-bold text-error flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.digitalFile}
                  </p>
                )}
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold mb-1.5 text-foreground">Number of Copies</label>
                  <input
                    type="number"
                    min="1"
                    placeholder="e.g. 5"
                    className={`w-full px-4 py-3 rounded-lg border bg-white focus:ring-2 transition-all outline-none text-foreground placeholder:text-secondary/50 ${
                      errors.physicalCount 
                        ? "border-error focus:ring-error/20" 
                        : "border-border focus:ring-accent/20 focus:border-accent"
                    }`}
                    value={form.physicalCount}
                    onChange={(e) => {
                      const count = parseInt(e.target.value) || 0;
                      const newCodes = [...form.bookCodes];
                      if (count > newCodes.length) {
                        for (let i = newCodes.length; i < count; i++) newCodes.push("");
                      } else {
                        newCodes.length = count;
                      }
                      setForm({ ...form, physicalCount: count, bookCodes: newCodes });
                    }}
                  />
                  {errors.physicalCount && (
                    <p className="mt-1.5 text-xs font-bold text-error flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.physicalCount}
                    </p>
                  )}
                </div>

                {form.physicalCount > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-border/50">
                    {form.bookCodes.map((code, index) => (
                      <div key={index} className="animate-in fade-in slide-in-from-left-2 duration-300">
                        <label className="block text-xs font-bold mb-1.5 text-secondary uppercase tracking-wider">Book Copy #{index + 1} Code</label>
                        <input
                          type="text"
                          placeholder={`Enter code for copy ${index + 1}`}
                          className={`w-full px-4 py-2.5 rounded-lg border bg-white focus:ring-2 transition-all outline-none text-sm text-foreground placeholder:text-secondary/50 ${
                            errors.bookCodes?.[index]
                              ? "border-error focus:ring-error/20" 
                              : "border-border focus:ring-accent/20 focus:border-accent"
                          }`}
                          value={code}
                          onChange={(e) => {
                            const newCodes = [...form.bookCodes];
                            newCodes[index] = e.target.value;
                            setForm({ ...form, bookCodes: newCodes });
                          }}
                        />
                        {errors.bookCodes?.[index] && (
                          <p className="mt-1 text-[10px] font-bold text-error flex items-center gap-1 uppercase">
                            <AlertCircle className="w-2.5 h-2.5" /> {errors.bookCodes?.[index]}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Cover Image */}
        <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-foreground">
            <Upload className="w-5 h-5 text-accent" />
            Cover Image (Optional)
          </h2>

          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <div
              onClick={() => imageInputRef.current?.click()}
              className="w-40 h-56 rounded-xl border-2 border-dashed border-border bg-white flex flex-col items-center justify-center cursor-pointer hover:border-accent transition-all overflow-hidden relative group shadow-sm"
            >
              <input
                type="file"
                ref={imageInputRef}
                onChange={(e) => handleFileChange(e, 'image')}
                accept="image/*"
                className="hidden"
              />
              {form.coverImage ? (
                <>
                  <img src={form.coverImage} alt="Preview" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white text-sm font-bold">
                    Change Image
                  </div>
                </>
              ) : (
                <div className="text-center p-4">
                  <div className="w-12 h-12 rounded-full bg-background flex items-center justify-center mx-auto mb-3 border border-border">
                    <Upload className="w-6 h-6 text-secondary" />
                  </div>
                  <p className="text-xs text-foreground font-bold uppercase tracking-wider">Upload Cover</p>
                  <p className="text-[10px] text-secondary font-bold mt-1">JPG / PNG</p>
                </div>
              )}
            </div>
            <div className="flex-1 text-center md:text-left pt-2">
              <p className="text-foreground font-bold text-lg mb-2">Book Cover Image</p>
              <p className="text-secondary font-medium text-sm leading-relaxed mb-4">
                Recommended size: 600 x 900 pixels. A high-quality cover helps your book stand out and be easily recognized by users.
              </p>
              {form.coverImage && (
                <button
                  type="button"
                  onClick={() => setForm({ ...form, coverImage: null })}
                  className="inline-flex items-center gap-2 text-sm font-bold text-error hover:underline"
                >
                  Remove current cover
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-4 pt-4 border-t border-border">
          <Link
            href="/admin/books"
            className="w-full sm:w-auto px-10 py-3 rounded-lg text-sm font-bold text-secondary hover:text-foreground hover:bg-black/5 transition-all text-center"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto px-12 py-3 rounded-lg text-sm font-bold text-white bg-accent hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-accent/20 flex items-center justify-center gap-3"
          >
            Add Book
          </button>
        </div>
      </form>
    </>
  );
}
