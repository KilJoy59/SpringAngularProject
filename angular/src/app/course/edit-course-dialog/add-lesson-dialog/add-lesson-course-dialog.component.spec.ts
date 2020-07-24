import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLessonCourseDialogComponent } from './add-lesson-course-dialog.component';

describe('AddLessonDialogComponent', () => {
  let component: AddLessonCourseDialogComponent;
  let fixture: ComponentFixture<AddLessonCourseDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddLessonCourseDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLessonCourseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
