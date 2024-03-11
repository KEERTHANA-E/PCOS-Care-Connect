import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { LibraryService } from 'src/shared/service/library.service';
import { UserService } from 'src/shared/service/user.service';
import { DeleteDialogboxComponent } from '../delete-dialogbox/delete-dialogbox.component';
import { ShareDialogoxComponent } from '../update-post/share-dialogox.component';
import { EditEduComponent } from '../edit-edu/edit-edu.component';

@Component({
  selector: 'app-view-details',
  templateUrl: './view-details.component.html',
  styleUrls: ['./view-details.component.css'],
})
export class ViewDetailsComponent {
  panelOpenState = false;
  artworks: any;
  _id: string;
  commentForm: FormGroup | any;
  carouselItems: any[] = [
    {
      type: 'image',
      url: '../../../assets/pic1.svg',
      title: 'Understanding PCOS',
      description:
        'PCOS is a hormonal disorder common among women of reproductive age. It may cause irregular periods, infertility, and other health issues.',
    },
    {
      type: 'image',
      url: '../../../assets/pic2.svg',
      title: 'Symptoms of PCOS',
      description:
        'Symptoms of PCOS vary, but they often include irregular periods, excess hair growth, acne, and weight gain. Early diagnosis and treatment are crucial.',
    },
    {
      type: 'image',
      url: '../../../assets/pic3.svg',
      title: 'Managing PCOS',
      description:
        'Managing PCOS involves lifestyle changes such as a healthy diet, regular exercise, and medications to regulate hormones and manage symptoms.',
    },
  ];
  constructor(
    private activeRoute: ActivatedRoute,
    private libraryService: LibraryService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    public userService: UserService
  ) {
    this._id = this.activeRoute.snapshot.params['id'];
    console.log('active', this.activeRoute);
    console.log('id', this._id);
  }
  ngOnInit(): void {
    this.commentForm = this.fb.group({
      text: this.fb.control('', [Validators.required]),
    });
    this.getArtworks();
  }
  addComment() {
    if (this.commentForm.valid) {
      console.log('data', this.commentForm.value);
      const obj = {
        text: this.commentForm.value.text,
      };
      this.libraryService.addComment(obj, this.artworks).subscribe({
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
    }
  }
  deleteComment(comment: any) {
    this.libraryService.deleteComment(comment, this.artworks).subscribe({
      next: (response) => {
        console.log('user deleted the comment successfully:', response);
        window.location.reload();
        // do something else, like refresh the user list
      },
      error: (err) => {
        console.log('error deleting user comment :', err);
        // handle error - maybe display an error message to user
      },
    });
  }
  getArtworks() {
    this.artworks = this.libraryService
      .viewEduContent(this._id)
      .subscribe((response: any) => {
        this.artworks = response.eduContent;
        this.carouselItems = response.eduContent.images;
        console.log('details in library' + response.eduContent.postedBy);
        console.log('details in library' + this.userService.currentUser._id);
        this.libraryService.dataLoaded = true;
      });
  }
  openDialogForUpdate(post: any) {
    const dialogRef = this.dialog.open(EditEduComponent, {
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
        this.libraryService
          .deleteEduContent(post)
          .subscribe((response: any) => {
            console.log('response after delete', response);
            window.location.reload();
          });
      } else {
        console.log('deletion cancelled');
      }
    });
  }
}
