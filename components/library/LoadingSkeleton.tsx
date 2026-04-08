import React from 'react'

const LoadingSkeleton = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background font-sans">
            <main className="flex-1">
              {/* Search Section Skeleton */}
              <section className="bg-secondary/10 py-12 md:py-16">
                <div className="container mx-auto px-4 text-center">
                  <h1 className="mb-8 text-3xl font-black tracking-tight text-foreground md:text-5xl animate-pulse">
                    Explore Our Collection
                  </h1>
                  <div className="mx-auto h-16 w-full max-w-4xl animate-pulse rounded-full bg-gray-200" />
                </div>
              </section>
    
              {/* Popular Books Skeleton */}
              <section className="container mx-auto px-4 py-12">
                <div className="mb-10 h-12 w-48 animate-pulse rounded border-4 border-black bg-gray-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" />
                <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="flex flex-col space-y-4">
                      <div className="aspect-[2/3] w-full animate-pulse border-4 border-black bg-gray-200 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]" />
                      <div className="h-4 w-3/4 animate-pulse rounded bg-gray-300" />
                      <div className="h-3 w-1/2 animate-pulse rounded bg-gray-200" />
                    </div>
                  ))}
                </div>
              </section>
    
              {/* Categories Rows Skeleton */}
              <div className="container mx-auto py-8">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="mb-12 px-4 sm:px-8">
                    <div className="mb-6 h-8 w-40 animate-pulse rounded bg-gray-300" />
                    <div className="flex gap-4 overflow-hidden">
                      {[...Array(5)].map((_, j) => (
                        <div key={j} className="h-[250px] w-[180px] flex-shrink-0 animate-pulse rounded-lg bg-gray-200" />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </main>
          </div>
  )
}

export default LoadingSkeleton