import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProjetosComponent } from './components/projetos/projetos.component';
import { EquipesComponent } from './components/equipes/equipes.component';
import { NovoprojetoComponent } from './components/projetos/novoprojeto/novoprojeto.component';
import { NovaequipeComponent } from './components/equipes/novaequipe/novaequipe.component';
import { EditaEquipeComponent } from './components/equipes/equipe/edita-equipe/edita-equipe.component';
import { EditaProjetoComponent } from './components/projetos/projeto/edita-projeto/edita-projeto.component';
import { PaginaNaoEncontradaComponent } from './components/pagina-nao-encontrada/pagina-nao-encontrada.component';
import { AuthComponent } from './components/auth/auth.component';

const routes: Routes = [
  {path: '', redirectTo: '/projetos', pathMatch: 'full'},
  {path: 'auth', component: AuthComponent},
  {path: 'projetos', component: ProjetosComponent},
  {path: 'equipes', component: EquipesComponent},
  {path: 'novoProjeto', component: NovoprojetoComponent},
  {path: 'novaEquipe', component: NovaequipeComponent},
  {path: 'editaEquipe/:id', component: EditaEquipeComponent},
  {path: 'editaProjeto/:id', component: EditaProjetoComponent},
  {path: 'pag-nao-encontrada', component: PaginaNaoEncontradaComponent},
  {path: '**', redirectTo: '/pag-nao-encontrada'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
