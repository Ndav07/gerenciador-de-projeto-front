import { Injectable } from '@angular/core';

import { Project } from '../shared/interfaces/IBackEnd/Project';

import { Team } from '../shared/interfaces/IBackEnd/Team';

import { Task } from '../shared/interfaces/IBackEnd/Task';

import { Contributor } from '../shared/interfaces/IBackEnd/Contributor';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { FormGroup } from '@angular/forms';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjetosService {

  //private baseApiUrl = environment.baseApiUrl;
  private baseApiUrl = "http://localhost:3333";



  //GET
  private equipesSemProjetos = `${this.baseApiUrl}/teams/without/project`;

  private projetos = `${this.baseApiUrl}/projects`;
  //

  //POST
  private criarProjeto = `${this.baseApiUrl}/projects`;

  //

  private projeto = `${this.baseApiUrl}projeto/`;

  private tarefas = `${this.baseApiUrl}tarefas/`;


  private colaboradoresdaEquipe = `${this.baseApiUrl}colaboradoresdaEquipe/`;

  private maxIdProjeto = `${this.baseApiUrl}maxIdProjeto/`;

  private maxIdTarefa = `${this.baseApiUrl}maxIdTarefa/`;


  private criarTarefa = `${this.baseApiUrl}criarTarefa/`;

  private associaColaboradoEmTarefa = `${this.baseApiUrl}associaColaboradoEmTarefa/`;

  //PUT
  private editaProjeto = `${this.baseApiUrl}editaProjeto/`;

  private editaEquipeAntiga = `${this.baseApiUrl}editaEquipeAntiga/`;

  private editaEquipeProjeto = `${this.baseApiUrl}editaEquipeProjeto/`;

  private mudarStatusDeTarefa = `${this.baseApiUrl}mudarStatusDeTarefa/`;

  private editarTarefa = `${this.baseApiUrl}editarTarefa/`;

  private editaColaboradoEmTarefa = `${this.baseApiUrl}editaColaboradoEmTarefa/`;

  //DELETE
  private deletaProjeto = `${this.baseApiUrl}deletaProjeto/`;

  private deletaTarefa = `${this.baseApiUrl}deletaTarefa/`;

  constructor(private http: HttpClient) { }

  //Get
  getEquipesSemProjetos(): Observable<Team[]> {
    return this.http.get<Team[]>(this.equipesSemProjetos);
  }

  getProjetos(): Observable<Project[]> {
    return this.http.get<Project[]>(this.projetos);
  }
  //

  //Post
  postCriarProjeto(formGroup: FormGroup): Observable<void> {
    return this.http.post<void>(this.criarProjeto, formGroup);
  }

  //

  getProjetoId(id: string): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.projeto}${id}`);
  }

  getMaxIdProjeto(){
    return this.http.get(this.maxIdProjeto);
  }

  getTarefas(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.tarefas}`);
  }

  getMaxIdTarefa(){
    return this.http.get(this.maxIdTarefa);
  }


  getColaboradoresdaEquipe(id: string): Observable<Contributor[]> {
    return this.http.get<Contributor[]>(`${this.colaboradoresdaEquipe}${id}`);
  }



  postCriarTarefa(formGroup: FormGroup): Observable<FormGroup> {
    return this.http.post<FormGroup>(this.criarTarefa , formGroup);
  }

  postAssociaColaboradoEmTarefa(formGroup: FormGroup): Observable<FormGroup> {
    return this.http.post<FormGroup>(this.associaColaboradoEmTarefa, formGroup);
  }

  putProjeto(formGroup: FormGroup): Observable<FormGroup> {
    return this.http.put<FormGroup>(this.editaProjeto, formGroup);
  }

  putEquipeAntiga(formGroup: FormGroup) {
    return this.http.patch(this.editaEquipeAntiga, formGroup);
  }

  putEquipeProjeto(formGroup: FormGroup): Observable<FormGroup> {
    return this.http.put<FormGroup>(this.editaEquipeProjeto, formGroup);
  }

  putMudarStatusDeTarefa(tarefa: Task){
    return this.http.put(`${this.mudarStatusDeTarefa}`, tarefa);
  }

  putTarefa(formGroup: FormGroup): Observable<FormGroup> {
    return this.http.put<FormGroup>(this.editarTarefa, formGroup);
  }

  putEditaColaboradoEmTarefa(formGroup: FormGroup): Observable<FormGroup> {
    return this.http.put<FormGroup>(this.editaColaboradoEmTarefa, formGroup);
  }

  deleteProjeto(id: string){
    return this.http.delete(`${this.deletaProjeto}${id}`);
  }

  deleteTarefa(id: string){
    return this.http.delete(`${this.deletaTarefa}${id}`);
  }
}
