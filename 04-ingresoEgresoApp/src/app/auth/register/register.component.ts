import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

//NGRX
import { AppState } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';
import * as uiActions from 'src/app/shared/ui.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit,OnDestroy {

  registroForm: FormGroup;
  loading: boolean = false;
  uiSuscription: Subscription

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.registroForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    this.uiSuscription = this.store.select('ui').subscribe(ui => this.loading = ui.isLoading);
  }
  ngOnDestroy(): void {
    this.uiSuscription.unsubscribe();
  }

  crearUsuario() {
    this.store.dispatch(uiActions.isLoading());

    const { nombre, email, password } = this.registroForm.value;
    this.authService.crearUsuario(nombre, email, password)
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
