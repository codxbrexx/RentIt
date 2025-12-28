"use client";

import { Shield, CheckCircle, CreditCard, HeadphonesIcon } from "lucide-react";

export function TrustSection() {
  const items = [
    {
      icon: CheckCircle,
      title: "100% Verified",
      desc: "Every listing verified",
      color: "from-[#1DBF73] to-[#22D47B]",
    },
    {
      icon: Shield,
      title: "Secure Payments",
      desc: "Bank-grade security",
      color: "from-[#1F4FD8] to-[#4A6FE8]",
    },
    {
      icon: CreditCard,
      title: "Zero Brokerage",
      desc: "No hidden charges",
      color: "from-[#F59E0B] to-[#FB923C]",
    },
    {
      icon: HeadphonesIcon,
      title: "24/7 Support",
      desc: "Always here for you",
      color: "from-[#8B5CF6] to-[#A78BFA]",
    },
  ];

  return (
    <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10 mb-24">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {items.map((item, index) => (
          <div
            key={index}
            className="group bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-soft hover:shadow-large hover:border-blue-100 hover:border-0.2 
            dark:hover:border-blue-200 border border-gray-100 dark:border-slate-800 transition-all duration-500"
          >
            <div
              className={`w-14 h-14 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center mb-4 transition-transform`}
            >
              <item.icon className="w-7 h-7 text-white" />
            </div>  
            <h4 className="text-[#0F172A] dark:text-white mb-2 font-bold">
              {item.title}
            </h4>
            <p className="text-[#94A3B8] dark:text-slate-400 text-sm">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
