import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInstrumentDialogComponent } from './edit-instrument-dialog.component';

describe('EditInstrumentDialogComponent', () => {
  let component: EditInstrumentDialogComponent;
  let fixture: ComponentFixture<EditInstrumentDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditInstrumentDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditInstrumentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
