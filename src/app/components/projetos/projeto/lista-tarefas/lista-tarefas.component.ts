import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

import { Task } from 'src/app/shared/interfaces/IBackEnd/Task';

import { ProjetosService } from 'src/app/services/project.service';
import { ITarefaDTO } from 'src/app/shared/interfaces/IFrontEnd/ITarefaDTO';

@Component({
  selector: 'app-lista-tarefas',
  templateUrl: './lista-tarefas.component.html',
  styleUrls: ['./lista-tarefas.component.css']
})
export class ListaTarefasComponent implements OnInit {
  @Input() tarefas?: Task[] = [];
  @Input() id_projeto!: string;
  @Input() id_equipe?: string;

  @Output() getTarefasProjeto: EventEmitter<Event> = new EventEmitter;

  criarTarefa: boolean = false;

  editarTarefa: boolean = false;

  statusAfazeres: string = 'afazeres';
  statusAndamento: string = 'andamento';
  statusConcluidas: string = 'concluidas';
  status!: string;

  tarefa!: ITarefaDTO;

  constructor(private service: ProjetosService) { }

  ngOnInit(): void {}

  addTarefa(status: string): void {
    this.status = status;
    this.criarTarefa = !this.criarTarefa;
  }

  editTarefa(tar: Task): void {
    this.editarTarefa = !this.editarTarefa;
    this.tarefa = { id: tar.id!, name: tar.name, description: tar.description, team: this.id_equipe, contributor: tar.contribuidor?.id };
  }

  fechaCriacaodeTarefa(): void {
    this.criarTarefa = !this.criarTarefa;
  }

  fechaEdicaodeTarefa(): void {
    this.editarTarefa = !this.editarTarefa;
  }

  pegarTarefas(): void {
    this.getTarefasProjeto.emit();
    this.criarTarefa = !this.criarTarefa;
  }

  pegarTarefasEdicao(): void {
    this.getTarefasProjeto.emit();
    this.editarTarefa = !this.editarTarefa;
  }

  mudarTarefaDeStatus(status: string, id: string): void {
    if(status === 'afazeres'){
      this.status = 'andamento';
    }
    if(status === 'andamento'){
      this.status = 'concluidas';
    }
    this.tarefa = {id: id, status: this.status};

    this.service.putMudarStatusDeTarefa(this.tarefa).subscribe({
      complete: () => {
        this.getTarefasProjeto.emit();
      }
    });
  }

  deletarTarefa(id: string){
    this.service.deleteTarefa(id).subscribe({
      complete: () => {
        this.getTarefasProjeto.emit();
      }
    })
  }
}
