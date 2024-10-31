import {State} from './reducer';
import { selectDisplayedTodos, selectTodos, selectLoading } from './selectors';

describe('Selectors', () => {
  const initialState: State = {
   todos: [
     {id: 0, title: 'todo1Title', isClosed: true, modified: new Date() },
     {id: 1, title: 'todo2Title', isClosed: false, modified: new Date() },
   ],
   displayedTodo: {id: 0, title: 'todo1Title', isClosed: true, modified: new Date() },
   loading: false
  };

  it('should select todos list', () => {
    const result = selectTodos.projector(initialState);
    expect(result).toEqual(initialState.todos);
  });

  it('should select todos displayed', () => {
    const result = selectDisplayedTodos.projector(initialState);
    expect(result).toEqual(initialState.displayedTodo);
  });

  it('should select loading displayed', () => {
    const result = selectLoading.projector(initialState);
    expect(result).toEqual(initialState.loading);
  });
});
