import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Teacher} from "../../_model/teacher/teacher";
import {Observable} from "rxjs";
import {Page} from "../../_model/page/page";
import {PageParams} from "../../_model/page/page-params";

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  constructor(private _httpClient: HttpClient) {
  }

  getTeacherList(sort: string, order: string, page: number, pageSize: number): Observable<Page> {
    const href = '/api/teacher/list';
    const params: PageParams = new PageParams(page * pageSize, pageSize, {
      orderBy: sort,
      orderDir: order
    });
    return this._httpClient.post<Page>(href, params);
  }

  getTeacherByIdd(idd: number): Observable<Teacher> {
    const href = '/api/teacher/' + idd;

    return this._httpClient.get<Teacher>(href);
  }

  updateTeacher(idd: number, data: Teacher): Observable<Object> {
    const href = '/api/teacher/' + idd;

    return this._httpClient.patch(href, data);
  }

  deleteTeacher(idd: number): Observable<Object> {
    const href = '/api/teacher/' + idd;
    return this._httpClient.delete(href);
  }

  createTeacher(data: Teacher): Observable<Object> {
    const href = '/api/teacher';
    return this._httpClient.post(href, data);
  }
}
