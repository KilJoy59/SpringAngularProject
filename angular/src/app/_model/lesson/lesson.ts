import {Room} from "../room/room";
import {CourseLesson} from "../course/course-lesson";

export class Lesson {
  id: number;
  name: string;
  description: string;
  course: CourseLesson;
  room: Room;
  lessonDateStart: string;
  lessonDateEnd: string;

}
