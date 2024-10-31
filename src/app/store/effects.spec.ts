import { TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { Effects } from './effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';
import { Actions } from '@ngrx/effects';
import { todosReducer } from './reducer';
import { TodoService } from '../services/todo.service';
import { cold, hot } from 'jasmine-marbles';
import { TodoAddGroup, TodoLoadGroup, TodoUpdateGroup } from './actions';
import { Todo } from '../models/todo';

describe('Effects', () => {
  let effects: Effects;
  let actions: Observable<Actions>;
  const todoService = jasmine.createSpyObj<TodoService>('TodoService', ['list', 'get', 'update', 'add']);


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({ todosStore: todosReducer })],
      providers: [
        Effects,
        provideMockActions(() => actions),
        {
          provide: TodoService,
          useValue: todoService,
        },
      ],
    });

    effects = TestBed.inject(Effects);
  });

  describe('loadTodos$', () => {
    it('should dispatch loadTodosSuccess action when todoService.list return a result', () => {
      const mockedTodos: Todo[] = [{ id: 0, title: 'aTitle', isClosed: true, modified: new Date() }];
      todoService.list.and.returnValue(of(mockedTodos));

      actions = hot('-a-', {
        a: TodoLoadGroup.loadTodos(),
      });
      const expected = cold('-b-', {
        b: TodoLoadGroup.loadTodosSuccess({ todos: mockedTodos }),
      });

      expect(effects.loadTodos$).toBeObservable(expected);
    });

    it('should dispatch loadTodosFailed action when todoService.list fails', () => {
      todoService.list.and.returnValue(cold('#'));

      actions = hot('-a-', {
        a: TodoLoadGroup.loadTodos(),
      });
      const expected = cold('-b-', {
        b: TodoLoadGroup.loadTodosFailed(),
      });

      expect(effects.loadTodos$).toBeObservable(expected);
    });
  });

  describe('loadTodo$', () => {
    it('should dispatch loadTodoSuccess action when todoService.get return a result', () => {
      const mockedTodos: Todo = { id: 0, title: 'aTitle', isClosed: true, modified: new Date()  };
      todoService.get.and.returnValue(of(mockedTodos));

      actions = hot('-a-', {
        a: TodoLoadGroup.loadTodo({ id: 0}),
      });
      const expected = cold('-b-', {
        b: TodoLoadGroup.loadTodoSuccess({ todo: mockedTodos }),
      });

      expect(effects.loadTodo$).toBeObservable(expected);
    });

    it('should dispatch loadTodoFailed action when todoService.get fails', () => {
      todoService.get.and.returnValue(cold('#'));

      actions = hot('-a-', {
        a: TodoLoadGroup.loadTodo({ id: 0}),
      });
      const expected = cold('-b-', {
        b: TodoLoadGroup.loadTodoFailed(),
      });

      expect(effects.loadTodo$).toBeObservable(expected);
    });
  });

  describe('updateTodo$', () => {
    it('should dispatch updateTodoSuccess action when todoService.update return a result', () => {
      const mockedTodos: Todo = { id: 0, title: 'aTitle', isClosed: true, modified: new Date() };
      todoService.update.and.returnValue(of(mockedTodos));

      actions = hot('-a-', {
        a: TodoUpdateGroup.updateTodo({ todo: mockedTodos }),
      });
      const expected = cold('-b-', {
        b: TodoUpdateGroup.updateTodoSuccess({ todo: mockedTodos }),
      });

      expect(effects.updateTodo$).toBeObservable(expected);
    });

    it('should dispatch updateTodoFailed action when todoService.update fails', () => {
      const mockedTodos: Todo = { id: 0, title: 'aTitle', isClosed: true, modified: new Date()  };
      todoService.update.and.returnValue(cold('#'));

      actions = hot('-a-', {
        a: TodoUpdateGroup.updateTodo({ todo: mockedTodos }),
      });
      const expected = cold('-b-', {
        b: TodoUpdateGroup.updateTodoFailed(),
      });

      expect(effects.updateTodo$).toBeObservable(expected);
    });
  });

  describe('addTodo$', () => {
    it('should dispatch addTodoSuccess action when todoService.add return a result', () => {
      const mockedTodos: Todo = { id: 0, title: 'aTitle', isClosed: true, modified: new Date()  };
      todoService.add.and.returnValue(of(mockedTodos));

      actions = hot('-a-', {
        a: TodoAddGroup.addTodo({ todo: mockedTodos }),
      });
      const expected = cold('-b-', {
        b: TodoAddGroup.addTodoSuccess({ todo: mockedTodos }),
      });

      expect(effects.addTodo$).toBeObservable(expected);
    });

    it('should dispatch addTodoFailed action when todoService.add fails', () => {
      const mockedTodos: Todo = { id: 0, title: 'aTitle', isClosed: true, modified: new Date()  };
      todoService.add.and.returnValue(cold('#'));

      actions = hot('-a-', {
        a: TodoAddGroup.addTodo({ todo: mockedTodos }),
      });
      const expected = cold('-b-', {
        b: TodoAddGroup.addTodoFailed(),
      });

      expect(effects.addTodo$).toBeObservable(expected);
    });
  });
});
