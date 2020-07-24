import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MatTable} from "@angular/material/table";
import {SelectionModel} from "@angular/cdk/collections";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {StudentList} from "../../_model/student/studentList";
import {CourseService} from "../../_service/course/course.service";
import {StudentService} from "../../_service/student/student.service";
import {Course} from "../../_model/course/course";
import {Teacher} from "../../_model/teacher/teacher";
import {TeacherService} from "../../_service/teacher/teacher.service";
import {TeacherList} from "../../_model/teacher/teacherList";
import {AddStudentDialogComponent} from "./add-student-dialog/add-student-dialog.component";
import {LessonList} from "../../_model/lesson/lessonList";
import {AddLessonCourseDialogComponent} from "./add-lesson-dialog/add-lesson-course-dialog.component";

@Component({
  selector: 'app-edit-course-dialog',
  templateUrl: './edit-course-dialog.component.html',
  styleUrls: ['./edit-course-dialog.component.scss']
})
export class EditCourseDialogComponent implements OnInit {
  @ViewChild(MatTable) studentTable: MatTable<StudentList>;
  @ViewChild(MatTable) lessonTable: MatTable<LessonList>;
  selected: Teacher;
  data: Course = new Course();
  teachers: TeacherList[] = [];

  studentDisplayedColumns: string[] = ['select', 'idd', 'firstName', 'middleName', 'lastName', 'passport'];
  lessonDisplayedColumns: string[] = ['select', 'id', 'name', 'lessonDateStart', 'lessonDateEnd'];
  historyDisplayedColumns: string[] = ['idd', 'name', 'startDate', 'endDate', 'deleteDate'];

  showStudentTable: boolean = false;
  showLessonTable: boolean = false;
  showHistoryTable: boolean = false;

  selection = new SelectionModel(false, []);

  constructor(
    private _courseService: CourseService,
    private _studentService: StudentService,
    private _teacherService: TeacherService,
    public dialogRef: MatDialogRef<EditCourseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public idd: number, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    console.log("init" + this.data);
    console.log(this.data);
    if (this.idd) {
      this._courseService.getCourseByIdd(this.idd)
        .pipe()
        .subscribe(course => {
          this.data = course;
          this.selected = course.teacher;
        });
    }
    this._teacherService.getTeacherList(null, null, 0, 1000)
      .pipe()
      .subscribe(res => this.teachers = res.list);
    /*else {
      this.data.students = [];
    }*/
  }

  setShowStudentTable() {
    console.log("setShowInstrumentTable");
    this.showStudentTable = !this.showStudentTable;
  }

  setShowLessonTable() {
    this.showLessonTable = !this.showLessonTable;
  }

  setShowHistoryTable() {
    console.log("setShowHistoryTable");
    this.showHistoryTable = !this.showHistoryTable;
  }

  onCancelClick() {
    console.log("onCancelClick");
    this.dialogRef.close();
  }

  onSaveClick() {
    console.log("onSaveClick");
    console.log(this);
    if (this.idd) {
      this._courseService.updateCourse(this.idd, this.data)
        .toPromise()
        .then(res => this.dialogRef.close())
        .catch(error => console.log(error));
    } else {
      this._courseService.createCourse(this.data)
        .toPromise()
        .then(res => this.dialogRef.close())
        .catch(error => console.log(error));
    }
  }

  onDeleteClick() {
    console.log("onDeleteClick");
    this._courseService.deleteCourse(this.idd)
      .toPromise()
      .then(res => this.dialogRef.close())
      .catch(error => console.log(error));
  }

  onDeleteStudent() {
    console.log("onDeleteInstrument");
    this.data.students
      = this.data.students.filter(obj => obj.idd !== this.selection.selected[0].idd);
    this.selection.clear();
    this.studentTable.renderRows();
  }

  onDeleteLesson() {
    this.data.lessons
      = this.data.lessons.filter(obj => obj.id !== this.selection.selected[0].id);
    this.selection.clear();
    this.lessonTable.renderRows();
  }

  onAddStudent(courseIdd: number) {
    console.log("onAddInstrument" + courseIdd);

    const dialogRef = this.dialog.open(AddStudentDialogComponent, {
      width: '500px',
      data: {iddStudent: courseIdd}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log("RESULT " + result);
        console.log(result);
        this.data.students.push(result);

      }
      this.studentTable.renderRows();
    });
  }

  onAddLesson(courseIdd: number) {

    const dialogRef = this.dialog.open(AddLessonCourseDialogComponent, {
      width: '500px',
      data: {iddCourse: courseIdd}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log("RESULT " + result);
        console.log(result);
        this.data.lessons.push(result);

      }
      this.lessonTable.renderRows();
    });
  }

}
