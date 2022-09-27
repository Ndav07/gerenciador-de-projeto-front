import {render, screen, fireEvent} from '@testing-library/angular';

import { HeaderComponent } from './header.component';

import { ActivatedRoute } from '@angular/router';



describe('HeaderComponent', async () => {

  /*
  it('rota deve ir para projetos',async () => {
    await render(HeaderComponent,{
      routes: ActivatedRoute
    });

    const rotaProjetos = screen.getByTestId('rotaProjeto');

    fireEvent.click(rotaProjetos);

    class Teste{
      url: string;
      constructor(route: ActivatedRoute){
        this.url = route.snapshot.url.join('');
      }

      getUrl(): string {
        return this.url;
      }
    }

    //const tet = new Teste;

    //expect(tet.getUrl()).toBe('/');
  })
  */

});



