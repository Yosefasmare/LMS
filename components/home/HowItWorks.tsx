import { Search, CheckCircle, Ticket, Library } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      title: "Search for a book",
      description: "Find your next read using our fast search.",
      icon: Search,
    },
    {
      title: "Reserve it in seconds",
      description: "Click reserve to hold the book immediately.",
      icon: CheckCircle,
    },
    {
      title: "Get your code",
      description: "Receive a unique reservation code.",
      icon: Ticket,
    },
    {
      title: "Show it at the desk",
      description: "Collect your book using the code. No waiting.",
      icon: Library,
    },
  ];

  return (
    <section className="w-full bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">How It Works</h2>
          <p className="mt-4 text-lg text-secondary">Simple, fast, and frictionless process.</p>
        </div>

        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative flex flex-col items-center text-center">
                {/* Connector line for desktop */}
                {index < steps.length - 1 && (
                  <div className="absolute left-[60%] top-8 hidden h-[2px] w-[130%] bg-border lg:block" />
                )}
                <div className="relative z-10 mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-card shadow-sm transition-transform hover:scale-105 hover:border-accent">
                  <Icon className="h-7 w-7 text-accent" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-foreground">
                  <span className="mr-2 text-accent/50">{index + 1}.</span> {step.title}
                </h3>
                <p className="leading-relaxed text-secondary">{step.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
