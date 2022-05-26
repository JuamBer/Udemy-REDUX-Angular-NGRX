import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { IngresoEgreso } from 'src/app/models/ingreso-egreso.model';
import { IngresoEgresoService } from 'src/app/services/ingreso-egreso.service';
import Swal from 'sweetalert2';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';
@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: []
})
export class EstadisticaComponent implements OnInit,OnDestroy {

  ingresos: number = 0;
  egresos: number = 0;

  totalIngresos: number = 0;
  totalEgresos: number = 0;

  doughnutChartLabels: Label[] = ['Ingresos', 'Egresos'];
  doughnutChartData: MultiDataSet = [
      [],
    ];
  doughnutChartType: ChartType = 'doughnut';

  subscriptions: Subscription[] = [];

  constructor(
    private store: Store<AppState>,
    private ingresoEgresoService: IngresoEgresoService
  ) { }

  ngOnInit() {
    const ingresosEgresosSubscription: Subscription = this.store.select(store => store.ingresosEgresos).subscribe(ingresosEgresos => {
      this.generarEstatistica(ingresosEgresos.items);
    });
    this.subscriptions.push(ingresosEgresosSubscription);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subs => subs.unsubscribe());
  }

  generarEstatistica(items: IngresoEgreso[]){
    for(const item of items){
      if(item.tipo === 'ingreso'){
        this.totalIngresos += item.monto;
        this.ingresos++;
      }
      if (item.tipo === 'egreso') {
        this.totalEgresos += item.monto;
        this.egresos++;
      }
    }

    this.doughnutChartData = [[this.totalIngresos, this.totalEgresos]];
  }

}
