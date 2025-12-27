"use client";

import { Home, User, Heart, Menu, X, LogIn, Search } from "lucide-react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import { ThemeToggle } from "./ThemeToggle";

function HeaderContent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const isActive = (path: string) => pathname === path;


  const hasType = (type: string) => searchParams?.get("category") === type;


  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className="fixed top-0 w-full z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200/60 dark:border-slate-800 transition-all duration-300">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="flex flex-col">
              <span className="font-[Manrope] text-xl text-slate-900 dark:text-white font-bold leading-none tracking-tight">
                RentIt
              </span>
            </div>
          </Link>


          <nav className="hidden lg:flex items-center gap-8">
            <Link
              href="/"
              className={`text-sm font-medium transition-colors ${isActive("/")
                ? "text-slate-900 dark:text-white"
                : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                }`}
            >
              Home
            </Link>
            <Link
              href="/search"
              className={`text-sm font-medium transition-colors ${pathname === "/search" &&
                !hasType("hotel") &&
                !hasType("vehicle") &&
                !hasType("equipment")
                ? "text-slate-900 dark:text-white"
                : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                }`}
            >
              Explore Rentals
            </Link>
            <Link
              href="/search?category=vehicle"
              className={`text-sm font-medium transition-colors ${pathname === "/search" && hasType("vehicle")
                ? "text-slate-900 dark:text-white"
                : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                }`}
            >
              Vehicles
            </Link>
            <Link
              href="/search?category=equipment"
              className={`text-sm font-medium transition-colors ${pathname === "/search" && hasType("equipment")
                ? "text-slate-900 dark:text-white"
                : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                }`}
            >
              Equipment
            </Link>
            <Link
              href="/saved"
              className={`text-sm font-medium transition-colors ${isActive("/saved")
                ? "text-slate-900 dark:text-white"
                : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                }`}
            >
              Saved
            </Link>
          </nav>


          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle />

            <Link
              href="/auth"
              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-[#1F4FD8] transition-colors"
            >
              <User className="w-4 h-4" />
              <span>Sign in</span>
            </Link>

            <Link
              href="/auth"
              className="hidden md:block px-5 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-semibold rounded-full hover:bg-slate-800 dark:hover:bg-slate-100 hover:shadow-lg hover:shadow-slate-900/20 transition-all active:scale-95"
            >
              Get Started
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>


        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 shadow-xl animate-in slide-in-from-top-2">
            <nav className="flex flex-col p-4 gap-2">
              <Link
                href="/"
                className="px-4 py-3 rounded-lg text-slate-600 dark:text-slate-400 font-medium hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-all"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>

              <Link
                href="/search"
                className="px-4 py-3 rounded-lg text-slate-600 dark:text-slate-400 font-medium hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-all"
                onClick={() => setMobileMenuOpen(false)}
              >
                Explore Rentals
              </Link>
              <Link
                href="/search?category=vehicle"
                className="px-4 py-3 rounded-lg text-slate-600 dark:text-slate-400 font-medium hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-all"
                onClick={() => setMobileMenuOpen(false)}
              >
                Vehicles
              </Link>
              <Link
                href="/saved"
                className="px-4 py-3 rounded-lg text-slate-600 dark:text-slate-400 font-medium hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-all"
                onClick={() => setMobileMenuOpen(false)}
              >
                Saved
              </Link>
              <div className="h-px bg-slate-100 dark:bg-slate-700 my-2"></div>

              <div className="flex items-center justify-between px-4 py-3">
                <span className="text-slate-600 dark:text-slate-400 font-medium">Theme</span>
                <ThemeToggle />
              </div>

              <div className="h-px bg-slate-100 dark:bg-slate-700 my-2"></div>
              <Link
                href="/profile"
                className="px-4 py-3 rounded-lg text-slate-600 dark:text-slate-400 font-medium hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-all flex items-center gap-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                <User className="w-4 h-4" />
                Sign In
              </Link>

              <Link
                href="/auth"
                className="px-4 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold rounded-lg text-center shadow-lg shadow-slate-900/10 active:scale-95 transition-all"
                onClick={() => setMobileMenuOpen(false)}
              >
                Get Started
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

export function Header() {
  return (
    <Suspense fallback={<div className="h-20 bg-white/80" />}>
      <HeaderContent />
    </Suspense>
  );
}
