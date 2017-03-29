import { Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../../../services/login.service';
import { DOT } from '../../../utils/dot';

import { PreregisterRequest } from '../../../models/preregister-request';
import { PreregisterResponse } from '../../../models/preregister-response';

@Component({
  selector: 'app-reactivation-step-1',
  templateUrl: './reactivation-step-1.component.html',
  styleUrls: ['./reactivation-step-1.component.sass']
})
export class ReactivationStep1Component {

  reactivation1Form: FormGroup;
  constructor(
    private loginService: LoginService,
    private dot: DOT,
    private fb: FormBuilder
  ) {this.validations();}

  preregisterResponse: PreregisterResponse;
  preregisterRequest: PreregisterRequest = new PreregisterRequest('', '');

  /**
   * This event element will help to change the current view in the parent element <auth.component>.
   */
  @Output() routeView: EventEmitter<String> = new EventEmitter();

  /**
   * This event is emitted to the parent element <auth.component>.
   */
  changeView(view: String): void {
    this.loginService.preRegister(this.preregisterRequest).subscribe(
      response => {
        this.preregisterResponse = response;
        this.dot.setData([this.preregisterResponse, this.preregisterRequest]);
        this.routeView.emit(view);
      },
      err => {
        console.log(err);
      }
    );  }

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