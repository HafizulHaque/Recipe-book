import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';

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

  constructor(
    private http: HttpClient
  ) { }

  signUp(email: string, password: string){
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCCGap5AXM90KhhKnMqefwznLIzVEbDiNU', 
      {
        email,
        password,
        returnSecureToken: true
      }).pipe(catchError(this.handleError))
  }

  login(email: string, password: string){
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCCGap5AXM90KhhKnMqefwznLIzVEbDiNU', 
      {
        email,
        password,
        returnSecureToken: true
      }).pipe(catchError(this.handleError))
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
