import React, { useState, useEffect } from "react";
import { Battery, Wifi, Signal, Sun, Moon } from "lucide-react";

interface MobileFrameProps {
  children: React.ReactNode;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export default function MobileFrame({ children, isDarkMode, toggleDarkMode }: MobileFrameProps) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      setTime(`${hours}:${minutes} ${ampm}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center py-6 px-4">
      {/* Phone Case Bezel */}
      <div 
        id="phone-frame-container"
        className={`relative w-[390px] h-[800px] rounded-[50px] p-3 shadow-2xl transition-all duration-300 border-4 ${
          isDarkMode 
            ? "bg-slate-900 border-slate-700 shadow-emerald-950/20" 
            : "bg-slate-100 border-slate-300 shadow-slate-400/40"
        }`}
      >
        {/* Dynamic Highlight Edge */}
        <div className="absolute inset-[1px] rounded-[48px] border border-white/10 pointer-events-none" />

        {/* Outer buttons for simulation styling */}
        <div className="absolute left-[-10px] top-[140px] w-[6px] h-[40px] bg-slate-500 rounded-l-md" />
        <div className="absolute left-[-10px] top-[190px] w-[6px] h-[50px] bg-slate-500 rounded-l-md" />
        <div className="absolute left-[-10px] top-[250px] w-[6px] h-[50px] bg-slate-500 rounded-l-md" />
        <div className="absolute right-[-10px] top-[180px] w-[6px] h-[65px] bg-slate-500 rounded-r-md" />

        {/* Screen Area */}
        <div 
          className={`relative w-full h-full rounded-[40px] overflow-hidden flex flex-col transition-colors duration-300 ${
            isDarkMode ? "bg-slate-950 text-slate-100" : "bg-sky-50 text-slate-900"
          }`}
        >
          {/* Notched Status Bar */}
          <div className="h-10 px-6 flex items-center justify-between select-none z-50 text-xs font-medium shrink-0">
            {/* Clock */}
            <span className={isDarkMode ? "text-slate-300" : "text-slate-700"}>
              {time || "09:41 AM"}
            </span>

            {/* Dynamic island / Notch */}
            <div className="absolute left-1/2 -translate-x-1/2 top-1.5 w-28 h-5 bg-black rounded-full flex items-center justify-center shadow-inner z-50">
              <div className="w-2.5 h-2.5 bg-neutral-900 rounded-full ml-12" />
              <div className="w-1.5 h-1.5 bg-neutral-950 rounded-full ml-2" />
            </div>

            {/* Status indicators */}
            <div className="flex items-center gap-2">
              <Signal className={`w-3.5 h-3.5 ${isDarkMode ? "text-slate-300" : "text-slate-700"}`} />
              <Wifi className={`w-3.5 h-3.5 ${isDarkMode ? "text-slate-300" : "text-slate-700"}`} />
              <div className="flex items-center gap-1">
                <Battery className={`w-4 h-4 ${isDarkMode ? "text-slate-300" : "text-slate-700"}`} />
                <span className="text-[10px]">100%</span>
              </div>
            </div>
          </div>

          {/* Quick theme floating switch (simulates system slider toggling) */}
          <button
            onClick={toggleDarkMode}
            id="simulated-system-theme-toggle"
            title="Toggle Device Dark Mode"
            className={`absolute right-4 top-12 p-1.5 rounded-full z-40 transition-all shadow-md backdrop-blur-md ${
              isDarkMode 
                ? "bg-slate-800/80 text-amber-400 hover:bg-slate-700" 
                : "bg-white/80 text-indigo-600 hover:bg-slate-100"
            }`}
          >
            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Core App Viewport */}
          <div className="flex-1 w-full flex flex-col overflow-hidden relative">
            {children}
          </div>

          {/* Simulated Home Gesture Bar */}
          <div className="h-4 w-full flex items-center justify-center shrink-0 z-50 bg-transparent select-none">
            <div className={`w-28 h-1 rounded-full ${isDarkMode ? "bg-slate-700" : "bg-slate-300"}`} />
          </div>
        </div>
      </div>
    </div>
  );
}
