import { EventEmitter, Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

import { FormGroup } from '@angular/forms';

import { Token } from '../shared/interfaces/IBackEnd/Token';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({providedIn: 'root'})
export class AuthService {
  //private baseApiUrl = environment.baseApiUrl;
  private baseApiUrl = "http://localhost:3333";

  //Post
  private cadastrar = `${this.baseApiUrl}/users`;

  private verificacao = `${this.baseApiUrl}/sessions`;

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {}

  authTrue: EventEmitter<boolean> = new EventEmitter();

  postCadastrar(formGroup: FormGroup): Observable<FormGroup> {
    return this.http.post<FormGroup>(`${this.cadastrar}`, formGroup);
  }

  postVerificacao(email: string, password: string): Observable<Token> {
      return this.http.post<Token>(`${this.verificacao}`, {
        email: email,
        password: password
      });
  }

  isAuth(): boolean {
    const token = localStorage.getItem('token');
    if(!localStorage.getItem('token') || this.jwtHelper.isTokenExpired(token!)) {
      return false;
    }
    this.authTrue.emit(true);
    return true;
  }

}
