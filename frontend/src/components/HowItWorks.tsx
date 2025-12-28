"use client";

import { MapPin, CheckCircle, Lock } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      step: "01",
      icon: MapPin,
      title: "Search & Discover",
      desc: "Browse verified properties in your preferred location with advanced filters",
      color: "from-[#1F4FD8] to-[#4A6FE8]",
    },
    {
      step: "02",
      icon: CheckCircle,
      title: "Visit & Verify",
      desc: "Schedule visits, check property details, and connect with verified owners",
      color: "from-[#1DBF73] to-[#22D47B]",
    },
    {
      step: "03",
      icon: Lock,
      title: "Book Securely",
      desc: "Make secure payments and complete your booking with full transparency",
      color: "from-[#F59E0B] to-[#FB923C]",
    },
  ];

  return (
    <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center mb-16">
        <h2 className="mb-4 text-3xl font-bold text-[#0F172A] dark:text-white">
          How Rentit Works
        </h2>
        <p className="text-[#475569] dark:text-slate-400 text-lg">
          Get started in 3 simple steps
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {steps.map((item, index) => (
          <div key={index} className="relative">
            {index < 2 && (
              <div className="hidden md:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-gray-300 to-transparent dark:from-slate-700 -z-10"></div>
            )}

            <div className="text-center group">
              <div
                className={`inline-flex w-20 h-20 bg-gradient-to-br ${item.color} rounded-2xl items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-medium`}
              >
                <item.icon className="w-10 h-10 text-white" />
              </div>
              <div
                className={`text-6xl font-bold bg-gradient-to-br ${item.color} bg-clip-text text-transparent mb-4 opacity-20`}
              >
                {item.step}
              </div>
              <h3 className="text-[#0F172A] dark:text-white mb-3 text-xl font-bold">
                {item.title}
              </h3>
              <p className="text-[#475569] dark:text-slate-400">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
