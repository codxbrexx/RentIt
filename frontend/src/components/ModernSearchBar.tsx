"use client";

import { MapPin, Search, Building2, Car, Camera, Tent } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

type Category = "house" | "hotel" | "vehicle" | "equipment" | "event";

export function ModernSearchBar() {
  const [category, setCategory] = useState<Category>("house");
  const [location, setLocation] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    params.set("category", category);
    if (location) {
      params.set("location", location);
    }
    router.push(`/search?${params.toString()}`);
  };

  return (
    <div className="w-full">
      <form
        onSubmit={handleSearch}
        className="bg-white dark:bg-slate-900 rounded-[2rem] shadow-2xl shadow-slate-200/50 dark:shadow-slate-900/50 overflow-hidden border border-slate-100 dark:border-slate-800"
      >
        {/* Search Fields */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-end">
            {/* Location Input */}
            <div className="lg:col-span-5">
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5 ml-1">
                Location
              </label>

              <div className="relative group">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-[#1F4FD8] dark:group-focus-within:text-[#4A6FE8] transition-colors" />

                <input
                  type="text"
                  placeholder="Search localities (e.g., Koramangala)"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-white dark:bg-slate-950 border-2 border-slate-100 dark:border-slate-800 rounded-xl focus:outline-none focus:border-[#1F4FD8] dark:focus:border-[#4A6FE8] transition-all text-slate-900 dark:text-white placeholder:text-slate-400 font-medium text-base"
                />
              </div>
            </div>

            {/* Property Type Dropdown */}
            <div className="lg:col-span-4">
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5 ml-1">
                Category
              </label>

              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-[#1F4FD8] dark:group-focus-within:text-[#4A6FE8] transition-colors" />

                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as Category)}
                  className="w-full pl-12 pr-10 py-3.5 bg-white dark:bg-slate-950 border-2 border-slate-100 dark:border-slate-800 rounded-xl focus:outline-none focus:border-[#1F4FD8] dark:focus:border-[#4A6FE8] transition-all appearance-none cursor-pointer text-slate-900 dark:text-white font-medium text-base"
                >
                  <option value="house">Residential House</option>
                  <option value="hotel">Hotel / Stay</option>
                  <option value="vehicle">Vehicle (Bike/Car)</option>
                  <option value="equipment">Equipment (Camera/Tools)</option>
                  <option value="event">Event Space</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-slate-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Search Button */}
            <div className="lg:col-span-3">
              <button
                type="submit"
                className="w-full px-6 py-3.5 bg-[#1F4FD8] text-white rounded-xl hover:bg-[#1640B8] hover:shadow-lg hover:shadow-blue-900/20 active:scale-95 transition-all flex items-center justify-center gap-2 group font-bold text-base"
              >
                <Search className="w-5 h-5" />
                <span>Search</span>
              </button>
            </div>
          </div>

          {/* Quick Filters */}
          <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800 flex items-center gap-4 overflow-x-auto pb-2 scrollbar-none">
            <span className="text-sm font-medium text-slate-500 dark:text-slate-400 whitespace-nowrap">
              Popular Cities:
            </span>

            <div className="flex gap-2">
              {["Bangalore", "Mumbai", "Delhi", "Pune", "Hyderabad"].map(
                (city) => (
                  <button
                    key={city}
                    type="button"
                    onClick={() => setLocation(city)}
                    className="px-4 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full text-xs font-semibold text-slate-600 dark:text-slate-300 hover:border-[#1F4FD8] dark:hover:border-[#4A6FE8] hover:text-[#1F4FD8] dark:hover:text-[#4A6FE8] hover:bg-white dark:hover:bg-slate-900 transition-all whitespace-nowrap"
                  >
                    {city}
                  </button>
                ),
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
