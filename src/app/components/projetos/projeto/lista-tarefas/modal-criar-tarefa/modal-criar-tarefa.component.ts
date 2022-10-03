import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Contributor} from 'src/app/shared/interfaces/IBackEnd/Contributor';

import { ProjetosService } from 'src/app/services/project.service';

@Component({
  selector: 'app-modal-criar-tarefa',
  templateUrl: './modal-criar-tarefa.component.html',
  styleUrls: ['./modal-criar-tarefa.component.css']
})
export class ModalCriarTarefaComponent implements OnInit {
  @Input() id_projeto!: string;
  @Input() id_equipe?: string;
  @Input() status!: string;

  @Output() fechaModal: EventEmitter<Event> = new EventEmitter();

  @Output() carregarTarefas: EventEmitter<Event> = new EventEmitter();

  formTarefa!: FormGroup;

  colaboradores: Contributor[] = [];

  constructor(private service: ProjetosService) { }

  ngOnInit(): void {
    this.getColaboradoresdaEquipe();
    this.formTarefa = new FormGroup({
      'project': new FormControl(this.id_projeto),
      'contributor': new FormControl(null),
      'name': new FormControl(null, Validators.required),
      'description': new FormControl(null, Validators.maxLength(300)),
      'status': new FormControl(this.status)
    });
  }

  getColaboradoresdaEquipe() {
    if(this.id_equipe){
      this.service.getColaboradoresdaEquipe(this.id_equipe).subscribe((colaboradores) => (this.colaboradores = colaboradores));
    }
  }

  onSubmit(){
    this.criaTarefa();
  }

  criaTarefa(){
    this.service.postCriarTarefa({ name: this.formTarefa.value.name, project: this.id_projeto, status: this.formTarefa.value.status, description: this.formTarefa.value.description, contributor: this.formTarefa.value.contributor }).subscribe({
      complete: () => {
        this.carregarTarefas.emit();
      }
    });
  }

  fechar(){
    this.fechaModal.emit();
  }
}
