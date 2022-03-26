import { createReducer, on } from '@ngrx/store';
import { Todo } from './models/todo.model';
import * as todoActions from './todo.actions';

export const initialState: Todo[] = [
  new Todo('Salvar al mundo')
];

export const todoReducer = createReducer(
  initialState,
  on(todoActions.crear, (state, { text }) => [...state, new Todo(text)]),
);
