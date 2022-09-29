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

  projeto!: Project[];

  formProjeto!: FormGroup;

  formProjetoAntigo!: FormGroup;

  constructor(private service: ProjetosService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void{
    this.getProjetosId();
  }

  getProjetosId(){
    const id = String(this.route.snapshot.paramMap.get('id'));
    this.service.getProjetoId(id).subscribe({
      next: (projeto) => {
        this.projeto = projeto;
      },
      complete: () => {
        this.formProjeto = new FormGroup({
          'id_projeto': new FormControl(this.projeto[0].id),
          'nome_projeto': new FormControl(this.projeto[0].name, Validators.required),
          'id_equipe': new FormControl(this.projeto[0])
          //Fazera modelarem para pegar o id da equipe
        });
        this.formProjetoAntigo = new FormGroup({
          'id_projeto': new FormControl(this.projeto[0].id),
          'nome_projeto': new FormControl(this.projeto[0].name),
          'id_equipeAntiga': new FormControl(this.projeto[0])
        });
        this.getEquipesSemProjetos();
      }
    });
  }

  getEquipesSemProjetos(){
    this.service.getEquipesSemProjetos().subscribe((equipes) => (this.equipes = equipes));
  }

  onSubmit(){
    /*
    if(this.projeto[0]=== null && this.formProjeto.value.id_equipe !== this.projeto[0].id_equipe){
      this.putAssociarProjetoEquipe();
    } else if(this.formProjeto.value.id_equipe !== null && this.formProjeto.value.id_equipe !== this.projeto[0].id_equipe){
      this.putLimparCampoProjetoDaEquipeAntiga();
    } else{
      this.putProjeto();
    }
    */
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
