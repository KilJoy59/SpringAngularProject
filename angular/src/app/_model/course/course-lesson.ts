import {Teacher} from "../teacher/teacher";

export class CourseLesson {
  idd:number;
  name:string;
  description: string;
  teacher: Teacher;
  maxCountStudent: number;
  startDate: string;
  endDate: string;
  createDate: string;
  status: string;
}
