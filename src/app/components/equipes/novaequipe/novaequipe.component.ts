import { Component, OnInit } from '@angular/core';

import { EquipesService } from 'src/app/services/team.service';

import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

import { Router } from '@angular/router';

import { Contributor } from 'src/app/shared/interfaces/IBackEnd/Contributor';
import { IContributorDTO } from 'src/app/shared/interfaces/IFrontEnd/IContribuidorDTO';


@Component({
  selector: 'app-novaequipe',
  templateUrl: './novaequipe.component.html',
  styleUrls: ['./novaequipe.component.css']
})
export class NovaequipeComponent implements OnInit {

  formEquipe!: FormGroup;

  formColaborado!: FormGroup;

  colaboradoresAssociados: Contributor[] = [];

  constructor(private service: EquipesService, private router: Router) { }

  ngOnInit(): void {
    this.formEquipe = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'contributors': new FormArray([])
    });

    this.formColaborado = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'office': new FormControl(null),
      'team': new FormControl(null)
    });
  }

  adicionaColaborado(){
    this.colaboradoresAssociados.push(this.formColaborado.value);
    this.limparFormularioColaborador();
  }

  limparFormularioColaborador(){
    this.formColaborado.reset();
  }

  excluirColaboradoDaEquipe(colab: string){
    this.colaboradoresAssociados = this.colaboradoresAssociados.filter((colaboradores: any) => {
      return colaboradores.nome_colaborado !== colab;
    });
  }

  onSubmit(){
    this.service.postCriaEquipe({name: this.formEquipe.value.name}).subscribe({
      next: (equipe) => {
        console.log(equipe)
        for(let j in this.colaboradoresAssociados){
          this.formColaborado = new FormGroup({
            'name': new FormControl(this.colaboradoresAssociados[j].name),
            'office': new FormControl(this.colaboradoresAssociados[j].office),
            'team': new FormControl(equipe.id)
          });
          (<FormArray>this.formEquipe.get('contributors')).push(this.formColaborado);
        }
      },
      complete: () => {
        if(this.formEquipe.value.contributors.length > 0){
          this.criarColaboradorAssociado(this.formEquipe.value.contributors);
        } else {
          this.router.navigate(['/equipes']);
        }
      }
    });
  }

  criarColaboradorAssociado(contributors: IContributorDTO[]){
    this.service.postcriarColaboradorAssociado(contributors).subscribe({
      complete: () => {
        this.router.navigate(['/equipes']);
      }
    })
  }
}
