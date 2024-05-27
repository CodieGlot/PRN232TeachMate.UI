import { AddLearnerDetailDto } from './../../common/dtos/UserDetail/AddLearnerDetailDto';
import axios from "axios";
import { AppUser } from '../../interfaces';
import { AuthService } from '../AuthService';
import { AddTutorDetailDto } from "../../common/dtos/UserDetail";
import { UpdateTutorDetailDto } from '../../common/dtos/UserDetail/UpdateTutorDetailDto';
import { UpdateLearnerDetailDto } from '../../common/dtos/UserDetail/UpdateLearnerDetailDto';
const accessToken = AuthService.getAccessToken();
export const UserDetailService = {
  getUserById: async (id: string | null): Promise<AppUser> => {
    const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/UserDetail/GetUserById/` + id,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    const appUser: AppUser = response.data;
    return appUser;
  },

  addTutorDetail: async (dto: AddTutorDetailDto, accessToken: string) => {
    const response = await axios.put(
      `${import.meta.env.VITE_SERVER_URL}/api/UserDetail/Tutor/AddDetail`,
      dto, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }

    );
    localStorage.removeItem("user");
    localStorage.setItem("user", JSON.stringify(response.data));

  },
  addLearnerDetail: async (dto: AddLearnerDetailDto, accessToken: string) => {
    const response = await axios.put(
      `${import.meta.env.VITE_SERVER_URL}/api/UserDetail/Learner/AddDetail`,
      dto, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }

    );
    localStorage.removeItem("user");
    localStorage.setItem("user", JSON.stringify(response.data));

  },
  updateTutorDetail: async (dto: UpdateTutorDetailDto, accessToken: string) => {

    const response = await axios.put(
      `${import.meta.env.VITE_SERVER_URL}/api/UserDetail/Tutor/UpdateTutorDetail`,
      dto, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }

    );
    localStorage.removeItem("user");
    localStorage.setItem("user", JSON.stringify(response.data));

  },
  updateLearnerDetail: async (dto: UpdateLearnerDetailDto, accessToken: string) => {

    const response = await axios.put(
      `${import.meta.env.VITE_SERVER_URL}/api/UserDetail/Learner/UpdateLearnerDetail`,
      dto, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }

    );
    localStorage.removeItem("user");
    localStorage.setItem("user", JSON.stringify(response.data));

  }, getCurrentUserDetail: async () => {
    const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/Auth/Me`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    localStorage.removeItem("user");
    localStorage.setItem("user", JSON.stringify(response.data));
    const appUser: AppUser = response.data;
    return appUser;
  }

};