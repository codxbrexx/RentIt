"use client";

import { useState } from "react";
import Link from "next/link";
import {
    Building,
    MapPin,
    Image as ImageIcon,
    FileText,
    CheckCircle,
    ChevronRight,
    ChevronLeft,
    Upload,
    X
} from "lucide-react";

export default function AddPropertyPage() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        type: "house",
        price: "",
        period: "month",

        // Location
        address: "",
        city: "",
        state: "",
        pincode: "",

        // Details
        bhk: "",
        furnishing: "Unfurnished",
        area: "",
        amenities: [] as string[],

        // Images
        images: [] as string[],

        // Rules & KYC
        rules: "",
        cancellationPolicy: "Flexible",
        aadhaarRequired: false
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        if (type === 'checkbox') {
            setFormData(prev => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const steps = [
        { number: 1, title: "Basic Details", icon: Building },
        { number: 2, title: "Location", icon: MapPin },
        { number: 3, title: "Photos", icon: ImageIcon },
        { number: 4, title: "Rules & KYC", icon: FileText },
    ];

    const handleNext = () => setStep(prev => Math.min(prev + 1, 4));
    const handleBack = () => setStep(prev => Math.max(prev - 1, 1));

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // API call would go here
        console.log("Submitting property:", formData);
        alert("Property listing created successfully! (Mock)");
        window.location.href = "/dashboard/owner";
    };

    return (
        <div className="max-w-4xl mx-auto pb-20">
            <div className="mb-8">
                <Link href="/dashboard/owner" className="text-sm text-slate-500 hover:text-slate-900 dark:hover:text-slate-300 mb-2 inline-flex items-center gap-1">
                    <ChevronLeft className="w-4 h-4" /> Back to Properties
                </Link>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                    List Your Property
                </h1>
                <p className="text-slate-500 dark:text-slate-400">
                    Fill in the details to publish your listing
                </p>
            </div>

            {/* Progress Steps */}
            <div className="mb-10">
                <div className="flex items-center justify-between relative">
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-200 dark:bg-slate-800 -z-10"></div>
                    {steps.map((s) => (
                        <div
                            key={s.number}
                            className={`flex flex-col items-center gap-2 bg-slate-50 dark:bg-slate-950 px-2 sm:px-4 ${step >= s.number ? "text-[#1F4FD8]" : "text-slate-400"
                                }`}
                        >
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${step >= s.number
                                    ? "bg-[#1F4FD8] border-[#1F4FD8] text-white"
                                    : "bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700"
                                }`}>
                                <s.icon className="w-5 h-5" />
                            </div>
                            <span className="text-xs font-semibold hidden sm:block">{s.title}</span>
                        </div>
                    ))}
                </div>
            </div>

            <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-sm">

                {/* Step 1: Basic Details */}
                {step === 1 && (
                    <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Basic Information</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Property Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    placeholder="e.g. Modern Apartment with Sea View"
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-[#1F4FD8]"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Category</label>
                                <select
                                    name="type"
                                    value={formData.type}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-[#1F4FD8]"
                                >
                                    <option value="house">House / Apartment</option>
                                    <option value="hotel">Hotel / Room</option>
                                    <option value="equipment">Equipment</option>
                                    <option value="event">Event Space</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Price (₹)</label>
                                <div className="flex gap-2">
                                    <input
                                        type="number"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleChange}
                                        placeholder="0"
                                        className="flex-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-[#1F4FD8]"
                                    />
                                    <select
                                        name="period"
                                        value={formData.period}
                                        onChange={handleChange}
                                        className="w-24 px-2 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-[#1F4FD8]"
                                    >
                                        <option value="month">/ mo</option>
                                        <option value="night">/ night</option>
                                        <option value="day">/ day</option>
                                    </select>
                                </div>
                            </div>

                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows={4}
                                    placeholder="Describe your property, key features, and surroundings..."
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-[#1F4FD8]"
                                />
                            </div>

                            {formData.type === 'house' && (
                                <>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">BHK</label>
                                        <select
                                            name="bhk"
                                            value={formData.bhk}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-[#1F4FD8]"
                                        >
                                            <option value="">Select BHK</option>
                                            <option value="1">1 RK</option>
                                            <option value="1">1 BHK</option>
                                            <option value="2">2 BHK</option>
                                            <option value="3">3 BHK</option>
                                            <option value="4">4+ BHK</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Furnishing</label>
                                        <select
                                            name="furnishing"
                                            value={formData.furnishing}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-[#1F4FD8]"
                                        >
                                            <option value="Unfurnished">Unfurnished</option>
                                            <option value="Semi Furnished">Semi Furnished</option>
                                            <option value="Fully Furnished">Fully Furnished</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Carpet Area (sqft)</label>
                                        <input
                                            type="number"
                                            name="area"
                                            value={formData.area}
                                            onChange={handleChange}
                                            placeholder="e.g. 1200"
                                            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-[#1F4FD8]"
                                        />
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                )}

                {/* Step 2: Location */}
                {step === 2 && (
                    <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Location Details</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Full Address</label>
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    placeholder="House No, Street, Landmark"
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-[#1F4FD8]"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">City</label>
                                <input
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    placeholder="e.g. Mumbai"
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-[#1F4FD8]"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">State</label>
                                <input
                                    type="text"
                                    name="state"
                                    value={formData.state}
                                    onChange={handleChange}
                                    placeholder="e.g. Maharashtra"
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-[#1F4FD8]"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Pincode</label>
                                <input
                                    type="text"
                                    name="pincode"
                                    value={formData.pincode}
                                    onChange={handleChange}
                                    placeholder="e.g. 400001"
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-[#1F4FD8]"
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 3: Photos */}
                {step === 3 && (
                    <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Property Photos</h2>
                        <p className="text-sm text-slate-500 mb-4">Upload at least 5 photos to make your listing attractive.</p>

                        <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-10 flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer group">
                            <div className="w-16 h-16 rounded-full bg-[#1F4FD8]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <Upload className="w-8 h-8 text-[#1F4FD8]" />
                            </div>
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Click to Upload</h3>
                            <p className="text-slate-500 text-sm">SVG, PNG, JPG or GIF (max. 5MB)</p>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
                            {/* Mock Uploaded Images */}
                            {[1, 2, 3].map(i => (
                                <div key={i} className="relative aspect-square rounded-xl overflow-hidden group">
                                    <img src={`https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&q=80`} className="w-full h-full object-cover" alt="Uploaded" />
                                    <button className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Step 4: Rules & KYC */}
                {step === 4 && (
                    <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Rules & Verification</h2>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">House Rules</label>
                                <textarea
                                    name="rules"
                                    value={formData.rules}
                                    onChange={handleChange}
                                    rows={4}
                                    placeholder="e.g. No smoking, No pets, Quiet hours after 10 PM..."
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-[#1F4FD8]"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Cancellation Policy</label>
                                <select
                                    name="cancellationPolicy"
                                    value={formData.cancellationPolicy}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-[#1F4FD8]"
                                >
                                    <option value="Flexible">Flexible (Full refund 1 day prior)</option>
                                    <option value="Moderate">Moderate (Full refund 5 days prior)</option>
                                    <option value="Strict">Strict (No refund)</option>
                                </select>
                            </div>

                            <div className="bg-blue-50 dark:bg-blue-900/10 p-4 rounded-xl border border-blue-100 dark:border-blue-800">
                                <label className="flex items-start gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        name="aadhaarRequired"
                                        checked={formData.aadhaarRequired}
                                        onChange={handleChange}
                                        className="mt-1 w-5 h-5 accent-[#1F4FD8]"
                                    />
                                    <div>
                                        <span className="block font-semibold text-slate-900 dark:text-white">Require Verified ID (Aadhaar/Passport)</span>
                                        <span className="text-sm text-slate-600 dark:text-slate-400">Tenants must upload a valid government ID before booking. Recommended for safety.</span>
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>
                )}

                <div className="flex items-center justify-between mt-10 pt-6 border-t border-slate-100 dark:border-slate-800">
                    {step > 1 ? (
                        <button
                            type="button"
                            onClick={handleBack}
                            className="px-6 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                        >
                            Back
                        </button>
                    ) : (
                        <div></div>
                    )}

                    {step < 4 ? (
                        <button
                            type="button"
                            onClick={handleNext}
                            className="flex items-center gap-2 px-8 py-3 bg-[#1F4FD8] text-white rounded-xl hover:bg-[#1845b8] font-semibold shadow-lg shadow-blue-900/20 transition-all active:scale-95"
                        >
                            Next Step
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    ) : (
                        <button
                            type="submit"
                            className="flex items-center gap-2 px-8 py-3 bg-[#1DBF73] text-white rounded-xl hover:bg-[#15965A] font-semibold shadow-lg shadow-green-900/20 transition-all active:scale-95"
                        >
                            <CheckCircle className="w-5 h-5" />
                            Publish Listing
                        </button>
                    )}
                </div>

            </form>
        </div>
    );
}
