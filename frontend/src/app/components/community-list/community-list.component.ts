import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { CommunityService } from 'src/shared/service/community.service';

@Component({
  selector: 'app-community-list',
  templateUrl: './community-list.component.html',
  styleUrls: ['./community-list.component.css']
})
export class CommunityListComponent implements OnInit{
  artworks: any =[
    {
      id:"1",
      title:"Community"
    }
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  pageSize = 4;
  currentPage = 1;
  TotalItems = 123203;
  isActive = true;
  constructor(private communityService: CommunityService) {

  }
  ngOnInit(): void {
    this.getArtworks();
  }
  getArtworks() {
    const page = this.currentPage;
    const limit = this.pageSize;
    this.isActive=true;
      this.artworks = this.communityService.getApiData(page, limit).subscribe((response: any) => {
        this.artworks = response;
        this.TotalItems=response.pagination.total;
        this.communityService.dataLoaded = true;
      });
  }
  onPageChange(event: any) {
    console.log("change event is called in collections page")
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.getArtworks();
  }
}

