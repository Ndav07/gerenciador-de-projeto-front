import { animate, state, style, transition, trigger } from '@angular/animations';

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Project } from 'src/app/shared/interfaces/IBackEnd/Project';

import { ProjetosService } from '../../../services/project.service';

@Component({
  selector: 'app-projeto',
  templateUrl: './projeto.component.html',
  styleUrls: ['./projeto.component.css'],
  animations: [
    trigger('transicaoProjetos', [
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
export class ProjetoComponent implements OnInit {
  @Output() informacoesProjetos: EventEmitter<Project[]> = new EventEmitter();
  @Input() projFilter: Project[] = [];

  state = 'inicio';

  projetos: Project[] = [];

  load: boolean = true;

  error: string = '';

  modalExcluir: boolean = false;

  idExlusaoProjeto?: string;

  mensagemExclusaoProjeto: string = "Você realmente quer apagar o Projeto?";

  constructor(private projetosService: ProjetosService) { }

  ngOnInit(): void {
    this.getProjetos();
  }

  getProjetosFiltrados(){
    this.projetos = this.projFilter;
  }

  getProjetos(){
    this.projetosService.getProjetos().subscribe({
      next: (projetos) => {
        this.projetos = projetos;
      },
      error: (e) => {
        this.error = e.message;
      },
      complete: () => {
        this.load = false;
        this.state = 'final';
        this.informacoesProjetos.emit(this.projetos);
      }
    });
  }

  deletaProjeto(id: string){
    this.projetosService.deleteProjeto(id).subscribe({
      complete: () => {
        this.getProjetos();
      }
    });
  }

  modalExclusao(id?: string){
    if(id){
      this.idExlusaoProjeto = id;
    }
    this.modalExcluir = !this.modalExcluir;
  }
}
