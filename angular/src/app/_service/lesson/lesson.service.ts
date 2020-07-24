import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Lesson} from "../../_model/lesson/lesson";
import {Observable} from "rxjs";
import {Page} from "../../_model/page/page";
import {PageParams} from "../../_model/page/page-params";
import {LessonCreate} from "../../_model/lesson/lesson-create";

@Injectable({
  providedIn: 'root'
})
export class LessonService {
  constructor(private _httpClient: HttpClient) {
  }

  getLessonList(sort: string, order: string, page: number, pageSize: number): Observable<Page> {
    const href = '/api/lesson/list';
    const params: PageParams = new PageParams(page * pageSize, pageSize, {
      orderBy: sort,
      orderDir: order
    });
    return this._httpClient.post<Page>(href, params);
  }

  getLessonById(id: number): Observable<Lesson> {
    const href = '/api/lesson/' + id;

    return this._httpClient.get<Lesson>(href);
  }

  updateLesson(id: number, data: Lesson): Observable<Object> {
    const href = '/api/lesson/' + id;
    console.log("before patch:");
    console.log(data);
    return this._httpClient.patch(href, data);
  }

  deleteLesson(id: number): Observable<Object> {
    const href = '/api/lesson/' + id;
    return this._httpClient.delete(href);
  }

  createLesson(data: LessonCreate): Observable<Object> {
    const href = '/api/lesson';
    return this._httpClient.post(href, data);
  }
}
