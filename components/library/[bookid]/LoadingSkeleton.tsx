import React from "react";

const LoadingSkeleton = () => {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Back Button Skeleton */}
      <div className="mb-8 h-4 w-32 animate-pulse rounded-md bg-slate-200" />

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start">
        {/* Left Side: Book Cover Skeleton */}
        <div className="lg:col-span-4">
          <div className="relative aspect-[2/3] w-full animate-pulse rounded-[2.5rem] bg-slate-200 shadow-sm" />
        </div>

        {/* Right Side: Details & Actions Skeleton */}
        <div className="lg:col-span-8 flex flex-col space-y-10">
          {/* Header Info Skeleton */}
          <div className="space-y-6">
            <div className="h-6 w-24 animate-pulse rounded-full bg-slate-200" />
            <div className="space-y-3">
              <div className="h-12 w-3/4 animate-pulse rounded-xl bg-slate-200 lg:h-16" />
              <div className="h-6 w-1/3 animate-pulse rounded-md bg-slate-200" />
            </div>
            <div className="max-w-3xl space-y-3">
              <div className="h-4 w-full animate-pulse rounded-md bg-slate-200" />
              <div className="h-4 w-full animate-pulse rounded-md bg-slate-200" />
              <div className="h-4 w-2/3 animate-pulse rounded-md bg-slate-200" />
            </div>
          </div>

          {/* Availability & Actions Block Skeleton */}
          <div className="flex flex-col gap-6 rounded-[2rem] border border-slate-100 bg-white/50 p-8 shadow-sm sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-8 flex-1">
              {/* Digital Status */}
              <div className="space-y-3">
                <div className="h-3 w-32 animate-pulse rounded bg-slate-100" />
                <div className="h-12 w-48 animate-pulse rounded-xl bg-slate-200" />
              </div>

              {/* Physical Status */}
              <div className="space-y-3">
                <div className="h-3 w-32 animate-pulse rounded bg-slate-100" />
                <div className="h-6 w-56 animate-pulse rounded-md bg-slate-200" />
              </div>
            </div>

            {/* Main Action Button Skeleton */}
            <div className="flex flex-col gap-3 min-w-[200px]">
              <div className="h-16 w-full animate-pulse rounded-2xl bg-slate-200" />
              <div className="mx-auto h-2 w-24 animate-pulse rounded bg-slate-100" />
            </div>
          </div>

          {/* Metadata Grid Skeleton */}
          <div className="grid grid-cols-2 gap-8 border-t border-slate-100 pt-10 sm:grid-cols-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="space-y-3">
                <div className="h-2 w-20 animate-pulse rounded bg-slate-100" />
                <div className="h-4 w-28 animate-pulse rounded bg-slate-200" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Similar Books Section Skeleton */}
      <section className="mt-24 space-y-10">
        <div className="flex items-center justify-between">
          <div className="h-10 w-48 animate-pulse rounded-lg bg-slate-200" />
          <div className="h-4 w-16 animate-pulse rounded bg-slate-200" />
        </div>

        <div className="flex gap-8 overflow-x-auto pb-10 pt-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="min-w-[160px] flex-shrink-0 sm:min-w-[200px]">
              <div className="space-y-4">
                <div className="aspect-[2/3] w-full animate-pulse rounded-[2rem] bg-slate-200" />
                <div className="space-y-2 px-2">
                  <div className="h-4 w-full animate-pulse rounded bg-slate-200" />
                  <div className="h-2 w-2/3 animate-pulse rounded bg-slate-100" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default LoadingSkeleton;