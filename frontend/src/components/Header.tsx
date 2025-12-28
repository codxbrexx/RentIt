"use client";

import { Home, User, Heart, Menu, X, LogIn, Search } from "lucide-react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { useAuth } from "@/context/AuthContext";
import { UserProfileMenu } from "./UserProfileMenu";

function AuthButtons() {
  const { user, loading } = useAuth();

  if (loading) return null;

  if (user) {
    return <UserProfileMenu />;
  }

  return (
    <>
      <Link
        href="/auth"
        className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-[#1F4FD8] transition-colors"
      >
        <User className="w-4 h-4" />
        <span>Sign in</span>
      </Link>

      <Link
        href="/auth"
        className="w-full md:w-auto px-5 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-semibold rounded-full hover:bg-slate-800 dark:hover:bg-slate-100 hover:shadow-lg hover:shadow-slate-900/20 transition-all active:scale-95 text-center flex justify-center"
      >
        Get Started
      </Link>
    </>
  );
}

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
    <header className="fixed top-0 w-full z-50 bg-white/70 dark:bg-[#020617]/70 backdrop-blur-xl border-b border-white/10 dark:border-white/5 transition-all duration-300 supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-[#020617]/60">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          <Link href="/" className="flex items-center gap-2.5 group">
            <span className="font-[Manrope] text-2xl text-slate-900 dark:text-white font-extrabold tracking-tight">
              Rentit<span className="text-[#1F4FD8]">.</span>
            </span>
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
                !hasType("equipment")
                ? "text-slate-900 dark:text-white"
                : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                }`}
            >
              Explore Rentals
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




          <Suspense fallback={<div className="w-8 h-8 rounded-full bg-slate-100" />}>
            <AuthButtons />
          </Suspense>

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

            <Suspense fallback={<div className="h-10 bg-slate-100 rounded-lg animate-pulse" />}>
              <div className="px-4 pb-4">
                <AuthButtons />
              </div>
            </Suspense>
          </nav>
        </div>
      )}
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
