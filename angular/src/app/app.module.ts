import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RoomComponent} from './room/room.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatSortModule} from "@angular/material/sort";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {InstrumentComponent} from './instrument/instrument.component';
import {MatMenuModule} from "@angular/material/menu";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatDialogModule} from "@angular/material/dialog";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatSelectModule} from "@angular/material/select";
import {CourseComponent} from "./course/course.component";
import {LessonComponent} from "./lesson/lesson.component";
import {StudentComponent} from "./student/student.component";
import {TeacherComponent} from "./teacher/teacher.component";
import {RoomEditDialogComponent} from "./room/room-edit-dialog/room-edit-dialog.component";
import {AddInstrumentDialogComponent} from "./room/room-edit-dialog/add-instrument-dialog/add-instrument-dialog.component";
import {ErrorDialogComponent} from "./error-dialog/error-dialog.component";
import {LoginComponent} from "./login/login.component";
import {AuthInterceptor} from "./_service/auth/auth.interceptor";
import {EditCourseDialogComponent} from './course/edit-course-dialog/edit-course-dialog.component';
import {EditLessonDialogComponent} from './lesson/edit-lesson-dialog/edit-lesson-dialog.component';
import {EditStudentDialogComponent} from './student/edit-student-dialog/edit-student-dialog.component';
import {EditInstrumentDialogComponent} from './instrument/edit-instrument-dialog/edit-instrument-dialog.component';
import {EditTeacherDialogComponent} from './teacher/edit-teacher-dialog/edit-teacher-dialog.component';

import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {LogoutComponent} from './logout/logout.component';
import {MatSidenavModule} from "@angular/material/sidenav";

import {MatToolbarModule} from "@angular/material/toolbar";
import {MatListModule} from "@angular/material/list";
import {CommonModule} from "@angular/common";
import {MatTabsModule} from "@angular/material/tabs";
import {MatGridListModule} from "@angular/material/grid-list";
import {SidenavListComponent} from './sidenav-list/sidenav-list.component';
import {HeaderComponent} from './header/header.component';
import {AddCourseDialogComponent} from "./student/edit-student-dialog/add-course-dialog/add-course-dialog.component";
import {AddLessonDialogComponent} from './lesson/add-lesson-dialog/add-lesson-dialog.component';
import {AddStudentDialogComponent} from './course/edit-course-dialog/add-student-dialog/add-student-dialog.component';
import {AddLessonCourseDialogComponent} from "./course/edit-course-dialog/add-lesson-dialog/add-lesson-course-dialog.component";

@NgModule({
  declarations: [
    AppComponent,
    RoomComponent,
    InstrumentComponent,
    CourseComponent,
    LessonComponent,
    StudentComponent,
    TeacherComponent,
    RoomEditDialogComponent,
    AddInstrumentDialogComponent,
    ErrorDialogComponent,
    LoginComponent,
    EditLessonDialogComponent,
    EditStudentDialogComponent,
    EditCourseDialogComponent,
    EditInstrumentDialogComponent,
    EditTeacherDialogComponent,
    AddCourseDialogComponent,
    LogoutComponent,
    SidenavListComponent,
    HeaderComponent,
    AddLessonDialogComponent,
    AddStudentDialogComponent,
    AddLessonCourseDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    FormsModule,
    MatCheckboxModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    MatGridListModule,
    MatTabsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    MatCheckboxModule,
    MatSelectModule,
    ReactiveFormsModule
  ],
  exports: [
    MatTabsModule,
    MatSidenavModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    MatDatepickerModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
