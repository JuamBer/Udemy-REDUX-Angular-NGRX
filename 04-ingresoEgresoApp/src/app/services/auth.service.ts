import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators'
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private angularFireAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {}

  initAuthListener() {
    this.angularFireAuth.authState.subscribe(
      (user)=>{
        console.log(user)
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
