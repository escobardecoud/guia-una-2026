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
    const modelId = 'gemini-1.5-flash'; // Cambiado a un ID de modelo estándar y estable
    const model = ai.getGenerativeModel({ 
      model: modelId,
      systemInstruction: dataContext 
    });
    
    const result = await model.generateContent(userMessage);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error en el Asesor IA:", error);
    return "Lo siento, hubo un error al procesar tu consulta. Por favor, intenta de nuevo.";
  }
};
