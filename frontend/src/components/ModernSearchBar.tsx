"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import {
  MapPin, Search, Building2,
  Camera, Tent, Hotel, ChevronDown, Check
} from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import usePlacesAutocomplete from "use-places-autocomplete";

const CATEGORIES = [
  { id: "house", label: "House", icon: Building2 },
  { id: "hotel", label: "Hotel", icon: Hotel },
  { id: "equipment", label: "Equipment", icon: Camera },
  { id: "event", label: "Event", icon: Tent },
] as const;

type Category = (typeof CATEGORIES)[number]["id"];

export function ModernSearchBar() {
  // Initialize usePlacesAutocomplete
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      /* Define search scope here if needed */
    },
    debounce: 300,
  });

  const [category, setCategory] = useState<Category>("house");
  const [isFocused, setIsFocused] = useState(false);

  // Custom Dropdown State
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const categoryRef = useRef<HTMLDivElement>(null);

  const router = useRouter();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (categoryRef.current && !categoryRef.current.contains(event.target as Node)) {
        setIsCategoryOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    const params = new URLSearchParams();
    params.set("category", category);
    if (value) params.set("location", value);
    router.push(`/search?${params.toString()}`);
  };

  const SelectedIcon = useMemo(() =>
    CATEGORIES.find((c) => c.id === category)?.icon || Search,
    [category]);

  const selectedLabel = useMemo(() =>
    CATEGORIES.find((c) => c.id === category)?.label || "Category",
    [category]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSelect = ({ description }: { description: string }) => () => {
    setValue(description, false);
    clearSuggestions();
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 relative z-50">
      {/* Category Tabs (Top) */}
      <div className="flex items-center justify-center gap-2 mb-4 overflow-x-auto pb-2 scrollbar-hide">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            type="button"
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
          "bg-white dark:bg-slate-900 rounded-[2.5rem] p-3 shadow-2xl transition-all duration-300 border border-slate-100 dark:border-slate-800 relative",
          isFocused || isCategoryOpen ? "ring-4 ring-blue-50 dark:ring-blue-900/20 border-blue-200" : "shadow-slate-200/60 dark:shadow-black/40"
        )}
      >
        <div className="flex flex-col lg:flex-row items-center gap-2">
          {/* Location Input with Autocomplete */}
          <div className="w-full lg:flex-1 relative group">
            <div className="absolute left-6 top-1/2 -translate-y-1/2">
              <MapPin className="w-5 h-5 text-slate-400 group-focus-within:text-[#1F4FD8] transition-colors" />
            </div>
            <input
              type="text"
              name="location"
              placeholder="Where are you going?"
              value={value}
              onChange={handleInput}
              disabled={!ready}
              onFocus={() => setIsFocused(true)}
              onBlur={() => {
                setTimeout(() => setIsFocused(false), 200);
              }}
              className="w-full pl-14 pr-6 py-4 bg-transparent focus:outline-none text-slate-900 dark:text-white placeholder:text-slate-400 font-medium text-lg"
              autoComplete="off"
            />
            {/* Autocomplete Dropdown */}
            {status === "OK" && (
              <ul className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-100 dark:border-slate-800 overflow-hidden z-20">
                {data.map(({ place_id, description, structured_formatting }) => (
                  <li
                    key={place_id}
                    onClick={handleSelect({ description })}
                    className="px-6 py-3 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer flex items-center gap-3 transition-colors text-left"
                  >
                    <MapPin className="w-4 h-4 text-slate-400 flex-shrink-0" />
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-slate-900 dark:text-white">
                        {structured_formatting.main_text}
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        {structured_formatting.secondary_text}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="hidden lg:block w-[1px] h-10 bg-slate-200 dark:bg-slate-700" />

          {/* Custom Category Dropdown - Fixed Width */}
          <div className="w-full lg:w-[220px] relative flex-shrink-0" ref={categoryRef}>
            <button
              type="button"
              onClick={() => setIsCategoryOpen(!isCategoryOpen)}
              className="w-full flex items-center justify-between pl-6 pr-6 py-4 bg-transparent focus:outline-none cursor-pointer text-slate-900 dark:text-white font-medium text-lg group hover:opacity-80 transition-opacity"
            >
              <div className="flex items-center gap-3 truncate">
                <SelectedIcon className={cn("w-5 h-5 transition-colors flex-shrink-0", isCategoryOpen ? "text-[#1F4FD8]" : "text-slate-400")} />
                <span className="truncate">{selectedLabel}</span>
              </div>
              <ChevronDown className={cn("w-4 h-4 text-slate-400 transition-transform duration-200 flex-shrink-0", isCategoryOpen && "rotate-180")} />
            </button>

            {/* Dropdown Menu */}
            {isCategoryOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-100 dark:border-slate-800 overflow-hidden z-[100] animate-in fade-in zoom-in-95 duration-100">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => {
                      setCategory(cat.id);
                      setIsCategoryOpen(false);
                    }}
                    className={cn(
                      "w-full px-6 py-3  text-left flex items-center gap-3 hover:bg-slate-50 dark:hover:bg-slate-800",
                      category === cat.id ? "bg-slate-50 dark:bg-slate-800 text-[#1F4FD8] dark:text-[#4A6FE8]" : "text-slate-600 dark:text-slate-300"
                    )}
                  >
                    <cat.icon className={cn("w-4 h-4 flex-shrink-0", category === cat.id ? "text-[#1F4FD8] dark:text-[#4A6FE8]" : "text-slate-400")} />
                    <span className="flex-1 font-medium truncate">{cat.label}</span>
                    {category === cat.id && <Check className="w-4 h-4 flex-shrink-0" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Search Button */}
          <button
            type="submit"
            className="w-full lg:w-auto px-10 py-4 bg-[#1F4FD8] text-white rounded-[2rem] hover:bg-[#1640B8] transition-all flex items-center justify-center gap-3 font-bold text-lg group active:scale-95 flex-shrink-0"
          >
            <Search className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span>Search</span>
          </button>
        </div>
      </form>

      {!ready && (
        <p className="text-xs text-center mt-2 text-slate-400 opacity-60">
          Google Places API key required for suggestions
        </p>
      )}

      {/* Quick Filters */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <span className="text-sm font-medium text-slate-500 dark:text-slate-500">
          Popular:
        </span>
        {["Bangalore", "Mumbai", "Delhi", "Pune"].map((city) => (
          <button
            key={city}
            type="button"
            onClick={() => {
              setValue(city, false);
              clearSuggestions();
            }}
            className="px-4 py-1.5 rounded-full border border-slate-200 dark:border-slate-800 text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-300 transition-all"
          >
            {city}
          </button>
        ))}
      </div>
    </div>
  );
}