import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../../services/login.service';
import { environment } from '../../../../environments/environment';

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
    private router: Router
  ) { }

  ngOnInit() {
    if(localStorage.getItem("client_application_id") === null){
      localStorage.setItem("client_application_id", Math.floor(Math.random()*1000000)+'-WEB');
    this.environment = environment;
    }
  }

  password;
  imageId;
  environment;
  loginRequest: LoginRequest;
  loginResponse: LoginResponse;

  @Output() routeView: EventEmitter<String> = new EventEmitter();
  @Input() checkLoginResponse: CheckLoginResponse;

  changeView(view: string): void {
      this.routeView.emit(view);
  }

  login(view: string){
    this.loginRequest = new LoginRequest(localStorage.getItem('user_login_csn'), this.password, localStorage.getItem('client_application_id'), this.imageId);
    localStorage.removeItem('x-auth-token');
    localStorage.removeItem('x-data-csn');
    this.loginService.login(this.loginRequest).subscribe(
      response => {
        this.loginResponse = response;
        localStorage.setItem('x-data-csn', JSON.stringify(this.loginResponse));
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
