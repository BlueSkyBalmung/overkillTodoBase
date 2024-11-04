import {Todo} from '../models/todo';
import {createReducer, on} from '@ngrx/store';
import { TodoAddGroup, TodoLoadGroup, TodoUpdateGroup } from './actions';

export const featureKey = 'todosStore';

export interface State {
  todos: ReadonlyArray<Todo>;
  displayedTodo?: Todo;
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
  on(TodoLoadGroup.loadTodo, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(TodoLoadGroup.loadTodoSuccess, (state, { todo }) => {
    return {
      ...state,
      displayedTodo: todo,
      loading: false,
    };
  }),
  on(TodoUpdateGroup.updateTodoSuccess, (state, { todo }) => {
    const updateTodoList = [...state.todos]
    .map((t) => (t.id === todo.id ? todo : t))
    .sort(sortTodo);
    return {
      ...state,
      todos: updateTodoList,
    };
  }),
  on(TodoAddGroup.addTodoSuccess, (state, { todo }) => {
    return {
      ...state,
      todos: [{...todo, isClosed: false}, ...state.todos],
    }
  })
);


export const sortTodo = (a: Todo, b: Todo) =>  ((Number(a.isClosed) -  Number(b.isClosed)) !== 0 ? 
(Number(a.isClosed) -  Number(b.isClosed)) : sortByDate(a,b));

export const sortByDate = (a: Todo, b: Todo) => b.modified.getTime() - a.modified.getTime();