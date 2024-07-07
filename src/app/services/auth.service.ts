import { HttpClient } from '@angular/common/http';
import {  Injectable } from '@angular/core';
import { AuthResponse } from '../Model/AuthResponse';
import { catchError, tap } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';
import { User } from '../Model/User';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
   user =new Subject<User>();
  constructor(private _http : HttpClient){

  }

  signup(email,password)
  {
    const data={email : email ,password: password,retourSecureToken : true}
    return this._http.post<AuthResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAc0qPl3lj7VpWp5K2xwYI0jyHKDyMHI9Q',data)
    .pipe(catchError(this.handleError),tap((res) =>this.handleCreateUser(res)))
  }
  signin(email,password)
  {
        const data={email : email ,password: password,retourSecureToken : true}
        return this._http.post<AuthResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAc0qPl3lj7VpWp5K2xwYI0jyHKDyMHI9Q',data)
        .pipe(catchError(this.handleError), tap((res) =>this.handleCreateUser(res)))
  }
  private handleCreateUser(res){
    const expiresInTs = new Date().getTime() + +res.expiresIn * 1000;
    const expiresIn = new Date(expiresInTs);
    const user = new User(res.email, res.localId, res.idToken, expiresIn);
    this.user.next(user);
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
