import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaComponent implements OnInit {

  usuarios: Usuario[] = [];

  constructor(
    public usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
    this.usuarioService.getUsers().subscribe((res: any) => {
      this.usuarios = res;
    });
  }

}
