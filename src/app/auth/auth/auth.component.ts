import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { PlaceHolderDirective } from 'src/app/shared/placeholder.directive';
import { AuthResponseData, AuthService } from '../auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy{

  isLoginMode: boolean = true;
  isLoading: boolean = false;
  error : string | null = null;
  authForm !: FormGroup;
  private closeSub !: Subscription;

  @ViewChild(PlaceHolderDirective) alertHost !: PlaceHolderDirective;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private cmpFactoryResolver: ComponentFactoryResolver
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
      this.router.navigate(['/recipes']);
    }, err => {
      this.error = err;
      this.showErrorMsg(err);
      this.isLoading = false;
    })
    this.authForm.reset();
  }

  private showErrorMsg(msg: string ){
    // const alertCmp = new AlertComponent();
    const alertCmpFactory = this.cmpFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();
    const cmpRef = hostViewContainerRef.createComponent(alertCmpFactory);
    cmpRef.instance.message = msg;
    this.closeSub = cmpRef.instance.close.subscribe(()=>{
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    })
  }

  onCloseErrMsg(){
    this.error = null;
  }

  ngOnDestroy(): void {
    if(this.closeSub){
      this.closeSub.unsubscribe(); 
    }
  }

}
