import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/shared/interfaces/IBackEnd/Project';

@Component({
  selector: 'app-projetos',
  templateUrl: './projetos.component.html',
  styleUrls: ['./projetos.component.css']
})
export class ProjetosComponent implements OnInit {
  projetosAll: Project[] = [];
  projetosFiltrados: Project[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  projetos(proj: Project[]){
    this.projetosAll = proj;
  }

  search(e: Event){
    const target = e.target as HTMLInputElement;
    const value = target.value.toLocaleLowerCase();
    this.projetosFiltrados = this.projetosAll.filter(projet => {
      return projet.name.toLocaleLowerCase().includes(value)
    });
  }
}
