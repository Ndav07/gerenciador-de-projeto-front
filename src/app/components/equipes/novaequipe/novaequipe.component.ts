import { Component, OnInit } from '@angular/core';

import { EquipesService } from 'src/app/services/team.service';

import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

import { Router } from '@angular/router';

import { Contributor } from 'src/app/shared/interfaces/Contributor';


@Component({
  selector: 'app-novaequipe',
  templateUrl: './novaequipe.component.html',
  styleUrls: ['./novaequipe.component.css']
})
export class NovaequipeComponent implements OnInit {

  formEquipe!: FormGroup;

  formColaborado!: FormGroup;

  idEquipe?: number;

  colaboradoresAssociados: Contributor[] = [];

  constructor(private service: EquipesService, private router: Router) { }

  ngOnInit(): void {
    this.formEquipe = new FormGroup({
      'id': new FormControl(null),
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
    this.formColaborado.value.id_equipe = this.idEquipe;
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
    for(let j in this.colaboradoresAssociados){
      this.formColaborado = new FormGroup({
        'name': new FormControl(this.colaboradoresAssociados[j].name),
        'office': new FormControl(this.colaboradoresAssociados[j].office),
        'team': new FormControl(this.colaboradoresAssociados[j].team)
      });
      (<FormArray>this.formEquipe.get('contributors')).push(this.formColaborado);
    }
    this.formEquipe.value.id_equipe = this.idEquipe;
    this.service.postCriaEquipe(this.formEquipe.value).subscribe({
      complete: () => {
        if(this.formEquipe.value.colaboradores.length > 0){
          this.criarColaboradorAssociado(this.formEquipe.value);
        } else {
          this.router.navigate(['/equipes']);
        }
      }
    });
  }

  criarColaboradorAssociado(formGroup: FormGroup){
    this.service.postcriarColaboradorAssociado(formGroup).subscribe({
      complete: () => {
        this.router.navigate(['/equipes']);
      }
    })
  }

  onFile(e: any){
    const file = e.target.files[0];
    this.formColaborado.patchValue({url_img: file});
  }
}
