import { GoogleGenerativeAI } from "@google/generative-ai";
import { careers, faculties } from './data';

// Usamos import.meta.env para Vite (entorno de navegador)
const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
const ai = new GoogleGenerativeAI(apiKey);

const dataContext = `
Estás actuando como el "Asesor Académico Virtual" de la Universidad Nacional de Asunción (UNA).
Tu objetivo es ayudar a estudiantes a encontrar su carrera ideal basándote EXCLUSIVAMENTE en la "Guía Académica 2026".
`;

export const sendMessageToGemini = async (userMessage: string): Promise<string> => {
  try {
    // Usamos el modelo directamente para evitar errores de ruta
    const model = ai.getGenerativeModel({ model: "gemini-1.5-pro" });
    
    // Enviamos el contexto de la UNA junto con la pregunta
    const prompt = `${dataContext}\n\nPregunta del estudiante: ${userMessage}`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error en el Asesor IA:", error);
    return "Lo siento, no pude conectarme con el servidor. Por favor, verifica tu conexión o intenta más tarde.";
  }
};
