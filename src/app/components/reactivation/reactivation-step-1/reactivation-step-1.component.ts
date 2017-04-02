import { Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../../../services/login.service';
import { DOT } from '../../../utils/dot';

import { PreregisterRequest } from '../../../models/preregister-request';
import { PreregisterResponse } from '../../../models/preregister-response';
import { Error } from '../../../models/error';

@Component({
  selector: 'app-reactivation-step-1',
  templateUrl: './reactivation-step-1.component.html',
  styleUrls: ['./reactivation-step-1.component.sass']
})
export class ReactivationStep1Component {

  error: Error;
  reactivation1Form: FormGroup;
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
    this.loginService.preRegister(this.preregisterRequest).subscribe(
      response => {
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
    this.reactivation1Form = this.fb.group({
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
    var caracter = String.fromCharCode(codigoCaracter);

    return numbers.indexOf(caracter) != -1;
  }
}