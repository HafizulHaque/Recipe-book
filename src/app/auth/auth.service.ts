import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { User } from './user.model';
import { environment } from 'src/environments/environment';

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered ?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userSub = new BehaviorSubject<User | null>(null);
  private tokenExpirationTimer : any;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  signUp(email: string, password: string){
    return this.http.post<AuthResponseData>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseAPIKey}`, 
      {
        email,
        password,
        returnSecureToken: true
      }).pipe(
        catchError(this.handleError), 
        tap(resData => {
          this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
        })
      )
  }

  login(email: string, password: string){
    return this.http.post<AuthResponseData>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseAPIKey}`, 
      {
        email,
        password,
        returnSecureToken: true
      }).pipe(
        catchError(this.handleError),
        tap(resData => {
          this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
        })
      )
  }

  logout(){
    this.userSub.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if(this.tokenExpirationTimer){
      clearTimeout(this.tokenExpirationTimer);
    } 
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number){
    this.tokenExpirationTimer = setTimeout(()=>{
      this.logout();
    }, expirationDuration);
  }

  private handleAuthentication(email: string, id: string, token: string, expiresIn: number){
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user: User = new User(email, id, token, expirationDate);
    localStorage.setItem('userData', JSON.stringify(user));
    this.userSub.next(user);
    this.autoLogout(expiresIn * 1000);
  }

  autoLogin(){
    let user: any = localStorage.getItem('userData');
    if(!user) return;
    let userData: {email: string, id: string, _token: string, _tokenExpirationDate: string} = JSON.parse(user);
    let loadedUser: User = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));
    this.userSub.next(loadedUser);
    let remainingTime = new Date(userData._tokenExpirationDate).getTime() - Date.now();
    this.autoLogout(remainingTime);
  }

  private handleError(errorRes: HttpErrorResponse){
    let errMsg = "An Error Occured";
        switch(errorRes?.error?.error?.message){
          case 'EMAIL_EXISTS': 
            errMsg = 'User exists with this email address';
            break;
          case 'OPERATION_NOT_ALLOWED':
            errMsg = 'SignIn not allowed';
            break;
          case 'TOO_MANY_ATTEMPTS_TRY_LATER':
            errMsg = 'Too many attempts. Try again later';
            break;
          case 'EMAIL_NOT_FOUND':
            errMsg = 'User don\'t exist';
            break;
          case 'INVALID_PASSWORD':
            errMsg = 'Password is incorrect';
            break;
          case 'USER_DISABLED':
            errMsg = 'User has been locked';
            break;
          default:
            errMsg = 'Unknown Error Occured'
        }
        return throwError(errMsg);
  }
}
