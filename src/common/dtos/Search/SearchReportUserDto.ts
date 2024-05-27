import { ReportStatus, UserReportType} from "../../enums";

export interface SearchReportUserDto {
  userReportType: UserReportType | null;
  reportStatus : ReportStatus | null;
}