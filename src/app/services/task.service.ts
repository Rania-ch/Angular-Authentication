import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Task } from '../Model/Task';
import { Subject, throwError } from 'rxjs';
import { LoggingService } from './logging.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  errorSubject = new Subject<HttpErrorResponse>();
  constructor(private _http : HttpClient , private _loggingService : LoggingService) { 

  }

  getAllTasks(){
    let headers = new HttpHeaders();
    headers = headers.set('content-type', 'application/json');
    headers = headers.set('Access-Control-Allow-Origin', '*')
    return this._http.get<{[key: string]: Task}>("https://angular-authentication-948df-default-rtdb.firebaseio.com/task.json",{headers: headers})
    .pipe(map((response)=>{
      let tasks=[];
      for(let key in response){
        if(response.hasOwnProperty(key)){
          tasks.push({...response[key],id:key});
        }
      }
      return tasks;
    }), catchError((err)=>{
      const errorObj = {statusCode : err.status, errorMessage:err.message, datetime : new Date}
      this._loggingService.logError(errorObj);
      return throwError(err);
    }))
  }

  deleteTask(id : string | undefined) {
    return this._http.delete('https://angular-authentication-948df-default-rtdb.firebaseio.com/task/' + id + '.json')
    .pipe(catchError((err)=>{
      const errorObj = {statusCode : err.status, errorMessage:err.message, datetime : new Date}
      this._loggingService.logError(errorObj);
      return throwError(err);
    }))
    .subscribe({error : (err)=>{
      this.errorSubject.next(err);
     }}
    );

    }

    DeleteAllTasks() {
     return this._http.delete('https://angular-authentication-948df-default-rtdb.firebaseio.com/task.json')
     .pipe(catchError((err)=>{
      const errorObj = {statusCode : err.status, errorMessage:err.message, datetime : new Date}
      this._loggingService.logError(errorObj);
      return throwError(err);
    }))
     .subscribe({error : (err)=>{
      
      this.errorSubject.next(err);
     }}
    );
      
    }
    CreateTask(data: Task) {
      console.log(data)
     return this._http.post<{name : string}>('https://angular-authentication-948df-default-rtdb.firebaseio.com/task.json',data)
     .pipe(catchError((err)=>{
      const errorObj = {statusCode : err.status, errorMessage:err.message, datetime : new Date}
      this._loggingService.logError(errorObj);
      return throwError(err);
    }))
     .subscribe(
     {error : (err)=>{
      this.errorSubject.next(err);
     }}
    
    )
   
      }
      UpdateTask(id : string | undefined ,data: Task){
        return this._http.put("https://angular-authentication-948df-default-rtdb.firebaseio.com/task/" + id + '.json',data)
        .pipe(catchError((err)=>{
          const errorObj = {statusCode : err.status, errorMessage:err.message, datetime : new Date}
          this._loggingService.logError(errorObj);
          return throwError(err);
        }))
        
        .subscribe({error : (err)=>{
          this.errorSubject.next(err);
         }}
        );
      }

    getTaskDetails(id : string |undefined){
      return this._http.get("https://angular-authentication-948df-default-rtdb.firebaseio.com/task/" + id + '.json')
      .pipe(map((reponse)=>{
        console.log(reponse)
        let task ={};
        task={...reponse,id :id}
        return task;
      }))
    }
}
