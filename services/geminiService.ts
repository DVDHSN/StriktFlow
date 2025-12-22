
import { GoogleGenAI } from "@google/genai";
import { TimerMode } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getFocusInsight(mode: TimerMode, completedSessions: number): Promise<string> {
  try {
    const prompt = `You are a minimalist focus coach. Provide a single, short (max 12 words), powerful focus tip or motivational insight for someone currently in ${mode} mode after completing ${completedSessions} focus sessions today. Keep it low-profile and sophisticated.`;
    
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        thinkingConfig: { thinkingBudget: 0 }
      }
    });

    return response.text?.trim() || "Stay centered in the present moment.";
  } catch (error) {
    console.error("Failed to fetch insight:", error);
    return "Focus is the art of subtraction.";
  }
}
