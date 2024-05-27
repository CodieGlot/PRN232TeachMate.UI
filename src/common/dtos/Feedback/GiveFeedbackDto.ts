// import { LearningModule } from "../../../interfaces";

export interface GiveFeedbackDto {
  comment: string | null;
  star: number | null;
  learningModuleId: number | null;
  isAnonymous: boolean;
}
