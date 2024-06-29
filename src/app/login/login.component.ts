import { Component, inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { AuthResponse } from '../Model/AuthResponse';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 ;
   isLoginMode : boolean =true;
   isLoading : boolean=false;
   errorMessage : string | null =null;
   authObs: Observable<AuthResponse>;

  constructor(private  _authService : AuthService) { }

  ngOnInit(): void {
  }

  onSwitchMode() {
    this.isLoginMode=!this.isLoginMode;
  }

  onFormSubmitted(Form : NgForm) {
    const email = Form.value.email;
    const password = Form.value.password;
    if (this.isLoginMode){
       //login logic
       this.isLoading =true;
       this.authObs=this._authService.signin(email,password);
    }else {
       //signup logic
       this.isLoading =true;
       this.authObs =this._authService.signup(email,password);
    }
    this.authObs.subscribe({
      next:(res)=>{
        console.log(res);
        this.isLoading =false;},
      error:(errMsg)=>{
        this.errorMessage=errMsg;
        this.isLoading =false;
        this.hideSnackbar();
      }
     })
     Form.reset();
  }
  hideSnackbar(){
    setTimeout(()=>{
      this.errorMessage=null;
    },3000)
  }
}
