import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/shared/service/user.service';
import { CookieService } from 'ngx-cookie-service';
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
  }
  removeCookie(cookieName: string): void {
    this.cookieService.delete(cookieName);
  }
  checkCookieExists(cookieName: string): boolean {
    return this.cookieService.check(cookieName);
  }
  isLoggedInFunc(): boolean {
    return this.checkCookieExists('token');
  }
  logout() {
    this.removeCookie('token');
    this.userService.logout();
    this.router.navigate(['/']);
  }
}
