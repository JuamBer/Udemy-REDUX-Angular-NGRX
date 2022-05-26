import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { IngresoEgreso } from 'src/app/models/ingreso-egreso.model';
import { IngresoEgresoService } from 'src/app/services/ingreso-egreso.service';
import Swal from 'sweetalert2';
import { IngresoEgresoAppState } from '../state/ingreso-egreso.reducer';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: []
})
export class DetalleComponent implements OnInit,OnDestroy {

  ingresosEgresos: IngresoEgreso[] = [];

  subscriptions: Subscription[] = [];

  constructor(
    private store: Store<IngresoEgresoAppState>,
    private ingresoEgresoService: IngresoEgresoService
  ) { }

  ngOnInit() {
    const ingresosEgresosSubscription: Subscription = this.store.select(store => store.ingresosEgresos).subscribe(ingresosEgresos => {
      this.ingresosEgresos = ingresosEgresos.items;
    });
    this.subscriptions.push(ingresosEgresosSubscription);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subs => subs.unsubscribe());
  }

  borrar(uid: string){
    this.ingresoEgresoService.borrarIngresoEgreso(uid).then(
      ()=>{
        Swal.fire('Borrado', 'Item Borrado', 'success')
      }
    ).catch(
      (err) => {
        Swal.fire('Error', err.message, 'error')
      }
    )
  }

}
