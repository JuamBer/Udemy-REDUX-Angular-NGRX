import { createAction, props } from '@ngrx/store';
import { Usuario } from 'src/app/models/usuario.model';

export const cargarUsuario = createAction(
  '[Usuario] cargarUsuario',
  props<{ id: string }>()
);
export const cargarUsuarioSuccess = createAction(
  '[Usuario] cargarUsuarioSuccess',
  props<{ usuario: Usuario }>()
);
export const cargarUsuarioFail = createAction(
  '[Usuario] cargarUsuarioFail',
  props<{ payload: any }>()
);
