import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  autenticacao = false;
  private usuarioSub!: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    /*
    this.usuarioSub = this.authService.usuario.subscribe(usuario => {
      this.autenticacao = !usuario ? false : true;
    });
    */
  }

  ngOnDestroy(): void {
    this.usuarioSub.unsubscribe();
  }

}
