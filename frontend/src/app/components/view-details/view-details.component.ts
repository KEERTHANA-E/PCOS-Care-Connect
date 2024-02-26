import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LibraryService } from 'src/shared/service/library.service';

@Component({
  selector: 'app-view-details',
  templateUrl: './view-details.component.html',
  styleUrls: ['./view-details.component.css'],
})
export class ViewDetailsComponent {
  panelOpenState = false;
  artworks: any;
  _id: string;
  constructor(
    private activeRoute: ActivatedRoute,
    private libraryService: LibraryService
  ) {
    this._id = this.activeRoute.snapshot.params['id'];
    console.log('active', this.activeRoute);
    console.log('id', this._id);
  }
  ngOnInit(): void {
    this.getArtworks();
  }
  getArtworks() {
    this.artworks = this.libraryService
      .viewEduContent(this._id)
      .subscribe((response: any) => {
        this.artworks = response.eduContent;
        console.log('details in library' + response.eduContent);
        this.libraryService.dataLoaded = true;
      });
  }
}
