import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoListComponent } from './todo-list.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { selectLoading, selectTodos } from '../store/selectors';
import { MatCheckbox } from '@angular/material/checkbox';
import {MockBuilder,  MockedComponent, MockRender, ngMocks} from 'ng-mocks';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AppModule } from '../app.module';

describe('TodoListComponent', () => {
  let fixture: ComponentFixture<TodoListComponent>;
  let store: MockStore;
  let router = {
    navigate: jasmine.createSpy('navigate'),
  };

  beforeEach(() => 
   MockBuilder(TodoListComponent, AppModule)
    .provide(
      provideMockStore({selectors: [ {
        selector: selectTodos,
        value: [
          { id: 0, title: 'todo 1', isClosed: false },
          { id: 1, title: 'todo 2', isClosed: true }
        ]
      },
      {
        selector: selectLoading,
        value: false
      }
    ]
    })).provide({ provide: Router, useValue: router })
  );

  beforeEach(() => {
    fixture = MockRender(TodoListComponent);
    store = TestBed.inject(MockStore);
    spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges();
  });

  afterEach(() => {
    ngMocks.flushTestBed();
  });

  it('should create', () => {
    expect(fixture).toBeTruthy();
  });

  it('should display a title', () => {
    expect(fixture.debugElement.query(By.css('mat-card-title')).nativeElement.innerText).toEqual(
      'Todos'
    );
  });

  it('should display todos', () => {
    const todoElements = ngMocks.findAll('mat-list mat-list-item');
    expect(todoElements.length).toEqual(2);
    expect(todoElements[0].query(By.css('h4')).nativeElement.innerText).toContain('todo 1');
    expect(todoElements[1].query(By.css('h4')).nativeElement.innerText).toContain('todo 2');
    const todoCheckboxes: MockedComponent<MatCheckbox>[] =
      todoElements.map(item => item.query(By.css('mat-checkbox'))).map(item => item.componentInstance);
    expect(todoCheckboxes[0].checked).toBeFalse();
    expect(todoCheckboxes[1].checked).toBeTrue();
  });

  it('should check todos', () => {
    ngMocks.find('mat-checkbox').triggerEventHandler('change', null);
    fixture.detectChanges();
    expect(store.dispatch).toHaveBeenCalled();
    const checkboxs = ngMocks.findAll('mat-checkbox');
    expect(ngMocks.get(checkboxs[checkboxs.length - 1], MatCheckbox).checked).toBeTrue();
    expect(Boolean(ngMocks.get(checkboxs[checkboxs.length - 1], MatCheckbox).disabled)).toBeTrue();
  });
});
