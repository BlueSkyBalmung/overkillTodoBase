import { TodoAddGroup, TodoLoadGroup, TodoUpdateGroup } from './actions';
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

  loadTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoLoadGroup.loadTodo),
      mergeMap(({ id }) =>
        this.todoService.get(id).pipe(
          map((todo) => TodoLoadGroup.loadTodoSuccess({ todo })),
          catchError(() => [TodoLoadGroup.loadTodoFailed()])
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

  addTodo$ = createEffect(() => 
    this.actions$.pipe(
      ofType(TodoAddGroup.addTodo),
      mergeMap(({ todo }) =>
        this.todoService.add(todo).pipe(
          map((todo) => TodoAddGroup.addTodoSuccess({ todo })),
          catchError(() => [TodoAddGroup.addTodoFailed()])
        )
      )
    ));

  constructor(private readonly actions$: Actions, private readonly todoService: TodoService) {}
}
