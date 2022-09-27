import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

import { Task } from 'src/app/interfaces/Task';

import { ProjetosService } from 'src/app/services/project.service';

@Component({
  selector: 'app-lista-tarefas',
  templateUrl: './lista-tarefas.component.html',
  styleUrls: ['./lista-tarefas.component.css']
})
export class ListaTarefasComponent implements OnInit {
  @Input() tarefas: Task[] = [];
  @Input() id_projeto!: string;
  @Input() id_equipe?: string;

  @Output() getTarefasProjeto: EventEmitter<Event> = new EventEmitter;

  criarTarefa: boolean = false;

  editarTarefa: boolean = false;

  statusAfazeres: string = 'afazeres';
  statusAndamento: string = 'andamento';
  statusConcluidas: string = 'concluidas';
  status!: string;

  tarefa: any;

  constructor(private service: ProjetosService) { }

  ngOnInit(): void {}

  addTarefa(status: string){
    this.status = status;
    this.criarTarefa = !this.criarTarefa;
  }

  editTarefa(id_tarefa: number, nome_tarefa: string, descricao: string, id_colaborado: number, nome_colaborado: string){
    this.editarTarefa = !this.editarTarefa;
    this.tarefa = {id_equipe: this.id_equipe, id_tarefa: id_tarefa, nome_tarefa: nome_tarefa, descricao: descricao, id_colaborado: id_colaborado, nome_colaborado: nome_colaborado};
  }

  fechaCriacaodeTarefa(){
    this.criarTarefa = !this.criarTarefa;
  }

  fechaEdicaodeTarefa(){
    this.editarTarefa = !this.editarTarefa;
  }

  pegarTarefas(){
    this.getTarefasProjeto.emit();
    this.criarTarefa = !this.criarTarefa;
  }

  pegarTarefasEdicao(){
    this.getTarefasProjeto.emit();
    this.editarTarefa = !this.editarTarefa;
  }

  mudarTarefaDeStatus(status: string, id_tarefa: number){
    if(status === 'afazeres'){
      this.status = 'andamento';
    }
    if(status === 'andamento'){
      this.status = 'concluidas';
    }
    this.tarefa = {id: id_tarefa, novoStatus: this.status};

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
