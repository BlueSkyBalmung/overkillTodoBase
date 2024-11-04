import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoDetailComponent } from './todo-detail.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { MockBuilder, MockRender, ngMocks } from 'ng-mocks';
import { AppModule } from '../app.module';
import { selectDisplayedTodo, selectLoading } from '../store/selectors';
import { ActivatedRoute } from '@angular/router';

describe('TodoDetailComponent', () => {
  let fixture: ComponentFixture<TodoDetailComponent>;
  let store: MockStore;

  beforeEach(() =>
    MockBuilder(TodoDetailComponent, AppModule).provide(provideMockStore({selectors: [
      {
        selector: selectLoading,
        value: false
      },
      {
        selector: selectDisplayedTodo,
        value: { id: 0, title: 'todo 1', description: 'description 1', isClosed: false }
      }
    ]})).provide({ provide: ActivatedRoute, useValue: { snapshot: {params: {id: '0'}} }})
  );

  beforeEach(() => {
    fixture = MockRender(TodoDetailComponent);
    store = TestBed.inject(MockStore);
    spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges();
  });

  afterEach(() => {
    ngMocks.flushTestBed();
  });

  it('should display detail', () => {
    const todoElements = ngMocks.findAll('p');
    expect(todoElements.length).toEqual(2);
    expect(todoElements[0].nativeElement.innerText).toContain('todo 1');
    expect(todoElements[1].nativeElement.innerText).toContain('description 1');
  });
});