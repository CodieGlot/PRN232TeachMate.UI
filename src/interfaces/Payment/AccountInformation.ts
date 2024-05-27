import { Tutor } from "../AppUser";

export interface AccountInformation {
    id: number;
    fullName: string;
    taxCode: string;
    bankCode: string;
    accountNumber: string;
    tutorId: string; 
    tutor?: Tutor; 
  }
  
  