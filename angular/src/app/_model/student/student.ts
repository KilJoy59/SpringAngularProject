import {CourseList} from "../course/courseList";

export class Student {
  id:number;
  idd: number;
  firstName: string;
  middleName: string;
  lastName: string;
  passport: string;
  birthDate: string;
  createDate: string;
  history: [];
  courses: CourseList[];
}
