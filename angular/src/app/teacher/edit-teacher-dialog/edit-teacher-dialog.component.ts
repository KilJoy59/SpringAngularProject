import {Component, Inject, OnInit} from '@angular/core';
import {SelectionModel} from "@angular/cdk/collections";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Teacher} from "../../_model/teacher/teacher";
import {TeacherService} from "../../_service/teacher/teacher.service";

@Component({
  selector: 'app-edit-teacher-dialog',
  templateUrl: './edit-teacher-dialog.component.html',
  styleUrls: ['./edit-teacher-dialog.component.scss']
})
export class EditTeacherDialogComponent implements OnInit {

  data: Teacher = new Teacher();

  historyDisplayedColumns: string[] = ['idd', 'firstName', 'middleName', 'lastName', 'passport',
    'birthDate', 'deleteDate'];
  showHistoryTable: boolean = false;

  selection = new SelectionModel(false, []);


  constructor(
    private _teacherService: TeacherService,
    public dialogRef: MatDialogRef<EditTeacherDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public idd: number, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    if (this.idd) {
      this._teacherService.getTeacherByIdd(this.idd)
        .pipe()
        .subscribe(room => {
          this.data = room;
        });
    }
  }

  setShowHistoryTable() {
    this.showHistoryTable = !this.showHistoryTable;
  }

  onCancelClick() {
    this.dialogRef.close();
  }

  onSaveClick() {
    if (this.idd) {
      this._teacherService.updateTeacher(this.idd, this.data)
        .toPromise()
        .then(res => this.dialogRef.close())
        .catch(error => console.log(error));
    } else {
      this._teacherService.createTeacher(this.data)
        .toPromise()
        .then(res => this.dialogRef.close())
        .catch(error => console.log(error));
    }
  }

  onDeleteClick() {
    this._teacherService.deleteTeacher(this.idd)
      .toPromise()
      .then(res => this.dialogRef.close())
      .catch(error => console.log(error));
  }
}
