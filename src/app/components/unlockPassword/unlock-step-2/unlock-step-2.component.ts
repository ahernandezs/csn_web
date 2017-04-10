import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../../../services/login.service';
import { environment } from '../../../../environments/environment';
import { DOT } from '../../../utils/dot';
import { Error } from '../../../models/error';

import { PreregisterRequest } from '../../../models/preregister-request';
import { PreregisterResponse } from '../../../models/preregister-response';
import { RegisterRequest } from '../../../models/register-request';
import { PasswordValidator } from '../../../utils/validations/passValidations';

@Component({
  selector: 'app-unlock-step-2',
  templateUrl: './unlock-step-2.component.html',
  styleUrls: ['./unlock-step-2.component.sass']
})
export class UnlockStep2Component implements OnInit {

  environment;
  password;
  confirm_password;
  imageId;
  preregisterRequest: PreregisterRequest;
  preregisterResponse: PreregisterResponse;
  registerRequest: RegisterRequest;
  @Output() routeView: EventEmitter<String> = new EventEmitter();
  unlock2Form : FormGroup;
  error: Error;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private dot: DOT,
    private fb: FormBuilder
  ) {
    this.error = new Error(false, '');
    this.validations();
  }

  ngOnInit() {
      this.preregisterResponse = this.dot.data[0];
      this.preregisterRequest = this.dot.data[1];
      this.dot = null;
      this.environment = environment;
  }

  changeView(view: String): void {
      this.routeView.emit(view);
  }

  register(view: String){
    var validation = PasswordValidator.validatePassword(this.preregisterRequest.user_login,this.password);
    if ( this.imageId != null && this.password == undefined){
      this.error.show = true;
      this.error.message = 'Por favor, ingresa tu contraseña para continuar';
      return;
    } else if ( validation != "" ){
      this.error.show = true;
      this.error.message = validation;
      return;
    } else if(this.password !== this.confirm_password){
      this.error.message = "Las contraseñas no coinciden";
      this.error.show = true;
      return;
    } else if( this.imageId === null && this.password != undefined ){
      this.error.show = true;
      this.error.message = 'Por favor, selecciona una imagen para continuar';
    } else {
      this.registerRequest = new RegisterRequest(this.preregisterRequest.user_login, this.imageId, this.preregisterRequest.activation_code, this.password);
      this.loginService.unlockPasswordRequest(this.registerRequest).subscribe(
        response => {
          window.alert('Desbloqueo existoso');
          this.error.show = false;
          this.router.navigate(['/login']);
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

  validations(){
     this.unlock2Form = this.fb.group({
        new_password: ['',Validators.required],
        confirm_password: ['',Validators.required]
      })
  }

}