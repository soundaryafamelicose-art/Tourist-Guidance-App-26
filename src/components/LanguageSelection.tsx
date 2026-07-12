import React, { useState } from "react";
import { LANGUAGES } from "../mockData";
import { Check, Languages, ArrowRight } from "lucide-react";

interface LanguageSelectionProps {
  onComplete: (langCode: string) => void;
  isDarkMode: boolean;
}

export default function LanguageSelection({ onComplete, isDarkMode }: LanguageSelectionProps) {
  const [selectedLang, setSelectedLang] = useState("en");

  return (
    <div 
      id="language-screen"
      className="absolute inset-0 flex flex-col justify-between p-6 overflow-y-auto"
    >
      {/* Header */}
      <div className="flex flex-col items-center text-center mt-6">
        <div className={`p-3 rounded-2xl mb-4 ${isDarkMode ? "bg-slate-800 text-emerald-400" : "bg-sky-100 text-sky-600"}`}>
          <Languages className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold font-sans tracking-tight">Choose Language</h2>
        <p className={`text-xs mt-2 max-w-[240px] leading-relaxed ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
          Select your primary language for AI audio translation, local tours, and customer service.
        </p>
      </div>

      {/* Language Grid */}
      <div className="grid grid-cols-2 gap-3 my-6 max-h-[380px] overflow-y-auto pr-1">
        {LANGUAGES.map((lang) => {
          const isSelected = selectedLang === lang.code;
          return (
            <button
              key={lang.code}
              onClick={() => setSelectedLang(lang.code)}
              className={`flex items-center gap-3 p-3.5 rounded-2xl border text-left transition-all duration-200 relative overflow-hidden ${
                isSelected
                  ? isDarkMode
                    ? "bg-emerald-950/30 border-emerald-500 shadow-lg shadow-emerald-950/10"
                    : "bg-emerald-50 border-emerald-500 shadow-md shadow-emerald-100/40"
                  : isDarkMode
                  ? "bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-300"
                  : "bg-white border-slate-200 hover:border-slate-300 text-slate-800"
              }`}
            >
              {/* Flag Badge */}
              <span className="text-2xl filter drop-shadow-sm select-none">
                {lang.flag}
              </span>

              {/* Language Name */}
              <div className="flex flex-col">
                <span className="text-sm font-bold tracking-tight">
                  {lang.name}
                </span>
                <span className={`text-[10px] font-medium opacity-70 ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
                  {lang.nativeName}
                </span>
              </div>

              {/* Selected Checkmark overlay */}
              {isSelected && (
                <div className="absolute right-2 top-2 bg-emerald-500 text-white rounded-full p-0.5 shadow-md">
                  <Check className="w-3 h-3 stroke-[3px]" />
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Footer Continue Button */}
      <div className="flex flex-col gap-2 shrink-0">
        <button
          onClick={() => onComplete(selectedLang)}
          className={`w-full py-4 rounded-2xl font-semibold tracking-wide flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-95 ${
            isDarkMode 
              ? "bg-gradient-to-r from-emerald-500 to-indigo-600 text-white shadow-emerald-500/10 hover:brightness-110" 
              : "bg-gradient-to-r from-sky-500 to-emerald-500 text-white shadow-sky-500/20 hover:brightness-105"
          }`}
        >
          <span>Continue</span>
          <ArrowRight className="w-4 h-4" />
        </button>
        <span className={`text-[10px] text-center ${isDarkMode ? "text-slate-500" : "text-slate-400"}`}>
          You can change language anytime in settings.
        </span>
      </div>
    </div>
  );
}
