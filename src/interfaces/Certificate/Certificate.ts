import { Tutor } from "../AppUser";

export interface Certificate {
    id: number;
    title: string;
    dateClaimed: string;
    description: string;
    certificateFile: string;
    tutorId: string; // Assuming Guid is represented as a string in TypeScript
    tutor: Tutor; // Assuming Tutor is another TypeScript interface
  }