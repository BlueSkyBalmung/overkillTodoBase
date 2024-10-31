import {State} from './reducer';
import {selectLoading, selectTodos} from './selectors';

describe('Selectors', () => {
  const initialState: State = {
   todos: [
     {id:0, title: 'todo1Title', isClosed: true},
     {id:1, title: 'todo2Title', isClosed: false},
   ],
   loading: false
  };

  it('should select todos list', () => {
    const result = selectTodos.projector(initialState);
    expect(result).toEqual(initialState.todos);
  });

  it('should select loading displayed', () => {
    const result = selectLoading.projector(initialState);
    expect(result).toEqual(initialState.loading);
  });
});
