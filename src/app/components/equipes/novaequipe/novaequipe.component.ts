import { Component, OnInit } from '@angular/core';

import { EquipesService } from 'src/app/services/equipes.service';

import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

import { Router } from '@angular/router';

import { Colaborador } from 'src/app/interfaces/Contributor';


@Component({
  selector: 'app-novaequipe',
  templateUrl: './novaequipe.component.html',
  styleUrls: ['./novaequipe.component.css']
})
export class NovaequipeComponent implements OnInit {

  formEquipe!: FormGroup;

  formColaborado!: FormGroup;

  idEquipe?: number;

  colaboradoresAssociados: Colaborador[] = [];

  constructor(private service: EquipesService, private router: Router) { }

  ngOnInit(): void {
    this.getIdEquipe();
    this.formEquipe = new FormGroup({
      'id_equipe': new FormControl(null),
      'nome_equipe': new FormControl(null, Validators.required),
      'colaboradores': new FormArray([])
    });

    this.formColaborado = new FormGroup({
      'nome_colaborado': new FormControl(null, Validators.required),
      'atribuicao': new FormControl(null),
      'id_equipe': new FormControl(null),
      'url_img': new FormControl(null)
    });
  }

  getIdEquipe(){
    this.service.getMaxIdEquipe().subscribe({
      next: (equipes) => {
        if(equipes > 0){
          this.idEquipe = Number(equipes) + 1;
        } else {
          this.idEquipe = 1;
        }
      }
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
        'nome_colaborado': new FormControl(this.colaboradoresAssociados[j].nome_colaborado),
        'atribuicao': new FormControl(this.colaboradoresAssociados[j].atribuicao),
        'id_equipe': new FormControl(this.colaboradoresAssociados[j].id_equipe),
        'url_img': new FormControl(this.colaboradoresAssociados[j].url_img)
      });
      (<FormArray>this.formEquipe.get('colaboradores')).push(this.formColaborado);
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
