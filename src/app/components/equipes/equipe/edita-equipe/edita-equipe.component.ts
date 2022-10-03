import { Component, OnInit } from '@angular/core';

import { EquipesService } from 'src/app/services/team.service';

import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

import { Router, ActivatedRoute } from '@angular/router';

import { Team } from 'src/app/shared/interfaces/IBackEnd/Team';

import { IContributorDTO } from 'src/app/shared/interfaces/IFrontEnd/IContribuidorDTO';

@Component({
  selector: 'app-edita-equipe',
  templateUrl: './edita-equipe.component.html',
  styleUrls: ['./edita-equipe.component.css']
})
export class EditaEquipeComponent implements OnInit {
  formEquipe!: FormGroup;

  equipe!: Team;

  formColaborado!: FormGroup;

  colaboradoresAssociados: IContributorDTO[] = [];

  colaboradoresNovos: IContributorDTO[] = [];

  constructor(private service: EquipesService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getEquipe();
    this.formColaborado = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'office': new FormControl(null),
      'team': new FormControl()
    });
    this.formEquipe = new FormGroup({
      'id': new FormControl(null),
      'name': new FormControl(null, Validators.required),
      'contributors': new FormArray([])
    });
  }

  getEquipe(){
    const id = String(this.route.snapshot.paramMap.get('id'));
    this.service.getEquipeId(id).subscribe({
      next: (equipe) => {
        this.equipe = equipe;
      },
      complete: () => {
        if(this.equipe.contributors!.length > 0) {
          for(let j in this.equipe.contributors!){
            this.colaboradoresAssociados.push({ id: this.equipe.contributors[j].id, name: this.equipe.contributors[j].name, office: this.equipe.contributors[j].office, team: this.equipe.id });
          }
        }
        this.formEquipe = new FormGroup({
          'id': new FormControl(this.equipe.id),
          'name': new FormControl(this.equipe.name, Validators.required),
          'contributors': new FormArray([])
        });
      }
    });
  }

  adicionaColaborado(){
    this.colaboradoresAssociados.push(this.formColaborado.value);
    this.colaboradoresNovos.push(this.formColaborado.value);
    this.limparFormularioColaborador();
  }

  limparFormularioColaborador(){
    this.formColaborado.reset();
  }

  excluirColaboradoDaEquipe(colab: IContributorDTO) {
    if(colab.id) {
      this.colaboradoresAssociados = this.colaboradoresAssociados.filter((colaboradores: IContributorDTO) => {
        return colaboradores.name !== colab.name;
      })
      this.excluirColaboradoNoBanco(colab.id);
    } else {
      this.colaboradoresAssociados = this.colaboradoresAssociados.filter((colaboradores: IContributorDTO) => {
        return colaboradores.name !== colab.name;
      })
      this.colaboradoresNovos = this.colaboradoresNovos.filter((colaboradores: IContributorDTO) => {
        return colaboradores.name !== colab.name;
      })
    }
  }

  excluirColaboradoNoBanco(id: string){
    this.service.deleteColaborado(id).subscribe();
  }

  onSubmit(){
    this.colaboradoresNovos = this.colaboradoresNovos.map(contributor => {
      return {
        name: contributor.name,
        office: contributor.office,
        team: this.equipe.id
      }
    })
    this.service.putEquipe({ id: this.equipe.id!, name: this.formEquipe.value.name }).subscribe({
      complete: () => {
        if(this.colaboradoresNovos.length > 0) {
          this.criarColaboradorAssociado(this.colaboradoresNovos);
        } else {
          this.router.navigate(['/equipes']);
        }
      }
    });

  }

  criarColaboradorAssociado(contributors: IContributorDTO[]) {
    this.service.postcriarColaboradorAssociado(contributors).subscribe({
      complete: () => {
        this.router.navigate(['/equipes']);
      }
    })
  }

}
