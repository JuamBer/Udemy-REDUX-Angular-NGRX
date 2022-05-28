import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { UsuarioService } from "src/app/services/usuario.service";
import { AppState } from "../app.reducers";
import * as usuarioActions from "../actions/usuario.actions";
import { catchError, map, mergeMap } from "rxjs/operators";
import { of } from "rxjs";

@Injectable()
export class UsuarioEffects {


  constructor(
    private usuarioService: UsuarioService,
    private actions$: Actions,
  ) { }

  cargarUsuario$ = createEffect(
    () => this.actions$.pipe(
      ofType(usuarioActions.cargarUsuario),
      mergeMap(
        ({ id }) => {
          return this.usuarioService.getUserById(id)
            .pipe(
              map(usuario => usuarioActions.cargarUsuarioSuccess({ usuario: usuario })),
              catchError(error => of(usuarioActions.cargarUsuarioFail({ payload: error })))
            )
        }
      )
    )
  );

}
