import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/shared/service/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private router : Router,public userService : UserService){

  }
  logout(){
    this.userService.logout();
    this.router.navigate(['/']);
  }

}
