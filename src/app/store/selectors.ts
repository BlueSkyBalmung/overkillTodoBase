import {createFeatureSelector, createSelector} from '@ngrx/store';
import {featureKey, State} from './reducer';

export const getState = createFeatureSelector<State>(featureKey);

export const selectTodos = createSelector(
  getState,
  (state: State) => state.todos,
);

export const selectDisplayedTodos = createSelector(
  getState,
  (state: State) => state.displayedTodo,
);

export const selectLoading = createSelector(
  getState,
  (state: State) => state.loading,
);
