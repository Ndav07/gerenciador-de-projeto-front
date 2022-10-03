import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

import { FormGroup } from '@angular/forms';

import { Team } from '../shared/interfaces/IBackEnd/Team';

import { Contributor } from '../shared/interfaces/IBackEnd/Contributor';
import { IEquipeDTO } from '../shared/interfaces/IFrontEnd/IEquipeDTO';
import { IContributorDTO } from '../shared/interfaces/IFrontEnd/IContribuidorDTO';

@Injectable({
  providedIn: 'root'
})
export class EquipesService {

  //private baseApiUrl = environment.baseApiUrl;
  private baseApiUrl = "http://localhost:3333";

  //GET
  private equipes = `${this.baseApiUrl}/teams`;

  private equipeId = `${this.baseApiUrl}/teams/`;


  //Post
  private criarEquipe = `${this.baseApiUrl}/teams`;

  private criarColaboradorAssociado = `${this.baseApiUrl}/contributors`;

  //Put
  private editarEquipe = `${this.baseApiUrl}/teams`;


  //Delete
  private deletaEquipe = `${this.baseApiUrl}/teams/`;

  private deletaColaborado = `${this.baseApiUrl}/contributors/`;

  constructor(private http: HttpClient) { }

  // Get
  getAll(): Observable<Team[]> {
    return this.http.get<Team[]>(this.equipes);
  }

  getEquipeId(id: string): Observable<Team>{
    return this.http.get<Team>(`${this.equipeId}${id}`);
  }

  // Post
  postCriaEquipe(equipe: IEquipeDTO): Observable<Team> {
    return this.http.post<Team>(`${this.criarEquipe}`, equipe);
  }

  postcriarColaboradorAssociado(contributors: IContributorDTO[]): Observable<void> {
    return this.http.post<void>(`${this.criarColaboradorAssociado}`, contributors);
  }

  // Put
  putEquipe(equipe: IEquipeDTO): Observable<void> {
    return this.http.patch<void>(`${this.editarEquipe}`, equipe);
  }

  // Delete
  deleteColaborado(id: string){
    return this.http.delete(`${this.deletaColaborado}${id}`);
  }

  deleteEquipe(id: string){
    return this.http.delete(`${this.deletaEquipe}${id}`);
  }
}
