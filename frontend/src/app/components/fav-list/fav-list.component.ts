import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { CommunityService } from 'src/shared/service/community.service';
import { UserService } from 'src/shared/service/user.service';

@Component({
  selector: 'app-fav-list',
  templateUrl: './fav-list.component.html',
  styleUrls: ['./fav-list.component.css'],
})
export class FavListComponent {
  artworks: any = [];
  favList! :any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  pageSize = 4;
  currentPage = 1;
  TotalItems = 123203;
  isActive = true;
  constructor(private userService: UserService,
    private communityService:CommunityService) {}
  ngOnInit(): void {
    this.getAllFavPosts();
  }
  getAllFavPosts() {
    const page = this.currentPage;
    const limit = this.pageSize;
    this.isActive = true;
    this.favList = this.userService.currentUser.favList;
    // we will have a list of Ids related to post we have to retrieve posts by calling function with each Id in the list. function name is viewPost argument is id
     this.favList.forEach((postId : string) => {
       // Call the viewPost function to retrieve the post by ID
       this.communityService.viewPost(postId).subscribe((response: any) => {
         this.artworks.push(response.post);
         console.log('details' + response.post);
         this.communityService.dataLoaded = true;
       });
     });
     console.log("artwork is " + this.artworks)
  }
  onPageChange(event: any) {
    console.log('change event is called in collections page');
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.getAllFavPosts();
  }
}
