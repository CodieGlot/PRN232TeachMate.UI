
export interface SearchClassDto {
  titleOrDesc: string | null;
  subject: number;
  gradeLevel: number;
  startOpenDate: string | null;
  endOpenDate: string | null;
  maximumLearners: number;
  moduleType: number;
  numOfWeeks: number;
  minPrice: number;
  maxPrice: number;
}