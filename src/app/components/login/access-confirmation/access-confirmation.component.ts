import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../../services/login.service';
import { environment } from '../../../../environments/environment';

import { CheckLoginResponse } from '../../../models/check-login-response';
import { LoginRequest } from '../../../models/login-request';
import { LoginResponse } from '../../../models/login-response';
import { Error } from '../../../models/error';
import { PasswordValidator } from '../../../utils/validations/passValidations';

@Component({
  selector: 'app-access-confirmation',
  templateUrl: './access-confirmation.component.html',
  styleUrls: ['./access-confirmation.component.sass']
})
export class AccessConfirmationComponent implements OnInit {

  error: Error;
  password;
  imageId;
  environment;
  account;
  loginRequest: LoginRequest;
  loginResponse: LoginResponse;
  @Output() routeView: EventEmitter<String> = new EventEmitter();
  @Input() checkLoginResponse: CheckLoginResponse;

  constructor(
    private loginService: LoginService,
    private router: Router
  ) {
    this.error = new Error(false, '');
  }

  ngOnInit() {
    if(localStorage.getItem("client_application_id") === null){
      localStorage.setItem("client_application_id", Math.floor(Math.random()*1000000)+'-WEB');
    this.environment = environment;
    this.account = localStorage.getItem('user_login_csn');
    }
  }

  changeView(view: string): void {
      this.routeView.emit(view);
  }

  login(view: string){

    var validation = PasswordValidator.validatePassword(this.account,this.password);
    if ( this.imageId != null && this.password == undefined){
      this.error.show = true;
      this.error.message = 'Por favor, ingresa tu contraseña para continuar';
      return;
    } else if ( validation != "" ){
      this.error.show = true;
      this.error.message = validation;
      return;
    } else {
      this.loginRequest = new LoginRequest(localStorage.getItem('user_login_csn'), this.password, localStorage.getItem('client_application_id'), this.imageId);
      localStorage.removeItem('x-auth-token');
      localStorage.removeItem('x-data-csn');
      this.loginService.login(this.loginRequest).subscribe(
        response => {
          this.error.show = false;
          this.loginResponse = response;
          localStorage.setItem('x-data-csn', JSON.stringify(this.loginResponse));
          this.router.navigate(['/home']); 
        },
        error => {
            this.error.message = error;
            this.error.show = true;
        }
      );
    }
  }

  selectImage(imageId: string){
    this.imageId = imageId;
  }

}
