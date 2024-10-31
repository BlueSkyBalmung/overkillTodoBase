import { TodoLoadGroup, TodoUpdateGroup } from './../store/actions';
import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Todo} from '../models/todo';
import {Store} from '@ngrx/store';
import {selectLoading, selectTodos} from '../store/selectors';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  todos$: Observable<ReadonlyArray<Todo>>;
  loading$: Observable<boolean>;

  constructor(private readonly store: Store) {
    this.todos$ = this.store.select(selectTodos);
    this.loading$ = this.store.select(selectLoading);
  }

  ngOnInit(): void {
     this.store.dispatch(TodoLoadGroup.loadTodos());
  }

  onCheck(todo: Todo): void {
    this.store.dispatch(TodoUpdateGroup.updateTodo({ todo : {isClosed: !todo.isClosed, title: todo.title, id: todo.id } }));
  }
}
