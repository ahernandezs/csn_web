import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../../../services/login.service';

import { CheckLoginRequest } from '../../../models/check-login-request';
import { CheckLoginResponse } from '../../../models/check-login-response';

@Component({
  selector: 'app-access',
  templateUrl: './access.component.html',
  styleUrls: ['./access.component.sass']
})
export class AccessComponent implements OnInit {

  loginForm : FormGroup;
  constructor(
    private loginService: LoginService,
    private fb: FormBuilder
  ){this.validations();}
  
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
  validations(){
    this.loginForm = this.fb.group({
      user_login: ['',Validators.compose([
        Validators.required,
        Validators.pattern(/^\d+$/),
        Validators.minLength(5),
        Validators.maxLength(32)
      ])]
    })
  }
}
