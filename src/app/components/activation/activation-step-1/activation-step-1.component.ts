import { Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../../../services/login.service';
import { DOT } from '../../../utils/dot';

import { PreregisterRequest } from '../../../models/preregister-request';
import { PreregisterResponse } from '../../../models/preregister-response';
import { Error } from '../../../models/error';

@Component({
  selector: 'app-activation-step-1',
  templateUrl: './activation-step-1.component.html',
  styleUrls: ['./activation-step-1.component.sass']
})
export class ActivationStep1Component {

  error: Error;
  activation1Form: FormGroup;
  preregisterResponse: PreregisterResponse;
  preregisterRequest: PreregisterRequest = new PreregisterRequest('', '');
  @Output() routeView: EventEmitter<String> = new EventEmitter();

  constructor(
    private loginService: LoginService,
    private dot: DOT,
    private fb: FormBuilder
  ) {
    this.error = new Error(false, '');
    this.validations();
  }

  changeView(view: String): void {
    if ( this.preregisterRequest.user_login == "" || this.preregisterRequest.activation_code == ""){
      this.error.show = true;
      this.error.message = 'Debes ingresar tu número de activación y número de socio';
      return;
    } else if ( this.preregisterRequest.user_login.length < 32 ){
      this.zeros(this.preregisterRequest.user_login,this.preregisterRequest.user_login.length);
    }
    this.loginService.preRegister(this.preregisterRequest).subscribe(
      response => {
        this.error.show = false;
        this.preregisterResponse = response;
        this.dot.setData([this.preregisterResponse, this.preregisterRequest]);
        this.routeView.emit(view);
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
    this.activation1Form = this.fb.group({
      activation_code: ['', Validators.compose([
        Validators.required,
        Validators.pattern(/^\d+$/),
        Validators.minLength(6)
      ])],
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
    this.preregisterRequest.user_login = zero + text;
  }
}