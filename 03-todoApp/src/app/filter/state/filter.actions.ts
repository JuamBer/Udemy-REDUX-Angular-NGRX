import { createAction, props } from '@ngrx/store';
import { FiltersType } from './filter.type';

export const setFilter = createAction(
  '[Filter] Set Filter',
  props<{ filter: FiltersType}>()
);
