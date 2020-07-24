import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {merge, of as observableOf} from "rxjs";
import {catchError, map, startWith, switchMap} from "rxjs/operators";
import {TeacherList} from "../_model/teacher/teacherList";
import {TeacherService} from "../_service/teacher/teacher.service";
import {SelectionModel} from "@angular/cdk/collections";
import {EditTeacherDialogComponent} from "./edit-teacher-dialog/edit-teacher-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.scss']
})
export class TeacherComponent implements AfterViewInit {
  sizeOption: number[] = [2, 5, 10];
  displayedColumns: string[] = ['idd', 'firstName', 'middleName', 'lastName', 'createDate', 'view'];
  data: TeacherList[];
  selection = new SelectionModel<TeacherList>(false, []);

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _teacherService: TeacherService, public dialog: MatDialog) {
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    this.refresh();
  }

  openEditDialog(iddRoom: number) {
    const dialogRef = this.dialog.open(EditTeacherDialogComponent, {
      width: '800px',
      data: iddRoom
    });

    dialogRef.afterClosed().subscribe(result => {
      this.refresh();
    });
  }

  openCreateDialog() {
    const dialogRef = this.dialog.open(EditTeacherDialogComponent, {
      width: '800px',
    });
  }

  refresh() {
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this._teacherService!.getTeacherList(
            this.sort.active, this.sort.direction, this.paginator.pageIndex, this.paginator.pageSize);
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.resultsLength = data.totalCount;

          return data.list;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          // Catch if the GitHub API has reached its rate limit. Return empty data.
          this.isRateLimitReached = true;
          return observableOf([]);
        })
      ).subscribe(data => this.data = data);
  }
}
