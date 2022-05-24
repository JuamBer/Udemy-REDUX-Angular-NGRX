import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: []
})
export class IngresoEgresoComponent implements OnInit {

  form: FormGroup;
  tipo: string = 'ingreso';

  constructor(
    private formBuilder: FormBuilder,
    private ingresoEgresoService: IngresoEgresoService
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      descripcion: ['', Validators.required],
      monto: [0, Validators.required]
    });
  }

  send(formValue: any){
    if(this.form.invalid){
      return
    }

    const ingresoEgreso: IngresoEgreso = {
      descripcion: formValue.descripcion,
      monto: formValue.monto,
      tipo: this.tipo
    }

    this.ingresoEgresoService.crearIngresoEgreso(ingresoEgreso)
      .then((res) => {
        Swal.fire("Registro Creado", formValue.descripcion,"success")
        this.form.reset();
      })
      .catch((err) => {
        Swal.fire("Error", err.message, "error")
      });
  }

}
