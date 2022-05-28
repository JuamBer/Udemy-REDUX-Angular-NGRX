import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Usuario } from 'src/app/models/usuario.model';
import { AppState } from 'src/app/store/app.reducers';
import * as usuariosActions from "../../store/actions/usuarios.actions";

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaComponent implements OnInit {

  usuarios: Usuario[] = [];
  loading: boolean = false;
  error: any = null;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.cargarUsuarios();

    this.store.select(store => store.usuarios).subscribe(({usuarios, loading, error}) => {
      this.usuarios = usuarios;
      this.loading = loading;
      this.error = error;
    });
  }

  cargarUsuarios(){
    this.store.dispatch(usuariosActions.cargarUsuarios());
  }

}
