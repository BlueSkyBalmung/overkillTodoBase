import {State} from './reducer';
import {selectDisplayedTodo, selectLoading, selectTodos} from './selectors';

describe('Selectors', () => {
  const initialState: State = {
   todos: [
     {id:0, title: 'todo1Title', isClosed: true, modified: new Date()},
     {id:1, title: 'todo2Title', isClosed: false, modified: new Date()},
   ],
   loading: false
  };

  it('should select todos list', () => {
    const result = selectTodos.projector(initialState);
    expect(result).toEqual(initialState.todos);
  });

  it('should select loading ', () => {
    const result = selectLoading.projector(initialState);
    expect(result).toEqual(initialState.loading);
  });

  it('should select displayed todo', () => {
    const result = selectDisplayedTodo.projector(initialState);
    expect(result).toEqual(initialState.displayedTodo);
  });
});
