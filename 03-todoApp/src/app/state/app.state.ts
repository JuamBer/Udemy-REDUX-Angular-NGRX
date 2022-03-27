import { FiltersType } from "../filter/state/filter.type";
import { Todo } from "../todos/models/todo.model";

export interface AppState {
  todos: Todo[],
  filter: FiltersType
}
