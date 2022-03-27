import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

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

    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.loginUsuario(email, password)
        .then(
          (credenciales) => {
            console.log(credenciales)
            this.router.navigate(['/']);
          }
        ).catch(
          (error) => {
            console.error(error)
          }
        )
    }
  }

}
