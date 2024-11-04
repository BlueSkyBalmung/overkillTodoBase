import { TodoAddGroup } from './../store/actions';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent implements OnInit {
  public todosForm: FormGroup = new FormGroup({});

  constructor(private readonly fb: FormBuilder, private readonly store: Store) { }

  ngOnInit(): void {
    this.todosForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
    })
  }


  onSubmit() {
    if (this.todosForm.valid) {
      this.store.dispatch(TodoAddGroup.addTodo({todo: { ...this.todosForm.value, isClosed: false, modified: new Date(),}}));
    }
  }
}