import { Action, createReducer, on, State } from '@ngrx/store';
import { Usuario } from 'src/app/models/usuario.model';
import * as usuariosActions from '../actions/usuarios.actions';

export interface UsuariosState {
  usuarios: Usuario[];
  loaded: boolean;
  loading: boolean;
  error: any;
}

export const usuariosInitialState: UsuariosState = {
  usuarios: [],
  loaded: false,
  loading: false,
  error: null
}

const _usuariosReducer = createReducer(usuariosInitialState,

  on(usuariosActions.cargarUsuarios, state => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(usuariosActions.cargarUsuariosSuccess, (state, { usuarios }) => ({
    ...state,
    loading: false,
    loaded: true,
    error: null,
    usuarios: [...usuarios]
  })),
  on(usuariosActions.cargarUsuariosFail, (state, { payload }) => ({
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

export function usuariosReducer(state: UsuariosState | undefined, action: Action) {
    return _usuariosReducer(state, action);
}
