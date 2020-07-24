import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTeacherDialogComponent } from './edit-teacher-dialog.component';

describe('EditTeacherDialogComponent', () => {
  let component: EditTeacherDialogComponent;
  let fixture: ComponentFixture<EditTeacherDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTeacherDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTeacherDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
