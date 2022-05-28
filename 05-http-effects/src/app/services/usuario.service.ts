import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, pluck } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    private http: HttpClient
  ) { }

  getUsers(): Observable<any> {
    return this.http.get(`${environment.API_URL}/users?per_page=6&delay=3`).pipe(pluck("data"));
  }

  getUserById(id: string): Observable<any> {
    return this.http.get(`${environment.API_URL}/users/${id}`).pipe(pluck("data"));
  }
}
