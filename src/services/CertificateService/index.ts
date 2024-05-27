import axios from "axios";
import { AuthService } from "../AuthService";
import { UploadCertificateDto } from "../../common/dtos";
import { Certificate } from "../../interfaces";

const token = AuthService.getAccessToken()

export const CertificateService = {
  uploadCertificate: async (dto: UploadCertificateDto) : Promise<Certificate>=> {
    const response = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/api/Certificate/UploadCertificate`, dto,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }
    );

    const data : Certificate = response.data;
    return data;
  },

  getListCertificateByTutorId: async (tutorId: string) : Promise<Certificate[]> => {
    const response = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/api/Certificate/GetAllCertificateByTutorId?tutorId=`+tutorId, tutorId,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }
    );
    const data : Certificate[] = response.data;
    return data;
  }
};