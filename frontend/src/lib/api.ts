import { Property } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";


const getAuthHeaders = () => {
  if (typeof window === "undefined") return {};
  const token = localStorage.getItem("accessToken");
  return token ? { Authorization: `Bearer ${token}` } : {};
};


async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const headers = {
    ...(options.headers as Record<string, string>),
    ...getAuthHeaders(),
  } as HeadersInit;

  const res = await fetch(`${API_URL}${url}`, {
    ...options,
    headers,
  });

  if (res.status === 401) {

    if (typeof window !== "undefined") {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    }
  }

  return res;
}

export const api = {
  listings: {
    getAll: async (params?: {
      category?: string;
      city?: string;
      [key: string]: any;
    }): Promise<Property[]> => {
      const query = params
        ? "?" + new URLSearchParams(params).toString()
        : "";

      const res = await fetch(`${API_URL}/listings${query}`, {
        cache: "no-store",
      });

      if (!res.ok) throw new Error("Failed to fetch listings");

      const data = await res.json();


      let listings: any[] = [];
      if (data.listings && Array.isArray(data.listings)) {
        listings = data.listings;
      } else if (Array.isArray(data)) {
        listings = data;
      }

      const parseAmenities = (amenities: any) => {
        if (Array.isArray(amenities)) return amenities;
        if (typeof amenities === 'string') {
          try {
            const parsed = JSON.parse(amenities);
            return Array.isArray(parsed) ? parsed : [];
          } catch (e) {
            return [];
          }
        }
        return [];
      };

      return listings.map((item: any) => ({
        ...item,
        images: item.images ? item.images.map((img: any) => img.url || img) : [],
        amenities: parseAmenities(item.amenities),
        price: item.price || {
          amount: item.basePrice || 0,
          period: item.priceUnit === 'month' ? 'month' : 'night'
        },
        location: item.location || {
          city: item.city || 'Unknown',
          area: item.area || 'Unknown',
          state: item.state || 'Unknown',
          pincode: item.pincode || ''
        }
      }));
    },
    getById: async (id: string): Promise<Property | undefined> => {
      const res = await fetch(`${API_URL}/listings/${id}`, {
        cache: "no-store",
      });

      if (!res.ok) throw new Error("Failed to fetch listing");

      const item = await res.json();

      const parseAmenities = (amenities: any) => {
        if (Array.isArray(amenities)) return amenities;
        if (typeof amenities === 'string') {
          try {
            const parsed = JSON.parse(amenities);
            return Array.isArray(parsed) ? parsed : [];
          } catch (e) {
            return [];
          }
        }
        return [];
      };

      return {
        ...item,
        images: item.images ? item.images.map((img: any) => img.url || img) : [],
        amenities: parseAmenities(item.amenities),
        price: item.price || {
          amount: item.basePrice || 0,
          period: item.priceUnit === 'month' ? 'month' : 'night'
        },
        location: item.location || {
          city: item.city || 'Unknown',
          area: item.area || 'Unknown',
          state: item.state || 'Unknown',
          pincode: item.pincode || ''
        }
      };
    },
  },
  bookings: {
    getUserBookings: async (): Promise<import("@/types").Booking[]> => {
      const res = await fetchWithAuth("/bookings/my-bookings");
      if (!res.ok) throw new Error("Failed to fetch bookings");
      return await res.json();
    },
    create: async (data: any): Promise<{ id: string; status: string }> => {
      const res = await fetchWithAuth("/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to create booking");
      return await res.json();
    },
  },
  auth: {
    login: async (credentials: any) => {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Login failed");
      }

      const data = await res.json();
      if (typeof window !== "undefined") {
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        localStorage.setItem("user", JSON.stringify(data.user));
      }
      return data;
    },
    register: async (credentials: any) => {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Registration failed");
      }

      const data = await res.json();
      if (typeof window !== "undefined") {
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        localStorage.setItem("user", JSON.stringify(data.user));
      }
      return data;
    },
    getUserProfile: async (): Promise<import("@/types").User> => {
      const res = await fetchWithAuth("/users/profile");
      if (!res.ok) throw new Error("Failed to fetch profile");
      return await res.json();
    },
    logout: () => {
      if (typeof window !== "undefined") {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");
      }
    }
  },
  bookings: {
    getUserBookings: async (): Promise<import("@/types").Booking[]> => {
      const res = await fetchWithAuth("/bookings/my-bookings");
      if (!res.ok) throw new Error("Failed to fetch bookings");
      return await res.json();
    },
    getHostBookings: async (): Promise<import("@/types").Booking[]> => {
      const res = await fetchWithAuth("/bookings/host-bookings");
      if (!res.ok) throw new Error("Failed to fetch host bookings");
      return await res.json();
    },
    getById: async (id: string) => {
      const res = await fetchWithAuth(`/bookings/${id}`);
      if (!res.ok) throw new Error("Failed to fetch booking");
      return await res.json();
    },
    create: async (data: any): Promise<{ id: string; status: string }> => {
      const res = await fetchWithAuth("/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to create booking");
      return await res.json();
    },
    updateStatus: async (id: string, status: string, reason?: string) => {
      const res = await fetchWithAuth(`/bookings/${id}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, reason }),
      });
      if (!res.ok) throw new Error("Failed to update status");
      return res.json();
    },
    getBookedDates: async (listingId: string) => {
      const res = await fetchWithAuth(`/bookings/listing/${listingId}/dates`);
      if (!res.ok) return [];
      return res.json();
    }
  }
};
