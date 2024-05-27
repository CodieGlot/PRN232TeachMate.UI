import { DayOfWeek } from "../../enums";

export interface WeeklySlotDto {
    dayOfWeek: DayOfWeek;  
    startTime: string;  
    endTime: string;    
  }