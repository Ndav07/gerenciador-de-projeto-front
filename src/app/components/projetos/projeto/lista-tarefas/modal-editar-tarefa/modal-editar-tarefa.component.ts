import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Contributor } from 'src/app/interfaces/Contributor';

import { ProjetosService } from 'src/app/services/project.service';

import { Task } from 'src/app/interfaces/Task';

@Component({
  selector: 'app-modal-editar-tarefa',
  templateUrl: './modal-editar-tarefa.component.html',
  styleUrls: ['./modal-editar-tarefa.component.css']
})
export class ModalEditarTarefaComponent implements OnInit {
  @Input() tarefa!: Task;

  @Output() carregarTarefas: EventEmitter<Event> = new EventEmitter();
  @Output() fechaModal: EventEmitter<Event> = new EventEmitter();

  formTarefa!: FormGroup;

  colaboradores: Contributor[] = [];

  constructor(private service: ProjetosService) { }

  ngOnInit(): void {
    this.getColaboradoresdaEquipe();
    this.formTarefa = new FormGroup({
      'id_tarefa': new FormControl(this.tarefa.id),
      'id_colaborado': new FormControl(this.tarefa.contribuidor),
      'nome_tarefa': new FormControl(this.tarefa.name, Validators.required),
      'descricao': new FormControl(this.tarefa.description, Validators.maxLength(300))
    });
  }

  getColaboradoresdaEquipe(){
    /*
    if(this.tarefa.id_equipe){
      this.service.getColaboradoresdaEquipe(this.tarefa.id_equipe).subscribe((colaboradores) => (this.colaboradores = colaboradores));
    }
    */
  }

  onSubmit(){
    this.editarTarefa();
  }

  editarTarefa(){
    this.service.putTarefa(this.formTarefa.value).subscribe({
      complete: () => {
        if(this.tarefa.contribuidor === null && this.formTarefa.value.id_colaborado !== this.tarefa.contribuidor){
          this.criaColaboradorEmTarefa();
        }
        else if(this.formTarefa.value.id_colaborado !== this.tarefa.contribuidor){
          this.associaColaboradorEmTarefa();
        } else {
          this.carregarTarefas.emit();
        }
      }
    });
  }

  criaColaboradorEmTarefa(){
    this.service.postAssociaColaboradoEmTarefa(this.formTarefa.value).subscribe({
      complete: () => {
        this.carregarTarefas.emit();
      }
    });
  }

  associaColaboradorEmTarefa(){
    this.service.putEditaColaboradoEmTarefa(this.formTarefa.value).subscribe({
      complete: () => {
        this.carregarTarefas.emit();
      }
    });
  }

  fechar(){
    this.fechaModal.emit();
  }
}
