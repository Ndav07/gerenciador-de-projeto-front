import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';

import { User } from 'src/app/interfaces/User';

import { Subject } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  formLogin!: FormGroup;

  loader: boolean = false;

  constructor(private service: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.formLogin = new FormGroup({
      'email' : new FormControl(null, [Validators.email, Validators.required]),
      'password' : new FormControl(null, Validators.required)
    })
  }

  logar(){
    this.loader = true;
    this.service.postVerificacao(this.formLogin.value).subscribe({
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
      error: (err) => {
        alert(err);
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
