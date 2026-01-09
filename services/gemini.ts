import { GoogleGenerativeAI } from "@google/generative-ai";
import { careers, faculties } from './data';

// Usamos import.meta.env para Vite (entorno de navegador)
const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
const ai = new GoogleGenerativeAI(apiKey);

const dataContext = `
Estás actuando como el "Asesor Académico Virtual" de la Universidad Nacional de Asunción (UNA). 
Tu objetivo es ayudar a estudiantes basándote EXCLUSIVAMENTE en la "Guía Académica 2026" proporcionada.

Información de carreras:
${JSON.stringify(careers.map(c => ({
  nombre: c.name,
  facultad: c.faculty,
  duracion: c.duration,
  sedes: c.locations.join(', '),
  materias: c.admissionExams.join(', '),
  turnos: c.shifts.join(', '),
  descripcion: c.description,
  modalidad: c.modality
})))}

REGLAS DE FORMATO CRÍTICAS:
1. NO utilices negritas (ejemplo: **texto**).
2. NO utilices cursivas (ejemplo: *texto*).
3. NO utilices asteriscos (*) ni guiones para hacer listas; usa números o simplemente párrafos.
4. Responde SIEMPRE en texto plano y limpio. No uses ningún tipo de formato Markdown.
5. Sé amable, conciso y profesional.
6. Cuando el usuario pregunte por los turnos en los que puede estudiar una carrera debes presentar los turnos tal cual aparecen en la base de datos.
7. Si pregunta qué carrera puede estudiar a la noche únicamente presenta aquellas carreras cuyo único turno sea a la noche. 
8. Si te preguntan por la modalidad, solamente debes responder si es presencial o a distancia.  
`;

export const sendMessageToGemini = async (userMessage: string): Promise<string> => {
  try {
    // Usamos el modelo directamente para evitar errores de ruta
    const model = ai.getGenerativeModel({ model: "gemini-3-flash-preview" });
    
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
