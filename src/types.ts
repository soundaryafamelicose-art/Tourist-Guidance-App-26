export interface Guide {
  id: string;
  name: string;
  photo: string;
  experience: number; // in years
  languages: string[];
  rating: number;
  reviewsCount: number;
  pricePerDay: number;
  isAvailable: boolean;
  isVerified: boolean;
  governmentId?: string;
  licenseNumber?: string;
  certificates?: string[];
  areasCovered: string[];
  vehicleDetails?: string;
  status: "Online" | "Offline" | "In Tour";
}

export interface TourPackage {
  id: string;
  title: string;
  duration: string;
  price: number;
  highlights: string[];
  description: string;
}

export interface Destination {
  id: string;
  name: string;
  country: string;
  image: string;
  category: "Adventure" | "Beach" | "Mountain" | "Heritage" | "Nature" | "City";
  rating: number;
  description: string;
  season: string;
  tags: string[];
}

export interface Booking {
  id: string;
  guideId: string;
  guideName: string;
  guidePhoto: string;
  date: string;
  touristsCount: number;
  packageTitle: string;
  totalPrice: number;
  status: "Pending" | "Accepted" | "Rejected" | "Completed";
  customerName: string;
  customerEmail: string;
}

export interface Message {
  id: string;
  senderId: "customer" | "guide" | "ai";
  senderName: string;
  text?: string;
  timestamp: string;
  type: "text" | "voice" | "image" | "location";
  voiceDuration?: string;
  imageUrl?: string;
  location?: { lat: number; lng: number; address: string };
}

export interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
  category: string;
}

export interface JournalEntry {
  id: string;
  title: string;
  date: string;
  location: string;
  notes: string;
  photos: string[];
}

export interface TravelExpense {
  id: string;
  title: string;
  amount: number;
  category: "Food" | "Transport" | "Hotel" | "Sightseeing" | "Others";
  date: string;
}

export interface WeatherData {
  temp: number;
  condition: string;
  humidity: number;
  windSpeed: number;
}
