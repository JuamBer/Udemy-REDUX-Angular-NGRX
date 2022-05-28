import { Action, createReducer, on, State } from '@ngrx/store';
import { Usuario } from 'src/app/models/usuario.model';
import * as usuarioActions from '../actions/usuario.actions';

export interface UsuarioState {
  usuario: Usuario | null;
  loaded: boolean;
  loading: boolean;
  error: any;
}

export const usuarioInitialState: UsuarioState = {
  usuario: null,
  loaded: false,
  loading: false,
  error: null
}

const _usuarioReducer = createReducer(usuarioInitialState,

  on(usuarioActions.cargarUsuario, state => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(usuarioActions.cargarUsuarioSuccess, (state, { usuario }) => ({
    ...state,
    loading: false,
    loaded: true,
    error: null,
    usuario: usuario
  })),
  on(usuarioActions.cargarUsuarioFail, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: {
      url: payload.url,
      name: payload.name,
      message: payload.message,
    },
  })),

);

export function usuarioReducer(state: UsuarioState | undefined, action: Action) {
    return _usuarioReducer(state, action);
}
