import { Component } from '@angular/core';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`
})
export class AppComponent {

  constructor(
    private loginService: LoginService
  ) {
    window.onbeforeunload = function(e) {
      loginService.logout().subscribe(
        res => {
          localStorage.removeItem("x-auth-token");
          localStorage.removeItem("client_application_id");
          localStorage.removeItem('x-data-csn');
        },
        err => {
          localStorage.removeItem("x-auth-token");
          localStorage.removeItem("client_application_id");
          localStorage.removeItem('x-data-csn');
        }
      );
    };

  }

}
