export interface CreateLearningModuleDto {
    title: string;
    description: string;
    subject: number;
    gradeLevel: number;
    duration: number;
    startDate: string; 
    endDate: string; 
    maximumLearners: number;
    moduleType: number;
    numOfWeeks: number;
  }
  