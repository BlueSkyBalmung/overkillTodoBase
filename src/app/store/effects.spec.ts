import { TestBed } from '@angular/core/testing';
import { Effects } from './effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';
import { Actions } from '@ngrx/effects';
import { TodoService } from '../services/todo.service';
import { cold, hot } from 'jasmine-marbles';
import { TodoLoadGroup, TodoUpdateGroup} from './actions';
import { Todo } from '../models/todo';
import { MockBuilder } from 'ng-mocks';
import { AppModule } from '../app.module';

describe('Effects', () => {
  let effects: Effects;
  let actions: Observable<Actions>;
  const todoService = jasmine.createSpyObj<TodoService>('TodoService', ['list', 'update']);

  beforeEach(() =>
    MockBuilder(Effects, AppModule)
    .provide(
        provideMockActions(() => actions)
      )
    .provide(
      {
        provide: TodoService,
        useValue: todoService,
      }).keep(Effects));

  beforeEach(() => {
    effects = TestBed.inject(Effects);
  })

  describe('loadTodos$', () => {
    it('should dispatch loadTodosSuccess action when todoService.list return a result', () => {
      const mockedTodos: Todo[] = [{ id:0, title: 'aTitle', isClosed: true }];
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

  describe('updateTodo$', () => {
    it('should dispatch updateTodoSuccess action when todoService.update return a result', () => {
      const mockedTodos: Todo = { id: 0, title: 'aTitle', isClosed: true };
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
      const mockedTodos: Todo = { id: 0, title: 'aTitle', isClosed: true  };
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

});
