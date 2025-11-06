import { GoogleGenAI } from "@google/genai";

// Vite will replace `process.env.API_KEY` with the actual value at build time.

let aiInstance: GoogleGenAI | null = null;

const getAiInstance = () => {
    if (!aiInstance) {
     const apiKey = import.meta.env.VITE_API_KEY;
        if (!apiKey) {
            // This provides a clear runtime error if the key wasn't set at build time.
            throw new Error("Gemini API key is not configured. Please ensure the API_KEY environment variable is set.");
        }
        aiInstance = new GoogleGenAI({ apiKey });
    }
    return aiInstance;
};


const systemInstruction = `
You are an expert web developer specializing in HTML and Tailwind CSS.
Your task is to generate a single, complete, and valid HTML file based on the user's prompt.
The HTML file MUST include a <head> section with a <script> tag to load Tailwind CSS from the CDN (https://cdn.tailwindcss.com).
The entire response MUST be a single block of HTML code, with no extra explanations, commentary, or markdown formatting.
Ensure the HTML is well-structured and uses semantic tags where appropriate.
Use Tailwind CSS classes for all styling. Do not use inline styles or <style> blocks.
The generated webpage should be aesthetically pleasing and modern.
You must generate a full HTML document starting with <!DOCTYPE html> and ending with </html>.
`;

export const generateWebpageCode = async (prompt: string): Promise<string> => {
  try {
    const ai = getAiInstance();
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            systemInstruction: systemInstruction,
            responseMimeType: "text/plain",
            temperature: 0.7,
        }
    });

    let code = response.text?.trim() ?? '';
    
    // The model might wrap the code in markdown fences, so we strip them.
    if (code.startsWith('```html')) {
        code = code.substring(7, code.length - 3).trim();
    } else if (code.startsWith('```')) {
        code = code.substring(3, code.length - 3).trim();
    }

    // Basic validation to ensure it looks like a proper HTML document.
    if (code.startsWith('<!DOCTYPE html>') && code.endsWith('</html>')) {
      return code;
    } else {
        console.warn("Received content from Gemini that is not a full HTML document. Returning as is.");
        return code;
    }

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error && error.message.includes("API key not valid")) {
        throw new Error("Failed to generate code. Your Gemini API key is not valid. Please check your environment variables.");
    }
    throw new Error("An unexpected error occurred while communicating with the Gemini API.");
  }
};
