import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';

//NGRX
import { AppState } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';
import * as uiActions from 'src/app/shared/ui.actions';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  loading: boolean = false;
  uiSuscription: Subscription

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    })

    this.uiSuscription = this.store.select('ui').subscribe(ui => this.loading = ui.isLoading);
  }
  ngOnDestroy(): void {
    this.uiSuscription.unsubscribe();
  }


  loginUsuario() {
    this.store.dispatch(uiActions.isLoading());

    const { email, password } = this.loginForm.value;
    this.authService.loginUsuario(email, password)
      .then(
        (credenciales) => {
          this.store.dispatch(uiActions.stopLoading());
          this.router.navigate(['/']);
        }
      ).catch(
        (error) => {
          this.store.dispatch(uiActions.stopLoading());
        }
      )

  }

}
