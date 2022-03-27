import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private angularFireAuth: AngularFireAuth
  ) { }

  crearUsuario(nombre: string, email:string, password: string){
    return this.angularFireAuth.createUserWithEmailAndPassword(email, password);
  }

  loginUsuario(email: string, password: string) {
    return this.angularFireAuth.signInWithEmailAndPassword(email, password);
  }
}
