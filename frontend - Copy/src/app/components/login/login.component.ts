import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/shared/model/user.model';
import { UserService } from 'src/shared/service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup | any;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {}
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [Validators.required]),
    });
  }
  submitLoginForm(){
    if(this.loginForm.valid){
      const formData = this.loginForm.value;
      let obj = {
          email: formData['email'],
          password: formData['password'],
        };
      this.userService.login(obj).subscribe((response : User) =>{
        this.userService.currentUser=response;
        localStorage.setItem('user', JSON.stringify(response));
        this.router.navigate(['/home']);
      },error => {
        console.log("error"+error);
      }
      )
    }
    else{
      alert("Please enter valid credentials");
    }
  }
}
