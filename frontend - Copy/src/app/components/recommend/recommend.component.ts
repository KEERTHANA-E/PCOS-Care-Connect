import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recommend',
  templateUrl: './recommend.component.html',
  styleUrls: ['./recommend.component.css']
})
export class RecommendComponent {
  constructor(private router:Router){

  }
  redirectPage(data : any){
    this.router.navigate([`/${data}`]);
  }
}
