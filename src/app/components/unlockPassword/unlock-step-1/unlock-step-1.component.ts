import { Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../../../services/login.service';
import { DOT } from '../../../utils/dot';
import { Error } from '../../../models/error';

import { PreregisterRequest } from '../../../models/preregister-request';
import { PreregisterResponse } from '../../../models/preregister-response';

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
        Validators.pattern(/^\d+$/),
        Validators.minLength(6),
        Validators.maxLength(6)
      ])],
      user_login: ['',Validators.compose([
        Validators.required,
        Validators.pattern(/^\d+$/),
        Validators.minLength(5),
        Validators.maxLength(32)
      ])]
    })
  }

}