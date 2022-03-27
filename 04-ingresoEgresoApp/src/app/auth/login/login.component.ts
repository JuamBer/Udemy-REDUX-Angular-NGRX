import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    })
  }

  loginUsuario() {
    console.log("loginUsuario()\n" + this.loginForm.value)

    Swal.fire({
      title: 'Validando Credenciales',
      didOpen: () => {
        Swal.showLoading()
      }
    })

    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.loginUsuario(email, password)
        .then(
          (credenciales) => {
            console.log(credenciales);
            Swal.close();
            this.router.navigate(['/']);
          }
        ).catch(
          (error) => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: error.message,
            });
          }
        )
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Credenciales Inválidas',
      })
    }
  }

}
