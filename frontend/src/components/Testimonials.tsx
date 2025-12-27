"use client";

import { Star } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Software Engineer",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    text: "Found my dream apartment in Bangalore within a week! The verification process gave me complete peace of mind.",
    rating: 5,
  },
  {
    name: "Rajesh Kumar",
    role: "Entrepreneur",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    text: "Transparent pricing and no hidden fees. RentIt made my relocation to Mumbai stress-free.",
    rating: 5,
  },
  {
    name: "Anita Desai",
    role: "Marketing Manager",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
    text: "Best platform for verified rentals. The support team was incredibly helpful throughout.",
    rating: 5,
  },
];

export function Testimonials() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  return (
    <section className="relative py-24 via-slate-50 to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 overflow-hidden">

      <div
        className="absolute top-0 left-1/2 -translate-x-1/2
            w-[600px] h-[600px]
            bg-slate-200/30 dark:bg-slate-800/20
            rounded-full
            blur-[200px]"
        aria-hidden="true"
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-14">
          <h2 className="text-slate-900 dark:text-white text-3xl md:text-4xl font-bold mb-3">
            What our customers say
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            Trusted by renters across India
          </p>
        </div>

        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/60 dark:shadow-black/40 p-8 md:p-12">

          <div className="flex flex-col md:flex-row gap-8 items-center">

            <Image
              src={testimonials[activeTestimonial].image}
              alt={testimonials[activeTestimonial].name}
              width={96}
              height={96}
              className="rounded-full object-cover border border-slate-200 dark:border-slate-800 shadow-sm"
            />


            <div className="flex-1 text-center md:text-left">

              <div className="flex gap-1 mb-4 justify-center md:justify-start">
                {[...Array(testimonials[activeTestimonial].rating)].map(
                  (_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-amber-400 text-amber-400"
                    />
                  ),
                )}
              </div>


              <p className="text-slate-700 dark:text-slate-200 text-lg md:text-xl mb-6 leading-relaxed">
                “{testimonials[activeTestimonial].text}”
              </p>


              <div>
                <div className="text-slate-900 dark:text-white font-semibold">
                  {testimonials[activeTestimonial].name}
                </div>
                <div className="text-slate-500 dark:text-slate-400 text-sm">
                  {testimonials[activeTestimonial].role}
                </div>
              </div>
            </div>
          </div>


          <div className="flex gap-2 justify-center mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveTestimonial(index)}
                aria-label={`Show testimonial ${index + 1}`}
                className={`h-2 rounded-full transition-[width] duration-200
              ${index === activeTestimonial ? "w-8 bg-slate-900 dark:bg-slate-50" : "w-2 bg-slate-300 dark:bg-slate-700"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
