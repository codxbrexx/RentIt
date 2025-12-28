"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { Booking } from "@/types";
import { Loader2, Calendar, Check, X, Clock } from "lucide-react";
import Image from "next/image";
import { format } from "date-fns";
import { toast } from "sonner"; // Mock toast usage, or standard alert

export default function BookingRequests() {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchBookings = async () => {
        try {
            const data = await api.bookings.getHostBookings();
            setBookings(data);
        } catch (error) {
            console.error("Failed to fetch host bookings", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    const handleStatusUpdate = async (id: string, status: 'confirmed' | 'rejected') => {
        try {
            await api.bookings.updateStatus(id, status);
            // alert(`Booking ${status}`);
            fetchBookings(); // Refresh list
        } catch (error) {
            alert("Failed to update status");
        }
    };

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
                    Booking Requests
                </h1>
            </div>

            {bookings.length === 0 ? (
                <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
                    <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Clock className="w-8 h-8 text-slate-400" />
                    </div>
                    <h3 className="text-lg font-bold text-[#0F172A] dark:text-white mb-2">
                        No booking requests yet
                    </h3>
                    <p className="text-slate-500">
                        When users book your properties, requests will appear here.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-6">
                    {bookings.map((booking) => (
                        <div
                            key={booking.id}
                            className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm flex flex-col md:flex-row gap-6"
                        >
                            {/* Image */}
                            <div className="w-full md:w-32 h-32 relative rounded-xl overflow-hidden flex-shrink-0">
                                <Image
                                    src={booking.listing.images?.[0] || "/placeholder.png"}
                                    alt={booking.listing.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            {/* Content */}
                            <div className="flex-1">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-lg font-bold text-[#0F172A] dark:text-white mb-1">
                                            {booking.listing.title}
                                        </h3>
                                        <div className="flex items-center gap-2 text-sm text-slate-500">
                                            <span className="font-medium text-[#0F172A] dark:text-white">
                                                {booking.renter.name}
                                            </span>
                                            <span>•</span>
                                            <span>requesting to book</span>
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

                                <div className="flex items-center gap-6 mb-6">
                                    <div className="bg-slate-50 dark:bg-slate-800 px-4 py-2 rounded-lg">
                                        <span className="text-xs text-slate-500 block">Dates</span>
                                        <span className="font-semibold text-[#0F172A] dark:text-white">
                                            {format(new Date(booking.startDate), 'dd MMM')} - {format(new Date(booking.endDate), 'dd MMM yyyy')}
                                        </span>
                                    </div>
                                    <div className="bg-slate-50 dark:bg-slate-800 px-4 py-2 rounded-lg">
                                        <span className="text-xs text-slate-500 block">Payout</span>
                                        <span className="font-semibold text-[#1F4FD8]">
                                            ₹{Number(booking.subtotal).toLocaleString('en-IN')}
                                        </span>
                                    </div>
                                </div>

                                {/* Actions */}
                                {booking.status === 'pending' && (
                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => handleStatusUpdate(booking.id, 'confirmed')}
                                            className="flex-1 bg-[#1F4FD8] text-white px-4 py-2.5 rounded-xl font-semibold hover:bg-[#1845b8] transition-colors flex items-center justify-center gap-2"
                                        >
                                            <Check className="w-4 h-4" />
                                            Accept Request
                                        </button>
                                        <button
                                            onClick={() => handleStatusUpdate(booking.id, 'rejected')}
                                            className="flex-1 bg-white border border-slate-200 text-slate-700 px-4 py-2.5 rounded-xl font-semibold hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
                                        >
                                            <X className="w-4 h-4" />
                                            Decline
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
