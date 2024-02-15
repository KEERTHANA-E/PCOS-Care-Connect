import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  currentUser: User;

  constructor(private http: HttpClient) {
    // this.currentUser=JSON.parse(localStorage.getItem('user')||'');
    this.currentUser=new User("username", "password",[],"email");
  }
  logout() {}
  login(user: any): Observable<User> {
    const apiUrl = `http://localhost:8080/api/user/login`;
    return this.http.post<User>(apiUrl, user).pipe(
      tap((response) => {
        console.log('Account login successful', response);

      }),
      catchError((error) => {
        console.log('Error occurred: ', error);
        return throwError(error);
      })
    );
  }
}
