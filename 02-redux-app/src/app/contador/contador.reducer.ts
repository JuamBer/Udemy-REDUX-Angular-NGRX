import { Action, createReducer, on } from '@ngrx/store';
import { incrementar, decrementar, reset } from './contador.actions';

export const initialState = 10;

const _contadorReducer = createReducer(
  initialState,
  on(incrementar, (state) => state + 1),
  on(decrementar, (state) => state - 1),
  on(reset, (state) => 0)
);

export function contadorReducer(state: number | undefined, action: Action){
  return _contadorReducer(state, action)
}
