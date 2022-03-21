import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

interface AppState {
  contador: number;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  contador: number = 0;

  constructor(
    private store: Store<AppState>
  ){
    this.store.subscribe( state => {
      console.log(state)
    })
  }

  incrementar(){
    this.store.dispatch( incrementar )
  }
  decrementar() {
    this.store.dispatch( decrementar )
  }
  
}
