import {Component, Inject, OnInit} from '@angular/core';
import {LessonService} from "../../_service/lesson/lesson.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Room} from "../../_model/room/room";
import {SelectionModel} from "@angular/cdk/collections";
import {RoomService} from "../../_service/room/room.service";
import {RoomList} from "../../_model/room/room-list";
import {LessonCreate} from "../../_model/lesson/lesson-create";

@Component({
  selector: 'app-add-lesson-dialog',
  templateUrl: './add-lesson-dialog.component.html',
  styleUrls: ['./add-lesson-dialog.component.scss']
})
export class AddLessonDialogComponent implements OnInit {
  lesson: LessonCreate = new LessonCreate();

  selected: Room;
  selection = new SelectionModel(false, []);
  rooms: RoomList[] = [];

  constructor(
    private _lessonService: LessonService,
    private _roomService: RoomService,
    public dialogRef: MatDialogRef<AddLessonDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public id: number, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this._roomService.getRoomList(null, null, 0, 1000).pipe().subscribe(res => this.rooms = res.list);
  }

  onCancelClick() {
    console.log("onCancelClick");
    this.dialogRef.close();
    window.location.reload();
  }

  onSaveClick() {
    console.log("create Lesson");
    console.log(this.lesson);
    this.lesson.room = this.selected;
    this._lessonService.createLesson(this.lesson)
      .toPromise()
      .then(res => this.dialogRef.close())
      .catch(error => console.log(error));
    window.location.reload();
  }


}
