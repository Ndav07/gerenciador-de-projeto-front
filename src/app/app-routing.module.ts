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
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {path: '', redirectTo: '/auth', pathMatch: 'full'},
  {path: 'auth', component: AuthComponent},
  {path: 'projetos', component: ProjetosComponent, canActivate: [AuthGuard]},
  {path: 'equipes', component: EquipesComponent, canActivate: [AuthGuard]},
  {path: 'novoProjeto', component: NovoprojetoComponent, canActivate: [AuthGuard]},
  {path: 'novaEquipe', component: NovaequipeComponent, canActivate: [AuthGuard]},
  {path: 'editaEquipe/:id', component: EditaEquipeComponent, canActivate: [AuthGuard]},
  {path: 'editaProjeto/:id', component: EditaProjetoComponent, canActivate: [AuthGuard]},
  {path: 'pag-nao-encontrada', component: PaginaNaoEncontradaComponent},
  {path: '**', redirectTo: '/pag-nao-encontrada'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
