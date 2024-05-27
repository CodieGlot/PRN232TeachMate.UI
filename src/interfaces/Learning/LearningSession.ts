import { LearningModule } from "./LearningModule";
export interface LearningSession {
  id: number;
  slot: number;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  linkMeet: string;
  learningModule: LearningModule;
  learningModuleId: number;
  learningModuleName: string;
}