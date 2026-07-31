import express from "express";
import path from "path";
import { GoogleGenAI, Type } from "@google/genai";
import { createServer as createViteServer } from "vite";

const app = express();
const PORT = 3000;

app.use(express.json());

// Server-side Gemini client initialization
const getAiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("GEMINI_API_KEY environment variable is not set. Gemini API calls will fail.");
  }
  return new GoogleGenAI({
    apiKey: apiKey || "",
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
};

// Health Check API
app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    app: "Dhamma Wisdom",
    timestamp: new Date().toISOString(),
    hasApiKey: Boolean(process.env.GEMINI_API_KEY),
  });
});

// API 1: AI Quote Generator
app.post("/api/quotes/generate", async (req, res) => {
  try {
    const { authorStyle, category, contextPrompt, language = "en" } = req.body;

    const ai = getAiClient();

    const systemInstruction = `
You are a scholar of Buddhism, Indian philosophy, Dr. B.R. Ambedkar's thoughts, Emperor Ashoka's edicts, and classical wisdom.
Your task is to generate a deeply inspirational, wise, and peaceful quote inspired by the teachings and philosophy of ${authorStyle || "Dr. B.R. Ambedkar and Gautama Buddha"}.

CRITICAL CONTENT & SAFETY RULES:
1. NEVER fabricate authentic historical quotations or claim a historical figure literally spoke your generated text.
2. The generated quote MUST embody principles of: Education, Equality, Compassion, Rational Thought, Scientific Temper, Human Dignity, Democracy, or Mindfulness.
3. ABSOLUTELY NO political hate speech, religious extremism, division, fake history, offensive language, or violence.
4. Always provide the quote in English, and if possible, include Hindi and Marathi translations.
`;

    const prompt = `
Generate an AI-inspired quote on the category "${category || "Wisdom & Equality"}" in the spirit of ${authorStyle || "Dr. B.R. Ambedkar"}.
${contextPrompt ? `User's context/situation: "${contextPrompt}"` : ""}
Language requirement: Primary English with optional Hindi and Marathi translations.
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            quoteText: {
              type: Type.STRING,
              description: "Inspirational quote text in English",
            },
            hindiTranslation: {
              type: Type.STRING,
              description: "Translation in Hindi",
            },
            marathiTranslation: {
              type: Type.STRING,
              description: "Translation in Marathi",
            },
            authorStyle: {
              type: Type.STRING,
              description: "Author whose philosophy inspired this quote",
            },
            category: {
              type: Type.STRING,
              description: "Quote category",
            },
            historicalContextNote: {
              type: Type.STRING,
              description: "Short explanation of the philosophical foundation",
            },
            tags: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "3 to 4 relevant tags",
            },
          },
          required: ["quoteText", "authorStyle", "category", "historicalContextNote", "tags"],
        },
      },
    });

    if (!response.text) {
      return res.status(500).json({ error: "No response text received from AI" });
    }

    const parsed = JSON.parse(response.text.trim());

    const generatedQuote = {
      id: `ai-gen-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      text: parsed.quoteText,
      translations: {
        en: parsed.quoteText,
        hi: parsed.hindiTranslation || undefined,
        mr: parsed.marathiTranslation || undefined,
      },
      author: parsed.authorStyle || authorStyle || "Dr. B.R. Ambedkar",
      authorTitle: `Inspired by the teachings of ${parsed.authorStyle || authorStyle}`,
      category: parsed.category || category || "Wisdom",
      source: `AI Generated Wisdom — Inspired by ${parsed.authorStyle || authorStyle}`,
      isVerified: false,
      aiDisclaimer: `AI Inspired — Inspired by the philosophical teachings of ${parsed.authorStyle || authorStyle}`,
      historicalNote: parsed.historicalContextNote,
      tags: parsed.tags || ["AI Inspired", "Wisdom", "Reflection"],
    };

    res.json({ success: true, quote: generatedQuote });
  } catch (error: any) {
    console.error("Error generating quote:", error);
    res.status(500).json({
      error: "Failed to generate AI quote",
      details: error.message || String(error),
    });
  }
});

// API 2: AI Wisdom Reflection & Deep Analysis
app.post("/api/quotes/reflect", async (req, res) => {
  try {
    const { quoteText, author, category, source } = req.body;

    if (!quoteText) {
      return res.status(400).json({ error: "quoteText is required" });
    }

    const ai = getAiClient();

    const systemInstruction = `
You are an expert scholar, historian, and mentor in Buddhist philosophy, Constitutional ethics, and human self-development.
Analyze the provided quote and generate a structured deep reflection that helps students, civil service aspirants, researchers, and professionals understand and apply this wisdom in modern life.
`;

    const prompt = `
Quote: "${quoteText}"
Author: ${author || "Wise Teacher"}
Category: ${category || "General Wisdom"}
Source: ${source || "Classical Wisdom"}

Provide a deep, structured reflection containing:
1. Core Meaning: What is the fundamental lesson?
2. Historical & Philosophical Context: Why was this principle stated and how does it fit into the thinker's worldview?
3. Modern Application: How can a student, working professional, or citizen apply this today?
4. Key Takeaway: 1 short, powerful memorable sentence.
5. Reflection Question: A contemplative question for personal journaling or meditation.
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            coreMeaning: { type: Type.STRING },
            historicalContext: { type: Type.STRING },
            modernApplication: { type: Type.STRING },
            keyTakeaway: { type: Type.STRING },
            reflectionPrompt: { type: Type.STRING },
          },
          required: [
            "coreMeaning",
            "historicalContext",
            "modernApplication",
            "keyTakeaway",
            "reflectionPrompt",
          ],
        },
      },
    });

    if (!response.text) {
      return res.status(500).json({ error: "Failed to generate reflection" });
    }

    const reflection = JSON.parse(response.text.trim());
    res.json({ success: true, reflection });
  } catch (error: any) {
    console.error("Error generating reflection:", error);
    res.status(500).json({
      error: "Failed to generate AI reflection",
      details: error.message || String(error),
    });
  }
});

// API 3: Text-To-Speech API (Gemini TTS)
app.post("/api/quotes/tts", async (req, res) => {
  try {
    const { text, voiceName = "Kore" } = req.body;

    if (!text) {
      return res.status(400).json({ error: "Text is required for TTS" });
    }

    const ai = getAiClient();

    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-tts-preview",
      contents: [{ parts: [{ text: `Read calmly and clearly: ${text}` }] }],
      config: {
        responseModalities: ["AUDIO"],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName },
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;

    if (!base64Audio) {
      return res.status(500).json({ error: "No audio generated" });
    }

    res.json({ success: true, audioBase64: base64Audio });
  } catch (error: any) {
    console.error("TTS generation error:", error);
    res.status(500).json({
      error: "Failed to generate TTS audio",
      details: error.message || String(error),
    });
  }
});

// Start Express and Vite server
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
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Dhamma Wisdom server running on http://localhost:${PORT}`);
  });
}

startServer();
