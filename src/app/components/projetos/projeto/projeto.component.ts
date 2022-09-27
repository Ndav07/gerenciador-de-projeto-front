import { animate, state, style, transition, trigger } from '@angular/animations';

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Projetos } from 'src/app/interfaces/Projetos';
import { Tarefas } from 'src/app/interfaces/Tarefas';

import { ProjetosService } from '../../../services/projetos.service';

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
  @Output() informacoesProjetos: EventEmitter<Projetos[]> = new EventEmitter();
  @Input() projFilter: Projetos[] = [];

  state = 'inicio';

  projetos: Projetos[] = [];

  tarefasOrganizadasPorProjeto: any = [];

  load: boolean = true;

  error: string = '';

  modalExcluir: boolean = false;

  idExlusaoProjeto: number = 0;

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
        this.informacoesProjetos.emit(this.projetos);
        this.getTarefas();
      }
    });
  }

  getTarefas(){
    this.projetosService.getTarefas().subscribe({
      next: (tarefas) => {
        this.tarefasOrganizadasPorProjeto = tarefas.reduce((tar: any, tarAtual: Tarefas) => {
          if(!tar[tarAtual.id_projeto]){
            tar[tarAtual.id_projeto] = [];
          }
          tar[tarAtual.id_projeto].push(tarAtual);
          return tar;
          }, {})
      },
      error: (e) => {
        this.error = e.message;
      },
      complete: () => {
        this.load = false;
        this.state = 'final';
      }
    });
  }

  deletaProjeto(id_projeto: number){
    this.projetosService.deleteProjeto(id_projeto).subscribe({
      complete: () => {
        this.getProjetos();
      }
    });
  }

  modalExclusao(id_projeto?: number){
    if(id_projeto){
      this.idExlusaoProjeto = id_projeto;
    }
    this.modalExcluir = !this.modalExcluir;
  }
}
