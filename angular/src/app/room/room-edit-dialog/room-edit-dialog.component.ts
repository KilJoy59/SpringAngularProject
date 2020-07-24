import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Room} from "../../_model/room/room";
import {RoomService} from "../../_service/room/room.service";
import {SelectionModel} from "@angular/cdk/collections";
import {AddInstrumentDialogComponent} from "./add-instrument-dialog/add-instrument-dialog.component";
import {InstrumentService} from "../../_service/instrument/instrument.service";
import {MatTable} from "@angular/material/table";
import {InstrumentList} from "../../_model/instrument/instrumentList";

@Component({
  selector: 'app-room-edit-dialog',
  templateUrl: './room-edit-dialog.component.html',
  styleUrls: ['./room-edit-dialog.component.scss']
})
export class RoomEditDialogComponent implements OnInit {
  @ViewChild(MatTable) instrumentTable: MatTable<InstrumentList>;

  data: Room = new Room();

  instrumentsDisplayedColumns: string[] = ['select', 'idd', 'name', 'number', 'createDate'];
  historyDisplayedColumns: string[] = ['id', 'number', 'block', 'deleteDate'];

  showInstrumentTable: boolean = false;
  showHistoryTable: boolean = false;

  selection = new SelectionModel(false, []);

  constructor(
    private _roomService: RoomService,
    private _instrumentService: InstrumentService,
    public dialogRef: MatDialogRef<RoomEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public idd: number, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    console.log("init" + this.data);
    console.log(this.data);
    if (this.idd) {
      this._roomService.getRoomByIdd(this.idd)
        .pipe()
        .subscribe(room => {
          this.data = room;
        });
    } else {
      this.data.instruments = [];
    }
  }

  setShowInstrumentTable() {
    console.log("setShowInstrumentTable");
    this.showInstrumentTable = !this.showInstrumentTable;
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
      this._roomService.updateRoom(this.idd, this.data)
        .toPromise()
        .then(res => this.dialogRef.close())
        .catch(error => console.log(error));
    } else {
      this._roomService.createRoom(this.data)
        .toPromise()
        .then(res => this.dialogRef.close())
        .catch(error => console.log(error));
    }
  }

  onDeleteClick() {
    console.log("onDeleteClick");
    this._roomService.deleteRoom(this.idd)
      .toPromise()
      .then(res => this.dialogRef.close())
      .catch(error => console.log(error));
  }

  onDeleteInstrument() {
    console.log("onDeleteInstrument");
    this.data.instruments
      = this.data.instruments.filter(obj => obj.idd !== this.selection.selected[0].idd);
    this.selection.clear();
    this.instrumentTable.renderRows();
  }

  onAddInstrument(roomIdd: number) {
    console.log("onAddInstrument" + roomIdd);

    const dialogRef = this.dialog.open(AddInstrumentDialogComponent, {
      width: '500px',
      data: {iddRoom: roomIdd}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.data.instruments.push(result);

      }
      this.instrumentTable.renderRows();
    });
  }
}
