import {Component, Inject, OnInit} from '@angular/core';
import {InstrumentList} from "../../../_model/instrument/instrumentList";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {InstrumentService} from "../../../_service/instrument/instrument.service";
import {StudentList} from "../../../_model/student/studentList";
import {StudentService} from "../../../_service/student/student.service";

@Component({
  selector: 'app-add-student-dialog',
  templateUrl: './add-student-dialog.component.html',
  styleUrls: ['./add-student-dialog.component.scss']
})
export class AddStudentDialogComponent implements OnInit {

  students: StudentList[] = [];
  selected: number;
  iddStudent:number;

  constructor(
    public dialogRef: MatDialogRef<AddStudentDialogComponent>,
    private _studentService: StudentService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.iddStudent = data.iddStudent
  }

  ngOnInit(): void {
    this._studentService.getFreeStudents(this.iddStudent)
      .pipe()
      .subscribe(students => this.students = students as StudentList[] );
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
