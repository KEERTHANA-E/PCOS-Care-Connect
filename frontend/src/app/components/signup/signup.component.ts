import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/shared/model/user.model';
import { UserService } from 'src/shared/service/user.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  signUpForm: FormGroup | any;
  test!: File;
  fileUris: Array<string> = [];
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {}
  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      name: this.fb.control('kira', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(15),
      ]),
      email: this.fb.control('kira@email.com', [
        Validators.required,
        Validators.email,
      ]),
      password: this.fb.control('password', [Validators.required]),
    });
  }

  submitSignUpForm() {
    if (this.signUpForm.valid) {
      const formData = this.signUpForm.value;
      let obj = {
        name: formData['name'],
        email: formData['email'],
        password: formData['password'],
        avatar: this.test,
      };
      this.userService.register(obj).subscribe(
        (response: any) => {
          console.log('response' + response);
          this.userService.currentUser = response.user;
          localStorage.setItem('user', JSON.stringify(response));
          this.router.navigate(['/login']);
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      alert('Please enter valid credentials');
    }
  }
  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.test = file;
      console.log(this.test);
    }
  }
}
