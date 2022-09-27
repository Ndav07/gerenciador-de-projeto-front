import {render, screen, fireEvent} from '@testing-library/angular';

import { ProjetosComponent } from './projetos.component';

import { ActivatedRoute } from '@angular/router';

describe('Projetos Component', () => {

  it('input deve funcionar', async () => {
    await render(ProjetosComponent);

    const getInput = screen.getByTestId('inputPesquisa') as HTMLInputElement;

    fireEvent.change(getInput, {target: {value: 'Qualquer valor'}});
    expect(getInput.value).toBe('Qualquer valor');
  })

})
