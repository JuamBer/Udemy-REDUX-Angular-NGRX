import { Component, Input, Output, OnInit, } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducers';

@Component({
  selector: 'app-hijo',
  templateUrl: './hijo.component.html',
  styleUrls: ['./hijo.component.scss']
})
export class HijoComponent implements OnInit {

  contador: number = 0;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.store.select('contador').subscribe(
      (contador)=>{
        this.contador = contador;
      }
    )
  }

  multiplicar(){
    this.contador *= 2;
  }
  dividir(){
    this.contador /= 2;
  }

}
