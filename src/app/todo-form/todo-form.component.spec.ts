import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoFormComponent } from './todo-form.component';
import { AppModule } from '../app.module';
import { MockBuilder, MockRender, ngMocks } from 'ng-mocks';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { ReactiveFormsModule } from '@angular/forms';


describe('TodoFormComponent', () => {
  let fixture: ComponentFixture<TodoFormComponent>;
  let store: MockStore;

  beforeEach(() =>
    MockBuilder(TodoFormComponent, AppModule).provide(
      provideMockStore()).keep(ReactiveFormsModule)
  );

  beforeEach(() => {
    fixture = MockRender(TodoFormComponent);
    store = TestBed.inject(MockStore);
    spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges();
  });

  afterEach(() => {
    ngMocks.flushTestBed();
  });

  it('should submit', () => {
    ngMocks.change(ngMocks.find('[formControlName="title"]'), 'test1');
    ngMocks.change(ngMocks.find('[formControlName="description"]'), 'test2');
    ngMocks.click('button');
    fixture.detectChanges();
    expect(store.dispatch).toHaveBeenCalled();
  });

  it('should not submit', () => {
    ngMocks.change(ngMocks.find('[formControlName="description"]'), 'test2');
    ngMocks.click('button');
    fixture.detectChanges();
    expect(store.dispatch).not.toHaveBeenCalled();
  });
});