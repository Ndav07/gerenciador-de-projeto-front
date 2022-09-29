import { Injectable } from '@angular/core';

import { Observable, tap } from 'rxjs';

import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

import { FormGroup } from '@angular/forms';

import { Token } from '../shared/interfaces/IBackEnd/Token';

@Injectable({providedIn: 'root'})
export class AuthService {

  //private baseApiUrl = environment.baseApiUrl;
  private baseApiUrl = "http://localhost:3333/";

  //Post
  private cadastrar = `${this.baseApiUrl}users/`;

  private verificacao = `${this.baseApiUrl}sessions/`;

  constructor(private http: HttpClient) {}

  postCadastrar(formGroup: FormGroup): Observable<FormGroup> {
    return this.http.post<FormGroup>(`${this.cadastrar}`, formGroup);
  }

  postVerificacao(formGroup: FormGroup): Observable<Token> {
      return this.http.post<Token>(`${this.verificacao}`, formGroup).pipe(
        tap(res => {
          const token = res.token;
          const userEmail = res.user.email;
        })
      );
  }

}
