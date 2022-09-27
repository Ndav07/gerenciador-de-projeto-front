import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-confimar-exclusao',
  templateUrl: './confimar-exclusao.component.html',
  styleUrls: ['./confimar-exclusao.component.css']
})
export class ConfimarExclusaoComponent implements OnInit {
  @Output() fechaModal: EventEmitter<Event> = new EventEmitter();

  @Input() mensagem?: string;
  @Input() id?: string;
  @Output() deleta: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  confirmar(){
    this.deleta.emit(this.id);
    this.fechaModal.emit();
  }

  negar(){
    this.fechaModal.emit();
  }

}
