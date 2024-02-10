import { Component, OnInit } from '@angular/core';
import { CommunityService } from 'src/shared/service/community.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  data:any;
  constructor(private communityService : CommunityService){

  }
  ngOnInit(): void {
    this.getData();
  }

  getData(){
    this.data = this.communityService.getAllData().subscribe((response : any) =>{
      this.data = response;
      console.log(response);
    })
  }

}
