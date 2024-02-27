import { Component, OnInit } from '@angular/core';
import { CommunityService } from 'src/shared/service/community.service';
import { UserService } from 'src/shared/service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'frontend-project';
  constructor(private userService: UserService) {}
  ngOnInit(): void {
    this.getLoggedInUserData();
  }

  getLoggedInUserData() {
    this.userService.loadLoggedInUser().subscribe((response: any) => {
      console.log('response' + response);
      this.userService.currentUser = response.user;
      console.log("user data loaded in app.ts",this.userService.currentUser);
    });
  }
}
