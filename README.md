# Tourist Guidance Mobile Application 🌍✈️

An elegant, fully-featured AI-Powered Tourist Guidance Mobile Application built with React 19, TypeScript, Vite, Tailwind CSS, Express, and Google Gen AI (Gemini).

This repository contains both the **Frontend React Application** (running inside a highly polished mobile mockup frame) and an **Express Backend** that securely handles AI trip planning and tourist recommendations using the Google Gen AI SDK.

---

## 🌟 Key Features

- **🎭 Dual Portal Experience:** Switch seamlessly between **Tourist** and **Tour Guide** views.
- **🗺️ AI Travel Planner & Recommender:** Custom itineraries and destination recommendations powered by server-side Gemini.
- **💬 Live Audio-Capable Chat:** Real-time chat with designated local guides, featuring built-in translation assistance.
- **📅 Smart Booking System:** Book custom tours with local guides, manage pending approvals, and view upcoming trips.
- **📊 Travel Expense Calculator:** Keep track of expenses grouped by category with a dynamic multi-currency converter.
- **📝 Packing Checklist & Journal:** Fully customizable checklists and a travel journal with rich text logs to save memories.
- **🔔 Live Notifications:** Responsive alert center with real-time updates on tour statuses and active messages.

---

## 🛠️ Tech Stack

- **Frontend:** React 19, TypeScript, Vite 6, Tailwind CSS 4, Motion, Lucide React
- **Backend:** Node.js, Express, tsx, esbuild
- **AI Integration:** `@google/genai` (Google Gemini SDK)

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)
- A **Gemini API Key** from Google AI Studio.

### Installation

1. Clone or download the repository files:
   ```bash
   git clone <your-repo-url>
   cd tourist-guidance-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory (based on `.env.example`):
   ```env
   GEMINI_API_KEY="your_actual_gemini_api_key_here"
   APP_URL="http://localhost:3000"
   ```

### Running the Application

To start the development server (which hosts both the React app and Express endpoints on port `3000`):
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:3000` to preview the app!

### Building for Production

To bundle the application into highly optimized production assets (compiles the React app into static files in `dist/` and compiles the server into a bundle):
```bash
npm run build
```

To run the built production application:
```bash
npm start
```

---

## 📂 Project Structure

```
├── assets/                  # Public visual resources and assets
├── src/
│   ├── components/
│   │   ├── MobileFrame.tsx         # The elegant iOS/Android frame wrapper
│   │   ├── SplashScreen.tsx        # Responsive entering screen
│   │   ├── LanguageSelection.tsx   # Localization and country configuration
│   │   └── RoleSelection.tsx       # Selection screen for Customer vs. Guide
│   ├── types.ts             # Strict TypeScript declarations
│   ├── mockData.ts          # Extracted tourism models and collections
│   ├── App.tsx              # Main UI navigation engine & component views
│   ├── index.css            # Tailwind global design system
│   └── main.tsx             # Entry-point boots React engine
├── index.html               # SPA entry template
├── server.ts                # Express backend & Vite Dev middleware
├── tsconfig.json            # Strict TypeScript configuration
└── vite.config.ts           # Bundler options
```

---

## 🔒 Security & API Integrity

The application utilizes a **Full-Stack Proxy Architecture** to protect sensitive credentials:
- All interactions with the Gemini API are proxied through server-side Express endpoints (`/api/chat`, `/api/generate-plan`, and `/api/recommend-destination`).
- No private API keys or configuration settings are ever exposed to the client-side bundle or browser inspect tools.

Enjoy your journey with **Tourist Guidance Mobile App**! 🗺️✨
