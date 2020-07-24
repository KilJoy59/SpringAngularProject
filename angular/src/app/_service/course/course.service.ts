import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Page} from "../../_model/page/page";
import {PageParams} from "../../_model/page/page-params";
import {Course} from "../../_model/course/course";

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  constructor(private _httpClient: HttpClient) {
  }

  getCourseList(sort: string, order: string, page: number, pageSize: number): Observable<Page> {
    const href = '/api/course/list';
    const params: PageParams = new PageParams(page * pageSize, pageSize, {
      orderBy: sort,
      orderDir: order
    });
    return this._httpClient.post<Page>(href, params);
  }

  getCourseByIdd(idd: number): Observable<Course> {
    const href = '/api/course/' + idd;

    return this._httpClient.get<Course>(href);
  }

  updateCourse(idd: number, data: Course): Observable<Object> {
    const href = '/api/course/' + idd;

    return this._httpClient.patch(href, data);
  }

  deleteCourse(idd: number): Observable<Object> {
    const href = '/api/course/' + idd;
    return this._httpClient.delete(href);
  }

  createCourse(data: Course): Observable<Object> {
    const href = '/api/course';
    return this._httpClient.post(href, data);
  }
}
