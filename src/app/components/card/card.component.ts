import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CommunityService } from 'src/shared/service/community.service';
import { UserService } from 'src/shared/service/user.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  artworks: any;
  @Input() cardData: any;

  isfav!: boolean;
  constructor(private router: Router, private communityService: CommunityService, private snackBar: MatSnackBar, private userService: UserService) {
    console.log(this.router.url);
  }
  ngOnInit() {
    this.isfav = this.communityService.isFav(this.cardData.id);
  }
  openSnackBar() {
    this.snackBar.open("add to fav", "close");
  }
  openSnackBar2() {
    this.snackBar.open("removed from fav", "close");
  }
  onClick(card: any) {
    if (this.userService.currentUser != null) {
      this.communityService.addToFav(card);
      this.isfav = this.communityService.isFav(card.id);
      if (this.isfav == true) this.openSnackBar();
      else this.openSnackBar2();
    }
    else{
      alert("login to add to fav");
    }
  }
  share(id:number){
    if(navigator.share){
      navigator.share({
        title:"artworks",
        text:"Check this art",
        url:`${window.location.origin}/view/${id}`
      })
    }
  }
  
}
