import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Todo } from '../models/todo';
import { ActivatedRoute } from '@angular/router';
import { selectDisplayedTodos, selectLoading } from '../store/selectors';
import { TodoLoadGroup } from '../store/actions';

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.scss']
})
export class TodoDetailComponent implements OnInit {

todo$: Observable<Todo | undefined>;
loading$: Observable<boolean>;

  constructor(private readonly store: Store, private readonly route: ActivatedRoute) { 
    this.todo$ = this.store.select(selectDisplayedTodos);
    this.loading$ = this.store.select(selectLoading);
  }

  ngOnInit(): void {
  
      this.store.dispatch(TodoLoadGroup.loadTodo({id: this.route.snapshot.params.id}));
  
  }
}
