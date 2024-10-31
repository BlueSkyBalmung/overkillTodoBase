import { TestBed } from '@angular/core/testing';
import { Effects } from './effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';
import { Actions, EffectsModule, EffectsRootModule } from '@ngrx/effects';
import { TodoService } from '../services/todo.service';
import { cold, hot } from 'jasmine-marbles';
import {loadTodos, loadTodosFailed, loadTodosSuccess} from './actions';
import { Todo } from '../models/todo';
import { MockBuilder } from 'ng-mocks';
import { AppModule } from '../app.module';

describe('Effects', () => {
  let effects: Effects;
  let actions: Observable<Actions>;
  const todoService = jasmine.createSpyObj<TodoService>('TodoService', ['list']);

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
      const mockedTodos: Todo[] = [{ title: 'aTitle', isClosed: true }];
      todoService.list.and.returnValue(of(mockedTodos));

      actions = hot('-a-', {
        a: loadTodos(),
      });
      const expected = cold('-b-', {
        b: loadTodosSuccess({ todos: mockedTodos }),
      });

      expect(effects.loadTodos$).toBeObservable(expected);
    });

    it('should dispatch loadTodosFailed action when todoService.list fails', () => {
      todoService.list.and.returnValue(cold('#'));

      actions = hot('-a-', {
        a: loadTodos(),
      });
      const expected = cold('-b-', {
        b: loadTodosFailed(),
      });

      expect(effects.loadTodos$).toBeObservable(expected);
    });
  });
});
