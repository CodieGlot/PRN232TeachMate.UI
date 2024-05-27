import { AccountInformation } from "../Payment/AccountInformation";
import { AppUser } from "./AppUser";

export interface Tutor {
  id: string;
  displayName: string;
  description: string;
  gradeLevel: Int32Array;
  rating: number | null;
  appUser: AppUser;
  accountInformation : AccountInformation;
}
