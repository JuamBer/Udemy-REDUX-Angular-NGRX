import { ActionReducerMap } from "@ngrx/store";
import { filterReducer } from "../filter/state/filter.reducer";
import { FiltersType } from "../filter/state/filter.type";
import { Todo } from "../todos/models/todo.model";
import { todoReducer } from "../todos/state/todo.reducer";

export interface AppState {
  todos: Todo[],
  filter: FiltersType
}

export const appReducers: ActionReducerMap<AppState> = {
  todos: todoReducer,
  filter: filterReducer
}
