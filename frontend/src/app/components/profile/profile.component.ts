import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/shared/model/user.model';
import { UserService } from 'src/shared/service/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit{
  constructor(private fb: FormBuilder, private userService: UserService) {}
  loggedInUser!: User;
  addForm: FormGroup | any;
  ngOnInit(): void {
    this.getLoggedInUserData();
  }
  LoadForm() {
    this.addForm = this.fb.group({
      name: this.fb.control(this.loggedInUser.name, [Validators.required]),
      email: this.fb.control(this.loggedInUser.email, [Validators.required]),
      phoneNumber: this.fb.control(this.loggedInUser.phoneNumber),
      age: this.fb.control(this.loggedInUser.age),
      weight: this.fb.control(this.loggedInUser.weight),
      height: this.fb.control(this.loggedInUser.height),
      state: this.fb.control(this.loggedInUser.state),
      zipCode: this.fb.control(this.loggedInUser.zipCode),
      street: this.fb.control(this.loggedInUser.street),
      city: this.fb.control(this.loggedInUser.city),
      about: this.fb.control(this.loggedInUser.about),
    });
  }
  getLoggedInUserData() {
    this.userService.loadLoggedInUser().subscribe((response: any) => {
      console.log('response' + response);
      this.userService.currentUser = response.user;
      this.loggedInUser = this.userService.currentUser;
      console.log(
        'user data loaded in profile.ts',
        this.userService.currentUser
      );
      this.LoadForm();
    });
  }
  updateUser() {
    if (this.addForm.valid) {
      this.userService.updateProfile(this.addForm.value).subscribe({
        next: (response) => {
          console.log('post updated successfully:', response);
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
  // logout() {
  //   this.userService.logout().subscribe({
  //     next: (response: any) => {
  //       console.log('user logged out' + response);
  //     },
  //     error: (err) => {
  //       console.log('error creating user:', err);
  //     },
  //   });
  // }
}
