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
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {}
  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      name: this.fb.control('', [Validators.required, Validators.minLength(4), Validators.maxLength(15)]),
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [Validators.required]),
    });
  }
  submitSignUpForm() {
    if (this.signUpForm.valid) {
      const formData = this.signUpForm.value;
      let obj = {
        name: formData['name'],
        email: formData['email'],
        password: formData['password'],
      };
      this.userService.register(obj).subscribe(
        (response: User) => {
          this.userService.currentUser = response;
          localStorage.setItem('user', JSON.stringify(response));
          this.router.navigate(['/home']);
        },
        (error) => {
          console.log('error' + error);
        }
      );
    } else {
      alert('Please enter valid credentials');
    }
  }
}
