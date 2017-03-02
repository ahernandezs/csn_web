import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../../services/login.service';
import { environment } from '../../../../environments/environment';
import { DOT } from '../../../utils/dot';

import { PreregisterRequest } from '../../../models/preregister-request';
import { PreregisterResponse } from '../../../models/preregister-response';
import { RegisterRequest } from '../../../models/register-request';

@Component({
  selector: 'app-activation-step-2',
  templateUrl: './activation-step-2.component.html',
  styleUrls: ['./activation-step-2.component.sass']
})
export class ActivationStep2Component implements OnInit {

  constructor(
    private loginService: LoginService,
    private router: Router,
    private dot: DOT
  ) { }

  ngOnInit() {
      this.preregisterResponse = this.dot.data[0];
      this.preregisterRequest = this.dot.data[1];
      this.dot = null;
      this.environment = environment;
  }

  environment;
  password;
  confirm_password;
  imageId;
  preregisterRequest: PreregisterRequest;
  preregisterResponse: PreregisterResponse;
  registerRequest: RegisterRequest;

  /**
   * This event element will help to change the current view in the parent element <auth.component>.
   */
  @Output() routeView: EventEmitter<String> = new EventEmitter();

  /**
   * This event is emitted to the parent element <auth.component>.
   */
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
          console.log('registro exitoso!, avisar de alguna manera');
          this.router.navigate(['/login']);
        },
        err => {
          console.log('tronó, avisarle al usuario '+err);
        }
      );
    }
  }

  selectImage(imageId: string){
    this.imageId = imageId;
  }

}