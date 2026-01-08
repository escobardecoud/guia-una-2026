import { GoogleGenAI } from "@google/genai";
import { careers, faculties } from './data';

const ai = new GoogleGenerativeAI({ apiKey: import.meta.env.VITE_GOOGLE_API_KEY });

// Construct a context string from our data to ground the model
const dataContext = `
Estás actuando como el "Asesor Académico Virtual" de la Universidad Nacional de Asunción (UNA).
Tu objetivo es ayudar a estudiantes a encontrar su carrera ideal basándote EXCLUSIVAMENTE en la "Guía Académica 2026".

Aquí tienes la información resumida de las carreras disponibles en nuestra base de datos actual:
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
1. Sé amable, motivador y profesional.
2. Si te preguntan por una carrera, da detalles de duración, sedes y TURNOS disponibles.
3. Si te preguntan sobre el ingreso, menciona las materias que deben estudiar y el calendario aproximado.
4. Si el usuario describe sus intereses (ej: "me gustan las matemáticas"), sugiere carreras afines de la lista.
5. Si preguntan algo fuera del contexto académico de la UNA, responde cortésmente que solo puedes asesorar sobre la oferta académica de la UNA.
6. Responde siempre en español.
7. Sé conciso.
`;

export const sendMessageToGemini = async (userMessage: string): Promise<string> => {
  try {
    const modelId = 'gemini-3-flash-preview'; 
    const response = await ai.models.generateContent({
      model: modelId,
      contents: userMessage,
      config: {
        systemInstruction: dataContext,
        temperature: 0.7,
      },
    });

    return response.text || "Lo siento, no pude generar una respuesta en este momento.";
  } catch (error) {
    console.error("Error communicating with Gemini:", error);
    return "Hubo un error al conectar con el asistente. Por favor intenta más tarde.";
  }
};
