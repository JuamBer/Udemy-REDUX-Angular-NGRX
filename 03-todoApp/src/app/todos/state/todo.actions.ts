import { createAction, props } from '@ngrx/store';

export const crear = createAction(
  '[TODO] Crea Todo',
  props<{text: string}>()
  );

export const toggle = createAction(
  '[TODO] Toggle Todo',
  props<{ id: number }>()
);

export const editar = createAction(
  '[TODO] Editar Todo',
  props<{ id: number, text: string }>()
);

export const toggleAll = createAction(
  '[TODO] Toggle All Todos',
  props<{ completed: boolean }>()
);
