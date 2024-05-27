import axios from "axios";
import { AuthService } from "../AuthService";
import { ChatGPTDto } from "../../common/dtos/ChatBot";


const token = AuthService.getAccessToken()

export const ChatBotService = {
  questionChatBot: async (dto: ChatGPTDto) : Promise<string>=> {
    const response = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/api/ChatBot/answer`, dto,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }
    );
    const data : string = response.data;
    return data;
  },

 
};