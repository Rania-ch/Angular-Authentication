import { Task } from 'src/app/Model/Task';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css']
})
export class DashbordComponent implements OnInit {
  constructor(private _http : HttpClient, private _taskservice:TaskService) { }

  ngOnInit(): void {
    this.fetchAllTasks();
  }
  showCreateTaskForm: boolean = false;
  showTaskDetails: boolean = false;

  currentTaskId: string = '';
  isLoading: boolean = false;

  currentTask: Task | null = null;

  errorMessage: string | null = null;

  editMode: boolean = false;
  selectedTask: Task;
  allTasks: Task[] = [];

  OpenCreateTaskForm(){
    this.showCreateTaskForm = true;
    this.editMode = false;

  }

  CloseCreateTaskForm(){
    this.showCreateTaskForm = false;
  }



  /*{
    key1: {},
    key2: {}
  }*/

    CreateTask(data:Task) {
      this._taskservice.CreateTask(data)
     .subscribe((resp)=>{console.log(resp)
     this.fetchAllTasks();
     })
      }
  

    private fetchAllTasks(){
      this._taskservice.getAllTasks()
    .subscribe((tasks)=>{this.allTasks=tasks;})
      }
        deleteTask(id : string | undefined) {
          this._taskservice.deleteTask(id)
          .subscribe((resp)=>{
            this.fetchAllTasks();
          });

          }

          DeleteAllTasks() {
              this._taskservice.DeleteAllTasks()
              .subscribe((resp)=>{
                this.fetchAllTasks();
              });
            }
          }
        
    

  






