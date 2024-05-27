import axios from "axios";
import { AuthService } from "../AuthService";
import { SentReportUserDto } from "../../common/dtos/Report/SentReportUserdDto";




const token = AuthService.getAccessToken()

export const ReportService = {
  sentReportuser: async (dto: SentReportUserDto) => {
    await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/api/Report/SentReportUser`, dto,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }
    );

  },


};