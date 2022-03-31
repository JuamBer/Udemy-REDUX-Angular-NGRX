import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators'
import { Usuario } from '../models/usuario.model';
import { Subscription } from 'rxjs';

//NGRX
import { AppState } from '../app.reducer';
import { Store } from '@ngrx/store';
import * as authActions from '../auth/state/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userSubscription: Subscription

  constructor(
    private angularFireAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private store: Store<AppState>
  ) {}

  initAuthListener() {
    this.angularFireAuth.authState.subscribe(
      (fuser)=>{
        if (fuser) {
          this.userSubscription = this.firestore.collection('users').doc(`${fuser.uid}`).valueChanges().subscribe(
            (user: any)=>{
              const tempUser = Usuario.fromFirebase(user);
              this.store.dispatch(authActions.setUser({ user: tempUser }));
            }
          )
        }else{
          this.userSubscription.unsubscribe();
          this.store.dispatch(authActions.unSetUser());
        }
      }
    )
  }

  crearUsuario(nombre: string, email:string, password: string){
    return this.angularFireAuth.createUserWithEmailAndPassword(email, password)
      .then(
        ({ user })=>{
          const newUser = new Usuario(user.uid, nombre, user.email);
          return this.firestore.collection('users').doc(`${user.uid}`).set({
            ...newUser
          });
        }
      );
  }

  loginUsuario(email: string, password: string) {
    return this.angularFireAuth.signInWithEmailAndPassword(email, password);
  }

  logOut() {
    return this.angularFireAuth.signOut();
  }

  isAuth() {
    return this.angularFireAuth.authState.pipe(
      map(user => user != null)
    );
  }
}
