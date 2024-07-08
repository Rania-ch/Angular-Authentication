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
  editMode :boolean =false;
  currentTaskId: string = '';
  isLoading: boolean = false;
  currentTask: Task | null = null;
  errorMessage: string | null = null;
  selectedTask: Task;
  allTasks: Task[] = [];


  OpenCreateTaskForm(){
    this.showCreateTaskForm = true;
    this.editMode = false;
    this.selectedTask={title :'',desc:'',assingedTo:'',createAt:'',priority:'',status:''}

  }

  CloseCreateTaskForm(){
    this.showCreateTaskForm = false;
  }



  /*{
    key1: {},
    key2: {}
  }*/

    CreateTaskOrUpdate(data:Task) {
      if(!this.editMode)
      this._taskservice.CreateTask(data);
    
       
    else
      //edit task
      this._taskservice.UpdateTask(this.currentTaskId,data);
      }
  

    private fetchAllTasks(){
      this._taskservice.getAllTasks()
    .subscribe((tasks)=>{this.allTasks=tasks;})
      }
        deleteTask(id : string | undefined) {
          this._taskservice.deleteTask(id);
      

          }

          DeleteAllTasks() {
              this._taskservice.DeleteAllTasks();
         
            }


            OnEditTaskClicked(id :string | undefined) {
              this.currentTaskId =id;
              this.showCreateTaskForm =true;
              this.editMode = true;
              this.selectedTask=this.allTasks.find((task)=>{return task.id===id})
              }

              FetchAllTaskClicked(){
                this.fetchAllTasks()
              }
          }
        
    

  






