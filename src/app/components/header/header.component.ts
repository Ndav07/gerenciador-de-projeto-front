import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  autenticacao = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    if(this.authService.isAuth()) {
      this.autenticacao = true;
    }
  }

  ngOnDestroy(): void {
    this.autenticacao = false;
    localStorage.clear();
    this.router.navigate(['/auth']);
  }

}
