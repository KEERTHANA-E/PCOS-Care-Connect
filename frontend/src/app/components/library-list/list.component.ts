import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { LibraryService } from 'src/shared/service/library.service';
import { MatDialog } from '@angular/material/dialog';
import { AddEduComponent } from '../add-edu/add-edu.component';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/shared/service/user.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  artworks: any = [
    {
      id: '1',
      title: 'Community',
    },
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  pageSize = 4;
  currentPage = 1;
  TotalItems = 123203;
  isActive = true;
  videoItems: any[] | undefined;
  loading: boolean = true;

  constructor(
    private libraryService: LibraryService,
    private dialog: MatDialog,
    private http: HttpClient,
    public userService :UserService
  ) {}
  ngOnInit(): void {
    this.getAllPosts();
    this.getVideos();
  }
  getAllPosts() {
    const page = this.currentPage;
    const limit = this.pageSize;
    this.isActive = true;
    this.artworks = this.libraryService
      .getAllLibrary()
      .subscribe((response: any) => {
        console.log(response);
        this.artworks = response.eduContentList;
        this.TotalItems = response.eduContentList.length;
        this.libraryService.dataLoaded = true;
      });
  }
  onPageChange(event: any) {
    console.log('change event is called in collections page');
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.getAllPosts();
  }
  getVideos(): void {
    const apiUrl =
      'https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=PLGJ2sPspK2dxtkg8CdzwEHsvpXZTJ1a4_&maxResults=21&key=AIzaSyBm7ZA4eNeK34WqaKSDPsfCsssw37JHEdY';

    this.http.get<any>(apiUrl).subscribe(
      (data) => {
        this.videoItems = data.items;
        this.loading = false;
      },
      (err) => {
        console.error('Error fetching videos:', err);
        this.loading = false;
      }
    );
  }
  openDialogForAdd() {
    const dialogRef = this.dialog.open(AddEduComponent, {
      width: '600px',
      height: '400px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result != null) {
        console.log('res', result);
        const obj = {
          title: result.data[0].title,
          content: result.data[0].content,
          images: result.data[1],
        };

        this.libraryService.createEduContent(obj).subscribe({
          next: (response) => {
            console.log('user created successfully:', response);
            // window.location.reload();
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
}
