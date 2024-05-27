import { UserRole } from "../../enums";

export interface SearchUserDto {
  displayNameorUsername: string | null;
  userRole: UserRole | null;
  isDisable: boolean | null;
}