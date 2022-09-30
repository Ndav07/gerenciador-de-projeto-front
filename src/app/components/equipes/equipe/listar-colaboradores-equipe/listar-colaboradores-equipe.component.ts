import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { EquipesService } from 'src/app/services/team.service';
import { Contributor } from 'src/app/shared/interfaces/IBackEnd/Contributor';

@Component({
  selector: 'app-listar-colaboradores-equipe',
  templateUrl: './listar-colaboradores-equipe.component.html',
  styleUrls: ['./listar-colaboradores-equipe.component.css']
})
export class ListarColaboradoresEquipeComponent implements OnInit {

  @Input() colaboradoresDaEquipe?: Contributor[];
  @Output() recarregarColaboradores: EventEmitter<Event> = new EventEmitter();

  constructor(private service: EquipesService) { }

  ngOnInit() {}

  deletarColaborado(id: string) {
    this.service.deleteColaborado(id).subscribe({
      complete: () => {
        this.recarregarColaboradores.emit();
      }
    });
  }
}
