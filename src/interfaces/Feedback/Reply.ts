import { AppUser } from "../AppUser";


export interface Reply {
  id: number;
  replyContent: string;
  replyDate: string;
  replierId: string;
  replier: AppUser;
  learningModuleFeedbackId: number;

}
