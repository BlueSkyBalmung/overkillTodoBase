import {Injectable} from '@angular/core';
import {InMemoryDbService} from 'angular-in-memory-web-api';
import {Todo} from '../models/todo';

@Injectable({
  providedIn: 'root'
})
export class MockTodoApi implements InMemoryDbService {

  createDb(): {} {
    const todos: Todo[] = [
      { id:0, title: 'todo in memory 1', isClosed: false },
      { id:1, title: 'todo in memory 2', isClosed: false },
      { id:2, title: 'todo in memory 3', isClosed: true },
      { id:3, title: 'todo in memory 4', isClosed: false },
    ];
    return { todos };
  }

  generateId(todos: Todo[]): number {
    return todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) + 1 : 0;
  }
}
