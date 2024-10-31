import { Todo } from '../models/todo';
import { TodoLoadGroup, TodoUpdateGroup } from './actions';
import * as fromReducer from './reducer';
import { State } from './reducer';

describe('Reducer', () => {
  describe('unknown action', () => {
    it('should return the default state', () => {
      const { initialState } = fromReducer;
      const action = {
        type: 'Unknown',
      };
      const state = fromReducer.todosReducer(initialState, action);

      expect(state).toBe(initialState);
    });
  });

  describe('loadTodos action', () => {
    it('should retrieve all todos and update the state', () => {
      const { initialState } = fromReducer;
      const action = TodoLoadGroup.loadTodos();

      const state = fromReducer.todosReducer(initialState, action);

      expect(state.loading).toBeTrue();
      expect(state).not.toBe(initialState);
    });
  });


  describe('loadTodosSuccess action', () => {
    it('should retrieve all todos and update the state', () => {
      const { initialState } = fromReducer;
      const newState: State = { todos: [{ id:0, title: 'aTitle', isClosed: false }], loading: false };
      const action = TodoLoadGroup.loadTodosSuccess({
        todos: [...newState.todos],
      });

      const state = fromReducer.todosReducer(initialState, action);

      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
    });
  });

  describe('updateTodosSuccess action', () => {
    it('should update todo and update the state', () => {
      const { initialState } = fromReducer;
      const newState: Todo = {  id: 0, title: 'aTitle', isClosed: true  };
      const action = TodoUpdateGroup.updateTodoSuccess({
        todo: newState,
      });

      const state = fromReducer.todosReducer({...initialState, todos : [{ id: 0, title: 'aTitle', isClosed: false }]}, action);

      expect(state.todos[0]).toBe(newState);
    });
  });

  describe('sort items', () => {
    it('should sort items by closed', () => {
      const newTodos: Todo[] = [
        { id: 0, title: 'aTitle', isClosed: true },
        { id: 1, title: 'bTitle', isClosed: false }
      ];
      const result = fromReducer.sortTodo(newTodos[0], newTodos[1]);
      expect(result > 0).toBeTrue();
    });

  });
});
