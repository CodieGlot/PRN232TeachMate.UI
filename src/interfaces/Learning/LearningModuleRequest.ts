import { RequestStatus, Subject } from "../../common/enums";
import { LearningModule } from "./LearningModule";

export interface LearningModuleRequest {
    id: number;
    requesterId: string; // Assuming Guid translates to string in TypeScript
    requesterDisplayName: string;
    title: string;
    status: RequestStatus;
    learningModuleId: number;
    learningModule: LearningModule | null; // Assuming LearningModule is defined elsewhere
    createdAt: string
  }