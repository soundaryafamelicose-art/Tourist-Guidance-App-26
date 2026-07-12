import { Destination, Guide, TourPackage } from "./types";

export const LANGUAGES = [
  { code: "en", name: "English", nativeName: "English", flag: "🇺🇸" },
  { code: "ta", name: "Tamil", nativeName: "தமிழ்", flag: "🇮🇳" },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी", flag: "🇮🇳" },
  { code: "ml", name: "Malayalam", nativeName: "മലയാളം", flag: "🇮🇳" },
  { code: "kn", name: "Kannada", nativeName: "ಕನ್ನಡ", flag: "🇮🇳" },
  { code: "te", name: "Telugu", nativeName: "తెలుగు", flag: "🇮🇳" },
  { code: "es", name: "Spanish", nativeName: "Español", flag: "🇪🇸" },
  { code: "fr", name: "French", nativeName: "Français", flag: "🇫🇷" },
  { code: "ja", name: "Japanese", nativeName: "日本語", flag: "🇯🇵" },
];

export const MOCK_DESTINATIONS: Destination[] = [
  {
    id: "dest_1",
    name: "Taj Mahal, Agra",
    country: "India",
    image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=600&q=80",
    category: "Heritage",
    rating: 4.9,
    description: "An immense mausoleum of white marble, built in Agra between 1631 and 1648 by order of the Mughal emperor Shah Jahan in memory of his favorite wife.",
    season: "Winter (Oct to Mar)",
    tags: ["Historical", "Architecture", "Wonders of the World"],
  },
  {
    id: "dest_2",
    name: "Ubud Rainforest, Bali",
    country: "Indonesia",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80",
    category: "Nature",
    rating: 4.8,
    description: "Nestled among green terraced rice paddies, Ubud offers tropical landscapes, iconic temples, and rich traditional arts and dance centers.",
    season: "Dry Season (May to Sep)",
    tags: ["Culture", "Wellness", "Lush Landscapes"],
  },
  {
    id: "dest_3",
    name: "Swiss Alps, Zermatt",
    country: "Switzerland",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80",
    category: "Mountain",
    rating: 4.9,
    description: "Breathtaking snow-capped peaks surrounding the iconic pyramid-shaped Matterhorn, offering word-class skiing, hiking, and alpine views.",
    season: "Winter/Summer (Dec-Feb, Jul-Aug)",
    tags: ["Adventure", "Snow Sports", "Scenic Trains"],
  },
  {
    id: "dest_4",
    name: "Kyoto Heritage Temples",
    country: "Japan",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=600&q=80",
    category: "Heritage",
    rating: 4.7,
    description: "Experience classic wooden temples, serene Zen rock gardens, beautiful Shinto shrines, and imperial palaces amidst seasonal cherry blossoms.",
    season: "Spring/Autumn (Apr-May, Oct-Nov)",
    tags: ["Culture", "Gardens", "Cherry Blossom"],
  },
  {
    id: "dest_5",
    name: "Grand Canyon National Park",
    country: "USA",
    image: "https://images.unsplash.com/photo-1615551043360-33de8b5f410c?auto=format&fit=crop&w=600&q=80",
    category: "Adventure",
    rating: 4.8,
    description: "A powerful and inspiring landscape. The Grand Canyon overwhelms our senses through its immense size and geologic color spectrum.",
    season: "Spring/Fall (Mar-May, Sep-Nov)",
    tags: ["Hiking", "Camping", "Helicopter Tours"],
  },
  {
    id: "dest_6",
    name: "Maldives Coral Beaches",
    country: "Maldives",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=600&q=80",
    category: "Beach",
    rating: 4.9,
    description: "Immaculate overwater villas, vibrant marine reefs, coral sand atolls, and breathtaking clear turquoise waters in a tropical paradise.",
    season: "Dry Season (Nov to Apr)",
    tags: ["Luxury", "Diving", "Honeymoon"],
  }
];

export const MOCK_GUIDES: Guide[] = [
  {
    id: "guide_1",
    name: "Priya Sharma",
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
    experience: 6,
    languages: ["English", "Tamil", "Hindi"],
    rating: 4.9,
    reviewsCount: 148,
    pricePerDay: 45,
    isAvailable: true,
    isVerified: true,
    governmentId: "GOV-IND-4820",
    licenseNumber: "LICENSE-TAJ-982",
    certificates: ["Certified Archeological Guide", "First-Aid Emergency Badge"],
    areasCovered: ["Agra", "New Delhi", "Jaipur"],
    vehicleDetails: "Sedan (Toyota Etios) Included",
    status: "Online",
  },
  {
    id: "guide_2",
    name: "Carlos Mendez",
    photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80",
    experience: 8,
    languages: ["English", "Spanish", "French"],
    rating: 4.8,
    reviewsCount: 215,
    pricePerDay: 55,
    isAvailable: true,
    isVerified: true,
    governmentId: "GOV-ESP-2938",
    licenseNumber: "LICENSE-EU-738",
    certificates: ["Alpine Survival License", "Historical Arts Specialist"],
    areasCovered: ["Madrid", "Barcelona", "Zermatt Alps"],
    vehicleDetails: "4x4 SUV (Jeep Compass) Optional",
    status: "Online",
  },
  {
    id: "guide_3",
    name: "Yuki Tanaka",
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
    experience: 4,
    languages: ["English", "Japanese", "Hindi"],
    rating: 4.9,
    reviewsCount: 92,
    pricePerDay: 60,
    isAvailable: true,
    isVerified: true,
    governmentId: "GOV-JPN-1029",
    licenseNumber: "LICENSE-KYOTO-449",
    certificates: ["Kyoto Cultural Ambassador", "Tea Ceremony Practitioner"],
    areasCovered: ["Kyoto", "Osaka", "Nara"],
    vehicleDetails: "Transit Navigator Card Provided",
    status: "In Tour",
  },
  {
    id: "guide_4",
    name: "Michael Smith",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
    experience: 10,
    languages: ["English", "French"],
    rating: 4.7,
    reviewsCount: 310,
    pricePerDay: 50,
    isAvailable: true,
    isVerified: true,
    governmentId: "GOV-USA-9981",
    licenseNumber: "LICENSE-NAT-502",
    certificates: ["National Park Ranger (Rtd)", "Wilderness EMT Certificate"],
    areasCovered: ["Grand Canyon", "Sedona", "Las Vegas"],
    vehicleDetails: "Offroad SUV (Ford Bronco)",
    status: "Online",
  }
];

export const MOCK_PACKAGES: TourPackage[] = [
  {
    id: "pkg_1",
    title: "Mughal Heritage & Food Expedition",
    duration: "Full Day (8 Hours)",
    price: 80,
    highlights: ["Sunrise view at Taj Mahal", "Guided walk in Agra Fort", "Traditional local breakfast", "Secret handicraft bazaar tour"],
    description: "An intensive guided stroll through the majestic Mughal architectural marvels combined with a flavor safari of historical recipes passed down generations."
  },
  {
    id: "pkg_2",
    title: "Local Artisans & Sunset Walk",
    duration: "Half Day (4 Hours)",
    price: 45,
    highlights: ["Marble inlay craft workshop", "Tomb of Itimad-ud-Daulah", "Yamuna river boat cruise at sunset"],
    description: "Designed for a relaxed pace. Explore local marble artisan lanes and enjoy an iconic sunset from a private wooden boat on the Yamuna river."
  },
  {
    id: "pkg_3",
    title: "Ultimate Cultural & Temple Insight",
    duration: "2-Day Deluxe Tour",
    price: 150,
    highlights: ["Major monuments fast-track entry", "Local gourmet lunch & dinner", "Air-conditioned private sedan", "Night sky lantern release"],
    description: "Our highest rated package. Covers all historic complexes, fine-dining luxury meals, and hands-on participation in cultural rituals led directly by your guide."
  }
];

export const MOCK_NEARBY_PLACES = {
  hotels: [
    { name: "The Oberoi Amarvilas", rating: 4.9, distance: "0.6 km", price: "$$$$" },
    { name: "Taj Hotel & Conventions", rating: 4.7, distance: "1.2 km", price: "$$$" },
    { name: "Radisson Hotel Agra", rating: 4.5, distance: "1.8 km", price: "$$" },
  ],
  restaurants: [
    { name: "Peshawri (North Indian Mughlai)", rating: 4.8, distance: "1.4 km", type: "Mughlai, Indian" },
    { name: "Esphahan Traditional Grill", rating: 4.7, distance: "0.6 km", type: "Barbecue, Kebab" },
    { name: "Sheroes Hangout (Inspiring Social Cafe)", rating: 4.9, distance: "2.1 km", type: "Cafe, Multi-cuisine" },
  ],
};

export const MOCK_CURRENCIES = [
  { code: "USD", name: "US Dollar", symbol: "$", rate: 1.0 },
  { code: "EUR", name: "Euro", symbol: "€", rate: 0.92 },
  { code: "INR", name: "Indian Rupee", symbol: "₹", rate: 83.5 },
  { code: "JPY", name: "Japanese Yen", symbol: "¥", rate: 158.2 },
  { code: "GBP", name: "British Pound", symbol: "£", rate: 0.78 },
];

export const CHECKLIST_TEMPLATES = [
  { id: "c1", text: "Valid Passport & Visa copies", completed: true, category: "Documents" },
  { id: "c2", text: "Download Offline Maps & Guides", completed: true, category: "Preparations" },
  { id: "c3", text: "Inform credit card banks of international travel", completed: false, category: "Preparations" },
  { id: "c4", text: "Emergency medical prescriptions", completed: false, category: "Documents" },
  { id: "c5", text: "Universal power adapters", completed: false, category: "Electronics" },
  { id: "c6", text: "Comfortable dynamic walking shoes", completed: false, category: "Clothing" },
  { id: "c7", text: "Refillable water bottle & sunscreen", completed: false, category: "Essentials" },
];
