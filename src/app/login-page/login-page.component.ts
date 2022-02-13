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
  submitted: boolean = false;

  constructor(private userService: UserService, private authService: AuthService, private formBuilder: FormBuilder, private router: Router
  ) {
    this.loginFormGroup = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
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
    this.submitted = true;
    this.loginUnderProcess = true;
    if (this.loginFormGroup.valid) {
      try {
        let mail = this.loginFormGroup.controls['email'].value;
        let password = this.loginFormGroup.controls['password'].value;
        const user = await this.authService.signIn(mail, password);
        this.userService.setUserId(mail);
        this.router.navigate(['/dashboard']);
        this.loginEnabled = true;
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
  signup(){
    this.loginEnabled = false;
  }
}
