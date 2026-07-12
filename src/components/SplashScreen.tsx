import React, { useEffect } from "react";
import { Compass, Globe, PlaneTakeoff } from "lucide-react";

interface SplashScreenProps {
  onComplete: () => void;
  isDarkMode: boolean;
}

export default function SplashScreen({ onComplete, isDarkMode }: SplashScreenProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 4500); // Auto progress after 4.5s
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div 
      id="splash-screen-container"
      className={`absolute inset-0 flex flex-col items-center justify-between py-16 px-6 transition-colors duration-500 overflow-hidden ${
        isDarkMode 
          ? "bg-gradient-to-b from-slate-950 via-slate-900 to-indigo-950 text-slate-100" 
          : "bg-gradient-to-b from-sky-100 via-sky-50 to-emerald-50 text-slate-900"
      }`}
    >
      {/* Decorative Floating Clouds and Airplane */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Airplane Trajectory Animation */}
        <div className="absolute top-1/4 left-[-100px] animate-[bounce_6s_infinite] opacity-30">
          <PlaneTakeoff className="w-16 h-16 rotate-12 text-emerald-500" />
        </div>
        <div className="absolute top-1/3 right-10 w-24 h-8 bg-white/20 rounded-full blur-sm animate-[pulse_4s_infinite]" />
        <div className="absolute top-2/3 left-12 w-32 h-10 bg-white/10 rounded-full blur-md animate-[pulse_6s_infinite]" />
      </div>

      {/* Top Margin */}
      <div className="h-6" />

      {/* Center Animation Content */}
      <div className="flex flex-col items-center justify-center text-center z-10">
        {/* Icon Orbit container */}
        <div className="relative mb-8 flex items-center justify-center">
          {/* Outer glowing ripple circles */}
          <div className="absolute w-36 h-36 rounded-full border border-sky-400/30 animate-ping" />
          <div className="absolute w-28 h-28 rounded-full border border-emerald-400/20 animate-[pulse_2s_infinite]" />
          
          {/* Solid Core Icon */}
          <div className={`w-20 h-20 rounded-3xl flex items-center justify-center shadow-xl ${
            isDarkMode 
              ? "bg-gradient-to-br from-emerald-500 to-indigo-600 text-white shadow-emerald-500/20" 
              : "bg-gradient-to-br from-sky-400 to-emerald-500 text-white shadow-sky-500/30"
          }`}>
            <Compass className="w-10 h-10 animate-[spin_10s_linear_infinite]" />
          </div>
        </div>

        {/* App Title */}
        <h1 className="text-3xl font-bold tracking-tight font-sans">
          Terra<span className="text-emerald-500">Guide</span>
        </h1>
        
        {/* Subtitle tag */}
        <p className={`text-sm mt-3 font-medium ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
          Your AI Travel companion & Local Expert
        </p>
      </div>

      {/* Bottom Loading Progress Indicator */}
      <div className="w-full max-w-[240px] flex flex-col items-center gap-4 z-10">
        {/* Visual Progress bar */}
        <div className={`w-full h-1.5 rounded-full overflow-hidden ${isDarkMode ? "bg-slate-800" : "bg-slate-200"}`}>
          <div className="h-full bg-gradient-to-r from-sky-400 via-emerald-500 to-indigo-500 rounded-full animate-[shimmer_4s_ease-out_forwards]" style={{ width: "100%" }} />
        </div>

        {/* Dynamic Status Text */}
        <span className={`text-[11px] font-mono tracking-wider uppercase ${isDarkMode ? "text-slate-500" : "text-slate-400"}`}>
          Caching offline maps...
        </span>

        {/* Skip button for testers */}
        <button
          onClick={onComplete}
          className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide border transition-all ${
            isDarkMode 
              ? "bg-white/5 border-white/10 hover:bg-white/10 text-slate-300" 
              : "bg-slate-800/5 border-slate-900/10 hover:bg-slate-800/10 text-slate-700"
          }`}
        >
          Skip Intro
        </button>
      </div>

      {/* CSS Animation Keyframes Injector */}
      <style>{`
        @keyframes shimmer {
          0% { width: 0%; }
          30% { width: 45%; }
          70% { width: 85%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
}
