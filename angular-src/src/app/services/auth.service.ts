import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { User } from '../shared/models/user.model';

import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public url = `http://localhost:4000`;
  public authToken: string;
  public user: User;

  constructor(private http: HttpClient, private jwtHelperService: JwtHelperService) {

  }

  addUser(user: User): Observable<Response> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json; charset=utf-8');
    return this.http.post(`${this.url}/users/register`, user, {}).pipe(map((data: Response) => {
      return data;
    }));
  }


  loginUser(user): Observable<Response> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json; charset=utf-8');
    return this.http.post(`${this.url}/users/authenticate`, user, {}).pipe(map((data: Response) => {
      return data;
    }));
  }


  getProfile(): Observable<Response> {
    this.loadToken();
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', this.authToken);
    headers = headers.append('Content-Type', 'application/json; charset=utf-8');
    return this.http.get(`${this.url}/users/profile`, { headers: headers }).pipe(map((data: Response) => {
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

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  isLoggedIn() {
    return !this.jwtHelperService.isTokenExpired(this.authToken);
  }
}
