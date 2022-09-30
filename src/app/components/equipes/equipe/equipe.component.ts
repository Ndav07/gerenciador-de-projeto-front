import { Component, OnInit, EventEmitter, Input, Output  } from '@angular/core';

import { animate, state, style, transition, trigger } from '@angular/animations';

import { Contributor } from 'src/app/shared/interfaces/IBackEnd/Contributor';

import { Team } from 'src/app/shared/interfaces/IBackEnd/Team';

import { EquipesService } from 'src/app/services/team.service';

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
  @Output() enviaAllEquipes: EventEmitter<Team[]> = new EventEmitter();
  @Input() equipesFiltradas!: Team[];

  equipes: Team[] = [];

  state = 'inicio';

  load: boolean = true;

  error: string = '';

  modalExcluir: boolean = false;

  idExlusaoEquipe?: string;

  mensagemExclusaoEquipe: string = "Você realmente quer apagar a Equipe?";

  constructor(private equipesService: EquipesService) { }

  ngOnInit() {
   this.getEquipes();
  }

  getEquipes() {
    this.equipesService.getAll().subscribe({
      next: (equipes) => {
        this.equipes = equipes
      },
      error: (e) => {
        this.error = e.message;
      },
      complete: () => {
        this.load = false;
        this.state = 'final';
        this.enviaAllEquipes.emit(this.equipes);
      }
    })
  }

  getEquipesFiltradas(){
    this.equipes = this.equipesFiltradas;
  }

  deletaEquipe(id: string){
    this.equipesService.deleteEquipe(id).subscribe({
      complete: () => {
        this.getEquipes();
      }
    });
  }

  modalExclusao(id?: string){
    if(id){
      this.idExlusaoEquipe = id;
    }
    this.modalExcluir = !this.modalExcluir;
  }

}
