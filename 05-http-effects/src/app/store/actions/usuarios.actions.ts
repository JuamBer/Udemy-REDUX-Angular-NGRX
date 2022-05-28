import { createAction, props } from '@ngrx/store';
import { Usuario } from 'src/app/models/usuario.model';

export const cargarUsuarios = createAction('[Usuarios] cargarUsuarios');
export const cargarUsuariosSuccess = createAction(
  '[Usuarios] cargarUsuariosSuccess',
  props<{ usuarios: Usuario[]}>()
);
export const cargarUsuariosFail = createAction(
  '[Usuarios] cargarUsuariosFail',
  props<{ payload: any }>()
);
