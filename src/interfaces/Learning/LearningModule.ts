import { ModuleType, Subject } from "../../common/enums";
import { Tutor } from "../AppUser";
import { LearningSession } from "./LearningSession";

export interface LearningModule {
  id: number,
  title: string,
  description: string,
  subject: Subject,
  gradeLevel: number,
  duration: number,
  createdAt: string,
  startDate: string,
  endDate: string,
  maximumLearners: number
  schedule: LearningSession[],
  moduleType: ModuleType,
  numOfWeeks: number,
  tutor: Tutor,
  tutorId: string
  price: number;

}
