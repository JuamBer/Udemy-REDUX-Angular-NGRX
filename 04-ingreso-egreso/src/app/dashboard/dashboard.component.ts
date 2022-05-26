import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AppState } from '../app.reducer';
import { Usuario } from '../models/usuario.model';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import * as ingresosEgresosActions from '../ingreso-egreso/state/ingreso-egreso.actions';
import { IngresoEgreso } from '../models/ingreso-egreso.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit, OnDestroy {

  user: any;
  subscriptions: Subscription[] = [];

  constructor(
    private store: Store<AppState>,
    private ingresoEgresoService: IngresoEgresoService,

  ) { }

  ngOnInit() {
    const userSubscription = this.store.select(store => store.user).pipe(
      filter(val => val.user != null)
    ).subscribe(res => {
      this.user = res.user;
      this.ingresoEgresoService.initIngresosEgresosListener(res.user.uid).subscribe((ingresosEgresos: any)=>{
        this.store.dispatch(ingresosEgresosActions.setItems({items: ingresosEgresos}));
      });
    });
    this.subscriptions.push(userSubscription);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subs => subs.unsubscribe());
  }

}
