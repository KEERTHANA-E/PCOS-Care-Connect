import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/shared/model/user.model';
import { UserService } from 'src/shared/service/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  constructor(private fb: FormBuilder, private userService: UserService) {}
  loggedInUser!: User;
  addForm: FormGroup | any;
  ngOnInit(): void {
    this.getLoggedInUserData();

  }
  LoadForm(){
    this.addForm = this.fb.group({
      name: this.fb.control(this.loggedInUser.name, [Validators.required]),
      email: this.fb.control(this.loggedInUser.email, [Validators.required]),
      phoneNumber: this.fb.control(''),
      age: this.fb.control(''),
      weight: this.fb.control(''),
      height: this.fb.control(''),
      state: this.fb.control(''),
      zipCode: this.fb.control(''),
      street: this.fb.control(''),
      city: this.fb.control(''),
    });
  }
  getLoggedInUserData() {
    this.userService.loadLoggedInUser().subscribe((response: any) => {
      console.log('response' + response);
      this.userService.currentUser = response.user;
      this.loggedInUser = this.userService.currentUser;
      console.log('user data loaded in profile.ts', this.userService.currentUser);
      this.LoadForm();
    });
  }
}
