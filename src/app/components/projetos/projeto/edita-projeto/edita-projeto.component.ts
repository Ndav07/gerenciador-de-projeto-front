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

  //formProjetoAntigo!: FormGroup;

  constructor(private service: ProjetosService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getProjetosId();
  }

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
        /*
        Possibilidade de implementar melhorias
        this.formProjetoAntigo = new FormGroup({
          'id': new FormControl(this.projeto.id),
          'name': new FormControl(this.projeto.name),
          'team': new FormControl(this.projeto.team?.id)
        });
        */
       this.getEquipesSemProjetos();
      }
    });
  }

  getEquipesSemProjetos() {
    this.service.getEquipesSemProjetos().subscribe((equipes) => (this.equipes = equipes));
  }

  onSubmit() {
    this.putProjeto();
  }

  putProjeto() {
    this.service.putProjeto({ name: this.formProjeto.value.name, id: this.formProjeto.value.id, team: this.formProjeto.value.team }).subscribe({
      complete: () => {
        this.router.navigate(['/projetos']);
      }
    });
  }

}
