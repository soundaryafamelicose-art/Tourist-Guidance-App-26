import React from "react";
import { User, ShieldCheck, Landmark, MapPin } from "lucide-react";

interface RoleSelectionProps {
  onSelectRole: (role: "customer" | "guide") => void;
  isDarkMode: boolean;
}

export default function RoleSelection({ onSelectRole, isDarkMode }: RoleSelectionProps) {
  return (
    <div 
      id="role-selection-screen"
      className="absolute inset-0 flex flex-col justify-between p-6 overflow-y-auto"
    >
      {/* Top Header */}
      <div className="flex flex-col items-center text-center mt-6">
        <h2 className="text-2xl font-bold font-sans tracking-tight">Select Your Role</h2>
        <p className={`text-xs mt-2 max-w-[250px] leading-relaxed ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
          Join as a traveler to discover incredible sights, or register as a certified guide to host tours.
        </p>
      </div>

      {/* Role Option Cards */}
      <div className="flex flex-col gap-4 my-6">
        {/* Customer / Traveler Card */}
        <button
          onClick={() => onSelectRole("customer")}
          id="role-customer-btn"
          className={`flex flex-col items-center justify-center p-6 rounded-3xl border text-center transition-all duration-300 transform active:scale-95 group relative overflow-hidden ${
            isDarkMode 
              ? "bg-slate-900/60 border-slate-850 hover:bg-slate-800/80 hover:border-sky-500/50 shadow-lg shadow-black/10" 
              : "bg-white border-slate-200 hover:bg-slate-50 hover:border-sky-400 shadow-md shadow-slate-200/50"
          }`}
        >
          {/* Subtle Background Art pattern */}
          <div className="absolute right-[-10px] bottom-[-10px] opacity-10 group-hover:scale-110 transition-transform duration-300">
            <MapPin className="w-24 h-24 text-sky-500" />
          </div>

          <div className={`p-4 rounded-2xl mb-3 group-hover:scale-105 transition-transform ${
            isDarkMode ? "bg-sky-950 text-sky-400" : "bg-sky-100 text-sky-600"
          }`}>
            <User className="w-8 h-8" />
          </div>

          <h3 className="text-lg font-bold tracking-tight">Customer Portal</h3>
          <p className={`text-[11px] mt-1.5 max-w-[220px] ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
            Book local verified guides, chat with AI assistant, plan customized trips, and explore destinations.
          </p>

          <div className={`mt-4 text-xs font-semibold px-4 py-1.5 rounded-full ${
            isDarkMode ? "bg-slate-800 text-sky-400 group-hover:bg-slate-750" : "bg-sky-50 text-sky-600 group-hover:bg-sky-100"
          }`}>
            Explore as Traveler
          </div>
        </button>

        {/* Tourist Guide Card */}
        <button
          onClick={() => onSelectRole("guide")}
          id="role-guide-btn"
          className={`flex flex-col items-center justify-center p-6 rounded-3xl border text-center transition-all duration-300 transform active:scale-95 group relative overflow-hidden ${
            isDarkMode 
              ? "bg-slate-900/60 border-slate-850 hover:bg-slate-800/80 hover:border-emerald-500/50 shadow-lg shadow-black/10" 
              : "bg-white border-slate-200 hover:bg-slate-50 hover:border-emerald-500 shadow-md shadow-slate-200/50"
          }`}
        >
          {/* Subtle Background Art pattern */}
          <div className="absolute right-[-10px] bottom-[-10px] opacity-10 group-hover:scale-110 transition-transform duration-300">
            <Landmark className="w-24 h-24 text-emerald-500" />
          </div>

          <div className={`p-4 rounded-2xl mb-3 group-hover:scale-105 transition-transform ${
            isDarkMode ? "bg-emerald-950 text-emerald-400" : "bg-emerald-100 text-emerald-600"
          }`}>
            <ShieldCheck className="w-8 h-8" />
          </div>

          <h3 className="text-lg font-bold tracking-tight">Tourist Guide Portal</h3>
          <p className={`text-[11px] mt-1.5 max-w-[220px] ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
            Manage client bookings, update live GPS, review earnings, chat with travelers, and publish tour rates.
          </p>

          <div className={`mt-4 text-xs font-semibold px-4 py-1.5 rounded-full ${
            isDarkMode ? "bg-slate-800 text-emerald-400 group-hover:bg-slate-750" : "bg-emerald-50 text-emerald-600 group-hover:bg-emerald-100"
          }`}>
            Manage tours & earn
          </div>
        </button>
      </div>

      {/* Footer support credits */}
      <div className={`text-center mt-auto ${isDarkMode ? "text-slate-600" : "text-slate-400"}`}>
        <p className="text-[10px]">TerraGuide Verified Hosting Environment v3.1</p>
      </div>
    </div>
  );
}
