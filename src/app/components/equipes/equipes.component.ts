import { Component, OnInit } from '@angular/core';
import { Equipes } from 'src/app/interfaces/Equipes';

@Component({
  selector: 'app-equipes',
  templateUrl: './equipes.component.html',
  styleUrls: ['./equipes.component.css']
})
export class EquipesComponent implements OnInit {
  equipesAll: Equipes[] = [];
  equipesFiltradas: Equipes[] = []

  constructor() { }

  ngOnInit(): void {
  }

  equipes(equipes: Equipes[]){
    this.equipesAll = equipes;
  }

  search(e: Event){
    const target = e.target as HTMLInputElement;
    const value = target.value.toLocaleLowerCase();
    this.equipesFiltradas = this.equipesAll.filter(equip => {
      return equip.nome_equipe.toLocaleLowerCase().includes(value)
    });
  }

}
