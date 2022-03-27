import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FiltersType } from 'src/app/filter/state/filter.type';
import { AppState } from 'src/app/state/app.state';
import * as filterActions from '../../filter/state/filter.actions';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styleUrls: ['./todo-footer.component.css']
})
export class TodoFooterComponent implements OnInit {

  actualFilter: FiltersType = 'todos';
  filters: FiltersType[] = ['todos','pendientes','completados']
  pendientes: number = 0;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.store.subscribe((store) => {
      this.actualFilter = store.filter;
      this.pendientes = store.todos.filter( todo => !todo.completed).length
    });
  }

  cambiarFiltro(filter: FiltersType){
    this.store.dispatch(filterActions.setFilter({ filter: filter }));
  }

}
