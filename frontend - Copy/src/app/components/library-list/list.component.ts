import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { LibraryService } from 'src/shared/service/library.service';

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
  constructor(private libraryService: LibraryService) {}
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
}
