import {Component, Inject, OnInit} from '@angular/core';
import {StudentList} from "../../../_model/student/studentList";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {StudentService} from "../../../_service/student/student.service";
import {LessonList} from "../../../_model/lesson/lessonList";
import {LessonService} from "../../../_service/lesson/lesson.service";

@Component({
  selector: 'app-add-lesson-dialog',
  templateUrl: './add-lesson-course-dialog.component.html',
  styleUrls: ['./add-lesson-course-dialog.component.scss']
})
export class AddLessonCourseDialogComponent implements OnInit {

  lessons: LessonList[] = [];
  selected: number;
  iddCourse:number;

  constructor(
    public dialogRef: MatDialogRef<AddLessonCourseDialogComponent>,
    private _lessonService: LessonService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.iddCourse = data.iddCourse
  }

  ngOnInit(): void {
    this._lessonService.getLessonList(null,null,0,1000)
      .pipe()
      .subscribe(lessons => this.lessons = lessons.list as LessonList[] );
  }

  onCancelClick() {
    console.log("onCancelClick");
    this.dialogRef.close();
  }

  onSaveClick() {
    console.log("onSaveClick");
    this.dialogRef.close(this.selected)
  }
}
