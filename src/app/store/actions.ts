import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Todo } from '../models/todo';

export const TodoLoadGroup = createActionGroup({
  source: 'Todos',
  events: {
    'Load todos': emptyProps(),
    'Load todos success': props<{ todos: Todo[] }>(),
    'Load todos failed': emptyProps(),
    'Load todo': props<{ id: number }>(),
    'Load todo success': props<{ todo: Todo }>(),
    'Load todo failed': emptyProps(),
  }
});

export const TodoUpdateGroup = createActionGroup({
  source: 'Todos',
  events: {
    'Update todo': props<{ todo: Todo }>(),  
    'Update todo success': props<{ todo: Todo }>(),
    'Update todo failed': emptyProps(),
  }
});

export const TodoAddGroup = createActionGroup({
  source: 'Todos',
  events: {
    'Add todo': props<{ todo: Todo }>(),
    'Add todo success': props<{ todo: Todo }>(),
    'Add todo failed': emptyProps(),
  }
});