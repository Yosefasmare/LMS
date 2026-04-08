import Link from "next/link";
import { Library } from "lucide-react";
import SearchBar from "./SearchBar";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b-2 border-black bg-[#e2dcc5]">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        {/* Left side: Logo & Navigation */}
        <div className="flex items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 transition-transform hover:-translate-y-0.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg border-2 border-black bg-accent text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <Library className="h-5 w-5" />
            </div>
            <span className="text-xl font-black tracking-tight text-foreground lg:inline-block">LMS</span>
          </Link>

          {/* Navigation Tabs */}
          <nav className=" md:flex items-center gap-8 ml-10 text-base font-bold">
            <Link href="/library" className="text-foreground transition-colors hover:text-accent">Library</Link>
            <Link href="/categories" className="text-foreground transition-colors hover:text-accent">Main Categories</Link>
          </nav>
        </div>

        {/* Center Search Bar */}
        <div className="flex flex-1 justify-end sm:justify-center px-4 max-w-md hidden lg:flex">
          {/* If SearchBar lacks border-2, user might want to style it later too */}
          <SearchBar variant="header" />
        </div>

        {/* Right side: Auth Buttons */}
        <div className="flex items-center gap-5 ml-auto">
          <Link href="/sign-in" className="text-base font-bold text-foreground transition-colors hover:text-accent hidden sm:block">
            Sign In
          </Link>
          <Link href="/sign-up" className="rounded-lg border-2 border-black bg-[#32cd32] px-5 py-2.5 text-sm font-black text-black transition-transform hover:-translate-y-0.5 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] whitespace-nowrap">
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
}
