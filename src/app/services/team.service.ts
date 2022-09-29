import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

import { FormGroup } from '@angular/forms';

import { Team } from '../shared/interfaces/IBackEnd/Team';

import { Contributor } from '../shared/interfaces/IBackEnd/Contributor';

@Injectable({
  providedIn: 'root'
})
export class EquipesService {

  //private baseApiUrl = environment.baseApiUrl;
  private baseApiUrl = "http://localhost:3333/";

  //GET
  private equipes = `${this.baseApiUrl}equipes/`;

  private colaboradores = `${this.baseApiUrl}colaboradores/`;

  private equipeId = `${this.baseApiUrl}equipe/`;

  private maxIdEquipe = `${this.baseApiUrl}maxIdEquipe/`;

  private colaboradoresdaEquipe = `${this.baseApiUrl}colaboradoresdaEquipe/`;

  //Post
  private criarEquipe = `${this.baseApiUrl}criarEquipe/`;

  private criarColaboradorAssociado = `${this.baseApiUrl}criarColaboradorAssociado/`;

  //Put
  private editarEquipe = `${this.baseApiUrl}editarEquipe/`;

  //Delete
  private deletaEquipe = `${this.baseApiUrl}deletaEquipe/`;

  private deletaColaborado = `${this.baseApiUrl}deletaColaborado/`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<Team[]> {
    return this.http.get<Team[]>(this.equipes);
  }

  getcolaboradoresdaEquipe(): Observable<Contributor[]> {
    return this.http.get<Contributor[]>(`${this.colaboradores}`);
  }

  getEquipeId(id: string): Observable<Team[]>{
    return this.http.get<Team[]>(`${this.equipeId}${id}`);
  }

  getMaxIdEquipe(){
    return this.http.get(this.maxIdEquipe);
  }

  getColaboradoresdaEquipe(id: string): Observable<Contributor[]> {
    return this.http.get<Contributor[]>(`${this.colaboradoresdaEquipe}${id}`);
  }

  postCriaEquipe(formGroup: FormGroup): Observable<FormGroup> {
    return this.http.post<FormGroup>(`${this.criarEquipe}`, formGroup);
  }

  postcriarColaboradorAssociado(formGroup: FormGroup): Observable<FormGroup> {
    return this.http.post<FormGroup<any>>(`${this.criarColaboradorAssociado}`, formGroup, {
      headers: new HttpHeaders({"enctype": "multipart/form-data"})
    });
  }

  putEquipe(formGroup: FormGroup): Observable<FormGroup> {
    return this.http.put<FormGroup>(`${this.editarEquipe}`, formGroup);
  }

  deleteEquipe(id: string){
    return this.http.delete(`${this.deletaEquipe}${id}`);
  }

  deleteColaborado(id: string){
    return this.http.delete(`${this.deletaColaborado}${id}`);
  }

}
