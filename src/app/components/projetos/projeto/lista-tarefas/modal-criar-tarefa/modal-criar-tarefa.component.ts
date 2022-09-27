import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Colaborador } from 'src/app/interfaces/Contributor';

import { ProjetosService } from 'src/app/services/projetos.service';

@Component({
  selector: 'app-modal-criar-tarefa',
  templateUrl: './modal-criar-tarefa.component.html',
  styleUrls: ['./modal-criar-tarefa.component.css']
})
export class ModalCriarTarefaComponent implements OnInit {
  @Input() id_projeto!: number;
  @Input() id_equipe?: number;
  @Input() status!: string;

  @Output() fechaModal: EventEmitter<Event> = new EventEmitter();

  @Output() carregarTarefas: EventEmitter<Event> = new EventEmitter();

  formTarefa!: FormGroup;

  colaboradores: Colaborador[] = [];

  idTarefa?: number;

  constructor(private service: ProjetosService) { }

  ngOnInit(): void {
    this.getIdTarefas();
    this.getColaboradoresdaEquipe();
    this.formTarefa = new FormGroup({
      'id_tarefa': new FormControl(null),
      'id_projeto': new FormControl(this.id_projeto),
      'id_colaborado': new FormControl(null),
      'nome_tarefa': new FormControl(null, Validators.required),
      'descricao': new FormControl(null, Validators.maxLength(300)),
      'status': new FormControl(this.status)
    });
  }

  getIdTarefas(){
    this.service.getMaxIdTarefa().subscribe({
      next: (tarefas) => {
        if(tarefas > 0){
          this.idTarefa = Number(tarefas) + 1;
        } else {
          this.idTarefa = 1;
        }
      }
    });
  }

  getColaboradoresdaEquipe(){
    if(this.id_equipe){
      this.service.getColaboradoresdaEquipe(this.id_equipe).subscribe((colaboradores) => (this.colaboradores = colaboradores));
    }
  }

  onSubmit(){
    this.formTarefa.value.id_tarefa = this.idTarefa;
    this.criaTarefa();
  }

  criaTarefa(){
    this.service.postCriarTarefa(this.formTarefa.value).subscribe({
      complete: () => {
        if(this.formTarefa.value.id_colaborado !== null){
          this.associaColaboradorEmTarefa();
        } else {
          this.carregarTarefas.emit();
        }
      }
    });
  }

  associaColaboradorEmTarefa(){
    this.service.postAssociaColaboradoEmTarefa(this.formTarefa.value).subscribe({
      complete: () => {
        this.carregarTarefas.emit();
      }
    });
  }

  fechar(){
    this.fechaModal.emit();
  }
}