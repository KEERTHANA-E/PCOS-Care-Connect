import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { LibraryService } from 'src/shared/service/library.service';
import { MatDialog } from '@angular/material/dialog';
import { AddEduComponent } from '../add-edu/add-edu.component';

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
  constructor(
    private libraryService: LibraryService,
    private dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.getAllPosts();
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
