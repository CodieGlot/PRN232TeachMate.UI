import { UserReportType } from "../../enums";

export interface SentReportUserDto {
  UserReportType: UserReportType;
  Title: string;
  Description: string;
}
