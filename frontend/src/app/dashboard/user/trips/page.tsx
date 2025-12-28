"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { Booking } from "@/types";
import { Loader2, Calendar, MapPin, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";

export default function MyTrips() {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const data = await api.bookings.getUserBookings();
                setBookings(data);
            } catch (error) {
                console.error("Failed to fetch bookings", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <Loader2 className="w-8 h-8 animate-spin text-[#1F4FD8]" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-[#0F172A] dark:text-white">
                    My Trips
                </h1>
            </div>

            {bookings.length === 0 ? (
                <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
                    <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Calendar className="w-8 h-8 text-slate-400" />
                    </div>
                    <h3 className="text-lg font-bold text-[#0F172A] dark:text-white mb-2">
                        No trips booked yet
                    </h3>
                    <p className="text-slate-500 mb-6">
                        Time to dust off your bags and start planning your next adventure.
                    </p>
                    <Link
                        href="/search"
                        className="px-6 py-2.5 bg-[#1F4FD8] text-white rounded-xl font-medium hover:bg-[#1845b8] transition-colors"
                    >
                        Start Exploring
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-6">
                    {bookings.map((booking) => (
                        <div
                            key={booking.id}
                            className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 md:p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row gap-6"
                        >
                            {/* Image */}
                            <div className="w-full md:w-48 h-48 md:h-auto relative rounded-xl overflow-hidden flex-shrink-0">
                                <Image
                                    src={booking.listing.images?.[0] || "/placeholder.png"}
                                    alt={booking.listing.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            {/* Content */}
                            <div className="flex-1 space-y-4">
                                <div className="flex flex-wrap justify-between items-start gap-2">
                                    <div>
                                        <h3 className="text-lg font-bold text-[#0F172A] dark:text-white mb-1">
                                            {booking.listing.title}
                                        </h3>
                                        <div className="flex items-center gap-1 text-slate-500 text-sm">
                                            <MapPin className="w-4 h-4" />
                                            {booking.listing.location?.city || 'Unknown Location'}
                                        </div>
                                    </div>

                                    <span className={`px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider
                    ${booking.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                                            booking.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                                                booking.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                                                    'bg-slate-100 text-slate-700'}`}
                                    >
                                        {booking.status}
                                    </span>
                                </div>

                                <div className="flex flex-wrap gap-6 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                                    <div>
                                        <p className="text-xs text-slate-500 mb-1">Check-in</p>
                                        <p className="font-semibold text-[#0F172A] dark:text-white">
                                            {format(new Date(booking.startDate), 'dd MMM yyyy')}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 mb-1">Check-out</p>
                                        <p className="font-semibold text-[#0F172A] dark:text-white">
                                            {format(new Date(booking.endDate), 'dd MMM yyyy')}
                                        </p>
                                    </div>
                                    <div className="border-l border-slate-200 pl-6 hidden md:block">
                                        <p className="text-xs text-slate-500 mb-1">Total</p>
                                        <p className="font-semibold text-[#1F4FD8]">
                                            ₹{Number(booking.totalAmount).toLocaleString('en-IN')}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 pt-2">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold">
                                            {booking.host.name?.[0]}
                                        </div>
                                        <div className="text-sm">
                                            <p className="text-[#0F172A] dark:text-white font-medium">Hosted by {booking.host.name}</p>
                                        </div>
                                    </div>

                                    <button className="ml-auto text-sm text-[#1F4FD8] font-medium hover:underline">
                                        Message Host
                                    </button>
                                    {booking.status === 'pending' && (
                                        <button
                                            className="text-sm text-red-600 font-medium hover:underline ml-4"
                                            onClick={() => {
                                                if (confirm('Are you sure you want to cancel?')) {
                                                    api.bookings.updateStatus(booking.id, 'cancelled', 'User cancelled');
                                                    window.location.reload();
                                                }
                                            }}
                                        >
                                            Cancel Request
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
