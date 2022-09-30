import { Component, OnInit } from '@angular/core';
import { Team } from 'src/app/shared/interfaces/IBackEnd/Team';

@Component({
  selector: 'app-equipes',
  templateUrl: './equipes.component.html',
  styleUrls: ['./equipes.component.css']
})
export class EquipesComponent implements OnInit {
  equipesAll: Team[] = [];
  equipesFiltradas: Team[] = []

  constructor() { }

  ngOnInit(): void {
  }

  equipes(equipes: Team[]) {
    this.equipesAll = equipes;
  }

  search(e: Event) {
    const target = e.target as HTMLInputElement;
    const value = target.value.toLocaleLowerCase();
    this.equipesFiltradas = this.equipesAll.filter(equip => {
      return equip.name.toLocaleLowerCase().includes(value)
    });
  }

}
