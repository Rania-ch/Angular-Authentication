import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Task } from 'src/app/Model/Task';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  @Output()
  CloseForm: EventEmitter<boolean> = new EventEmitter<boolean>();
 
  @Output()
  EmitTaskData: EventEmitter<Task> = new EventEmitter<Task>();
  OnCloseForm(){
    this.CloseForm.emit(false);
  }
  OnFormSubmitted(form: NgForm){
    this.EmitTaskData.emit(form.value);
    this.CloseForm.emit(false);
  }

}
