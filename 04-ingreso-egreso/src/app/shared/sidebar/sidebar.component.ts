import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { Usuario } from 'src/app/models/usuario.model';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit, OnDestroy {

  user: Usuario;

  subscriptions: Subscription[] = [];

  constructor(
    private store: Store<AppState>,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    const userSubscrtription: Subscription = this.store.select(store => store.user.user).subscribe(user => this.user = user)
    this.subscriptions.push(userSubscrtription)
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subs => subs.unsubscribe());
  }

  logout() {
    this.authService.logout().then( () => {
      this.router.navigate(['/login']);
    })

  }

}
