import { Component, OnInit, EventEmitter, Input, Output  } from '@angular/core';

import { animate, state, style, transition, trigger } from '@angular/animations';

import { Colaborador } from 'src/app/interfaces/Contributor';

import { Equipes } from 'src/app/interfaces/Equipes';

import { EquipesService } from 'src/app/services/equipes.service';

@Component({
  selector: 'app-equipe',
  templateUrl: './equipe.component.html',
  styleUrls: ['./equipe.component.css'],
  animations: [
    trigger('transicaoEquipes', [
      state('inicio', style({
        'opacity': '0'
      })),
      state('final', style({
        'opacity': '1'
      })),
      transition('inicio => final', animate(300))
    ])
  ]
})
export class EquipeComponent implements OnInit {
  @Output() enviaAllEquipes: EventEmitter<Equipes[]> = new EventEmitter();
  @Input() equipesFiltradas!: Equipes[];

  equipes: Equipes[] = [];
  colaboradores: Colaborador[] = [];

  state = 'inicio';

  load: boolean = true;

  modalExcluir: boolean = false;

  idExlusaoEquipe: number = 0;

  mensagemExclusaoEquipe: string = "Você realmente quer apagar a Equipe?";

  constructor(private equipesService: EquipesService) { }

  ngOnInit(): void {
    this.getEquipes();
  }

  getEquipes(): void{
    this.equipesService.getAll().subscribe({
      next: (equipes) => (this.equipes = equipes),
      complete: () => {
        this.enviaAllEquipes.emit(this.equipes);
        this.getColaboradores();
      }
    })
  }

  getColaboradores(): void{
    this.equipesService.getcolaboradoresdaEquipe().subscribe({
      next: (colaboradores) => {
        this.colaboradores = colaboradores.reduce((colab: any, colabAtual: any) => {
          if(!colab[colabAtual.id_equipe]){
            colab[colabAtual.id_equipe] = [];
          }
          colab[colabAtual.id_equipe].push(colabAtual);
          return colab;
          }, {})
      },
      complete: () => {
        this.load = false;
        this.state = 'final';
      }
    })
  }

  getEquipesFiltradas(){
    this.equipes = this.equipesFiltradas;
  }

  deletaEquipe(id_equipe: number){
    this.equipesService.deleteEquipe(id_equipe).subscribe({
      complete: () => {
        this.getEquipes();
      }
    });
  }

  modalExclusao(id_equipe?: number){
    if(id_equipe){
      this.idExlusaoEquipe = id_equipe;
    }
    this.modalExcluir = !this.modalExcluir;
  }
}
