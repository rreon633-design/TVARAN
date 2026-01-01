
import { GoogleGenAI } from "@google/genai";

export const chatWithCortex = async (prompt: string, history: {role: 'user' | 'model', parts: {text: string}[]}[]) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const chat = ai.chats.create({
    model: 'gemini-3-flash-preview',
    history: history,
    config: {
      systemInstruction: `You are the TVARAN Local Cortex, a built-in AI for the TVARAN browser. 
      You are highly efficient, private, and smart. 
      Users use you for page summarization, coding help, and general Q&A. 
      Keep answers concise and powerful. 
      Embody the 'Storm' brand: fast and intelligent.`,
    }
  });

  try {
    const response = await chat.sendMessage({ message: prompt });
    return response.text;
  } catch (error) {
    console.error("Cortex Error:", error);
    return "The Storm encountered an error. Please try again.";
  }
};

export const summarizePage = async (pageTitle: string, pageUrl: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Summarize this page in 3 bullet points. Title: ${pageTitle}, URL: ${pageUrl}. 
    Imagine the content since you don't have a direct scraper in this demo, but use the title and context of being a high-end AI.`,
  });
  return response.text;
};

export const translatePage = async (text: string, targetLanguage: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Translate the following text to ${targetLanguage}. Keep the tone professional.
    
    Text: "${text}"`,
  });
  return response.text;
};
