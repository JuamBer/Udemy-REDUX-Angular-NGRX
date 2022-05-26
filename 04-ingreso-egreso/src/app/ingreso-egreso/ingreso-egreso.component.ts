import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { AppState } from '../app.reducer';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import * as ui from '../shared/ui.actions';
import { IngresoEgresoAppState } from './state/ingreso-egreso.reducer';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: []
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {

  form: FormGroup;
  tipo: string = 'ingreso';
  cargando: boolean = false;
  subscriptions: Subscription[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private ingresoEgresoService: IngresoEgresoService,
    private store: Store<IngresoEgresoAppState>,
  ) { }

  ngOnInit() {
    const uiSubscription = this.store.select('ui')
      .subscribe(ui => {
        this.cargando = ui.isLoading;
      });
    this.subscriptions.push(uiSubscription);

    this.form = this.formBuilder.group({
      descripcion: ['', Validators.required],
      monto: [0, Validators.required]
    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subs => subs.unsubscribe());
  }

  send(formValue: any){
    if (this.form.invalid) {
      return
    }

    this.store.dispatch(ui.isLoading());

    const ingresoEgreso: IngresoEgreso = {
      descripcion: formValue.descripcion,
      monto: formValue.monto,
      tipo: this.tipo
    }

    this.ingresoEgresoService.crearIngresoEgreso(ingresoEgreso)
      .then((res) => {
        this.store.dispatch(ui.stopLoading());
        Swal.fire("Registro Creado", formValue.descripcion,"success")
        this.form.reset();
      })
      .catch((err) => {
        this.store.dispatch(ui.stopLoading());
        Swal.fire("Error", err.message, "error")
      });
  }

}
