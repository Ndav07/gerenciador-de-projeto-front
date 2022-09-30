import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Contributor } from 'src/app/shared/interfaces/IBackEnd/Contributor';

import { ProjetosService } from 'src/app/services/project.service';
import { ITarefaDTO } from 'src/app/shared/interfaces/IFrontEnd/ITarefaDTO';


@Component({
  selector: 'app-modal-editar-tarefa',
  templateUrl: './modal-editar-tarefa.component.html',
  styleUrls: ['./modal-editar-tarefa.component.css']
})
export class ModalEditarTarefaComponent implements OnInit {
  @Input() tarefa!: ITarefaDTO;

  @Output() carregarTarefas: EventEmitter<Event> = new EventEmitter();
  @Output() fechaModal: EventEmitter<Event> = new EventEmitter();

  formTarefa!: FormGroup;

  colaboradores: Contributor[] = [];

  constructor(private service: ProjetosService) { }

  ngOnInit(): void {
    this.getColaboradoresdaEquipe();
    this.formTarefa = new FormGroup({
      'id': new FormControl(this.tarefa.id),
      'name': new FormControl(this.tarefa.name, Validators.required),
      'description': new FormControl(this.tarefa.description, Validators.maxLength(300)),
      'contributor': new FormControl(this.tarefa.contributor)
    });
  }

  getColaboradoresdaEquipe() {
    if(this.tarefa.team){
      this.service.getColaboradoresdaEquipe(this.tarefa.team).subscribe((colaboradores) => (this.colaboradores = colaboradores));
    }
  }

  onSubmit() {
    this.editarTarefa();
  }

  editarTarefa() {
    this.service.putTarefa({ id: this.formTarefa.value.id , name: this.formTarefa.value.name, description: this.formTarefa.value.description, contributor: this.formTarefa.value.contributor }).subscribe({
      complete: () => {
        this.carregarTarefas.emit();
      }
    });
  }

  fechar() {
    this.fechaModal.emit();
  }
}
