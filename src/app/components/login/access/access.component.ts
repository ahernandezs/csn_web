import { Component, Output, EventEmitter } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import { DOT } from '../../../utils/dot';

import { CheckLoginRequest } from '../../../models/check-login-request';
import { CheckLoginResponse } from '../../../models/check-login-response';

@Component({
  selector: 'app-access',
  templateUrl: './access.component.html',
  styleUrls: ['./access.component.sass']
})
export class AccessComponent {

  constructor(
    private loginService: LoginService,
    private dot: DOT
  ) {}

  checkLoginResponse: CheckLoginResponse;
  checkLoginRequest: CheckLoginRequest = new CheckLoginRequest('')

  /**
   * This event element will help to change the current view in the parent element <auth.component>.
   */
  @Output() routeView: EventEmitter<String> = new EventEmitter();

  /**
   * This event is emitted to the parent element <auth.component>.
   */
  changeView(view: String): void {
    this.loginService.checkLogin(this.checkLoginRequest).subscribe(
      response => {
        this.checkLoginResponse = response;
        this.dot.setData([this.checkLoginResponse, this.checkLoginRequest.user_login]);
        this.routeView.emit(view);
      },
      err => {
        console.log(err);
      }
    );
  }
}
