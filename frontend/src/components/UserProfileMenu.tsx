"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import {
    User,
    LayoutDashboard,
    Settings,
    LogOut,
    ChevronDown,
    Building,
    Heart
} from "lucide-react";

export function UserProfileMenu() {
    const { user, logout } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    if (!user) return null;

    const initials = user.name
        ? user.name.split(" ").map((n) => n[0]).join("").substring(0, 2).toUpperCase()
        : "U";

    return (
        <div className="relative" ref={menuRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 p-1 pl-2 pr-3 rounded-full border border-slate-200 dark:border-slate-800 hover:shadow-md transition-all bg-white dark:bg-slate-950 group"
            >
                <div className="w-8 h-8 rounded-full bg-[#1F4FD8] text-white flex items-center justify-center text-sm font-semibold shadow-sm group-hover:bg-[#1845b8] transition-colors">
                    {initials}
                </div>
                <div className="hidden sm:flex flex-col items-start leading-none">
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 max-w-[100px] truncate">
                        {user.name?.split(' ')[0]}
                    </span>
                </div>
                <ChevronDown className={`w-4 h-4 text-slate-400 group-hover:text-slate-600 dark:text-slate-500 dark:group-hover:text-slate-300 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
            </button>

            {isOpen && (
                <div className="absolute right-0 top-full mt-3 w-72 bg-white dark:bg-[#0F172A] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl shadow-slate-200/50 dark:shadow-black/50 overflow-hidden animate-in fade-in slide-in-from-top-2 z-50">
                    {/* User Info Section */}
                    <div className="p-5 bg-slate-50/80 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 rounded-full bg-[#1F4FD8] text-white flex items-center justify-center text-lg font-bold">
                                {initials}
                            </div>
                            <div className="overflow-hidden">
                                <p className="text-sm font-bold text-slate-900 dark:text-white truncate">
                                    {user.name}
                                </p>
                                <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                                    {user.email}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="p-2 space-y-0.5">
                        <Link
                            href="/dashboard"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-3 px-4 py-3 text-[15px] font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white rounded-xl transition-all group"
                        >
                            <LayoutDashboard className="w-5 h-5 text-slate-400 group-hover:text-[#1F4FD8] transition-colors" />
                            Dashboard
                        </Link>
                        <Link
                            href="/dashboard/owner"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-3 px-4 py-3 text-[15px] font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white rounded-xl transition-all group"
                        >
                            <Building className="w-5 h-5 text-slate-400 group-hover:text-[#1F4FD8] transition-colors" />
                            Manage Properties
                        </Link>
                        <Link
                            href="/dashboard/user/saved"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-3 px-4 py-3 text-[15px] font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white rounded-xl transition-all group"
                        >
                            <Heart className="w-5 h-5 text-slate-400 group-hover:text-[#1F4FD8] transition-colors" />
                            Saved Rentals
                        </Link>
                        <Link
                            href="/profile"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-3 px-4 py-3 text-[15px] font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white rounded-xl transition-all group"
                        >
                            <User className="w-5 h-5 text-slate-400 group-hover:text-[#1F4FD8] transition-colors" />
                            Profile
                        </Link>
                    </div>

                    <div className="h-px bg-slate-200 dark:bg-slate-800 mx-4 my-1"></div>

                    <div className="p-2">
                        <button
                            onClick={() => {
                                logout();
                                setIsOpen(false);
                            }}
                            className="w-full flex items-center gap-3 px-4 py-3 text-[15px] font-medium text-red-600 dark:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-all group"
                        >
                            <LogOut className="w-5 h-5 group-hover:text-red-500 dark:group-hover:text-red-400" />
                            Sign Out
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
