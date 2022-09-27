import { Component, OnInit } from '@angular/core';
import { Projetos } from 'src/app/interfaces/Projetos';


@Component({
  selector: 'app-projetos',
  templateUrl: './projetos.component.html',
  styleUrls: ['./projetos.component.css']
})
export class ProjetosComponent implements OnInit {
  projetosAll: Projetos[] = [];
  projetosFiltrados: Projetos[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  projetos(proj: Projetos[]){
    this.projetosAll = proj;
  }

  search(e: Event){
    const target = e.target as HTMLInputElement;
    const value = target.value.toLocaleLowerCase();
    this.projetosFiltrados = this.projetosAll.filter(projet => {
      return projet.nome_projeto.toLocaleLowerCase().includes(value)
    });
  }
}
