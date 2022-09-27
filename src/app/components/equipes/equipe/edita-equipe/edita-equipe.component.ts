import { Component, OnInit } from '@angular/core';

import { EquipesService } from 'src/app/services/equipes.service';

import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

import { Router, ActivatedRoute } from '@angular/router';

import { Equipes } from 'src/app/interfaces/Equipes';
import { Colaborador } from 'src/app/interfaces/Contributor';

@Component({
  selector: 'app-edita-equipe',
  templateUrl: './edita-equipe.component.html',
  styleUrls: ['./edita-equipe.component.css']
})
export class EditaEquipeComponent implements OnInit {
  formEquipe!: FormGroup;

  equipe!: Equipes[];

  formColaborado!: FormGroup;

  idEquipe!: number;

  colaboradoresAssociados: Colaborador[] = [];

  colaboradoresNovos: Colaborador[] = [];

  constructor(private service: EquipesService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getEquipe();
    this.formColaborado = new FormGroup({
      'nome_colaborado': new FormControl(null, Validators.required),
      'atribuicao': new FormControl(null),
      'id_equipe': new FormControl(null)
    });
    this.formEquipe = new FormGroup({
      'id_equipe': new FormControl(null),
      'nome_equipe': new FormControl(null, Validators.required),
      'colaboradores': new FormArray([])
    });
  }

  getEquipe(){
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.idEquipe = id;
    this.service.getEquipeId(this.idEquipe).subscribe({
      next: (equipe) => {
        this.equipe = equipe;
      },
      complete: () => {
        this.formEquipe = new FormGroup({
          'id_equipe': new FormControl(this.equipe[0].id_equipe),
          'nome_equipe': new FormControl(this.equipe[0].nome_equipe, Validators.required),
          'colaboradores': new FormArray([])
        });
        this.getColaboradoresDaEquipe();
      }
    });
  }

  getColaboradoresDaEquipe(){
    this.service.getColaboradoresdaEquipe(this.idEquipe).subscribe({
      next: (colaboradores) => {
        this.colaboradoresAssociados = colaboradores;
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

  excluirColaboradoDaEquipe(colab: string | number){
    if(typeof colab === 'number'){
      this.colaboradoresAssociados = this.colaboradoresAssociados.filter((colaboradores: any) => {
        return colaboradores.id_colaborado !== colab;
      })
      this.excluirColaboradoNoBanco(colab);
    }
    else{
      this.colaboradoresAssociados = this.colaboradoresAssociados.filter((colaboradores: any) => {
        return colaboradores.nome_colaborado !== colab;
      })
    }

    if(typeof colab === 'string'){
      this.colaboradoresNovos = this.colaboradoresNovos.filter((colaboradores: any) => {
        return colaboradores.nome_colaborado !== colab;
      });
    }
  }

  excluirColaboradoNoBanco(id: number){
    this.service.deleteColaborado(id).subscribe();
  }

  onSubmit(){
    for(let j in this.colaboradoresNovos){
      this.formColaborado = new FormGroup({
        'nome_colaborado': new FormControl(this.colaboradoresNovos[j].nome_colaborado),
        'atribuicao': new FormControl(this.colaboradoresNovos[j].atribuicao),
        'id_equipe': new FormControl(this.idEquipe)
      });
      (<FormArray>this.formEquipe.get('colaboradores')).push(this.formColaborado);
    }
    this.service.putEquipe(this.formEquipe.value).subscribe({
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

}
