import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from '../auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLoginMode: boolean = true;
  isLoading: boolean = false;
  error : string | null = null;
  authForm !: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authForm = this.fb.group({
      'email': [null, [Validators.required, Validators.email]],
      'password': [null, [Validators.required, Validators.minLength(6)]]
    })
  }

  toggleLoginMode(){
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(){

    if(this.authForm.invalid){
      console.log('invalid crendential! signup failed');
      return;
    }

    let authObs : Observable<AuthResponseData>;
    this.isLoading = true;

    const {email, password } = this.authForm.value;
    if(this.isLoginMode){
      authObs = this.authService.login(email, password);
    }else{
      authObs = this.authService.signUp(email, password)
    }
    authObs.subscribe(response => {
      console.log(response);
      this.isLoading = false;
      this.error = null;
    }, err => {
      this.error = err;
      this.isLoading = false;
    })
    this.authForm.reset();
  }

}
