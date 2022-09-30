import { Component, OnInit } from '@angular/core';

import { EquipesService } from 'src/app/services/team.service';

import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

import { Router, ActivatedRoute } from '@angular/router';

import { Team } from 'src/app/shared/interfaces/IBackEnd/Team';
import { Contributor } from 'src/app/shared/interfaces/IBackEnd/Contributor';
import { IContributorDTO } from 'src/app/shared/interfaces/IFrontEnd/IContribuidorDTO';

@Component({
  selector: 'app-edita-equipe',
  templateUrl: './edita-equipe.component.html',
  styleUrls: ['./edita-equipe.component.css']
})
export class EditaEquipeComponent implements OnInit {
  formEquipe!: FormGroup;

  equipe!: Team;

  formColaborado!: FormGroup;

  idEquipe!: string;

  colaboradoresAssociados: IContributorDTO[] = [];

  colaboradoresNovos: IContributorDTO[] = [];

  constructor(private service: EquipesService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getEquipe();
    this.formColaborado = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'office': new FormControl(null),
      'team': new FormControl(null)
    });
    this.formEquipe = new FormGroup({
      'id': new FormControl(null),
      'name': new FormControl(null, Validators.required),
      'contributors': new FormArray([])
    });
  }

  getEquipe(){
    const id = String(this.route.snapshot.paramMap.get('id'));
    this.idEquipe = id;
    this.service.getEquipeId(this.idEquipe).subscribe({
      next: (equipe) => {
        this.equipe = equipe;
      },
      complete: () => {
        if(this.equipe.contributors) {
          console.log("Entrou aqui")
          for(let j in this.equipe.contributors){
            console.log(this.equipe.contributors[j])
            this.colaboradoresAssociados.push({ name: this.equipe.contributors[j].name, office: this.equipe.contributors[j].office, team: this.equipe.contributors[j].team!.id });
          }
        }
          console.log("não entrouuuu")
          console.log(this.colaboradoresAssociados)
        this.formEquipe = new FormGroup({
          'id': new FormControl(this.equipe.id),
          'name': new FormControl(this.equipe.name, Validators.required),
          'contributors': new FormArray([])
        });
      }
    });
  }

  adicionaColaborado(){
    this.colaboradoresAssociados.push(this.formColaborado.value);
    this.colaboradoresNovos.push(this.formColaborado.value);
    this.limparFormularioColaborador();
  }

  limparFormularioColaborador(){
    this.formColaborado.reset();
  }

  excluirColaboradoDaEquipe(colab: string){
    // Fazer verificação para excluir local ou no banco!

    if(typeof colab === 'number'){
      this.colaboradoresAssociados = this.colaboradoresAssociados.filter((colaboradores: any) => {
        return colaboradores.id_colaborado !== colab;
      })
      this.excluirColaboradoNoBanco(colab);
    }
    else{
      this.colaboradoresAssociados = this.colaboradoresAssociados.filter((colaboradores: any) => {
        return colaboradores.nome_colaborado !== colab;
      })
    }


    if(typeof colab === 'string'){
      this.colaboradoresNovos = this.colaboradoresNovos.filter((colaboradores: any) => {
        return colaboradores.nome_colaborado !== colab;
      });
    }
  }

  excluirColaboradoNoBanco(id: string){
    this.service.deleteColaborado(id).subscribe();
  }

  onSubmit(){
    for(let j in this.colaboradoresNovos){
      this.formColaborado = new FormGroup({
        'name': new FormControl(this.colaboradoresNovos[j].name),
        'office': new FormControl(this.colaboradoresNovos[j].office),
        'id': new FormControl(this.idEquipe)
      });
      (<FormArray>this.formEquipe.get('contributors')).push(this.formColaborado);
    }
    this.service.putEquipe(this.formEquipe.value).subscribe({
      complete: () => {
        if(this.formEquipe.value.colaboradores.length > 0){
          this.criarColaboradorAssociado(this.formEquipe.value);
        } else {
          this.router.navigate(['/equipes']);
        }
      }
    });
  }

  criarColaboradorAssociado(contributors: IContributorDTO[]){
    this.service.postcriarColaboradorAssociado(contributors).subscribe({
      complete: () => {
        this.router.navigate(['/equipes']);
      }
    })
  }

}
