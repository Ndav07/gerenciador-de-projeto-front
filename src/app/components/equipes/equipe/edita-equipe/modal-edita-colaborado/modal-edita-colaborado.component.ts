import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal-edita-colaborado',
  templateUrl: './modal-edita-colaborado.component.html',
  styleUrls: ['./modal-edita-colaborado.component.css']
})
export class ModalEditaColaboradoComponent implements OnInit {
  @Input() toggle?: boolean;

  @Output() mudarEdit: EventEmitter<Event> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  showEditColaborado(){
    this.toggle = !this.toggle;
    this.mudarEdit.emit();
  }

}
