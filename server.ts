import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-loaded Gemini AI client to prevent startup crashes if GEMINI_API_KEY is not defined yet
let aiClient: GoogleGenAI | null = null;

function getAIClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is required. Please set it in the Settings -> Secrets panel.");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// 1. AI Travel Assistant Chatbot Endpoint
app.post("/api/travel-assistant", async (req, res) => {
  try {
    const { messages, context } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Invalid request. 'messages' array is required." });
    }

    const ai = getAIClient();

    // Map message history to contents format
    // Each message in history is { role: 'user' | 'model', content: string }
    const contents = messages.map((msg) => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content }],
    }));

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents,
      config: {
        systemInstruction: `You are a professional, friendly, and expert local travel guide and AI Travel Assistant. 
Your goal is to help tourists explore places like a local. 
Provide highly descriptive, safe, and exciting insights about destinations, local cuisines, customs, safety tips, and itineraries.
Keep your response conversational, concise, and structured with bullet points.
Current Context context: ${JSON.stringify(context || {})}`,
        temperature: 0.7,
      },
    });

    return res.json({ response: response.text });
  } catch (error: any) {
    console.error("Error in /api/travel-assistant:", error);
    return res.status(500).json({ error: error.message || "An error occurred with the AI assistant." });
  }
});

// 2. AI Trip Planner Endpoint (Structured Output)
app.post("/api/trip-planner", async (req, res) => {
  try {
    const { destination, budget, duration, companion, interests } = req.body;
    if (!destination || !duration) {
      return res.status(400).json({ error: "Destination and duration are required." });
    }

    const ai = getAIClient();

    const prompt = `Plan a highly-tailored, incredible ${duration}-day trip to ${destination}. 
Budget style: ${budget || "Medium Budget"}. 
Traveling with: ${companion || "Solo"}. 
Primary interests: ${interests || "General sightseeing, local food"}.
Provide a daily detailed itinerary, travel tips, budget breakdown, packing essentials, and top guide recommendations.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        systemInstruction: "You are an expert AI Trip Planner. Generate a detailed, realistic travel itinerary in JSON format matching the schema provided.",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            tripName: { type: Type.STRING },
            summary: { type: Type.STRING },
            estimatedTotalCost: { type: Type.STRING },
            packingList: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            localTips: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            dailyItinerary: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  day: { type: Type.INTEGER },
                  title: { type: Type.STRING },
                  activities: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        time: { type: Type.STRING },
                        activity: { type: Type.STRING },
                        description: { type: Type.STRING },
                        locationName: { type: Type.STRING },
                        cost: { type: Type.STRING }
                      },
                      required: ["time", "activity", "description", "locationName"]
                    }
                  }
                },
                required: ["day", "title", "activities"]
              }
            },
            recommendedGuides: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  type: { type: Type.STRING },
                  description: { type: Type.STRING },
                  avgPrice: { type: Type.STRING }
                }
              }
            }
          },
          required: ["tripName", "summary", "estimatedTotalCost", "packingList", "dailyItinerary", "localTips"]
        }
      }
    });

    const parsedData = JSON.parse(response.text || "{}");
    return res.json(parsedData);
  } catch (error: any) {
    console.error("Error in /api/trip-planner:", error);
    return res.status(500).json({ error: error.message || "An error occurred with the AI Trip Planner." });
  }
});

// 3. AI Destination Recommender
app.post("/api/destination-recommender", async (req, res) => {
  try {
    const { travelStyle, budget, region } = req.body;

    const ai = getAIClient();

    const prompt = `Based on a travel style of "${travelStyle || "Adventure"}", budget level "${budget || "Premium"}", and preferred region/vibe "${region || "Anywhere"}", recommend 4 incredible destinations. Provide descriptive headers, a short review, key highlights, and top nearby attraction.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        systemInstruction: "You are an elite travel agent and geographic recommender. Suggest unique destinations as JSON.",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              country: { type: Type.STRING },
              description: { type: Type.STRING },
              bestTimeToVisit: { type: Type.STRING },
              vibe: { type: Type.STRING },
              matchingScore: { type: Type.INTEGER },
              highlights: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              estimatedDailyCost: { type: Type.STRING }
            },
            required: ["name", "country", "description", "vibe", "matchingScore", "highlights"]
          }
        }
      }
    });

    const parsedData = JSON.parse(response.text || "[]");
    return res.json(parsedData);
  } catch (error: any) {
    console.error("Error in /api/destination-recommender:", error);
    return res.status(500).json({ error: error.message || "An error occurred with AI Destination Recommendation." });
  }
});

// Start server and handle Vite middleware
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    // Serve index.html for SPA fallback
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
