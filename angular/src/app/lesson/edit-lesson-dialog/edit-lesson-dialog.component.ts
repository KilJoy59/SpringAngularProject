import {Component, Inject, OnInit} from '@angular/core';
import {SelectionModel} from "@angular/cdk/collections";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Lesson} from "../../_model/lesson/lesson";
import {LessonService} from "../../_service/lesson/lesson.service";
import {RoomList} from "../../_model/room/room-list";
import {RoomService} from "../../_service/room/room.service";
import {Room} from "../../_model/room/room";

@Component({
  selector: 'app-edit-lesson-dialog',
  templateUrl: './edit-lesson-dialog.component.html',
  styleUrls: ['./edit-lesson-dialog.component.scss']
})
export class EditLessonDialogComponent implements OnInit {
  selected: Room;
  lesson: Lesson = new Lesson();
  rooms: RoomList[] = [];
  selection = new SelectionModel(false, []);
  iddRoom: number;
  room: Room;

  constructor(
    private _lessonService: LessonService,
    private _roomService: RoomService,
    public dialogRef: MatDialogRef<EditLessonDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public id: number, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    console.log(this.lesson);
    if (this.id) {
      this._lessonService.getLessonById(this.id)
        .pipe()
        .subscribe(lesson => {
          this.lesson = lesson;
          this.selected = lesson.room;
          console.log(this.selected);
        });
      this._roomService.getRoomList(null, null, 0, 1000).pipe().subscribe(res => this.rooms = res.list);
    }


  }

  onCancelClick() {
    console.log("onCancelClick");
    this.dialogRef.close();
  }

  onSaveClick() {
    this.lesson.room = this.selected;
    if (this.id) {
      console.log("updateLesson ");
      this._lessonService.updateLesson(this.id, this.lesson)
        .toPromise()
        .then(res => this.dialogRef.close())
        .catch(error => console.log(error));
    } else {
      console.log("create Lesson");
      this._lessonService.createLesson(this.lesson)
        .toPromise()
        .then(res => this.dialogRef.close())
        .catch(error => console.log(error));

    }
  }

  onDeleteClick() {
    console.log("onDeleteClick");
    this._lessonService.deleteLesson(this.id)
      .toPromise()
      .then(res => this.dialogRef.close())
      .catch(error => console.log(error));
  }

}
