import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../../services/login.service';
import { environment } from '../../../../environments/environment';
import { DOT } from '../../../utils/dot';

import { CheckLoginResponse } from '../../../models/check-login-response';
import { LoginRequest } from '../../../models/login-request';
import { LoginResponse } from '../../../models/login-response';

@Component({
  selector: 'app-access-confirmation',
  templateUrl: './access-confirmation.component.html',
  styleUrls: ['./access-confirmation.component.sass']
})
export class AccessConfirmationComponent implements OnInit {

  constructor(
    private loginService: LoginService,
    private router: Router,
    private dot: DOT
  ) { }

  ngOnInit() {
    this.checkLoginResponse = this.dot.data[0];
    this.user_login = this.dot.data[1];
    this.dot.removeData();
    this.environment = environment;
  }

  user_login;
  password;
  imageId;
  environment;
  checkLoginResponse: CheckLoginResponse;
  loginRequest: LoginRequest;
  loginResponse: LoginResponse;

  /**
   * This event element will help to change the current view in the parent element <auth.component>.
   */
  @Output() routeView: EventEmitter<String> = new EventEmitter();

  /**
   * This event is emitted to the parent element <auth.component>.
   */
  changeView(view: string): void {
      this.routeView.emit(view);
  }

  login(view: string){

    if(localStorage.getItem("client_application_id")===null)
      localStorage.setItem("client_application_id", Math.floor(Math.random()*1000000)+'');

    localStorage.removeItem('x-auth-token');

    this.loginRequest = new LoginRequest(this.user_login, this.password, localStorage.getItem("client_application_id"), this.imageId);

    this.loginService.login(this.loginRequest).subscribe(
      response => {
        this.loginResponse = response;
        this.dot.setData([this.loginResponse]);
        this.router.navigate(['/home']); 
      },
      err => {
        console.log(err);
      }
    );    
  }

  selectImage(imageId: string){
    this.imageId = imageId;
  }

}
