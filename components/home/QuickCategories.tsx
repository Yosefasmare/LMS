import { Book, Code, FlaskConical, Globe } from "lucide-react";

export default function QuickCategories() {
  const categories = [
    { name: "Science", icon: FlaskConical, color: "text-blue-500", bg: "bg-blue-50" },
    { name: "Technology", icon: Code, color: "text-indigo-500", bg: "bg-indigo-50" },
    { name: "History", icon: Globe, color: "text-amber-500", bg: "bg-amber-50" },
    { name: "Literature", icon: Book, color: "text-emerald-500", bg: "bg-emerald-50" },
  ];

  return (
    <section className="w-full bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="mb-10 flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">Explore Categories</h2>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:gap-6">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <a
                key={category.name}
                href={`/search?category=${category.name.toLowerCase()}`}
                className="group flex flex-col items-center justify-center rounded-2xl border border-border bg-card p-6 text-center shadow-sm transition-all hover:-translate-y-1 hover:border-accent hover:shadow-md"
              >
                <div className={`mb-4 flex h-14 w-14 items-center justify-center rounded-full ${category.bg} transition-transform duration-300 group-hover:scale-110`}>
                  <Icon className={`h-7 w-7 ${category.color}`} />
                </div>
                <h3 className="text-base font-semibold text-foreground">{category.name}</h3>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
