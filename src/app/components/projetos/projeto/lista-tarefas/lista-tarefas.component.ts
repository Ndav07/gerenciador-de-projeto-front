import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

import { Task } from 'src/app/shared/interfaces/IBackEnd/Task';

import { ProjetosService } from 'src/app/services/project.service';
import { IEditTaskDTO } from 'src/app/shared/interfaces/IFrontEnd/IEditeTarefaDTO';

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

  tarefa!: IEditTaskDTO;

  constructor(private service: ProjetosService) { }

  ngOnInit(): void {}

  addTarefa(status: string): void {
    this.status = status;
    this.criarTarefa = !this.criarTarefa;
  }

  editTarefa(id: string, name: string, description?: string, contributor?: string): void {
    this.editarTarefa = !this.editarTarefa;
    this.tarefa = {id: id, name: name, description: description, contributor: contributor};
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
    this.tarefa = {id: id, novoStatus: this.status};

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
