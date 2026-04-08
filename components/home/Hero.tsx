import SearchBar from "./SearchBar";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Hero() {
  return (
    <section className="w-full bg-background pt-10 pb-6 text-center border-b border-border/50">
      <div className="mx-auto max-w-3xl px-4">
        <h1 className="mb-2 text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
          Find and Reserve Books <span className="text-accent">Fast</span>
        </h1>
        <p className="mb-6 text-sm text-secondary md:text-base">
          Search, reserve, and collect your book instantly.
        </p>
        <div className="mx-auto flex max-w-xl justify-center">
          <SearchBar  variant="hero" />
        </div>
      </div>
    </section>
  );
}
