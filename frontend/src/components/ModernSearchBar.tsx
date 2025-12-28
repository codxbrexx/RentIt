"use client";

import React, { useState, useMemo } from "react";
import { 
  MapPin, Search, Building2, Car, 
  Camera, Tent, Hotel, ChevronDown 
} from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils"; // Assuming you have a cn utility, else use standard string concat

const CATEGORIES = [
  { id: "house", label: "House", icon: Building2 },
  { id: "hotel", label: "Hotel", icon: Hotel },
  { id: "vehicle", label: "Vehicle", icon: Car },
  { id: "equipment", label: "Equipment", icon: Camera },
  { id: "event", label: "Event", icon: Tent },
] as const;

type Category = (typeof CATEGORIES)[number]["id"];

export function ModernSearchBar() {
  const [category, setCategory] = useState<Category>("house");
  const [location, setLocation] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const router = useRouter();

  const handleSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    const params = new URLSearchParams();
    params.set("category", category);
    if (location) params.set("location", location);
    router.push(`/search?${params.toString()}`);
  };

  const SelectedIcon = useMemo(() => 
    CATEGORIES.find((c) => c.id === category)?.icon || Search, 
  [category]);

  return (
    <div className="w-full max-w-5xl mx-auto px-4">
      {/* Category Tabs */}
      <div className="flex items-center justify-center gap-2 mb-4 overflow-x-auto pb-2 scrollbar-hide">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setCategory(cat.id)}
            className={cn(
              "flex items-center gap-2 px-5 py-2.5 rounded-full transition-all duration-200 whitespace-nowrap text-sm font-semibold",
              category === cat.id
                ? "bg-[#1F4FD8] text-white shadow-lg shadow-blue-200 dark:shadow-none"
                : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-100 dark:border-slate-800"
            )}
          >
            <cat.icon className="w-4 h-4" />
            {cat.label}
          </button>
        ))}
      </div>

      <form
        onSubmit={handleSearch}
        className={cn(
          "bg-white dark:bg-slate-900 rounded-[2.5rem] p-3 shadow-2xl transition-all duration-300 border border-slate-100 dark:border-slate-800",
          isFocused ? "ring-4 ring-blue-50 dark:ring-blue-900/20 border-blue-200" : "shadow-slate-200/60 dark:shadow-black/40"
        )}
      >
        <div className="flex flex-col lg:flex-row items-center gap-2">
          {/* Location Input */}
          <div className="w-full lg:flex-[1.5] relative group">
            <div className="absolute left-6 top-1/2 -translate-y-1/2">
              <MapPin className="w-5 h-5 text-slate-400 group-focus-within:text-[#1F4FD8] transition-colors" />
            </div>
            <input
              type="text"
              placeholder="Where are you going?"
              value={location}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full pl-14 pr-6 py-4 bg-transparent focus:outline-none text-slate-900 dark:text-white placeholder:text-slate-400 font-medium text-lg"
            />
          </div>

          <div className="hidden lg:block w-[1px] h-10 bg-slate-200 dark:bg-slate-700" />

          {/* Dynamic Category Selector (Inside bar for mobile/desktop refinement) */}
          <div className="w-full lg:flex-1 relative group">
            <div className="absolute left-6 top-1/2 -translate-y-1/2">
              <SelectedIcon className="w-5 h-5 text-slate-400 group-focus-within:text-[#1F4FD8] transition-colors" />
            </div>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as Category)}
              className="w-full pl-14 pr-10 py-4 bg-transparent appearance-none focus:outline-none cursor-pointer text-slate-900 dark:text-white font-medium text-lg"
            >
              {CATEGORIES.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.label}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>

          {/* Search Button */}
          <button
            type="submit"
            className="w-full lg:w-auto px-10 py-4 bg-[#1F4FD8] text-white rounded-[2rem] hover:bg-[#1640B8] transition-all flex items-center justify-center gap-3 font-bold text-lg group active:scale-95"
          >
            <Search className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span>Search</span>
          </button>
        </div>
      </form>

      {/* Quick Filters */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <span className="text-sm font-medium text-slate-500 dark:text-slate-500">
          Popular:
        </span>
        {["Bangalore", "Mumbai", "Delhi", "Pune"].map((city) => (
          <button
            key={city}
            type="button"
            onClick={() => setLocation(city)}
            className="px-4 py-1.5 rounded-full border border-slate-200 dark:border-slate-800 text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-300 transition-all"
          >
            {city}
          </button>
        ))}
      </div>
    </div>
  );
}