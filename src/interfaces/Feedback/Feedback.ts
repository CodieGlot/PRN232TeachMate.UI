import { AppUser } from "../AppUser";
import { LearningModule } from "../Learning";
import { Reply } from "./Reply";

export interface Feedback {
  id: number;
  comment: string;
  star: number;
  createdAt: string;
  learningModule: LearningModule;
  appUser: AppUser;
  likeNumber: number;
  dislikeNumber: number;
  isAnonymous: boolean;
  tutorReplyFeedback: Reply |  null
}
