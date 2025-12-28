"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
    {
        category: "General",
        question: "What makes Rentit different from other platforms?",
        answer:
            "Rentit is your all-in-one rental solution. Unlike other niche platforms, we allow you to rent homes, hotels, cameras, and even event spaces all in one place, with a single trusted account.",
    },

    {
        category: "Bookings",
        question: "Is there a security deposit required?",
        answer:
            "For high-value items like camera gear, hosts may require a security deposit. This amount is blocked on your card (not charged) and released 24 hours after the item is returned in good condition.",
    },
    {
        category: "Hosting",
        question: "How quickly do I get paid as a host?",
        answer:
            "We believe in fast payouts. Once your renter checks in or picks up the item, we initiate the transfer. You typically receive the funds in your bank account within 24-48 hours.",
    },
    {
        category: "Support",
        question: "What if the item I rented is not as described?",
        answer:
            "We have a 'Rentit Guarantee'. If the item differs significantly from the listing, contact us within 2 hours of pickup/check-in. We will help you find a replacement or issue a full refund immediately.",
    },
];

export function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="py-24 relative overflow-hidden">

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl relative z-10">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full mb-6 shadow-sm">
                        <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Support</span>
                    </div>
                    <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
                        Frequently asked questions
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
                        Have questions? We're here to help. Find answers to common questions about key topics.
                    </p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className={`group rounded-2xl border transition-all duration-300 ${openIndex === index
                                ? "bg-white dark:bg-slate-900 border-gray-200 dark:border-[#4A6FE8] shadow-lg scale-[1.02]"
                                : "bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-800 hover:border-[#1F4FD8]/50 dark:hover:border-[#4A6FE8]/50"
                                }`}
                        >
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                            >
                                <div className="flex flex-col">
                                    <span className="text-xs font-semibold text-[#1F4FD8] dark:text-[#4A6FE8] mb-1 uppercase tracking-wider">
                                        {faq.category}
                                    </span>
                                    <span className={`text-lg font-bold transition-colors ${openIndex === index ? "text-[#1F4FD8] dark:text-[#4A6FE8]" : "text-slate-900 dark:text-white "
                                        }`}>
                                        {faq.question}
                                    </span>
                                </div>
                                <div className={`p-2 rounded-full transition-colors duration-300 ${openIndex === index ? "bg-[#1F4FD8]/10 text-[#1F4FD8]" : "bg-slate-100 dark:bg-slate-800 text-slate-500 group-hover:bg-[#1F4FD8]/10 group-hover:text-[#1F4FD8]"
                                    }`}>
                                    {openIndex === index ? (
                                        <Minus className="w-5 h-5" />
                                    ) : (
                                        <Plus className="w-5 h-5" />
                                    )}
                                </div>
                            </button>

                            <div
                                className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
                                    }`}
                            >
                                <div className="p-6 pt-0 text-slate-600 dark:text-slate-400 leading-relaxed border-t border-dashed border-slate-100 dark:border-slate-800 mt-2">
                                    <div className="pt-4">
                                        {faq.answer}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
