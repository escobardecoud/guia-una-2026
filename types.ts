export enum Modality {
  Presencial = 'Presencial',
  Semipresencial = 'Semipresencial',
  Distancia = 'A Distancia'
}

export enum Level {
  Grado = 'Grado',
  Pregrado = 'Pregrado'
}

export interface Career {
  id: string;
  name: string;
  faculty: string;
  duration: string;
  hours: number;
  modality: Modality[]; // Changed from single Modality to array
  locations: string[]; // Sedes
  description: string;
  profile: string[]; // Perfil del egresado points
  
  // New Detailed Info
  shifts: string[]; // e.g., ['Mañana', 'Tarde', 'Noche']
  admissionCalendar: string; // e.g., "Diciembre a Febrero"
  admissionRequirements: string[]; // List of docs or conditions
  admissionExams: string[]; // Subjects to study
  
  contactEmail: string;
  website: string;
  tags: string[]; // For search grounding
}

export interface Faculty {
  id: string;
  name: string;
  acronym: string;
  dean: string;
  website: string;
  color: string; // For UI accents
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}