import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';

import { User } from './user.model';

import { Subject } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  formLogin!: FormGroup;

  loader: boolean = false;

  usuario = new Subject<User>();

  constructor(private service: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.formLogin = new FormGroup({
      'email' : new FormControl(null, [Validators.email, Validators.required]),
      'senha' : new FormControl(null, Validators.required)
    })
  }

  logar(){
    this.loader = true;
    const user = new User(this.formLogin.value.email, this.formLogin.value.senha);
    this.service.postVerificacao(user.email, user.senha).subscribe({
      error: () => {
        alert('usuário não encontrado');
        location.reload();
      },
      complete: () => {
        this.loader = false;
        this.router.navigate(['/projetos']);
      }
    })
  }

  cadastrar(){
    this.loader = true;
    this.service.postCadastrar(this.formLogin.value).subscribe({
      error: () => {
        alert('usuário já existe');
        location.reload();
      },
      complete: () => {
        alert('Cadastro concluido com sucesso!');
        this.loader = false;
        this.formLogin.reset();
      }
    })
  }

}
