import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MatTable} from "@angular/material/table";
import {InstrumentList} from "../../_model/instrument/instrumentList";
import {SelectionModel} from "@angular/cdk/collections";
import {InstrumentService} from "../../_service/instrument/instrument.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Instrument} from "../../_model/instrument/instrument";

@Component({
  selector: 'app-edit-instrument-dialog',
  templateUrl: './edit-instrument-dialog.component.html',
  styleUrls: ['./edit-instrument-dialog.component.scss']
})
export class EditInstrumentDialogComponent implements OnInit {
  @ViewChild(MatTable) instrumentTable: MatTable<InstrumentList>;

  data: Instrument = new Instrument();

  selection = new SelectionModel(false, []);
  historyDisplayedColumns: string[] = ['id', 'name', 'number', 'deleteDate'];
  showHistoryTable: boolean = false;

  constructor(
    private _instrumentService: InstrumentService,
    public dialogRef: MatDialogRef<EditInstrumentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public idd: number,
    public dialog: MatDialog) {
  }


  ngOnInit(): void {
    if (this.idd) {
      this._instrumentService.getInstrumentByIdd(this.idd)
        .pipe()
        .subscribe(room => {
          this.data = room
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
      this._instrumentService.updateInstrument(this.idd, this.data)
        .toPromise()
        .then(res => this.dialogRef.close())
        .catch(error => console.log(error));
    } else {
      this._instrumentService.createInstrument(this.data)
        .toPromise()
        .then(res => this.dialogRef.close())
        .catch(error => console.log(error));
    }
  }

  onDeleteClick() {
    console.log("onDeleteClick");
    this._instrumentService.deleteInstrument(this.idd)
      .toPromise()
      .then(res => this.dialogRef.close())
      .catch(error => console.log(error));
  }
}
