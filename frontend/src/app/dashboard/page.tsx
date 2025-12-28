"use client";

import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { Building, Heart, MessageSquare, TrendingUp } from "lucide-react";

export default function DashboardPage() {
    const { user } = useAuth();

    const StatCard = ({ icon: Icon, label, value, color }: { icon: any; label: string; value: string; color: string }) => (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center mb-4`}>
                <Icon className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-1">{value}</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">{label}</p>
        </div>
    );

    return (
        <div className="max-w-6xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                    Hello, {user?.name?.split(" ")[0] || "User"}! 👋
                </h1>
                <p className="text-slate-500 dark:text-slate-400">
                    Here's what's happening with your account today.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                <StatCard
                    icon={Building}
                    label="Active Listings"
                    value="02"
                    color="bg-blue-500"
                />
                <StatCard
                    icon={Heart}
                    label="Saved Homes"
                    value="12"
                    color="bg-rose-500"
                />
                <StatCard
                    icon={MessageSquare}
                    label="New Messages"
                    value="05"
                    color="bg-violet-500"
                />
                <StatCard
                    icon={TrendingUp}
                    label="Total Views"
                    value="1.2k"
                    color="bg-emerald-500"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Activity / Simplified */}
                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-bold text-slate-900 dark:text-white">Recent Activity</h2>
                        <Link href="#" className="text-sm text-[#1F4FD8] font-medium hover:underline">View All</Link>
                    </div>
                    <div className="space-y-4">
                        {[1, 2, 3].map((_, i) => (
                            <div key={i} className="flex items-center gap-4 p-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-xl transition-colors">
                                <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                                    <MessageSquare className="w-4 h-4 text-slate-500" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-slate-900 dark:text-white">
                                        New inquiry on <span className="font-bold">Modern Villa</span>
                                    </p>
                                    <p className="text-xs text-slate-500">2 hours ago</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Quick Actions</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <Link
                            href="/dashboard/owner/add-property"
                            className="flex flex-col items-center justify-center p-6 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-[#1F4FD8]/5 dark:hover:bg-[#1F4FD8]/10 border-2 border-dashed border-slate-200 dark:border-slate-700 hover:border-[#1F4FD8] dark:hover:border-[#1F4FD8] transition-all group"
                        >
                            <div className="w-10 h-10 rounded-full bg-[#1F4FD8]/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                <Building className="w-5 h-5 text-[#1F4FD8]" />
                            </div>
                            <span className="font-semibold text-slate-900 dark:text-white">List Property</span>
                        </Link>

                        <Link
                            href="/search"
                            className="flex flex-col items-center justify-center p-6 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-[#1F4FD8]/5 dark:hover:bg-[#1F4FD8]/10 border-2 border-dashed border-slate-200 dark:border-slate-700 hover:border-[#1F4FD8] dark:hover:border-[#1F4FD8] transition-all group"
                        >
                            <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                <Heart className="w-5 h-5 text-emerald-500" />
                            </div>
                            <span className="font-semibold text-slate-900 dark:text-white">Browse Homes</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
