import {InstrumentList} from "../instrument/instrumentList";

export class Room {
  idd: number;
  number: string;
  block: string;
  createDate: string;
  history: [];
  instruments: InstrumentList[];

}
