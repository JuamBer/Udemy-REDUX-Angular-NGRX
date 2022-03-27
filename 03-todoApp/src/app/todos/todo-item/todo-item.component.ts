import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

//NGRX
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.reducer';
import * as todoActions from '../state/todo.actions';

import { Todo } from '../models/todo.model';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {

  @Input() todo: Todo = new Todo('');
  @ViewChild('inputFisico') txtInputFisico: ElementRef | undefined;

  chkCompletado: FormControl = new FormControl;
  txtInput: FormControl = new FormControl;
  editando: boolean = false;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.chkCompletado = new FormControl(this.todo.completed);
    this.chkCompletado = new FormControl(this.todo.completed, Validators.required);

    this.chkCompletado.valueChanges.subscribe(
      (changes)=>{
        this.store.dispatch(todoActions.toggle({id: this.todo.id }));
      }
    )
  }

  editar(){
    this.editando = true;
    this.txtInput.setValue(this.todo.text);

    setTimeout(()=>{
      this.txtInputFisico?.nativeElement.select();
    },1)
  }

  terminarEdicion(){
    this.editando = false;
    if(this.txtInput.valid){
      if(this.txtInput.value != this.todo.text){
        this.store.dispatch(todoActions.editar({
          id: this.todo.id,
          text: this.txtInput.value
        }));
      }
    }
  }
  completar(){

  }

}
