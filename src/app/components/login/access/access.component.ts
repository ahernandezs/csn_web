import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LoginService } from '../../../services/login.service';

import { CheckLoginRequest } from '../../../models/check-login-request';
import { CheckLoginResponse } from '../../../models/check-login-response';

@Component({
  selector: 'app-access',
  templateUrl: './access.component.html',
  styleUrls: ['./access.component.sass']
})
export class AccessComponent implements OnInit {

  constructor(
    private loginService: LoginService
  ){}
  
  checkLoginResponse: CheckLoginResponse;
  checkLoginRequest: CheckLoginRequest = new CheckLoginRequest('');

  @Output() routeView: EventEmitter<CheckLoginResponse> = new EventEmitter();

  ngOnInit() {
    localStorage.removeItem('x-auth-token');
    localStorage.removeItem('x-data-csn');
    localStorage.removeItem('client_application_id');
    localStorage.removeItem('user_login_csn');
  }

  changeView(): void {
    this.loginService.checkLogin(this.checkLoginRequest).subscribe(
      response => {
        this.checkLoginResponse = response;
        localStorage.setItem('user_login_csn',this.checkLoginRequest.user_login);
        this.routeView.emit(this.checkLoginResponse);
      },
      err => {
        console.log(err);
      }
    );
  }
}
