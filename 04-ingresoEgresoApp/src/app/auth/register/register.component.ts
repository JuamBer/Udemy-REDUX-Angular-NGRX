import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {

  registroForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.registroForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  crearUsuario(){
    console.log("crearUsuario()\n" + this.registroForm.value)

    Swal.fire({
      title: 'Validando Credenciales',
      didOpen: () => {
        Swal.showLoading()
      }
    })

    if(this.registroForm.valid){
      const { nombre, email, password } = this.registroForm.value;
      this.authService.crearUsuario(nombre, email, password)
      .then(
        (credenciales)=>{
          console.log(credenciales);
          Swal.close();
          this.router.navigate(['/']);
        }
      ).catch(
        (error)=>{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.message,
          });
        }
      )
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Credenciales Inválidas',
      })
    }
  }

}
