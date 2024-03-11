import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CommunityService } from 'src/shared/service/community.service';
import { UserService } from 'src/shared/service/user.service';
import { ShareDialogoxComponent } from '../update-post/share-dialogox.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogboxComponent } from '../delete-dialogbox/delete-dialogbox.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  artworks: any;
  @Input() cardData: any;

  isfav!: boolean;
  constructor(
    private router: Router,
    private communityService: CommunityService,
    private snackBar: MatSnackBar,
    public userService: UserService,
    private dialog: MatDialog
  ) {
    console.log(this.router.url);
  }
  ngOnInit() {
    console.log('catdinfo');
    console.log(this.cardData.images);
    this.isfav = this.communityService.isFav(this.cardData._id);
    console.log(this.isfav);
  }
  openSnackBar() {
    this.snackBar.open('add to fav', 'close');
  }
  openSnackBar2() {
    this.snackBar.open('removed from fav', 'close');
  }
  onClick(card: any) {
    if (this.userService.currentUser != null) {
      this.communityService.toggleLike(card).subscribe((response: any) => {
        this.isfav = this.communityService.isFav(card._id);
        console.log('response' + response.message);
        if (response.message === 'Post liked successfully') this.openSnackBar();
        else this.openSnackBar2();
      });
      window.location.reload();
    } else {
      alert('login to add to fav');
    }
  }
  share(id: number) {
    if (navigator.share) {
      navigator.share({
        title: 'artworks',
        text: 'Check this art',
        url: `${window.location.origin}/view/${id}`,
      });
    }
  }

  openDialogForUpdate(post: any) {
    const dialogRef = this.dialog.open(ShareDialogoxComponent, {
      width: '800px',
      height: '500px',
      data: post,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result != null) {
        console.log('res', result);

        post.title = result.data.title;
        post.content = result.data.content;
        this.communityService.updatePost(post).subscribe({
          next: (response) => {
            console.log('post updated successfully:', response);
            window.location.reload();
            // do something else, like refresh the user list
          },
          error: (err) => {
            console.log('error creating user:', err);
            // handle error - maybe display an error message to user
          },
        });
      }
    });
  }
  openDialogForDelete(post: any): void {
    const dialogRef = this.dialog.open(DeleteDialogboxComponent, {
      width: '300px',
      height: '120px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result.data == true) {
        console.log('confirmed');
        this.communityService.deletePost(post).subscribe((response: any) => {
          console.log('response after delete', response);
          window.location.reload();
        });
      } else {
        console.log('deletion cancelled');
      }
    });
  }
}
