import axios from "axios";
import { AuthService } from "../AuthService";
import { SearchClassDto, SearchTutorDto } from "../../common/dtos";
import { AppUser, LearningModule } from "../../interfaces";

const token = AuthService.getAccessToken()

export const SearchService = {
  searchClass: async (dto: SearchClassDto): Promise<LearningModule[]> => {
    const response = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/api/Search/Classes`, dto,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }
    );
    const learningModules: LearningModule[] = response.data;
    return learningModules;
  },

  searchTutor: async (dto: SearchTutorDto): Promise<AppUser[]> => {
    const response = await axios.get(
      `${import.meta.env.VITE_SERVER_URL}/api/Search/Tutor` + "?DisplayName=" + dto.displayName,
      {
        headers: {
          Authorization: `Bearer ${token}`
        },
      }
    );
    const tutors: AppUser[] = response.data;
    return tutors;
  },

  getAllLearningModuleOfOneTutor: async (tutorId: string | null): Promise<LearningModule[]> => {
    const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/LearningModule/LearningModuleOfOneTutor/` + tutorId,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    const learningModules: LearningModule[] = response.data;
    return learningModules;
  },

  // getAverageRatingOfTutorByAllLearningModule: async (tutorId: string | null): Promise<AverageRating> => {
  //   const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/LearningModule/AverageRatingOfTutor/` + tutorId,
  //     {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //   const learningModules: AverageRating = response.data;
  //   return learningModules;
  // },

};