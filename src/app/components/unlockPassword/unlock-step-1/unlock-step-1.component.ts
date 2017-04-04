import { Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../../../services/login.service';
import { DOT } from '../../../utils/dot';
import { Error } from '../../../models/error';

import { PreregisterRequest } from '../../../models/preregister-request';
import { PreregisterResponse } from '../../../models/preregister-response';

import { Numbers } from '../../../utils/validations/numbers';

@Component({
  selector: 'app-unlock-step-1',
  templateUrl: './unlock-step-1.component.html',
  styleUrls: ['./unlock-step-1.component.sass']
})
export class UnlockStep1Component {

  error: Error;
  unlockForm : FormGroup;
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
    if ( this.preregisterRequest.user_login.length < 32 ){
      this.zeros (this.preregisterRequest.user_login,this.preregisterRequest.user_login.length);
    }
    this.loginService.unlockPasswordPreRequest(this.preregisterRequest).subscribe(
      response => {
        this.preregisterResponse = response;
        this.dot.setData([this.preregisterResponse, this.preregisterRequest]);
        this.routeView.emit(view);
        this.error.show = false;
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
    this.unlockForm = this.fb.group({
      activation_code: ['',Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ])],
      user_login: ['',Validators.compose([
        Validators.required,
        Validators.minLength(5)
      ])]
    })
  }

  numbers(event) {
    var numbers = "0123456789";
    var event = event || window.event;
    var codigoCaracter = event.charCode || event.keyCode;
    var caracter = String.fromCharCode(codigoCaracter);

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