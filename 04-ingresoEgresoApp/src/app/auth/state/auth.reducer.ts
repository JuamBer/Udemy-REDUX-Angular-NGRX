import { createReducer, on } from '@ngrx/store';
import { Usuario } from 'src/app/models/usuario.model';
import * as authActions from './auth.actions';

export interface State {
    user: Usuario;
}

export const initialState: State = {
   user: null,
}

export const authReducer = createReducer(initialState,

  on(authActions.setUser, (state, { user }) => ({ ...state, user: user})),
  on(authActions.unSetUser, (state) => ({ ...state, user: null })),

);
