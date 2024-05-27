import { Learner } from "../AppUser";
import { LearningModule } from "../Learning";
import { PaymentStatus } from "../../common/enums";
import { Transaction } from "./Transaction";

export interface PaymentOrder {
    id: number;
    learnerId: string; // Assuming Guid is represented as string
    learner: Learner;
    createdAt: Date;
    learningModuleId: number;
    learningModule: LearningModule;
    paymentStatus: PaymentStatus;
    paymentAmount: number;
    hasClaimed: boolean;
    transaction: Transaction[];
  }
  