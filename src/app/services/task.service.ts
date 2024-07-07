import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Task } from '../Model/Task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private _http : HttpClient) { 

  }

  getAllTasks(){
    return this._http.get<{[key: string]: Task}>("https://angular-authentication-948df-default-rtdb.firebaseio.com/task.json")
    .pipe(map((response)=>{
      let tasks=[];
      for(let key in response){
        if(response.hasOwnProperty(key)){
          tasks.push({...response[key],id:key});
        }
      }
      return tasks;
    }))
  }

  deleteTask(id : string | undefined) {
    return this._http.delete('https://angular-authentication-948df-default-rtdb.firebaseio.com/tasks/' + id + '.json')

    }

    DeleteAllTasks() {
     return this._http.delete('https://angular-authentication-948df-default-rtdb.firebaseio.com/tasks.json')
      
    }
    CreateTask(data: Task) {
      console.log(data)
     return this._http.post<{name : string}>("https://angular-authentication-948df-default-rtdb.firebaseio.com/task.json",data)
   
      }
}