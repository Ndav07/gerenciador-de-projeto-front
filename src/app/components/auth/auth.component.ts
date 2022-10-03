import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';

import { User } from 'src/app/shared/interfaces/IBackEnd/User';

import { Subject } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  formLogin!: FormGroup;

  loader: boolean = false;

  @Output() authTrue: EventEmitter<boolean> = new EventEmitter();

  constructor(private service: AuthService, private router: Router) { }

  ngOnInit(): void {
    if(this.service.isAuth()) {
      this.router.navigate(['/projetos']);
    }
    this.formLogin = new FormGroup({
      'email' : new FormControl(null, [Validators.email, Validators.required]),
      'password' : new FormControl(null, Validators.required)
    })
  }

  logar(){
    this.loader = true;
    this.service.postVerificacao(this.formLogin.value.email, this.formLogin.value.password).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
      },
      error: () => {
        alert("Email or password incorrect!");
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
