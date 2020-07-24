import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../../_model/user/user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _httpClient: HttpClient) {
  }

  public getCurrentUser(): Observable<User> {
    return this._httpClient.get<User>('/api/auth/current')
  }

  public login(login: String, password: String): Observable<Object> {
    return this._httpClient.post('/api/auth/login', {login: login, password: password})
  }

  public logout(): Observable<Object> {
    return this._httpClient.get('/api/auth/logout')
  }
}
