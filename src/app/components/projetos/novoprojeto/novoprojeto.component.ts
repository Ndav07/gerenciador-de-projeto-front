import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Router } from '@angular/router';

import { Team } from 'src/app/interfaces/Team';

import { ProjetosService } from 'src/app/services/project.service';

@Component({
  selector: 'app-novoprojeto',
  templateUrl: './novoprojeto.component.html',
  styleUrls: ['./novoprojeto.component.css']
})
export class NovoprojetoComponent implements OnInit {
  equipes: Team[] = [];

  idProjeto?: number;

  formProjeto!: FormGroup;

  constructor(private service: ProjetosService, private router: Router) { }

  ngOnInit(): void{
    this.getEquipesSemProjetos();
    this.formProjeto = new FormGroup({
      'idProjeto': new FormControl(null),
      'name': new FormControl(null, Validators.required),
      'idEquipe': new FormControl(null)
    });
  }

  getEquipesSemProjetos(){
    this.service.getEquipesSemProjetos().subscribe((equipes) => (this.equipes = equipes));
  }

  onSubmit(){
    this.formProjeto.value.idProjeto = this.idProjeto;

    if(this.formProjeto.value.idEquipe !== null){
      this.postAssociarProjetoEquipe();
    } else{
      this.postProjeto(this.formProjeto.value.name);
    }
  }

  postProjeto(name: string) {
    this.service.postCriarProjeto(name).subscribe({
      complete: () => {
        this.router.navigate(['/projetos']);
      }
    });
  }

  postAssociarProjetoEquipe(){
    this.service.postEquipeProjeto(this.formProjeto.value).subscribe({
      complete: () => {
        this.router.navigate(['/projetos']);
      }
    });
  }

}
