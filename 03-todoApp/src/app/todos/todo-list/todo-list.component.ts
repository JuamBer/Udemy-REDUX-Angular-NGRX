import { Component, OnInit } from '@angular/core';

//NGRX
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.reducer';

import { Todo } from '../models/todo.model';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  todos: Todo[] = [];

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.store.select('todos').subscribe((todos)=>{
      this.todos = todos;
    })
  }

}
