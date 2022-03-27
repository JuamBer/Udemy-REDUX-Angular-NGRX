import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

//NGRX
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import * as todosActions from '../todo.actions';

@Component({
  selector: 'app-todo-add',
  templateUrl: './todo-add.component.html',
  styleUrls: ['./todo-add.component.css']
})
export class TodoAddComponent implements OnInit {

  txtInput: FormControl = new FormControl;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.txtInput = new FormControl('', Validators.required);
  }
  agregar(){
    if(this.txtInput.valid){
      this.store.dispatch(todosActions.crear({ text: this.txtInput.value }));
      this.txtInput.reset();
    }
  }

}
