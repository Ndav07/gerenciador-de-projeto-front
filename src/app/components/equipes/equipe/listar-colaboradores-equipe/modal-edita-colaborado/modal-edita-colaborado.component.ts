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
  @Output() edicaoColaborado: EventEmitter<Event> = new EventEmitter();

  formColaborador!: FormGroup;

  FormData!: FormData;

  constructor(private equipesService: EquipesService) { }

  ngOnInit(): void {
    this.FormData = new FormData();
    this.formColaborador = new FormGroup({
      'name': new FormControl(this.colaborado!.name, Validators.required),
      'office': new FormControl(this.colaborado!.office, Validators.required),
      'avatar': new FormControl(null)
    })
  }

  fecharModal() {
    this.fechaModal.emit();
  }

  onFile(event: any) {
    const file: File = event.target.files[0];
    this.formColaborador.patchValue({ avatar : file });
    this.FormData.append('avatar', this.formColaborador.value.avatar);
  }

  onSubmit() {
    this.FormData.append('id', this.colaborado?.id!);
    this.FormData.append('name', this.formColaborador.value.name);
    this.FormData.append('office', this.formColaborador.value.office);

    if(this.FormData.get('avatar') !== null){
      this.equipesService.putColaborador(this.FormData).subscribe({
        complete: () => {
          this.fecharModal();
          this.edicaoColaborado.emit();
        }
      })
    } else {
      this.equipesService.putColaboradorSemAvatar({ id: this.colaborado?.id, name: this.formColaborador.value.name, office: this.formColaborador.value.office }).subscribe({
        complete: () => {
          this.fecharModal();
          this.edicaoColaborado.emit();
        }
      })
    }
  }
}
