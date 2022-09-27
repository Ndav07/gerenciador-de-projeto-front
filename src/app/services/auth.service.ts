import { Injectable } from '@angular/core';

import { Observable, Subject, tap } from 'rxjs';

import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

import { FormGroup } from '@angular/forms';

import { User } from '../components/auth/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  usuario = new Subject<User>();

  //private baseApiUrl = environment.baseApiUrl;
  private baseApiUrl = "http://localhost:3333/";

  //Post
  private cadastrar = `${this.baseApiUrl}users/`;

  private verificacao = `${this.baseApiUrl}sessions/`;

  constructor(private http: HttpClient) {}

  postVerificacao(email: string, senha: string): Observable<User> {
      return this.http.post<User>(`${this.verificacao}`, {email: email, senha: senha}).pipe(
        tap(res => {
          const token = 'teste';
          const expirationDate = 3000000;
          this.autenticao(res.email, res.senha, token, expirationDate);
        })
      );
  }

  postCadastrar(formGroup: FormGroup): Observable<FormGroup> {
    return this.http.post<FormGroup>(`${this.cadastrar}`, formGroup);
  }

  private autenticao(email: string, senha: string, token: string, expiration: number){
    token = 'teste';
    const expirationDate = new Date(new Date().getTime() + expiration);
    console.log(email, token, senha, expirationDate);
    const user = new User(email, token, senha, expirationDate);
    this.usuario.next(user);
  }
}
