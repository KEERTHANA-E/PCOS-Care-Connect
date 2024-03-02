import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/shared/service/user.service';
import { CookieService } from 'ngx-cookie-service';
import { faL } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit{
  constructor(
    private router: Router,
    public userService: UserService,
    private cookieService: CookieService
  ) {}
  isLoggedIn: boolean=false;
  ngOnInit(): void {
    this.isLoggedIn=this.isLoggedInFunc();
    console.log(typeof this.isLoggedIn);
    if(this.isLoggedIn==false){
      console.log("flaseeeeeeeeeee");
    }
    console.log("user is not there"+this.isLoggedIn);
    // console.log("current user is logged in" +this.userService.currentUser!=null)
  }
  removeCookie(cookieName: string): void {
    this.cookieService.delete(cookieName);
  }
  checkCookieExists(cookieName: string): boolean {
    return this.cookieService.check(cookieName);
  }
  isLoggedInFunc(): boolean {
    console.log(this.checkCookieExists('token') + 'from func');
    return this.checkCookieExists('token');
  }
  logout() {
    this.removeCookie('token');
    this.userService.logout();
    this.router.navigate(['/']);
    window.location.reload();
  }
}
