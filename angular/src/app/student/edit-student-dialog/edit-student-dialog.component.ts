import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MatTable} from "@angular/material/table";
import {SelectionModel} from "@angular/cdk/collections";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Student} from "../../_model/student/student";
import {StudentService} from "../../_service/student/student.service";

import {CourseList} from "../../_model/course/courseList";
import {AddCourseDialogComponent} from "./add-course-dialog/add-course-dialog.component";


@Component({
  selector: 'app-edit-student-dialog',
  templateUrl: './edit-student-dialog.component.html',
  styleUrls: ['./edit-student-dialog.component.scss']
})
export class EditStudentDialogComponent implements OnInit {
  @ViewChild(MatTable) courseTable: MatTable<CourseList>;

  data: Student = new Student();

  coursesDisplayedColumns: string [] = ['select', 'idd', 'name', 'createDate'];
  selection = new SelectionModel(false, []);
  showCourseTable: boolean = false;

  historyDisplayedColumns: string[] = ['id', 'firstName', 'middleName', 'lastName', 'passport',
    'birthDate', 'deleteDate'];
  showHistoryTable: boolean = false;

  constructor(
    private _studentService: StudentService,
    public dialogRef: MatDialogRef<EditStudentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public idd: number, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    if (this.idd) {
      this._studentService.getStudentByIdd(this.idd)
        .pipe()
        .subscribe(room => {
          this.data = room;
        });
    } else {
  this.data.courses = [];
}
  }

  setShowHistoryTable() {
    this.showHistoryTable = !this.showHistoryTable;
  }

  setShowCourseTable() {
    this.showCourseTable = !this.showCourseTable;
  }

  onCancelClick() {
    this.dialogRef.close();
  }

  onSaveClick() {
    console.log("save");
    if (this.idd) {
      console.log("update");
      this._studentService.updateStudent(this.idd, this.data)
        .toPromise()
        .then(res => this.dialogRef.close())
        .catch(error => console.log(error));
    } else {
      console.log("save");
      this._studentService.createStudent(this.data)
        .toPromise()
        .then(res => this.dialogRef.close())
        .catch(error => console.log(error));
    }
  }

  onDeleteClick() {
    this._studentService.deleteStudent(this.idd)
      .toPromise()
      .then(res => this.dialogRef.close())
      .catch(error => console.log(error));
  }

  onDeleteCourse() {
    this.data.courses
      = this.data.courses.filter(obj => obj.idd !== this.selection.selected[0].idd);
    this.selection.clear();
    this.courseTable.renderRows();
  }

  onAddCourses() {
    const dialogRef = this.dialog.open(AddCourseDialogComponent, {
      width: '500px',
    });
    console.log("DATASOURCE");
    console.log( this.data.courses);
    dialogRef.afterClosed().subscribe(result => {
      console.log("RESULT")
      console.log(result);
      if (result) {
      this.data.courses.push(result);
    }
      this.courseTable.renderRows();
    });
  }
}
