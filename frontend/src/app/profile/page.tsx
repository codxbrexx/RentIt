"use client";

import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { User as UserType, Booking } from "@/types";
import {
  User,
  MapPin,
  Calendar,
  CheckCircle,
  X,
  Heart,
  Bell,
  Settings,
  LogOut,
  Edit,
  Shield,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function Profile() {
  const [activeTab, setActiveTab] = useState<"bookings" | "saved" | "settings">(
    "bookings",
  );
  const router = useRouter();
  const [user, setUser] = useState<UserType | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userData, bookingsData] = await Promise.all([
          api.auth.getUserProfile(),
          api.bookings.getUserBookings(),
        ]);
        setUser(userData);
        setBookings(bookingsData);
      } catch (error) {
        console.error("Failed to fetch profile data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!user) return null;

  const upcomingBookings = bookings.filter((b) => b.status === "upcoming");
  const pastBookings = bookings.filter((b) => b.status === "completed");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Profile Header */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 p-6 mb-8 shadow-sm">
        <div className="flex items-start justify-between gap-6 flex-wrap">
          <div className="flex gap-6 items-center">
            {/* Avatar */}
            <div className="w-24 h-24 bg-gradient-to-br from-[#1F4FD8] to-[#1845b8] rounded-full flex items-center justify-center text-white flex-shrink-0 shadow-lg">
              <User className="w-12 h-12" />
            </div>

            {/* User Info */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h2 className="text-[#0F172A] dark:text-white text-2xl font-bold">
                  {user.name}
                </h2>
                {user.verified && (
                  <div className="flex items-center gap-1 bg-[#1DBF73] text-white px-2 py-1 rounded-lg text-xs font-semibold shadow-sm">
                    <CheckCircle className="w-3 h-3" />
                    Verified
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-1 text-[#475569] dark:text-slate-400">
              <p className="font-medium">{user.email}</p>
              <p>{user.phone}</p>
              <p className="text-[#94A3B8] text-sm">
                Member since{" "}
                {new Date(user.joinedDate).toLocaleDateString("en-IN", {
                  year: "numeric",
                  month: "long",
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 dark:border-slate-700 rounded-xl text-[#475569] dark:text-slate-400 hover:border-[#1F4FD8] dark:hover:border-[#4A6FE8] hover:text-[#1F4FD8] dark:hover:text-[#4A6FE8] transition-all hover:shadow-md bg-white dark:bg-slate-900">
          <Edit className="w-4 h-4" />
          Edit Profile
        </button>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 mb-8 shadow-sm overflow-hidden">
        <div className="border-b border-gray-100 dark:border-slate-800">
          <div className="flex gap-8 px-6 overflow-x-auto">
            <button
              onClick={() => setActiveTab("bookings")}
              className={`py-4 border-b-2 transition-all font-semibold whitespace-nowrap ${
                activeTab === "bookings"
                  ? "border-[#1F4FD8] dark:border-[#4A6FE8] text-[#1F4FD8] dark:text-[#4A6FE8]"
                  : "border-transparent text-[#475569] dark:text-slate-400 hover:text-[#1F4FD8] dark:hover:text-[#4A6FE8]"
              }`}
            >
              My Bookings
            </button>
            <button
              onClick={() => setActiveTab("saved")}
              className={`py-4 border-b-2 transition-all font-semibold whitespace-nowrap ${
                activeTab === "saved"
                  ? "border-[#1F4FD8] dark:border-[#4A6FE8] text-[#1F4FD8] dark:text-[#4A6FE8]"
                  : "border-transparent text-[#475569] dark:text-slate-400 hover:text-[#1F4FD8] dark:hover:text-[#4A6FE8]"
              }`}
            >
              Saved Properties
            </button>
            <button
              onClick={() => setActiveTab("settings")}
              className={`py-4 border-b-2 transition-all font-semibold whitespace-nowrap ${
                activeTab === "settings"
                  ? "border-[#1F4FD8] dark:border-[#4A6FE8] text-[#1F4FD8] dark:text-[#4A6FE8]"
                  : "border-transparent text-[#475569] dark:text-slate-400 hover:text-[#1F4FD8] dark:hover:text-[#4A6FE8]"
              }`}
            >
              Settings
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {/* Bookings Tab */}
          {activeTab === "bookings" && (
            <div className="space-y-8">
              {/* Upcoming Bookings */}
              {upcomingBookings.length > 0 && (
                <div>
                  <h3 className="text-[#0F172A] dark:text-white mb-4 font-bold text-lg">
                    Upcoming Bookings
                  </h3>
                  <div className="space-y-4">
                    {upcomingBookings.map((booking) => (
                      <div
                        key={booking.id}
                        className="border border-gray-200 dark:border-slate-800 rounded-xl p-4 hover:shadow-lg transition-all bg-white dark:bg-slate-900"
                      >
                        <div className="flex gap-4 flex-col sm:flex-row">
                          <img
                            src={booking.propertyImage}
                            alt={booking.propertyTitle}
                            className="w-full sm:w-32 h-32 object-cover rounded-xl"
                          />

                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h4 className="text-[#0F172A] dark:text-white mb-1 font-bold text-lg">
                                  {booking.propertyTitle}
                                </h4>
                                <div className="flex items-center gap-1 text-[#1DBF73] text-sm font-medium">
                                  <CheckCircle className="w-4 h-4" />

                                  <span>Confirmed</span>
                                </div>
                              </div>
                              <span className="text-[#1F4FD8] dark:text-[#4A6FE8] font-bold text-lg">
                                ₹{booking.totalAmount.toLocaleString("en-IN")}
                              </span>
                            </div>

                            <div className="space-y-1 text-[#475569] text-sm mb-4">
                              <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-[#94A3B8]" />
                                <span>
                                  {new Date(booking.checkIn).toLocaleDateString(
                                    "en-IN",
                                  )}{" "}
                                  -
                                  {new Date(
                                    booking.checkOut,
                                  ).toLocaleDateString("en-IN")}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="font-mono text-[#94A3B8] bg-gray-50 dark:bg-slate-800 px-2 py-0.5 rounded">
                                  ID: {booking.id}
                                </span>
                              </div>
                            </div>

                            <div className="flex gap-3">
                              <button className="px-4 py-2 bg-[#1F4FD8] dark:bg-[#4A6FE8] text-white rounded-lg hover:bg-[#1845b8] dark:hover:bg-[#345cce] transition-colors text-sm font-semibold shadow-sm">
                                View Details
                              </button>
                              <button className="px-4 py-2 border border-gray-200 dark:border-slate-700 rounded-lg text-[#475569] dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors text-sm font-semibold">
                                Contact Host
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Past Bookings */}
              {pastBookings.length > 0 && (
                <div>
                  <h3 className="text-[#0F172A] dark:text-white mb-4 font-bold text-lg">
                    Past Bookings
                  </h3>
                  <div className="space-y-4">
                    {pastBookings.map((booking) => (
                      <div
                        key={booking.id}
                        className="border border-gray-200 dark:border-slate-800 rounded-xl p-4 opacity-75 hover:opacity-100 transition-all bg-gray-50/50 dark:bg-slate-900/50"
                      >
                        <div className="flex gap-4 flex-col sm:flex-row">
                          <img
                            src={booking.propertyImage}
                            alt={booking.propertyTitle}
                            className="w-full sm:w-32 h-32 object-cover rounded-xl filter grayscale-[0.2]"
                          />

                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h4 className="text-[#0F172A] dark:text-white mb-1 font-bold text-lg">
                                  {booking.propertyTitle}
                                </h4>
                                <div className="flex items-center gap-1 text-[#94A3B8] text-sm font-medium">
                                  <CheckCircle className="w-4 h-4" />
                                  <span>Completed</span>
                                </div>
                              </div>
                            </div>

                            <div className="space-y-1 text-[#475569] text-sm mb-4">
                              <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-[#94A3B8]" />
                                <span>
                                  {new Date(booking.checkIn).toLocaleDateString(
                                    "en-IN",
                                  )}{" "}
                                  -
                                  {new Date(
                                    booking.checkOut,
                                  ).toLocaleDateString("en-IN")}
                                </span>
                              </div>
                            </div>

                            <button className="px-4 py-2 border border-gray-200 dark:border-slate-700 rounded-lg text-[#475569] dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800 transition-colors text-sm font-semibold hover:shadow-sm">
                              Write a Review
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {upcomingBookings.length === 0 && pastBookings.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-[#F8FAFC] dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-100 dark:border-slate-700">
                    <Calendar className="w-10 h-10 text-[#94A3B8]" />
                  </div>
                  <h3 className="text-[#0F172A] dark:text-white mb-2 font-bold text-lg">
                    No bookings yet
                  </h3>
                  <p className="text-[#475569] dark:text-slate-400 mb-6 max-w-sm mx-auto">
                    Start exploring verified properties to make your first
                    booking with us.
                  </p>
                  <button
                    onClick={() => router.push("/search")}
                    className="px-6 py-2.5 bg-[#1F4FD8] text-white rounded-xl hover:bg-[#1845b8] transition-colors font-bold shadow-soft hover:shadow-lg"
                  >
                    Browse Properties
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Saved Properties Tab */}
          {activeTab === "saved" && (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-[#F8FAFC] dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-100 dark:border-slate-700">
                <Heart className="w-10 h-10 text-[#94A3B8]" />
              </div>
              <h3 className="text-[#0F172A] dark:text-white mb-2 font-bold text-lg">
                No saved properties
              </h3>
              <p className="text-[#475569] dark:text-slate-400 mb-6 max-w-sm mx-auto">
                Save properties you like by clicking the heart icon while
                growing through listings.
              </p>

              <button
                onClick={() => router.push("/search")}
                className="px-6 py-2.5 bg-[#1F4FD8] text-white rounded-xl hover:bg-[#1845b8] transition-colors font-bold shadow-soft hover:shadow-lg"
              >
                Browse Properties
              </button>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === "settings" && (
            <div className="space-y-6 max-w-2xl mx-auto">
              {/* Account Settings */}
              <div>
                <h3 className="text-[#0F172A] dark:text-white mb-4 font-bold text-lg">
                  Account Settings
                </h3>
                <div className="space-y-3">
                  <button className="w-full flex items-center justify-between p-4 border border-gray-200 dark:border-slate-700 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors bg-white dark:bg-slate-900 group">
                    <div className="flex items-center gap-3">
                      <div className="bg-[#1F4FD8]/10 p-2 rounded-lg group-hover:bg-[#1F4FD8]/20 transition-colors">
                        <Shield className="w-5 h-5 text-[#1F4FD8]" />
                      </div>
                      <div className="text-left">
                        <p className="text-[#0F172A] dark:text-white font-medium">
                          Verify Identity
                        </p>
                        <p className="text-[#94A3B8] text-sm">
                          Add ID proof for verification
                        </p>
                      </div>
                    </div>
                    <div className="text-[#1DBF73] text-sm font-semibold bg-[#1DBF73]/10 px-2 py-1 rounded">
                      Verified
                    </div>
                  </button>

                  <button className="w-full flex items-center justify-between p-4 border border-gray-200 dark:border-slate-700 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors bg-white dark:bg-slate-900 group">
                    <div className="flex items-center gap-3">
                      <div className="bg-[#1F4FD8]/10 p-2 rounded-lg group-hover:bg-[#1F4FD8]/20 transition-colors">
                        <Bell className="w-5 h-5 text-[#1F4FD8]" />
                      </div>
                      <div className="text-left">
                        <p className="text-[#0F172A] dark:text-white font-medium">
                          Notifications
                        </p>
                        <p className="text-[#94A3B8] text-sm">
                          Manage notification preferences
                        </p>
                      </div>
                    </div>
                  </button>

                  <button className="w-full flex items-center justify-between p-4 border border-gray-200 dark:border-slate-700 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors bg-white dark:bg-slate-900 group">
                    <div className="flex items-center gap-3">
                      <div className="bg-[#1F4FD8]/10 p-2 rounded-lg group-hover:bg-[#1F4FD8]/20 transition-colors">
                        <Settings className="w-5 h-5 text-[#1F4FD8]" />
                      </div>
                      <div className="text-left">
                        <p className="text-[#0F172A] dark:text-white font-medium">
                          Privacy Settings
                        </p>
                        <p className="text-[#94A3B8] text-sm">
                          Control your privacy and data
                        </p>
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Danger Zone */}
              <div>
                <h3 className="text-[#0F172A] dark:text-white mb-4 font-bold text-lg">
                  Account Actions
                </h3>
                <div className="space-y-3">
                  <button
                    onClick={() => router.push("/auth")}
                    className="w-full flex items-center justify-between p-4 border border-gray-200 dark:border-slate-700 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors bg-white dark:bg-slate-900 group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-gray-100 dark:bg-slate-800 p-2 rounded-lg group-hover:bg-gray-200 dark:group-hover:bg-slate-700 transition-colors">
                        <LogOut className="w-5 h-5 text-[#475569] dark:text-slate-400" />
                      </div>
                      <p className="text-[#0F172A] dark:text-white font-medium">
                        Logout
                      </p>
                    </div>
                  </button>

                  <button className="w-full flex items-center justify-between p-4 border border-[#DC2626]/20 rounded-xl hover:bg-[#DC2626]/5 transition-colors bg-white dark:bg-slate-900 group">
                    <div className="flex items-center gap-3">
                      <div className="bg-[#DC2626]/10 p-2 rounded-lg group-hover:bg-[#DC2626]/20 transition-colors">
                        <X className="w-5 h-5 text-[#DC2626]" />
                      </div>
                      <p className="text-[#DC2626] font-medium">
                        Delete Account
                      </p>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
