import { ReportStatus } from "../../common/enums";
import { AppUser } from "../AppUser";
import { SystemReport } from "./SystemReport";
import { UserReport } from "./UserReport";

export interface Report {
    id: number;
    userId: string;
    user : AppUser;
    systemReport: SystemReport | null;
    userReport: UserReport | null;
    title: string;
    description: string;
    status: ReportStatus.Pending;
}