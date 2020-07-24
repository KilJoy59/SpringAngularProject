import {Teacher} from "../teacher/teacher";
import {StudentList} from "../student/studentList";
import {LessonList} from "../lesson/lessonList";

export class Course {
  idd:number;
  name:string;
  description: string;
  teacher: Teacher;
  maxCountStudent: number;
  startDate: string;
  endDate: string;
  createDate: string;
  status: string;
  students: StudentList[];
  lessons: LessonList[];
  history: [];

}
