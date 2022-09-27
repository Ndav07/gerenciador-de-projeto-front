import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Router } from '@angular/router';

import { Equipes } from 'src/app/interfaces/Equipes';

import { ProjetosService } from 'src/app/services/projetos.service';

@Component({
  selector: 'app-novoprojeto',
  templateUrl: './novoprojeto.component.html',
  styleUrls: ['./novoprojeto.component.css']
})
export class NovoprojetoComponent implements OnInit {
  equipes: Equipes[] = [];

  idProjeto?: number;

  formProjeto!: FormGroup;

  constructor(private service: ProjetosService, private router: Router) { }

  ngOnInit(): void{
    this.getEquipesSemProjetos();
    this.getIdProjetos();
    this.formProjeto = new FormGroup({
      'id_projeto': new FormControl(null),
      'nome_projeto': new FormControl(null, Validators.required),
      'id_equipe': new FormControl(null)
    });
  }

  getEquipesSemProjetos(){
    this.service.getEquipesSemProjetos().subscribe((equipes) => (this.equipes = equipes));
  }

  getIdProjetos(){
    this.service.getMaxIdProjeto().subscribe({
      next: (idProjeto) => {
        if(idProjeto > 0){
          this.idProjeto = Number(idProjeto) + 1;
        } else {
          this.idProjeto = 1;
        }
      }
    });
  }

  onSubmit(){
    this.formProjeto.value.id_projeto = this.idProjeto;

    if(this.formProjeto.value.id_equipe !== null){
      this.postAssociarProjetoEquipe();
    } else{
      this.postProjeto();
    }
  }

  postProjeto() {
    this.service.postCriarProjeto(this.formProjeto.value).subscribe({
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
