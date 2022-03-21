import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-nieto',
  templateUrl: './nieto.component.html',
  styleUrls: ['./nieto.component.scss']
})
export class NietoComponent implements OnInit {

  @Input() contador: number = 0;
  @Output() cambioContador = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  reset(){
    this.contador = 0;
    this.cambioContador.emit(this.contador);
  }
}
