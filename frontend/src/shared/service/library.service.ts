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
  toggleLike(post: any): Observable<any> {
    const url = `http://localhost:3000/api/v1/edu/${post._id}/like`;
    const options = { withCredentials: true };
    return this.http.post(url, post, options).pipe(
      tap((response) => {
        console.log('post liked successfully', response);
      }),
      catchError((error) => {
        console.log('Error occurred: ', error);
        return throwError(error);
      })
    );
  }
  addComment(obj: any, post: any): Observable<any> {
    const url = `http://localhost:3000/api/v1/edu/${post._id}/comments`;
    const options = { withCredentials: true };
    return this.http.post(url, obj, options).pipe(
      tap((response) => {
        console.log('post comment saved successfully', response);
      }),
      catchError((error) => {
        console.log('Error occurred: ', error);
        return throwError(error);
      })
    );
  }
  deleteComment(comment: any, post: any): Observable<any> {
    const url = `http://localhost:3000/api/v1/edu/${post._id}/comments/${comment._id}`;
    const options = { withCredentials: true };
    return this.http.delete(url, options).pipe(
      tap((response) => {
        console.log('deleted comment successfully', response);
      }),
      catchError((error) => {
        console.log('Error occurred: ', error);
        return throwError(error);
      })
    );
  }
  isFav(id: string) {
    if (this.userService.currentUser != null) {
      let favList = this.userService.currentUser?.favList;
      console.log(this.userService.currentUser);
      console.log(id);
      const index = favList.findIndex((c) => c === id);
      if (index === -1) {
        return false;
      } else {
        return true;
      }
    } else {
      console.log('empty');
      return false;
    }
  }
}
