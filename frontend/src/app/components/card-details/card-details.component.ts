import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommunityComponent } from '../community/community.component';
import { CommunityService } from 'src/shared/service/community.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.css'],
})
export class CardDetailsComponent {
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
  content: any = {
    title: 'Sample Title',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    images: [
      { url: '../../../assets/community.svg', altText: 'Image 1' },
      { url: '../../../assets/community.svg', altText: 'Image 2' },
      // Add more images as needed
    ],
  };
  constructor(
    private activeRoute: ActivatedRoute,
    private communityService: CommunityService,
    private fb: FormBuilder
  ) {
    this._id = this.activeRoute.snapshot.params['id'];
    console.log('active', this.activeRoute);
    console.log('id', this._id);
  }
  ngOnInit(): void {
    this.commentForm=this.fb.group({
      text : this.fb.control('',[Validators.required])
    });
    this.getArtworks();
  }
  addComment(){
    if(this.commentForm.valid){
      console.log('data',this.commentForm.value);
      const obj = {
        text : this.commentForm.value.text
      }
      this.communityService.addComment(obj,this.artworks).subscribe({
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
  getArtworks() {
    this.artworks = this.communityService
      .viewPost(this._id)
      .subscribe((response: any) => {
        this.artworks = response.post;
        console.log('details' + response.post);
        this.communityService.dataLoaded = true;
      });
  }
}
