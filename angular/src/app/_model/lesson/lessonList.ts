import {Room} from "../room/room";
import {CourseLesson} from "../course/course-lesson";

export class LessonList {
  id: number;
  name: string;
  course: CourseLesson;
  room: Room;
  lessonDateStart: string;
  lessonDateEnd: string;
}
