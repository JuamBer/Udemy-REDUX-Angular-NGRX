import { createReducer, on } from '@ngrx/store';
import { Todo } from '../models/todo.model';
import * as todoActions from './todo.actions';

export const initialState: Todo[] = [
  new Todo('Salvar al mundo'),
  new Todo('Robar escudo cap'),
  new Todo('Comprar Tacos'),
  new Todo('Ir a la luna'),
];

export const todoReducer = createReducer(
  initialState,
  on(todoActions.crear, (state, { text }) => [...state, new Todo(text)]),
  on(todoActions.toggle, (state, { id }) =>{
    return state.map((todo)=>{
      if(todo.id === id){
        return {
          ...todo,
          completed: !todo.completed
        }
      }else{
        return todo;
      }
    });
  }),
  on(todoActions.editar, (state, { id, text }) => {
    return state.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          text: text
        }
      } else {
        return todo;
      }
    });
  }),
  on(todoActions.toggleAll, (state, { completed }) => {
    return state.map((todo) => {
        return {
          ...todo,
          completed: completed
        }
    });
  }),
);
