import {Room} from "../room/room";

export class LessonCreate {
  id: number;
  name: string;
  description: string;
  room: Room;
  lessonDateStart: string;
  lessonDateEnd: string;
}
