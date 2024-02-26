import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { Observable, catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LibraryService {
  dataLoaded: boolean = false;

  constructor(private http: HttpClient, private userService: UserService) {}
  getAllLibrary(): Observable<any> {
    const url = `http://localhost:3000/api/v1/edu/get-all`;
    const options = { withCredentials: true };
    return this.http.get(url, options).pipe(
      tap((response) => {
        console.log('All eduContent from DB', response);
      }),
      catchError((error) => {
        console.log('Error occurred: ', error);
        return throwError(error);
      })
    );
  }

  createEduContent(eduContent: any): Observable<any> {
    const url = `http://localhost:3000/api/v1/edu/new`;
    const options = { withCredentials: true };
    return this.http.post(url, eduContent, options).pipe(
      tap((response) => {
        console.log('new eduContent created successfully', response);
      }),
      catchError((error) => {
        console.log('Error occurred: ', error);
        return throwError(error);
      })
    );
  }
  updateEduContent(eduContent: any): Observable<any> {
    const url = `http://localhost:3000/api/v1/edu/${eduContent.id}`;
    const options = { withCredentials: true };
    return this.http.put(url, eduContent, options).pipe(
      tap((response) => {
        console.log('eduContent updated successfully', response);
      }),
      catchError((error) => {
        console.log('Error occurred: ', error);
        return throwError(error);
      })
    );
  }
  viewEduContent(eduContentId: any): Observable<any> {
    const url = `http://localhost:3000/api/v1/edu/${eduContentId}`;
    const options = { withCredentials: true };
    return this.http.get(url, options).pipe(
      tap((response) => {
        console.log('eduContent details retrieved', response);
      }),
      catchError((error) => {
        console.log('Error occurred: ', error);
        return throwError(error);
      })
    );
  }
  deleteEduContent(eduContent: any): Observable<any> {
    const url = `http://localhost:3000/api/v1/edu/${eduContent.id}`;
    const options = { withCredentials: true };
    return this.http.delete(url, options).pipe(
      tap((response) => {
        console.log('eduContent deleted successfully', response);
      }),
      catchError((error) => {
        console.log('Error occurred: ', error);
        return throwError(error);
      })
    );
  }
  addToFav(card: any) {
    if (this.userService.currentUser != null) {
      let favList = this.userService.currentUser?.favList;
      const index = favList.findIndex((c) => c === card.id);
      console.log(card, 'data');
      if (index === -1) {
        favList.push(card);
      } else {
        favList.splice(index, 1);
      }
      localStorage.setItem(
        'user',
        JSON.stringify(this.userService.currentUser)
      );
    } else {
      alert('login to access your favorites');
    }
  }
  isFav(id: string) {
    if (this.userService.currentUser != null) {
      let favList = this.userService.currentUser?.favList;
      const index = favList.findIndex((c) => c === id);
      if (index === -1) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  }
}
