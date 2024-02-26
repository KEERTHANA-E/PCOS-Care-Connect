import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  currentUser: User;

  constructor(private http: HttpClient, private cookieService: CookieService) {
    // this.currentUser=JSON.parse(localStorage.getItem('user')||'');
    this.currentUser = new User('username', 'password', [], 'email');
  }
  logout(): Observable<any> {
    const apiUrl = `http://localhost:3000/api/v1/logout`;
    return this.http.get<any>(apiUrl).pipe(
      tap((response) => {
        console.log('Account logout successful', response);
        alert("logout successful")
      }),
      catchError((error) => {
        console.log('Error occurred: ', error);
        return throwError(error);
      })
    );
  }

  login(user: any): Observable<any> {
    const apiUrl = `http://localhost:3000/api/v1/login`;
    console.log('user data from login page' + user);
    return this.http.post<any>(apiUrl, user).pipe(
      tap((response) => {
        console.log('Account login successful', response);
        const token = response.token;
        this.cookieService.set('token', token);
        this.currentUser = response.user;
      }),
      catchError((error) => {
        console.log('Error occurred: ', error);
        return throwError(error);
      })
    );
  }
  register(user: any): Observable<User> {
    const apiUrl = `http://localhost:3000/api/v1/register`;
    console.log('user data from register page' + user);
    return this.http.post<User>(apiUrl, user).pipe(
      tap((response) => {
        console.log('Account register successful', response);
      }),
      catchError((error) => {
        console.log('Error occurred: ', error);
        return throwError(error);
      })
    );
  }
}
