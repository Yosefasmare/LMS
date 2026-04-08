"use client";

export default function CallToAction() {
  return (
    <section className="w-full bg-card py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-4 text-center md:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Ready to find your book?
        </h2>
        <p className="mt-4 text-lg text-secondary">
          Browse thousands of books and reserve your copy instantly without signing up.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="w-full sm:w-auto rounded-full bg-accent px-8 py-4 text-base font-bold text-white shadow-lg transition-transform hover:-translate-y-1 hover:brightness-110 active:scale-95"
          >
            Search Now
          </button>
        </div>
      </div>
    </section>
  );
}
