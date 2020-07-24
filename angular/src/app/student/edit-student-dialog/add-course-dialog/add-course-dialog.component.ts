import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CourseList} from "../../../_model/course/courseList";
import {CourseService} from "../../../_service/course/course.service";

@Component({
  selector: 'app-add-course-dialog',
  templateUrl: './add-course-dialog.component.html',
  styleUrls: ['./add-course-dialog.component.scss']
})
export class AddCourseDialogComponent implements OnInit {
  courses: CourseList[] = [];
  selected: number;

  constructor(
    public dialogRef: MatDialogRef<AddCourseDialogComponent>,
    private _courseService: CourseService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    this._courseService.getCourseList("idd", "asc", 0, 1000)
      .pipe()
      .subscribe(res => this.courses = res.list);
  }

  onCancelClick() {
    this.dialogRef.close();
  }

  onSaveClick() {
    console.log("onSaveClick");
    console.log(this.selected);
    this.dialogRef.close(this.selected)
  }
}
