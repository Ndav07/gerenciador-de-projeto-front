import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProjetosComponent } from './components/projetos/projetos.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { EquipesComponent } from './components/equipes/equipes.component';
import { NovoprojetoComponent } from './components/projetos/novoprojeto/novoprojeto.component';
import { ProjetoComponent } from './components/projetos/projeto/projeto.component';
import { EquipeComponent } from './components/equipes/equipe/equipe.component';
import { NovaequipeComponent } from './components/equipes/novaequipe/novaequipe.component';
import { ListaColaboradoresComponent } from './components/projetos/projeto/lista-colaboradores/lista-colaboradores.component';
import { ListaTarefasComponent } from './components/projetos/projeto/lista-tarefas/lista-tarefas.component';
import { EditaEquipeComponent } from './components/equipes/equipe/edita-equipe/edita-equipe.component';
import { ModalEditaColaboradoComponent } from './components/equipes/equipe/edita-equipe/modal-edita-colaborado/modal-edita-colaborado.component';
import { ListarColaboradoresEquipeComponent } from './components/equipes/equipe/listar-colaboradores-equipe/listar-colaboradores-equipe.component';
import { EditaProjetoComponent } from './components/projetos/projeto/edita-projeto/edita-projeto.component';
import { ConfimarExclusaoComponent } from './components/modal-confimar-exclusao/confimar-exclusao.component';
import { ModalCriarTarefaComponent } from './components/projetos/projeto/lista-tarefas/modal-criar-tarefa/modal-criar-tarefa.component';
import { ModalEditarTarefaComponent } from './components/projetos/projeto/lista-tarefas/modal-editar-tarefa/modal-editar-tarefa.component';
import { PaginaNaoEncontradaComponent } from './components/pagina-nao-encontrada/pagina-nao-encontrada.component';
import { AuthComponent } from './components/auth/auth.component';
import { LoadingSpinnerComponent } from './shared/spinner/loading-spinner.component';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { TokenInterceptor } from './inteceptors/token.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    ProjetosComponent,
    HeaderComponent,
    FooterComponent,
    EquipesComponent,
    NovoprojetoComponent,
    ProjetoComponent,
    EquipeComponent,
    NovaequipeComponent,
    ListaColaboradoresComponent,
    ListaTarefasComponent,
    EditaEquipeComponent,
    ModalEditaColaboradoComponent,
    ListarColaboradoresEquipeComponent,
    EditaProjetoComponent,
    ConfimarExclusaoComponent,
    ModalCriarTarefaComponent,
    ModalEditarTarefaComponent,
    PaginaNaoEncontradaComponent,
    AuthComponent,
    LoadingSpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  providers: [
    {provide: JWT_OPTIONS, useValue: JWT_OPTIONS},
    JwtHelperService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
