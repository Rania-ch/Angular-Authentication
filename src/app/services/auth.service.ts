import { HttpClient } from '@angular/common/http';
import {  Injectable } from '@angular/core';
import { AuthResponse } from '../Model/AuthResponse';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
  constructor(private _http : HttpClient){

  }

  signup(email,password)
  {
    const data={email : email ,password: password,retourSecureToken : true}
    return this._http.post<AuthResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAc0qPl3lj7VpWp5K2xwYI0jyHKDyMHI9Q',data)
    .pipe(catchError(this.handleError))
  }
  signin(email,password)
  {
        const data={email : email ,password: password,retourSecureToken : true}
        return this._http.post<AuthResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAc0qPl3lj7VpWp5K2xwYI0jyHKDyMHI9Q',data)
        .pipe(catchError(this.handleError))
  }

      private handleError(err){
        let errorMessage ='An unknown error has occured'
        console.log(err);
      if(!err.error || !err.error.error){
        return throwError(new Error(errorMessage))
      }
      switch(err.error.error.message){
        case 'EMAIL_EXISTS' :
          errorMessage ='the email is already exists';
          break;
          case 'OPERATION_NOT_ALLOWED' :
            errorMessage ='This operation is not allowed';
          break;
          case 'TOO_MANY_ATTEMPTS_TRY_LATER' :
            errorMessage ='the email is already exist';
          break;
          case 'INVALID_LOGIN_CREDENTIALS' :
            errorMessage ='The email or password is incorrect';
          break;
      }
      return throwError(new Error(errorMessage));
      }
}
