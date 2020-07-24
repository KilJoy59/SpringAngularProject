import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Student} from "../../_model/student/student";
import {Observable} from "rxjs";
import {Page} from "../../_model/page/page";
import {PageParams} from "../../_model/page/page-params";

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  constructor(private _httpClient: HttpClient) {
  }

  getStudentList(sort: string, order: string, page: number, pageSize: number): Observable<Page> {
    const href = '/api/student/list';
    const params: PageParams = new PageParams(page * pageSize, pageSize, {
      orderBy: sort,
      orderDir: order
    });
    return this._httpClient.post<Page>(href, params);
  }

  getStudentByIdd(idd: number): Observable<Student> {
    const href = '/api/student/' + idd;

    return this._httpClient.get<Student>(href);
  }

  updateStudent(idd: number, data: Student): Observable<Object> {
    const href = '/api/student/' + idd;

    return this._httpClient.patch(href, data);
  }

  deleteStudent(idd: number): Observable<Object> {
    const href = '/api/student/' + idd;
    return this._httpClient.delete(href);
  }

  createStudent(data: Student): Observable<Object> {
    const href = '/api/student';
    return this._httpClient.post(href, data);
  }

  getFreeStudents(idd: number): Observable<Object> {
    const href = '/api/student/' + idd + '/addStudent/list';

    return this._httpClient.get<Object>(href)
  }
}
