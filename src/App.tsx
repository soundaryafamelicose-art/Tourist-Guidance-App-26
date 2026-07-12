import React, { useState, useEffect, useRef } from "react";
import {
  Compass,
  Search,
  BookOpen,
  MessageSquare,
  User,
  Settings as SettingsIcon,
  Languages,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  MapPin,
  Calendar,
  Users,
  DollarSign,
  Plus,
  Check,
  CheckSquare,
  Square,
  Trash2,
  Image,
  Navigation,
  Mic,
  Camera,
  Send,
  Bell,
  Star,
  Award,
  ShieldCheck,
  Map,
  CloudSun,
  AlertTriangle,
  FileText,
  TrendingUp,
  Share2,
  Activity,
  Heart,
  QrCode,
  Smartphone,
  CheckCircle,
  Clock,
  Phone,
  HelpCircle,
  Eye,
  EyeOff
} from "lucide-react";
import { LANGUAGES, MOCK_DESTINATIONS, MOCK_GUIDES, MOCK_PACKAGES, MOCK_NEARBY_PLACES, MOCK_CURRENCIES, CHECKLIST_TEMPLATES } from "./mockData";
import { Destination, Guide, TourPackage, Booking, Message, ChecklistItem, JournalEntry, TravelExpense } from "./types";
import MobileFrame from "./components/MobileFrame";
import SplashScreen from "./components/SplashScreen";
import LanguageSelection from "./components/LanguageSelection";
import RoleSelection from "./components/RoleSelection";

export default function App() {
  // Navigation State
  const [screen, setScreen] = useState<string>("splash");
  const [language, setLanguage] = useState<string>("en");
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);

  // Authentication State
  const [custEmail, setCustEmail] = useState("");
  const [custPass, setCustPass] = useState("");
  const [custRemember, setCustRemember] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const [guideIdInput, setGuideIdInput] = useState("");
  const [guidePass, setGuidePass] = useState("");

  const [customer, setCustomer] = useState({
    name: "Sarah Jenkins",
    email: "sarah.j@traveler.com",
    phone: "+1 (555) 019-2834",
    emergencyContact: "John Jenkins (+1 555-019-9988)",
    preferences: ["Nature", "Cultural Heritage", "Local Cuisines", "Solo Travel"],
    wishlist: ["dest_2", "dest_4"],
    savedGuides: ["guide_1"]
  });

  const [activeGuide, setActiveGuide] = useState<Guide>(MOCK_GUIDES[0]);

  // Bottom Navigation Tab (Customer Module)
  const [activeTab, setActiveTab] = useState<string>("home");

  // App-wide Functional States
  const [selectedDestination, setSelectedDestination] = useState<Destination>(MOCK_DESTINATIONS[0]);
  const [selectedGuide, setSelectedGuide] = useState<Guide>(MOCK_GUIDES[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  
  // Filter States
  const [tripFilter, setTripFilter] = useState("All"); // Solo, Family, Couple, etc.
  const [budgetFilter, setBudgetFilter] = useState("All"); // Low, Medium, Premium, Luxury
  const [guideGenderFilter, setGuideGenderFilter] = useState("All"); // All, Male, Female
  const [verifiedOnly, setVerifiedOnly] = useState(true);

  // Bookings state
  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: "book_101",
      guideId: "guide_1",
      guideName: "Priya Sharma",
      guidePhoto: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
      date: "2026-07-15",
      touristsCount: 2,
      packageTitle: "Mughal Heritage & Food Expedition",
      totalPrice: 90,
      status: "Accepted",
      customerName: "Sarah Jenkins",
      customerEmail: "sarah.j@traveler.com"
    }
  ]);

  // Booking Form State
  const [bookingDate, setBookingDate] = useState("2026-07-16");
  const [touristsCount, setTouristsCount] = useState(2);
  const [selectedPackage, setSelectedPackage] = useState<TourPackage>(MOCK_PACKAGES[0]);

  // Chat/Messaging State
  const [chatInput, setChatInput] = useState("");
  const [chats, setChats] = useState<Message[]>([
    {
      id: "msg_1",
      senderId: "guide",
      senderName: "Priya Sharma",
      text: "Hello Sarah! Excited to be your guide in Agra. Shall we meet directly at the Taj East Gate entrance?",
      timestamp: "10:30 AM",
      type: "text"
    }
  ]);

  // AI Chat State
  const [aiInput, setAiInput] = useState("");
  const [aiChat, setAiChat] = useState<Message[]>([
    {
      id: "ai_init",
      senderId: "ai",
      senderName: "TerraGuide AI",
      text: "Hello! I am your AI Travel Assistant. Ask me anything about sightseeing, local dishes, packing lists, or safety precautions in real-time!",
      timestamp: "Just Now",
      type: "text"
    }
  ]);
  const [aiLoading, setAiLoading] = useState(false);

  // AI Planner States
  const [planDestination, setPlanDestination] = useState("Bali, Indonesia");
  const [planBudget, setPlanBudget] = useState("Medium Budget");
  const [planDuration, setPlanDuration] = useState("3");
  const [planCompanion, setPlanCompanion] = useState("Solo Travel");
  const [planInterests, setPlanInterests] = useState("Nature & Heritage Temples");
  const [aiPlanResult, setAiPlanResult] = useState<any>(null);
  const [plannerLoading, setPlannerLoading] = useState(false);

  // AI Destination Recommender States
  const [recStyle, setRecStyle] = useState("Adventure");
  const [recBudget, setRecBudget] = useState("Premium");
  const [recRegion, setRecRegion] = useState("Southeast Asia");
  const [aiRecResults, setAiRecResults] = useState<any[]>([]);
  const [recLoading, setRecLoading] = useState(false);

  // Travel Checklist State
  const [checklist, setChecklist] = useState<ChecklistItem[]>(CHECKLIST_TEMPLATES);
  const [newChecklistText, setNewChecklistText] = useState("");

  // Travel Journal State
  const [journal, setJournal] = useState<JournalEntry[]>([
    {
      id: "j_1",
      title: "First glimpse of the Taj Mahal",
      date: "2026-07-11",
      location: "Agra, India",
      notes: "Woke up at 5:00 AM to catch the sunrise. The white marble has a beautiful golden glow in the early hours. Absolutely unforgettable! Priya explained the history elegantly.",
      photos: ["https://images.unsplash.com/photo-1548013146-72479768b921?auto=format&fit=crop&w=300&q=80"]
    }
  ]);
  const [newJournalTitle, setNewJournalTitle] = useState("");
  const [newJournalLocation, setNewJournalLocation] = useState("");
  const [newJournalNotes, setNewJournalNotes] = useState("");

  // Expense Calculator State
  const [expenses, setExpenses] = useState<TravelExpense[]>([
    { id: "e_1", title: "Local Breakfast", amount: 12, category: "Food", date: "2026-07-11" },
    { id: "e_2", title: "Agra Fort Tickets", amount: 15, category: "Sightseeing", date: "2026-07-11" },
    { id: "e_3", title: "Uber Cab Ride", amount: 18, category: "Transport", date: "2026-07-11" }
  ]);
  const [newExpenseTitle, setNewExpenseTitle] = useState("");
  const [newExpenseAmount, setNewExpenseAmount] = useState("");
  const [newExpenseCategory, setNewExpenseCategory] = useState<any>("Food");

  // Currency Converter State
  const [currFrom, setCurrFrom] = useState("USD");
  const [currTo, setCurrTo] = useState("INR");
  const [currAmount, setCurrAmount] = useState("100");
  const [convertedAmount, setConvertedAmount] = useState<number | null>(8350);

  // Live Location Update / Tour Status (Guide Portal)
  const [guideStatus, setGuideStatus] = useState<"Online" | "Offline" | "In Tour">("Online");
  const [liveLocation, setLiveLocation] = useState("Agra Cantonment Area");
  const [tourStatusMsg, setTourStatusMsg] = useState("Awaiting traveler arrival at hotel lounge.");
  const [touristArrival, setTouristArrival] = useState("Arrived");

  // QR Scanner simulation
  const [qrOpen, setQrOpen] = useState(false);
  const [qrResult, setQrResult] = useState<string | null>(null);

  // Notification Feed State
  const [notifications, setNotifications] = useState([
    { id: "n1", text: "Guide Priya Sharma accepted your booking!", time: "2 hours ago" },
    { id: "n2", text: "AI Suggestion: Heavy rain forecasted for Kyoto tomorrow. Adjust itinerary.", time: "4 hours ago" }
  ]);

  // Audio Note Recorder Simulation State
  const [recording, setRecording] = useState(false);

  // Quick Weather Update state
  const [weather] = useState({ temp: 32, condition: "Sunny with light cloud cover", humidity: 62, windSpeed: 14 });

  // Handle Dynamic Calculations
  const calculateTotalCost = () => {
    return selectedPackage.price * touristsCount;
  };

  const handleCurrencyConvert = () => {
    const amt = parseFloat(currAmount);
    if (isNaN(amt)) return;
    const fromRate = MOCK_CURRENCIES.find(c => c.code === currFrom)?.rate || 1.0;
    const toRate = MOCK_CURRENCIES.find(c => c.code === currTo)?.rate || 1.0;
    const inUSD = amt / fromRate;
    const finalVal = inUSD * toRate;
    setConvertedAmount(parseFloat(finalVal.toFixed(2)));
  };

  useEffect(() => {
    handleCurrencyConvert();
  }, [currFrom, currTo, currAmount]);

  // Trigger AI Assistant API (Server side proxy)
  const handleAISend = async () => {
    if (!aiInput.trim()) return;
    const userMsg: Message = {
      id: "ai_" + Date.now(),
      senderId: "customer",
      senderName: customer.name,
      text: aiInput,
      timestamp: "Just Now",
      type: "text"
    };

    setAiChat(prev => [...prev, userMsg]);
    const promptText = aiInput;
    setAiInput("");
    setAiLoading(true);

    try {
      const response = await fetch("/api/travel-assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...aiChat, userMsg].map(m => ({
            role: m.senderId === "customer" ? "user" : "assistant",
            content: m.text
          })),
          context: {
            destination: selectedDestination.name,
            currentLanguage: language,
            localTime: new Date().toISOString()
          }
        })
      });
      const data = await response.json();
      if (data.response) {
        setAiChat(prev => [...prev, {
          id: "ai_resp_" + Date.now(),
          senderId: "ai",
          senderName: "TerraGuide AI",
          text: data.response,
          timestamp: "Just Now",
          type: "text"
        }]);
      } else {
        throw new Error(data.error || "Failed connection");
      }
    } catch (err) {
      // Elegant fallback response
      setAiChat(prev => [...prev, {
        id: "ai_err_" + Date.now(),
        senderId: "ai",
        senderName: "TerraGuide AI",
        text: `Based on your request regarding "${promptText}", I recommend visiting early to avoid crowds. Make sure to dress comfortably, carry local currency (INR), and respect temple photography guidelines. Safe Travels! (AI Sandbox mode)`,
        timestamp: "Just Now",
        type: "text"
      }]);
    } finally {
      setAiLoading(false);
    }
  };

  // Trigger AI Trip Planner API (Server side proxy)
  const handleAIPlan = async () => {
    setPlannerLoading(true);
    setAiPlanResult(null);
    try {
      const response = await fetch("/api/trip-planner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          destination: planDestination,
          budget: planBudget,
          duration: planDuration,
          companion: planCompanion,
          interests: planInterests
        })
      });
      const data = await response.json();
      if (data && !data.error) {
        setAiPlanResult(data);
      } else {
        throw new Error("Sandbox fallback");
      }
    } catch (err) {
      // Structured fallback
      setAiPlanResult({
        tripName: `Perfect Dynamic Getaway to ${planDestination}`,
        summary: `A splendid trip crafted carefully for a ${planCompanion} seeking ${planInterests} at a ${planBudget} style.`,
        estimatedTotalCost: planBudget === "Low Budget" ? "$250" : planBudget === "Premium" ? "$900" : "$480",
        packingList: ["Comfortable active wear", "Universal Travel Adapter", "Light Raincoat", "Waterproof dry bag"],
        localTips: ["Respect native heritage practices.", "Always use verified guide portals.", "Try regional street foods at certified stalls."],
        dailyItinerary: [
          {
            day: 1,
            title: "Iconic Sightseeing & Cultural Immersion",
            activities: [
              { time: "08:30 AM", activity: "Heritage Core Walk", description: "Guided scenic entry through historical gates.", locationName: "Ancient Monument Center", cost: "Included" },
              { time: "01:00 PM", activity: "Local Tasting Safari", description: "Savor traditional recipes directly with food experts.", locationName: "Old Town Market", cost: "$15" }
            ]
          },
          {
            day: 2,
            title: "Scenic Wonders & Sunset Boat",
            activities: [
              { time: "09:00 AM", activity: "Scenic Hike / Forest Walk", description: "Breathtaking views and vibrant biodiversity path.", locationName: "Nature Overlook Point", cost: "Free" },
              { time: "05:30 PM", activity: "Private Sunset cruise", description: "Tranquil waterside experience.", locationName: "Local River Jetty", cost: "$25" }
            ]
          }
        ]
      });
    } finally {
      setPlannerLoading(false);
    }
  };

  // Trigger AI Destination Recommender API
  const handleAICorrelation = async () => {
    setRecLoading(true);
    setAiRecResults([]);
    try {
      const response = await fetch("/api/destination-recommender", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          travelStyle: recStyle,
          budget: recBudget,
          region: recRegion
        })
      });
      const data = await response.json();
      if (Array.isArray(data)) {
        setAiRecResults(data);
      } else {
        throw new Error();
      }
    } catch (err) {
      // Beautiful Fallback Suggestion data
      setAiRecResults([
        {
          name: "Sintra Romantic Hills",
          country: "Portugal",
          vibe: "Fairytale Heritage & Forest",
          matchingScore: 98,
          description: "An incredible misty mountain forest dotted with pastel-colored castle palaces and lush historical paths.",
          bestTimeToVisit: "Spring (Apr to Jun)",
          highlights: ["Pena National Palace", "Quinta da Regaleira", "Local Egg Tarts tasting"],
          estimatedDailyCost: "$85"
        },
        {
          name: "Lombok Wilderness Beaches",
          country: "Indonesia",
          vibe: "Tropical Adventure & Diving",
          matchingScore: 95,
          description: "Vibrant volcanic hiking paths leading down to pristine white-sand bays without the massive tourist crowds.",
          bestTimeToVisit: "Dry Season (May to Sep)",
          highlights: ["Mount Rinjani volcano hike", "Gili Trawangan diving", "Sasak cultural village"],
          estimatedDailyCost: "$40"
        }
      ]);
    } finally {
      setRecLoading(false);
    }
  };

  // Chat Screen Messenger
  const handleChatSend = () => {
    if (!chatInput.trim()) return;
    const newMsg: Message = {
      id: "msg_" + Date.now(),
      senderId: "customer",
      senderName: customer.name,
      text: chatInput,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: "text"
    };
    setChats(prev => [...prev, newMsg]);
    setChatInput("");

    // Simulate Guide automated response after 2 seconds
    setTimeout(() => {
      setChats(prev => [...prev, {
        id: "msg_resp_" + Date.now(),
        senderId: "guide",
        senderName: activeGuide.name,
        text: `Perfect, noted! I will have the vehicle ready. Let me know if you need anything else before we depart!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: "text"
      }]);
    }, 2000);
  };

  // Voice record mock
  const handleVoiceRecord = () => {
    if (recording) {
      setRecording(false);
      setChats(prev => [...prev, {
        id: "msg_voice_" + Date.now(),
        senderId: "customer",
        senderName: customer.name,
        timestamp: "Just Now",
        type: "voice",
        voiceDuration: "0:08 Sec"
      }]);
    } else {
      setRecording(true);
    }
  };

  // Image attach mock
  const handleImageAttach = () => {
    setChats(prev => [...prev, {
      id: "msg_img_" + Date.now(),
      senderId: "customer",
      senderName: customer.name,
      imageUrl: "https://images.unsplash.com/photo-1548013146-72479768b921?auto=format&fit=crop&w=300&q=80",
      timestamp: "Just Now",
      type: "image"
    }]);
  };

  // GPS navigation simulator
  const handleGpsUpdate = () => {
    setLiveLocation("Taj Mahal East Entrance gate");
    setTourStatusMsg("Tour active. Exploring monument courtyard with Sarah.");
  };

  // Guide Accept booking
  const handleAcceptBooking = (bId: string) => {
    setBookings(prev => prev.map(b => b.id === bId ? { ...b, status: "Accepted" } : b));
  };

  const handleRejectBooking = (bId: string) => {
    setBookings(prev => prev.map(b => b.id === bId ? { ...b, status: "Rejected" } : b));
  };

  // Booking creator
  const handleCreateBooking = () => {
    const newB: Booking = {
      id: "book_" + Date.now(),
      guideId: selectedGuide.id,
      guideName: selectedGuide.name,
      guidePhoto: selectedGuide.photo,
      date: bookingDate,
      touristsCount: touristsCount,
      packageTitle: selectedPackage.title,
      totalPrice: calculateTotalCost(),
      status: "Pending",
      customerName: customer.name,
      customerEmail: customer.email
    };
    setBookings(prev => [newB, ...prev]);
    setNotifications(prev => [
      { id: "n_" + Date.now(), text: `Booking request sent to ${selectedGuide.name}!`, time: "Just now" },
      ...prev
    ]);
    // Switch view back to home
    setScreen("customer-main");
    setActiveTab("bookings");
  };

  // Checklist toggles
  const toggleChecklist = (id: string) => {
    setChecklist(prev => prev.map(c => c.id === id ? { ...c, completed: !c.completed } : c));
  };

  const addChecklistItem = () => {
    if (!newChecklistText.trim()) return;
    setChecklist(prev => [...prev, {
      id: "c_" + Date.now(),
      text: newChecklistText,
      completed: false,
      category: "My Trip"
    }]);
    setNewChecklistText("");
  };

  const deleteChecklistItem = (id: string) => {
    setChecklist(prev => prev.filter(c => c.id !== id));
  };

  // Expenses management
  const addExpense = () => {
    const amt = parseFloat(newExpenseAmount);
    if (!newExpenseTitle.trim() || isNaN(amt)) return;
    setExpenses(prev => [...prev, {
      id: "e_" + Date.now(),
      title: newExpenseTitle,
      amount: amt,
      category: newExpenseCategory,
      date: new Date().toISOString().split('T')[0]
    }]);
    setNewExpenseTitle("");
    setNewExpenseAmount("");
  };

  const deleteExpense = (id: string) => {
    setExpenses(prev => prev.filter(e => e.id !== id));
  };

  // Journal management
  const addJournalEntry = () => {
    if (!newJournalTitle.trim() || !newJournalNotes.trim()) return;
    setJournal(prev => [{
      id: "j_" + Date.now(),
      title: newJournalTitle,
      date: new Date().toISOString().split('T')[0],
      location: newJournalLocation || "Active Travel",
      notes: newJournalNotes,
      photos: ["https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=300&q=80"]
    }, ...prev]);
    setNewJournalTitle("");
    setNewJournalLocation("");
    setNewJournalNotes("");
  };

  // QR Place code scanner simulator
  const triggerQRScan = (landmark: string) => {
    setQrOpen(true);
    setQrResult("Scanning place...");
    setTimeout(() => {
      setQrResult(`SUCCESS: Verified Heritage Token scanned for "${landmark}". Fast track tourist pass approved! ID: WR-74291.`);
    }, 1500);
  };

  // Filter Guide calculations
  const filteredGuides = MOCK_GUIDES.filter(guide => {
    if (verifiedOnly && !guide.isVerified) return false;
    if (guideGenderFilter !== "All") {
      const isMale = ["Carlos Mendez", "Michael Smith"].includes(guide.name);
      if (guideGenderFilter === "Male" && !isMale) return false;
      if (guideGenderFilter === "Female" && isMale) return false;
    }
    return true;
  });

  // Filtered Destinations calculations
  const filteredDestinations = MOCK_DESTINATIONS.filter(dest => {
    if (selectedCategory !== "All" && dest.category !== selectedCategory) return false;
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      return dest.name.toLowerCase().includes(q) || dest.country.toLowerCase().includes(q) || dest.tags.some(t => t.toLowerCase().includes(q));
    }
    return true;
  });

  return (
    <div 
      className="w-full min-h-screen font-sans flex items-center justify-center p-4 overflow-hidden relative select-none"
      style={{
        background: "radial-gradient(circle at top left, #e0f2f1 0%, #f0fdfa 40%, #b2dfdb 100%)"
      }}
    >
      {/* Decorative Frosted Glass blurred blobs in parent backdrop */}
      <div className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] bg-sky-200/50 rounded-full blur-[140px] opacity-70" />
      <div className="absolute bottom-[-100px] right-[-100px] w-[600px] h-[600px] bg-teal-100/60 rounded-full blur-[120px] opacity-60" />

      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center justify-center z-10 relative">
        
        {/* LEFT COLUMN: Premium AI Active Guide glass card (visible on desktop) */}
        <div className="hidden lg:flex lg:col-span-3 flex-col gap-5">
          {/* Active Guide Dashboard Widget */}
          <div className="backdrop-blur-xl bg-white/45 border border-white/40 p-5 rounded-[2.5rem] shadow-xl hover:shadow-2xl transition-all duration-300">
            <div className="flex justify-between items-center mb-3">
              <span className="text-[10px] font-bold text-teal-800 uppercase tracking-wider">Active Local Guide</span>
              <div className="flex items-center gap-1.5 bg-emerald-500/20 text-emerald-700 px-2 py-0.5 rounded-full text-[9px] font-bold animate-pulse">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span>ONLINE</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <img 
                src={selectedGuide.photo} 
                alt={selectedGuide.name} 
                className="w-12 h-12 rounded-full object-cover border-2 border-emerald-400 shadow"
              />
              <div>
                <p className="text-sm font-bold text-slate-800 leading-tight">{selectedGuide.name}</p>
                <p className="text-[10px] text-slate-600 font-medium">Exp: {selectedGuide.experience} Yrs • Rating: ⭐ {selectedGuide.rating}</p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-200/50 flex flex-wrap gap-1">
              {selectedGuide.languages.map((l, idx) => (
                <span key={idx} className="text-[9px] font-medium bg-teal-500/10 text-teal-800 px-2 py-0.5 rounded-md">
                  {l}
                </span>
              ))}
            </div>

            <button 
              onClick={() => {
                setScreen("customer-main");
                setActiveTab("chat");
              }}
              className="w-full mt-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-2xl shadow-md transition-all active:scale-95 flex items-center justify-center gap-1.5"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Direct Chat Channel</span>
            </button>
          </div>

          {/* Quick Stats widget */}
          <div className="backdrop-blur-lg bg-teal-950/10 border border-teal-500/20 p-5 rounded-[2.5rem] shadow-lg">
            <span className="text-[9px] font-bold text-teal-900 uppercase tracking-widest block mb-2">Emergency SOS Portal</span>
            <div className="flex flex-col gap-2">
              <a href="tel:112" className="flex items-center justify-between p-2.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-700 rounded-2xl border border-rose-300/30 transition-all">
                <span className="text-xs font-bold">Police / Ambulance</span>
                <Phone className="w-4 h-4 text-rose-500" />
              </a>
              <p className="text-[10px] text-slate-600 italic leading-snug">
                One-tap connects you instantly to vetted local authorities & your emergency contact.
              </p>
            </div>
          </div>
        </div>

        {/* CENTER COLUMN: Central Phone Simulation Frame */}
        <div className="lg:col-span-6 flex justify-center">
          <MobileFrame isDarkMode={isDarkMode} toggleDarkMode={() => setIsDarkMode(!isDarkMode)}>
            
            {/* 1. SCREEN: Splash */}
            {screen === "splash" && (
              <SplashScreen isDarkMode={isDarkMode} onComplete={() => setScreen("language")} />
            )}

            {/* 2. SCREEN: Language Selection */}
            {screen === "language" && (
              <LanguageSelection 
                isDarkMode={isDarkMode} 
                onComplete={(lang) => {
                  setLanguage(lang);
                  setScreen("role");
                }} 
              />
            )}

            {/* 3. SCREEN: Role Selection */}
            {screen === "role" && (
              <RoleSelection 
                isDarkMode={isDarkMode} 
                onSelectRole={(selected) => {
                  if (selected === "customer") {
                    setScreen("customer-login");
                  } else {
                    setScreen("guide-login");
                  }
                }} 
              />
            )}

            {/* 4. SCREEN: Customer Login */}
            {screen === "customer-login" && (
              <div className="absolute inset-0 flex flex-col justify-between p-6 overflow-y-auto">
                <div className="flex flex-col mt-4">
                  {/* Back to roles button */}
                  <button 
                    onClick={() => setScreen("role")}
                    className={`flex items-center gap-1.5 text-xs font-semibold mb-6 ${isDarkMode ? "text-slate-400 hover:text-slate-200" : "text-slate-600 hover:text-slate-900"}`}
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Roles</span>
                  </button>

                  <h2 className="text-2xl font-bold tracking-tight">Traveler Portal</h2>
                  <p className={`text-xs mt-1.5 ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
                    Sign in to book direct local guides and unlock premium dynamic AI travel advice.
                  </p>

                  {/* Form fields */}
                  <div className="flex flex-col gap-3.5 mt-8">
                    <div>
                      <label className={`text-[11px] font-semibold uppercase tracking-wider block mb-1.5 ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
                        Email Address
                      </label>
                      <input 
                        type="email" 
                        placeholder="sarah.j@traveler.com"
                        value={custEmail}
                        onChange={(e) => setCustEmail(e.target.value)}
                        className={`w-full p-3.5 rounded-2xl border text-sm transition-all focus:outline-none focus:ring-1 ${
                          isDarkMode 
                            ? "bg-slate-900/60 border-slate-800 text-white focus:ring-emerald-500" 
                            : "bg-white border-slate-200 text-slate-800 focus:ring-sky-500"
                        }`}
                      />
                    </div>

                    <div>
                      <label className={`text-[11px] font-semibold uppercase tracking-wider block mb-1.5 ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
                        Secret Password
                      </label>
                      <div className="relative">
                        <input 
                          type={showPassword ? "text" : "password"} 
                          placeholder="••••••••"
                          value={custPass}
                          onChange={(e) => setCustPass(e.target.value)}
                          className={`w-full p-3.5 pr-11 rounded-2xl border text-sm transition-all focus:outline-none focus:ring-1 ${
                            isDarkMode 
                              ? "bg-slate-900/60 border-slate-800 text-white focus:ring-emerald-500" 
                              : "bg-white border-slate-200 text-slate-800 focus:ring-sky-500"
                          }`}
                        />
                        <button 
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    {/* Remember me & forgot password options */}
                    <div className="flex items-center justify-between text-xs font-semibold pt-1">
                      <label className="flex items-center gap-2 cursor-pointer select-none">
                        <input 
                          type="checkbox" 
                          checked={custRemember}
                          onChange={() => setCustRemember(!custRemember)}
                          className="rounded border-slate-300 text-emerald-500 focus:ring-emerald-500"
                        />
                        <span className={isDarkMode ? "text-slate-400" : "text-slate-600"}>Remember me</span>
                      </label>
                      <button className="text-emerald-500 hover:underline">Forgot password?</button>
                    </div>
                  </div>
                </div>

                {/* Footer buttons */}
                <div className="flex flex-col gap-3 mt-6">
                  <button
                    onClick={() => {
                      setScreen("customer-main");
                      setActiveTab("home");
                    }}
                    className={`w-full py-4 rounded-2xl font-bold tracking-wide flex items-center justify-center gap-2 shadow-md transition-all active:scale-95 ${
                      isDarkMode 
                        ? "bg-gradient-to-r from-emerald-500 to-indigo-600 text-white shadow-emerald-500/10" 
                        : "bg-gradient-to-r from-sky-500 to-emerald-500 text-white shadow-sky-500/20"
                    }`}
                  >
                    <span>Sign In Securely</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button 
                    onClick={() => {
                      setScreen("customer-main");
                      setActiveTab("home");
                    }}
                    className={`w-full py-3.5 rounded-2xl text-xs font-bold border transition-all flex items-center justify-center gap-2 ${
                      isDarkMode 
                        ? "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10" 
                        : "bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    <span>Sign In with Google</span>
                  </button>

                  <p className={`text-[10px] text-center ${isDarkMode ? "text-slate-500" : "text-slate-400"}`}>
                    Don't have an account? <span className="text-emerald-500 font-bold cursor-pointer hover:underline">Register traveler</span>
                  </p>
                </div>
              </div>
            )}

            {/* 5. SCREEN: Guide Login */}
            {screen === "guide-login" && (
              <div className="absolute inset-0 flex flex-col justify-between p-6 overflow-y-auto">
                <div className="flex flex-col mt-4">
                  {/* Back to roles button */}
                  <button 
                    onClick={() => setScreen("role")}
                    className={`flex items-center gap-1.5 text-xs font-semibold mb-6 ${isDarkMode ? "text-slate-400 hover:text-slate-200" : "text-slate-600 hover:text-slate-900"}`}
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Roles</span>
                  </button>

                  <h2 className="text-2xl font-bold tracking-tight">Guide Register & Sign In</h2>
                  <p className={`text-xs mt-1.5 ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
                    Access tours, manage earnings, and chat with customers with your Guide credentials.
                  </p>

                  {/* Form fields */}
                  <div className="flex flex-col gap-3.5 mt-8">
                    <div>
                      <label className={`text-[11px] font-semibold uppercase tracking-wider block mb-1.5 ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
                        Guide ID / License
                      </label>
                      <input 
                        type="text" 
                        placeholder="TG-GUIDE-1029"
                        value={guideIdInput}
                        onChange={(e) => setGuideIdInput(e.target.value)}
                        className={`w-full p-3.5 rounded-2xl border text-sm transition-all focus:outline-none focus:ring-1 ${
                          isDarkMode 
                            ? "bg-slate-900/60 border-slate-800 text-white focus:ring-emerald-500" 
                            : "bg-white border-slate-200 text-slate-800 focus:ring-sky-500"
                        }`}
                      />
                    </div>

                    <div>
                      <label className={`text-[11px] font-semibold uppercase tracking-wider block mb-1.5 ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
                        Password
                      </label>
                      <input 
                        type="password" 
                        placeholder="••••••••"
                        value={guidePass}
                        onChange={(e) => setGuidePass(e.target.value)}
                        className={`w-full p-3.5 rounded-2xl border text-sm transition-all focus:outline-none focus:ring-1 ${
                          isDarkMode 
                            ? "bg-slate-900/60 border-slate-800 text-white focus:ring-emerald-500" 
                            : "bg-white border-slate-200 text-slate-800 focus:ring-sky-500"
                        }`}
                      />
                    </div>

                    {/* Forgot password option */}
                    <div className="flex justify-end text-xs font-semibold pt-1">
                      <button className="text-emerald-500 hover:underline">Forgot password?</button>
                    </div>
                  </div>
                </div>

                {/* Footer buttons */}
                <div className="flex flex-col gap-3 mt-6">
                  <button
                    onClick={() => {
                      setScreen("guide-main");
                    }}
                    className={`w-full py-4 rounded-2xl font-bold tracking-wide flex items-center justify-center gap-2 shadow-md transition-all active:scale-95 ${
                      isDarkMode 
                        ? "bg-gradient-to-r from-emerald-500 to-indigo-600 text-white shadow-emerald-500/10" 
                        : "bg-gradient-to-r from-sky-500 to-emerald-500 text-white shadow-sky-500/20"
                    }`}
                  >
                    <span>Login Guide Portal</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <p className={`text-[10px] text-center ${isDarkMode ? "text-slate-500" : "text-slate-400"}`}>
                    Need a guiding permit? <span className="text-emerald-500 font-bold cursor-pointer hover:underline">Apply for verified license</span>
                  </p>
                </div>
              </div>
            )}

            {/* 6. SCREEN: Customer Main View Dashboard & Tabs */}
            {screen === "customer-main" && (
              <div className="absolute inset-0 flex flex-col justify-between overflow-hidden">
                
                {/* Dynamic Screen Header */}
                <div className="p-4 shrink-0 flex items-center justify-between border-b border-slate-200/50 z-30">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold text-xs shadow-md">
                      SJ
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold tracking-wider uppercase">Welcome Back</p>
                      <h4 className="text-sm font-bold leading-tight">{customer.name}</h4>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {/* SOS Floating Icon button */}
                    <a href="tel:112" className="p-2 bg-rose-500 text-white rounded-xl shadow-md transition-transform active:scale-95 flex items-center justify-center" title="EMERGENCY SOS CALL">
                      <AlertTriangle className="w-4 h-4 text-white animate-pulse" />
                    </a>
                    
                    <button 
                      onClick={() => {
                        setNotifications([]);
                      }}
                      className={`p-2 rounded-xl border relative ${isDarkMode ? "bg-slate-900 border-slate-800 text-slate-300" : "bg-white border-slate-200 text-slate-700"}`}
                    >
                      <Bell className="w-4 h-4" />
                      {notifications.length > 0 && (
                        <span className="absolute -top-1.5 -right-1 w-2.5 h-2.5 bg-rose-500 rounded-full border border-white" />
                      )}
                    </button>
                  </div>
                </div>

                {/* TAB WINDOW viewport */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  
                  {/* TAB: Home */}
                  {activeTab === "home" && (
                    <>
                      {/* Animated Glass Hero banner */}
                      <div className="relative rounded-3xl overflow-hidden p-5 shadow-lg border border-white/20 text-white bg-cover bg-center h-44 flex flex-col justify-between"
                        style={{
                          backgroundImage: "linear-gradient(rgba(17, 24, 39, 0.35), rgba(17, 24, 39, 0.8)), url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=600')"
                        }}
                      >
                        <div className="bg-emerald-500/80 backdrop-blur-md text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full w-max">
                          ★ AI Travel Assistant Activated
                        </div>

                        <div>
                          <h3 className="text-lg font-bold leading-tight">Agra Heritage & Culinary Tour</h3>
                          <p className="text-xs text-white/80 mt-1 line-clamp-2">Explore the pristine Taj Mahal & organic local street markets with प्रिया Sharma.</p>
                        </div>
                      </div>

                      {/* Travel Assistant Quick Entry Container */}
                      <div className="backdrop-blur-md bg-white/10 border border-white/20 p-3 rounded-2xl flex items-center gap-3">
                        <Sparkles className="w-5 h-5 text-amber-400 shrink-0" />
                        <input 
                          type="text" 
                          placeholder="Ask AI: Secret spots in Agra?"
                          value={aiInput}
                          onChange={(e) => setAiInput(e.target.value)}
                          onKeyDown={(e) => e.key === "Enter" && handleAISend()}
                          className="bg-transparent border-none text-xs placeholder-slate-400 text-slate-200 focus:outline-none w-full"
                        />
                        <button 
                          onClick={handleAISend}
                          className="p-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-all"
                        >
                          <Send className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Horizontal Category selector */}
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider mb-2.5">Explore Categories</h4>
                        <div className="flex gap-2 overflow-x-auto scrollbar-none pb-1">
                          {["All", "Heritage", "Adventure", "Beach", "Mountain", "Nature"].map((cat) => (
                            <button
                              key={cat}
                              onClick={() => setSelectedCategory(cat)}
                              className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap border transition-all ${
                                selectedCategory === cat
                                  ? "bg-slate-900 text-white border-slate-900"
                                  : isDarkMode
                                  ? "bg-slate-900/40 border-slate-800 text-slate-300"
                                  : "bg-white border-slate-200 text-slate-700"
                              }`}
                            >
                              {cat}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Recommended Attractions Grid */}
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-xs font-bold uppercase tracking-wider">Top Destinations</h4>
                          <span className="text-[10px] font-bold text-emerald-500 cursor-pointer">View All</span>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          {filteredDestinations.slice(0, 4).map((dest) => (
                            <div 
                              key={dest.id}
                              onClick={() => {
                                setSelectedDestination(dest);
                                setScreen("booking-screen");
                              }}
                              className={`group rounded-2xl overflow-hidden border cursor-pointer transition-all hover:scale-[1.01] ${
                                isDarkMode ? "bg-slate-900/50 border-slate-850" : "bg-white border-slate-200"
                              }`}
                            >
                              <div className="h-28 w-full relative overflow-hidden">
                                <img src={dest.image} alt={dest.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                                <div className="absolute top-2 left-2 bg-slate-900/80 backdrop-blur-md px-2 py-0.5 rounded-md text-[8px] font-bold text-white uppercase">
                                  {dest.category}
                                </div>
                                <div className="absolute bottom-2 right-2 bg-emerald-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full shadow flex items-center gap-0.5">
                                  ⭐ {dest.rating}
                                </div>
                              </div>
                              <div className="p-2.5">
                                <h5 className="text-xs font-bold truncate leading-tight">{dest.name}</h5>
                                <p className={`text-[10px] mt-0.5 ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>{dest.country}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Premium AI Utilities widgets list */}
                      <div className="pt-2">
                        <h4 className="text-xs font-bold uppercase tracking-wider mb-2.5">AI Travel Suites</h4>
                        <div className="grid grid-cols-2 gap-2">
                          <button 
                            onClick={() => setScreen("ai-planner")}
                            className="p-3.5 rounded-2xl text-left border backdrop-blur-md bg-emerald-500/10 border-emerald-500/30 flex flex-col justify-between h-24 hover:scale-[1.01] transition-all"
                          >
                            <Sparkles className="w-5 h-5 text-emerald-500" />
                            <div>
                              <span className="text-xs font-bold block">Smart Planner</span>
                              <span className="text-[9px] opacity-70">Custom itineraries</span>
                            </div>
                          </button>
                          
                          <button 
                            onClick={() => setScreen("ai-recommender")}
                            className="p-3.5 rounded-2xl text-left border backdrop-blur-md bg-indigo-500/10 border-indigo-500/30 flex flex-col justify-between h-24 hover:scale-[1.01] transition-all"
                          >
                            <Compass className="w-5 h-5 text-indigo-500" />
                            <div>
                              <span className="text-xs font-bold block">Dest Recommender</span>
                              <span className="text-[9px] opacity-70">Region & vibe correlator</span>
                            </div>
                          </button>

                          <button 
                            onClick={() => setScreen("checklist")}
                            className="p-3.5 rounded-2xl text-left border bg-amber-500/10 border-amber-500/30 flex flex-col justify-between h-24 hover:scale-[1.01] transition-all"
                          >
                            <CheckSquare className="w-5 h-5 text-amber-500" />
                            <div>
                              <span className="text-xs font-bold block">Travel Checklist</span>
                              <span className="text-[9px] opacity-70">Pack & preps manager</span>
                            </div>
                          </button>

                          <button 
                            onClick={() => setScreen("journal")}
                            className="p-3.5 rounded-2xl text-left border bg-teal-500/10 border-teal-500/30 flex flex-col justify-between h-24 hover:scale-[1.01] transition-all"
                          >
                            <BookOpen className="w-5 h-5 text-teal-500" />
                            <div>
                              <span className="text-xs font-bold block">Travel Journal</span>
                              <span className="text-[9px] opacity-70">Write offline memories</span>
                            </div>
                          </button>
                        </div>
                      </div>

                      {/* Extra Premium Utilities list */}
                      <div className="pt-2">
                        <h4 className="text-xs font-bold uppercase tracking-wider mb-2.5">Interactive Tour Utilities</h4>
                        <div className="grid grid-cols-2 gap-2">
                          <button 
                            onClick={() => setScreen("expense-calc")}
                            className="p-3.5 rounded-2xl text-left border bg-sky-500/10 border-sky-500/30 flex flex-col justify-between h-24 hover:scale-[1.01] transition-all"
                          >
                            <DollarSign className="w-5 h-5 text-sky-500" />
                            <div>
                              <span className="text-xs font-bold block">Expense Manager</span>
                              <span className="text-[9px] opacity-70">Log daily expenses</span>
                            </div>
                          </button>

                          <button 
                            onClick={() => setScreen("currency-conv")}
                            className="p-3.5 rounded-2xl text-left border bg-purple-500/10 border-purple-500/30 flex flex-col justify-between h-24 hover:scale-[1.01] transition-all"
                          >
                            <TrendingUp className="w-5 h-5 text-purple-500" />
                            <div>
                              <span className="text-xs font-bold block">Currency Converter</span>
                              <span className="text-[9px] opacity-70">Live rates calculator</span>
                            </div>
                          </button>
                        </div>
                      </div>

                    </>
                  )}

                  {/* TAB: Search */}
                  {activeTab === "search" && (
                    <div className="space-y-4">
                      {/* Search & filters */}
                      <div className="flex gap-2">
                        <div className={`flex-1 flex items-center gap-2 px-3 py-2.5 rounded-2xl border ${isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"}`}>
                          <Search className="w-4 h-4 text-slate-400" />
                          <input 
                            type="text" 
                            placeholder="Search places & guides..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-transparent border-none text-xs focus:outline-none w-full text-slate-200"
                          />
                        </div>
                        <button 
                          onClick={() => triggerQRScan("Taj Mahal Heritage Area")}
                          className={`p-3 rounded-2xl border ${isDarkMode ? "bg-slate-900 border-slate-800 text-white" : "bg-white border-slate-200 text-slate-700"}`}
                          title="Scan place QR Code"
                        >
                          <QrCode className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Interactive Filter Panels */}
                      <div className={`p-4 rounded-2xl border ${isDarkMode ? "bg-slate-900/60 border-slate-800" : "bg-white border-slate-200"} space-y-3`}>
                        <div className="flex items-center justify-between border-b pb-2 border-slate-700/50">
                          <span className="text-xs font-bold uppercase tracking-wider">Dynamic Tour Filters</span>
                          <button 
                            onClick={() => {
                              setTripFilter("All");
                              setBudgetFilter("All");
                              setGuideGenderFilter("All");
                              setVerifiedOnly(true);
                            }}
                            className="text-[10px] text-emerald-500 font-bold"
                          >
                            Reset
                          </button>
                        </div>

                        {/* Trip Companion Filter */}
                        <div>
                          <span className="text-[10px] font-bold text-slate-400 block mb-1">Companion Style</span>
                          <div className="flex flex-wrap gap-1.5">
                            {["All", "Solo", "Family", "Couple", "Friends"].map(f => (
                              <button 
                                key={f}
                                onClick={() => setTripFilter(f)}
                                className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold ${tripFilter === f ? "bg-indigo-600 text-white" : "bg-slate-800 text-slate-300"}`}
                              >
                                {f}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Budget Filter */}
                        <div>
                          <span className="text-[10px] font-bold text-slate-400 block mb-1">Budget Segment</span>
                          <div className="flex flex-wrap gap-1.5">
                            {["All", "Low Budget", "Medium Budget", "Premium", "Luxury"].map(f => (
                              <button 
                                key={f}
                                onClick={() => setBudgetFilter(f)}
                                className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold ${budgetFilter === f ? "bg-indigo-600 text-white" : "bg-slate-800 text-slate-300"}`}
                              >
                                {f}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Safety & Guide Gender Preference */}
                        <div>
                          <span className="text-[10px] font-bold text-slate-400 block mb-1">Safety: Guide Preference</span>
                          <div className="flex flex-wrap gap-1.5">
                            {["All", "Male Guide", "Female Guide"].map(f => (
                              <button 
                                key={f}
                                onClick={() => setGuideGenderFilter(f.replace(" Guide", ""))}
                                className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold ${guideGenderFilter === f.replace(" Guide", "") ? "bg-indigo-600 text-white" : "bg-slate-800 text-slate-300"}`}
                              >
                                {f}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Verification badge filter toggle */}
                        <label className="flex items-center gap-2 cursor-pointer select-none pt-1">
                          <input 
                            type="checkbox" 
                            checked={verifiedOnly}
                            onChange={() => setVerifiedOnly(!verifiedOnly)}
                            className="rounded text-emerald-500 focus:ring-emerald-500"
                          />
                          <span className="text-[10px] font-bold text-slate-300">Verified Guides Only (Highly Recommended)</span>
                        </label>
                      </div>

                      {/* Dynamic Local Guides Found */}
                      <div className="space-y-3">
                        <h4 className="text-xs font-bold uppercase tracking-wider">Available Local Guides ({filteredGuides.length})</h4>
                        {filteredGuides.map((guide) => (
                          <div 
                            key={guide.id}
                            onClick={() => {
                              setSelectedGuide(guide);
                              setScreen("guide-profile-view");
                            }}
                            className={`p-3 rounded-2xl border cursor-pointer hover:scale-[1.01] transition-all flex items-center justify-between ${
                              isDarkMode ? "bg-slate-900/50 border-slate-850" : "bg-white border-slate-200"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <img src={guide.photo} alt={guide.name} className="w-12 h-12 rounded-full object-cover border" />
                              <div>
                                <div className="flex items-center gap-1">
                                  <h5 className="text-xs font-bold">{guide.name}</h5>
                                  {guide.isVerified && <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />}
                                </div>
                                <p className="text-[10px] text-slate-400">Exp: {guide.experience} Years • ⭐ {guide.rating}</p>
                                <p className="text-[9px] text-slate-400 italic">Areas: {guide.areasCovered.join(", ")}</p>
                              </div>
                            </div>

                            <div className="text-right">
                              <span className="text-xs font-black text-emerald-500">${guide.pricePerDay}/Day</span>
                              <span className="text-[8px] font-bold block text-slate-400">Vetted rate</span>
                            </div>
                          </div>
                        ))}
                      </div>

                    </div>
                  )}

                  {/* TAB: Bookings */}
                  {activeTab === "bookings" && (
                    <div className="space-y-4">
                      <h4 className="text-xs font-bold uppercase tracking-wider">My Tour Itineraries</h4>
                      
                      {bookings.length === 0 ? (
                        <div className="text-center py-8">
                          <Compass className="w-12 h-12 text-slate-600 mx-auto mb-3 opacity-35" />
                          <p className="text-xs font-medium text-slate-400">No active bookings yet.</p>
                          <button 
                            onClick={() => setActiveTab("search")}
                            className="mt-3 text-xs bg-indigo-600 text-white px-4 py-1.5 rounded-full"
                          >
                            Explore Guides
                          </button>
                        </div>
                      ) : (
                        bookings.map((booking) => (
                          <div 
                            key={booking.id}
                            className={`p-4 rounded-2xl border relative overflow-hidden ${
                              isDarkMode ? "bg-slate-900/60 border-slate-800" : "bg-white border-slate-200"
                            }`}
                          >
                            <div className="flex items-center justify-between mb-3 border-b border-slate-700/50 pb-2">
                              <div className="flex items-center gap-2">
                                <Calendar className="w-3.5 h-3.5 text-emerald-500" />
                                <span className="text-xs font-bold">{booking.date}</span>
                              </div>
                              <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                                booking.status === "Accepted" 
                                  ? "bg-emerald-500/20 text-emerald-400" 
                                  : booking.status === "Pending"
                                  ? "bg-amber-500/20 text-amber-400 animate-pulse"
                                  : "bg-rose-500/20 text-rose-400"
                              }`}>
                                {booking.status}
                              </span>
                            </div>

                            <div className="flex items-center gap-3">
                              <img src={booking.guidePhoto} alt={booking.guideName} className="w-10 h-10 rounded-full object-cover" />
                              <div>
                                <h5 className="text-xs font-bold">{booking.guideName}</h5>
                                <p className="text-[10px] text-slate-400">{booking.packageTitle}</p>
                                <p className="text-[9px] text-emerald-400 font-bold mt-1">Total: ${booking.totalPrice} ({booking.touristsCount} travelers)</p>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  )}

                  {/* TAB: Chat Channel */}
                  {activeTab === "chat" && (
                    <div className="flex flex-col h-[460px]">
                      
                      {/* Live Guide Booking context header */}
                      <div className={`p-3 rounded-2xl border mb-3 flex items-center justify-between ${isDarkMode ? "bg-slate-900/80 border-slate-800" : "bg-white border-slate-200"}`}>
                        <div className="flex items-center gap-2.5">
                          <img src={activeGuide.photo} alt={activeGuide.name} className="w-8 h-8 rounded-full object-cover" />
                          <div>
                            <span className="text-[8px] font-bold text-emerald-500 uppercase tracking-widest block">Direct Active Chat</span>
                            <span className="text-xs font-bold">{activeGuide.name}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-[9px] font-bold bg-indigo-600 text-white px-2 py-0.5 rounded-md">
                            Mughal Heritage Tour
                          </span>
                        </div>
                      </div>

                      {/* Chat Messages scroll area */}
                      <div className="flex-1 overflow-y-auto space-y-3.5 pr-1 mb-3">
                        {chats.map((msg) => {
                          const isMe = msg.senderId === "customer";
                          return (
                            <div key={msg.id} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
                              <div className={`max-w-[80%] rounded-2xl p-3 text-xs ${
                                isMe 
                                  ? "bg-indigo-600 text-white rounded-tr-none shadow-md" 
                                  : "bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none"
                              }`}>
                                {msg.type === "text" && <p>{msg.text}</p>}
                                {msg.type === "voice" && (
                                  <div className="flex items-center gap-2">
                                    <Mic className="w-3.5 h-3.5 animate-pulse text-amber-400" />
                                    <span className="font-mono">Voice note • {msg.voiceDuration}</span>
                                  </div>
                                )}
                                {msg.type === "image" && (
                                  <div className="space-y-1">
                                    <img src={msg.imageUrl} alt="Attached" className="rounded-lg max-h-32 object-cover" />
                                    <span className="text-[8px] opacity-70">Image uploaded</span>
                                  </div>
                                )}
                                <span className="block text-[8px] mt-1 opacity-70 text-right">{msg.timestamp}</span>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Dynamic messaging input container */}
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button 
                          onClick={handleImageAttach}
                          className={`p-2.5 rounded-xl border ${isDarkMode ? "bg-slate-900 border-slate-800 text-slate-300" : "bg-white border-slate-200 text-slate-700"}`}
                          title="Attach Photo"
                        >
                          <Camera className="w-4 h-4" />
                        </button>

                        <button 
                          onClick={handleVoiceRecord}
                          className={`p-2.5 rounded-xl border ${recording ? "bg-rose-500 text-white" : isDarkMode ? "bg-slate-900 border-slate-800 text-slate-300" : "bg-white border-slate-200 text-slate-700"}`}
                          title="Voice Note"
                        >
                          <Mic className="w-4 h-4" />
                        </button>

                        <input 
                          type="text" 
                          placeholder="Type message..." 
                          value={chatInput}
                          onChange={(e) => setChatInput(e.target.value)}
                          onKeyDown={(e) => e.key === "Enter" && handleChatSend()}
                          className={`flex-1 p-2.5 rounded-xl border text-xs focus:outline-none focus:ring-1 ${
                            isDarkMode ? "bg-slate-900 border-slate-800 text-white focus:ring-emerald-500" : "bg-white border-slate-200 text-slate-800 focus:ring-sky-500"
                          }`}
                        />

                        <button 
                          onClick={handleChatSend}
                          className="p-2.5 bg-indigo-600 text-white rounded-xl shadow-md transition-all active:scale-95"
                        >
                          <Send className="w-4 h-4" />
                        </button>
                      </div>

                    </div>
                  )}

                  {/* TAB: Profile */}
                  {activeTab === "profile" && (
                    <div className="space-y-4">
                      {/* Profile details */}
                      <div className="text-center py-4">
                        <div className="w-20 h-20 rounded-full bg-slate-700 mx-auto mb-2 border-2 border-emerald-400 overflow-hidden shadow">
                          <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80" alt="Sarah" className="w-full h-full object-cover" />
                        </div>
                        <h4 className="text-sm font-bold">{customer.name}</h4>
                        <p className="text-[10px] text-slate-400">{customer.email}</p>
                        <span className="inline-block mt-2 text-[9px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full font-bold">
                          Premium Explorer Tier
                        </span>
                      </div>

                      {/* Important Warning explicitly required */}
                      <div className="p-3 bg-indigo-600/10 border border-indigo-500/20 rounded-2xl">
                        <p className="text-[10px] text-indigo-300 leading-relaxed font-semibold">
                          ⚠️ Phone number is optional and is not required for receiving travel information.
                        </p>
                      </div>

                      {/* Travel Preferences */}
                      <div className="space-y-2">
                        <span className="text-[10px] font-bold text-slate-400 block uppercase">Travel Preferences</span>
                        <div className="flex flex-wrap gap-1.5">
                          {customer.preferences.map((p, idx) => (
                            <span key={idx} className="text-[10px] font-medium bg-slate-800 text-slate-300 px-3 py-1 rounded-full border border-slate-700/50">
                              {p}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Booking history summary list */}
                      <div className="space-y-2">
                        <span className="text-[10px] font-bold text-slate-400 block uppercase">Saved Vetted Guides</span>
                        <div className="flex items-center gap-2 p-2.5 bg-slate-900/60 rounded-xl border border-slate-800">
                          <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80" className="w-8 h-8 rounded-full object-cover" />
                          <div className="flex-1">
                            <span className="text-xs font-bold block leading-tight">Priya Sharma</span>
                            <span className="text-[9px] text-slate-400">Certified Archeologist Guide</span>
                          </div>
                        </div>
                      </div>

                      {/* Log out option */}
                      <button 
                        onClick={() => setScreen("role")}
                        className="w-full py-3 bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 border border-rose-500/30 text-xs font-semibold rounded-2xl transition-all"
                      >
                        Logout Traveler Portal
                      </button>
                    </div>
                  )}

                  {/* TAB: Settings */}
                  {activeTab === "settings" && (
                    <div className="space-y-4">
                      <h4 className="text-xs font-bold uppercase tracking-wider">Settings & Preferences</h4>
                      
                      <div className={`p-4 rounded-2xl border ${isDarkMode ? "bg-slate-900/60 border-slate-800" : "bg-white border-slate-200"} space-y-4`}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Languages className="w-4 h-4 text-emerald-500" />
                            <span className="text-xs font-bold">Language Selection</span>
                          </div>
                          <select 
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                            className="text-xs bg-slate-800 text-white rounded-lg p-1.5 focus:outline-none"
                          >
                            {LANGUAGES.map(l => (
                              <option key={l.code} value={l.code}>{l.name}</option>
                            ))}
                          </select>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Activity className="w-4 h-4 text-emerald-500" />
                            <span className="text-xs font-bold">Push Notifications</span>
                          </div>
                          <div className="w-8 h-4 bg-emerald-500 rounded-full relative cursor-pointer">
                            <div className="absolute right-0.5 top-0.5 w-3 h-3 bg-white rounded-full shadow" />
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <ShieldCheck className="w-4 h-4 text-emerald-500" />
                            <span className="text-xs font-bold">Privacy Sandbox</span>
                          </div>
                          <span className="text-[10px] text-slate-400 font-bold uppercase">SECURED</span>
                        </div>
                      </div>

                      {/* FAQ Support accordions */}
                      <div className="space-y-2">
                        <span className="text-[10px] font-bold text-slate-400 block uppercase">Frequently Asked Questions</span>
                        <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 space-y-1.5">
                          <p className="text-xs font-bold text-emerald-400">Q: How do I verify guide credentials?</p>
                          <p className="text-[11px] text-slate-300 leading-normal">
                            All guides in TerraGuide carry active state government licenses checked with national registries before profile listing approval.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                </div>

                {/* Bottom Navigation Panel */}
                <div className={`h-20 shrink-0 border-t ${
                  isDarkMode ? "bg-slate-900/90 border-slate-800" : "bg-white/95 border-slate-200"
                } backdrop-blur-2xl flex items-center justify-around px-2 z-30`}>
                  
                  <button 
                    onClick={() => { setActiveTab("home"); setScreen("customer-main"); }}
                    className={`flex flex-col items-center justify-center p-1.5 transition-all ${activeTab === "home" ? "text-emerald-500 scale-105" : "text-slate-400 hover:text-slate-200"}`}
                  >
                    <Compass className="w-5 h-5 mb-0.5" />
                    <span className="text-[9px] font-bold tracking-wider uppercase">Home</span>
                  </button>

                  <button 
                    onClick={() => { setActiveTab("search"); setScreen("customer-main"); }}
                    className={`flex flex-col items-center justify-center p-1.5 transition-all ${activeTab === "search" ? "text-emerald-500 scale-105" : "text-slate-400 hover:text-slate-200"}`}
                  >
                    <Search className="w-5 h-5 mb-0.5" />
                    <span className="text-[9px] font-bold tracking-wider uppercase">Explore</span>
                  </button>

                  <div className="relative -top-5 shrink-0">
                    <button 
                      onClick={() => setScreen("ai-planner")}
                      className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-400 to-indigo-600 shadow-xl flex items-center justify-center text-white border-4 border-slate-950 transition-all hover:scale-105 active:scale-95"
                      title="AI Co-pilot Assistant"
                    >
                      <Sparkles className="w-5 h-5 text-white animate-pulse" />
                    </button>
                  </div>

                  <button 
                    onClick={() => { setActiveTab("bookings"); setScreen("customer-main"); }}
                    className={`flex flex-col items-center justify-center p-1.5 transition-all ${activeTab === "bookings" ? "text-emerald-500 scale-105" : "text-slate-400 hover:text-slate-200"}`}
                  >
                    <BookOpen className="w-5 h-5 mb-0.5" />
                    <span className="text-[9px] font-bold tracking-wider uppercase">Bookings</span>
                  </button>

                  <button 
                    onClick={() => { setActiveTab("profile"); setScreen("customer-main"); }}
                    className={`flex flex-col items-center justify-center p-1.5 transition-all ${activeTab === "profile" ? "text-emerald-500 scale-105" : "text-slate-400 hover:text-slate-200"}`}
                  >
                    <User className="w-5 h-5 mb-0.5" />
                    <span className="text-[9px] font-bold tracking-wider uppercase">Profile</span>
                  </button>

                </div>

              </div>
            )}

            {/* 7. SCREEN: Guide Main View Dashboard (Guide Portal) */}
            {screen === "guide-main" && (
              <div className="absolute inset-0 flex flex-col justify-between overflow-hidden p-4">
                
                {/* Header */}
                <div className="flex items-center justify-between border-b border-slate-800 pb-3 shrink-0">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-slate-950 font-bold shadow-lg">
                      P
                    </div>
                    <div>
                      <span className="text-[8px] font-bold text-emerald-500 uppercase tracking-widest block">Authorized Guide</span>
                      <h4 className="text-sm font-bold">Priya Sharma</h4>
                    </div>
                  </div>
                  
                  <select 
                    value={guideStatus}
                    onChange={(e: any) => setGuideStatus(e.target.value)}
                    className="text-[10px] bg-slate-900 border border-slate-800 text-emerald-400 rounded-lg p-1.5 focus:outline-none font-bold"
                  >
                    <option value="Online">🟢 Online</option>
                    <option value="Offline">🔴 Offline</option>
                    <option value="In Tour">🔵 In Tour</option>
                  </select>
                </div>

                {/* Body scroll area */}
                <div className="flex-1 overflow-y-auto py-3 space-y-4">
                  
                  {/* earnings summary */}
                  <div className="p-4 bg-gradient-to-br from-slate-900 to-indigo-950 rounded-2xl border border-indigo-500/20 text-white flex items-center justify-between">
                    <div>
                      <span className="text-[9px] font-bold text-indigo-400 uppercase tracking-wider block">Wallet Earnings (Monthly)</span>
                      <h3 className="text-2xl font-black mt-0.5">$1,450.00</h3>
                      <span className="text-[8px] text-slate-400 block mt-1">Next pay cycle: July 15</span>
                    </div>
                    <div className="p-3 bg-indigo-500/20 rounded-2xl">
                      <TrendingUp className="w-8 h-8 text-indigo-400" />
                    </div>
                  </div>

                  {/* Booking requests management lists */}
                  <div className="space-y-2.5">
                    <span className="text-xs font-bold uppercase tracking-wider block">Incoming Tourist Requests</span>
                    
                    {bookings.map((req) => (
                      <div key={req.id} className="p-3.5 bg-slate-900 border border-slate-800 rounded-2xl space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-semibold text-slate-400">Date: {req.date}</span>
                          <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                            req.status === "Accepted" ? "bg-emerald-500/20 text-emerald-400" : "bg-amber-500/20 text-amber-400"
                          }`}>{req.status}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center font-bold text-xs text-indigo-400">
                            {req.customerName.charAt(0)}
                          </div>
                          <div>
                            <h5 className="text-xs font-bold">{req.customerName}</h5>
                            <p className="text-[9px] text-slate-400">{req.packageTitle}</p>
                          </div>
                        </div>

                        {req.status === "Pending" && (
                          <div className="flex gap-2">
                            <button 
                              onClick={() => handleAcceptBooking(req.id)}
                              className="flex-1 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-[10px] font-bold transition-all"
                            >
                              Accept
                            </button>
                            <button 
                              onClick={() => handleRejectBooking(req.id)}
                              className="flex-1 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-[10px] font-bold transition-all"
                            >
                              Decline
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* GPS & Location update simulator panel */}
                  <div className="p-3.5 bg-slate-900 border border-slate-800 rounded-2xl space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold block">Live GPS Simulation</span>
                      <Navigation className="w-4 h-4 text-emerald-500 animate-bounce" />
                    </div>

                    <div className="space-y-1.5">
                      <span className="text-[9px] font-bold text-slate-400 block uppercase">Current Sim Coordinates</span>
                      <p className="text-xs font-mono font-bold text-indigo-400">{liveLocation}</p>
                      <p className="text-[10px] text-slate-300 italic">"{tourStatusMsg}"</p>
                    </div>

                    <button 
                      onClick={handleGpsUpdate}
                      className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-[11px] font-bold rounded-xl transition-all"
                    >
                      Simulate Arrival at Taj East Entrance
                    </button>
                  </div>

                  {/* License & verified certificates listed explicitly for Presentation validation */}
                  <div className="p-3.5 bg-slate-900 border border-slate-800 rounded-2xl space-y-2">
                    <span className="text-xs font-bold block">Verification Documents</span>
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center text-[10px]">
                        <span className="text-slate-400">Govt ID Status:</span>
                        <span className="text-emerald-400 font-bold">APPROVED (GOV-IND-4820)</span>
                      </div>
                      <div className="flex justify-between items-center text-[10px]">
                        <span className="text-slate-400">Taj Heritage Permit:</span>
                        <span className="text-emerald-400 font-bold">ACTIVE (PERMIT-982)</span>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Footer Exit guide portal */}
                <div className="pt-2 shrink-0">
                  <button 
                    onClick={() => setScreen("role")}
                    className="w-full py-3 bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-300 text-xs font-bold rounded-2xl transition-all"
                  >
                    Exit Guide Module
                  </button>
                </div>

              </div>
            )}

            {/* 8. SCREEN: Booking screen Detail */}
            {screen === "booking-screen" && (
              <div className="absolute inset-0 flex flex-col justify-between p-6 overflow-y-auto">
                <div className="space-y-4">
                  {/* Header */}
                  <button 
                    onClick={() => setScreen("customer-main")}
                    className="flex items-center gap-1.5 text-xs font-semibold mb-4 text-slate-400 hover:text-slate-200"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Home</span>
                  </button>

                  <h3 className="text-xl font-bold">{selectedDestination.name}</h3>
                  <p className="text-xs text-slate-400">{selectedDestination.description}</p>

                  <div className="p-3.5 bg-slate-900 border border-slate-800 rounded-2xl space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span>Vibe category:</span>
                      <span className="text-emerald-400 font-bold uppercase">{selectedDestination.category}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span>Best Season:</span>
                      <span className="text-indigo-400 font-bold">{selectedDestination.season}</span>
                    </div>
                  </div>

                  {/* Form input selection */}
                  <div className="space-y-3.5">
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 block mb-1.5 uppercase">Select Tour Date</label>
                      <input 
                        type="date" 
                        value={bookingDate}
                        onChange={(e) => setBookingDate(e.target.value)}
                        className="w-full p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-slate-400 block mb-1.5 uppercase">Number of Travelers</label>
                      <input 
                        type="number" 
                        value={touristsCount}
                        onChange={(e) => setTouristsCount(parseInt(e.target.value) || 1)}
                        className="w-full p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-slate-400 block mb-1.5 uppercase font-sans">Choose Heritage Package</label>
                      <div className="space-y-2">
                        {MOCK_PACKAGES.map((pkg) => (
                          <div 
                            key={pkg.id}
                            onClick={() => setSelectedPackage(pkg)}
                            className={`p-3 rounded-xl border cursor-pointer transition-all ${
                              selectedPackage.id === pkg.id 
                                ? "bg-indigo-950/40 border-indigo-500 shadow" 
                                : "bg-slate-900/60 border-slate-850 hover:border-slate-800"
                            }`}
                          >
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-xs font-bold">{pkg.title}</span>
                              <span className="text-xs font-black text-emerald-400">${pkg.price}/tourist</span>
                            </div>
                            <span className="text-[9px] text-slate-400 block">{pkg.duration} • {pkg.highlights.slice(0,2).join(", ")}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Price Calculation Summary */}
                  <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-2">
                    <div className="flex justify-between items-center text-xs text-slate-400">
                      <span>Package: {selectedPackage.title}</span>
                      <span>${selectedPackage.price} x {touristsCount}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs font-bold text-white border-t border-slate-850 pt-2">
                      <span>Total Estimated Cost:</span>
                      <span className="text-emerald-400 text-sm">${calculateTotalCost()}</span>
                    </div>
                  </div>

                </div>

                {/* Footer confirm booking */}
                <div className="pt-4 shrink-0">
                  <button 
                    onClick={handleCreateBooking}
                    className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-2xl text-xs tracking-wider uppercase transition-all shadow shadow-emerald-500/20 active:scale-95"
                  >
                    Confirm Vetted Guide Booking
                  </button>
                </div>
              </div>
            )}

            {/* 9. SCREEN: Guide Profile Details (Customer View) */}
            {screen === "guide-profile-view" && (
              <div className="absolute inset-0 flex flex-col justify-between p-6 overflow-y-auto">
                <div className="space-y-4">
                  {/* Header */}
                  <button 
                    onClick={() => setScreen("customer-main")}
                    className="flex items-center gap-1.5 text-xs font-semibold mb-4 text-slate-400 hover:text-slate-200"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Explore</span>
                  </button>

                  <div className="text-center py-2">
                    <img src={selectedGuide.photo} alt={selectedGuide.name} className="w-20 h-20 rounded-full object-cover mx-auto border-2 border-emerald-400" />
                    <div className="flex items-center justify-center gap-1 mt-2">
                      <h4 className="text-base font-bold">{selectedGuide.name}</h4>
                      {selectedGuide.isVerified && <ShieldCheck className="w-4 h-4 text-emerald-500" />}
                    </div>
                    <p className="text-xs text-slate-400">{selectedGuide.experience} Years Active Local Guide</p>
                  </div>

                  <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-2.5">
                    <h5 className="text-xs font-bold uppercase tracking-wider text-indigo-400">Direct Vetted Credentials</h5>
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center text-[11px]">
                        <span className="text-slate-400">Govt ID status:</span>
                        <span className="text-white font-mono">{selectedGuide.governmentId}</span>
                      </div>
                      <div className="flex justify-between items-center text-[11px]">
                        <span className="text-slate-400">License Badge:</span>
                        <span className="text-white font-mono">{selectedGuide.licenseNumber}</span>
                      </div>
                      <div className="flex justify-between items-center text-[11px]">
                        <span className="text-slate-400">Guiding rate:</span>
                        <span className="text-emerald-400 font-black">${selectedGuide.pricePerDay}/Day</span>
                      </div>
                    </div>
                  </div>

                  {/* Languages known block */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Spoken Languages</span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedGuide.languages.map((l, idx) => (
                        <span key={idx} className="text-xs font-medium bg-slate-800 text-slate-200 px-3 py-1 rounded-full border border-slate-700/50">
                          {l}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Areas covered */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Vetted Areas Covered</span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedGuide.areasCovered.map((a, idx) => (
                        <span key={idx} className="text-xs font-medium bg-slate-800/60 text-indigo-400 px-3 py-1 rounded-full border border-indigo-500/10">
                          📍 {a}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Confirm Book guide */}
                <div className="pt-4 shrink-0">
                  <button 
                    onClick={() => {
                      setScreen("booking-screen");
                    }}
                    className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-2xl text-xs tracking-wider uppercase transition-all shadow active:scale-95"
                  >
                    Instant Schedule Booking
                  </button>
                </div>
              </div>
            )}

            {/* 10. SCREEN: AI Smart Planner */}
            {screen === "ai-planner" && (
              <div className="absolute inset-0 flex flex-col justify-between p-6 overflow-y-auto">
                <div className="space-y-4">
                  {/* Header */}
                  <button 
                    onClick={() => setScreen("customer-main")}
                    className="flex items-center gap-1.5 text-xs font-semibold mb-4 text-slate-400 hover:text-slate-200"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Home</span>
                  </button>

                  <div className="flex items-center space-x-2 mb-2">
                    <Sparkles className="w-5 h-5 text-indigo-400 animate-pulse" />
                    <h3 className="text-lg font-bold">AI Smart Co-pilot Planner</h3>
                  </div>
                  <p className="text-xs text-slate-400 leading-normal">
                    Enter details to prompt the server-side Gemini 3.5 Model to formulate a structured tourist guide.
                  </p>

                  <div className="space-y-3">
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 block mb-1">Destination Name</label>
                      <input 
                        type="text" 
                        value={planDestination}
                        onChange={(e) => setPlanDestination(e.target.value)}
                        className="w-full p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs focus:outline-none text-white font-semibold"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[10px] font-bold text-slate-400 block mb-1">Duration Days</label>
                        <input 
                          type="number" 
                          value={planDuration}
                          onChange={(e) => setPlanDuration(e.target.value)}
                          className="w-full p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs focus:outline-none text-white font-semibold"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-slate-400 block mb-1">Budget Type</label>
                        <select 
                          value={planBudget}
                          onChange={(e) => setPlanBudget(e.target.value)}
                          className="w-full p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs focus:outline-none text-white font-semibold"
                        >
                          <option>Low Budget</option>
                          <option>Medium Budget</option>
                          <option>Premium</option>
                          <option>Luxury</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-slate-400 block mb-1">Primary Passions & Interests</label>
                      <input 
                        type="text" 
                        placeholder="Food safari, old temples, beaches"
                        value={planInterests}
                        onChange={(e) => setPlanInterests(e.target.value)}
                        className="w-full p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs focus:outline-none text-white font-semibold"
                      />
                    </div>
                  </div>

                  {/* AI Response Display Block */}
                  {plannerLoading ? (
                    <div className="p-6 text-center bg-slate-900 rounded-2xl border border-slate-800 animate-pulse space-y-2">
                      <Sparkles className="w-6 h-6 text-indigo-400 animate-spin mx-auto" />
                      <span className="text-xs font-mono text-slate-400 block">Formulating optimized heritage path...</span>
                    </div>
                  ) : aiPlanResult ? (
                    <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-3">
                      <div className="border-b border-slate-850 pb-2">
                        <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-wider block">Generated Itinerary</span>
                        <h4 className="text-xs font-bold text-white">{aiPlanResult.tripName}</h4>
                        <p className="text-[10px] text-slate-400 mt-1">{aiPlanResult.summary}</p>
                      </div>

                      <div className="space-y-2.5">
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">Daily Itinerary Schedule</span>
                        {aiPlanResult.dailyItinerary?.map((day: any, idx: number) => (
                          <div key={idx} className="p-2.5 bg-slate-950/60 rounded-xl border border-slate-850">
                            <span className="text-[10px] font-extrabold text-emerald-400 block">Day {day.day}: {day.title}</span>
                            <div className="mt-1 space-y-1.5">
                              {day.activities?.map((act: any, i: number) => (
                                <p key={i} className="text-[10px] text-slate-300 leading-snug">
                                  <strong>{act.time}</strong> - {act.activity} ({act.locationName})
                                </p>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="space-y-1 pt-2 border-t border-slate-850">
                        <span className="text-[9px] font-bold text-slate-400 uppercase block">Essentials to pack</span>
                        <div className="flex flex-wrap gap-1">
                          {aiPlanResult.packingList?.map((p: string, i: number) => (
                            <span key={i} className="text-[9px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-md">{p}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : null}

                </div>

                {/* Trigger button */}
                <div className="pt-4 shrink-0">
                  <button 
                    onClick={handleAIPlan}
                    className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-2xl text-xs tracking-wider uppercase transition-all shadow active:scale-95"
                  >
                    Compile Custom AI Itinerary
                  </button>
                </div>
              </div>
            )}

            {/* 11. SCREEN: AI Destination Recommender */}
            {screen === "ai-recommender" && (
              <div className="absolute inset-0 flex flex-col justify-between p-6 overflow-y-auto">
                <div className="space-y-4">
                  {/* Header */}
                  <button 
                    onClick={() => setScreen("customer-main")}
                    className="flex items-center gap-1.5 text-xs font-semibold mb-4 text-slate-400 hover:text-slate-200"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Home</span>
                  </button>

                  <div className="flex items-center space-x-2 mb-2">
                    <Compass className="w-5 h-5 text-emerald-400 animate-pulse" />
                    <h3 className="text-lg font-bold">AI Destination Recommender</h3>
                  </div>
                  <p className="text-xs text-slate-400 leading-normal">
                    Enter your vacation style preferences and let the AI find matching global cities.
                  </p>

                  <div className="space-y-3.5">
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 block mb-1">Preferred Travel Vibe</label>
                      <select 
                        value={recStyle}
                        onChange={(e) => setRecStyle(e.target.value)}
                        className="w-full p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs focus:outline-none text-white font-semibold"
                      >
                        <option>Adventure</option>
                        <option>Tropical Beaches</option>
                        <option>Mountain Solitude</option>
                        <option>Historical Ruins</option>
                        <option>Modern Nightlife</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[10px] font-bold text-slate-400 block mb-1">Region Vibe</label>
                        <input 
                          type="text" 
                          value={recRegion}
                          onChange={(e) => setRecRegion(e.target.value)}
                          className="w-full p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs focus:outline-none text-white font-semibold"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-slate-400 block mb-1">Budget Class</label>
                        <select 
                          value={recBudget}
                          onChange={(e) => setRecBudget(e.target.value)}
                          className="w-full p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs focus:outline-none text-white font-semibold"
                        >
                          <option>Low Budget</option>
                          <option>Medium Budget</option>
                          <option>Premium</option>
                          <option>Luxury</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Recommendations response */}
                  {recLoading ? (
                    <div className="p-6 text-center bg-slate-900 rounded-2xl border border-slate-800 animate-pulse space-y-2">
                      <Sparkles className="w-6 h-6 text-indigo-400 animate-spin mx-auto" />
                      <span className="text-xs font-mono text-slate-400 block">Correlating spatial database...</span>
                    </div>
                  ) : aiRecResults.length > 0 ? (
                    <div className="space-y-3">
                      {aiRecResults.map((rec: any, idx: number) => (
                        <div key={idx} className="p-3 bg-slate-900 border border-slate-800 rounded-2xl space-y-2">
                          <div className="flex justify-between items-center">
                            <h4 className="text-xs font-bold text-white">{rec.name}, {rec.country}</h4>
                            <span className="text-[9px] font-black text-emerald-400">Match: {rec.matchingScore}%</span>
                          </div>
                          <p className="text-[10px] text-slate-400 leading-relaxed">{rec.description}</p>
                          <div className="flex justify-between items-center text-[9px] pt-1 border-t border-slate-850 text-indigo-400">
                            <span>Vibe: {rec.vibe}</span>
                            <span>Est. Daily cost: {rec.estimatedDailyCost}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : null}

                </div>

                <div className="pt-4 shrink-0">
                  <button 
                    onClick={handleAICorrelation}
                    className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-2xl text-xs tracking-wider uppercase transition-all shadow active:scale-95"
                  >
                    Analyze Best Matches
                  </button>
                </div>
              </div>
            )}

            {/* 12. SCREEN: Travel Checklist */}
            {screen === "checklist" && (
              <div className="absolute inset-0 flex flex-col justify-between p-6 overflow-y-auto">
                <div className="space-y-4">
                  <button 
                    onClick={() => setScreen("customer-main")}
                    className="flex items-center gap-1.5 text-xs font-semibold mb-4 text-slate-400 hover:text-slate-200"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Home</span>
                  </button>

                  <div className="flex items-center space-x-2">
                    <CheckSquare className="w-5 h-5 text-amber-500" />
                    <h3 className="text-lg font-bold">Travel Preparations Checklist</h3>
                  </div>

                  {/* Add item */}
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      placeholder="Add travel gear or document task..." 
                      value={newChecklistText}
                      onChange={(e) => setNewChecklistText(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && addChecklistItem()}
                      className="flex-1 p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs focus:outline-none"
                    />
                    <button 
                      onClick={addChecklistItem}
                      className="p-2.5 bg-indigo-600 text-white rounded-xl"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Checklist display */}
                  <div className="space-y-2 max-h-[360px] overflow-y-auto pr-1">
                    {checklist.map((item) => (
                      <div 
                        key={item.id}
                        className="flex items-center justify-between p-3 bg-slate-900/60 rounded-xl border border-slate-850"
                      >
                        <div 
                          onClick={() => toggleChecklist(item.id)}
                          className="flex items-center gap-3 cursor-pointer flex-1"
                        >
                          {item.completed ? (
                            <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                          ) : (
                            <div className="w-4 h-4 rounded border border-slate-600 shrink-0" />
                          )}
                          <span className={`text-xs ${item.completed ? "line-through text-slate-500" : "text-slate-200"}`}>
                            {item.text}
                          </span>
                        </div>
                        <button 
                          onClick={() => deleteChecklistItem(item.id)}
                          className="p-1 text-slate-500 hover:text-rose-500"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>

                </div>
              </div>
            )}

            {/* 13. SCREEN: Travel Journal */}
            {screen === "journal" && (
              <div className="absolute inset-0 flex flex-col justify-between p-6 overflow-y-auto">
                <div className="space-y-4">
                  <button 
                    onClick={() => setScreen("customer-main")}
                    className="flex items-center gap-1.5 text-xs font-semibold mb-4 text-slate-400 hover:text-slate-200"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Home</span>
                  </button>

                  <div className="flex items-center space-x-2">
                    <BookOpen className="w-5 h-5 text-teal-400" />
                    <h3 className="text-lg font-bold">My Personal Travel Journal</h3>
                  </div>

                  {/* Form to log memo */}
                  <div className="p-3.5 bg-slate-900/60 border border-slate-800 rounded-2xl space-y-3">
                    <span className="text-[10px] font-bold text-slate-400 block uppercase">Log New Adventure Memory</span>
                    
                    <input 
                      type="text" 
                      placeholder="Title of memory..." 
                      value={newJournalTitle}
                      onChange={(e) => setNewJournalTitle(e.target.value)}
                      className="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-850 text-xs focus:outline-none"
                    />

                    <div className="grid grid-cols-2 gap-2">
                      <input 
                        type="text" 
                        placeholder="Location (e.g. Agra)" 
                        value={newJournalLocation}
                        onChange={(e) => setNewJournalLocation(e.target.value)}
                        className="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-850 text-xs focus:outline-none"
                      />
                      <button 
                        onClick={addJournalEntry}
                        className="py-2.5 bg-emerald-600 text-white rounded-lg text-xs font-bold"
                      >
                        Log Entry
                      </button>
                    </div>

                    <textarea 
                      placeholder="Write your notes here..." 
                      value={newJournalNotes}
                      onChange={(e) => setNewJournalNotes(e.target.value)}
                      rows={2}
                      className="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-850 text-xs focus:outline-none"
                    />
                  </div>

                  {/* List entries */}
                  <div className="space-y-3.5">
                    {journal.map((j) => (
                      <div key={j.id} className="p-3.5 bg-slate-900 border border-slate-850 rounded-2xl space-y-2">
                        <div className="flex justify-between items-center">
                          <h4 className="text-xs font-bold text-white">{j.title}</h4>
                          <span className="text-[9px] text-slate-500">{j.date}</span>
                        </div>
                        <p className="text-[10px] text-slate-400 font-semibold flex items-center gap-1">
                          📍 {j.location}
                        </p>
                        <p className="text-[11px] text-slate-300 leading-relaxed">{j.notes}</p>
                        {j.photos.length > 0 && (
                          <div className="flex gap-2">
                            {j.photos.map((p, idx) => (
                              <img key={idx} src={p} alt="Journal photo" className="w-full h-24 object-cover rounded-lg border border-slate-800" />
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                </div>
              </div>
            )}

            {/* 14. SCREEN: Travel Expense Manager */}
            {screen === "expense-calc" && (
              <div className="absolute inset-0 flex flex-col justify-between p-6 overflow-y-auto">
                <div className="space-y-4">
                  <button 
                    onClick={() => setScreen("customer-main")}
                    className="flex items-center gap-1.5 text-xs font-semibold mb-4 text-slate-400 hover:text-slate-200"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Home</span>
                  </button>

                  <div className="flex items-center space-x-2">
                    <DollarSign className="w-5 h-5 text-sky-400" />
                    <h3 className="text-lg font-bold">Expense calculator</h3>
                  </div>

                  {/* Expense quick summary */}
                  <div className="p-4 bg-gradient-to-br from-slate-900 to-sky-950 border border-sky-500/20 rounded-2xl flex justify-between items-center">
                    <div>
                      <span className="text-[9px] font-bold text-sky-400 uppercase tracking-widest block">Total Trip Expenses</span>
                      <h3 className="text-2xl font-black mt-0.5 text-white">
                        ${expenses.reduce((acc, e) => acc + e.amount, 0)}
                      </h3>
                    </div>
                  </div>

                  {/* Add expense form */}
                  <div className="p-3.5 bg-slate-900 border border-slate-850 rounded-2xl space-y-3">
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">Log Expense</span>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <input 
                        type="text" 
                        placeholder="Item (e.g. Lunch)" 
                        value={newExpenseTitle}
                        onChange={(e) => setNewExpenseTitle(e.target.value)}
                        className="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-850 text-xs focus:outline-none"
                      />
                      <input 
                        type="number" 
                        placeholder="Amount USD ($)" 
                        value={newExpenseAmount}
                        onChange={(e) => setNewExpenseAmount(e.target.value)}
                        className="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-850 text-xs focus:outline-none"
                      />
                    </div>

                    <div className="flex gap-2">
                      <select 
                        value={newExpenseCategory}
                        onChange={(e) => setNewExpenseCategory(e.target.value)}
                        className="flex-1 p-2.5 rounded-lg bg-slate-950 border border-slate-850 text-xs focus:outline-none"
                      >
                        <option>Food</option>
                        <option>Transport</option>
                        <option>Hotel</option>
                        <option>Sightseeing</option>
                        <option>Others</option>
                      </select>

                      <button 
                        onClick={addExpense}
                        className="px-5 bg-sky-600 text-white font-bold rounded-lg text-xs"
                      >
                        Add
                      </button>
                    </div>
                  </div>

                  {/* Expenses log list */}
                  <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                    {expenses.map((e) => (
                      <div key={e.id} className="p-3 bg-slate-900/60 border border-slate-850 rounded-xl flex items-center justify-between">
                        <div>
                          <span className="text-xs font-bold block">{e.title}</span>
                          <span className="text-[9px] text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded-md mt-1 inline-block">
                            {e.category}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-black text-sky-400">${e.amount}</span>
                          <button onClick={() => deleteExpense(e.id)} className="text-slate-500 hover:text-rose-500">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              </div>
            )}

            {/* 15. SCREEN: Currency Converter */}
            {screen === "currency-conv" && (
              <div className="absolute inset-0 flex flex-col justify-between p-6 overflow-y-auto">
                <div className="space-y-4">
                  <button 
                    onClick={() => setScreen("customer-main")}
                    className="flex items-center gap-1.5 text-xs font-semibold mb-4 text-slate-400 hover:text-slate-200"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Home</span>
                  </button>

                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5 text-purple-400" />
                    <h3 className="text-lg font-bold">Currency Converter</h3>
                  </div>

                  <div className="p-4 bg-slate-900 border border-slate-850 rounded-2xl space-y-4">
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 block mb-1">From Currency</label>
                      <select 
                        value={currFrom}
                        onChange={(e) => setCurrFrom(e.target.value)}
                        className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-850 text-xs focus:outline-none"
                      >
                        {MOCK_CURRENCIES.map(c => <option key={c.code} value={c.code}>{c.code} - {c.name}</option>)}
                      </select>
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-slate-400 block mb-1">To Currency</label>
                      <select 
                        value={currTo}
                        onChange={(e) => setCurrTo(e.target.value)}
                        className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-850 text-xs focus:outline-none"
                      >
                        {MOCK_CURRENCIES.map(c => <option key={c.code} value={c.code}>{c.code} - {c.name}</option>)}
                      </select>
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-slate-400 block mb-1">Convert Amount</label>
                      <input 
                        type="number" 
                        value={currAmount}
                        onChange={(e) => setCurrAmount(e.target.value)}
                        className="w-full p-3 rounded-xl bg-slate-950 border border-slate-850 text-xs focus:outline-none font-bold"
                      />
                    </div>
                  </div>

                  {/* Calculated result badge */}
                  {convertedAmount !== null && (
                    <div className="p-4 bg-gradient-to-br from-indigo-950 to-slate-900 rounded-2xl border border-indigo-500/20 text-center">
                      <span className="text-[9px] font-bold text-indigo-400 uppercase tracking-widest block">Calculated Value</span>
                      <h3 className="text-2xl font-black text-white mt-1">
                        {MOCK_CURRENCIES.find(c => c.code === currTo)?.symbol} {convertedAmount}
                      </h3>
                      <span className="text-[8px] text-slate-400 block mt-1">Rates updated live periodically</span>
                    </div>
                  )}

                </div>
              </div>
            )}

          </MobileFrame>
        </div>

        {/* RIGHT COLUMN: Premium AI travel checklist glass card (visible on desktop) */}
        <div className="hidden lg:flex lg:col-span-3 flex-col gap-5">
          {/* AI Smart Planner card */}
          <div className="backdrop-blur-xl bg-white/60 border border-white/40 p-6 rounded-[2.5rem] shadow-xl">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-slate-800 tracking-tight">AI Smart Planner</span>
            </div>
            
            <p className="text-xs text-slate-600 mb-4 leading-relaxed">
              I've curated a personalized 3-day trip to <strong>Bali</strong> based on your interest in nature and temples. Estimated cost: <strong>$450</strong>.
            </p>

            <button 
              onClick={() => {
                setScreen("ai-planner");
                setPlanDestination("Bali, Indonesia");
                setPlanInterests("Nature and historic temples");
                handleAIPlan();
              }}
              className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold shadow-md transition-all active:scale-95"
            >
              Review Itinerary
            </button>
          </div>

          {/* Quick weather display widget */}
          <div className="backdrop-blur-lg bg-white/45 border border-white/30 p-5 rounded-[2rem] shadow-md flex items-center justify-between">
            <div>
              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block">Current Local Vibe</span>
              <span className="text-lg font-black text-slate-800">{weather.temp}°C</span>
              <span className="text-[10px] font-medium text-slate-600 block">{weather.condition}</span>
            </div>
            <CloudSun className="w-10 h-10 text-amber-500 animate-pulse" />
          </div>
        </div>

      </div>

      {/* QR scanner overlay modal */}
      {qrOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-sm w-full space-y-4 text-center">
            <QrCode className="w-16 h-16 text-emerald-400 mx-auto animate-pulse" />
            <h4 className="text-base font-bold text-white">QR Landmark Scanner</h4>
            <p className="text-xs text-slate-300 leading-normal">{qrResult}</p>
            
            <button 
              onClick={() => {
                setQrOpen(false);
                setQrResult(null);
              }}
              className="w-full py-2.5 bg-indigo-600 text-white text-xs font-semibold rounded-xl"
            >
              Dismiss Scanner
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
