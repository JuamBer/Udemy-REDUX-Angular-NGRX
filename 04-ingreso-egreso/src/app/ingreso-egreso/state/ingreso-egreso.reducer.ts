import { createReducer, on } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { IngresoEgreso } from 'src/app/models/ingreso-egreso.model';
import * as ingresoEgresoActions from './ingreso-egreso.actions';

export interface State {
  items: IngresoEgreso[];
}

export interface IngresoEgresoAppState extends AppState {
  ingresosEgresos: State
}

export const initialState: State = {
  items: [],
}

const _ingresosEgresosReducer = createReducer(initialState,

  on(ingresoEgresoActions.setItems, (state, {items}) => ({ ...state, items: [...items] })),
  on(ingresoEgresoActions.unSetItems, (state) => ({ ...state, items: [] })),

);

export function ingresosEgresosReducer(state, action) {
  return _ingresosEgresosReducer(state, action);
}
