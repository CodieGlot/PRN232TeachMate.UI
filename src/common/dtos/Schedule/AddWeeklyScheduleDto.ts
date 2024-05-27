import { WeeklySlotDto } from "./WeeklySlotDto";
export interface AddWeeklyScheduleDto {
    weeklySlots: WeeklySlotDto[];
    learningModuleId: number;
  }
  