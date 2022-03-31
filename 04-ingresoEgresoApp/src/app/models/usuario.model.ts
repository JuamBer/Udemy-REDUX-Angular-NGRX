export class Usuario {
  public uid: string;
  public nombre: string;
  public email: string;

  constructor(
    uid: string,
    nombre: string,
    email: string
  ){
    this.uid = uid;
    this.nombre = nombre;
    this.email = email;
  }

  static fromFirebase({ email, nombre, uid}){
    return new Usuario(uid, nombre, email);
  }
}

