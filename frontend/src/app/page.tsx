import {
  TrendingUp,
  Award,
  Sparkles,
  ArrowRight,
  CheckCircle,
  Car,
  Camera,
  Tent,
} from "lucide-react";
import { ModernSearchBar } from "@/components/ModernSearchBar";
import { PropertyCard } from "@/components/PropertyCard";
import { Testimonials } from "@/components/Testimonials";
import { TrustSection } from "@/components/TrustSection";
import { HowItWorks } from "@/components/HowItWorks";
import { api } from "@/lib/api";
import Link from "next/link";
import Image from "next/image";

export default async function Home() {
  const properties = await api.listings.getAll();
  const featuredProperties = properties.slice(0, 6);

  return (
    <div className="overflow-hidden min-h-screen">
      {/* Hero Section - Modern & Engaging */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white to-slate-100 dark:from-slate-950 dark:to-slate-950">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[520px] h-[520px] bg-slate-200/30 dark:bg-slate-800/20 rounded-full blur-[180px]" />
        </div>

        {/* Pattern Overlay */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          }}
        ></div>

        <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 backdrop-blur-sm  rounded-full text-slate-600 text-sm mb-8 animate-fadeInUp">
            Rent Anything, Anywhere
          </div>

          {/* Main Heading */}
          <h1
            className="text-slate-900 dark:text-white text-5xl md:text-6xl font-bold mb-6 max-w-4xl mx-auto animate-fadeInUp leading-tight"
            style={{ animationDelay: "0.1s" }}
          >
            From Homes to{" "}
            <span className="text-[#1F4FD8] dark:text-[#4A6FE8]">Bikes</span>
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#1F4FD8] to-[#1CB5E0]">
              & Everything in Between
            </span>
          </h1>

          <p
            className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-12 animate-fadeInUp"
            style={{ animationDelay: "0.2s" }}
          >
            Discover verified rentals for homes, hotels, vehicles, equipment,
            and event spaces. One platform for all your rental needs.
          </p>

          {/* Search Bar */}
          <div className="animate-fadeInUp" style={{ animationDelay: "0.3s" }}>
            <ModernSearchBar />
          </div>

          {/* Stats */}
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 max-w-6xl mx-auto animate-fadeInUp"
            style={{ animationDelay: "0.4s" }}
          >
            <div className="text-center">
              <div className="text-3xl md:text-4xl text-slate-900 dark:text-white mb-2 font-bold">
                15+
              </div>
              <div className="text-slate-600 dark:text-slate-400">
                Verified Properties
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl text-slate-900 dark:text-white mb-2 font-bold">
                01+
              </div>
              <div className="text-slate-600 dark:text-slate-400">
                Happy Customers
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl text-slate-900 dark:text-white mb-2 font-bold">
                05+
              </div>
              <div className="text-slate-600 dark:text-slate-400">
                Cities Covered
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl text-slate-900 dark:text-white mb-2 font-bold">
                1.0+
              </div>
              <div className="text-slate-600 dark:text-slate-400">
                Average Rating
              </div>
            </div>
          </div>
        </div>
      </section>
      <TrustSection />

      {/* Featured Categories */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="mb-4 text-3xl font-bold text-[#0F172A] dark:text-white">
            Explore Categories
          </h2>
          <p className="text-[#475569] dark:text-slate-400 text-lg">
            Find exactly what you need to rent today
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* House Rent Card */}
          <Link href="/search?category=house" className="group">
            <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 hover:shadow-large transition-all duration-500 h-[320px]">
              <div className="absolute inset-0">
                <Image
                  src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBob3VzZSUyMGV4dGVyaW9yfGVufDF8fHx8MTc2Njc0NTkyMnww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="House Rent"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-white mb-1 text-xl font-bold">
                  Residences
                </h3>
                <p className="text-gray-300 text-sm">Homes & Apartments</p>
              </div>
            </div>
          </Link>

          {/* Hotel Card */}
          <Link href="/search?category=hotel" className="group">
            <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 hover:shadow-large transition-all duration-500 h-[320px]">
              <div className="absolute inset-0">
                <Image
                  src="https://images.unsplash.com/photo-1578683010236-d716f9a3f461?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMHJvb218ZW58MXx8fHwxNzY2NzM5Mzc0fDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Hotels"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-white mb-1 text-xl font-bold">Stays</h3>
                <p className="text-gray-300 text-sm">Hotels & Resorts</p>
              </div>
            </div>
          </Link>

          {/* Vehicle Card */}
          <Link href="/search?category=vehicle" className="group">
            <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 hover:shadow-large transition-all duration-500 h-[320px]">
              <div className="absolute inset-0">
                <Image
                  src="https://images.unsplash.com/photo-1558981403-c5f9899a28bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw3Nzg4Nzd8MHwxfHNlYXJjaHw1fHxiaWtlfGVufDB8fHx8MTY4MTM3NjI4MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Vehicles"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-white mb-1 text-xl font-bold">Vehicles</h3>
                <p className="text-gray-300 text-sm">Bikes & Cars</p>
              </div>
            </div>
          </Link>

          {/* Equipment Card */}
          <Link href="/search?category=equipment" className="group">
            <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 hover:shadow-large transition-all duration-500 h-[320px]">
              <div className="absolute inset-0">
                <Image
                  src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxjYW1lcmF8ZW58MHx8fHwxNjgxMzc2MzE1&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Equipment"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-white mb-1 text-xl font-bold">Equipment</h3>
                <p className="text-gray-300 text-sm">Cameras & Tools</p>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Featured Properties */}
      <section className=" dark:from-slate-900 dark:to-slate-950 py-20">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="mb-2 text-3xl font-bold text-[#0F172A] dark:text-white">
                Featured Properties
              </h2>
              <p className="text-[#475569] dark:text-slate-400">
                Hand-picked properties just for you
              </p>
            </div>

            <Link
              href="/search"
              className="group flex items-center gap-2 px-6 py-3 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl hover:border-[#1F4FD8] dark:hover:border-[#4A6FE8] hover:text-[#1F4FD8] dark:hover:text-[#4A6FE8] dark:text-white transition-all"
            >
              View All
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map((property, index) => (
              <div
                key={property.id}
                className="animate-fadeInUp"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <PropertyCard property={property} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <HowItWorks />

      <Testimonials />

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden via-slate-50 to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        {/* Static ambient light */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
               w-[700px] h-[700px]
               bg-slate-200/30 dark:bg-slate-800/10
               rounded-full
               blur-[220px]"
          aria-hidden="true"
        />

        <div className="relative max-w-5xl mx-auto px-6 sm:px-8 text-center">
          {/* Heading */}
          <h2 className="text-slate-900 dark:text-white text-3xl md:text-4xl font-bold mb-4">
            Ready to find your next home?
          </h2>

          {/* Description */}
          <p className="text-slate-600 dark:text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10">
            RentIt is now your one-stop destination for renting homes, hotels,
            vehicles, equipment, and even event spaces across India.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/search">
              <button
                className="px-8 py-4 rounded-xl font-semibold
                     bg-slate-900 text-white
                     shadow-lg shadow-slate-900/20
                     hover:bg-slate-800
                     focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-400"
              >
                Start searching
              </button>
            </Link>

            <Link href="/auth">
              <button
                className="px-8 py-4 rounded-xl font-semibold
                     bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700
                     text-slate-900 dark:text-white
                     shadow-sm
                     hover:bg-slate-50 dark:hover:bg-slate-700
                     focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-300"
              >
                Create free account
              </button>
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-slate-600 dark:text-slate-400 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-500" />
              <span>No broker fees</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-500" />
              <span>Verified properties</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-500" />
              <span>Secure booking</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
