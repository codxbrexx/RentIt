"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Home as HomeIcon, Shield, Lock, Mail, Phone } from "lucide-react";
import Link from "next/link";
import { GoogleSignIn } from "@/components/auth/GoogleSignIn";
import { api } from "@/lib/api";

export default function Auth() {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [loginMethod, setLoginMethod] = useState<"email" | "phone">("phone");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const form = e.target as HTMLFormElement;
      const inputs = form.querySelectorAll('input');

      if (mode === 'login') {
        const email = inputs[0].value;
        const password = inputs[1].value;
        await api.auth.login({ email, password });
      } else {
        // Signup
        const firstName = inputs[0].value.split(' ')[0] || 'User';
        const lastName = inputs[0].value.split(' ')[1] || '';
        const email = inputs[1].value;
        const phone = inputs[2].value;
        const password = inputs[3].value;

        await api.auth.register({ email, password, firstName, lastName, phone });
      }

      // Redirect on success
      router.push("/profile");
    } catch (error) {
      console.error("Auth Error:", error);
      alert(error instanceof Error ? error.message : "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <h2 className="text-[#0F172A] dark:text-white mb-2 text-xl font-bold">
            {mode === "login" ? "Welcome Back" : "Create Account"}
          </h2>
          <p className="text-[#475569] dark:text-slate-400">
            {mode === "login"
              ? "Login to manage your bookings"
              : "Sign up to start renting"}
          </p>
        </div>

        {/* Auth Card */}
        <div className="bg-white dark:bg-slate-900 rounded-lg border border-[#E5E7EB] dark:border-slate-800 p-6 md:p-8 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Login/Signup Toggle */}
            <div className="flex gap-2 p-1 bg-[#F8FAFC] dark:bg-slate-950 rounded-lg">
              <button
                type="button"
                onClick={() => setMode("login")}
                className={`flex-1 py-2 rounded-lg transition-all font-medium ${mode === "login"
                  ? "bg-white dark:bg-slate-800 text-[#1F4FD8] dark:text-white shadow-sm"
                  : "text-[#475569] dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-300"
                  }`}
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => setMode("signup")}
                className={`flex-1 py-2 rounded-lg transition-all font-medium ${mode === "signup"
                  ? "bg-white dark:bg-slate-800 text-[#1F4FD8] dark:text-white shadow-sm"
                  : "text-[#475569] dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-300"
                  }`}
              >
                Sign Up
              </button>
            </div>

            {/* Google Sign In */}
            <GoogleSignIn />

            {/* Login Method (for login only) */}
            {mode === "login" && (
              <div className="flex gap-2 p-1 bg-[#F8FAFC] dark:bg-slate-950 rounded-lg">
                <button
                  type="button"
                  onClick={() => setLoginMethod("phone")}
                  className={`flex-1 py-2 rounded-lg transition-all flex items-center justify-center gap-2 font-medium ${loginMethod === "phone"
                    ? "bg-white dark:bg-slate-800 text-[#1F4FD8] dark:text-white shadow-sm"
                    : "text-[#475569] dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-300"
                    }`}
                >
                  <Phone className="w-4 h-4" />
                  Phone
                </button>
                <button
                  type="button"
                  onClick={() => setLoginMethod("email")}
                  className={`flex-1 py-2 rounded-lg transition-all flex items-center justify-center gap-2 font-medium ${loginMethod === "email"
                    ? "bg-white dark:bg-slate-800 text-[#1F4FD8] dark:text-white shadow-sm"
                    : "text-[#475569] dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-300"
                    }`}
                >
                  <Mail className="w-4 h-4" />
                  Email
                </button>
              </div>
            )}

            {/* Signup Form */}
            {mode === "signup" && (
              <>
                <div>
                  <label className="block text-[#475569] dark:text-slate-300 mb-2 text-sm font-medium">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 border border-[#E5E7EB] dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:border-[#1F4FD8] dark:focus:border-[#4A6FE8] focus:ring-2 focus:ring-[#1F4FD8]/20 transition-all placeholder:text-slate-400"
                  />
                </div>

                <div>
                  <label className="block text-[#475569] dark:text-slate-300 mb-2 text-sm font-medium">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="your.email@example.com"
                    className="w-full px-4 py-3 border border-[#E5E7EB] dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:border-[#1F4FD8] dark:focus:border-[#4A6FE8] focus:ring-2 focus:ring-[#1F4FD8]/20 transition-all placeholder:text-slate-400"
                  />
                </div>

                <div>
                  <label className="block text-[#475569] dark:text-slate-300 mb-2 text-sm font-medium">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-3 border border-[#E5E7EB] dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:border-[#1F4FD8] dark:focus:border-[#4A6FE8] focus:ring-2 focus:ring-[#1F4FD8]/20 transition-all placeholder:text-slate-400"
                  />
                </div>

                <div>
                  <label className="block text-[#475569] dark:text-slate-300 mb-2 text-sm font-medium">
                    Create Password *
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="Minimum 8 characters"
                    className="w-full px-4 py-3 border border-[#E5E7EB] dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:border-[#1F4FD8] dark:focus:border-[#4A6FE8] focus:ring-2 focus:ring-[#1F4FD8]/20 transition-all placeholder:text-slate-400"
                  />
                </div>
              </>
            )}

            {/* Login Form */}
            {mode === "login" && (
              <>
                {loginMethod === "phone" ? (
                  <div>
                    <label className="block text-[#475569] dark:text-slate-300 mb-2 text-sm font-medium">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-3 border border-[#E5E7EB] dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:border-[#1F4FD8] dark:focus:border-[#4A6FE8] focus:ring-2 focus:ring-[#1F4FD8]/20 transition-all placeholder:text-slate-400"
                    />
                  </div>
                ) : (
                  <div>
                    <label className="block text-[#475569] dark:text-slate-300 mb-2 text-sm font-medium">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="your.email@example.com"
                      className="w-full px-4 py-3 border border-[#E5E7EB] dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:border-[#1F4FD8] dark:focus:border-[#4A6FE8] focus:ring-2 focus:ring-[#1F4FD8]/20 transition-all placeholder:text-slate-400"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-[#475569] dark:text-slate-300 mb-2 text-sm font-medium">
                    {loginMethod === "phone"
                      ? "OTP will be sent"
                      : "Password *"}
                  </label>

                  {loginMethod === "email" ? (
                    <input
                      type="password"
                      required
                      placeholder="Enter your password"
                      className="w-full px-4 py-3 border border-[#E5E7EB] dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:border-[#1F4FD8] dark:focus:border-[#4A6FE8] focus:ring-2 focus:ring-[#1F4FD8]/20 transition-all placeholder:text-slate-400"
                    />
                  ) : (
                    <p className="text-[#94A3B8] text-sm">
                      You'll receive a 6-digit OTP on your registered phone
                      number
                    </p>
                  )}
                </div>

                {loginMethod === "email" && (
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        className="w-4 h-4 accent-[#1F4FD8] dark:accent-[#4A6FE8]"
                      />
                      <span className="text-[#475569] dark:text-slate-400 text-sm">
                        Remember me
                      </span>
                    </label>

                    <a
                      href="#"
                      className="text-[#1F4FD8] dark:text-[#4A6FE8] text-sm hover:underline"
                    >
                      Forgot Password?
                    </a>
                  </div>
                )}
              </>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 bg-[#1F4FD8] text-white rounded-lg hover:bg-[#1845b8] transition-colors disabled:bg-[#94A3B8] disabled:cursor-not-allowed flex items-center justify-center gap-2 font-medium"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Processing...
                </>
              ) : (
                <>
                  {mode === "login"
                    ? loginMethod === "phone"
                      ? "Send OTP"
                      : "Login"
                    : "Create Account"}
                </>
              )}
            </button>

            {/* Terms for signup */}
            {mode === "signup" && (
              <p className="text-[#94A3B8] text-sm text-center">
                By signing up, you agree to our{" "}
                <Link
                  href="/terms"
                  className="text-[#1F4FD8] dark:text-[#4A6FE8] hover:underline"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="text-[#1F4FD8] dark:text-[#4A6FE8] hover:underline"
                >
                  Privacy Policy
                </Link>
              </p>
            )}
          </form>
        </div>

        {/* Trust Indicators */}
        <div className="mt-8 grid grid-cols-2 gap-4 text-center">
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 bg-[#1DBF73]/10 rounded-full flex items-center justify-center">
              <Shield className="w-6 h-6 text-[#1DBF73]" />
            </div>
            <p className="text-[#475569] dark:text-slate-400 text-sm font-medium">
              Data Protected
            </p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 bg-[#1F4FD8]/10 dark:bg-[#1F4FD8]/20 rounded-full flex items-center justify-center">
              <Lock className="w-6 h-6 text-[#1F4FD8] dark:text-[#4A6FE8]" />
            </div>
            <p className="text-[#475569] dark:text-slate-400 text-sm font-medium">
              Secure Login
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
