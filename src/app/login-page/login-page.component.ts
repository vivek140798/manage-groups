import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/services/user.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { SnackBarConfig } from '../shared/models/snack-bar.model';
import { SnackBarService } from '../shared/services/snack-bar.service';

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
  loginSubmitted:boolean = false;
  signupSubmitted:boolean = false;
  public snackBarData: SnackBarConfig;
  pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@(inmar.in|inmar.com)$/;

  constructor(private readonly snackBarService: SnackBarService, private userService: UserService, private authService: AuthService, private formBuilder: FormBuilder, private router: Router
  ) {
    this.initializeLogin();
    this.initializeSignup();
  }

  async ngOnInit() {
    this.snackBarData = new SnackBarConfig();
  }

  initializeSignup(){
    this.signupFormGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(this.pattern)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      aadhar: ['', Validators.required],
    });
  }

  initializeLogin(){
    this.loginFormGroup = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  async login() {
    if (this.loginEnabled) {
      this.loginSubmitted = true;
      this.loginUnderProcess = true;
      if (this.loginFormGroup.valid) {
        try {
          let mail = this.loginFormGroup.controls['email'].value;
          let password = this.loginFormGroup.controls['password'].value;
          const user = await this.authService.signIn(mail, password);
          this.userService.setUserId(mail);
          this.router.navigate(['/dashboard']);
          this.loginUnderProcess = false;
        } catch (error) {
          this.loginUnderProcess = false;
          this.frameSnackBarModel('Email/Password is incorrect', 'top', 'center', 2000, ['error']);
          this.snackBarService.openSnackBar(this.snackBarData);
        }
      }
      else {
        this.loginUnderProcess = false;
      }
    }
    else {
      this.loginEnabled = true;
      this.initializeSignup();
    }
  }
  async signup() {
    if (this.loginEnabled) {
      this.loginEnabled = false;
      this.initializeLogin();
    }
    else {
      this.signupUnderProcess = true;
      this.signupSubmitted =true;
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
          this.frameSnackBarModel('Account already exist with the email', 'top', 'center', 2000, ['error']);
          this.snackBarService.openSnackBar(this.snackBarData);
        }
      }
      else {
        this.signupUnderProcess = false;
      }
    }
  }

  frameSnackBarModel(message, verticalPosition, horizontalPosition, duration, panelClass) {
    this.snackBarData.message = message;
    this.snackBarData.verticalPosition = verticalPosition;
    this.snackBarData.horizontalPosition = horizontalPosition;
    this.snackBarData.duration = duration;
    this.snackBarData.panelClass = panelClass;
  }
}
