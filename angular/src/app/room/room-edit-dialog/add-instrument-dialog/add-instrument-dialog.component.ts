import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {InstrumentList} from "../../../_model/instrument/instrumentList";
import {InstrumentService} from "../../../_service/instrument/instrument.service";

@Component({
  selector: 'app-add-instrument-dialog',
  templateUrl: './add-instrument-dialog.component.html',
  styleUrls: ['./add-instrument-dialog.component.scss']
})
export class AddInstrumentDialogComponent implements OnInit {
  instruments: InstrumentList[] = [];
  selected: number;
  iddRoom: number;

  constructor(
    public dialogRef: MatDialogRef<AddInstrumentDialogComponent>,
    private _instrumentService: InstrumentService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.iddRoom = data.iddRoom
  }

  ngOnInit(): void {
    if (this.iddRoom != null) {
      this._instrumentService.getFreeInstrumentList(this.iddRoom)
        .pipe()
        .subscribe(instruments => this.instruments = instruments as InstrumentList[]);
    } else {
      this._instrumentService.getInstrumentList("idd", "asc", 0, 1000)
        .pipe()
        .subscribe(instruments => this.instruments = instruments.list)
    }
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
