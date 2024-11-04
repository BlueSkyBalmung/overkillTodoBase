import {Injectable} from '@angular/core';
import {InMemoryDbService} from 'angular-in-memory-web-api';
import {Todo} from '../models/todo';

@Injectable({
  providedIn: 'root'
})
export class MockTodoApi implements InMemoryDbService {

  private readonly todos: Todo[] = [
    { id: 0, title: 'todo in memory 1', isClosed: false, description: 'description in memory 1', modified: new Date() },
    { id: 1, title: 'todo in memory 2', isClosed: false, description: 'description in memory 2', modified: new Date()  },
    { id: 2, title: 'todo in memory 3', isClosed: true, modified: new Date()  },
    { id: 3, title: 'todo in memory 4', isClosed: false, description: 'description in memory 4', modified: new Date()  },
  ];
  createDb(): Record<string, Todo[]> {
    
    return { todos: this.todos };
  }

  generateId(todos: Todo[]): number {
    return todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) + 1 : 0;
  }
}
