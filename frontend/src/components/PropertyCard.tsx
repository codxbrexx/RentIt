"use client";

import { MapPin, Bed, Star, CheckCircle, Heart, Maximize2 } from "lucide-react";
import { Property } from "../types";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

interface PropertyCardProps {
  property: Property;
}

export function PropertyCard({ property }: PropertyCardProps) {
  const [isSaved, setIsSaved] = useState(false);

  const formatPrice = (amount: number, period: string) => {
    return `₹${amount.toLocaleString("en-IN")}/${period === "month" ? "mo" : "night"}`;
  };

  return (
    <div className="group">
      <Link href={`/property/${property.id}`}>
        <div className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-gray-100 dark:border-slate-800 hover:shadow-large transition-all duration-300 hover:-translate-y-1">

          <div className="relative h-64 overflow-hidden bg-gray-100 dark:bg-slate-800">
            <Image
              src={
                property.images && property.images.length > 0
                  ? property.images[0]
                  : "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800"
              }
              alt={property.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />


            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>


            <div className="absolute top-3 left-3 right-3 flex items-start justify-between z-10">
              {property.verified && (
                <div className="px-2.5 py-1.5 bg-[#1DBF73] text-white rounded-lg flex items-center gap-1.5 shadow-medium">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span className="text-xs font-semibold">Verified</span>
                </div>
              )}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation(); // Stop propagation to Link
                  setIsSaved(!isSaved);
                }}
                className="ml-auto p-2.5 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm rounded-lg hover:bg-white dark:hover:bg-slate-900 transition-all shadow-medium hover:scale-110"
              >
                <Heart
                  className={`w-4.5 h-4.5 transition-all ${isSaved
                    ? "fill-[#DC2626] text-[#DC2626]"
                    : "text-[#475569] dark:text-slate-400"
                    }`}
                />
              </button>
            </div>


            <div className="absolute bottom-3 left-3 z-10">
              <div className="px-3 py-2 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm rounded-lg shadow-medium">
                <div className="text-[#1F4FD8] dark:text-[#4A6FE8] font-bold">
                  {formatPrice(property.price.amount, property.price.period)}
                </div>
              </div>
            </div>
          </div>


          <div className="p-6">
            <h4 className="text-[#0F172A] dark:text-white mb-2 line-clamp-2 group-hover:text-[#1F4FD8] dark:group-hover:text-[#4A6FE8] transition-colors min-h-[3.5rem] font-bold">
              {property.title}
            </h4>

            <div className="flex items-center gap-1.5 text-[#475569] dark:text-slate-400 mb-4">
              <MapPin className="w-4 h-4 flex-shrink-0 text-[#94A3B8] dark:text-slate-500" />

              <span className="text-sm truncate">
                {property.location.area}, {property.location.city}
              </span>
            </div>


            <div className="flex items-center gap-4 mb-4 pb-4 border-b border-gray-100 dark:border-slate-800">
              {property.bhk && (
                <div className="flex items-center gap-1.5 text-[#475569] dark:text-slate-400">
                  <Bed className="w-4 h-4 text-[#94A3B8] dark:text-slate-500" />
                  <span className="text-sm">{property.bhk} BHK</span>
                </div>
              )}
              {property.area && (
                <div className="flex items-center gap-1.5 text-[#475569] dark:text-slate-400">
                  <Maximize2 className="w-4 h-4 text-[#94A3B8] dark:text-slate-500" />
                  <span className="text-sm">{property.area} sqft</span>
                </div>
              )}
              {property.furnishing && (
                <div className="px-2 py-1 bg-gray-50 dark:bg-slate-800 rounded text-xs text-[#475569] dark:text-slate-300">
                  {property.furnishing.split(" ")[0]}
                </div>
              )}
            </div>


            <div className="flex items-center justify-between">
              {property.rating && (
                <div className="flex items-center gap-1.5">
                  <div className="flex items-center gap-1 px-2 py-1 bg-[#F59E0B]/10 rounded">
                    <Star className="w-3.5 h-3.5 fill-[#F59E0B] text-[#F59E0B]" />
                    <span className="text-sm text-[#0F172A] dark:text-white font-semibold">
                      {property.rating}
                    </span>
                  </div>
                  <span className="text-[#94A3B8] dark:text-slate-500 text-sm">
                    ({property.reviews})
                  </span>
                </div>
              )}

              <div className="text-sm text-[#1F4FD8] dark:text-[#4A6FE8] font-semibold group-hover:gap-2 flex items-center gap-1 transition-all">
                View Details
                <svg
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
