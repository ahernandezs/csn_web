import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../../../services/login.service';

import { CheckLoginRequest } from '../../../models/check-login-request';
import { CheckLoginResponse } from '../../../models/check-login-response';
import { Error } from '../../../models/error';

@Component({
  selector: 'app-access',
  templateUrl: './access.component.html',
  styleUrls: ['./access.component.sass']
})
export class AccessComponent implements OnInit {

  error: Error;
  loginForm : FormGroup;
  checkLoginResponse: CheckLoginResponse;
  checkLoginRequest: CheckLoginRequest = new CheckLoginRequest('');
  @Output() routeView: EventEmitter<CheckLoginResponse> = new EventEmitter();

  constructor(
    private loginService: LoginService,
    private fb: FormBuilder
  ){
    this.error = new Error(false, '');
    this.validations();
  }

  ngOnInit() {
    localStorage.removeItem('x-auth-token');
    localStorage.removeItem('x-data-csn');
    localStorage.removeItem('client_application_id');
    localStorage.removeItem('user_login_csn');
  }

  changeView(): void {
    if ( this.checkLoginRequest.user_login == "" ){
      this.error.show = true;
      this.error.message = 'Debes ingresar tu número de socio';
      return;
    } else if ( this.checkLoginRequest.user_login.length < 32 ){
      this.zeros(this.checkLoginRequest.user_login,this.checkLoginRequest.user_login.length);
    }
    this.loginService.checkLogin(this.checkLoginRequest).subscribe(
      response => {
        this.error.show = false;
        this.checkLoginResponse = response;
        localStorage.setItem('user_login_csn',this.checkLoginRequest.user_login);
        this.routeView.emit(this.checkLoginResponse);
      },
      error => {
          this.error.message = error;
          this.error.show = true;
      }
    );
  }

  showPass(elementToShow: string){
  let pwd = document.getElementById(elementToShow);
      if(pwd.getAttribute("type")=="password"){
          pwd.setAttribute("type","text");
      } else {
          pwd.setAttribute("type","password");
      }
  }

  validations(){
    this.loginForm = this.fb.group({
      user_login: ['',Validators.compose([
        Validators.required,
        Validators.pattern(/^\d+$/),
        Validators.minLength(5)
      ])]
    })
  }

  numbers(event) {
    var numbers = "0123456789";
    var event = event || window.event;
    var codigoCaracter = event.charCode || event.keyCode;
    var retro = event.keyCode;
    var caracter = String.fromCharCode(codigoCaracter);
    if( retro == 8 ){
      return true;
    }else if ( retro == 37 ){
      return true;
    }else if ( retro == 39 ){
      return true;
    }else if ( retro == 46 ){
      return true;
    }
    return numbers.indexOf(caracter) != -1;
  }

  zeros(text, longitud){
    var top = 32 - longitud;
    var zero="";
    for ( var i=0; i<top; i++){
      zero= zero + '0';
    }
    this.checkLoginRequest.user_login = zero + text;
  }
}
