import { TodoLoadGroup, TodoUpdateGroup } from './actions';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { TodoService } from '../services/todo.service';

@Injectable()
export class Effects {
  loadTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoLoadGroup.loadTodos),
      mergeMap(() =>
        this.todoService.list().pipe(
          map((todos) => TodoLoadGroup.loadTodosSuccess({ todos })),
          catchError(() => [TodoLoadGroup.loadTodosFailed()])
        )
      )
    )
  );

  updateTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoUpdateGroup.updateTodo),
      mergeMap(({ todo}) =>
        this.todoService.update(todo).pipe(
          map(() => TodoUpdateGroup.updateTodoSuccess({ todo })),
          catchError(() => [TodoUpdateGroup.updateTodoFailed()])
        )
      )
    )
  );

  constructor(private actions$: Actions, private todoService: TodoService) {}
}
