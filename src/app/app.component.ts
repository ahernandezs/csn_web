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
    if(navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function(position){
        localStorage.setItem('lat',position.coords.latitude+"");
        localStorage.setItem('lng',position.coords.longitude+"");
        console.log('Current position: ' + localStorage.getItem('lat') + " / " + localStorage.getItem('lng'));
      });
		}
  }

}
