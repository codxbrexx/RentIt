export interface Property {
  id: string;
  title: string;
  type: "house" | "hotel" | "vehicle" | "equipment" | "event";
  location: {
    city: string;
    area: string;
    state: string;
    pincode: string;
  };
  price: {
    amount: number;
    period: "month" | "night";
  };
  images: string[];
  bhk?: number;
  furnishing?: "Fully Furnished" | "Semi Furnished" | "Unfurnished";
  amenities: string[];
  verified: boolean;
  rating?: number;
  reviews?: number;
  available: boolean;
  description: string;
  host: {
    name: string;
    verified: boolean;
    joinedDate: string;
  };
  rules?: string[];
  cancellationPolicy?: string;
  area?: number; // in sqft
}

export interface Booking {
  id: string;
  propertyId: string;
  propertyTitle: string;
  checkIn: string;
  checkOut: string;
  totalAmount: number;
  status: "upcoming" | "completed" | "cancelled";
  propertyImage: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  verified: boolean;
  joinedDate: string;
}
