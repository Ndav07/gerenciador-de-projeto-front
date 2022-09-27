import { Injectable } from '@angular/core';


import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

import { FormGroup } from '@angular/forms';

import { Team } from '../interfaces/Team';

import { Contributor } from '../interfaces/Contributor';

@Injectable({
  providedIn: 'root'
})
export class EquipesService {

  //private baseApiUrl = environment.baseApiUrl;
  private baseApiUrl = "http://localhost:3333/";





  /*
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

  getAll(): Observable<Equipes[]> {
    return this.http.get<Equipes[]>(this.equipes);
  }

  getcolaboradoresdaEquipe(): Observable<Colaborador[]> {
    return this.http.get<Colaborador[]>(`${this.colaboradores}`);
  }

  getEquipeId(id: number): Observable<Equipes[]>{
    return this.http.get<Equipes[]>(`${this.equipeId}${id}`);
  }

  getMaxIdEquipe(){
    return this.http.get(this.maxIdEquipe);
  }

  getColaboradoresdaEquipe(id_equipe: number): Observable<Colaborador[]> {
    return this.http.get<Colaborador[]>(`${this.colaboradoresdaEquipe}${id_equipe}`);
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

  deleteEquipe(id_equipe: number){
    return this.http.delete(`${this.deletaEquipe}${id_equipe}`);
  }

  deleteColaborado(id_colaborado: number){
    return this.http.delete(`${this.deletaColaborado}${id_colaborado}`);
  }
  */
}
