import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Headers } from '@angular/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { User } from '../shared/models/user.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public url = `http://localhost:4000`;
  public authToken: string;
  public user: User;

  constructor(private http: HttpClient) {

  }

  addUser(user: User): Observable<Response> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(`${this.url}/users/register`, user, {}).pipe(map((data: Response) => {
      return data;
    }));
  }


  loginUser(user): Observable<Response> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(`${this.url}/users/authenticate`, user, {}).pipe(map((data: Response) => {
      return data;
    }));
  }


  storeTokenData(token: string, user: User) {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('id_token', token);
    this.authToken = token;
    this.user = user;
  }

  logout() {
    localStorage.clear();
    this.authToken = null;
    this.user = null;
  }
}
