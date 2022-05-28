import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Usuario } from 'src/app/models/usuario.model';
import { cargarUsuario } from 'src/app/store/actions';
import { AppState } from 'src/app/store/app.reducers';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {

  usuario: Usuario | null = null;
  loading: boolean = false;
  error: any = null;

  constructor(
    private store: Store<AppState>,
    private router: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.store.select(store=> store.usuario).subscribe(({usuario, loading, error}) => {
      this.usuario = usuario;
      this.loading = loading;
      this.error = error;
    });
    this.router.params.subscribe(({id})=>{
      this.store.dispatch(cargarUsuario({ id: id }));
    })
  }

}
