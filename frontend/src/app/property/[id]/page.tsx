"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { Property } from "@/types";
import {
  MapPin,
  Star,
  CheckCircle,
  Wifi,
  Car,
  Dumbbell,
  Droplets,
  Shield,
  Zap,
  Home,
  User,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Heart,
  Share2,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function PropertyDetail() {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const fetchProperty = async () => {
      const found = await api.listings.getById(id);
      setProperty(found || null);
      setLoading(false);
    };
    fetchProperty();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-pulse">
        <div className="h-96 bg-gray-200 dark:bg-slate-800 rounded-xl mb-8"></div>
        <div className="h-8 bg-gray-200 dark:bg-slate-800 rounded w-2/3 mb-4"></div>
        <div className="h-6 bg-gray-200 dark:bg-slate-800 rounded w-1/2"></div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Property not found</h2>
        <Link
          href="/search"
          className="inline-block px-6 py-2 bg-[#1F4FD8] text-white rounded-lg hover:bg-[#1845b8] transition-colors"
        >
          Back to Search
        </Link>
      </div>
    );
  }

  const amenityIcons: { [key: string]: any } = {
    WiFi: Wifi,
    Parking: Car,
    Gym: Dumbbell,
    "Swimming Pool": Droplets,
    Security: Shield,
    "Power Backup": Zap,
    Helmet: Shield,
    Insurance: Shield,
    "Full Tank": Droplets,
    "Spare Battery": Zap,
    "Lens Clean": Star,
    Catering: Star,
    Decoration: Star,
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === property.images.length - 1 ? 0 : prev + 1,
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? property.images.length - 1 : prev - 1,
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-[#475569] dark:text-slate-400 hover:text-[#1F4FD8] dark:hover:text-[#4A6FE8] mb-6 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back</span>
      </button>

      {/* Image Gallery */}
      <div className="relative h-96 md:h-[500px] rounded-xl overflow-hidden mb-8 group bg-gray-100 dark:bg-slate-800">
        <Image
          src={property.images[currentImageIndex]}
          alt={property.title}
          fill
          className="object-cover"
        />

        {/* Image Navigation */}
        {property.images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-slate-800/90 hover:bg-white dark:hover:bg-slate-800 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
            >
              <ChevronLeft className="w-6 h-6 text-[#0F172A] dark:text-white" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-slate-800/90 hover:bg-white dark:hover:bg-slate-800 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
            >
              <ChevronRight className="w-6 h-6 text-[#0F172A] dark:text-white" />
            </button>

            {/* Image Indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {property.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentImageIndex ? "bg-white w-8" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          </>
        )}

        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex gap-2 z-10">
          <button
            onClick={() => setIsSaved(!isSaved)}
            className="bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700 p-3 rounded-full transition-colors shadow-sm"
          >
            <Heart
              className={`w-5 h-5 ${isSaved ? "fill-[#DC2626] text-[#DC2626]" : "text-[#475569] dark:text-slate-400"}`}
            />
          </button>
          <button className="bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700 p-3 rounded-full transition-colors shadow-sm">
            <Share2 className="w-5 h-5 text-[#475569] dark:text-slate-400" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Header */}
          <div>
            <div className="flex items-start justify-between gap-4 mb-3">
              <h1 className="flex-1 text-3xl font-bold text-[#0F172A] dark:text-white">
                {property.title}
              </h1>
              {property.verified && (
                <div className="flex items-center gap-1 bg-[#1DBF73] text-white px-3 py-1.5 rounded-lg font-medium shadow-sm">
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-sm">Verified</span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-4 text-[#475569] dark:text-slate-400">
              <div className="flex items-center gap-1">
                <MapPin className="w-5 h-5" />
                <span>
                  {property.location.area}, {property.location.city},{" "}
                  {property.location.state}
                </span>
              </div>
              {property.rating && (
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 fill-[#F59E0B] text-[#F59E0B]" />
                  <span>
                    {property.rating} ({property.reviews} reviews)
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Property Details - Conditional based on type */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-800 p-6 shadow-sm">
            <h3 className="text-[#0F172A] dark:text-white mb-4 font-bold text-lg">
              Details
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {property.bhk && (
                <div>
                  <p className="text-[#94A3B8] text-sm mb-1">BHK</p>
                  <p className="text-[#0F172A] dark:text-white font-semibold">
                    {property.bhk} BHK
                  </p>
                </div>
              )}

              {property.furnishing && (
                <div>
                  <p className="text-[#94A3B8] text-sm mb-1">Furnishing</p>
                  <p className="text-[#0F172A] dark:text-white font-semibold">
                    {property.furnishing}
                  </p>
                </div>
              )}
              {property.area && (
                <div>
                  <p className="text-[#94A3B8] text-sm mb-1">Area</p>
                  <p className="text-[#0F172A] dark:text-white font-semibold">
                    {property.area} sqft
                  </p>
                </div>
              )}

              {/* Generic Availability for all types */}
              <div>
                <p className="text-[#94A3B8] text-sm mb-1">Availability</p>
                <p className="text-[#1DBF73] font-semibold">
                  {property.available ? "Available" : "Not Available"}
                </p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-800 p-6 shadow-sm">
            <h3 className="text-[#0F172A] dark:text-white mb-4 font-bold text-lg">
              Description
            </h3>
            <p className="text-[#475569] dark:text-slate-400 leading-relaxed">
              {property.description}
            </p>
          </div>

          {/* Amenities */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-800 p-6 shadow-sm">
            <h3 className="text-[#0F172A] dark:text-white mb-4 font-bold text-lg">
              Amenities
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {property.amenities.map((amenity, index) => {
                const Icon = amenityIcons[amenity] || Home;
                return (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-[#475569] dark:text-slate-400"
                  >
                    <Icon className="w-5 h-5 text-[#1F4FD8] dark:text-[#4A6FE8]" />
                    <span>{amenity}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Rules */}
          {property.rules && property.rules.length > 0 && (
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-800 p-6 shadow-sm">
              <h3 className="text-[#0F172A] dark:text-white mb-4 font-bold text-lg">
                Property Rules
              </h3>
              <ul className="space-y-2">
                {property.rules.map((rule, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-[#475569] dark:text-slate-400"
                  >
                    <CheckCircle className="w-5 h-5 text-[#1DBF73] flex-shrink-0 mt-0.5" />
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Cancellation Policy */}
          {property.cancellationPolicy && (
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-800 p-6 shadow-sm">
              <h3 className="text-[#0F172A] dark:text-white mb-4 font-bold text-lg">
                Terms & Policy
              </h3>
              <p className="text-[#475569] dark:text-slate-400">
                {property.cancellationPolicy}
              </p>
            </div>
          )}

          {/* Host Details */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-800 p-6 shadow-sm">
            <h3 className="text-[#0F172A] dark:text-white mb-4 font-bold text-lg">
              Hosted By
            </h3>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-[#F8FAFC] dark:bg-slate-800 rounded-full flex items-center justify-center border border-gray-100 dark:border-slate-700">
                <User className="w-8 h-8 text-[#94A3B8] dark:text-slate-500" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-[#0F172A] dark:text-white font-bold">
                    {property.host.name}
                  </p>
                  {property.host.verified && (
                    <CheckCircle className="w-4 h-4 text-[#1DBF73]" />
                  )}
                </div>

                <p className="text-[#94A3B8] text-sm">
                  Member since{" "}
                  {new Date(property.host.joinedDate).getFullYear()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Booking Card - Sticky */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-800 p-6 sticky top-24 shadow-soft">
            <div className="mb-6">
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-[#1F4FD8] dark:text-[#4A6FE8] text-3xl font-bold">
                  ₹{property.price.amount.toLocaleString("en-IN")}
                </span>

                <span className="text-[#94A3B8]">
                  / {property.price.period === "month" ? "month" : "night"}
                </span>
              </div>
              {property.available ? (
                <p className="text-[#1DBF73] text-sm font-medium flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-[#1DBF73]"></div>
                  Available Now
                </p>
              ) : (
                <p className="text-[#DC2626] text-sm font-medium">
                  Not Available
                </p>
              )}
            </div>

            {property.type === "hotel" && (
              <div className="mb-6 space-y-3">
                <div>
                  <label className="block text-[#475569] dark:text-slate-300 text-sm mb-2 font-medium">
                    Check-in
                  </label>

                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94A3B8]" />
                    <input
                      type="date"
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-[#1F4FD8] focus:ring-1 focus:ring-[#1F4FD8]"
                      min={new Date().toISOString().split("T")[0]}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[#475569] dark:text-slate-300 text-sm mb-2 font-medium">
                    Check-out
                  </label>

                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94A3B8]" />
                    <input
                      type="date"
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-[#1F4FD8] focus:ring-1 focus:ring-[#1F4FD8]"
                      min={new Date().toISOString().split("T")[0]}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Date selection for other types like Vehicle/Equipment/Event */}
            {property.type !== "house" && property.type !== "hotel" && (
              <div className="mb-6 space-y-3">
                <div>
                  <label className="block text-[#475569] dark:text-slate-300 text-sm mb-2 font-medium">
                    Start Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94A3B8]" />
                    <input
                      type="date"
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-[#1F4FD8] focus:ring-1 focus:ring-[#1F4FD8] dark:bg-slate-950 dark:border-slate-800 dark:text-white"
                      min={new Date().toISOString().split("T")[0]}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[#475569] dark:text-slate-300 text-sm mb-2 font-medium">
                    End Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94A3B8]" />
                    <input
                      type="date"
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-[#1F4FD8] focus:ring-1 focus:ring-[#1F4FD8] dark:bg-slate-950 dark:border-slate-800 dark:text-white"
                      min={new Date().toISOString().split("T")[0]}
                    />
                  </div>
                </div>
              </div>
            )}

            <button
              onClick={() => router.push(`/booking/${property.id}`)}
              disabled={!property.available}
              className="w-full px-6 py-4 bg-[#1F4FD8] text-white rounded-xl hover:bg-[#1845b8] transition-all disabled:bg-[#E5E7EB] disabled:text-[#94A3B8] disabled:cursor-not-allowed mb-3 font-bold hover:shadow-lg hover:scale-[1.02]"
            >
              {property.available ? "Book Now" : "Not Available"}
            </button>

            <p className="text-[#94A3B8] text-sm text-center">
              You won't be charged yet
            </p>

            <div className="mt-6 pt-6 border-t border-gray-100 dark:border-slate-800 space-y-3">
              <h4 className="text-[#0F172A] dark:text-white font-semibold">
                Price Breakdown
              </h4>
              <div className="flex justify-between text-[#475569] dark:text-slate-400">
                <span>
                  Base {property.price.period === "month" ? "Rent" : "Price"}
                </span>
                <span>₹{property.price.amount.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between text-[#475569] dark:text-slate-400">
                <span>Platform Fee (5%)</span>
                <span>
                  ₹{(property.price.amount * 0.05).toLocaleString("en-IN")}
                </span>
              </div>
              {property.type === "house" && (
                <div className="flex justify-between text-[#475569] dark:text-slate-400">
                  <span>Security Deposit</span>
                  <span>
                    ₹{(property.price.amount * 2).toLocaleString("en-IN")}
                  </span>
                </div>
              )}
              <div className="pt-3 border-t border-gray-100 dark:border-slate-800 flex justify-between text-[#0F172A] dark:text-white font-bold text-lg">
                <span>Total</span>

                <span>
                  ₹
                  {(
                    property.price.amount +
                    property.price.amount * 0.05 +
                    (property.type === "house" ? property.price.amount * 2 : 0)
                  ).toLocaleString("en-IN")}
                </span>
              </div>
              {property.type === "house" && (
                <p className="text-[#94A3B8] text-xs">
                  * Security deposit is refundable
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
