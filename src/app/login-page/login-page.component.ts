import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/services/user.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  loginEnabled: boolean = true;
  loginUnderProcess: boolean = false;
  signupUnderProcess: boolean = false;
  loginFormGroup: FormGroup;
  signupFormGroup: FormGroup;
  submitted: boolean = false;

  constructor(private userService: UserService, private authService: AuthService, private formBuilder: FormBuilder, private router: Router
  ) {
    this.loginFormGroup = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.signupFormGroup = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      aadhar: ['', Validators.required],
    });
  }

  async ngOnInit() {
    
  }
  async enroll() {
    try {
      const user = await this.authService.signUp('','');
      console.log(user);
    } catch (error) {
      console.log(error);
    }
  }
  async login() {
    if(this.loginEnabled){
      this.submitted = true;
      this.loginUnderProcess = true;
      if (this.loginFormGroup.valid) {
        try {
          let mail = this.loginFormGroup.controls['email'].value;
          let password = this.loginFormGroup.controls['password'].value;
          const user = await this.authService.signIn(mail, password);
          this.userService.setUserId(mail);
          this.router.navigate(['/dashboard']);
          this.loginUnderProcess = false;
          this.submitted = false;
        } catch (error) {
          this.loginUnderProcess = false;
          this.submitted = false;
          console.log(error);
        }
      }
      else {
        this.loginUnderProcess = false;
      }
    }
    else{
      this.loginEnabled =true;
    }
  }
  async signup(){
    if(this.loginEnabled){
      this.loginEnabled = false;
    }
    else{
      this.signupUnderProcess = true;
      if (this.signupFormGroup.valid) {
        try {
          let mail = this.signupFormGroup.controls['email'].value;
          let password = this.signupFormGroup.controls['password'].value;
          const user = await this.authService.signUp(mail, password);
          this.userService.setUserId(mail);
          this.router.navigate(['/dashboard']);
          this.signupUnderProcess = false;
        } catch (error) {
          this.signupUnderProcess = false;
          console.log(error);
        }
      }
      else {
        this.signupUnderProcess = false;
      }
    }
  }
}
