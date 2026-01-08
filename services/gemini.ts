import { GoogleGenerativeAI } from "@google/generative-ai";
import { careers, faculties } from './data';

// Usamos import.meta.env para Vite (entorno de navegador)
const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
const ai = new GoogleGenerativeAI(apiKey);

const dataContext = `
Estás actuando como el "Asesor Académico Virtual" de la Universidad Nacional de Asunción (UNA).
Tu objetivo es ayudar a estudiantes a encontrar su carrera ideal basándote EXCLUSIVAMENTE en la "Guía Académica 2026" que te proporciono a continuación.

Aquí tienes la información oficial de las carreras disponibles:
${JSON.stringify(careers.map(c => ({
  nombre: c.name,
  facultad: c.faculty,
  duracion: c.duration,
  sedes: c.locations.join(', '),
  turnos: c.shifts.join(', '),
  admision_calendario: c.admissionCalendar,
  admision_materias: c.admissionExams.join(', '),
  tags: c.tags.join(', ')
})))}

Instrucciones:
1. Sé amable y profesional.
2. Responde basándote solo en estos datos.
3. Si te preguntan por sedes (como San Pedro), busca en el campo "sedes" de cada carrera.
4. Si la información no está aquí, indica que deben consultar el sitio web oficial.
`;

export const sendMessageToGemini = async (userMessage: string): Promise<string> => {
  try {
    // Usamos el modelo directamente para evitar errores de ruta
    const model = ai.getGenerativeModel({ model: "gemini-2.5-flash" });
    
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
