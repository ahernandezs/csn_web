import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../../../services/login.service';
import { environment } from '../../../../environments/environment';
import { DOT } from '../../../utils/dot';

import { PreregisterRequest } from '../../../models/preregister-request';
import { PreregisterResponse } from '../../../models/preregister-response';
import { RegisterRequest } from '../../../models/register-request';
import { Error } from '../../../models/error';

@Component({
  selector: 'app-reactivation-step-2',
  templateUrl: './reactivation-step-2.component.html',
  styleUrls: ['./reactivation-step-2.component.sass']
})
export class ReactivationStep2Component implements OnInit {

  error: Error;
  environment;
  password;
  confirm_password;
  imageId;
  preregisterRequest: PreregisterRequest;
  preregisterResponse: PreregisterResponse;
  registerRequest: RegisterRequest;
  @Output() routeView: EventEmitter<String> = new EventEmitter();
  reactivation2Form: FormGroup;
 
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
    if(this.password !== this.confirm_password){
      return;
    }else{
      this.registerRequest = new RegisterRequest(this.preregisterRequest.user_login, this.imageId, this.preregisterRequest.activation_code, this.password);
      this.loginService.register(this.registerRequest).subscribe(
        response => {
          this.error.show = false;
          window.alert('Registro exitoso');
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
    this.reactivation2Form = this.fb.group({
      password: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(15)
      ])],
      confirm_password: ['', Validators.required]
    })
  }

}