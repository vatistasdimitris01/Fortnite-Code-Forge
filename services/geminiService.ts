
import { GoogleGenAI } from "@google/genai";
import { GEMINI_MODEL } from '../constants';
import { Language } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generateFortniteCode(prompt: string, language: Language): Promise<string> {
  const fullPrompt = `
    You are an expert Fortnite Creative and UEFN developer specializing in the ${language} programming language.
    Your task is to generate a complete, functional, and well-documented code snippet based on the user's request.
    The code should be clean, efficient, and follow best practices for ${language} in the UEFN environment.
    Ensure the generated code is wrapped in a single markdown code block.

    User Request: "${prompt}"

    Language: ${language}
  `;

  try {
    const response = await ai.models.generateContent({
        model: GEMINI_MODEL,
        contents: fullPrompt,
        config: {
          temperature: 0.3,
          topP: 0.9,
          topK: 40,
        },
    });

    const text = response.text;
    
    // Clean up the response to extract only the code from the markdown block
    const codeBlockRegex = /```(?:\w*\n)?([\s\S]*?)```/;
    const match = text.match(codeBlockRegex);
    
    if (match && match[1]) {
      return match[1].trim();
    }
    
    // Fallback if no markdown block is found
    return text.trim();

  } catch (error) {
    console.error('Error calling Gemini API:', error);
    throw new Error('Failed to generate code from Gemini API.');
  }
}
