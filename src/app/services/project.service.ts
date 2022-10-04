import { Injectable } from '@angular/core';

import { Project } from '../shared/interfaces/IBackEnd/Project';

import { Team } from '../shared/interfaces/IBackEnd/Team';

import { Task } from '../shared/interfaces/IBackEnd/Task';

import { Contributor } from '../shared/interfaces/IBackEnd/Contributor';

import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';

import { FormGroup } from '@angular/forms';

import { environment } from 'src/environments/environment';
import { ITarefaDTO } from '../shared/interfaces/IFrontEnd/ITarefaDTO';
import { IProjetoDTO } from '../shared/interfaces/IFrontEnd/IProjetoDTO';

@Injectable({
  providedIn: 'root'
})
export class ProjetosService {

  //private baseApiUrl = environment.baseApiUrl;
  private baseApiUrl = "http://localhost:3333";


  //GET
  private equipesSemProjetos = `${this.baseApiUrl}/teams/without/project`;

  private projetos = `${this.baseApiUrl}/projects`;

  private projeto = `${this.baseApiUrl}/projects/`;

  private colaboradoresdaEquipe = `${this.baseApiUrl}/contributors/`;

  //POST
  private criarProjeto = `${this.baseApiUrl}/projects`;

  private criarTarefa = `${this.baseApiUrl}/tasks`;

  //PUT
  private editaProjeto = `${this.baseApiUrl}/projects`;

  private mudarStatusDeTarefa = `${this.baseApiUrl}/tasks`;

  private editarTarefa = `${this.baseApiUrl}/tasks`;

  //DELETE
  private deletaProjeto = `${this.baseApiUrl}/projects/`;

  private deletaTarefa = `${this.baseApiUrl}/tasks/`;

  constructor(private http: HttpClient) { }

  //Get
  getEquipesSemProjetos(): Observable<Team[]> {
    return this.http.get<Team[]>(this.equipesSemProjetos);
  }

  getProjetos(): Observable<Project[]> {
    return this.http.get<Project[]>(this.projetos);
  }

  getProjetoId(id: string): Observable<Project> {
    return this.http.get<Project>(`${this.projeto}${id}`);
  }

  getColaboradoresdaEquipe(id: string): Observable<Contributor[]> {
    return this.http.get<Contributor[]>(`${this.colaboradoresdaEquipe}${id}`);
  }

  //Post
  postCriarProjeto(projeto: IProjetoDTO): Observable<void> {
    return this.http.post<void>(this.criarProjeto, projeto);
  }

  postCriarTarefa(tarefa: ITarefaDTO): Observable<void> {
    return this.http.post<void>(this.criarTarefa , tarefa);
  }

  //Put
  putMudarStatusDeTarefa(tarefa: ITarefaDTO): Observable<void> {
    return this.http.patch<void>(`${this.mudarStatusDeTarefa}`, tarefa);
  }

  putTarefa(tarefa: ITarefaDTO): Observable<void> {
    return this.http.put<void>(this.editarTarefa, tarefa);
  }

  putProjeto(projeto: IProjetoDTO): Observable<void> {
    return this.http.put<void>(this.editaProjeto, projeto);
  }

  //Delete
  deleteProjeto(id: string): Observable<void> {
    return this.http.delete<void>(`${this.deletaProjeto}${id}`);
  }

  deleteTarefa(id: string): Observable<void> {
    return this.http.delete<void>(`${this.deletaTarefa}${id}`);
  }
}
