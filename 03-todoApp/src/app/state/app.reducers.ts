import { ActionReducerMap } from "@ngrx/store";
import { filterReducer } from "../filter/state/filter.reducer";
import { FiltersType } from "../filter/state/filter.type";
import { Todo } from "../todos/models/todo.model";
import { todoReducer } from "../todos/state/todo.reducer";
import { AppState } from "./app.state";

export const appReducers: ActionReducerMap<AppState> = {
  todos: todoReducer,
  filter: filterReducer
}
