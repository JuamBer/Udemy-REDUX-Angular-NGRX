import { createReducer, on } from '@ngrx/store';
import * as filterActions from './filter.actions';
import { FiltersType } from './filter.type';

export const initialState: FiltersType = 'todos';

export const filterReducer = createReducer<FiltersType>(
  initialState,
  on(filterActions.setFilter, (state, { filter  }) => filter )
);
