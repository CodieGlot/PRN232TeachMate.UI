import { UserReportType } from "../../common/enums";
import { AppUser } from "../AppUser";

export interface UserReport {
    id: number;
    reportedUser: AppUser;
    userReportType: UserReportType;
    userIdReported: string;
}