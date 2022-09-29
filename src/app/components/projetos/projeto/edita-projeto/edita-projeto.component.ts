import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';

import { Team } from 'src/app/shared/interfaces/IBackEnd/Team';

import { Project } from 'src/app/shared/interfaces/IBackEnd/Project';

import { ProjetosService } from 'src/app/services/project.service';

@Component({
  selector: 'app-edita-projeto',
  templateUrl: './edita-projeto.component.html',
  styleUrls: ['./edita-projeto.component.css']
})
export class EditaProjetoComponent implements OnInit {
  equipes: Team[] = [];

  projeto!: Project;

  formProjeto!: FormGroup;

  formProjetoAntigo!: FormGroup;

  constructor(private service: ProjetosService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {}

  getProjetosId() {
    const id = String(this.route.snapshot.paramMap.get('id'));

    this.service.getProjetoId(id).subscribe({
      next: (projeto) => {
        this.projeto = projeto;
      },
      complete: () => {
        this.formProjeto = new FormGroup({
          'id': new FormControl(this.projeto.id),
          'name': new FormControl(this.projeto.name, Validators.required),
          'team': new FormControl(this.projeto.team?.id)
        });
        this.formProjetoAntigo = new FormGroup({
          'id': new FormControl(this.projeto.id),
          'name': new FormControl(this.projeto.name),
          'team': new FormControl(this.projeto.team?.id)
        });
        this.getEquipesSemProjetos();
      }
    });
  }

  getEquipesSemProjetos(){
    this.service.getEquipesSemProjetos().subscribe((equipes) => (this.equipes = equipes));
  }

  onSubmit(){
    if(this.projeto === null && this.formProjeto.value.team !== this.projeto.team?.id){
      this.putAssociarProjetoEquipe();
    } else if(this.formProjeto.value.team !== null && this.formProjeto.value.team !== this.projeto.team?.id){
      this.putLimparCampoProjetoDaEquipeAntiga();
    } else{
      this.putProjeto();
    }
  }

  putProjeto() {
    this.service.putProjeto(this.formProjeto.value).subscribe({
      complete: () => {
        this.router.navigate(['/projetos']);
      }
    });
  }

  putLimparCampoProjetoDaEquipeAntiga(){
    this.service.putEquipeAntiga(this.formProjetoAntigo.value).subscribe({
      complete: () => {
        if(this.formProjeto.value.id_equipe !== ''){
          this.putAssociarProjetoEquipe();
        } else{
          this.router.navigate(['/projetos']);
        }
      }
    })
  }

  putAssociarProjetoEquipe(){
    this.service.putEquipeProjeto(this.formProjeto.value).subscribe({
      complete: () => {
        this.router.navigate(['/projetos']);
      }
    });
  }

}
