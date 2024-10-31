import {Todo} from '../models/todo';
import {createReducer, on} from '@ngrx/store';
import { TodoLoadGroup, TodoUpdateGroup } from './actions';

export const featureKey = 'todosStore';

export interface State {
  todos: ReadonlyArray<Todo>;
  loading: boolean
}

export const initialState: State = {
  todos: [],
  loading: false
};

export const todosReducer = createReducer(
  initialState,
  on(
    TodoLoadGroup.loadTodos,
    (state) => {
      
      return {
        ...state,
        loading: true
      };
  }),
  on(
    TodoLoadGroup.loadTodosSuccess,
    (state, { todos }) => ({
      ...state,
      todos: [...todos].sort(sortTodo),
      loading: false
    })
  ),
  on(TodoUpdateGroup.updateTodoSuccess, (state, { todo }) => {
    const updateTodoList = [...state.todos]
    .map((t) => (t.id === todo.id ? todo : t))
    .sort(sortTodo);
    return {
      ...state,
      todos: updateTodoList,
    };
  }),
);

export const sortTodo = (a: Todo, b: Todo) =>  (Number(a.isClosed) -  Number(b.isClosed));
