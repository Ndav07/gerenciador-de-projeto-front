import { Component, Input, OnInit } from '@angular/core';
import { Contributor } from 'src/app/shared/interfaces/IBackEnd/Contributor';

@Component({
  selector: 'app-lista-colaboradores',
  templateUrl: './lista-colaboradores.component.html',
  styleUrls: ['./lista-colaboradores.component.css']
})
export class ListaColaboradoresComponent implements OnInit {
  @Input() colaboradores?: Contributor[];

  baseApiUrl = "http://localhost:3333/";

  constructor() { }

  ngOnInit(): void { }

}
