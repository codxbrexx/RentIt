"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Building,
    Heart,
    MessageSquare,
    Settings,
    LogOut,
    PlusCircle,
    User as UserIcon,
    Calendar,
    Clock
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const { user, logout } = useAuth();

    const isActive = (path: string) => pathname === path || pathname?.startsWith(path + "/");

    const NavItem = ({ href, icon: Icon, label, exact = false }: { href: string; icon: any; label: string; exact?: boolean }) => {
        const active = exact ? pathname === href : isActive(href);
        return (
            <Link
                href={href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${active
                    ? "bg-[#1F4FD8] text-white shadow-md shadow-blue-500/20"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                    }`}
            >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{label}</span>
            </Link>
        );
    };

    return (
        <div className="min-h-screen pt-20 bg-slate-50 dark:bg-slate-950 flex">
            {/* Sidebar */}
            <aside className="w-64 fixed h-[calc(100vh-80px)] top-20 left-0 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 hidden lg:flex flex-col overflow-y-auto">
                <div className="p-6">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-12 h-12 rounded-full bg-[#1F4FD8]/10 flex items-center justify-center text-[#1F4FD8] font-bold text-lg">
                            {user?.name?.[0] || "U"}
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-900 dark:text-white truncate max-w-[140px]">
                                {user?.name || "User"}
                            </h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400 truncate max-w-[140px]">
                                {user?.email || ""}
                            </p>
                        </div>
                    </div>

                    <div className="space-y-1">
                        <p className="px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                            Overview
                        </p>
                        <NavItem href="/dashboard" icon={LayoutDashboard} label="Dashboard" exact />
                        <NavItem href="/profile" icon={UserIcon} label="Profile" />
                    </div>

                    <div className="mt-8 space-y-1">
                        <p className="px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                            Renting
                        </p>
                        <NavItem href="/dashboard/user/saved" icon={Heart} label="Saved Properties" />
                        <NavItem href="/dashboard/user/trips" icon={Calendar} label="My Trips" />
                        <NavItem href="/dashboard/user/chats" icon={MessageSquare} label="Messages" />
                    </div>

                    <div className="mt-8 space-y-1">
                        <p className="px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                            Hosting
                        </p>
                        <NavItem href="/dashboard/owner" icon={Building} label="My Properties" exact />
                        <NavItem href="/dashboard/owner/requests" icon={Clock} label="Requests" />
                        <NavItem href="/dashboard/owner/add-property" icon={PlusCircle} label="List New Property" />
                    </div>
                </div>

                <div className="mt-auto p-6 border-t border-slate-200 dark:border-slate-800">
                    <button
                        onClick={logout}
                        className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-red-50 dark:hover:bg-red-900/10 hover:text-red-600 transition-all w-full"
                    >
                        <LogOut className="w-5 h-5" />
                        <span className="font-medium">Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 lg:ml-64 p-4 sm:p-8 overflow-x-hidden">
                {children}
            </main>
        </div>
    );
}
