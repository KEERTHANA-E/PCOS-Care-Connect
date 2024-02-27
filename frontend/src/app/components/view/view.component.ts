import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LibraryService } from 'src/shared/service/library.service';
import { UserService } from 'src/shared/service/user.service';
import { DeleteDialogboxComponent } from '../delete-dialogbox/delete-dialogbox.component';
import { ShareDialogoxComponent } from '../share-dialogox/share-dialogox.component';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
})
export class ViewComponent implements OnInit {
  @Input() cardData: any;
  isfav!: boolean;
  constructor(
    private router: Router,
    private libraryService: LibraryService,
    private snackBar: MatSnackBar,
    public userService: UserService,
    private dialog: MatDialog
  ) {
    console.log(this.router.url);
  }
  ngOnInit(): void {
    console.log(this.cardData);
    this.isfav = this.libraryService.isFav(this.cardData._id);
    console.log(this.isfav);
  }
  openSnackBar() {
    this.snackBar.open('add to fav', 'close');
  }
  openSnackBar2() {
    this.snackBar.open('removed from fav', 'close');
  }
  getLoggedInUserData() {
    this.userService.loadLoggedInUser().subscribe((response: any) => {
      console.log('response' + response);
      this.userService.currentUser = response.user;
    });
  }
  // onClick(card: any) {
  //   if (this.userService.currentUser != null) {
  //     this.libraryService.toggleLike(card).subscribe((response: any) => {
  //       this.getLoggedInUserData();
  //       this.isfav = this.libraryService.isFav(card._id);
  //       console.log('response' + response.message);
  //       if (response.message === 'Post liked successfully') this.openSnackBar();
  //       else this.openSnackBar2();
  //     });
  //     window.location.reload();
  //   } else {
  //     alert('login to add to fav');
  //   }
  // }
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
        this.libraryService.updateEduContent(post).subscribe({
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
        this.libraryService.deleteEduContent(post).subscribe((response: any) => {
          console.log('response after delete', response);
          window.location.reload();
        });
      } else {
        console.log('deletion cancelled');
      }
    });
  }
}
