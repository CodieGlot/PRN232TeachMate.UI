import axios from "axios";
import { AuthService } from "../AuthService";
import { GiveFeedbackDto } from "../../common/dtos";
import { Feedback } from "../../interfaces/Feedback/Feedback";
import { TutorReplyFeedbackDto } from "../../common/dtos";
import { Reply } from "../../interfaces/Feedback";


const token = AuthService.getAccessToken()

export const FeedbackService = {
  givefeedback: async (dto: GiveFeedbackDto) => {
    await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/api/Feedback/Learner/AddFeedback`, dto,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }
    );
  },

  getFeedbackByLearningModuleId: async (id: string | null): Promise<Feedback[]> => {
    const response = await axios.get(
      `${import.meta.env.VITE_SERVER_URL}/api/Feedback/GetFeedbacksByLearningModuleId/` + id,

      {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }
    );
    const Feedback: Feedback[] = response.data;
    return Feedback;
  },

  tutorReplyFeedback: async (dto: TutorReplyFeedbackDto) => {
    await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/api/Feedback/TutorReplyFeedback`, dto,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }
    );
    
  },

  getReplyByFeedbackId: async (id: string | null): Promise<Reply> => {
    const response = await axios.get(
      `${import.meta.env.VITE_SERVER_URL}/api/Feedback/GetReplyByFeedbackId/` + id,

      {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }
    );
    const Reply: Reply = response.data;
    return Reply;
  },

  hasFeedback: async (id: string): Promise<boolean> => {
    const response = await axios.get(
      `${import.meta.env.VITE_SERVER_URL}/api/Feedback/HasFeedback?learningModuleId=` + id,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }
    );
    const data: boolean = response.data;
    return data;
  },

  // getAverageRatingByStar: async (id: string | null): Promise<number> => {
  //   try {
  //     const response = await axios.get(
  //       `${import.meta.env.VITE_SERVER_URL}/api/Feedback/GetAverageRatingByStar/` + id,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         }
  //       }
  //     );
  //     const averageRating: number = response.data;
  //     return averageRating;
  //   } catch (error) {
  //     console.error("Error fetching average rating:", error);
  //     throw error;
  //   }
  // },
};