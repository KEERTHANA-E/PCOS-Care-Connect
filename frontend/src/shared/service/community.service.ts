import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class CommunityService {
  dataLoaded: boolean = false;

  constructor(private http: HttpClient, private userService: UserService) {}
  getAllPosts(): Observable<any> {
    const url = `http://localhost:3000/api/v1/post/get-all`;
    const options = { withCredentials: true };
    return this.http.get(url, options).pipe(
      tap((response) => {
        console.log('All posts from DB', response);
      }),
      catchError((error) => {
        console.log('Error occurred: ', error);
        return throwError(error);
      })
    );
  }
  getAllPostsByUser(): Observable<any> {
    const url = `http://localhost:3000/api/v1/post/my`;
    const options = { withCredentials: true };
    return this.http.get(url, options).pipe(
      tap((response) => {
        console.log('All posts made by loggedin user', response);
      }),
      catchError((error) => {
        console.log('Error occurred: ', error);
        return throwError(error);
      })
    );
  }
  createPost(post: any): Observable<any> {
    const url = `http://localhost:3000/api/v1/post/new`;
    const options = { withCredentials: true };
    return this.http.post(url, post, options).pipe(
      tap((response) => {
        console.log('new post created successfully', response);
      }),
      catchError((error) => {
        console.log('Error occurred: ', error);
        return throwError(error);
      })
    );
  }
  updatePost(post: any): Observable<any> {
    const url = `http://localhost:3000/api/v1/post/${post._id}`;
    const options = { withCredentials: true };
    return this.http.put(url, post, options).pipe(
      tap((response) => {
        console.log('post updated successfully', response);
      }),
      catchError((error) => {
        console.log('Error occurred: ', error);
        return throwError(error);
      })
    );
  }
  viewPost(postId: any): Observable<any> {
    const url = `http://localhost:3000/api/v1/post/${postId}`;
    const options = { withCredentials: true };
    return this.http.get(url, options).pipe(
      tap((response) => {
        console.log('post details retrieved', response);
      }),
      catchError((error) => {
        console.log('Error occurred: ', error);
        return throwError(error);
      })
    );
  }
  deletePost(post: any): Observable<any> {
    const url = `http://localhost:3000/api/v1/post/${post._id}`;
    const options = { withCredentials: true };
    return this.http.delete(url, options).pipe(
      tap((response) => {
        console.log('post deleted successfully', response);
      }),
      catchError((error) => {
        console.log('Error occurred: ', error);
        return throwError(error);
      })
    );
  }
  toggleLike(post: any): Observable<any> {
    const url = `http://localhost:3000/api/v1/post/${post._id}/like`;
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
    const url = `http://localhost:3000/api/v1/post/${post._id}/comments`;
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
    const url = `http://localhost:3000/api/v1/post/${post._id}/comments/${comment._id}`;
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
