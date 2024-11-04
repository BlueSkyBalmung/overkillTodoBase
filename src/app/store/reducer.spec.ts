import { Todo } from '../models/todo';
import { TodoAddGroup, TodoLoadGroup, TodoUpdateGroup } from './actions';
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

  describe('loadTodo action', () => {
    it('should retrieve todo and update the state', () => {
      const { initialState } = fromReducer;
      const action = TodoLoadGroup.loadTodo({ id: 0});

      const state = fromReducer.todosReducer(initialState, action);

      expect(state.loading).toBeTrue();
      expect(state).not.toBe(initialState);
    });
  });


  describe('loadTodosSuccess action', () => {
    it('should retrieve all todos and update the state', () => {
      const { initialState } = fromReducer;
      const newState: State = { todos: [{ id:0, title: 'aTitle', isClosed: false, modified: new Date() }], loading: false };
      const action = TodoLoadGroup.loadTodosSuccess({
        todos: [...newState.todos],
      });

      const state = fromReducer.todosReducer(initialState, action);

      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
    });
  });

  describe('loadTodoSuccess action', () => {
    it('should retrieve todo and update the state', () => {
      const { initialState } = fromReducer;
      const newTodo: Todo = { id: 0, title: 'aTitle', isClosed: false, modified: new Date() };
      const action = TodoLoadGroup.loadTodoSuccess({
        todo: newTodo,
      });

      const state = fromReducer.todosReducer(initialState, action);

      expect(state.displayedTodo).toEqual(newTodo);
      expect(state.displayedTodo).toBe(newTodo);
    });
  });

  describe('updateTodosSuccess action', () => {
    it('should update todo and update the state', () => {
      const { initialState } = fromReducer;
      const newState: Todo = {  id: 0, title: 'aTitle', isClosed: true, modified: new Date()  };
      const action = TodoUpdateGroup.updateTodoSuccess({
        todo: newState,
      });

      const state = fromReducer.todosReducer({...initialState, todos : [{ id: 0, title: 'aTitle', isClosed: false, modified: new Date() }]}, action);

      expect(state.todos[0]).toBe(newState);
    });
  });

  describe('addTodosSuccess action', () => {
    it('should add todo and update the state', () => {
      const { initialState } = fromReducer;
      const newState: Todo = {  id: 4, title: 'aTitle', isClosed: false, modified: new Date() };
      const action = TodoAddGroup.addTodoSuccess({
        todo: newState,
      });

      const state = fromReducer.todosReducer(initialState, action);

      expect(state.todos[0]).toEqual(newState);
      expect(state.todos[0]).not.toBe(newState);
      expect(state.todos.length).toEqual(1);
    });
  });

  describe('sort items', () => {
    it('should sort items by date', () => {
      const newTodos: Todo[] = [
        { id: 0, title: 'aTitle', isClosed: false, modified: new Date(Date.parse('2000-01-01')) },
        { id: 1, title: 'bTitle', isClosed: false, modified: new Date(Date.parse('1999-12-31')) }
      ];
      const result = fromReducer.sortByDate(newTodos[0], newTodos[1]);
      expect(result < 0).toBeTrue();
    });

    it('should sort items by check and date', () => {
      const newTodos: Todo[] = [
        { id: 0, title: 'aTitle', isClosed: false, modified: new Date(Date.parse('2000-01-01')) },
        { id: 1, title: 'bTitle', isClosed: false, modified: new Date(Date.parse('1999-12-31')) }
      ];
      const result = fromReducer.sortTodo(newTodos[0], newTodos[1]);
      expect(result < 0).toBeTrue();
    });
  });
});
