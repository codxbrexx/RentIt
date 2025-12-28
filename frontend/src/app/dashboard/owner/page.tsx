"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Edit2, Trash2, Eye, MapPin, MoreVertical } from "lucide-react";

export default function OwnerDashboard() {
    // Mock data for now - will be replaced by API call
    const listings = [
        {
            id: 1,
            title: "Luxury Beach House",
            location: "Goa, India",
            price: 15000,
            views: 1240,
            status: "Active",
            image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
        },
        {
            id: 2,
            title: "Modern Apartment in City Center",
            location: "Mumbai, India",
            price: 45000,
            views: 856,
            status: "Active",
            image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
        },
    ];

    return (
        <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                        My Properties
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400">
                        Manage your listings and view analytics
                    </p>
                </div>
                <Link
                    href="/dashboard/owner/add-property"
                    className="flex items-center gap-2 px-6 py-3 bg-[#1F4FD8] text-white rounded-xl hover:bg-[#1845b8] font-semibold shadow-lg shadow-blue-900/20 transition-all active:scale-95"
                >
                    <Plus className="w-5 h-5" />
                    Add Property
                </Link>
            </div>

            <div className="grid gap-6">
                {listings.map((item) => (
                    <div
                        key={item.id}
                        className="group bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 hover:shadow-lg transition-all flex flex-col sm:flex-row gap-6 items-start sm:items-center"
                    >
                        <div className="relative w-full sm:w-48 h-48 sm:h-32 rounded-xl overflow-hidden shrink-0">
                            <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute top-2 left-2 px-2 py-1 bg-emerald-500 text-white text-xs font-bold rounded-md">
                                {item.status}
                            </div>
                        </div>

                        <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between mb-2">
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1 truncate">
                                        {item.title}
                                    </h3>
                                    <div className="flex items-center gap-2 text-slate-500 text-sm">
                                        <MapPin className="w-4 h-4" />
                                        {item.location}
                                    </div>
                                </div>
                                <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                                    <MoreVertical className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="flex items-center gap-6 mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                                    <Eye className="w-4 h-4 text-blue-500" />
                                    <span className="font-semibold">{item.views}</span>
                                    <span className="text-slate-400 text-sm">Views</span>
                                </div>
                                <div className="text-slate-900 dark:text-white font-bold">
                                    ₹{item.price.toLocaleString()}
                                    <span className="text-slate-400 font-normal text-sm"> / month</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex sm:flex-col gap-2 w-full sm:w-auto">
                            <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-sm font-medium">
                                <Edit2 className="w-4 h-4" />
                                Edit
                            </button>
                            <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-red-200 dark:border-red-900/30 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-colors text-sm font-medium">
                                <Trash2 className="w-4 h-4" />
                                Delete
                            </button>
                        </div>
                    </div>
                ))}

                {listings.length === 0 && (
                    <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700">
                        <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Building className="w-8 h-8 text-slate-400" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No properties listed yet</h3>
                        <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-sm mx-auto">
                            Start earning by listing your home, hotel, or equipment today.
                        </p>
                        <Link
                            href="/dashboard/owner/add-property"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-[#1F4FD8] text-white rounded-xl hover:bg-[#1845b8] font-semibold"
                        >
                            <Plus className="w-5 h-5" />
                            List Your First Property
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
