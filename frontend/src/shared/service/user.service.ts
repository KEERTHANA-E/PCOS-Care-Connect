import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { Observable, catchError, map, tap, throwError } from 'rxjs';
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
        this.currentUser=response.user;
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
  dietRecommend(formData: any): Observable<any> {
    const apiUrl = `http://localhost:5000/recommend`;
    console.log('form data from ');
    console.log(formData);
    return this.http.post<any>(apiUrl, formData).pipe(
      map((response) => {
        // Check for NaN values and handle them appropriately
        response.forEach((item: { AggregatedRating: string | null }) => {
          if (
            typeof item.AggregatedRating === 'string' &&
            item.AggregatedRating.toLowerCase() === 'nan'
          ) {
            item.AggregatedRating = null; // Replace "NaN" with null
          }
        });
        return response; // Return the modified response
      }),
      catchError((error) => {
        console.log('Error occurred: ', error);
        return throwError(error);
      })
    );
  }
  workoutRecommend(formData: any): Observable<any> {
    const prompt = `my height is ${formData.height}cms and weight is ${formData.weight}kgs`;

    // Encode the prompt for URL
    const encodedPrompt = encodeURIComponent(prompt);

    // Construct the apiUrl with encoded prompt
    // const apiUrl = `http://127.0.0.1:5000/WorkoutS?question=my height is 180cms and weight is 210kgs`;
const apiUrl = `http://127.0.0.1:5000/WorkoutS?question=my height is ${formData.height}cms and weight is ${formData.weight}kgs`;
    console.log(apiUrl);
    console.log('form data from ' + formData);
    return this.http.get<any>(apiUrl).pipe(
      tap((response) => {
        console.log('workout recommendation information', response);
      }),
      catchError((error) => {
        console.log('Error occurred: ', error);
        return throwError(error);
      })
    );
  }
  searchWorkout(type: any): Observable<any> {
    const apiUrl = `https://exercisedb.p.rapidapi.com/exercises/name/${type}`;
    // 'https://exercisedb.p.rapidapi.com/exercises/name/{name}
    console.log(apiUrl);
    const options = {
      headers: {
        'X-RapidAPI-Key': 'ff10444cb8msh30ab3d7006fe245p1acfb2jsn510cfd6a1e54',
        'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
      },
    };
    // const options = { withCredentials: true };
    return this.http.get(apiUrl, options).pipe(
      tap((response) => {
        console.log('workout search response', response);
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
    return this.http.put<any>(apiUrl, user, options).pipe(
      tap((response) => {
        console.log('Account update successful', response);
        this.currentUser = response.user;
      }),
      catchError((error) => {
        console.log('Error occurred: ', error);
        return throwError(error);
      })
    );
  }
  register(userData: any): Observable<any> {
    const formData = new FormData();
    formData.append('name', userData.name);
    formData.append('email', userData.email);
    formData.append('password', userData.password);
    if (userData.avatar) {
      formData.append('avatar', userData.avatar);
    }
    console.log(userData);
    const apiUrl = `http://localhost:3000/api/v1/register`;

    return this.http.post<any>(apiUrl, formData).pipe(
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
