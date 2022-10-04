import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EquipesService } from 'src/app/services/team.service';
import { Contributor } from 'src/app/shared/interfaces/IBackEnd/Contributor';

@Component({
  selector: 'app-modal-edita-colaborado',
  templateUrl: './modal-edita-colaborado.component.html',
  styleUrls: ['./modal-edita-colaborado.component.css']
})
export class ModalEditaColaboradoComponent implements OnInit {
  @Input() colaborado?: Contributor;

  @Output() fechaModal: EventEmitter<Event> = new EventEmitter();

  formColaborador!: FormGroup;

  constructor(private equipesService: EquipesService) { }

  ngOnInit(): void {
    this.formColaborador = new FormGroup({
      'name': new FormControl(this.colaborado!.name, Validators.required),
      'office': new FormControl(this.colaborado!.office, Validators.required),
      'avatar': new FormControl()
    })
  }

  fecharModal(){
    this.fechaModal.emit();
  }

  onFile(event: any) {
    const file: File = event.target.files[0];
    this.formColaborador.value.avatar = file;
  }

  onSubmit() {
    this.equipesService.putColaborador({ id: this.colaborado?.id, name: this.formColaborador.value.name, office: this.formColaborador.value.office, avatar: this.formColaborador.value.avatar }).subscribe({
      complete: () => {
        this.fecharModal();
      }
    })
    console.log(this.formColaborador.value)
  }
}
