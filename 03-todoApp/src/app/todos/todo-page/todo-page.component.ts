import { Component, OnInit } from '@angular/core';

//NGRX
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.reducer';
import * as todoActions from '../state/todo.actions';

@Component({
  selector: 'app-todo-page',
  templateUrl: './todo-page.component.html',
  styleUrls: ['./todo-page.component.css']
})
export class TodoPageComponent implements OnInit {

  completedAll: boolean = false;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
  }

  toogleAll(){
    this.store.dispatch(todoActions.toggleAll({completed: !this.completedAll}));
    this.completedAll = !this.completedAll;
  }


}
