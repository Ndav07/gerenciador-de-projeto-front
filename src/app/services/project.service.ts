import { Injectable } from '@angular/core';

import { Project } from '../interfaces/Project';

import { Team } from '../interfaces/Team';

import { Task } from '../interfaces/Task';

import { Contributor } from '../interfaces/Contributor';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { FormGroup } from '@angular/forms';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjetosService {

  //private baseApiUrl = environment.baseApiUrl;
  private baseApiUrl = "http://localhost:3333/";



  //GET
  private projetos = `${this.baseApiUrl}`;

  private projeto = `${this.baseApiUrl}projeto/`;

  private tarefas = `${this.baseApiUrl}tarefas/`;

  private equipesSemProjetos = `${this.baseApiUrl}equipesSemProjetos/`;

  private colaboradoresdaEquipe = `${this.baseApiUrl}colaboradoresdaEquipe/`;

  private maxIdProjeto = `${this.baseApiUrl}maxIdProjeto/`;

  private maxIdTarefa = `${this.baseApiUrl}maxIdTarefa/`;

  //POST
  private criarProjeto = `${this.baseApiUrl}criarProjeto/`;

  private criarTarefa = `${this.baseApiUrl}criarTarefa/`;

  private associaColaboradoEmTarefa = `${this.baseApiUrl}associaColaboradoEmTarefa/`;

  //PUT
  private editaProjeto = `${this.baseApiUrl}editaProjeto/`;

  private editaEquipeAntiga = `${this.baseApiUrl}editaEquipeAntiga/`;

  private editaEquipeProjeto = `${this.baseApiUrl}editaEquipeProjeto/`;

  private equipeEmProjeto = `${this.baseApiUrl}equipeEmProjeto/`;

  private mudarStatusDeTarefa = `${this.baseApiUrl}mudarStatusDeTarefa/`;

  private editarTarefa = `${this.baseApiUrl}editarTarefa/`;

  private editaColaboradoEmTarefa = `${this.baseApiUrl}editaColaboradoEmTarefa/`;

  //DELETE
  private deletaProjeto = `${this.baseApiUrl}deletaProjeto/`;

  private deletaTarefa = `${this.baseApiUrl}deletaTarefa/`;

  constructor(private http: HttpClient) { }

  getProjetos(): Observable<Project[]> {
    return this.http.get<Project[]>(this.projetos);
  }

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

  getEquipesSemProjetos(): Observable<Team[]> {
    return this.http.get<Team[]>(this.equipesSemProjetos);
  }

  getColaboradoresdaEquipe(id: string): Observable<Contributor[]> {
    return this.http.get<Contributor[]>(`${this.colaboradoresdaEquipe}${id}`);
  }

  postCriarProjeto(formGroup: FormGroup): Observable<FormGroup> {
    return this.http.post<FormGroup>(this.criarProjeto, formGroup);
  }

  postEquipeProjeto(formGroup: FormGroup): Observable<FormGroup> {
    return this.http.put<FormGroup>(this.equipeEmProjeto, formGroup);
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
