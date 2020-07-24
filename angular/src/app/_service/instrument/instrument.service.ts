import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Instrument} from "../../_model/instrument/instrument";
import {Observable} from "rxjs";
import {Page} from "../../_model/page/page";
import {PageParams} from "../../_model/page/page-params";

@Injectable({
  providedIn: 'root'
})
export class InstrumentService {
  constructor(private _httpClient: HttpClient) {
  }

  getInstrumentList(sort: string, order: string, page: number, pageSize: number): Observable<Page> {
    const href = '/api/instrument/list';
    const params: PageParams = new PageParams(page * pageSize, pageSize, {
      orderBy: sort,
      orderDir: order
    });
    return this._httpClient.post<Page>(href, params);
  }

  getFreeInstrumentList(idd: number): Observable<Object> {
    const href = '/api/instrument/' + idd + '/addInstrument/list';

    return this._httpClient.get<Object>(href)
  }

  getInstrumentByIdd(idd: number): Observable<Instrument> {
    const href = '/api/instrument/' + idd;

    return this._httpClient.get<Instrument>(href);
  }

  updateInstrument(idd: number, data: Instrument): Observable<Object> {
    const href = '/api/instrument/' + idd;

    return this._httpClient.patch(href, data);
  }

  deleteInstrument(idd: number): Observable<Object> {
    const href = '/api/instrument/' + idd;
    return this._httpClient.delete(href);
  }

  createInstrument(data: Instrument): Observable<Object> {
    const href = '/api/instrument';
    return this._httpClient.post(href, data);
  }
}
