"use client";

import {
  Home,
  Mail,
  Phone,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  MapPin,
  Send,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { ThemeToggle } from "./ThemeToggle";

export function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();

    setEmail("");
  };

  return (
    <footer className="bg-slate-50 dark:bg-slate-950 pt-16 pb-8 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 mb-12">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-6 group">
              <div className="flex flex-col">
                <span className="font-[Manrope] text-lg text-slate-900 dark:text-white font-bold leading-none tracking-tight">
                  RentIt
                </span>
              </div>
            </Link>
            <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-sm leading-relaxed text-sm">
              RentIt is your one-stop platform for renting homes, hotels,
              vehicles, equipment, and event spaces. Verified listings,
              transparent pricing.
            </p>


            <div className="flex gap-3">
              {[
                { Icon: Facebook, href: "#" },
                { Icon: Twitter, href: "#" },
                { Icon: Instagram, href: "#" },
                { Icon: Linkedin, href: "#" },
              ].map(({ Icon, href }, index) => (
                <a
                  key={index}
                  href={href}
                  className="w-10 h-10 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-[#1F4FD8] dark:hover:text-[#4A6FE8] hover:border-[#1F4FD8] dark:hover:border-[#4A6FE8] hover:shadow-md transition-all duration-300"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-slate-900 dark:text-white mb-6 font-bold text-base">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Explore Rentals", to: "/search" },
                { label: "House Rentals", to: "/search?category=house" },
                { label: "Hotels & Stays", to: "/search?category=hotel" },
                { label: "Vehicle Rentals", to: "/search?category=vehicle" },
                {
                  label: "Equipment Rentals",
                  to: "/search?category=equipment",
                },
              ].map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.to}
                    className="text-slate-600 dark:text-slate-400 hover:text-[#1F4FD8] dark:hover:text-[#4A6FE8] transition-colors flex items-center gap-2 group font-medium text-sm"
                  >
                    <span className="w-0 h-0.5 bg-[#1F4FD8] group-hover:w-3 transition-all rounded-full"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-slate-900 dark:text-white mb-6 font-bold text-base">
              Legal
            </h4>
            <ul className="space-y-3">
              {[
                "Privacy Policy",
                "Terms of Service",
                "Cancellation Policy",
                "Refund Policy",
                "Cookie Policy",
              ].map((item, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-slate-600 dark:text-slate-400 hover:text-[#1F4FD8] dark:hover:text-[#4A6FE8] transition-colors flex items-center gap-2 group font-medium text-sm"
                  >
                    <span className="w-0 h-0.5 bg-[#1F4FD8] group-hover:w-3 transition-all rounded-full"></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-slate-900 dark:text-white mb-6 font-bold text-base">
              Stay Updated
            </h4>
            <p className="text-slate-600 dark:text-slate-400 mb-4 text-sm">
              Subscribe to get the latest listings and deals.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full pl-11 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:border-[#1F4FD8] dark:focus:border-[#4A6FE8] focus:ring-4 focus:ring-[#1F4FD8]/10 transition-all text-slate-900 dark:text-white placeholder:text-slate-400 text-sm"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full px-6 py-3 bg-slate-900 dark:bg-[#1F4FD8] text-white rounded-xl hover:bg-slate-800 dark:hover:bg-[#1640B8] hover:shadow-lg transition-all flex items-center justify-center gap-2 font-semibold"
              >
                <Send className="w-4 h-4" />
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-200 dark:border-slate-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-slate-500 dark:text-slate-400 text-xs text-center md:text-left font-medium">
              &copy; 2025 RentIt. All rights reserved.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 dark:text-slate-400 font-medium">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <span>Secure Payments</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <span>Verified Listings</span>
              </div>
              <div className="pl-6 border-l border-slate-200 dark:border-slate-800">
                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
