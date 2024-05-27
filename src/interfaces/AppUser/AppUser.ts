import { UserRole } from "../../common/enums";
import { Learner } from "./Learner";
import { Tutor } from "./Tutor";

export interface AppUser {
  id: string;
  displayName: string;
  username: string;
  email: string;
  isDisabled: boolean;
  userRole: UserRole;
  phoneNumber: string;
  avatar: string;
  tutor: Tutor | null;
  learner: Learner | null;
}
