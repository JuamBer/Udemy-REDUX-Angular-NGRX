import { Action, createReducer, on } from '@ngrx/store';
import * as contadorActions from './contador.actions';

export const initialState = 10;

const _contadorReducer = createReducer(
  initialState,
  on(contadorActions.incrementar, (state) => state + 1),
  on(contadorActions.decrementar, (state) => state - 1),
  on(contadorActions.multiplicar, (state, { numero }) => state * numero),
  on(contadorActions.dividir, (state, { numero }) => state / numero),

  on(contadorActions.reset, (state) => 0)
);

export function contadorReducer(state: number | undefined, action: Action){
  return _contadorReducer(state, action)
}
