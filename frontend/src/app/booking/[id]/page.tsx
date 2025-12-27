"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { Property } from "@/types";
import {
  CreditCard,
  Smartphone,
  Wallet,
  Building2,
  CheckCircle,
  AlertCircle,
  Calendar,
  MapPin,
  ArrowLeft,
} from "lucide-react";

export default function BookingPage() {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState<"upi" | "card" | "wallet">(
    "upi",
  );
  const [bookingStatus, setBookingStatus] = useState<
    "form" | "processing" | "success"
  >("form");
  const [bookingId, setBookingId] = useState("");

  // Form states
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [upiId, setUpiId] = useState("");

  useEffect(() => {
    const fetchProperty = async () => {
      const found = await api.listings.getById(id);
      setProperty(found || null);
      setLoading(false);
    };
    fetchProperty();
  }, [id]);

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setBookingStatus("processing");

    try {
      const result = await api.bookings.create({
        propertyId: property?.id,
        checkIn,
        checkOut,
        paymentMethod,
        totalAmount: 1000, // Placeholder logic, calculation is below
      });
      setBookingId(result.id);
      setBookingStatus("success");
    } catch (error) {
      console.error("Booking failed", error);
      // Even on failure, for this demo we might want to show success if using mock fallback
      // But allow the API svc to handle the fallback
    }
  };

  if (loading || !property) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center animate-pulse">
        <div className="h-12 w-48 bg-gray-200 dark:bg-slate-800 rounded mx-auto mb-4"></div>
        <p className="text-gray-400">Loading booking details...</p>
      </div>
    );
  }

  if (bookingStatus === "success") {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 p-8 text-center shadow-lg">
          <div className="w-20 h-20 bg-[#1DBF73]/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-[#1DBF73]" />
          </div>

          <h2 className="text-[#0F172A] dark:text-white mb-2 text-3xl font-bold">
            Booking Confirmed!
          </h2>
          <p className="text-[#475569] dark:text-slate-400 mb-8 text-lg">
            Your booking has been successfully confirmed. You will receive a
            confirmation email shortly.
          </p>

          <div className="bg-[#F8FAFC] dark:bg-slate-950 rounded-xl p-6 mb-8 text-left border border-gray-100 dark:border-slate-800">
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200 dark:border-slate-800">
              <span className="text-[#94A3B8] font-medium">Booking ID</span>
              <span className="text-[#0F172A] dark:text-white font-mono font-bold text-lg">
                {bookingId}
              </span>
            </div>

            <h4 className="text-[#0F172A] dark:text-white mb-3 font-bold text-xl">
              {property.title}
            </h4>

            <div className="flex items-start gap-2 text-[#475569] dark:text-slate-400 mb-4">
              <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5 text-[#1F4FD8] dark:text-[#4A6FE8]" />
              <span>
                {property.location.area}, {property.location.city}
              </span>
            </div>

            {property.type === "hotel" && checkIn && checkOut && (
              <div className="space-y-2 text-[#475569] dark:text-slate-400">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-[#1F4FD8] dark:text-[#4A6FE8]" />
                  <span>
                    Check-in: {new Date(checkIn).toLocaleDateString("en-IN")}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-[#1F4FD8] dark:text-[#4A6FE8]" />
                  <span>
                    Check-out: {new Date(checkOut).toLocaleDateString("en-IN")}
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => router.push("/profile")}
              className="flex-1 px-6 py-3 bg-[#1F4FD8] text-white rounded-xl hover:bg-[#1845b8] transition-colors font-bold shadow-soft hover:shadow-lg"
            >
              View My Bookings
            </button>
            <button
              onClick={() => router.push("/")}
              className="flex-1 px-6 py-3 border border-gray-200 dark:border-slate-800 rounded-xl text-[#475569] dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors font-semibold"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (bookingStatus === "processing") {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 p-12 shadow-lg">
          <div className="w-16 h-16 border-4 border-[#1F4FD8] dark:border-[#4A6FE8] border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <h3 className="text-[#0F172A] dark:text-white mb-2 text-2xl font-bold">
            Processing Your Payment...
          </h3>
          <p className="text-[#475569] dark:text-slate-400">
            Please wait while we confirm your booking
          </p>
        </div>
      </div>
    );
  }

  const baseAmount = property.price.amount;
  const platformFee = baseAmount * 0.05;
  const securityDeposit = property.type === "house" ? baseAmount * 2 : 0;
  const totalAmount = baseAmount + platformFee + securityDeposit;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-[#475569] dark:text-slate-400 hover:text-[#1F4FD8] dark:hover:text-[#4A6FE8] mb-6 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back to Property</span>
      </button>

      <h2 className="mb-8 text-3xl font-bold text-[#0F172A] dark:text-white">
        Complete Your Booking
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Booking Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleBooking} className="space-y-6">
            {/* Property Details */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-slate-800 p-6 shadow-sm">
              <h3 className="text-[#0F172A] dark:text-white mb-4 font-bold text-lg">
                Property Details
              </h3>

              <div className="flex gap-4">
                <img
                  src={property.images[0]}
                  alt={property.title}
                  className="w-24 h-24 object-cover rounded-xl"
                />
                <div>
                  <h4 className="text-[#0F172A] dark:text-white mb-1 font-bold">
                    {property.title}
                  </h4>
                  <div className="flex items-center gap-1 text-[#475569] dark:text-slate-400 text-sm">
                    <MapPin className="w-4 h-4" />
                    <span>
                      {property.location.area}, {property.location.city}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Dates (for hotels) */}
            {property.type === "hotel" && (
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-slate-800 p-6 shadow-sm">
                <h3 className="text-[#0F172A] dark:text-white mb-4 font-bold text-lg">
                  Booking Dates
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#475569] dark:text-slate-300 mb-2 font-medium">
                      Check-in Date *
                    </label>

                    <input
                      type="date"
                      required
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      min={new Date().toISOString().split("T")[0]}
                      className="w-full px-4 py-2.5 border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:border-[#1F4FD8] dark:focus:border-[#4A6FE8] focus:ring-2 focus:ring-[#1F4FD8]/20"
                    />
                  </div>
                  <div>
                    <label className="block text-[#475569] dark:text-slate-300 mb-2 font-medium">
                      Check-out Date *
                    </label>

                    <input
                      type="date"
                      required
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      min={checkIn || new Date().toISOString().split("T")[0]}
                      className="w-full px-4 py-2.5 border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:border-[#1F4FD8] dark:focus:border-[#4A6FE8] focus:ring-2 focus:ring-[#1F4FD8]/20"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Guest Details */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-slate-800 p-6 shadow-sm">
              <h3 className="text-[#0F172A] dark:text-white mb-4 font-bold text-lg">
                Guest Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#475569] dark:text-slate-300 mb-2 font-medium">
                    Full Name *
                  </label>

                  <input
                    type="text"
                    required
                    placeholder="Enter your full name"
                    className="w-full px-4 py-2.5 border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:border-[#1F4FD8] dark:focus:border-[#4A6FE8] focus:ring-2 focus:ring-[#1F4FD8]/20"
                  />
                </div>
                <div>
                  <label className="block text-[#475569] dark:text-slate-300 mb-2 font-medium">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="your.email@example.com"
                    className="w-full px-4 py-2.5 border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:border-[#1F4FD8] dark:focus:border-[#4A6FE8] focus:ring-2 focus:ring-[#1F4FD8]/20"
                  />
                </div>
                <div>
                  <label className="block text-[#475569] dark:text-slate-300 mb-2 font-medium">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-2.5 border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:border-[#1F4FD8] dark:focus:border-[#4A6FE8] focus:ring-2 focus:ring-[#1F4FD8]/20"
                  />
                </div>
                <div>
                  <label className="block text-[#475569] dark:text-slate-300 mb-2 font-medium">
                    ID Proof Number *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Aadhaar / PAN / Passport"
                    className="w-full px-4 py-2.5 border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:border-[#1F4FD8] dark:focus:border-[#4A6FE8] focus:ring-2 focus:ring-[#1F4FD8]/20"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-slate-800 p-6 shadow-sm">
              <h3 className="text-[#0F172A] dark:text-white mb-4 font-bold text-lg">
                Payment Method
              </h3>

              <div className="space-y-3 mb-6">
                {/* UPI */}
                <label
                  className={`flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition-all ${paymentMethod === "upi" ? "border-[#1F4FD8] bg-[#1F4FD8]/5 dark:bg-[#1F4FD8]/10" : "border-gray-200 dark:border-slate-800 hover:border-[#1F4FD8] dark:hover:border-[#4A6FE8]"}`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="upi"
                    checked={paymentMethod === "upi"}
                    onChange={(e) => setPaymentMethod(e.target.value as "upi")}
                    className="w-5 h-5 accent-[#1F4FD8]"
                  />
                  <Smartphone className="w-6 h-6 text-[#1F4FD8]" />
                  <div className="flex-1">
                    <p className="text-[#0F172A] dark:text-white font-semibold">
                      UPI
                    </p>
                    <p className="text-[#94A3B8] text-sm">Pay using UPI ID</p>
                  </div>

                  <span className="text-[#1DBF73] text-sm font-medium bg-[#1DBF73]/10 px-2 py-1 rounded">
                    Recommended
                  </span>
                </label>

                {/* Cards */}
                <label
                  className={`flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition-all ${paymentMethod === "card" ? "border-[#1F4FD8] bg-[#1F4FD8]/5 dark:bg-[#1F4FD8]/10" : "border-gray-200 dark:border-slate-800 hover:border-[#1F4FD8] dark:hover:border-[#4A6FE8]"}`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={paymentMethod === "card"}
                    onChange={(e) => setPaymentMethod(e.target.value as "card")}
                    className="w-5 h-5 accent-[#1F4FD8]"
                  />
                  <CreditCard className="w-6 h-6 text-[#1F4FD8]" />
                  <div className="flex-1">
                    <p className="text-[#0F172A] dark:text-white font-semibold">
                      Credit / Debit Card
                    </p>
                    <p className="text-[#94A3B8] text-sm">
                      Visa, Mastercard, Rupay
                    </p>
                  </div>
                </label>

                {/* Wallets */}
                <label
                  className={`flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition-all ${paymentMethod === "wallet" ? "border-[#1F4FD8] bg-[#1F4FD8]/5 dark:bg-[#1F4FD8]/10" : "border-gray-200 dark:border-slate-800 hover:border-[#1F4FD8] dark:hover:border-[#4A6FE8]"}`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="wallet"
                    checked={paymentMethod === "wallet"}
                    onChange={(e) =>
                      setPaymentMethod(e.target.value as "wallet")
                    }
                    className="w-5 h-5 accent-[#1F4FD8]"
                  />
                  <Wallet className="w-6 h-6 text-[#1F4FD8]" />
                  <div className="flex-1">
                    <p className="text-[#0F172A] dark:text-white font-semibold">
                      Wallets
                    </p>
                    <p className="text-[#94A3B8] text-sm">
                      Paytm, PhonePe, Google Pay
                    </p>
                  </div>
                </label>
              </div>

              {/* Payment Details Input */}
              {paymentMethod === "upi" && (
                <div>
                  <label className="block text-[#475569] dark:text-slate-300 mb-2 font-medium">
                    UPI ID *
                  </label>
                  <input
                    type="text"
                    required
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="yourname@upi"
                    className="w-full px-4 py-2.5 border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:border-[#1F4FD8] dark:focus:border-[#4A6FE8] focus:ring-2 focus:ring-[#1F4FD8]/20"
                  />
                </div>
              )}

              {paymentMethod === "card" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-[#475569] dark:text-slate-300 mb-2 font-medium">
                      Card Number *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                      className="w-full px-4 py-2.5 border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:border-[#1F4FD8] dark:focus:border-[#4A6FE8] focus:ring-2 focus:ring-[#1F4FD8]/20"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[#475569] dark:text-slate-300 mb-2 font-medium">
                        Expiry *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="MM/YY"
                        maxLength={5}
                        className="w-full px-4 py-2.5 border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:border-[#1F4FD8] dark:focus:border-[#4A6FE8] focus:ring-2 focus:ring-[#1F4FD8]/20"
                      />
                    </div>
                    <div>
                      <label className="block text-[#475569] dark:text-slate-300 mb-2 font-medium">
                        CVV *
                      </label>
                      <input
                        type="password"
                        required
                        placeholder="123"
                        maxLength={3}
                        className="w-full px-4 py-2.5 border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:border-[#1F4FD8] dark:focus:border-[#4A6FE8] focus:ring-2 focus:ring-[#1F4FD8]/20"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Terms */}
            <div className="bg-[#F8FAFC] dark:bg-slate-900 rounded-lg p-4 flex items-start gap-3 border border-gray-200 dark:border-slate-800">
              <AlertCircle className="w-5 h-5 text-[#1F4FD8] flex-shrink-0 mt-0.5" />
              <div className="text-sm text-[#475569] dark:text-slate-400">
                <p className="mb-2">
                  By proceeding, you agree to RentIt's Terms of Service and
                  Privacy Policy.
                </p>
                {property.type === "house" && (
                  <p>
                    The security deposit of ₹
                    {securityDeposit.toLocaleString("en-IN")} is fully
                    refundable.
                  </p>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="w-full px-6 py-4 bg-[#1F4FD8] text-white rounded-xl hover:bg-[#1845b8] transition-all font-bold text-lg shadow-soft hover:shadow-xl hover:scale-[1.01]"
            >
              Pay ₹{totalAmount.toLocaleString("en-IN")} & Confirm Booking
            </button>
          </form>
        </div>

        {/* Price Summary - Sticky */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-slate-800 p-6 sticky top-24 shadow-soft">
            <h3 className="text-[#0F172A] dark:text-white mb-4 font-bold text-lg">
              Price Summary
            </h3>

            <div className="space-y-3 mb-4 pb-4 border-b border-gray-100 dark:border-slate-800">
              <div className="flex justify-between text-[#475569] dark:text-slate-400">
                <span>
                  Base {property.price.period === "month" ? "Rent" : "Price"}
                </span>
                <span>₹{baseAmount.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between text-[#475569] dark:text-slate-400">
                <span>Platform Fee (5%)</span>
                <span>₹{platformFee.toLocaleString("en-IN")}</span>
              </div>
              {property.type === "house" && (
                <div className="flex justify-between text-[#475569] dark:text-slate-400">
                  <span>Security Deposit</span>
                  <span>₹{securityDeposit.toLocaleString("en-IN")}</span>
                </div>
              )}
            </div>

            <div className="flex justify-between mb-4 text-lg font-bold">
              <span className="text-[#0F172A] dark:text-white">
                Total Amount
              </span>

              <span className="text-[#1F4FD8]">
                ₹{totalAmount.toLocaleString("en-IN")}
              </span>
            </div>

            {property.type === "house" && (
              <p className="text-[#94A3B8] text-sm">
                * Security deposit is fully refundable
              </p>
            )}

            <div className="mt-6 pt-6 border-t border-gray-100 dark:border-slate-800">
              <div className="flex items-start gap-2 text-sm text-[#1DBF73]">
                <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">Secure Payment</p>
                  <p className="text-[#94A3B8]">
                    Your payment is encrypted and secure
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
