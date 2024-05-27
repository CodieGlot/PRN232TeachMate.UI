import { ReportStatus, SystemReportType} from "../../enums";

export interface SearchReportSystemDto {
  systemReportType: SystemReportType | null;
  reportStatus : ReportStatus | null;
}