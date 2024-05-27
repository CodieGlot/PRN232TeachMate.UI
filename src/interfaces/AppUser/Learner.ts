import { AppUser } from "./AppUser";

export interface Learner {
  id: string;
  displayName: string;
  gradeLevel: number;
  appUser :AppUser;
}
