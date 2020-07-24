import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {merge, of as observableOf} from "rxjs";
import {catchError, map, startWith, switchMap} from "rxjs/operators";
import {LessonService} from "../_service/lesson/lesson.service";
import {LessonList} from "../_model/lesson/lessonList";
import {MatDialog} from "@angular/material/dialog";
import {EditLessonDialogComponent} from "./edit-lesson-dialog/edit-lesson-dialog.component";
import {AddLessonDialogComponent} from "./add-lesson-dialog/add-lesson-dialog.component";

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.scss']
})
export class LessonComponent implements AfterViewInit {
  sizeOption: number[] = [2, 5, 10];
  displayedColumns: string[] = ['id', 'name', 'course', 'room', 'lessonDateStart', 'lessonDateEnd', 'view'];
  data: LessonList[];

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _lessonService: LessonService, public dialog: MatDialog) {
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    this.refresh();
  }

  openEditDialog(id: number) {
    const dialogRef = this.dialog.open(EditLessonDialogComponent, {
      width: '800px',
      data: id

    });

    dialogRef.afterClosed().subscribe(result => {
      this.refresh();
    });
  }

  openCreateDialog() {
    const dialogRef = this.dialog.open(AddLessonDialogComponent, {
      width: '800px',
    });
  }

  refresh() {
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this._lessonService!.getLessonList(
            this.sort.active, this.sort.direction, this.paginator.pageIndex, this.paginator.pageSize);
        }),
        map(data => {
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.resultsLength = data.totalCount;

          return data.list;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          this.isRateLimitReached = true;
          return observableOf([]);
        })
      ).subscribe(data => this.data = data);
  }
}
