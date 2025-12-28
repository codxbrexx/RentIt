"use client";

import Link from "next/link";
import { Heart, MapPin, ArrowRight } from "lucide-react";

export default function SavedPropertiesPage() {
    // Mock data - replace with API call
    const savedProperties = [
        {
            id: 1,
            title: "Luxury Beach House",
            type: "Home",
            location: "Goa, India",
            price: 15000,
            image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
            rating: 4.8
        },
        {
            id: 3,
            title: "Sony A7III Camera Kit",
            type: "Equipment",
            location: "Bangalore, India",
            price: 2000,
            period: "day",
            image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80",
            rating: 4.9
        }
    ];

    return (
        <div className="max-w-6xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                    Saved Properties
                </h1>
                <p className="text-slate-500 dark:text-slate-400">
                    Your collection of favorite places and items.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedProperties.map((property) => (
                    <Link
                        href={`/property/${property.id}`}
                        key={property.id}
                        className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-lg transition-all"
                    >
                        <div className="relative h-56 overflow-hidden">
                            <img
                                src={property.image}
                                alt={property.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <button className="absolute top-3 right-3 p-2 bg-white/90 dark:bg-slate-900/90 rounded-full text-rose-500 shadow-sm hover:scale-110 transition-transform">
                                <Heart className="w-5 h-5 fill-current" />
                            </button>
                            <div className="absolute top-3 left-3 px-3 py-1 bg-slate-900/80 backdrop-blur-sm text-white text-xs font-semibold rounded-lg">
                                {property.type}
                            </div>
                        </div>

                        <div className="p-5">
                            <div className="flex items-start justify-between mb-2">
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1 group-hover:text-[#1F4FD8] transition-colors line-clamp-1">
                                        {property.title}
                                    </h3>
                                    <div className="flex items-center gap-1 text-slate-500 text-sm">
                                        <MapPin className="w-3.5 h-3.5" />
                                        {property.location}
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                                <div className="text-slate-900 dark:text-white font-bold">
                                    ₹{property.price.toLocaleString()}
                                    <span className="text-slate-400 font-normal text-xs"> / {property.period || 'month'}</span>
                                </div>
                                <span className="text-xs font-semibold text-[#1F4FD8] flex items-center gap-1">
                                    View Details <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                </span>
                            </div>
                        </div>
                    </Link>
                ))}

                {savedProperties.length === 0 && (
                    <div className="col-span-full py-20 text-center bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800">
                        <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Heart className="w-8 h-8 text-slate-300" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">No saved properties</h3>
                        <p className="text-slate-500 mb-6">Start exploring to find your dream rental.</p>
                        <Link
                            href="/search"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-[#1F4FD8] text-white rounded-xl hover:bg-[#1845b8] font-semibold transition-colors"
                        >
                            Explore Rentals
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
