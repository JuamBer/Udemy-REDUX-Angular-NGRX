import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { UsuarioService } from "src/app/services/usuario.service";
import { AppState } from "../app.reducers";
import * as usuariosActions from "../actions/usuarios.actions";
import { catchError, map, mergeMap } from "rxjs/operators";
import { of } from "rxjs";

@Injectable()
export class UsuariosEffects {


  constructor(
    private usuarioService: UsuarioService,
    private actions$: Actions,
  ) { }

  cargarUsuarios$ = createEffect(
    () => this.actions$.pipe(
      ofType(usuariosActions.cargarUsuarios),
      mergeMap(
        () => {
          return this.usuarioService.getUsers()
            .pipe(
              map(usuarios => usuariosActions.cargarUsuariosSuccess({ usuarios: usuarios })),
              catchError(error => of(usuariosActions.cargarUsuariosFail({ payload: error })))
            )
        }
      )
    )
  );

}
