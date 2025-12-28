"use client";

import { useState, useEffect } from "react";
import { format, differenceInDays, addDays, isBefore, isWithinInterval } from "date-fns";
import { DayPicker, DateRange } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { api } from "@/lib/api";
import { Loader2 } from "lucide-react";

interface DateRangePickerProps {
    listingId: string;
    pricePerNight: number;
    onBookingSelect: (range: { startDate: Date; endDate: Date; totalPrice: number }) => void;
    disabled?: boolean;
}

export function DateRangePicker({ listingId, pricePerNight, onBookingSelect, disabled }: DateRangePickerProps) {
    const [range, setRange] = useState<DateRange | undefined>();
    const [bookedDates, setBookedDates] = useState<{ from: Date; to: Date }[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookedDates = async () => {
            try {
                const dates = await api.bookings.getBookedDates(listingId);
                setBookedDates(dates.map((d: any) => ({
                    from: new Date(d.startDate),
                    to: new Date(d.endDate)
                })));
            } catch (error) {
                console.error("Failed to fetch booked dates", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBookedDates();
    }, [listingId]);

    const handleSelect = (selectedRange: DateRange | undefined) => {
        setRange(selectedRange);

        if (selectedRange?.from && selectedRange?.to) {
            const days = differenceInDays(selectedRange.to, selectedRange.from);
            // Ensure we count the nights correctly (e.g., 1 day diff = 1 night)
            const totalPrice = Math.max(1, days) * pricePerNight;

            onBookingSelect({
                startDate: selectedRange.from,
                endDate: selectedRange.to,
                totalPrice
            });
        }
    };

    const isDateDisabled = (date: Date) => {
        if (isBefore(date, new Date())) return true;

        return bookedDates.some(interval =>
            isWithinInterval(date, { start: interval.from, end: interval.to })
        );
    };

    if (loading) {
        return (
            <div className="flex justify-center p-8">
                <Loader2 className="w-6 h-6 animate-spin text-slate-400" />
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4">
            <DayPicker
                mode="range"
                defaultMonth={new Date()}
                selected={range}
                onSelect={handleSelect}
                numberOfMonths={1}
                disabled={isDateDisabled}
                modifiersStyles={{
                    selected: { backgroundColor: '#1F4FD8', color: 'white' },
                    today: { color: '#1F4FD8', fontWeight: 'bold' }
                }}
                className="mx-auto"
            />

            {range?.from && range?.to && (
                <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-slate-500">Total Days</span>
                        <span className="font-bold">{differenceInDays(range.to, range.from)} Nights</span>
                    </div>
                    <div className="flex justify-between items-center text-lg font-bold text-[#1F4FD8]">
                        <span>Total Price</span>
                        <span>₹{(differenceInDays(range.to, range.from) * pricePerNight).toLocaleString()}</span>
                    </div>
                </div>
            )}
        </div>
    );
}
