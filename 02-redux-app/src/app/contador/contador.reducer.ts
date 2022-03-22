import { Action, createReducer, on } from '@ngrx/store';
import { incrementar, decrementar, reset } from './contador.actions';

export const initialState = 0;

export function contadorReducer(state: number = 10, action: Action) {
  switch(action.type){
    case incrementar.type:
      return state + 1;
    case decrementar.type:
      return state - 1;
    default:
      return state;
  }
}
