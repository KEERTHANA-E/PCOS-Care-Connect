import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddPostComponent } from 'src/app/components/add-post/add-post.component';
import { CommunityService } from 'src/shared/service/community.service';
import { UserService } from 'src/shared/service/user.service';
import { ShareDialogoxComponent } from '../share-dialogox/share-dialogox.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  data: any;
  constructor(
    private communityService: CommunityService,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.getLoggedInUserData();
    this.getAllPosts();
  }
  artworks: any = [];
  getAllPosts() {
    this.artworks = this.communityService
      .getAllPostsByUser()
      .subscribe((response: any) => {
        console.log(response);
        this.artworks = response.posts;
      });
  }
  openDialogForAdd() {
    const dialogRef = this.dialog.open(AddPostComponent, {
      width: '800px',
      height: '500px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result != null) {
        console.log('res', result);
        const obj = {
          title: result.data.title,
          content: result.data.content,
        };
        this.communityService.createPost(obj).subscribe({
          next: (response) => {
            console.log('user created successfully:', response);
            window.location.reload();
            // do something else, like refresh the user list
          },
          error: (err) => {
            console.log('error creating user:', err);
            // handle error - maybe display an error message to user
          },
        });
        this.getAllPosts();
      }
    });
  }
  openDialogForUpdate(post : any) {
    const dialogRef = this.dialog.open(ShareDialogoxComponent, {
      width: '800px',
      height: '500px',
      data : post
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result != null) {
        console.log('res', result);
        const obj = {
          title: result.data.title,
          content: result.data.content,
        };
        this.communityService.updatePost(obj).subscribe({
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
        this.getAllPosts();
      }
    });
  }
  getLoggedInUserData() {
    this.userService.loadLoggedInUser().subscribe((response: any) => {
      console.log('response' + response);
      this.userService.currentUser = response.user;
    });
  }
}
