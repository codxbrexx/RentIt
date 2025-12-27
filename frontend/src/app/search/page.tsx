"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { PropertyCard } from "@/components/PropertyCard";
import { SkeletonCard } from "@/components/SkeletonCard";
import { api } from "@/lib/api";
import { Property } from "@/types";
import { SlidersHorizontal, Grid, List, MapPin, X } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

function SearchResultsContent() {
  const searchParams = useSearchParams();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Filters
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200000]);
  const [bhkFilter, setBhkFilter] = useState<string[]>([]);
  const [furnishingFilter, setFurnishingFilter] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState("relevance");

  const category = searchParams.get("category") || "house";
  const location = searchParams.get("location") || "";

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      try {
        const allProperties = await api.listings.getAll({
          category,
          ...(location && { city: location }), // basic location mapping
        });

        // Client-side filtering for complex fields (mock/hybrid approach)
        let filtered = allProperties;

        if (location) {
          filtered = filtered.filter(
            (p) =>
              p.location.city.toLowerCase().includes(location.toLowerCase()) ||
              p.location.area.toLowerCase().includes(location.toLowerCase()),
          );
        }

        // Apply filters
        if (bhkFilter.length > 0) {
          filtered = filtered.filter(
            (p) => p.bhk && bhkFilter.includes(p.bhk.toString()),
          );
        }

        if (furnishingFilter.length > 0) {
          filtered = filtered.filter(
            (p) => p.furnishing && furnishingFilter.includes(p.furnishing),
          );
        }

        filtered = filtered.filter(
          (p) =>
            p.price.amount >= priceRange[0] && p.price.amount <= priceRange[1],
        );

        // Sorting
        if (sortBy === "price-low") {
          filtered.sort((a, b) => a.price.amount - b.price.amount);
        } else if (sortBy === "price-high") {
          filtered.sort((a, b) => b.price.amount - a.price.amount);
        } else if (sortBy === "rating") {
          filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        } else if (sortBy === "newest") {
          // Assuming 'createdAt' or similar timestamp exists for sorting by newest
          // For mock data, we might not have this, so it's a placeholder
          // filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        }

        setProperties(filtered);
      } catch (error) {
        console.error("Failed to fetch properties", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [category, location, bhkFilter, furnishingFilter, priceRange, sortBy]);

  const handleBhkToggle = (bhk: string) => {
    setBhkFilter((prev) =>
      prev.includes(bhk) ? prev.filter((b) => b !== bhk) : [...prev, bhk],
    );
  };

  const handleFurnishingToggle = (furnishing: string) => {
    setFurnishingFilter((prev) =>
      prev.includes(furnishing)
        ? prev.filter((f) => f !== furnishing)
        : [...prev, furnishing],
    );
  };

  const clearAllFilters = () => {
    setBhkFilter([]);
    setFurnishingFilter([]);
    setPriceRange([0, 200000]);
    setSortBy("relevance");
  };

  const activeFiltersCount =
    bhkFilter.length +
    furnishingFilter.length +
    (priceRange[1] !== 200000 ? 1 : 0);

  return (
    <div className="min-h-screen bg-[#FAFBFC] dark:bg-slate-950">
      {/* Header with Search */}

      <div className="bg-[#FAFBFC] dark:bg-slate-950 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-40 shadow-soft">
        <div className={"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6"}>
          {/* Breadcrumb & Location */}
          <div className="flex items-center gap-2 text-sm text-[#94A3B8] mb-4">
            <Link href="/" className="hover:text-[#1F4FD8]">
              Home
            </Link>
            <span>/</span>
            <span>
              {category === "house" && "House Rentals"}
              {category === "hotel" && "Hotels & Stays"}
              {category === "vehicle" && "Vehicle Rentals"}
              {category === "equipment" && "Equipment Rentals"}
              {category === "event" && "Event Spaces"}
            </span>
            {location && (
              <>
                <span>/</span>
                <span className="text-[#1F4FD8]">{location}</span>
              </>
            )}
          </div>

          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <h2 className="mb-1 text-2xl font-bold text-[#0F172A] dark:text-white capitalize">
                {category} Rentals
              </h2>
              <p className="text-[#475569] dark:text-slate-400">
                {loading ? (
                  <span className="inline-block w-32 h-5 bg-gray-200 rounded animate-pulse"></span>
                ) : (
                  <>
                    <span className="font-semibold text-[#1F4FD8]">
                      {properties.length}
                    </span>{" "}
                    properties found
                    {location && (
                      <>
                        {" "}
                        in <span className="font-semibold">{location}</span>
                      </>
                    )}
                  </>
                )}
              </p>
            </div>

            <div className="flex items-center gap-3">
              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2.5 border border-gray-200 dark:border-slate-800 rounded-xl focus:outline-none focus:border-[#1F4FD8] dark:focus:border-[#4A6FE8] focus:ring-2 focus:ring-[#1F4FD8]/20 bg-white dark:bg-slate-900 text-[#475569] dark:text-slate-300"
              >
                <option value="relevance">Most Relevant</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest First</option>
              </select>

              {/* View Mode Toggle */}
              <div className="hidden md:flex border border-gray-200 dark:border-slate-800 rounded-xl overflow-hidden">
                <button
                  onClick={() => setViewMode("grid")}
                  className={cn(
                    "px-4 py-2.5 transition-all",
                    viewMode === "grid"
                      ? "bg-[#1F4FD8] text-white"
                      : "bg-white dark:bg-slate-900 text-[#475569] dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-800",
                  )}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={cn(
                    "px-4 py-2.5 transition-all",
                    viewMode === "list"
                      ? "bg-[#1F4FD8] text-white"
                      : "bg-white dark:bg-slate-900 text-[#475569] dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-800",
                  )}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>

              {/* Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="relative flex items-center gap-2 px-4 py-2.5 border border-gray-200 dark:border-slate-800 rounded-xl text-[#475569] dark:text-slate-300 hover:border-[#1F4FD8] dark:hover:border-[#4A6FE8] hover:text-[#1F4FD8] dark:hover:text-[#4A6FE8] transition-all bg-white dark:bg-slate-900"
              >
                <SlidersHorizontal className="w-5 h-5" />
                <span className="hidden sm:inline">Filters</span>
                {activeFiltersCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-6 h-6 bg-[#1F4FD8] text-white text-xs rounded-full flex items-center justify-center">
                    {activeFiltersCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Filters Sidebar */}
          {showFilters && (
            <aside className="w-80 flex-shrink-0">
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-slate-800 p-6 sticky top-32 shadow-soft">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-[#0F172A] dark:text-white font-bold">
                    Filters
                  </h3>

                  {activeFiltersCount > 0 && (
                    <button
                      onClick={clearAllFilters}
                      className="text-sm text-[#1F4FD8] hover:underline"
                    >
                      Clear All
                    </button>
                  )}
                </div>

                {/* Price Range */}
                <div className="mb-6 pb-6 border-b border-gray-100 dark:border-slate-800">
                  <label className="block text-[#475569] dark:text-slate-300 mb-4 font-medium">
                    Price Range
                  </label>

                  <div className="space-y-3">
                    <input
                      type="range"
                      min="0"
                      max="200000"
                      step="5000"
                      value={priceRange[1]}
                      onChange={(e) =>
                        setPriceRange([priceRange[0], parseInt(e.target.value)])
                      }
                      className="w-full accent-[#1F4FD8] h-2 bg-gray-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between">
                      <span className="px-3 py-1.5 bg-gray-100 dark:bg-slate-800 rounded-lg text-sm text-[#475569] dark:text-slate-300">
                        ₹{priceRange[0].toLocaleString("en-IN")}
                      </span>
                      <span className="px-3 py-1.5 bg-[#1F4FD8] text-white rounded-lg text-sm">
                        ₹{priceRange[1].toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>
                </div>

                {/* BHK Filter (for houses) */}
                {category === "house" && (
                  <div className="mb-6 pb-6 border-b border-gray-100 dark:border-slate-800">
                    <label className="block text-[#475569] dark:text-slate-300 mb-4 font-medium">
                      BHK Type
                    </label>

                    <div className="grid grid-cols-4 gap-2">
                      {["1", "2", "3", "4"].map((bhk) => (
                        <button
                          key={bhk}
                          onClick={() => handleBhkToggle(bhk)}
                          className={cn(
                            "py-2 rounded-lg border-2 transition-all font-medium",
                            bhkFilter.includes(bhk)
                              ? "border-[#1F4FD8] bg-[#1F4FD8] text-white"
                              : "border-gray-200 dark:border-slate-700 text-[#475569] dark:text-slate-300 hover:border-[#1F4FD8] dark:hover:border-[#4A6FE8]",
                          )}
                        >
                          {bhk}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Furnishing Filter (for houses) */}
                {category === "house" && (
                  <div className="mb-6">
                    <label className="block text-[#475569] dark:text-slate-300 mb-4 font-medium">
                      Furnishing
                    </label>

                    <div className="space-y-2">
                      {["Fully Furnished", "Semi Furnished", "Unfurnished"].map(
                        (furnishing) => (
                          <label
                            key={furnishing}
                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800 cursor-pointer transition-colors"
                          >
                            <input
                              type="checkbox"
                              checked={furnishingFilter.includes(furnishing)}
                              onChange={() =>
                                handleFurnishingToggle(furnishing)
                              }
                              className="w-5 h-5 accent-[#1F4FD8] rounded"
                            />
                            <span className="text-[#475569] dark:text-slate-300">
                              {furnishing}
                            </span>
                          </label>
                        ),
                      )}
                    </div>
                  </div>
                )}
              </div>
            </aside>
          )}

          {/* Property Grid */}
          <div className="flex-1">
            {/* Active Filters Pills */}
            {activeFiltersCount > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {bhkFilter.map((bhk) => (
                  <div
                    key={bhk}
                    className="flex items-center gap-2 px-3 py-1.5 bg-[#1F4FD8]/10 text-[#1F4FD8] rounded-lg text-sm font-medium"
                  >
                    <span>{bhk} BHK</span>
                    <button onClick={() => handleBhkToggle(bhk)}>
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                {furnishingFilter.map((furnishing) => (
                  <div
                    key={furnishing}
                    className="flex items-center gap-2 px-3 py-1.5 bg-[#1F4FD8]/10 text-[#1F4FD8] rounded-lg text-sm font-medium"
                  >
                    <span>{furnishing}</span>
                    <button onClick={() => handleFurnishingToggle(furnishing)}>
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {loading ? (
              <div
                className={`grid ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"} gap-6`}
              >
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            ) : properties.length > 0 ? (
              <div
                className={`grid ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"} gap-6`}
              >
                {properties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-slate-800">
                <div className="w-24 h-24 bg-gray-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
                  <MapPin className="w-12 h-12 text-[#94A3B8] dark:text-slate-500" />
                </div>
                <h3 className="text-[#0F172A] dark:text-white mb-3 text-xl font-bold">
                  No properties found
                </h3>

                <p className="text-[#475569] dark:text-slate-400 mb-8 max-w-md mx-auto">
                  We couldn't find any properties matching your criteria. Try
                  adjusting your filters or search in a different location.
                </p>

                <button
                  onClick={() => {
                    clearAllFilters();
                    // Optional: Reset category or location if needed,
                    // effectively redirecting to a broader search
                    // router.push('/search');
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-[#1F4FD8] to-[#4A6FE8] text-white rounded-xl hover:shadow-lg transition-all font-bold"
                >
                  Clear Filters
                </button>
                <Link
                  href="/search"
                  className="block mt-4 text-[#1F4FD8] font-medium hover:underline"
                >
                  Browse All Rentals
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SearchResults() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FAFBFC] flex items-center justify-center">
          Loading...
        </div>
      }
    >
      <SearchResultsContent />
    </Suspense>
  );
}
