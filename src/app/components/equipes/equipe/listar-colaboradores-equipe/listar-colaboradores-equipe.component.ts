import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { EquipesService } from 'src/app/services/equipes.service';

@Component({
  selector: 'app-listar-colaboradores-equipe',
  templateUrl: './listar-colaboradores-equipe.component.html',
  styleUrls: ['./listar-colaboradores-equipe.component.css']
})
export class ListarColaboradoresEquipeComponent implements OnInit {

  @Input() colaboradoresDaEquipe: any;
  @Output() recarregarColaboradores: EventEmitter<Event> = new EventEmitter();

  constructor(private service: EquipesService) { }

  ngOnInit(): void {

  }

  deletarColaborado(id_colaborado: number){
    this.service.deleteColaborado(id_colaborado).subscribe({
      complete: () => {
        this.recarregarColaboradores.emit();
      }
    });
  }
}
