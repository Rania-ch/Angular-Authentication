import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {

  constructor(private _http : HttpClient) {

   }

   logError(data : {statusCode : number, errorMessage:string, datetime :Date}){
    this._http.post('https://angular-authentication-948df-default-rtdb.firebaseio.com/log.json',data)
    .subscribe();

   }

   fetchErrors(){
    this._http.get('https://angular-authentication-948df-default-rtdb.firebaseio.com/log.json')
    .subscribe((data) =>{console.log(data)})
   }
}
