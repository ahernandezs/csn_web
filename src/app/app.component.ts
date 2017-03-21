import { Component } from '@angular/core';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet><loaders-css *ngIf="showLoader" [loader]="'ball-spin-fade-loader'" [loaderClass]="'loader-csn'"></loaders-css>
`
})
export class AppComponent {

  showLoader: boolean;

  constructor(
    private loginService: LoginService
  ) {
    window.onbeforeunload = function(e) {
      if(localStorage.getItem('x-auth-token') !== null ){
        loginService.logout().subscribe(
          res => {
            localStorage.removeItem('x-auth-token');
            localStorage.removeItem('client_application_id');
            localStorage.removeItem('x-data-csn');
            localStorage.removeItem('user_login_csn');
          },
          err => {
            localStorage.removeItem('x-auth-token');
            localStorage.removeItem('client_application_id');
            localStorage.removeItem('x-data-csn');
            localStorage.removeItem('user_login_csn');
          }
        );
      }
    };

  }

}
