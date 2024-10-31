import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Todo} from '../models/todo';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  constructor(private http: HttpClient) { }

  list(): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${environment.baseUrl}/api/todos`);
  }

  get(id: number): Observable<Todo> {
    return this.http.get<Todo>(`${environment.baseUrl}/api/todos/${id}`);
  }

  update(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(`${environment.baseUrl}/api/todos/${todo.id}`, todo);
  }

  add(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(`${environment.baseUrl}/api/todos`, todo);
  }

}
