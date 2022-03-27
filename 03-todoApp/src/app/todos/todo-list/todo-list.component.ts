import { Component, OnInit } from '@angular/core';

//NGRX
import { Store } from '@ngrx/store';
import { FiltersType } from 'src/app/filter/state/filter.type';
import { AppState } from 'src/app/state/app.state';

import { Todo } from '../models/todo.model';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  todos: Todo[] = [];
  actualFilter: FiltersType = 'todos';

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.store.subscribe((state)=>{
      this.todos = state.todos;
      this.actualFilter = state.filter;
    })
  }

}
