"use client";

import Link from "next/link";
import { Library, Menu, X, Search } from "lucide-react";
import SearchBar from "./SearchBar";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b-2 border-black bg-[#e2dcc5]">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        {/* Left side: Logo & Navigation */}
        <div className="flex items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 transition-transform hover:-translate-y-0.5" onClick={() => setIsMenuOpen(false)}>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg border-2 border-black bg-accent text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <Library className="h-5 w-5" />
            </div>
            <span className="text-xl font-black tracking-tight text-foreground">LMS</span>
          </Link>

          {/* Navigation Tabs (Desktop) */}
          <nav className="hidden md:flex items-center gap-8 ml-10 text-base font-bold">
            <Link href="/library" className="text-foreground transition-colors hover:text-accent">Library</Link>
            <Link href="/categories" className="text-foreground transition-colors hover:text-accent">Main Categories</Link>
          </nav>
        </div>

        {/* Center Search Bar (Desktop) */}
        <div className="flex-1 justify-center px-4 max-w-md hidden lg:flex">
          <SearchBar variant="header" />
        </div>

        {/* Right side: Auth Buttons & Mobile Toggle */}
        <div className="flex items-center gap-2 sm:gap-5 ml-auto">
          {/* Desktop Auth */}
          <div className="hidden sm:flex items-center gap-5">
            <Link href="/sign-in" className="text-base font-bold text-foreground transition-colors hover:text-accent">
              Sign In
            </Link>
            <Link href="/sign-up" className="rounded-lg border-2 border-black bg-[#32cd32] px-5 py-2.5 text-sm font-black text-black transition-transform shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-none whitespace-nowrap">
              Sign Up
            </Link>
          </div>

          {/* Mobile Search Icon (optional, could trigger an overlay) */}
          <button className="lg:hidden p-2 text-foreground hover:text-accent md:hidden">
             <Search className="h-6 w-6" />
          </button>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-foreground hover:text-accent transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 z-40 bg-[#e2dcc5] p-6 animate-in slide-in-from-top duration-300">
           <nav className="flex flex-col gap-6 text-xl font-black">
              <Link 
                href="/library" 
                className="flex items-center justify-between border-b-2 border-black/10 pb-4 hover:text-accent"
                onClick={() => setIsMenuOpen(false)}
              >
                Library
                <Library className="h-6 w-6" />
              </Link>
              <Link 
                href="/categories" 
                className="flex items-center justify-between border-b-2 border-black/10 pb-4 hover:text-accent"
                onClick={() => setIsMenuOpen(false)}
              >
                Main Categories
                <Menu className="h-6 w-6" />
              </Link>
              <div className="flex flex-col gap-4 mt-4">
                <Link 
                  href="/sign-in" 
                  className="w-full text-center py-4 border-2 border-black rounded-lg font-bold hover:bg-black/5"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link 
                  href="/sign-up" 
                  className="w-full text-center py-4 bg-[#32cd32] border-2 border-black rounded-lg font-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-y-1"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
           </nav>
        </div>
      )}
    </header>
  );
}

