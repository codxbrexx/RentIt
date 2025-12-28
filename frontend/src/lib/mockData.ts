import { Property, Booking, User } from "../types";

export const mockProperties: Property[] = [
  {
    id: "1",
    title: "3 BHK Spacious Apartment in Koramangala",
    type: "house",
    location: {
      city: "Bangalore",
      area: "Koramangala",
      state: "Karnataka",
      pincode: "560034",
    },
    price: {
      amount: 35000,
      period: "month",
    },
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
    ],
    bhk: 3,
    furnishing: "Fully Furnished",
    amenities: [
      "Parking",
      "Gym",
      "Swimming Pool",
      "WiFi",
      "Security",
      "Power Backup",
    ],
    verified: true,
    rating: 4.5,
    reviews: 28,
    available: true,
    description:
      "Beautiful 3 BHK apartment in the heart of Koramangala. Walking distance to restaurants, cafes, and metro station. Perfect for families and working professionals.",
    host: {
      name: "Rajesh Kumar",
      verified: true,
      joinedDate: "2022-03-15",
    },
    rules: [
      "No pets allowed",
      "No smoking inside premises",
      "Visitors allowed till 10 PM",
    ],
    cancellationPolicy:
      "Free cancellation up to 30 days before move-in. 50% refund if cancelled within 30 days.",
    area: 1450,
  },
  {
    id: "2",
    title: "2 BHK Modern Flat in Powai",
    type: "house",
    location: {
      city: "Mumbai",
      area: "Powai",
      state: "Maharashtra",
      pincode: "400076",
    },
    price: {
      amount: 42000,
      period: "month",
    },
    images: [
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800",
      "https://images.unsplash.com/photo-1556020685-ae41abfc9365?w=800",
    ],
    bhk: 2,
    furnishing: "Semi Furnished",
    amenities: ["Parking", "Lift", "Security", "Power Backup", "Clubhouse"],
    verified: true,
    rating: 4.3,
    reviews: 15,
    available: true,
    description:
      "Modern 2 BHK apartment with lake view. Close to IT parks and shopping centers.",
    host: {
      name: "Priya Sharma",
      verified: true,
      joinedDate: "2021-08-20",
    },
    rules: ["Family preferred", "No pets allowed"],
    cancellationPolicy: "Free cancellation up to 30 days before move-in.",
    area: 1100,
  },
  {
    id: "3",
    title: "Luxury Hotel Suite - Central Delhi",
    type: "hotel",
    location: {
      city: "New Delhi",
      area: "Connaught Place",
      state: "Delhi",
      pincode: "110001",
    },
    price: {
      amount: 4500,
      period: "night",
    },
    images: [
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800",
    ],
    amenities: [
      "Room Service",
      "WiFi",
      "AC",
      "TV",
      "Mini Bar",
      "Breakfast Included",
    ],
    verified: true,
    rating: 4.7,
    reviews: 142,
    available: true,
    description:
      "Premium hotel suite in the heart of Delhi. Perfect for business travelers and tourists.",
    host: {
      name: "Grand Stay Hotels",
      verified: true,
      joinedDate: "2020-01-10",
    },
    rules: ["Check-in: 2 PM", "Check-out: 11 AM", "ID proof required"],
    cancellationPolicy: "Free cancellation up to 24 hours before check-in.",
  },
  {
    id: "4",
    title: "Beach Resort Room - Goa",
    type: "hotel",
    location: {
      city: "Goa",
      area: "Calangute",
      state: "Goa",
      pincode: "403516",
    },
    price: {
      amount: 3200,
      period: "night",
    },
    images: [
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800",
    ],
    amenities: [
      "Beach Access",
      "Swimming Pool",
      "WiFi",
      "AC",
      "Restaurant",
      "Spa",
    ],
    verified: true,
    rating: 4.6,
    reviews: 89,
    available: true,
    description:
      "Beautiful beach resort with direct beach access. Perfect for vacation and relaxation.",
    host: {
      name: "Coastal Retreats",
      verified: true,
      joinedDate: "2019-11-05",
    },
    rules: [
      "Check-in: 1 PM",
      "Check-out: 10 AM",
      "Couples and families welcome",
    ],
    cancellationPolicy: "Free cancellation up to 48 hours before check-in.",
  },
  {
    id: "5",
    title: "1 BHK Studio in HSR Layout",
    type: "house",
    location: {
      city: "Bangalore",
      area: "HSR Layout",
      state: "Karnataka",
      pincode: "560102",
    },
    price: {
      amount: 18000,
      period: "month",
    },
    images: [
      "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800",
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800",
    ],
    bhk: 1,
    furnishing: "Fully Furnished",
    amenities: ["WiFi", "Power Backup", "Security", "Parking"],
    verified: true,
    rating: 4.2,
    reviews: 12,
    available: true,
    description:
      "Compact and cozy studio apartment perfect for working professionals.",
    host: {
      name: "Amit Patel",
      verified: true,
      joinedDate: "2023-02-10",
    },
    rules: ["Bachelor friendly", "No pets allowed"],
    cancellationPolicy: "Free cancellation up to 15 days before move-in.",
    area: 600,
  },
  {
    id: "6",
    title: "4 BHK Penthouse in Bandra",
    type: "house",
    location: {
      city: "Mumbai",
      area: "Bandra West",
      state: "Maharashtra",
      pincode: "400050",
    },
    price: {
      amount: 95000,
      period: "month",
    },
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
    ],
    bhk: 4,
    furnishing: "Fully Furnished",
    amenities: [
      "Parking",
      "Gym",
      "Swimming Pool",
      "WiFi",
      "Security",
      "Power Backup",
      "Terrace",
    ],
    verified: true,
    rating: 4.9,
    reviews: 34,
    available: true,
    description:
      "Luxurious penthouse with sea view. Premium amenities and prime location.",
    host: {
      name: "Luxury Homes Pvt Ltd",
      verified: true,
      joinedDate: "2020-06-15",
    },
    rules: ["Family only", "No pets allowed", "Minimum 11 months lease"],
    cancellationPolicy:
      "Free cancellation up to 45 days before move-in. 25% refund if cancelled within 45 days.",
    area: 2800,
  },

  {
    id: "8",
    title: "Canon EOS 5D Mark IV Kit",
    type: "equipment",
    location: {
      city: "Mumbai",
      area: "Andheri West",
      state: "Maharashtra",
      pincode: "400053",
    },
    price: {
      amount: 2500,
      period: "night", // daily
    },
    images: [
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800",
    ],
    amenities: ["Spare Battery", "64GB Card", "Lens Clean and Check"],
    verified: true,
    rating: 4.9,
    reviews: 67,
    available: true,
    description:
      "Professional DSLR kit with 24-70mm lens. In excellent condition.",
    host: {
      name: "Pro Camera Gear",
      verified: true,
      joinedDate: "2022-01-20",
    },
    rules: ["ID proof mandatory", "Handle with care"],
    cancellationPolicy: "50% charge if cancelled same day.",
  },
  {
    id: "9",
    title: "DJI Mavic 3 Cine Premium Combo",
    type: "equipment",
    location: {
      city: "Bangalore",
      area: "Koramangala",
      state: "Karnataka",
      pincode: "560034",
    },
    price: {
      amount: 4500,
      period: "night",
    },
    images: [
      "https://images.unsplash.com/photo-1579829366248-204fe8413f31?w=800",
    ],
    amenities: ["3 Batteries", "ND Filters", "RC Pro Controller"],
    verified: true,
    rating: 4.9,
    reviews: 12,
    available: true,
    description:
      "Professional drone for cinematic shots. Comes with all accessories.",
    host: {
      name: "Sky High Rentals",
      verified: true,
      joinedDate: "2023-01-15",
    },
    rules: ["Experienced pilots only", "Deposit: ₹5000"],
    cancellationPolicy: "Full refund 24h prior.",
  },
  {
    id: "10",
    title: "Conference Hall - 50 Seater",
    type: "event",
    location: {
      city: "Mumbai",
      area: "BKC",
      state: "Maharashtra",
      pincode: "400051",
    },
    price: {
      amount: 15000,
      period: "night", // effectively daily/session
    },
    images: [
      "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800",
    ],
    amenities: ["Projector", "Sound System", "Whiteboard", "AC", "WiFi"],
    verified: true,
    rating: 4.7,
    reviews: 8,
    available: true,
    description:
      "Modern conference hall perfect for corporate meetings and workshops.",
    host: {
      name: "Corporate Spaces",
      verified: true,
      joinedDate: "2022-06-01",
    },
    rules: ["No outside food", "Advance booking required"],
    cancellationPolicy: "50% charge if cancelled within 3 days.",
    area: 1200,
  },

  {
    id: "12",
    title: "Wedding Lawn with Banquet",
    type: "event",
    location: {
      city: "Delhi",
      area: "Chattarpur",
      state: "Delhi",
      pincode: "110074",
    },
    price: {
      amount: 150000,
      period: "night",
    },
    images: [
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800",
    ],
    amenities: ["Catering", "Decoration", "Valet Parking", "Bridal Room"],
    verified: true,
    rating: 4.6,
    reviews: 22,
    available: true,
    description:
      "Spacious lawn and banquet hall for grand weddings and events.",
    host: {
      name: "Grand Celebrations",
      verified: true,
      joinedDate: "2020-03-10",
    },
    rules: ["Music allowed till 10 PM", "External catering allowed"],
    cancellationPolicy: "No refund if cancelled within 15 days.",
    area: 15000,
  },
];

export const mockBookings: Booking[] = [
  {
    id: "B001",
    listingId: "1",
    renterId: "U001",
    hostId: "H001",
    startDate: "2025-02-01T00:00:00Z",
    endDate: "2025-08-01T00:00:00Z",
    subtotal: 210000,
    serviceFee: 10500,
    totalAmount: 245000,
    currency: "INR",
    status: "confirmed",
    message: "Looking forward to stay",
    createdAt: "2025-01-20T10:00:00Z",
    updatedAt: "2025-01-21T10:00:00Z",
    listing: mockProperties[0],
    host: {
      id: "H001",
      name: "Rajesh Kumar",
      email: "host@example.com",
      phone: "",
      verified: true,
      joinedDate: "2022-03-15"
    },
    renter: {
      id: "U001",
      name: "Ankit Verma",
      email: "ankit@example.com",
      phone: "",
      verified: true,
      joinedDate: "2024-01-01"
    }
  }
];

export const mockUser: User = {
  id: "U001",
  name: "Ankit Verma",
  email: "ankit.verma@example.com",
  phone: "+91 98765 43210",
  verified: true,
  joinedDate: "2024-01-15",
};
