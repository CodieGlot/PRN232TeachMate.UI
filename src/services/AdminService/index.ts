import axios from "axios";
import { AppUser, PaymentOrder, Report } from "../../interfaces";
import { AuthService } from "../AuthService";
import { SearchUserDto, UpdateReportStatusDto, SearchReportSystemDto,  SearchReportUserDto} from "../../common/dtos";
import { DisableDto } from "../../common/dtos/Admin/DisableDto";
import { SearchPaymentOrderDto } from "../../common/dtos/Search/SearchPaymentOrderDto";
import { HasClaimedDto } from "../../common/dtos/Admin/HasClaimedDto";
import { TotalRevenueForMonthDto } from "../../common/dtos/Admin/TotalRevenueForMonthDto";
import { AccountInformation } from "../../interfaces/Payment/AccountInformation";

const token = AuthService.getAccessToken()

export const AdminService = {
  getAllUser: async (): Promise<AppUser[]> => {
    const response = await axios.get(
      `${import.meta.env.VITE_SERVER_URL}/api/Admin/GetAllUser`,
      {
        headers: {
          Authorization: `Bearer ` + token,
        },
      }
    );
    return response.data;
  },

  searchUser: async (dto: SearchUserDto): Promise<AppUser[]> => {
    const response = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/api/Admin/SearchUser`, dto,
      {
        headers: {
          Authorization: `Bearer ` + token,
        }
      }
    );
    const appUser: AppUser[] = response.data;
    return appUser;
  },

  updateStatus: async (dto: DisableDto): Promise<AppUser[]> => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_SERVER_URL}/api/Admin/UpdateStatus`, dto,
        // Correctly pass the data in the request body
        {
          headers: {
            Authorization: `Bearer ` + token,
          },
        }
      );
      const appUsers: AppUser[] = response.data;
      return appUsers;
    } catch (error) {
      console.error('Error updating status:', error);
      throw error;
    }
  },

  getReportByID: async (id: number) : Promise<Report> => {
    const response = await axios.get(
      `${import.meta.env.VITE_SERVER_URL}/api/Admin/GetReportByID?id=`+id,
      {
        headers: {
          Authorization: `Bearer ` + token,
        },
      }
    );
    const report: Report = response.data;
    return report;
  },

  getAllReportSystem: async (): Promise<Report[]> => {
    const response = await axios.get(
      `${import.meta.env.VITE_SERVER_URL}/api/Admin/GetAllReportSystem`,
      {
        headers: {
          Authorization: `Bearer ` + token,
        },
      }
    );
    return response.data;
  },

  searchReportSystem: async (dto: SearchReportSystemDto): Promise<Report[]> => {
    const response = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/api/Admin/SearchReportSystem`, dto,
      {
        headers: {
          Authorization: `Bearer ` + token,
        }
      }
    );
    const report: Report[] = response.data;
    return report;
  },

  getAllReportUser: async (): Promise<Report[]> => {
    const response = await axios.get(
      `${import.meta.env.VITE_SERVER_URL}/api/Admin/GetAllReportUser`,
      {
        headers: {
          Authorization: `Bearer ` + token,
        },
      }
    );
    return response.data;
  },

  searchReportUser: async (dto: SearchReportUserDto): Promise<Report[]> => {
    const response = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/api/Admin/SearchReportUser`, dto,
      {
        headers: {
          Authorization: `Bearer ` + token,
        }
      }
    );
    const report: Report[] = response.data;
    return report;
  },

  updateStatusReport: async (dto: UpdateReportStatusDto): Promise<Report[]> => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_SERVER_URL}/api/Admin/UpdateStatusReport`, dto,
        // Correctly pass the data in the request body
        {
          headers: {
            Authorization: `Bearer ` + token,
          },
        }
      );
      const report: Report[] = response.data;
      return report;
    } catch (error) {
      console.error('Error updating status:', error);
      throw error;
    }
  },

  getAccountInformationByTutorId: async (id: string) : Promise<AccountInformation> => {
    const response = await axios.get(
      `${import.meta.env.VITE_SERVER_URL}/api/Admin/GetAccountInformationByTutorId?id=`+id,
      {
        headers: {
          Authorization: `Bearer ` + token,
        },
      }
    );
    const account: AccountInformation = response.data;
    return account;
  },

  getPaymentByID: async (id: number) : Promise<PaymentOrder> => {
    const response = await axios.get(
      `${import.meta.env.VITE_SERVER_URL}/api/Admin/GetPaymentByID?id=`+id,
      {
        headers: {
          Authorization: `Bearer ` + token,
        },
      }
    );
    const payment: PaymentOrder = response.data;
    return payment;
  },

  getAllPaymentOrder: async (): Promise<PaymentOrder[]> => {
    const response = await axios.get(
      `${import.meta.env.VITE_SERVER_URL}/api/Admin/GetAllPaymentOrder`,
      {
        headers: {
          Authorization: `Bearer ` + token,
        },
      }
    );
    return response.data;
  },

  searchPaymentOrder: async (dto: SearchPaymentOrderDto): Promise<PaymentOrder[]> => {
    const response = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/api/Admin/SearchPaymentOrder`, dto,
      {
        headers: {
          Authorization: `Bearer ` + token,
        }
      }
    );
    const payment: PaymentOrder[] = response.data;
    return payment;
  },

  updateHasClaimed: async (dto: HasClaimedDto): Promise<PaymentOrder[]> => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_SERVER_URL}/api/Admin/UpdateHasClaimed`, dto,
        // Correctly pass the data in the request body
        {
          headers: {
            Authorization: `Bearer ` + token,
          },
        }
      );
      const paymentOrder: PaymentOrder[] = response.data;
      return paymentOrder;
    } catch (error) {
      console.error('Error updating status:', error);
      throw error;
    }
  },

  countTutor: async (): Promise<number> => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/Admin/CountTutor`,
        // Correctly pass the data in the request body
        {
          headers: {
            Authorization: `Bearer ` + token,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error count:', error);
      throw error;
    }
  },

  countLearner: async (): Promise<number> => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/Admin/CountLearner`,
        // Correctly pass the data in the request body
        {
          headers: {
            Authorization: `Bearer ` + token,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error count:', error);
      throw error;
    }
  },

  countClass: async (): Promise<number> => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/Admin/CountClass`,
        // Correctly pass the data in the request body
        {
          headers: {
            Authorization: `Bearer ` + token,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error count:', error);
      throw error;
    }
  },

  totalRevenue: async (): Promise<number> => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/Admin/TotalRevenue`,
        // Correctly pass the data in the request body
        {
          headers: {
            Authorization: `Bearer ` + token,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error count:', error);
      throw error;
    }
  },

  totalRevenueForMontkh: async (dto: TotalRevenueForMonthDto): Promise<number> => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/Admin/TotalRevenueForMonth`, dto,
        // Correctly pass the data in the request body
        {
          headers: {
            Authorization: `Bearer ` + token,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error count:', error);
      throw error;
    }
  }, 
};
