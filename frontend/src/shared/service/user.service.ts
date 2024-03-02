import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  currentUser!: User;

  constructor(private http: HttpClient, private cookieService: CookieService) {}
  loadLoggedInUser(): Observable<any> {
    console.log('loaded user');
    const apiUrl = `http://localhost:3000/api/v1/profile`;
    const options = { withCredentials: true };
    return this.http.get<any>(apiUrl, options).pipe(
      tap((response) => {
        console.log('Account details retireved successful', response);
      }),
      catchError((error) => {
        console.log('Error occurred in profile loading : ', error);
        return throwError(error);
      })
    );
  }
  logout(): Observable<any> {
    const apiUrl = `http://localhost:3000/api/v1/logout`;
    return this.http.get<any>(apiUrl).pipe(
      tap((response) => {
        console.log('Account logout successful', response);
        alert('logout successful');
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
  updateProfile(user: any): Observable<any> {
    const apiUrl = `http://localhost:3000/api/v1/me/update`;
    const options = { withCredentials: true };
    console.log('user data from profile page' + user);
    return this.http.put<any>(apiUrl, user,options).pipe(
      tap((response) => {
        console.log('Account update successful', response);
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
