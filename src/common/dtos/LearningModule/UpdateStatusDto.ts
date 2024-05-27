import { RequestStatus } from "../../enums";

export interface UpdateStatusDto {
    status: RequestStatus;
    learningModuleId: number;
    learningRequestId: number;
  }
  