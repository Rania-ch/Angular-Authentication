import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../Model/User';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit , OnDestroy{
  isLoggedIn : boolean =false;
  private userSubject : Subscription;
  constructor(private authService : AuthService) { }

  ngOnInit(): void {
    this.userSubject=this.authService.user.subscribe((user :User)=>
        {
          this.isLoggedIn =user ? true : false;
        }
    )
  }
  ngOnDestroy(){
    this.userSubject.unsubscribe();
  }

}
