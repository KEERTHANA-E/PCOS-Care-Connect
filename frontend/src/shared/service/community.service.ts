import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CommunityService {
  dataLoaded: boolean=false;

  constructor(private http: HttpClient, private userService: UserService) { }
  getAllData(){
    const url =`http://localhost:3000/api/v1/edu/get-all`;
    return this.http.get(url);
  }
  getApiData(page: number, limit: number): any {
    const url = `https://api.artic.edu/api/v1/artworks?page=${page}&limit=${limit}`;
    this.dataLoaded = false;
    return this.http.get(url);
  }
  addToFav(card: any) {
    if (this.userService.currentUser != null) {
      let favList = this.userService.currentUser?.favList;
      const index = favList.findIndex(c => c === card.id);
      console.log(card, "data");
      if (index === -1) {
        favList.push(card);
      } else {
        favList.splice(index, 1);
      }
      localStorage.setItem('user',JSON.stringify(this.userService.currentUser));
    }
    else{
      alert("login to access your favorites");
    }

  }
  isFav(id: string) {
    if (this.userService.currentUser != null) {
      let favList = this.userService.currentUser?.favList;
      const index = favList.findIndex(c => c === id);
      if (index === -1) {
        return false;
      } else {
        return true;
      }
    }
    else{
      return false;
    }
  }
}
