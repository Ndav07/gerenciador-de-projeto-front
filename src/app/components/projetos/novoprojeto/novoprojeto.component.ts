import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Router } from '@angular/router';

import { Team } from 'src/app/shared/interfaces/IBackEnd/Team';

import { ProjetosService } from 'src/app/services/project.service';
import { delay } from 'rxjs';

@Component({
  selector: 'app-novoprojeto',
  templateUrl: './novoprojeto.component.html',
  styleUrls: ['./novoprojeto.component.css']
})
export class NovoprojetoComponent implements OnInit {
  equipes: Team[] = [];

  formProjeto!: FormGroup;

  constructor(private service: ProjetosService, private router: Router) { }

  ngOnInit(): void{
    this.getEquipesSemProjetos();
    this.formProjeto = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'team': new FormControl(null)
    });
  }

  getEquipesSemProjetos(){
    this.service.getEquipesSemProjetos().subscribe((equipes) => (this.equipes = equipes));
  }

  onSubmit(){
  this.postProjeto();
  }

  postProjeto() {
    this.service.postCriarProjeto({ name: this.formProjeto.value.name, team: this.formProjeto.value.team }).subscribe({
      complete: () => {
        this.router.navigate(['/projetos']);
      }
    });
  }

}
